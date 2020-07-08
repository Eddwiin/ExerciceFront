import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';

interface AutocompleteData {
  id: string | number;
  label: string;
}

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
})
export class AutocompleteComponent implements OnInit, OnChanges {
  @Input() items: AutocompleteData[];
  @Input() placeholder = 'Search...';

  itemsCopy: AutocompleteData[];
  valueSelected = '';
  closeContent = true;

  @Output() inputChangedEvent = new EventEmitter();
  @Output() suggestionSelectedEvent = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.items && !this.itemsCopy) {
      this.itemsCopy = [...this.items];
    }
  }

  searchType(event) {
    this.itemsCopy = this.items.filter((item) => {
      if (item.label.toLowerCase().includes(event.target.value.toLowerCase())) {
        return item;
      }
    });

    this.inputChangedEvent.emit(this.itemsCopy);
  }

  clickOnSuggestion(item: AutocompleteData) {
    this.valueSelected = item.label;
    this.suggestionSelectedEvent.emit(item);
  }
}
