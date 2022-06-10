import { Update } from "@ngrx/entity";
import { createAction, props } from "@ngrx/store";
import { Course } from "./model/course";


//  Empezar la Carga
export const LOADEDALLCOURSES = createAction(
    '[COURSE RESOLVERS] LOAD ALL COURSES',
)

//  Obtener todos los Cursos despues de haber termiando de Cargarlos
export const ALLCOURSESLOADED = createAction(
    '[LOAD COURSES EFFECT] ALL COURSES LOADED',
    props<{ courses: Course[] }>()
)

// export const ALLCOURSESFIALED = createAction(
//     '[LOAD COURSES FAILED EFFECT] ALL COURSES LOADED FAILED',
//     props<{ payload: any }>()
// )

export const COURSESUPDATE = createAction(
    '[UPDATE COURSES DIALOG] UPDATE COURSE',
    props<{ update: Update<Course> }>()
)