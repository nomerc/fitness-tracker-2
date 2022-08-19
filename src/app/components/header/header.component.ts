import { Component, Input, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { AuthService } from "src/app/auth.service";
import Utils from "src/utils/utils";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  @Input() color = "yellow";
  user!: string | null;

  constructor(
    public authService: AuthService,
    public router: Router,
    private _snackBar: MatSnackBar
  ) {}
  utils = new Utils(this._snackBar);

  ngOnInit(): void {
    this.user = this.authService.getUserName();
  }

  logout() {
    this.authService.signOut().subscribe((res) => {
      if (res.status === 200) {
        this.utils.openSnackBar(`Logged out`, "Close");
        this.router.navigate(["/"]);
      } else this.utils.openSnackBar(`Error logging out`, "Close");
    });
  }
}
