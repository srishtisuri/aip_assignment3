import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountSettingsComponent } from './components/account-settings/account-settings.component';
import { ApplicationSettingsComponent } from './components/application-settings/application-settings.component';
import { SettingsComponent } from './settings.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [AccountSettingsComponent, ApplicationSettingsComponent, SettingsComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class SettingsModule { }
