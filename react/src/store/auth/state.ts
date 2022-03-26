import { User } from 'src/models/user';
import { StateData } from '../shared/StateData';

/**
 * Auth state.
 */
export interface AuthState extends StateData {
  /** Auth. */
  readonly user: User | null;
}

export const initialState: AuthState = {
  user: null,
  loading: true,
};
