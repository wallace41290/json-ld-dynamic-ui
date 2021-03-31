import { HttpClient } from '@angular/common/http';
import * as jsonld from 'jsonld';
import * as jsonldSpec from 'jsonld/jsonld-spec';
import { map } from 'rxjs/operators';

import { CacheInterceptor } from '../services/cache-interceptor.service';

export function getHttpClientLoader(
  httpClient: HttpClient,
  clearCache = false
): (
  url: jsonldSpec.Url,
  callback: (err: Error, remoteDoc: jsonldSpec.RemoteDocument) => void
) => Promise<jsonldSpec.RemoteDocument> {
  return (url: string, options) => {
    return httpClient
      .get(url, {
        headers: clearCache ? CacheInterceptor.CLEAR_CACHE_HEADERS : undefined,
      })
      .pipe(
        map((doc: any) => {
          if (typeof doc === 'object' && !('@context' in doc)) {
            // Apparently we do not follow the spec
            // "A context is introduced using an entry with the key @context and may appear within a node object or a value object."
            // This is a temporary fix so the model is in the correct shape
            const modified = { ['@context']: doc };
            return {
              contextUrl: undefined,
              document: modified as jsonldSpec.JsonLd,
              documentUrl: url,
            };
          }
          return {
            contextUrl: undefined,
            document: doc,
            documentUrl: url,
          };
        })
      )
      .toPromise();
  };
}

export const jsonLdLoaderWithKey: (
  url: jsonldSpec.Url,
  callback: (err: Error, remoteDoc: jsonldSpec.RemoteDocument) => void
) => Promise<jsonldSpec.RemoteDocument> = (jsonld as any).documentLoaders.xhr({
  headers: { 'x-api-key': `yPIULUJQT7rF7zSq` },
});
