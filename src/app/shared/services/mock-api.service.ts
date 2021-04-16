import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { expand, NodeObject, JsonLdDocument } from 'jsonld';
import { JsonLdArray } from 'jsonld/jsonld-spec';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Classification, Concordance, Context, GenericResource, HasContext, HasId, OrArray } from '@app/shared/models';
import { getHttpClientLoader } from '@app/shared/utils/jsonld-loaders.model';
import { CacheInterceptor } from './cache-interceptor.service';
import { WarnableResponse } from '../models/warnable-response.model';

@Injectable({ providedIn: 'root' })
export class MockApiService {
  private jsonLdLoader = getHttpClientLoader(this.httpClient);
  private jsonLdLoaderClearCache = getHttpClientLoader(this.httpClient, false);

  constructor(private httpClient: HttpClient) {}

  /**
   * Get the JSON-LD {@link https://json-ld.org/spec/latest/json-ld/#expanded-document-form Expanded Document Form}
   * of a resource at a given URL.
   *
   *  Expansion is the process of taking a JSON-LD document
   * and applying a `@context` such that all IRIs, types,
   * and values are expanded so that the `@context` is no longer
   * necessary.
   *
   * @param url The URL that the resource can be retrieved via a GET
   * @param clearCache Whether to clear the cache, defaults to false
   * @returns the expanded resource
   */
  expandResource(url: string, clearCache = false): Observable<JsonLdArray> {
    return from(
      expand(
        // According to the docs, it can take a URL
        // See https://github.com/digitalbazaar/jsonld.js#expand
        url as JsonLdDocument,
        {
          documentLoader: clearCache ? this.jsonLdLoaderClearCache : this.jsonLdLoader,
        }
      )
    );
  }

  getClassification(id: string, clearCache = false): Observable<Classification> {
    return this.httpClient.get<Classification>(`http://localhost:8080/aria-api/api/classification/${id}`, {
      headers: clearCache ? CacheInterceptor.CLEAR_CACHE_HEADERS : undefined,
    });
  }

  /**
   * Contexts can either be directly embedded into the document (an embedded context) or be referenced using a URL.
   * This method will GET refernced contexts by the given URL.
   * @param url A referenced context's URL
   * @param clearCache Whether to clear the cache, default to false
   * @returns The context
   */
  getContext(url: string, clearCache = false): Observable<Context> {
    return this.httpClient.get<Context>(url, {
      headers: clearCache ? CacheInterceptor.CLEAR_CACHE_HEADERS : undefined,
    });
  }

  /**
   * Get a resource. If the type is not known, it will fall back to a GenericResource.
   */
  getResource<T extends HasContext & HasId = GenericResource>(url: string, clearCache = false): Observable<WarnableResponse<T>> {
    return this.httpClient
      .get<T>(url, {
        headers: clearCache ? CacheInterceptor.CLEAR_CACHE_HEADERS : undefined,
      })
      .pipe(
        map((response) => {
          let warning: string | undefined;
          if (
            Array.isArray(response['@context']) &&
            response['@context'].some((c) => c === 'http://localhost:8080/aria-api/api/context/classification-detail')
          ) {
            // Create warning for large classification-detail
            const classification = (response as unknown) as Classification;
            if (classification.levels?.length > 3) {
              warning = `This classification has ${classification.levels.length || 0} levels and ${
                classification.codes?.length || 0
              } root codes and could be very large which could cause long render times or the browser could lock up.`;
            }
          } else if (
            Array.isArray(response['@context']) &&
            response['@context'].some((c) => c === 'http://localhost:8080/aria-api/api/context/concordance-detail')
          ) {
            // Create warning for large concordance-detail
            const concordance = (response as unknown) as Concordance;
            if (concordance.codeMaps?.length > 100) {
              warning = `This concordance has ${concordance.codeMaps?.length} code maps could be very large which could cause long render times or the browser could lock up.`;
            }
          }
          return new WarnableResponse<T>(response, warning);
        })
      );
  }

  getClassifications(): Observable<OrArray<NodeObject> | undefined> {
    return this.httpClient
      .get<{ results: NodeObject }>('http://localhost:8080/aria-api/api/search/classifications?limit=40&start=0')
      .pipe(map((response) => response.results['@graph']));
  }

  getConcordances(): Observable<OrArray<NodeObject> | undefined> {
    return this.httpClient
      .get<{ results: NodeObject }>('http://localhost:8080/aria-api/api/search/concordances?limit=40&start=0')
      .pipe(map((response) => response.results['@graph']));
  }
}
