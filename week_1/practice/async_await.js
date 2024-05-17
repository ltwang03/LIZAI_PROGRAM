// fetch api bằng async await.
const fetchApi = async (url) => {
  const res = await fetch(url);
  if (res.ok) {
    const json = await res.json();
    console.log(json);
  } else {
    return new Error("api not found");
  }
};

fetchApi("https://pokeapi.co/api/v2/pokemon/ditto");
// so sánh 2 mảng sử dụng async và promise
async function foo() {
  return `bar`;
}
function foo2() {
  return Promise.resolve(`bar`);
}
// tạo 1 promise và resolve kết quả
function resolvePromise() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("resolved"), 2000);
  });
}
// sử dụng await để gọi từ hàm resolve
async function asyncCall() {
  console.log(`calling`);
  const result = await resolvePromise();
  console.log(result);
}

asyncCall();
