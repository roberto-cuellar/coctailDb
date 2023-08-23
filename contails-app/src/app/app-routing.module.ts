import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '',
    loadChildren: () => import('./components/landing/landing.module').then(m => m.LandingModule)
  },
  {
    path: '404',
    loadChildren: () => import('./components/error/error.module').then(m => m.ErrorModule)
  },
  // { path: '**', redirectTo: '404', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
