import { Component, ChangeDetectionStrategy, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { map, Observable, startWith } from 'rxjs';

interface Entity {

  /** Entity id. */
  readonly id: string;

  /** Entity name. */
  readonly name: string;
}

/** Entity multi select. */
@Component({
  selector: 'sw-entities-select',
  templateUrl: './entities-select.component.html',
  styleUrls: ['./entities-select.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntitiesSelectComponent {
  /** Field label. */
  @Input()
  public label = '';

  /** All entities. */
  @Input()
  public entities: readonly Entity[] = [];

  /** Selected entities ids, shown as a chips. */
  @Input()
  public selectedIds: readonly Entity['id'][] = [];

  /** Emits when options selected. */
  @Output()
  public readonly entityChange = new EventEmitter<readonly Entity['id'][]>();

  /** Filtered entities, used in autocomplete options dropdown. */
  public readonly filteredEntities$: Observable<readonly Entity[]>;

  /** Entity input control. */
  public readonly entityInputControl = new FormControl();

  /** Entity input ref. */
  @ViewChild('entityInput')
  public readonly entityInputRef?: ElementRef<HTMLInputElement>;

  public constructor() {
    this.filteredEntities$ = this.entityInputControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filterEntities(value)),
    );
  }

  /**
   * Get selected entities from ids.
   * @param ids Selected entities ids.
   */
  public getSelectedEntities(ids: readonly Entity['id'][]): readonly Entity[] {
    return ids.map(id => this.entities
      .find(entity => entity.id === id))
      .filter((entity): entity is Entity => entity !== undefined);
  }

  /**
   * Remove entity from selected.
   * @param entityId Entity id.
   */
  public deselectEntity(entityId: Entity['id']): void {
    this.selectedIds = this.selectedIds.filter(id => id !== entityId);
    this.emitChange();
  }

  /**
   * Select option.
   * @param event Event.
   */
  public selectEntity(event: MatAutocompleteSelectedEvent): void {
    this.selectedIds = [...this.selectedIds, event.option.value];

    if (this.entityInputRef) {
      this.entityInputRef.nativeElement.value = '';
    }
    this.entityInputControl.setValue(null);
    this.emitChange();
  }

  /**
   * Entity track function for ngFor.
   * @param index Index in array.
   * @param entity Entity.
   */
  public trackEntity(index: number, entity: Entity): Entity['id'] {
    return entity.id;
  }

  private emitChange(): void {
    this.entityChange.emit(this.selectedIds);
  }

  private filterEntities(entityId: Entity['id'] | null): readonly Entity[] {
    if (entityId === null) {
      return this.entities;
    }

    return this.entities.filter(entity =>
      entity.name.toLowerCase().includes(entityId.toLowerCase()) &&
      !this.selectedIds.includes(entity.id));
  }
}
