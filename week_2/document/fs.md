### 1. Mô tả thư viện

Thư viện fs trong Node.js cung cấp các hàm để làm việc với hệ thống tệp. Đây là thư viện lõi, nghĩa là bạn không cần phải cài đặt bất kì gói nào từ npm để sử dụng nó. Bạn chỉ cần yêu cầu 'fs' và sử dụng các hàm có sẵn. Thư viện fs cho phép bạn đọc, viết, cập nhật và xóa các tệp. Nó cũng cung cấp các hàm để làm việc với thư mục và đường dẫn tệp.

### 2. Cài đặt và cấu hình:

Vì fs là một thư viện lõi của Node.js, bạn không cần cài đặt gì thêm để sử dụng nó. Để sử dụng, bạn chỉ cần 'require' nó trong tệp JavaScript của mình như sau:

```
const fs = require('fs');
```

Sau khi yêu cầu fs, bạn có thể sử dụng tất cả các hàm có sẵn trong thư viện fs. Các hàm này cho phép bạn làm việc với hệ thống tệp trên máy tính của bạn.

### 3. Các chức năng chính:

- Read files
- Create files
- Update files
- Delete files
- Rename files

### 4. Ví dụ về cách sử dụng:

- _Read files:_

  Đọc tệp sử dụng phương thức fs.readFile() và fs.readFileSync()

  **fs.readFile()**

  Phương thức này dùng để đọc nội dung của một tệp. Nó nhận vào hai tham số: đường dẫn tới tệp và một callback function.

  ```
  fs.readFile('test.txt', 'utf8', function(err, data){
    if (err) throw err;
    console.log(data);
  });


  ```

  Trong ví dụ này, nếu tệp test.txt tồn tại, nó sẽ được đọc và nội dung sẽ được ghi ra console. Nếu có lỗi, lỗi sẽ được ném ra.

  **fs.readFileSync()**

  Phương thức này tương tự như fs.readFile(), nhưng nó là một phương thức đồng bộ, nghĩa là nó sẽ chặn chương trình cho đến khi hoàn thành việc đọc tệp.

  ```
  try {
    const data = fs.readFileSync('test.txt', 'utf8');
    console.log(data);
  } catch (err) {
    console.error(err);
  }


  ```

  Trong ví dụ này, chương trình sẽ không tiếp tục cho đến khi tệp test.txt được đọc hoàn toàn. Nếu có lỗi, lỗi sẽ được ghi ra console.

  Lưu ý: Các options để read files

  - 'utf8': Đây là một loại mã hóa được sử dụng rộng rãi. Khi bạn chỉ định 'utf8', nội dung của tệp sẽ được trả về dưới dạng chuỗi.
  - 'ascii': Mã hóa ASCII chỉ hỗ trợ các ký tự ASCII chuẩn.
  - 'base64': Nếu bạn muốn đọc tệp dưới dạng dữ liệu base64.
  - 'binary': Tùy chọn này cho phép bạn đọc tệp dưới dạng dữ liệu nhị phân.
  - 'hex': Tùy chọn này cho phép bạn đọc dữ liệu dưới dạng một chuỗi hex.

- _Create files:_

  Để tạo một tệp mới, bạn có thể sử dụng các phương thức fs.writeFile(),fs.writeFileSync(),fs.open() và fs.appendFile()

  **fs.writeFile()**

  Phương thức này được sử dụng để tạo một tệp mới. Nếu tệp đã tồn tại, nội dung của tệp sẽ bị ghi đè. Nó nhận vào ba tham số: đường dẫn tới tệp, dữ liệu cần ghi và một callback function.

  ```
  fs.writeFile('test.txt', 'Hello World!', function(err) {
    if (err) throw err;
    console.log('Saved!');
  });


  ```

  Trong ví dụ này, một tệp mới có tên là test.txt sẽ được tạo và nội dung 'Hello World!' sẽ được ghi vào tệp. Nếu có lỗi, lỗi sẽ được ném ra.

  **fs.writeFileSync()**

  Phương thức này tương tự như fs.writeFile(), nhưng nó là một phương thức đồng bộ, nghĩa là nó sẽ chặn chương trình cho đến khi hoàn thành việc ghi tệp.

  ```
  try {
    fs.writeFileSync('test.txt', 'Hello World!');
    console.log('Saved!');
  } catch (err) {
    console.error(err);
  }


  ```

  Trong ví dụ này, chương trình sẽ không tiếp tục cho đến khi tệp test.txt được ghi hoàn toàn. Nếu có lỗi, lỗi sẽ được ghi ra console.

  **fs.open()**

  Phương thức này lấy flag làm đối số thứ 2, nếu flag là “w” nghĩa là cho “ghi”, tệp đã chỉ định sẽ được mở và ghi. Nếu tệp không tồn tại thì một tệp trống sẽ được tạo

  ```
  fs.open('test.txt', 'w', function (err, file) {
    if (err) throw err;
    console.log('Saved!');
  });

  ```

  **fs.appendFile()**

  Phương thức này nối thêm nội dung được chỉ định vào một tệp. Nếu tệp không tồn tại, tệp sẽ được tạo

  ```
  fs.appendFile('test.txt', 'Hello content!', function (err) {
    if (err) throw err;
    console.log('Saved!');
  });

  ```

