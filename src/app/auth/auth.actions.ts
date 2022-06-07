import { createAction, props } from "@ngrx/store";
import { User } from "./model/user.model";


export const LOGIN = createAction(
    '[LOGIN PAGE] User Login',
    props<{ user: User }>()
)

export const LOGOUT = createAction(
    '[TOP MENU] User Logout',   
)