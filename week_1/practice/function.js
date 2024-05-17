// function declaration
function sayQuang() {
  console.log("Quang!");
}
// function Expression
let sayHello = function () {
  console.log("Hello!");
};
sayHello();

// arrow function
let sayHello = () => {
  console.log("Hello!");
};

sayHello();

// constructor
function Person(name, age) {
  this.name = name;
  this.age = age;
}

let person1 = new Person("Quang", 25);
console.log(person1.name); // Kết quả: "John"
console.log(person1.age);
