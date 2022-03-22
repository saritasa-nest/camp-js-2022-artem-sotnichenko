/**
 * State boilerplate data.
 */
export interface StateData {
  /** Status. */
  readonly status: 'idle' | 'loading' | 'succeeded' | 'failed';

  /** Error. */
  readonly error: string | null;
}
