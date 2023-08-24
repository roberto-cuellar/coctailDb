import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  SimpleChanges,
  OnChanges,
  Component,
  ElementRef,
  Input,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Drink } from 'src/app/interfaces/drinks.interfaces';
import { BreakpointObserver } from '@angular/cdk/layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-show-items',
  templateUrl: './show-items.component.html',
  styleUrls: ['./show-items.component.scss'],
  standalone: true,
  imports: [TranslateModule, CommonModule],
  animations: [
    trigger('enterAnimation', [
      state('void', style({
        opacity: 0,
        transform: 'scale(0)',
        filter: 'blur(1px)'
      })),
      state('*', style({
        opacity: 1,
        transform: 'scale(1)',
        filter: 'blur(0)'
      })),
      transition(':enter', [
        animate('1s ease-in-out', style({
          opacity: 1,
          transform: 'scale(1.1)',
          filter: 'blur(0)'
        })),
        animate('100ms')
      ])
    ])
  ]
})
export class ShowItemsComponent implements AfterViewInit, OnChanges {
  @Input() tiltOrientation: 'left' | 'right' = 'left';
  @Input() colorBg = '';
  @Input() title: string = '';
  @Input() titlePosition: 0 | 1 | 2 = 0;
  @Input() igmRight: string = '';
  @Input() igmRightShift: string[] = [];
  @Input() igmLeft: string = '';
  @Input() igmLeftShift: string[] = [];
  _dataCopy: Drink[] = [];
  _dataAux: Drink[] = [];
  private _data: Drink[] = [];
  @Input() set data(value: Drink[]) {
    this._data = value;
    this._dataCopy = [...value];
    this._dataAux =  value;
  }
  @Input() identifier = '';
  @Input() charToSearch = '';
  @Input() textToSearch = '';

  get data(): Drink[] {
    return this._data;
  }


  // Pagination
  totalItems = 0;
  itemsPerPage = 9;
  currentPage = 1;

  get pagesArray(): number[] {
    return Array.from({ length: this.pages }, (_, i) => i + 1);
  }

  get pages(): number {
    return Math.ceil(this._dataAux.length / this.itemsPerPage);
  }

  @ViewChild('titleElement') titleElement!: ElementRef;

  backgroundMap = [
    '#DFBED8',
    '#C5DBA1',
    '#D3B09C',
    '#DFBED8',
    '#C5DBA1',
    '#93887A',
    '#DFBED8',
    '#DBB6A1',
    '#DFBED8',
    '#C5DBA1',
    '#D3B09C',
    '#DFBED8',
    '#C5DBA1',
    '#93887A',
    '#DFBED8',
    '#DBB6A1',
  ];

  isSmallScreen = false;

  constructor(private cdRef: ChangeDetectorRef, private router: Router, private breakpointObserver: BreakpointObserver) {}

  ngAfterViewInit(): void {
    this.configureTitle();
    this.configurePagination();
    this.screenWatch();
  }

  screenWatch(){
    this.isSmallScreen = this.breakpointObserver.isMatched('(max-width: 500px)');
    this.breakpointObserver.observe('(max-width: 500px)').subscribe((result) => {
      this.isSmallScreen = result.matches;
    });
  }

  configurePagination() {
    if (this._data.length > 9) {
      this._data = this._data.splice(0, 9);
      this.cdRef.detectChanges();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['charToSearch'] ) {
      if (changes['charToSearch'].currentValue === '') {
        this._dataAux = [...this._dataCopy];
        this.updateData();
      } else {
        this._dataAux = this.filterByFirstLetter(this.charToSearch);
        this.updateData();
      }
    }

    if (changes['textToSearch']) {
      if (changes['textToSearch'].currentValue === '') {
        this._dataAux = [...this._dataCopy];
        this.updateData();
      } else {
        this._dataAux = this.filterByName(this.textToSearch);
        this.updateData();
      }
    }
  }

  configureTitle() {
    const text = this.titleElement.nativeElement;
    text.innerHTML = this.title
      .replace(/_/g, ' ')
      .split('')
      .map(
        (char: any, i: any) =>
          `<span class="test-span" style="transform:rotate(  ${
            -120 + i * 12
          }deg  )">${char}</span>`
      )
      .join('');
  }

  filterByFirstLetter(letter: string): any[] {
    return this._dataCopy.filter((drink) => {
      return drink.strDrink.toLowerCase().startsWith(letter.toLowerCase());
    });
  }

  filterByName(word: string): any[] {
    return this._dataCopy.filter((drink) => {
      return drink.strDrink.toLowerCase().includes(word.toLowerCase());
    });
  }

  goToPage(page:number){
    this.currentPage = page;
    this.updateData();
  }

  updateData(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this._data = [...this._dataAux.slice(startIndex, endIndex)];
  }

  goToDrink(id:string){
    this.router.navigate(['cocktail-info',id]);
  }

}
