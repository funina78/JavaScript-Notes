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


//production deploy:
1. run: ng build -prod
2. git add .
3. git commit -m"ready"
4. to Deploy, you need the whole /dist folder.

//ng commands
ng init --name angular2-cli  --prefix ac   //if you already have a folder, cd to the folder and run ng init will init a project
ng new angular2-cli  // if no folder created yet.

ng build
ng serve // will build the project and host a server to serve the project, localhost:4200
ng serve -p 4300  // if you want to run on another port, -p will overwrite the port
ng lint // find lint error based on the config
ng test //run unit test
ng generate component Books  // ng g c Books   -- same thing
ng g c book --flat -it -is  // will generate a component with inline-template, inline-style in the current folder
ng destroy component book --flat //will remove the book component
ng g route bookshelf --lazy // generate a lazy route
ng build -prod  // build for production bundle for everything needed for production, minify, stripe out the things don't need - get production ready dist folder
goto root folder | git init | git add . | git commit -m"" | ng github-pages:deploy | need to give a token, how to get it? (line below)
go to: https://github.com/settings/tokens --> Generate new token --> login --> token description -->public repo checkbox checked --> generate token --> copy the token --> go back to commandline paste the token. --> enter github username --> copy the page link
ng --help // to see the docs for ng commands.  Or github page for angular cli

//project structure
/src  -- folder holds components, directives, services
/src/environments  -- folder holds production and develop environment indicator

inside src folder:
index.html  -- doesnot contain any script, but will added by angular2 framework dynamically when builds the project
main.ts  -- bootstrap/starts the angular2 application.
polyfills.ts   -- imports core-js and zone.js our application needs. this file is imported by main.ts, so these core/zone js file will be included in our bundle
style.css  --- you can add global style here
test.ts   -- use to run your tests, normally do not need to change anything here.
tsconfig.json -- config our typescript compiler, normallt do not need to change anything here
typings.d.ts   -- decalre the type when typescript don not know what type

/dist --  holds our compiled project
main.bundle  -- project code + angular2 framework + all dependencies code
style.bundle -- bundle of our styles
inline.bundle  --  webpack to have our application run correctly

/e2e   - End to End testing folder

At root folder:
angular-cli.json  -- config angular cli
karma.conf.js  -- unit test config using karma as test runner
protractor.conf.js -- config for e2e test
package.json  --  all the dependencies for this project
tslint.json  -- define the linting of project
