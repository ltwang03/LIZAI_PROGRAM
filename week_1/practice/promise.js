// sử dụng promise để call api
function fetchData(url) {
  const promise = new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => {
        if (res.ok) {
          resolve(res.json());
        } else {
          reject(new Error(`request fail`));
        }
      })
      .catch((err) => reject(err));
  });
  return promise;
}
fetchData("https://pokeapi.co/api/v2/pokemon/ditto")
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
// sử dụng promise để check prime của number
function checkPrime(n) {
  const promise = new Promise((resolve, reject) => {
    if (n <= 1) {
      resolve(false);
    } else {
      for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) {
          resolve(false);
          return;
        }
      }
      resolve(true);
    }
  });

  return promise;
}

const number = 17;
checkPrime(number)
  .then((result) => {
    if (result) {
      console.log(`${number} là số nguyên tố.`);
    } else {
      console.log(`${number} không là số nguyên tố.`);
    }
  })
  .catch((error) => {
    console.error(error);
  });
const arrUrl = [
  "https://pokeapi.co/api/v2/pokemon/ditto",
  "https://pokeapi.co/api/v2/pokemon-species/aegislash",
];
// sử dụng promise.all để xử lý đồng thời api
const fetchPoke = (arrUrl) => {
  const promise = arrUrl.map((url) => fetch(url));

  Promise.all(promise).then((responses) => {
    const jsonPromise = responses.map((res) => res.json());
    Promise.all(jsonPromise).then((data) => {
      data.forEach((data) => console.log(data));
    });
  });
};

fetchPoke(arrUrl);

const fetchData1 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("OK 1");
    }, 2000);
  });
};

const fetchData2 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("OK 2");
    }, 3000);
  });
};
//chỉ trả về nhanh nhất
Promise.race([fetchData1(), fetchData2()])
  .then((res) => {
    console.log(res);
  })
  .catch((err) => console.log(err));
// chỉ trả về thành công và nhanh nhất
Promise.any([fetchData1(), fetchData2()])
  .then((res) => {
    console.log(res);
  })
  .catch((err) => console.log(err));
