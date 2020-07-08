import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AutocompleteComponent],
  imports: [
  CommonModule,
    FormsModule
  ],
  exports: [AutocompleteComponent, FormsModule]
})
export class SharedModule { }
