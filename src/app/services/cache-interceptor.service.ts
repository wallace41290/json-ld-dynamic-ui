import {
  HttpEvent,
  HttpHandler,
HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  static CLEAR_CACHE_HEADERS = new HttpHeaders({'clear-cache':'true'});

  private cache = new Map<HttpRequest<unknown>, HttpResponse<unknown>>();

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (req.method !== "GET") {
      return next.handle(req);
    }
    if (req.headers.get("clear-cache")) {
      this.cache.delete(req);
    }
    const cachedResponse: HttpResponse<unknown> = this.cache.get(req);
    if (cachedResponse) {
      return of(cachedResponse.clone());
    } else {
      return next.handle(req).pipe(
        tap(stateEvent => {
          if (stateEvent instanceof HttpResponse) {
            this.cache.set(req, stateEvent.clone());
          }
        })
      );
    }
  }
}
