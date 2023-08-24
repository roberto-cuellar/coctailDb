import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  SimpleChanges,
  OnChanges,
  Component,
  ElementRef,
  Input,
  OnInit,
  Output,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Drink, DrinkMin } from 'src/app/interfaces/drinks.interfaces';

@Component({
  selector: 'app-show-items',
  templateUrl: './show-items.component.html',
  styleUrls: ['./show-items.component.scss'],
  standalone: true,
  imports: [TranslateModule, CommonModule],
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
    'red',
    'blue',
    'yellow',
    'green',
    'black',
    'orange',
    'red',
    'blue',
    'yellow',
    'green',
    'black',
    'orange',
    'red',
    'blue',
    'yellow',
    'green',
    'black',
    'orange',
  ];

  constructor(private cdRef: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.configureTitle();
    this.configurePagination();
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


}