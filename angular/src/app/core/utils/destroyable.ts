// Heroically stolen from saritasa angular boilerplate.

/* eslint-disable @typescript-eslint/no-explicit-any */
import { MonoTypeOperatorFunction, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/**
 * Symbol of `destroy` subject property.
 */
const destroyProp = Symbol('Destroy$Prop');

/**
 * Destroyable component decorator.
 * Provides ability to use `takeUntilDestroy` operator for certain component.
 */
// eslint-disable-next-line
export function DestroyableComponent() {
  return <T extends new (...args: any[]) => any>(constructor: T): T => {
    const originalNgOnDestroy = constructor.prototype.ngOnDestroy;

    // Symbol for private value wrapped with getter `destroyProp`/
    const destroyValue = Symbol('Destroy$Value');

    Object.defineProperty(constructor.prototype, destroyProp, {
      get(): Subject<void> {
        if (this[destroyValue] == null) {
          this[destroyValue] = new Subject<void>();
        }
        return this[destroyValue];
      },
    });

    /**
     * It's important to use simple function expression to save context.
     */
    constructor.prototype.ngOnDestroy = function(): void {
      if (this[destroyValue] != null) {
        // Could be null if destroyProp getter has not beed called (no takeUntilDestroy usage for `this`).
        this[destroyValue].next();
        this[destroyValue].complete();
      }
      if (originalNgOnDestroy) {
        originalNgOnDestroy.call(this);
      }
    };

    return constructor;
  };
}

/**
 * Emits the values emitted by the source `Observable` until provided component instance is destroyed by Angular.
 * @param componentInstance Component instance. **Have to be wrapped by the `DestroyableComponent` decorator.**.
 *
 * @example
 * ```ts
 * \@DestroyableComponent()
 * \@Component({...})
 * export class Component implements OnInit {
 *
 *  private readonly data$ = of(3);
 *
 *  public ngOnInit(): void {
 *    // Observable would be completed when `ngOnDestroy` is called by the framework
 *    this.data$.pipe(
 *      takeUntilDestroy(this),
 *    ).subscribe(console.log);
 *  }
 * }
 * ```
 */
export function takeUntilDestroy<T>(componentInstance: any): MonoTypeOperatorFunction<T> {
  const destroy$ = componentInstance[destroyProp] as Observable<void>;
  if (destroy$ == null) {
    throw new Error('To use the `takeUntilDestroy` operator passed component should be wrapped with `DestroyableComponent` decorator');
  }
  return takeUntil(destroy$);
}
