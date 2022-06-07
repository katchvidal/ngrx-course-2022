import { Component, OnInit } from '@angular/core';
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map, tap } from 'rxjs/operators';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { AppState } from './reducers';
import { isLoggedIn, isLogOut } from './auth/selector';
import { LOGIN, LOGOUT } from './auth/auth.actions';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  loading = true;

  isLoggedIn$: Observable<boolean>;  //  Observable esta logueado?¿
  isLogOut$: Observable<boolean>;  //  Observable esta logueado?¿
  userProfile = localStorage.getItem('user')
  constructor(
    private router: Router,
    private store: Store<AppState>
  ) {

  }

  ngOnInit() {
    this.store.dispatch(LOGIN({ user: JSON.parse(this.userProfile)})) //  Si el Usuario recargo / cerro el navegador podemos rescatar su inicio de session
    this.router.events.subscribe(event => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
    // this.store.subscribe( state => console.log( state ))
    this.isLoggedIn$ = this.store
      .pipe(
        select( isLoggedIn )
      )
    this.isLogOut$ = this.store
      .pipe(
        select( isLogOut ),
        // tap(() => this.router.navigate(['/login']))
      )
  }


  logout() {
    this.store.dispatch( LOGOUT() )
  }

}
