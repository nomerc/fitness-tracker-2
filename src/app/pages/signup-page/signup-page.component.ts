import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { AuthService } from "src/app/auth.service";
import { DataService } from "src/app/data.service";
import { User } from "src/models/user.model";
import { FormControl } from "@angular/forms";
import Utils from "src/utils/utils";

@Component({
  selector: "app-signup-page",
  templateUrl: "./signup-page.component.html",
  styleUrls: ["./signup-page.component.css"],
})
export class SignupPageComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  user: User = {
    _id: "",
    username: "",
    displayedName: "",
    providerName: "",
    password: "",
  };

  utils = new Utils(this._snackBar, this.dataService);
  loading = false;

  ngOnInit(): void {}

  onSignupButtonClicked(
    username = this.user.username,
    displayed = this.user.displayedName,
    password = this.user.password
  ) {
    this.showSpinner(this.loading);

    this.authService.localRegister(username, displayed, password).subscribe({
      next: (res) => {
        if (res.status === 200) {
          this.utils.createDefaultWorkoutForNewUser();
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
        this.hideSpinner(this.loading);
        this.utils.openSnackBar(`${err.error.messages}`, "Close");
      },
    });
  }

  showSpinner(spinner: boolean) {
    spinner = true;
  }

  hideSpinner(spinner: boolean) {
    spinner = false;
  }
}
