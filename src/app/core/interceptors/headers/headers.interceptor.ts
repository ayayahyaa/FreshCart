import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  const pLATFORM_ID = inject(PLATFORM_ID);
  const router = inject(Router);

  if (localStorage.getItem('userToken')) {
    req = req.clone({
      setHeaders: {
        token: localStorage.getItem('userToken')!,
      },
    });
  }

  if (isPlatformBrowser(pLATFORM_ID)) {
    const token = localStorage.getItem('userToken')!;
    if (token) {
      localStorage.setItem('userId', (jwtDecode(token) as { id: string }).id);
      return next(req);
    } else {
      router.navigate(['/login']);
      return next(req);
    }
  }

  return next(req);
};
