import { User } from 'src/models/user';

/**
 * User state.
 */
export interface UserState {
  /** User. */
  readonly user: User | null;

  /** Error. */
  readonly error?: string;

  /** Loading. */
  readonly loading: boolean;
}

export const initialState: UserState = {
  user: null,
  loading: false,
};
