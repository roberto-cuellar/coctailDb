import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing.component';
import { landingRoutingModule } from './landing-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { LandingBannerComponent } from '../landing-banner/landing-banner.component';
import { SearchItemComponent } from '../search-item/search-item.component';
import { ShowItemsComponent } from '../show-items/show-items.component';



@NgModule({
  declarations: [LandingComponent],
  imports: [
    CommonModule,
    landingRoutingModule,
    TranslateModule,
    LandingBannerComponent,
    SearchItemComponent,
    ShowItemsComponent
  ],
  exports: [
    LandingComponent
  ]
})
export class LandingModule { }
