import { BreakpointObserver } from '@angular/cdk/layout';
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
  languageForInstructions = 'EN';

  isSmallScreen = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private drinksRepositoryService: DrinksRepositoryService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.drinkId = this.activatedRoute.snapshot.paramMap.get('id') || '';
    this.drinkId ? this.getDrinkInfo() : this.navigateToLanding();
    this.screenWatch();
  }

  screenWatch(){
    this.isSmallScreen = this.breakpointObserver.isMatched('(max-width: 500px)');
    this.breakpointObserver.observe('(max-width: 500px)').subscribe((result) => {
      this.isSmallScreen = result.matches;
    });
  }


  getDrinkInfo() {
    this.drinksRepositoryService.getDrinkById(this.drinkId).subscribe({
      next: (resp) => {
        this.drinkData = resp;
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
