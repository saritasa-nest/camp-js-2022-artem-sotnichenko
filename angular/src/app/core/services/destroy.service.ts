import { Injectable, OnDestroy } from '@angular/core';
import { ReplaySubject } from 'rxjs';

/**
 * Observable abstraction over ngOnDestroy to use with takeUntil.
 *
 * Component must have providers: `[DestroyService]`.
 * Also add `@Self()` to get error if service taken from its parent.
 *
 * Implementation is taken from https://github.com/Tinkoff/taiga-ui.
 */
@Injectable()
export class DestroyService extends ReplaySubject<void> implements OnDestroy {
  public constructor() {
    super(1);
  }

  /** @inheritdoc */
  public ngOnDestroy(): void {
    this.next();
    this.complete();
  }
}
