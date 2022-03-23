import { User } from 'src/models/user';

/**
 * Auth state.
 */
export interface AuthState {
  /** Auth. */
  readonly user: User | null;

  /** Error. */
  readonly error?: string;

  /** Loading. */
  readonly loading: boolean;
}

export const initialState: AuthState = {
  user: null,
  loading: true,
};
