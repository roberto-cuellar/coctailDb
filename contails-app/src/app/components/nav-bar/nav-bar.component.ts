import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { debounceTime } from 'rxjs';
import { SearchLetterService } from 'src/app/shared/services/search-letter.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  standalone: true,
  imports: [
    TranslateModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class NavBarComponent implements OnInit{
  searchControl = new FormControl();
  constructor(
      private router: Router,
      public translateService: TranslateService,
      private searchLetterService:SearchLetterService){}

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(400)
     ).subscribe(value => {
      this.searchLetterService.updateText(value);
    });

    this.searchLetterService.charObservable$.subscribe((char) => {
      if(char){
        this.searchControl.setValue('');
        // this.searchControl.reset();
      }
    });
  }

}


