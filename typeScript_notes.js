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
