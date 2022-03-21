/**
 * State boilerplate data.
 */
export interface StateData {
  /**
   * Status.
   */
  status: 'idle' | 'loading' | 'succeeded' | 'failed';

  /** Error. */
  error: string | null;
}
