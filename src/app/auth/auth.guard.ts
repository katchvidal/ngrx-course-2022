//  Guard is an Angular function to protected a specific routes

import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate,  Router,  RouterStateSnapshot, } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { AppState } from "../reducers";
import { isLoggedIn } from "./selector";

@Injectable()
export class AuthGuard implements CanActivate {

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean> {
        return this.store.pipe(
            select( isLoggedIn ),
            tap( loggedIn => {
                if( !loggedIn ){ 
                    this.route.navigateByUrl('/login')
                }
            })
        )
    }

    constructor(
        private store: Store<AppState>,
        private route: Router,
    ) { }
}