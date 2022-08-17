import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/auth.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  @Input() color = "yellow";
  user!: string | null;

  constructor(public authService: AuthService, public router: Router) {}

  ngOnInit(): void {
    this.user = this.authService.getUserName();
  }

  logout() {
    this.authService.signOut();
  }
}
