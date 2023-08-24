export interface DrinkMin {
  name: string;
  id: string;
  img: string;
}

export type popularDrink = Omit<DrinkMin, 'tag'> & { tag: 'popular-drinks'};
export type popularIngredient = Omit<DrinkMin, 'tag'> & { tag: 'popular-ingredients'};
export type latestDrink = Omit<DrinkMin, 'tag'> & { tag: 'latest-drinks'};
export type randomIngredient = Omit<DrinkMin, 'tag'> & { tag: 'random-ingredients'};
export type randomDrink = Omit<DrinkMin, 'tag'> & { tag: 'random-drinks'};



export interface DrinkCategories {
  drinks: string[]
}

export interface Drink {
  strDrink: string;
  strDrinkThumb: string;
  idDrink: string;
}

export interface DrinksAndCategory {
  drinks: Drink[];
  category: string;
}

export interface DrinkInfo{
  strDrink: string;
  strDrinkThumb:string;
  strIngredients: ingredientImg[];
  strMeasures: string[];
  strInstructionsES: string[];
  strInstructionsFR: string[];
  strInstructionsIT: string[];
  strInstructionsDE: string[];
  strNoteES: string;
  strNoteFR: string;
  strNoteDE: string;
  strNoteIT: string;
}

export interface ingredientImg{
  label: string;
  url: string;
}




