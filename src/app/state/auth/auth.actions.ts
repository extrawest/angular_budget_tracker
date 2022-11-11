import { createAction } from '@ngrx/store';

export enum AuthActionTypes {
  Logout = '[Auth] Logout',
}

export const logout = createAction(
  AuthActionTypes.Logout,
);
