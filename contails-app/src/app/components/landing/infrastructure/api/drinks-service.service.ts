import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { allDrinks } from 'src/app/constants/drinks-data.constants';
import { environment } from 'src/environments/environment';

const BASE_URL = environment.backendBaseUrl;

@Injectable({
  providedIn: 'root'
})
export class DrinksServiceService {

  constructor(private http: HttpClient){}


  getCategories():Observable<any>{
    return this.http.get<any[]>(BASE_URL + '/list.php?c=list');
  }

  getDrinksByCategory(category:string):Observable<any>{
    return this.http.get<any>(BASE_URL + `/filter.php?c=${category}`);
  }

  getDrinkById(id:string):Observable<any>{
    return this.http.get<any>(BASE_URL + `/lookup.php?i=${id}`);
  }

  getImageByName(name:string):Observable<any>{
    return this.http.get<any>(`www.thecocktaildb.com/images/ingredients/${name}`);
  }

}
