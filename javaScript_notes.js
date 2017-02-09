Closure creates private namespace to avoid name conflict between components, modules.

(function($){
  /* jQuery plugin code referencing $ */
})(jQuery);

'use strict'  - enforce a stricter parsing and error handling at runtime.
- make debugging easier
- prevent accidental global
- Eliminates this coercion
- Disallow duplicate property name and params
- eval()
- throw an error on the invalid usage of delete

 NaN
 5/0   --> NaN
 "ask"/4 --> NaN
 console.log(typeof NaN === 'number');    // true
 console.log(NaN === NaN);                // false

 ES6:  Number.isNaN()


function sum (x) {
  if (arguments.length == 2) {
    return argument[0] + argument[1];
  } else {
    return function (y) {
      return x+y;
    }
  }
}

- closure, global value.
//wrong i value, i =5 globally
for (var i = 0; i < 5; i++) {
  var btn = document.createElement('button');
  btn.appendChild(document.createTextNode('Button ' + i));
  btn.addEventListener('click', function(){ console.log(i); });
  document.body.appendChild(btn);
}

//correct inside each loop, put in a namespace and pass in global i to a seperate namespace to store the value.
for (var i = 0; i < 5; i++) {
  var btn = document.createElement('button');
  btn.appendChild(document.createTextNode('Button ' + i));
  btn.addEventListener('click', (function(i) {
    return function() { console.log(i); };
  })(i));
  document.body.appendChild(btn);
}

//arr2 is a reference to arr1, arr1.reverse() will reverse arr1 itself, and return a reference to arr2
var arr1 = "john".split('');
var arr2 = arr1.reverse();
var arr3 = "jones".split('');
arr2.push(arr3);
console.log("array 1: length=" + arr1.length + " last=" + arr1.slice(-1));
console.log("array 2: length=" + arr2.length + " last=" + arr2.slice(-1));

// number & string
console.log(1 +  "2" + "2");   //122
console.log(1 +  +"2" + "2");   //32
console.log(1 +  -"1" + "2");   //02
console.log(+"1" +  "1" + "2");   //112
console.log( "A" - "B" + "2");    //NaN2
console.log( "A" - "B" + 2);      //NaN

//Use setTimeout to resolve stack overflow caused by recursive function. setTimeout put function on the event loop and call stack.
var list = readHugeList();

var nextListItem = function() {
    var item = list.pop();

    if (item) {
        // process the list item...
        setTimeout( nextListItem, 0);
    }
};

//Closure: an inner function can access it's own param, var, outerfunction's param, var & global var.
var globalVar = "xyz";

(function outerFunc(outerArg) {
  var outerVar = 'a';

  (function innerFunc(innerArg) {
    var innerVar = 'b';

    console.log(
      "outerArg = " + outerArg + "\n" +
      "innerArg = " + innerArg + "\n" +
      "outerVar = " + outerVar + "\n" +
      "innerVar = " + innerVar + "\n" +
      "globalVar = " + globalVar);

  })(456);
})(123);

// How to fix? global i, need to be passed in and saved in a namespace
for (var i = 0; i < 5; i++) {
  setTimeout(function() { console.log(i); }, i * 1000 );
}
//fix
for (var i = 0; i<5; i++) {
  (function(x) {
    setTimeout (function() {console.log(x); }, x * 1000 );
  })(i);
}

//  || and && are logical operators that return the first fully-determined logic value
0 || 1 = 1  //0 false, so check 1, result T
1 || 2 = 1  // 1 is true, return T, no more check
0 && 1 = 0  // o is false, && is false, no more check
1 && 2 = 2  // 1 is true, keep check 2, return 2

// ==  && ===
console.log(false == '0')   // coercion the values first, then compare.
console.log(false === '0')  // compare 2 sides, need to be same type and same value

//Stingify the parameter value, b & c both stringify to [object Object], so they are the same.
var a={},
    b={key:'b'},
    c={key:'c'};

a[b]=123;
a[c]=456;

console.log(a[b]);  // 456
console.log(a); // Object {[object, Object]: 456}

//10! recursive function
console.log((function f(n) {return ((n > 1) ? n * f(n-1) : n)})(10));

//bind
var hero = {
    _name: 'John Doe',
    getSecretIdentity: function (){
        return this._name;
    }
};

var stoleSecretIdentity = hero.getSecretIdentity;
var stoleSecretIdentity = hero.getSecretIdentity.bind(hero); // fix for the above line

console.log(stoleSecretIdentity());  // returns undefined, because function's execution context is global, no _name property in global
console.log(hero.getSecretIdentity());

//traverse
function traverse(element, cb) {
  cb(element);
  var kids = element.children;
  kids.forEach(function (kid) {traverse(kid, cb);})
}

// apply & call
theFunction.apply(valueForThis, arrayOfArgs)
theFunction.call(valueForThis, arg1, arg2, ...)

 function f(name, profession) {
   console.log(`My name is $name and I am a $profession`)
 }

 f.apply(undefined, ["Susan", "Teacher"]);
 f.call(undefined, "Nina", "Enginner"));
