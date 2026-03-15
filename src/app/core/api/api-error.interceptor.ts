import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

import { NotificationService } from '../services/notification.service';

export const apiErrorInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  const notifications = inject(NotificationService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let message = 'An unexpected error occurred';

      if (error.status === 0) {
        message = 'Unable to connect to the server';
      } else if (error.status === 401) {
        message = 'Your session has expired. Please log in again.';
      } else if (error.status === 403) {
        message = 'You do not have permission to perform this action';
      } else if (error.status === 404) {
        message = 'The requested resource was not found';
      } else if (error.status === 422) {
        message = error.error?.errors?.join(', ') ?? 'Validation failed';
      } else if (error.status >= 500) {
        message = 'A server error occurred. Please try again later.';
      }

      notifications.error(message);
      return throwError(() => error);
    }),
  );
};
