Array.prototype.my_map = function (callback) {
  let newArray = [];
  for (let i = 0; i < this.length; i++) {
    newArray.push(callback(this[i], i, this));
  }
  return newArray;
};

Array.prototype.my_find = function (callback) {
  for (let i = 0; i < this.length; i++) {
    const element = this[i];
    if (callback(element)) {
      return element;
    }
  }
  return undefined;
};

Array.prototype.my_filter = function (callback) {
  const filterArr = [];
  for (let i = 0; i < this.length; i++) {
    if (!!callback(this[i], i, this)) {
      filterArr.push(this[i]);
    }
  }
  return filterArr;
};

Array.prototype.my_reduce = function (callback, acc) {
  if (this.length < 1) {
    return [];
  }
  if (!acc) {
    if (typeof this[0] == "string") {
      acc = "";
    } else if (typeof this[0] == "number") {
      acc = 0;
    }
  }
  for (let i = 0; i < this.length; i++) {
    acc = callback(acc, this[i]);
  }
  return acc;
};