- _Update files:_

  **fs.appendFile()**

  Phương thức fs.appendFile() được sử dụng để thêm nội dung vào cuối một tệp hiện có. Nếu tệp không tồn tại, phương thức này sẽ tạo một tệp mới với nội dung được chỉ định. Nó nhận vào ba tham số: đường dẫn tới tệp, dữ liệu cần thêm và một callback function.

  ```
  fs.appendFile('test.txt', 'Hello again!', function(err) {
    if (err) throw err;
    console.log('Updated!');
  });


  ```

  Trong ví dụ này, nếu tệp test.txt tồn tại, 'Hello again!' sẽ được thêm vào cuối tệp. Nếu tệp không tồn tại, một tệp mới với nội dung 'Hello again!' sẽ được tạo. Nếu có lỗi, lỗi sẽ được ném.

  **fs.writeFile()**

  Như đã nói ở trên, phương thức fs.writeFile() không chỉ tạo một tệp mới mà còn có thể được sử dụng để cập nhật nội dung của một tệp hiện có. Tuy nhiên, điều quan trọng là nội dung hiện tại của tệp sẽ bị ghi đè, không phải được thêm vào.

  ```
  fs.writeFile('test.txt', 'Overwrite content', function(err) {
    if (err) throw err;
    console.log('Updated!');
  });


  ```

  Trong ví dụ này, nếu tệp test.txt tồn tại, nội dung hiện tại của tệp sẽ bị ghi đè bằng 'Overwrite content'. Nếu tệp không tồn tại, một tệp mới với nội dung 'Overwrite content' sẽ được tạo. Nếu có lỗi, lỗi sẽ được ném.

- _Delete files:_

  **fs.unlink()**

  Phương thức fs.unlink() được sử dụng để xóa một tệp. Nó nhận vào hai tham số: đường dẫn tới tệp cần xóa và một callback function.

  ```
  fs.unlink('test.txt', function(err) {
    if (err) throw err;
    console.log('File deleted!');
  });


  ```

  Trong ví dụ này, nếu tệp test.txt tồn tại, nó sẽ được xóa. Nếu có lỗi, lỗi sẽ được ném ra.

  **fs.unlinkSync()**

  Phương thức này tương tự như fs.unlink(), nhưng nó là một phương thức đồng bộ, nghĩa là nó sẽ chặn chương trình cho đến khi hoàn thành việc xóa tệp.

  ```
  try {
    fs.unlinkSync('test.txt');
    console.log('File deleted!');
  } catch (err) {
    console.error(err);
  }

  ```

  Trong ví dụ này, chương trình sẽ không tiếp tục cho đến khi tệp test.txt được xóa hoàn toàn. Nếu có lỗi, lỗi sẽ được ghi ra console.

- _Rename files:_

  **fs.rename()**

  Phương thức fs.rename() được sử dụng để đổi tên một tệp. Nó nhận vào ba tham số: đường dẫn tới tệp cần đổi tên, đường dẫn mới cho tệp và một callback function.

  ```
  fs.rename('test.txt', 'newTest.txt', function(err) {
    if (err) throw err;
    console.log('File Renamed!');
  });


  ```

  Trong ví dụ này, nếu tệp test.txt tồn tại, nó sẽ được đổi tên thành newTest.txt. Nếu có lỗi, lỗi sẽ được ném ra.

  **fs.renameSync()**

  Phương thức này tương tự như fs.rename(), nhưng nó là một phương thức đồng bộ, nghĩa là nó sẽ chặn chương trình cho đến khi hoàn thành việc đổi tên tệp.

  ```
  try {
    fs.renameSync('test.txt', 'newTest.txt');
    console.log('File Renamed!');
  } catch (err) {
    console.error(err);
  }
  ```

  Trong ví dụ này, chương trình sẽ không tiếp tục cho đến khi tệp test.txt được đổi tên thành newTest.txt hoàn toàn. Nếu có lỗi, lỗi sẽ được ghi ra console.
