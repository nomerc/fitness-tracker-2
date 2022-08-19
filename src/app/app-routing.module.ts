import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { AuthGuard } from "./guards/auth.guard";
import { ChartsPageComponent } from "./pages/charts-page/charts-page.component";
import { DetailsPageComponent } from "./pages/details-page/details-page.component";
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { SignupPageComponent } from "./pages/signup-page/signup-page.component";
import { StartingPageComponent } from "./pages/starting-page/starting-page.component";

const routes: Routes = [
  { path: "", component: LoginPageComponent },
  {
    path: "calendar",
    component: StartingPageComponent,
    canActivate: [AuthGuard],
  },
  { path: "login", component: LoginPageComponent },
  { path: "signup", component: SignupPageComponent },
  {
    path: "details",
    component: DetailsPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "details/:date",
    component: DetailsPageComponent,
    canActivate: [AuthGuard],
  },
  { path: "charts", component: ChartsPageComponent, canActivate: [AuthGuard] },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
