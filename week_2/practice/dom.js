// tìm kiếm bằng id
const element = document.getElementById("name");
console.log(element);

// tìm kiếm bằng tag name vì method này là tìm kiếm 1 Collection nên phải chọn phần tử ở đây chọn phần từ đầu tiên
const elementHeading = document.getElementsByTagName("h1")[0];
console.log(elementHeading);
// tìm kiếm bằng class name, trả về 1 collection
const elementNavbar = document.getElementsByClassName("navbar")[0];
console.log(elementNavbar);
// tìm kiếm bằng css selector trả về 1 nodelist và queryselector có thể tìm với: id, class,tag
const elementLi = document.querySelectorAll("li");

// tìm kiếm với queryselector sẽ trả về 1 tag duy nhất
const elementLi1 = document.querySelector("li");
console.log(elementLi);

const elementTaga = document.querySelector("a");
elementTaga.href = "https://google.com";

// thêm thẻ  nằm trong element
elementHeading.innerHTML = `<p>Baden</p>`;
//thay đổi giá trị của thẻ
elementTaga.innerText = `vnexpress`;
// chỉnh sửa các attribute của thẻ
elementTaga.setAttribute(`href`, "https://vnexpress.net");
// create 1 tag mới
const new3 = document.createElement("div");
//tạo 1 text node
const newContent = document.createTextNode("OK OK");
//append text vào tag mới
new3.appendChild(newContent);
//insert thẻ vào ở trước element Navbar
document.body.insertBefore(new3, elementNavbar);
// remove 1 element
document.removeChild(elementNavbar);
// hoặc có thể remove như thế này
elementNavbar.remove();
// sử dụng onclick để thêm sự kiện vào thẻ
document.querySelector("h3").onclick((event) => {
  //code
});
// hoặc có thể sử dụng addEventListener
document.querySelector("h3").addEventListener("click", (e) => {});

elementNavbar.parentNode; //lấy ra node cha
elementNavbar.childNodes[0]; // mảng các node con
elementNavbar.firstChild; // node con đầu tiên
elementNavbar.lastChild; // node con cuối cùng
elementNavbar.nextSibling; // node ngay phía sau
elementNavbar.previousSibling; // node ngay phía trước

let e = document.getElementById("title");
e.nodeType; // lấy ra node type trả về 1 số
function handleButton() {}
document.getElementsByClassName("button")[0].onclick = handleButton();

//xử lý khi click vào phần tử
element.addEventListener("click", function (event) {});
// event được kích hoạt khi 1 phím trên bàn phím được nhất
element.addEventListener("keydown", function (event) {});
// Xử lý khi form được submit
element.addEventListener("submit", function (event) {});
// Xử lý khi con trỏ chuột đi qua phần tử
element.addEventListener("mouseover", function (event) {});
// Xử lý khi giá trị của phần tử nhập liệu thay đổi
element.addEventListener("change", function (event) {});
// Xử lý khi tài nguyên được tải hoàn thành
element.addEventListener("load", function (event) {});
