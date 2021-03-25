import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  Classification,
  Context,
  GenericResource,
  HasContext,
  HasId,
ResolvedResouce
} from "../models";
import { extractContexts} from '../utils'; 
import { ExtractedContexts } from "../utils/extracted-contexts.model";
import { CacheInterceptor } from "./cache-interceptor.service";

@Injectable({ providedIn: "root" })
export class MockApiService {
  constructor(private httpClient: HttpClient) {}

  getClassification(id: string, clearCache = false) {
    return this.httpClient.get<Classification>(
      `http://localhost:8080/aria-api/api/classification/${id}`,
      { headers: clearCache ? CacheInterceptor.CLEAR_CACHE_HEADERS : undefined }
    );
  }

  getContext(iri: string, clearCache = false) {
    return this.httpClient.get<Context>(iri, {
      headers: clearCache ? CacheInterceptor.CLEAR_CACHE_HEADERS : undefined
    });
  }

  /**
   * Get a resource. If the type is not known, it will fall back to a GenericResource.
   */
  getResource<T extends HasContext & HasId = GenericResource>(
    iri: string,
    clearCache = false
  ) {
    return this.httpClient.get<T>(iri, {
      headers: clearCache ? CacheInterceptor.CLEAR_CACHE_HEADERS : undefined
    });
  }

  /**
   * Get the resource, it's context, and all the context's terms
   * in order to generically build up a UI.
   */
  getResolvedResource<R extends HasContext>(
    resource: R
  ): Observable<ResolvedResource<R>> {
    const extractedContexts:ExtractedContexts = extractContexts(resource);
    if(!extractedContexts.referencedContexts.length && !extractedContexts.referencedContexts.length){
      return of(new ResolvedResouce(resource, new Array<Context>(), new Map<Term, GenericResource>()));
    }
    // resolve referenced contexts 
    return extractedContexts.referencedContexts.length? : resolveTerms(ex);
  }
}
