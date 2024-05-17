### 1. Mô tả http & https

Module http cho phép tạo ra máy chủ HTTP và máy chủ proxy, đồng thời cung cấp chức năng cho việc gửi yêu cầu HTTP đến máy chủ khác. Đặc điểm chính là nó không hỗ trợ mã hóa, điều này có thể giảm bảo mật cho dữ liệu truyền đi.

Module https, một phiên bản an toàn hơn của http, cung cấp chức năng tương tự như http nhưng với thêm việc hỗ trợ mã hóa SSL/TLS. Điều này giúp tăng cường bảo mật cho dữ liệu truyền đi, đặc biệt là khi chúng ta cần bảo vệ thông tin nhạy cảm như mật khẩu hoặc số thẻ tín dụng.

### 2. Cài đặt và cấu hình:

Module http và https là phần của core Node.js, do đó không cần cài đặt thêm.

Để sử dụng chúng, chúng ta chỉ cần yêu cầu chúng trong ứng dụng của mình. Ví dụ:

```
const http = require('http');
const https = require('https');

```

### 3. Các chức năng chính:

- Tạo máy chủ HTTP/HTTPS: Cả hai module đều cho phép tạo ra máy chủ HTTP hoặc HTTPS, cho phép ứng dụng của bạn phục vụ các yêu cầu từ phía client.
- Gửi yêu cầu HTTP/HTTPS: Cả http và https đều hỗ trợ gửi yêu cầu HTTP đến máy chủ khác. Điều này hữu ích khi bạn cần tương tác với các API bên ngoài.
- Hỗ trợ mã hóa SSL/TLS (chỉ https): Module https hỗ trợ mã hóa SSL/TLS, giúp tăng cường bảo mật cho dữ liệu truyền đi.

### 4. Ví dụ về cách sử dụng:

- _Tạo máy chủ HTTP/HTTPS:_

  - Tạo máy chủ HTTP:

    Khởi tạo máy chủ http bằng phương thức createServer() set port cho server chúng ta dùng listen().

    ```
    const createServer = http.createServer((req, res) => {
      res.statusCode = 200;
      res.headers = {
        "content-type": "text/plain",
      };
      res.write("OK OK");
      res.end();
    });
    createServer.listen(3000, "127.0.0.1", () => {
      console.log("Server is running on port 3000");
    });


    ```

  - Tạo máy chủ HTTPS:

    Sử dụng module fs để đọc file chứng chỉ SSL/TLS , tiếp theo khởi tạo server https bằng phương thức createServer() truyền vào 2 đối số là options và callback để xử lý

    ```
    const options = {
      keys: fs.readFileSync("rootCA.key"),
      cert: fs.readFileSync("rootCA.pem"),
    };

    https
      .createServer(options, (req, res) => {
        res.writeHead(200);
        res.write("OK OK HTTPS");
        res.end("HELLO");
      })
      .listen(3001, "127.0.0.1", () => {
        console.log("server https is running on port 3001");
      });


    ```

- _Gửi yêu cầu HTTP/HTTPS_

  - Gửi yêu cầu HTTP:

    ```
    // định nghĩa options để thực hiện gửi request
    const options = {
      hostname: "www.example.com",
      port: 80,
      path: "/path",
      method: "GET",
    };
    // gọi request
    const req = http.request(options, (res) => {
      res.on("data", (chunk) => {
        process.stdout.write(chunk);
      });
    });
    req.end();

    ```

  - Gửi yêu cầu HTTPS:

    ```
    const options = {
      hostname: "www.huflit.edu.vn",
      port: 443,
      method: "GET",
    };
    // gọi request
    const req = https.request(options, (res) => {
      res.on("data", (chunk) => {
        process.stdout.write(chunk);
      });
    });
    req.end();


    ```

- _Hỗ trợ mã hóa SSL/TLS:_

  - Mã hóa SSL/TLS với HTTPS:

    ```
    const https = require('https');
    const fs = require('fs');

    // Các tùy chọn SSL/TLS
    const options = {
      // Đường dẫn đến file chứa private key
      key: fs.readFileSync('path/to/private-key.pem'),

      // Đường dẫn đến file chứa public certificate
      cert: fs.readFileSync('path/to/public-certificate.pem')
    };

    // Tạo máy chủ HTTPS với các tùy chọn SSL/TLS
    const server = https.createServer(options, (req, res) => {
      // Các xử lý yêu cầu và trả lời tại đây
      res.writeHead(200);
      res.end('Đây là máy chủ HTTPS có mã hóa SSL/TLS!\\\\n');
    });

    // Lắng nghe trên cổng 3000
    server.listen(3000, '127.0.0.1', () => {
      console.log('Máy chủ đang chờ kết nối tại <https://127.0.0.1:3000/>');
    });


    ```
