import { HttpInterceptorFn } from '@angular/common/http';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  if (
    req.url.includes('https://api.everrest.educata.dev/auth/id') ||
    req.url.includes('https://api.everrest.educata.dev/shop/cart') ||
    req.url.includes('https://api.everrest.educata.dev/auth/change_password') ||
    req.url == 'https://api.everrest.educata.dev/auth'
  ) {
    const token = `Bearer ${localStorage.getItem('access_token')}`;

    const cloneReq = req.clone({
      setHeaders: {
        Authorization: token,
      },
    });

    return next(cloneReq); ///
  }

  return next(req);
};






// import { HttpInterceptorFn } from '@angular/common/http';

// export const apiInterceptor: HttpInterceptorFn = (req, next) => {

//     const token = `Bearer ${localStorage.getItem('access_token')}`;

//     const cloneReq = req.clone({
//       setHeaders: {
//         Authorization: token,
//       },
//     });

//     return next(cloneReq); ///

// };


