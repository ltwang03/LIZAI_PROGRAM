// Viết một hàm calculateSquare nhận vào một mảng các số nguyên và một callback function callback.
// Hàm này sẽ tính bình phương của từng số trong mảng và gọi callback với kết quả làm tham số.

const calculateSquare = (array, callback) => {
  const result = array.map((value) => value * 2);
  callback(result);
};
const array = [1, 2, 4, 5, 7];

calculateSquare(array, (result) => {
  console.log(result);
});
// Viết một hàm findMax nhận vào một mảng các số nguyên và một callback function callback.
// Hàm này sẽ tìm số lớn nhất trong mảng và gọi callback với số lớn nhất làm tham số.

const findMax = (array, callback) => {
  let max = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i] > max) {
      max = array[i];
    }
  }
  callback(max);
};

findMax(array, (result) => console.log(result));

// Viết một hàm calculateAverage nhận vào một mảng các số nguyên và một callback function callback.
// Hàm này sẽ tính trung bình cộng của các số trong mảng và gọi callback với kết quả làm tham số.

const calculateAverage = (array, callback) => {
  const total = array.reduce((acc, cur) => {
    return acc + cur;
  }, 0);
  callback(total / array.length);
};

calculateAverage(array, (result) => console.log(result));
