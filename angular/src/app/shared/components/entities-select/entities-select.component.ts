import { Component, OnInit, ChangeDetectionStrategy, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { map, Observable, of, startWith } from 'rxjs';

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
export class EntitiesSelectComponent implements OnInit {
  /** Field label. */
  @Input()
  public label = '';

  /** All entities. */
  @Input()
  public entities: readonly Entity[] = [];

  /** Filtered entities, used in autocomplete options dropdown. */
  @Input()
  public filteredEntities: Observable<readonly Entity[]> = of([]);

  /** Selected entities ids. */
  @Input()
  public selectedIds: readonly Entity['id'][] = [];

  /** Emits when options selected. */
  @Output()
  public readonly changed = new EventEmitter<readonly Entity['id'][]>();

  /** Entity input control. */
  public readonly entityControl = new FormControl();

  /** Entity input ref. */
  @ViewChild('entityInput')
  public readonly entityInput?: ElementRef<HTMLInputElement>;

  public constructor() {}

  /** @inheritdoc */
  public ngOnInit(): void {
    this.filteredEntities = this.entityControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filterOptions(value)),
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

    if (this.entityInput) {
      this.entityInput.nativeElement.value = '';
    }
    this.entityControl.setValue(null);
    this.emitChange();
  }

  private emitChange(): void {
    this.changed.emit(this.selectedIds);
  }

  private filterOptions(entityId: Entity['id'] | null): readonly Entity[] {
    if (entityId === null) {
      return this.entities;
    }

    return this.entities.filter(entity =>
      entity.name.toLowerCase().includes(entityId.toLowerCase()) &&
      !this.selectedIds.includes(entity.id));
  }
}
