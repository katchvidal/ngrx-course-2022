import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { filter, finalize, first, tap } from "rxjs/operators";
import { AppState } from "../reducers";
import { LOADEDALLCOURSES } from "./course.action";
import { areCoursesLoaded } from "./courses.selector";


@Injectable()
export class CoursesResolver implements Resolve<any> {
    loading = false;
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<any> {

        return this.store.pipe(
            select( areCoursesLoaded ),
            tap((areCoursesLoaded) => {
                if (!this.loading && !areCoursesLoaded ) {
                    this.loading = true;
                    this.store.dispatch(LOADEDALLCOURSES());
                }
            }),
            filter(coursesLoaded => coursesLoaded ),
            first(),
            finalize(() => this.loading = false)
        );

    }

    constructor(private store: Store<AppState>) { }
}