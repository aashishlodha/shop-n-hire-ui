
import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import * as userInfo from './mock.data';

const urls = [
    {
        url: 'register',
        method: 'POST',
        json: userInfo
    },
    {
        url: 'login',
        method: 'POST',
        json: userInfo
    }
];

@Injectable()
export class HttpMockRequestInterceptor implements HttpInterceptor {
    constructor(private injector: Injector) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        for (const element of urls) {
            if (request.url.indexOf(element.url) > -1 && request.method === element.method) {
                console.log('Loaded from json : ' + request.url);
                const hdrs = new HttpHeaders();
                hdrs.set('access-control-allow-origin', '*');
                return of(new HttpResponse({ status: 200, body: ({} as any).default, headers: hdrs }));
            }
        }
        console.log('Loaded from http call :' + request.url);
        return next.handle(request);
    }
}
