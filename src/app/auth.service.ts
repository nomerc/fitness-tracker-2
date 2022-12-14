import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { User } from "../models/user.model";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  readonly ROOT_URL: string;

  constructor(
    private http: HttpClient // private webService: WebRequestService
  ) {
    this.ROOT_URL = environment.SERVER_URI;
  }

  localSignUp(username: string, password: string) {
    return this.http.post<User>(
      `${this.ROOT_URL}/auth/local`,
      {
        username,
        password,
      },
      {
        withCredentials: true,
        observe: "response",
      }
    );
  }

  localRegister(username: string, displayed: string, password: string) {
    return this.http.post<User>(
      `${this.ROOT_URL}/auth/local/register`,
      {
        username,
        displayed,
        password,
      },
      {
        withCredentials: true,
        observe: "response",
      }
    );
  }

  // googleSignUp() {
  //   //can't be placed here. Check login-page.component instead
  // }
  // googleRegister() {
  //   //can't be placed here. Check register-page.component instead
  // }
  isAuthenticated() {
    return this.http.post(
      `${this.ROOT_URL}/auth/isAuthenticated`,
      {},
      {
        withCredentials: true,
      }
    );
  }

  signOut() {
    this.clearSession();
    return this.http.post(
      `${this.ROOT_URL}/auth/signout`,
      {},
      {
        observe: "response",
        withCredentials: true,
      }
    );
  }

  getUserName() {
    return localStorage.getItem("user-name");
  }

  setUserName(userName: string | null | undefined) {
    if (userName) localStorage.setItem("user-name", userName);
    else localStorage.setItem("user-name", "unknown user");
  }

  private clearSession() {
    localStorage.removeItem("user-name");
  }
}
