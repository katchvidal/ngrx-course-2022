import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./reducers";

export const selectAuthState = createFeatureSelector<AuthState>("auth")

export const isLoggedIn = createSelector(
    selectAuthState,//  Propiedad a la que apuntamos 
    auth => !!auth.user //  Funcionalidad: Vuelve un String un boolean
);

export const isLogOut = createSelector(
    // selectAuthState,
    // auth => !auth.user
    isLoggedIn,
    loggedIn => !loggedIn
);