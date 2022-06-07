![flujo de trabajo de ejemplo](https://github.com/katchvidal/server-graphql-2022/actions/workflows/artifact.yml/badge.svg)

#   Aplicacion de Angular con manejador de Estado NGRX
```
    npm install -> Install all the dependecies required
    run server node backend: npm run server
    run angular application: npm start
    
```

##  Instalando NGRX
```
    -   ng add @ngrx/store --minimal false
    -   ng add @ngrx/store-devtools@latest

    Creando un reducer en un punto especifico
    ng g store <path>/<name> --module <module name>
```

##  NGRX SELECTORS
```
    -   Podemos hacer uso de selectores para poder tener acceso a propiedades guardadas en el store
        usando las propiedades -> this.store.select('<name property>')
    -   Otro tipo de funcion que podemos utilizar
        this.isLogOut$ = this.store
            .pipe(
                select(state => !state['auth'].user)
            )

    -   Otro tipo es crear una funcion que nos proporciona NGRX Store

    selector.ts:
    export const isLogOut = createSelector(
        state => state['auth'],
        ( auth ) => !auth.user //  Vuelve un String un boolean
    );

    this.isLoggedIn$ = this.store
    .pipe(
        select( isLoggedIn )
    )
```