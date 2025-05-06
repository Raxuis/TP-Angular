// import {AuthService} from "@/services/auth/auth.service";
// import {HttpInterceptorFn} from "@angular/common/http";
// import {inject} from "@angular/core";
//
//
// export const ApiInterceptor: HttpInterceptorFn = (req, next) => {
//   const authService = inject(AuthService);
//   const apiKey = authService.getApiKey();
//
//   if (apiKey) {
//     const apiReq = req.clone({
//       headers: req.headers.set("x-api-key", apiKey)
//     });
//     return next(apiReq);
//   }
//
//   return next(req);
// };
