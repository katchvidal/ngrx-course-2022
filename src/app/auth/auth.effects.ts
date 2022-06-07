import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { tap } from "rxjs/operators";
import { AuthActions } from "./action-types";


@Injectable()
export class AuthEffects {

    login$ = createEffect(() =>
        this.actions$
            .pipe(
                ofType(AuthActions.LOGIN),
                tap(action => {
                    localStorage.setItem('user', JSON.stringify(action.user))
                })
            ), { dispatch: false }
    )

    logout$ = createEffect(() =>
        this.actions$
            .pipe(
                ofType( AuthActions.LOGOUT ),
                tap( action => {
                    localStorage.removeItem('user'),
                    this.route.navigate(['/login'])
                })
            ), { dispatch: false }
    )
    constructor(private actions$: Actions, public route: Router ) { }
}