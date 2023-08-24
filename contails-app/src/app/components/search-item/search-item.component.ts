import { alphabet } from './../../constants/searc-item.constants';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SearchLetterService } from 'src/app/shared/services/search-letter.service';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss'],
  standalone: true,
  imports:[
    TranslateModule,
    CommonModule
  ]
})
export class SearchItemComponent {

  alphabet = alphabet;
  isSearch = false;
  actualChar = '';

  constructor(private searchLetterService:SearchLetterService){}

  emitChar(char:string){
    this.isSearch = true;
    this.actualChar = char;
    this.searchLetterService.updateChar(char);
  }

  deleteSearch(){
    this.isSearch = false;
    this.actualChar = '';
    this.searchLetterService.updateChar('');
  }


}
