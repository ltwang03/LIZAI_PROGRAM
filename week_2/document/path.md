path trong Node.js cung cấp một tập hợp các công cụ hữu ích để làm việc với đường dẫn tệp và thư mục. Cung cấp các phương thức để xử lý và biến đổi đường dẫn tệp. Nó cung cấp cách tiếp cận dễ dàng và an toàn để làm việc với đường dẫn tệp và URL, bất kể nền tảng mà ứng dụng Node.js của bạn đang chạy trên đó. Thư viện này có sẵn một cách mặc định trong Node.js, vì vậy không cần phải cài đặt thêm.

### 2. Cài đặt và cấu hình:

Để sử dụng path trong Node.js, bạn không cần phải cài đặt nó. Thư viện này đã được tích hợp sẵn trong Node.js. Để sử dụng nó trong ứng dụng của bạn, bạn chỉ cần import nó vào file của bạn:

```
const path = require('path');

```

Tiếp theo, bạn có thể sử dụng các hàm và phương thức được cung cấp bởi path.

### 3. Các chức năng chính:

- path.basename(): Trả về tên tệp cuối cùng của một đường dẫn.
- path.dirname(): Trả về thư mục của một đường dẫn.
- path.extname(): Trả về phần mở rộng của tệp.
- path.parse(): Trả về một object từ đường dẫn tệp.
- path.join(): Nối tất cả các đối số thành một đường dẫn.
- path.resolve(): Chuyển đổi một chuỗi đường dẫn tương đối thành một đường dẫn tuyệt đối.
- path.isAbsolute(): Kiểm tra xem đường dẫn có phải là tuyệt đối hay không.

### 4. Ví dụ về cách sử dụng:

- Cách sử dụng path.basename():

  Để sử dụng path.basename(), bạn cung cấp một đường dẫn tệp như tham số cho hàm và nó sẽ trả về tên tệp cuối cùng của đường dẫn đó.

  Dưới đây là một ví dụ về cách sử dụng path.basename():

  ```
  const path = require('path');

  // đường dẫn tệp
  const filePath = '/user/local/bin/node';

  // lấy tên tệp
  const baseName = path.basename(filePath);

  console.log(baseName); // Kết quả: 'node'


  ```

  Trong ví dụ trên, path.basename() trả về 'node', đó là tên tệp cuối cùng trong đường dẫn tệp /user/local/bin/node.

- Cách sử dụng path.dirname():

  Để sử dụng path.dirname(), chúng ta câbf cung cấp một đường dẫn tệp như tham số cho hàm và nó sẽ trả về thư mục chứa tệp.

  Dưới đây là một ví dụ về cách sử dụng path.dirname():

  ```
  const path = require('path');

  // đường dẫn tệp
  const filePath = '/user/local/bin/node';

  // lấy đường dẫn thư mục
  const dirName = path.dirname(filePath);

  console.log(dirName); // Kết quả: '/user/local/bin'


  ```

  Trong ví dụ trên, path.dirname() trả về '/user/local/bin', đó là đường dẫn thư mục chứa tệp 'node'.

- Cách sử dụng path.extname():

  Để sử dụng path.extname(), chúng ta sẽ cung cấp một đường dẫn tệp như tham số cho hàm và nó sẽ trả về phần mở rộng của tệp.

  Dưới đây là một ví dụ về cách sử dụng path.extname():

  ```
  const path = require('path');

  // đường dẫn tệp
  const filePath = '/user/local/bin/node.js';

  // lấy phần mở rộng của tệp
  const extName = path.extname(filePath);

  console.log(extName); // Kết quả: '.js'


  ```

  Trong ví dụ trên, path.extname() trả về '.js', đó là phần mở rộng của tệp 'node.js'.

- Cách sử dụng path.parse():

  Để sử dụng path.parse(), bạn sẽ cung cấp một đường dẫn tệp như tham số cho hàm và nó sẽ trả về một đối tượng có các thuộc tính liên quan đến đường dẫn đó.

  Dưới đây là một ví dụ về cách sử dụng path.parse():

  ```
  const path = require('path');

  // đường dẫn tệp
  const filePath = '/user/local/bin/node.js';

  // phân tích đường dẫn
  const parsedPath = path.parse(filePath);

  console.log(parsedPath);
  /*
  Kết quả:
  {
    root: '/',
    dir: '/user/local/bin',
    base: 'node.js',
    ext: '.js',
    name: 'node'
  }
  */


  ```

  Trong ví dụ trên, path.parse() trả về một object với các thuộc tính root, dir, base, ext, và name mô tả các phần khác nhau của đường dẫn tệp /user/local/bin/node.js.

- Cách sử dụng path.join():

  path.join() được sử dụng để nối các phần của đường dẫn lại với nhau. Bạn cung cấp một hoặc nhiều đường dẫn như tham số cho hàm và nó sẽ trả về một đường dẫn đã được nối lại.

  Dưới đây là một ví dụ về cách sử dụng path.join():

  ```
  const path = require('path');

  // các phần của đường dẫn
  const parts = ['user', 'local', 'bin', 'node.js'];

  // nối các phần của đường dẫn
  const joinedPath = path.join(...parts);

  console.log(joinedPath); // Kết quả: 'user/local/bin/node.js'


  ```

  Trong ví dụ trên, path.join() nối các phần của đường dẫn trong mảng parts lại với nhau để tạo thành đường dẫn 'user/local/bin/node.js'.

- Cách sử dụng path.resolve():

  path.resolve() được sử dụng để chuyển đổi một hoặc nhiều đường dẫn tương đối thành một đường dẫn tuyệt đối. Bạn cung cấp một hoặc nhiều đường dẫn như tham số cho hàm và nó sẽ trả về một đường dẫn tuyệt đối.

  Dưới đây là một ví dụ về cách sử dụng path.resolve():

  ```
  const path = require('path');

  // đường dẫn tương đối
  const relativePath = './node.js';

  // chuyển đổi đường dẫn tương đối thành đường dẫn tuyệt đối
  const absolutePath = path.resolve(relativePath);

  console.log(absolutePath); // Kết quả: '/user/local/bin/node.js' (giả sử đường dẫn hiện tại là '/user/local/bin')


  ```

  Trong ví dụ trên, path.resolve() chuyển đổi đường dẫn tương đối './node.js' thành đường dẫn tuyệt đối '/user/local/bin/node.js'.

- Cách sử dụng path.isAbsolute():

  path.isAbsolute() được sử dụng để kiểm tra xem một đường dẫn có phải là tuyệt đối hay không. Bạn cung cấp một đường dẫn như tham số cho hàm và nó sẽ trả về true nếu đường dẫn là tuyệt đối và false nếu nó là tương đối.

  Dưới đây là một ví dụ về cách sử dụng path.isAbsolute():

  ```
  const path = require('path');

  // đường dẫn tuyệt đối
  const absolutePath = '/user/local/bin/node.js';

  // kiểm tra xem đường dẫn có phải là tuyệt đối hay không
  const isAbsolute1 = path.isAbsolute(absolutePath);

  console.log(isAbsolute1); // Kết quả: true

  // đường dẫn tương đối
  const relativePath = './node.js';

  // kiểm tra xem đường dẫn có phải là tuyệt đối hay không
  const isAbsolute2 = path.isAbsolute(relativePath);

  console.log(isAbsolute2); // Kết quả: false


  ```

  Trong ví dụ trên, path.isAbsolute() trả về true khi kiểm tra đường dẫn tuyệt đối '/user/local/bin/node.js' và trả về false khi kiểm tra đường dẫn tương đối './node.js'.
