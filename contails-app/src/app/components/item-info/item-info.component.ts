import { Component, OnInit } from '@angular/core';
import { DrinksRepositoryService } from '../landing/infrastructure/repository/drinks-repository.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DrinkInfo } from 'src/app/interfaces/drinks.interfaces';

@Component({
  selector: 'app-item-info',
  templateUrl: './item-info.component.html',
  styleUrls: ['./item-info.component.scss'],
})
export class ItemInfoComponent implements OnInit {
  drinkId = '';
  drinkData!: DrinkInfo;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private drinksRepositoryService: DrinksRepositoryService
  ) {}

  ngOnInit(): void {
    this.drinkId = this.activatedRoute.snapshot.paramMap.get('id') || '';
    this.drinkId ? this.getDrinkInfo() : this.navigateToLanding();
  }

  getDrinkInfo() {
    this.drinksRepositoryService.getDrinkById(this.drinkId).subscribe({
      next: (resp) => {
        this.drinkData = resp;
        console.log('Respuesta: ', resp);
      },
      error: (err) => {
        this.router.navigate(['']);
        console.error('Error fetching the drink data ');
      },
    });
  }

  navigateToLanding() {
    this.router.navigate(['']);
  }
}
