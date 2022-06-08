import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { finalize, first, tap } from "rxjs/operators";
import { AppState } from "../reducers";
import { LOADEDALLCOURSES } from "./course.action";


@Injectable()
export class CoursesResolver implements Resolve<any> {
    loading = false;
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<any> {

        return this.store.pipe(
            tap(() => {
                if (!this.loading) {
                    this.loading = true;
                    this.store.dispatch(LOADEDALLCOURSES());
                }
            }),
            first(),
            finalize(() => this.loading = false)
        );

    }

    constructor(private store: Store<AppState>) { }
}