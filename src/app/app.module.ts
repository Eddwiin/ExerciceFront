import { CoreModule } from './core/core.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { StoreModule } from '@ngrx/store';
import { bookReducer } from '@core/reducers/book.reducer';
import { shoppingCartReducer } from '@core/reducers/shopping-cart.reducer';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
  BrowserModule,
    AppRoutingModule,
    CoreModule,
    LayoutModule,
    StoreModule.forRoot({
      books: bookReducer,
      shoppingCart: shoppingCartReducer
    }),
    NoopAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
