DOM

1.  DOM là gì?

DOM (Document Object Model) là một thực thể được tạo ra bởi trình duyệt khi load một trang web. DOM gồm nhiều element, tổ chức phân cấp theo dạng cây nên được gọi là DOM tree. Cấu trúc cây DOM khá giống với cấu trúc các element trong HTML document, các tag lồng nhau được mô hình hóa tương ứng trong DOM.

Ví dụ:

```
<html>
<head>
</head>
<body>
    <p>This is a simple paragraph</p>
    <div>
        <a href="">A link</a>
    </div>
</body>
</html>
```

Trang HTML trên khi được load, thì một đối tượng DOM tương ứng được trình duyệt tạo ra. Đối tượng DOM có cấu trúc phân cấp tương tự như các element trong trang HTML trên.

2.  DOM Tree

DOM chứa một cấu trúc cây của các node lồng nhau, thường được gọi là _DOM Tree_. Giống như cây phả hệ trong gia đình bạn bao gồm cha mẹ, anh chị em... Các node trong DOM cũng được gọi là _parent, children, sibling..._ tùy thuộc vào mối quan hệ của chúng với các node khác.

Ví dụ:

Document html - Root element head body p div a

3.  DOM API

    1.  Finding Elements

Để tìm kiếm các phần tử có trong DOM chúng ta có những cách sau:

- Tìm kiếm bằng id

```
const element = document.getElementById("name")
```

- Tìm kiếm bằng tag name

```
const elementHeading = document.getElementsByTagName("h1")
```

Lưu ý: getElementsByTagName sẽ tìm toàn bộ tag name là h1 nó trả về dạng Collection

- Tìm kiếm bằng class name

```
const elementNavbar = document.getElementsByClassName("navbar")
```

Lưu ý: getElementsByClassName sẽ trả về 1 Collection

- Tìm kiếm bằng CSS selector

```
const elementLi = document.querySelectorAll("li")
const elementLi1 = document.querySelector("li")
```

querySelector chỉ trả về 1 element nó tìm thấy đầu tiên

Lưu ý: querySelectorAll trả về 1 NodeList và querySelectorAll có thể tìm kiếm dựa theo: id, tag, class,…

- Tìm kiếm bằng object collections

b. Changing Elements

- Thêm thẻ nằm trong element

```
elementHeading.innerHTML = `<p>Test</p>`
```

- Thay đổi text của element

```
elementTaga.innerText = `vnexpress`
```

- Chỉnh sửa các attribute của element

```
elementTaga.setAttribute(`href`, "https://vnexpress.net");
```

c. Adding and Removing Elements

```
const new3 = document.createElement("div");
const newContent = document.createTextNode("OK OK");
new3.appendChild(newContent);
document.body.insertBefore(new3, elementNavbar);
```

Để thêm 1 element thì chúng ta sử dụng createElement để tạo 1 tag và sử dụng createTextNode để tạo text.

Sử dụng appendChild để thêm text vào tag.

Cuối cùng sử dụng insertBefore để insert bên trên ở đây là elementNavbar.

Removing Element

```
document.removeChild(elementNavbar);
```

Sử dụng removeChild để loại 1 phần tử

d. Adding Events Handlers

```
document.querySelector("h3").onclick((event) => {
  //code
});
```

Chúng ta có thể tìm phần tử và thêm sự kiện vào phần tử đó ví dụ như onClick, onLoad,…

Hoặc chúng ta có thể sử dụng thuộc tính addEventListener()

```
document.querySelector("h3").addEventListener("click", (e) => {
//code
});
```

Lưu ý: có nhiều event không nhất thiết phải là click có thể còn những event khác

e. HTML Attributes

Vì DOM mô hình hóa các element thành object, nên các HTML attribute cũng được mã hóa thành các property của DOM object.

Ví dụ:

```
const elementTaga = document.querySelector("a");
elementTaga.href = "https://google.com";
```

4.  Trarvesing

Do các element trong DOM được tổ chức phân cấp, có mối quan hệ với nhau nên từ một element chúng ta có thể tìm ra các element liên quan dựa trên mối quan hệ giữa chúng.

DOM cung cấp cho chúng ta một số thuộc tính để tìm kiếm những node liên quan với node đã chọn.

```
elementNavbar.parentNode; // Node cha
elementNavbar.childNodes[0];  // Mảng các node con
elementNavbar.firstChild;  // Node con đầu tiên
elementNavbar.lastChild;  // Node con cuối cùng
elementNavbar.nextSibling;  // Node ngay phía sau
elementNavbar.previousSibling;  // Node ngay phía trước
```

5.  DOM Node

Node là đối tượng cơ bản nhất trong DOM, mọi thứ trong document, element cũng là node. Bản chất node là một interface, các mọi object trong DOM đều implement interface này, nên mọi object trong DOM đều có thể xem như một node. Vì vậy, chúng có những thuộc tính và phương thức chung.

Node có thể là element, có thể là thuộc tính (HTML attribute), văn bản (text node), ghi chú (comment node). Ngoài ra còn có nhiều loại khác nữa như entity, notation, document type,...

Ví dụ

```
let e = document.getElementById("title");
e.nodeType;
```

Thuộc tính nodeType trả về một số, thể hiện loại node. Ví dụ như element node (1), attribute node (2), text node (3), comment node (8),...

1 Element thật sự đươc tạo bởi nhiều node do đó khi tạo element cần tạo, ta phải ghép lại từ nhiều node thành 1 element ví dụ 1 thẻ:

```
<a href="google.com">This is a link</a>
```

Thì sẽ gồm 3 Node cơ bản như sau:

```
Element node: a
Attribute node: href (google.com)
Text node: This is a link
```

Lưu ý: Mỗi node sẽ có một thuộc tính là nodeValue, chứa giá trị của node.

6.  HTMLcollection & NodeList

- getElementsByTagName() trả về HTMLcollection
- getElementsByClassName(), querySelectorAll() trả về NodeList
- Thuộc tính childNodes của node nào đó cũng là một NodeList

Mặc dù HTMLcollection và NodeList có thể truy cập qua index tương tự array, có thuộc tính length để lấy độ dài, nhưng thực sự chúng không phải array.

Chúng không có các method của array như pop(), push(), shift(),...

Sự khác nhau giữa NodeList, HTMLCollection:

NodeList thì chứa được tất cả các loại Node, còn HTMLCollection thì chỉ chứa được element Node.

NodeList chỉ có thể truy cập qua Index, còn HTMLCollection thì có thể truy cập qua tên, id, index

7.  DOM Event

Event là một sự kiện xảy ra tại thời điểm nhất định, hoặc thỏa mãn một số điều kiện gì đó, và có thể được gán code cho nó. Khi event xảy ra (fire - bắn ra), thì code được gắn với event sẽ được thực thi.

Trong HTML event là một thuộc tính của element, có value là code JS để thực thi khi event xảy ra.

Thay vì gắn trực tiếp event trong HTML document khi viết code, thì chúng ta có thể gắn hoặc điều chỉnh event ngay trong runtime thông qua DOM.

Các events thường được sử dụng:

```
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
```
