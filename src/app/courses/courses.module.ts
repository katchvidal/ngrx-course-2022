import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { CoursesCardListComponent } from './courses-card-list/courses-card-list.component';
import { EditCourseDialogComponent } from './edit-course-dialog/edit-course-dialog.component';
import { CoursesHttpService } from './services/courses-http.service';
import { CourseComponent } from './course/course.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Routes } from '@angular/router';
// import { EntityDataService, EntityDefinitionService, EntityMetadataMap} from '@ngrx/data';
import { compareCourses, Course } from './model/course';

import { compareLessons, Lesson } from './model/lesson';
import { CoursesResolver } from './course.resolver';
import { EffectsModule } from '@ngrx/effects';
import { DataEffects } from './course.effects';
import { StoreModule } from '@ngrx/store';
import { courseReducer } from './course.reducer';
import { EntityDataService, EntityDefinitionService, EntityMetadataMap } from '@ngrx/data';
import { CourseEntityServce } from './services/course-entity.service';
import { CourseDataService } from './services/course-data.service';
import { LessonEntityServce } from './services/lesson-entity.service';
import { LessonDataService } from './services/lesson-data.service';

//  Modelo de entidad de tipo Course
const entityMetada: EntityMetadataMap = {
  Course: {
    sortComparer: compareCourses,
    entityDispatcherOptions : {
      optimisticUpdate: true,
      // optimisticAdd: true,
      optimisticDelete: true,
    }
  },
  Lesson: {
    sortComparer: compareCourses
  }
};
export const coursesRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: {
      courses: CoursesResolver
    }

  },
  {
    path: ':courseUrl',
    component: CourseComponent,
    resolve: {
      courses: CoursesResolver
    }
  }
];


@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatMomentDateModule,
    ReactiveFormsModule,
    RouterModule.forChild(coursesRoutes),
    // StoreModule.forFeature('courses', courseReducer),
    EffectsModule.forFeature([DataEffects])
  ],
  declarations: [
    HomeComponent,
    CoursesCardListComponent,
    EditCourseDialogComponent,
    CourseComponent
  ],
  exports: [
    HomeComponent,
    CoursesCardListComponent,
    EditCourseDialogComponent,
    CourseComponent
  ],
  entryComponents: [EditCourseDialogComponent],
  providers: [
    CoursesHttpService,
    CourseEntityServce,
    LessonEntityServce,
    CoursesResolver,
    CourseDataService,
  ]
})
export class CoursesModule {

  constructor(
    private eds: EntityDefinitionService, //  Generamos la definicion y llamada a usos de modelos de entidades
    private entityDataService: EntityDataService,
    private CourseDataService: CourseDataService, //  Servicio para poder hacer peticiones de tipo Course
  ) {
    eds.registerMetadataMap(entityMetada);
    entityDataService.registerService('Course', CourseDataService);
  }


}
