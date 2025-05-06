import {AuthService} from "@/services/auth/auth.service";
import {HttpInterceptorFn} from "@angular/common/http";
import {inject} from "@angular/core";


export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const authToken = authService.getToken();

  console.log("request", req)

  if (authToken && req.url.includes("/users")) {
    const authReq = req.clone({
      headers: req.headers.set("Authorization", `Bearer ${authToken}`)
    });
    return next(authReq);
  }

  return next(req);
};
