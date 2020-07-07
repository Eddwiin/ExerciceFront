import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { APP_ROUTES } from './core/configs/routes.config';


const routes: Routes = [
  { path: APP_ROUTES.BOOKS , loadChildren: () => import('./modules/books/books.module').then(mod => mod.BooksModule) },
  { path: APP_ROUTES.SHOPPING_CART, loadChildren: () => import('./modules/shopping-cart/shopping-cart.module').then(mod => mod.ShoppingCartModule) },
  { path: '', redirectTo: APP_ROUTES.APP_DEFAULT, pathMatch: 'full'},
  { path: '**', redirectTo:  APP_ROUTES.APP_DEFAULT}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
