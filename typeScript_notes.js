// import
import { myOtherComponent } from 'myOther.component';   //no   .ts at the end

//Decorators
@component() //takes a javascript object as an argument and add some metadata (do somethign in the background). That makes this class a Component which Angular2 can recognize.

//Angular2 implements the shadow DOM, so each component will have seperate style even with same html tag ex: <h1>

// create a component inside the current folder
ng g c component-name --flat -it -is    //--flat means create in current folder, | -it inline style | -is inline style

ng g cl recipe    // create a recipe class  cl - class

ng g d dropdown  // create a directive d - directive

ng g s log   // create a service  s - service

To debug: go to Chrome/source/localhost:4200/webpack:// /./src/app/

Another debug tool:  https://augury.angular.io  / install

// How to inject services to components:
1. import the service
2. use providers meta: selector: '', template:'', providers: [LogService]
3. define the type in the constructor:  constructor(private logService: LogService) {}
It's important of where the service is imported, if it's in the parent, then all the children components shared the same instance of that service

//slice method of array, will create an new array  ex: arr.slice(0)

// To inject a service into another service.
1. import the service
2. constructor
3. In order to receive injection from other services, you need @Injectable meta data:
    import { Injectable } from '@angular/core';
    @Injectable()

* Note: you don't need it if you just write a service but don't take other service as injection.

// pass data from one component to another.
1. dataService service: define a EventEmitter, and a pushData()
2. component a: on click of a button, call onSend(), which use the dataService to pushData() method, pushData() emits the data out.
3. component b: Trying to catch the emit data. In the lifecycle of OnInit, subscribe the EventEmitter created in component a.

//In dataServie:
pushedData = new EventEmitter<string>();

pushData(value: string) {
    this.pushedData.emit(value);
}

// In comp a:
import + constructor + @Injectable()
<button (click)="onSend(input.value)">Send</button>

onSend(value: string){
    this.dataService.pushData(value);
}


// In component b -
import + constructor + @Injectable()
constructor (provate dataService: DataService) {}
export class Compb implements OnInit {
    ngOnInit() {
        this.dataService.pushData.subscribe(
            data => this.value = data  // function (data) { return this.value = data}  using => resolve the innerfunction this issue...
        );
    }
}

//Emit and catch eventListener between components, can use EventBinding.

//Routes in Angular2
1. At root folder, define a app.routing.ts, need to import :   import { Routes, RouterModule } from '@angular/router'; all comoponents too.
const APP_ROUTES: Routes = [     //define a constant which is Routes type.  array
    { path: 'user', component: UserComponent },   //give path and which component to load
    { path: '', component: HomeComponent }
];

export const routing = RouterModule.forRoot(APP_ROUTES);  //call the RouterModule.forRoot function pass in the const defined above.

2. app.module.ts
imports: [BrowserModule, routing],   //imoirts meta, import the routing const which export from the app.routing.ts

3. in the root html - app.component.html
add <router-outlet></router-ourlet>  tag to indicates where to load the root component.

//nested Routes
1. add route.ts in the parent component, and define the path and component., path is the additinal path, after the parent route.
2. add in the app.routing.ts, showing this parent route has child:
const APP_ROUTES: Routes = [
    { path: 'user/:id', component: UserComponent },
    { path: 'user/:id', component: UserComponent, children: USER_ROUTES }, // need to import the USER_ROUTES from point 1.
    { path: '', component: HomeComponent }
];
3. in the parent component html, add <router-outlet></router-outlet> to display the child route in the parent comonent.

// see Routing - start notes for how to pass and subscribe the param (:id), queryparam (?analytics=100) & fragment (#section1)

// redirectTo a route:  by default, it do partial match.
{ path: 'user', redirectTo: '/user/1', pathMatch: 'full' },

//wildcard routes:
const APP_ROUTES: RouterConfig = [  //use RouterConfig here, also apply to redirectTo case above.
    { path: 'user/:id', component: UserComponent },
    { path: 'user/:id', component: UserComponent, children: USER_ROUTES },
    { path: '', component: HomeComponent },
    { path: '**', redirectTo: '/user/1', pathMatch: 'full' }  //if not match anything, go to /user/1
];

// showing style for active link in html: define a css style for active.
<div routerLinkActive="active" [routerLinkActiveOptions]={exact: true}></div>

//PIPES only change the way we see them on the view
//Angular2 Pipes. For documentation: go to angular.io  --> Docs --> API reference --> search for certain pipe
let myValue = "lowercase";
<p>{{myValue | uppercase}}</p>  // output:  LOWERCASE
<p>{{myValue | slice:2}}</p>  //output: wercase
<p>{{myValue | slice:5}}</p>  //output: case
<p>{{myValue | slice:3:7}}</p>  //output: erca

let myDate = new Date(2016,5,24;)
<p>{{myDate | date}}</p>  //Jun 24, 2016
<p>{{myDate | date:"MM/dd/yy"}}</p>  //06/24/16

//chaining Pipes
<p>{{myValue | slice:3:7 | uppercase}}</p>   //output: ERCA

//custom pipe:   ng g p doublepipe      p -> pipe

//pure pipe vs. impure pipe.
pure: true // by default
pure: false  // make the pipe impure. Try to avoid use impure pipe, will effect performance. It listens to the events on ....

//async pipe, will listen to the data untill the async is resolved, then put data in the view.
<h2>Async Pipe</h2>
<p>{{asyncValue | async}}</p>

asyncValue = new Promise((resolve, reject) => {
    setTimeout(() => resolve('Data is here!'), 2000);
});

//@ngModule
declarations: [] //contains all the components, directive, pipes offered in the application.
imports: []  //import angular2 modules - packges, features.
bootstrap: []  // indicate the component you want to bootstrap from.
providers: []  // all the services you want to make available for injection. they are @Injectable().
