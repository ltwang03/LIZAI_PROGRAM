### 1. Mô tả Module

Thư viện URL trong Node.js là một trong những module được tích hợp sẵn trong Node.js, không cần cài đặt thêm. Module này cung cấp các tiện ích giúp bạn làm việc với URL. Nó cho phép bạn phân tích URL, tạo URL, và đảo ngược quá trình phân tích URL. Nhờ vậy, bạn có thể dễ dàng trích xuất và thay đổi các phần của URL.

### 2. Cài đặt và cấu hình:

Không cần cài đặt thêm vì URL là một module được tích hợp sẵn trong Node.js. Để sử dụng, chúng ta chỉ cần nhập module vào mã nguồn của mình:

```
const url = require('url');

```

Sau khi nhập, chúng ta có thể sử dụng các hàm được cung cấp bởi module URL.

### 3. Các chức năng chính:

- Parse URL: Phân tích URL thành các phần nhỏ hơn như scheme, host, path, query string, v.v.
- Format URL: Tạo URL từ một đối tượng URL đã phân tích.
- Resolve URL: Kết hợp một URL cơ sở và một URL tương đối để tạo ra một URL tuyệt đối.

### 4. Ví dụ về cách sử dụng:

- _Parse URL:_

  Ví dụ về cách sử dụng phương thức parse của module URL:

  ```

  const urlString = "<https://portal.huflit.edu.vn/path?name=quang>";

  const parsedUrl = url.parse(urlString, true);

  console.log(parsedUrl);


  ```

  Khi chạy đoạn mã trên, bạn sẽ nhận được một đối tượng URL đã được phân tích. Flag true trong hàm parse khiến chuỗi truy vấn cũng được phân tích thành một đối tượng.

  Đối tượng parsedUrl trả về sẽ bao gồm các thuộc tính như protocol, hostname, path, và query.

  Chúng ta cũng có thể truy cập trực tiếp vào các phần của URL đã phân tích, như sau:

  ```
  console.log(parsedUrl.hostname); // portal.huflit.edu.vn
  console.log(parsedUrl.query.name); // quang


  ```

- _Format URL:_

  Ví dụ về cách sử dụng phương thức format của module URL:

  ```

  const urlObject = {
    protocol: "https",
    hostname: "portal.huflit.edu.vn",
    pathname: "/path",
    query: {
      name: "quang",
    },
  };

  let formattedUrl = url.format(urlObject);

  console.log(formattedUrl); //https://portal.huflit.edu.vn/path?name=quang


  ```

  Phương thức format lấy một đối tượng URL đã được phân tích và tạo thành một chuỗi URL. Nó tự động mã hóa các ký tự không an toàn trong URL và chuỗi truy vấn.

  Lưu ý rằng, pathname và query sẽ được kết hợp để tạo thành path trong URL. Nếu bạn cung cấp cả path và pathname/query, path sẽ được ưu tiên và pathname/query sẽ bị bỏ qua.

- _Resolve URL:_

  cách sử dụng phương thức resolve của module URL:

  ```
  const base = '<https://portal.huflit.edu.vn/>';
  const relative = 'one/two';

  const resolvedUrl = url.resolve(base, relative);

  console.log(resolvedUrl); // <https://portal.huflit.edu.vn/one/two>


  ```

  Phương thức resolve nhận hai tham số là một URL cơ sở và một URL tương đối. Nó kết hợp chúng để tạo một URL tuyệt đối. Nếu URL tương đối bắt đầu bằng một gạch chéo (/), nó sẽ được xem như một đường dẫn từ gốc của URL cơ sở. Nếu không, nó sẽ được xem như một đường dẫn tương đối so với URL cơ sở.

  Ví dụ, nếu URL cơ sở là https://portal.huflit.edu.vn và URL tương đối là /two, URL tuyệt đối sẽ là https://portal.huflit.edu.vn/two. Nếu URL tương đối là two, URL tuyệt đối sẽ là http://portal.huflit.edu.vn/one/two.
