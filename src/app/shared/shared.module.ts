import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { CardComponent } from './card/card.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [AutocompleteComponent, CardComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [AutocompleteComponent, FormsModule]
})
export class SharedModule { }
