import { Observable, map } from 'rxjs';
import { Injectable } from '@angular/core';
import { Drink, DrinkCategories, DrinkMin, DrinksAndCategory } from 'src/app/interfaces/drinks.interfaces';
import { DrinksServiceService } from '../api/drinks-service.service';
import { toTitleCase } from 'src/app/shared/utilities/strings/to-title-case';

@Injectable({
  providedIn: 'root'
})
export class DrinksRepositoryService {

  constructor(private drinksServiceService:DrinksServiceService) { }

  getDrinks(): Observable<DrinkMin[]> {
    return this.drinksServiceService.getDrinks().pipe(
      map(drinkData => {
        const mappedData = drinkData.map((drink) => {
          return {
            ...drink,
            name: toTitleCase(drink.name)
          };
        });
        return mappedData
      })
    );
  }

  getCategories(): Observable<DrinkCategories>{
    return this.drinksServiceService.getCategories()
  }

  getDrinksByCategory(category: string): Observable<DrinksAndCategory> {
    return this.drinksServiceService.getDrinksByCategory(category).pipe(
      map((resp: any) => ({
        drinks: resp.drinks,
        category
      }))
    );
}




}
