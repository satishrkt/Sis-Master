import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiServiceService } from './models/api-service.service';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {

  constructor(private api : ApiServiceService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.api.getToken();
    req = req.clone({
      setHeaders : {
        'Authorization' : 'Bearer ' + token
      }
    });
    return next.handle(req);
  }
}
