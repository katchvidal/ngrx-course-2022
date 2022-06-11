import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { filter, finalize, first, map, tap } from "rxjs/operators";
import { AppState } from "../reducers";
import { LOADEDALLCOURSES } from "./course.action";
import { areCoursesLoaded } from "./courses.selector";
import { CourseEntityServce } from "./services/course-entity.service";


@Injectable()
export class CoursesResolver implements Resolve<any> {
    // loading = false;
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<any> {

        // return this.store.pipe(
        //     select(areCoursesLoaded),
        //     tap((areCoursesLoaded) => {
        //         if (!this.loading && !areCoursesLoaded) {
        //             this.loading = true;
        //             this.store.dispatch(LOADEDALLCOURSES());
        //         }
        //     }),
        //     filter(coursesLoaded => coursesLoaded),
        //     first(),
        //     finalize(() => this.loading = false)
        // );

        return this.courseService.loaded$
            .pipe(
                tap(( loaded ) => {
                    if( !loaded ){
                        // this.loading = true;
                        this.courseService.getAll()
                    }
                }),
                filter( loaded => !loaded),
                first(),
                // finalize(() => this.loading = false)
            )
    }

    constructor(private store: Store<AppState>,
        private courseService: CourseEntityServce
    ) { }
}