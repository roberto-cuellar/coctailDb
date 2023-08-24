import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchLetterService {
  private charSubject = new Subject<any>();
  charObservable$ = this.charSubject.asObservable();

  private textSubject = new Subject<any>();
  textObservable$ = this.textSubject.asObservable();

  updateChar(char: string){
    this.charSubject.next(char);
  }

  updateText(text: string){
    this.textSubject.next(text);
  }




}
