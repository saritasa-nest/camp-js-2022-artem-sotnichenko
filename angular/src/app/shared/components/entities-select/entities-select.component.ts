import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';

interface Entity {
  id: string;
  name: string;
}

@Component({
  selector: 'sw-entities-select',
  templateUrl: './entities-select.component.html',
  styleUrls: ['./entities-select.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntitiesSelectComponent {
  @Input()
  public entities: readonly Entity[] = [];

  @Input()
  public selectedIds: Entity['id'][] = [];

  public readonly separatorKeysCodes: readonly number[] = [ENTER, COMMA];

  public entityControl = new FormControl();

  public e = this.entities.toString();

  public constructor() {
    console.log(this.entities);
  }

  /**
   * Add entity.
   * @param event Mat chip input event.
   */
  public add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.selectedIds.push(value);
    }

    // Clear the input value
    event.chipInput?.clear();

    this.entityControl.setValue(null);
  }

  /**
   * Remove entity.
   * @param entityId Entity id.
   */
  public remove(entityId: string): void {
    const index = this.selectedIds.indexOf(entityId);

    if (index >= 0) {
      this.selectedIds.splice(index, 1);
    }
  }

  /**
   * Selected.
   * @param event Event.
   */
  public selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedIds.push(event.option.viewValue);

    // this.fruitInput.nativeElement.value = '';
    this.entityControl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    // return this.allFruits.filter(fruit => fruit.toLowerCase().includes(filterValue));
    return this.selectedIds;
  }
}
