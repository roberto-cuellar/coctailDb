import { Observable, map } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  Drink,
  DrinkCategories,
  DrinkInfo,
  DrinkMin,
  DrinksAndCategory,
  ingredientImg,
} from 'src/app/interfaces/drinks.interfaces';
import { DrinksServiceService } from '../api/drinks-service.service';

@Injectable({
  providedIn: 'root',
})
export class DrinksRepositoryService {
  constructor(private drinksServiceService: DrinksServiceService) {}

  getCategories(): Observable<DrinkCategories> {
    return this.drinksServiceService.getCategories();
  }

  getImageByName(name:string): Observable<string> {
    return this.drinksServiceService.getImageByName(name);
  }

  getDrinksByCategory(category: string): Observable<DrinksAndCategory> {
    return this.drinksServiceService.getDrinksByCategory(category).pipe(
      map((resp: any) => ({
        drinks: resp.drinks,
        category,
      }))
    );
  }

  getDrinkById(id: string): Observable<DrinkInfo> {
    return this.drinksServiceService.getDrinkById(id).pipe(
      map(response => {
        if (response.drinks && response.drinks.length) {
          return this.mapDrinkResponseToDrinkInfo(response.drinks[0]);
        }
        throw new Error('Invalid response format');
      })
    )
  }

  mapDrinkResponseToDrinkInfo(drink: any): DrinkInfo {
    let strInstructionsES = drink.strInstructionsES ? drink.strInstructionsES.split('.').filter(Boolean) : [];
    let strInstructionsFR = drink.strInstructionsFR ? drink.strInstructionsFR.split('.').filter(Boolean) : [];
    let strInstructionsDE = drink.strInstructionsDE ? drink.strInstructionsDE.split('.').filter(Boolean) : [];
    let strInstructionsIT = drink.strInstructionsIT ? drink.strInstructionsIT.split('.').filter(Boolean) : [];

    const extractNote = (instructions: string[], noteKeyword: string): string => {
      const noteIndex = instructions.findIndex((instruction) => instruction.trim().startsWith(noteKeyword));
      if (noteIndex !== -1) {
        const note = instructions[noteIndex];
        instructions.splice(noteIndex, 1);
        return note;
      }
      return '';
    };

    const mapIngredientsToImg = (): ingredientImg[] => {
      return Array.from({ length: 15 }, (_, index) => drink[`strIngredient${index + 1}`])
        .filter(Boolean)
        .map(ingredient => {
          return {
            label: ingredient,
            url: 'https://www.thecocktaildb.com/images/ingredients/' + ingredient.replace(/ /g, '-') + '.png'
          };
        });
  };

    return {
      strDrink: drink.strDrink,
      strDrinkThumb: drink.strDrinkThumb,
      strIngredients: mapIngredientsToImg(),
      strMeasures: Array.from({ length: 15 }, (_, index) => drink[`strMeasure${index + 1}`]).filter(Boolean),
      strInstructionsES,
      strInstructionsFR,
      strInstructionsDE,
      strInstructionsIT,
      strNoteES: extractNote(strInstructionsES, 'NOTA:'),
      strNoteFR: extractNote(strInstructionsFR, 'NOTE:'),
      strNoteDE: extractNote(strInstructionsDE, 'HINWEIS:'),
      strNoteIT: extractNote(strInstructionsIT, 'HINWEIS:')
    };
  }



}
