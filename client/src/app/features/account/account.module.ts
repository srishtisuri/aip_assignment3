import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { AccountComponent } from "./account.component";
import { SharedModule } from "src/app/shared/shared.module";
import { AccountRoutingModule } from './account-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, AccountComponent],
  imports: [CommonModule, SharedModule, AccountRoutingModule, RouterModule]
})
export class AccountModule {}
