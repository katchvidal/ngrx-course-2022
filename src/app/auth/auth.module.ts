import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";

import { AuthService } from "./auth.service";
import { StoreModule } from '@ngrx/store';
import * as fromAuth from './reducers';



@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        RouterModule.forChild([{ path: '', component: LoginComponent }]),
        // StoreModule.forFeature(fromAuth.authFeatureKey, authReducer, { metaReducers: fromAuth.metaReducers }),
        StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.authReducer),
    ],
    declarations: [LoginComponent],
    exports: [LoginComponent]
})
export class AuthModule {
    static forRoot(): ModuleWithProviders<AuthModule> {
        return {
            ngModule: AuthModule,
            providers: [
                AuthService
            ]
        }
    }
}