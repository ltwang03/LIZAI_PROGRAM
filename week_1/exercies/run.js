require("./prototypes.array");

const array = [1, 2, 3, 4, 5];
const array2 = ["baden", undefined, "test", 1, null];
const arrayString = ["baden", "thanh quang", "test"];

array.my_map((value, index) => {
  console.log(value * 2);
});

array.map((value, index) => {
  console.log(value * 2);
});

array2.my_map((value, index) => {
  console.log(value + 1);
});

array2.map((value, index) => {
  console.log(value + 1);
});

arrayString.my_find((value, index) => {
  if (value > "baden") console.log(value);
});

array.my_find((value, index) => {
  if (value > 1) console.log(value);
});

array2.my_find((value, index) => {
  if (value == undefined) console.log(value);
});

array.my_filter((value, index) => {
  if (value != 2) console.log(value);
});

arrayString.my_filter((value, index) => {
  if (value != "test") console.log(value);
});

array2.my_filter((value, index) => {
  if (value != undefined) console.log(value);
});

const myReduce = array.my_reduce((acc, cur) => {
  return acc + cur;
}, 0);
console.log(myReduce);

const myReduce1 = arrayString.my_reduce((acc, cur) => {
  return acc + cur;
});
console.log(myReduce1);
