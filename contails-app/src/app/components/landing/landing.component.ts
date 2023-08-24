import { Component, OnInit } from '@angular/core';
import { SearchLetterService } from 'src/app/shared/services/search-letter.service';
import { DrinksRepositoryService } from './infrastructure/repository/drinks-repository.service';
import {
  DrinkCategories,
  DrinkMin,
  DrinksAndCategory,
  latestDrink,
  popularDrink,
  popularIngredient,
  randomDrink,
  randomIngredient,
} from 'src/app/interfaces/drinks.interfaces';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  isSearch = false;
  charToSearch = '';
  textToSearch = '';

  allDrinks: DrinksAndCategory[] = [];

  categories!:DrinkCategories;

  constructor(
    private searchLetterService: SearchLetterService,
    private drinksRepositoryService: DrinksRepositoryService
  ) {
  }

  ngOnInit() {
    this.searchLetterService.charObservable$.subscribe((char) => {
      this.isSearch = Boolean(char);
      this.charToSearch = char;
    });

    this.searchLetterService.textObservable$.subscribe((text) => {
      this.isSearch = Boolean(text);
      this.textToSearch = text;
    });

    this.getCategories();
  }

  getCategories(){
    this.drinksRepositoryService.getCategories().subscribe({
      next: (resp) => {
        this.categories = resp;
        this.getDrinks();
      }
    })
  }

  getDrinks() {
    const categories = this.transformCategories(this.categories.drinks);
    categories.forEach((category)=>{
      this.drinksRepositoryService.getDrinksByCategory(category.strCategory).subscribe({
        next: (drinksAndCategory)=>{
          this.allDrinks.push(drinksAndCategory);
        }
      })
    })

  }

  transformCategories(categories: any[]): any[] {
    return categories.map(category => {
      category.strCategory = category.strCategory.replace(/ /g, '_');
      return category;
    });
}

}
