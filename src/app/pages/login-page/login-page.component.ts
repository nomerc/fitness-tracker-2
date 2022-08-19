import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { AuthService } from "src/app/auth.service";
import Utils from "src/utils/utils";
import { environment } from "src/environments/environment";
import { DataService } from "src/app/data.service";
import { User } from "src/models/user.model";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.css"],
})
export class LoginPageComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  loading = false;
  loading_g = false;

  user: User = {
    _id: "",
    username: "",
    displayedName: "",
    providerName: "",
    password: "",
  };

  utils = new Utils(this._snackBar, this.dataService);

  ngOnInit(): void {}
  onLoginButtonClicked(
    username = this.user.username,
    password = this.user.password
  ) {
    this.showSpinner(this.loading);

    this.authService.localSignUp(username, password).subscribe({
      next: (res) => {
        if (res.status === 200) {
          this.utils.openSnackBar(`Logged in`, "Close");
          this.authService.setUserName(res.body?.displayedName);
          this.router.navigate(["/calendar"]);
        } else {
          this.utils.openSnackBar(
            `Unexpected response from server. Response status ${res.status}`,
            "Close"
          );
        }
        this.hideSpinner(this.loading);
      },
      error: (err) => {
        this.utils.openSnackBar(`${err.error.messages}`, "Close");
        this.hideSpinner(this.loading);
      },
    });
  }

  onGoogleSignUp(): void {
    this.showSpinner(this.loading_g);
    window.open(
      `${environment.SERVER_URI}/auth/google`,
      "mywindow",
      "location=1,status=1,scrollbars=1, width=800,height=800"
    );

    let listener = window.addEventListener("message", (message) => {
      this.hideSpinner(this.loading_g);
      this.authService.setUserName(message.data.user.username);
      this.utils.createDefaultWorkoutForNewUser();
      this.router.navigate([`/calendar`]);
    });
  }

  showSpinner(spinner: boolean) {
    spinner = true;
  }

  hideSpinner(spinner: boolean) {
    spinner = false;
  }
}
