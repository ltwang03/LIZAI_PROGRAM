const array = [-5, 2, 3, 4, 5, 7, 6, 8];
// phương thức push là phương thức để thêm mới phần tử vào đuôi
array.push(1);
//phương thức unshift là phương thức để thêm mới phần tử vào đầu
array.unshift(2);
//phương thức pop là phương thức xóa phần từ cuối cùng của mảng
array.pop();
//phương thức shift là phương thức xóa phần từ đầu tiên của mảng
array.shift();

//filter là phương thức lọc ra những phần tử mà mình cần và trả về 1 array mới
// reduce là phương thức sử dụng để thực hiện 1 phép tính tích lũy trên mảng phần tử và trả về 1 giá trị duy nhất nhận vào 1 callback và 1 giá trị ban đầu
const sumEvenNumbers = (arr) => {
  const evenNumbers = arr.filter((value) => value % 2 === 0);
  const sum = evenNumbers.reduce((cur, acc) => cur + acc, 0);
  return sum;
};

console.log(sumEvenNumbers(array));

const findLongestWord = (arr) => {
  const maxLength = arr.reduce((max, word) => {
    return Math.max(max, word.length);
  }, 0);
  const filterWord = arr.filter((value) => value.length === maxLength);
  return filterWord;
};
const arrayString = ["test", "thanhQuang", "baden"];
console.log(findLongestWord(arrayString));
//Hàm forEach() trong JavaScript được sử dụng để lặp qua từng phần tử của một mảng và sẽ lấy được value và index của phần tử trong mảng đó
const findMax = (arr) => {
  let max = 0;
  arr.forEach((value) => {
    if (value > max) {
      max = value;
    }
  });
  return max;
};
console.log(findMax(array));
// hàm map() là hàm mình lặp qua nó và trả về 1 hàm mới và có thể thay đổi giá trị trong hàm đó
const squareNumbers = (arr) => {
  return arr.map((value) => value * value);
};

console.log(squareNumbers(array));
// hàm Array.from() dùng để tạo ra mảng mới và tách ra
const name = "thanhquang";
const nameArray = Array.from(name);
console.log(nameArray);
// hàm sort để sắp xếp mảng theo thứ tự tăng dần hoặc giảm dần
const sortArrDesc = (arr) => {
  return arr.sort((a, b) => (a > b ? 1 : -1));
};
const sortArrAsc = (arr) => {
  return arr.sort((a, b) => (a > b ? -1 : 1));
};
console.log(sortArrDesc(array));
console.log(sortArrAsc(array));
// hàm every() sẽ kiểm tra từng phần tử trong mảng phù hợp với điều kiện hay không nếu có 1 phần từ không phù hợp với điều kiện thì sẽ trả về false hàm every phải là tất cả phù hợp mới trả về true
const checkTypeInArray = (arr, type) => {
  return arr.every((t) => typeof t === type);
};

// console.log(checkTypeInArray(array, "number"));
// hàm some() sẽ kiểm tra phần từ nếu có 1 phần tử phù hợp với điều kiện sẽ trả về true nếu không có phần từ nào phù hợp sẽ trả về false
const hasNegativeNumbers = (arr) => {
  return arr.some((n) => n < 0);
};
const array2 = [1, 2, 3, 4, 5];

console.log(hasNegativeNumbers(array2));
//hàm slice được sử dụng để sao chép mảng đó và trả về 1 mảng mới chứa các phần tử đã sao chép ngoài ra còn có thể trả về mảng mới dựa theo range của tham số truyền vào là (start, end)
const slicedArray = array.slice(1, 4);
console.log(slicedArray);
// hàm concat là hàm nối 2 chuỗi với nhau
const newArray = array.concat(array2);
console.log(newArray);
