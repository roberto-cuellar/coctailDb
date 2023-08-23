import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing.component';
import { landingRoutingModule } from './landing-routing.module';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [LandingComponent],
  imports: [
    CommonModule,
    landingRoutingModule,
    TranslateModule
  ],
  exports: [
    LandingComponent
  ]
})
export class LandingModule { }
