import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'books', loadChildren: () => import('./modules/books/books.module').then(mod => mod.BooksModule) },
  { path: 'shopping-cart', loadChildren: () => import('./modules/shopping-cart/shopping-cart.module').then(mod => mod.ShoppingCartModule) },
  { path: '', redirectTo: '/books', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
