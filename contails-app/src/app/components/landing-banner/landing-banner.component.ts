import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { sideItems } from 'src/app/constants/landing-banner.constants';
import { SideItem } from 'src/app/interfaces/landing-banner.interfaces';

@Component({
  selector: 'app-landing-banner',
  templateUrl: './landing-banner.component.html',
  styleUrls: ['./landing-banner.component.scss'],
  standalone: true,
  imports:[
    TranslateModule,
    CommonModule
  ]
})
export class LandingBannerComponent {

  sideItems:SideItem[] = sideItems;

}
