import { CaseReducer } from '@reduxjs/toolkit';

export const pendingReducer: CaseReducer = state => {
  state.loading = true;
};

export const rejectedReducer: CaseReducer = (state, action) => {
  if (action.error.message) {
    state.error = action.error.message;
  }
  state.loading = false;
};
