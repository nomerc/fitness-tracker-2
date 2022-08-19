import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { map, Observable, catchError, of } from "rxjs";
import { AuthService } from "../auth.service";
import { CookieService } from "../cookie.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    public cookieService: CookieService,
    public authService: AuthService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.isAuthenticated().pipe(
      map((res) => {
        if (res) return true;
        this.router.navigateByUrl("/");
        return false;
      }),
      catchError((error) => {
        this.router.navigate(["/login"]);
        return of(false);
      })
    );
  }
}
