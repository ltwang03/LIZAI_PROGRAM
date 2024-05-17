let a = 5;
let b = 2;
let c = 7;

console.log(a + b); // Kết quả: 7
console.log(a - b); // Kết quả: 3
console.log(a * b); // Kết quả: 10
console.log(a / b); // Kết quả: 2.5
console.log(a % b); // Kết quả: 1

const aStr = "5";
const bStr = "2";
const cUn = undefined;
const dNull = null;
const object = { name: "quang" };

console.log(aStr + bStr); // Kết quả: 52
console.log(aStr - bStr); // Kết quả: 3
console.log(aStr * bStr); // Kết quả: 10
console.log(aStr / bStr); // Kết quả: 2.5
console.log(aStr % bStr); // Kết quả: 1

console.log(aStr + cUn); // Kết quả: 5Undefined
console.log(aStr - cUn); // Kết quả: NaN
console.log(aStr * cUn); // Kết quả: NaN
console.log(aStr / cUn); // Kết quả: NaN
console.log(aStr % cUn); // Kết quả: NaN

console.log(aStr + dNull); // Kết quả: 5Null
console.log(aStr - dNull); // Kết quả: 5
console.log(aStr * dNull); // Kết quả: 0
console.log(aStr / dNull); // Kết quả: Infinity
console.log(aStr % dNull); // Kết quả: NaN

console.log(aStr + object); // Kết quả: 5[object Object]
console.log(aStr - object); // Kết quả: NaN
console.log(aStr * object); // Kết quả: NaN
console.log(aStr / object); // Kết quả: NaN
console.log(aStr % object); // Kết quả: NaN
// toán tử gán
a += b;
console.log(a); // Kết quả: 7

// let c = 10;
c -= 3;
console.log(c); // Kết quả: 7

let d = 3;
d *= 4;
console.log(d); // Kết quả: 12

let e = 8;
e /= 2;
console.log(e); // Kết quả: 4

let f = 7;
f %= 3;
console.log(f); // Kết quả: 1

// toán tử so sánh
console.log(a == b); // Kết quả: false
console.log(a === aStr); // Kết quả: false
console.log(a != b); // Kết quả: true
console.log(a !== aStr); // Kết quả: true
console.log(a > b); // Kết quả: true
console.log(a < b); // Kết quả: false
console.log(a >= b); // Kết quả: true
console.log(a <= b); // Kết quả: false

// toán tử logic

console.log(a > b && b < c); // Kết quả: true
console.log(a > b || b > c); // Kết quả: true
console.log(!(a > b)); // Kết quả: false
// toán tử chuỗi
let str1 = "Hello";
let str2 = "World";

let result = str1 + " " + str2;
console.log(result); // Kết quả: "Hello World"

// toán tử 3 ngôi
let age = 20;
let message = age >= 18 ? "Lớn" : "Nhỏ";
console.log(message); // Kết quả: "Adult"

// toán tử tăng giảm
console.log(a++);
console.log(b--);
