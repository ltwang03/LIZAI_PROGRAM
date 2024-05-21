1. Concept

Đây là loại Framework đóng vai trò quan trọng trong việc hỗ trợ xây dựng trang web thông tin nhanh chóng cung cấp cấu trúc hoạt động, phần mềm trung gian mạnh mẽ. Expressjs có khả năng tạo API và định tuyến dễ dàng cùng với sự hỗ trợ từ cộng đồng lớn.

1. Installing

Sử dụng lệnh câu lệnh dưới để tạo tệp `package.json` cho ứng dụng.

```bash
npm init -y
```

Sử dụng flag `-y` để bỏ qua các bước.

Sau khi chạy thành công ta sẽ có file `package.json` và mặc định:

```bash
entry point: (index.js)
```

Tiếp tục cài đặt `express.js` bằng cách:

```bash
npm install express
```

Kiểm tra trong file `package.json` đã xuất hiện dependency express hay chưa.

1. Routing
    1. Route Method

       Routing đề cập đến việc xác định cách ứng dụng phải hồi lại các request của khách hàng đến một `end point` cụ thể (url) và HTTP method như `GET` `POST` `PUT` `DELETE` .

       *Lưu ý: Một route có thể có 1 hoặc nhiều function được thực thi khi route được gọi*

       Define route có cấu trúc như sau:

        ```jsx
        app.METHOD(PATH, HANDLER);
        ```

       > app: là 1 instance của `express`.
       METHOD: là 1 HTTP request method, được viết lowercase.
       PATH: là đường dẫn tới server.
       HANDLER: là function được thực thi khi route được gọi.
       >

       Các ví dụ để xác định các route:

        ```jsx
        app.get('/', (req, res) => {
          res.send('Hello World!')
        })
        ```

       trả về Hello World trên homepage

        ```jsx
        app.post('/', (req, res) => {
          res.send('Got a POST request')
        })
        ```

       Trả lời request `POST` trên root route (/).

        ```jsx
        app.put('/user', (req, res) => {
          res.send('Got a PUT request at /user')
        })
        ```

       Trả lời request `PUT` trên route `/user`

        ```jsx
        app.delete('/user', (req, res) => {
          res.send('Got a DELETE request at /user')
        })
        ```

       Trả lời request `DELETE` trên route `/user`

       Các routing method này chỉ định 1 hàm callback cũng có thể nói nó là hàm xử lý. Nó sẽ được gọi khi ứng dụng nhận được yêu cầu đến route này với phương thức HTTP đã chỉ định. Nói cách khác ứng dụng sẽ lắng nghe các yêu cầu nếu nó khớp với route và HTTP method nó sẽ bắt đầu gọi hàm callback để xử lý.

       Trong thực tế có thể có nhiều hơn 1 hàm callback làm đối số. Với nhiều hàm callback phải cung cấp `next` làm đối số cho hàm callback và sao đó gọi `next()` để chuyển sang hàm callback khác.

       Ngoài những HTTP method được ví dụ ở trên thì sẽ có 1 phương thức đặc biệt là `app.all()`, được sử dụng để load các middleware tại 1 path cho tất cả các yêu cầu từ HTTP method.

        ```jsx
        router.all("/error", (req, res) => {
          console.log(`Error:::`);
          res.send("Route not found");
        });
        ```

       Ở ví dụ dưới nếu người dùng gửi request tới path `/error` thì sẽ trả về cho người dùng thông báo và trả về lỗi.

    2. Route path

        ```jsx
        app.get('/', (req, res) => {
          res.send('root')
        })
        ```

       Path này sẽ khớp request với root route

        ```jsx
        app.get('/about', (req, res) => {
          res.send('about')
        })
        ```

       Path này sẽ khớp request với path `/about`

        ```jsx
        app.get('/random.text' (req, res) => {
        res.send('random.text')
        })
        ```

       Path này sẽ khới request với path `/random.text`

        ```jsx
        app.get("/ab?cd", (req, res) => {
          res.send("ab?cd");
        });
        ```

       Path này nó sẽ nhận `/ab?cd` với `b` là tùy chọn có cũng được nhưng không có cũng không sao vì thế người dùng có thể nhận 2 route là `abcd` và `acd`

        ```jsx
        app.get('/ab+cd', (req, res) => {
          res.send('ab+cd')
        })
        ```

       Path này nó sẽ nhận vào `/ab+cd` với `+` thì sẽ là cộng vô hạn từ `b` trong route này ví dụ như: `abcd` `abbcd` `abbbbcd`

        ```jsx
        app.get('/ab*cd', (req, res) => {
          res.send('ab*cd')
        })
        
        ```

       path này sẽ nhận vào `/ab*cd` với * thì `ab` và `cd` sẽ được giữ ở đầu và cuối và với * thì sẽ thêm từ bất kỳ ví dụ `abRANDOMcd` , `ab123cd`

        ```jsx
        app.get('/ab(cd)?e', (req, res) => {
          res.send('ab(cd)?e')
        })
        ```

       path này sẽ nhận vào `/ab(cd)?e` với `(cd)` sẽ làm chuỗi tùy chọn chúng ta có thể gọi với path `abe` `abcde`

        ```jsx
        app.get(/a/, (req, res) => {
          res.send('/a/')
        })
        ```

       Ngoài ra có thể sử dụng regex để làm path như ở ví dụ trên. Sẽ nhận tất cả các path có ký tự a ở đầu ví dụ `adf48594`

        ```jsx
        app.get(/.*fly$/, (req, res) => {
          res.send('/.*fly$/')
        })
        ```

       Với `/.*fly$/` thì sẽ match với những path có chữ `fly` ở cuối ví dụ `butterfly` hoặc `dragonfly` nhưng sẽ không match với `butterflyman` hoặc `dragonflyman`

    3. Route parameters

       Route parameters là các phân đoạn URL được đặt tên được sử dụng để nắm bắt các value được chỉ định tại vị trí của chúng trong URL. Các value đã thu thập được điền vào đối tượng req.params, với tên của tham số tuyến được chỉ định trong đường dẫn làm khóa tương ứng.

        ```jsx
        app.get('/users/:userId/books/:bookId', (req, res) => {
          res.send(req.params)
        })
        ```

       Endpoint: http://localhost:3000/users/34/books/8989

       Như ví dụ trên ta sẽ có các params và được trả về dưới dạng JSON:

        ```json
        {
            "userId": "34",
            "bookId": "8989"
        }
        ```

       Ngoài ra còn có thể sử dụng `-`  hoặc `.`để phân biết giữa các params

        ```jsx
        router.get("/flights/:LAX-:SFO", (req, res) => {
          res.send(req.params);
          })
        router.get("/plantae/:genus.:species", (req, res) => {
        	res.send(req.params);
        })
        ```

       Endpoint: http://localhost:3000/flights/FSN-048

       Endpoint: http://localhost:3000/plantae/Prunus.persica

       Kết quả trả về:

        ```jsx
        {
            "LAX": "FSN",
            "SFO": "048"
        }
        
        {
            "geus": "Prunus",
        	"species": "persice"
        }
        ```

       Ngoài ra có thể sử dụng regex ở đây:

        ```jsx
        router.get("/users/:userId(\\d+)", (req, res) => {
          res.send(req.params);
        });
        ```

       Như ví dụ trên thì request này `:userId(\d+)` là một route parameter. `:userId` là tên của parameter và `(\d+)` là một regular expression chỉ giới hạn giá trị của `userId` phải là một số.

    4. Route Handlers

       Route handlers là 1 hoặc các hàm được gán để xử lý các request đến 1 route cụ thể. Bạn có thể sử dụng 1 hàm, nhiều hàm hoặc kết hợp cả 2 để xử lý các request. Điều này cho phép tạo ra các điều kiện tiền xử lý cho 1 route và quản lý luồng xử lý request 1 cách linh hoạt.

        - Single Callback Function

        ```jsx
           app.get('/example/a', function (req, res) {
             res.send('Hello from A!');
           });
        ```

       Đây là cách đơn giản nhất để xử lý và toàn bộ logic xử lý sẽ nằm trong hàm callback này

        - Multiple Callback function

        ```jsx
        app.get('/example', function (req, res, next) {
          console.log('First callback function');
          next();
        }, function (req, res) {
          res.send('Hello, this is the second callback function!');
        });
        ```

       multiple callback function sử dụng nhiều hàm để xử lý các hàm sẽ gọi lần lượt mỗi hàm cần phải gọi next để chuyển sang hàm tiếp theo

        - Array of Callback Functions

       có thể sử dụng một mảng các hàm để xử lý một tuyến. Cách này tương tự như việc sử dụng nhiều hàm:

        ```jsx
        const handler1 = function (req, res, next) {
          console.log('First callback function in array');
          next();
        };
        
        const handler2 = function (req, res) {
          res.send('Hello, this is the second callback function in array!');
        };
        
        app.get('/example/array', [handler1, handler2]);
        ```

        - Combination of Single and Array Callback Functions

       có thể kết hợp cả hàm đơn lẻ và mảng hàm trong một route

        ```jsx
        const handler1 = function (req, res, next) {
          console.log('First callback function in combination');
          next();
        };
        
        const handler2 = function (req, res, next) {
          console.log('Second callback function in combination');
          next();
        };
        
        const handler3 = function (req, res) {
          res.send('Hello, this is the third callback function in combination!');
        };
        
        app.get('/example/combination', [handler1, handler2], handler3);
        ```

        - Using `next('route')` to Skip Remaining Handlers

        ```jsx
        app.get('/example/route', function (req, res, next) {
          console.log('Checking pre-conditions');
          if (someCondition) {
            next('route');
          } else {
            next();
          }
        }, function (req, res) {
          res.send('This will not be reached if someCondition is true');
        });
        
        app.get('/example/route', function (req, res) {
          res.send('This will be reached if someCondition is true');
        });
        ```

       Một callback có thể gọi `next('route')` để bỏ qua các callback còn lại cho tuyến hiện tại và chuyển sang tuyến tiếp theo:

    5. Response methods

       | Method | Description |
       | ------- | ------- |
       | `res.download()` | Prompt a file to be downloaded. |
       | `res.end()` | End the response process. |
       | `res.json()` | Send a JSON response. |
       | `res.jsonp()` | Send a JSON response with JSONP support. |
       | `res.redirect()` | Redirect a request. |
       | `res.render()` | Render a view template. |
       | `res.send()` | Send a response of various types. |
       | `res.sendFile()` | Send a file as an octet stream. |
       | `res.sendStatus()` | Set the response status code and send its string representation as the response body. |
    6. `app.route()`
        
        có thể tạo trình xử lý tuyến đường có thể xâu chuỗi cho đường dẫn tuyến đường bằng cách sử dụng app.route(). Bởi vì đường dẫn được chỉ định tại một vị trí duy nhất nên việc tạo các tuyến đường mô-đun rất hữu ích, cũng như giảm sự dư thừa và lỗi chính tả.
        
        Xử lý route theo dạng chuỗi
        
        ```jsx
        app.route('/book')
          .get((req, res) => {
            res.send('Get a random book')
          })
          .post((req, res) => {
            res.send('Add a book')
          })
          .put((req, res) => {
            res.send('Update the book')
          })
        ```
        
    7. express.Router()
    
    cho phép bạn tạo ra các bộ định tuyến mô-đun, có thể sử dụng lại và cấu trúc mã của bạn một cách tốt hơn. `Router` hoạt động như một phiên bản nhỏ của ứng dụng, hoàn toàn có khả năng tự quản lý các tuyến của riêng nó.
    
    ```jsx
    const express = require('express');
    const router = express.Router();
    
    router.get('/example', (req, res) => {
      res.send('Hello from the router!');
    });
    ```

2. Middleware

   Middleware trong Express.js là các hàm có quyền truy cập vào đối tượng yêu cầu (`req`), đối tượng phản hồi (`res`), và hàm tiếp theo trong chuỗi middleware (`next`). Các middleware có thể thực hiện nhiều nhiệm vụ khác nhau như:

    1. Application-level Middleware

       Middleware cấp ứng dụng được gắn vào đối tượng ứng dụng của Express bằng cách sử dụng `app.use()` hoặc `app.METHOD()`:

        ```jsx
        const app = express();
        
        // Middleware cấp ứng dụng
        app.use((req, res, next) => {
          console.log('Application-level middleware');
          next();
        });
        ```

    2. Router-level Middleware 
        
        Middleware cấp bộ định tuyến được gắn vào đối tượng Router bằng cách sử dụng `router.use()` hoặc `router.METHOD()`:

        ```jsx
        const router = express.Router();
        
        // Middleware cấp bộ định tuyến
        router.use((req, res, next) => {
          console.log('Router-level middleware');
          next();
        });
        ```

    3. Error-handling Middleware

       Middleware xử lý lỗi có bốn đối số: `(err, req, res, next)`. Middleware này được sử dụng để xử lý lỗi phát sinh trong ứng dụng:

        ```jsx
        app.use((err, req, res, next) => {
          const statusCode = err.status || 500;
          console.log(err.stack);
          return res.status(statusCode).json({
            status: "Error",
            code: statusCode,
            message: err.message || " Internal Server Error",
          });
        });
        ```

    4. Built-in Middleware

       Express cung cấp một số middleware tích hợp sẵn như `express.static`, `express.json`, và `express.urlencoded`:

        ```jsx
        app.use(express.static('public')); // Để phục vụ các tệp tĩnh
        app.use(express.json()); // Để phân tích cú pháp các yêu cầu JSON
        app.use(express.urlencoded({ extended: true })); // Để phân tích cú pháp các yêu cầu URL-encoded
        ```

    5. Third-party Middleware

       Bạn cũng có thể sử dụng middleware của bên thứ ba như `morgan`, `body-parser`, `cors`, v.v.:

        ```jsx
        const morgan = require('morgan');
        const cors = require('cors');
        
        app.use(morgan('dev')); // Để ghi nhật ký các yêu cầu HTTP
        app.use(cors()); // Để cho phép Cross-Origin Resource Sharing
        ```

    6. Configurable middleware

       Nếu bạn cần có thể định cấu hình middleware của mình, hãy xuất một function chấp nhận đối tượng tùy chọn hoặc các tham số khác, sau đó trả về việc triển khai phần mềm trung gian dựa trên các tham số đầu vào.

        ```jsx
        module.exports = function (options) {
          return function (req, res, next) {
            console.log(options)
            next()
          }
        }
        app.use(mw({ option: 1, option2: 2 }));
        ```

    7. Những lưu ý khi sử dụng middleware:
        - Nếu middleware hiện tại không kết thúc chu kỳ phản hồi yêu cầu, nó phải gọi next() để chuyển quyền điều khiển cho chức năng phần mềm trung gian tiếp theo. Nếu không, yêu cầu sẽ bị treo.
        - Bắt đầu với Express 5, các hàm middleware trả về Promise sẽ gọi next(value) khi chúng từ chối hoặc đưa ra lỗi. next sẽ được gọi với giá trị bị từ chối hoặc Lỗi được ném ra.
3. Overriding the Express API
    1. Concept

       API express bao gồm nhiều phương thức khác nhau trên các đối tượng request và response. Chúng có thể mở rộng và kế thừa. Có 2 điểm để mở rộng cho Express API

        - Global prototype `express.request` và `express.response`
        - App-specific prototypes `app.request` và `app.response`

       Lưu ý: việc thay đổi global prototype có thể ảnh hưởng đến toàn bộ api sử dụng express. Khuyến khích chỉ nên thay đổi ở tầng app dành riêng cho api

    2. Methods

       Bạn có thể ghi đè `signature` và `behavior` của các phương thức hiện có bằng phương thức riêng mà bạn tạo

       Ví dụ:

        ```jsx
        app.response.sendStatus = function (statusCode, type, message) {
          return this.contentType(type)
            .status(statusCode)
            .send(message)
        }
        ```

       Việc triển khai ở trên thay đổi hoàn toàn `signature` ban đầu của res.sendStatus. Bây giờ nó chấp nhận `statusCode`, `type` và `message` sẽ được gửi Client.

       Phương thức được ghi đè bây giờ có thể sử dụng như thế này:

        ```jsx
        res.sendStatus(404, 'application/json', '{"error":"resource not found"}')
        ```

    3. Properties

       Các thuộc tính trong express API:

        - Assigned properties: (ex: `req.baseUrl`, `req.originalUrl`)
        - Defined as getters: (ex: `req.secure`, `req.ip`)

       Sự khác nhau giữa 2 thuộc tính ở trên:

       Assigned properties thì không thể override được còn Defined as getters thì có thể override

       Ví dụ override `req.ip`

        ```jsx
        Object.defineProperty(app.request, 'ip', {
          configurable: true,
          enumerable: true,
          get () { return this.get('Client-IP') }
        })
        ```

        - `Object.defineProperty()` được sử dụng để định nghĩa một mới property trên đối tượng `app.request`.
        - `'ip'` là tên của property mới được định nghĩa.
        - `configurable: true` cho phép property này có thể bị ghi đè trong tương lai.
        - `enumerable: true` cho phép property này được liệt kê khi đối tượng được duyệt.
        - `get()` là hàm getter, nó sẽ trả về giá trị của `this.get('Client-IP')`, tức là giá trị của header `Client-IP` trong request.
    4. Prototype

       Trong Express, các đối tượng request và response được truyền vào các middleware (ví dụ như `app(req, res)`) cần phải kế thừa từ cùng một chuỗi prototype. Theo mặc định, đây là `http.IncomingRequest.prototype` cho đối tượng request và `http.ServerResponse.prototype` cho đối tượng response.

       Tuy nhiên, trong một số trường hợp, bạn có thể muốn thay đổi prototype của các đối tượng này, ví dụ như để mở rộng chức năng của chúng.

        ```jsx
        // Use FakeRequest and FakeResponse in place of http.IncomingRequest and http.ServerResponse
        // for the given app reference
        Object.setPrototypeOf(Object.getPrototypeOf(app.request), FakeRequest.prototype)
        Object.setPrototypeOf(Object.getPrototypeOf(app.response), FakeResponse.prototype)
        ```

       Lưu ý:

       Việc thay đổi prototype này chỉ nên thực hiện ở App specific, thay vì global, để tránh ảnh hưởng đến các ứng dụng khác. Ngoài ra, cần phải đảm bảo rằng prototype mới phù hợp với chức năng của đối tượng request và response.

4. Using template engines with Express
    1. Concept

       Template engine cho phép bạn sử dụng các file tĩnh trong app của mình. Trong thời gian chạy template engin sẽ thay thế các biến trong file template bằng các value và transform các temple thành file HTML và sẽ gửi tới client. Cách nãy sẽ tiếp cận giúp thiết hế HTML dễ dàng hơn

       Một số công cụ phổ biến hoạt động với express là pug, ejs, mustanche. Và Express dùng Jade làm mặc định những nó cũng hỗ trợ 1 vài template engine khác.

    2. Install

       Để render template files. hãy đặt các thuộc tính trong file index.js

        - `View` : là thư mục chứa file template, ví dụ `app.set('views', './views')` Điều này sẽ mặc định thư mục views trong thư mục gốc của app
        - `view engine` : Sử dụng template engine nào: ở ví dụ này sẽ dùng `Pug` ví dụ: `app.set('view engine', 'pug').`

       Tiếp theo install package `pug`

        ```bash
        $ npm install pug --save
        ```

       Tạo 1 file template pug tên là `index.pug` trong thư mục view trong file template có:

        ```html
        html
          head
            title= title
          body
            h1= message
        ```

       Tiếp theo tạo 1 route để render file `index.pug`. Nếu mà view engine không được declare thì phải chỉ định phần extension của file. Nếu không bạn có thể bỏ qua nó

        ```jsx
        app.get('/', (req, res) => {
          res.render('index', { title: 'Hey', message: 'Hello there!' })
        })
        ```

       Note: Khi bạn gửi 1 request tới `/` index.pug sẽ được render ra dạng HTML

5. Error handling

   đề cập đến cách Express catches và xử lý các lỗi xảy ra cả đồng bộ và không đồng bộ. Express đi kèm với trình xử lý lỗi mặc định nên bạn không cần phải viết trình xử lý lỗi của riêng mình để bắt đầu.

    1. Catching Errors

       Điều quan trọng là phải đảm bảo rằng Express phát hiện được tất cả lỗi xảy ra trong khi chạy route handlers và middleware

       Các lỗi xảy ra trong synchronous code bên trong route và middlware không yêu cầu phải thực hiện thêm thao tác nào. Nếu code synchronous phát sinh lỗi thì Express sẽ bắt và xử lý lỗi đó ví dụ:

        ```jsx
        app.get('/', (req, res) => {
          throw new Error('BROKEN') // Express will catch this on its own.
        })
        ```

       Đối với các lỗi được trả về từ các hàm không đồng bộ được gọi bằng route và middleware, thì phải chuyển sang hàm next(), Trong đó express sẽ bắt và xử lý chúng:

        ```jsx
        app.get('/', (req, res, next) => {
          fs.readFile('/file-does-not-exist', (err, data) => {
            if (err) {
              next(err) // Pass errors to Express.
            } else {
              res.send(data)
            }
          })
        })
        ```

       Lưu ý: Với express 5 thì với route handlers và middleware trả về promise và sẽ tự động gọi `next(value)` khi chúng có lỗi.

       Nếu lệnh gọi callback không cung cấp data và chỉ cung cấp lỗi, chúng ta có thể đơn giản mã này như sau:

        ```jsx
        app.get('/', [
          function (req, res, next) {
            fs.writeFile('/inaccessible-path', 'data', next)
          },
          function (req, res) {
            res.send('OK')
          }
        ])
        ```

       Trong ví dụ trên next được cung cấp dưới dạng callback cho `fs.writeFile`, Nếu không có lỗi, hàm callback thứ 2 sẽ được thực thi, nếu không thì express sẽ catch và xử lý lỗi

       Tiếp theo chúng ta phải xử lý các lỗi xảy ra trong mã bất đồng bộ được gọi bởi route handlers hoặc middleware và chuyển chúng tới express để xử lý:

        ```jsx
        app.get('/', (req, res, next) => {
          setTimeout(() => {
            try {
              throw new Error('BROKEN')
            } catch (err) {
              next(err)
            }
          }, 100)
        })
        ```

       Ví dụ trên sử dụng khối `try...catch` để bắt lỗi trong mã không đồng bộ và chuyển chúng tới Express. Nếu khối `try...catch` bị bỏ qua, Express sẽ không bắt được lỗi vì nó không phải là một phần của mã xử lý đồng bộ.

       Note: Sử dụng Promise để tránh sử dụng `try…catch` hoặc khi sử dụng các hàm trả về 1 promise ví dụ:

        ```jsx
        app.get('/', (req, res, next) => {
          Promise.resolve().then(() => {
            throw new Error('BROKEN')
          }).catch(next) // Errors will be passed to Express.
        })
        ```

       Vì các promise sẽ tự động bắt cả lỗi đồng bộ và các promise bị từ chối, chỉ cần cung cấp `next()` làm trình xử lý catch cuối cùng và express sẽ bắt lỗi về trình xử lý

       Bạn cũng có thể sử dụng 1 chuỗi handlers để dựa vào việc bắt lỗi đồng bộ bằng cách giảm code không đồng bộ xuống Ví dụ như:

        ```jsx
        app.get('/', [
          function (req, res, next) {
            fs.readFile('/maybe-valid-file', 'utf-8', (err, data) => {
              res.locals.data = data
              next(err)
            })
          },
          function (req, res) {
            res.locals.data = res.locals.data.split(',')[1]
            res.send(res.locals.data)
          }
        ])
        ```

       Dù bạn sử dụng phương pháp nào, nếu bạn muốn gọi trình xử lý lỗi Express và ứng dụng tồn tại, bạn phải đảm bảo rằng Express nhận được lỗi.

    2. The default error handler

       Express đi kèm với trình xử lý lỗi tích hợp sẳn để xử lý mọi lỗi có thể gặp phải trong ứng dụng. Middleware xử lý lỗi default được thêm vào cuối stack middleware

       Nếu bạn chuyển một lỗi tới `next()` và bạn không xử lý nó trong trình xử lý lỗi tùy chỉnh, thì lỗi đó sẽ được xử lý bởi trình xử lý lỗi tích hợp sẵn; lỗi sẽ được ghi vào client bằng `stack trace`. `stack trace` không được đưa vào môi trường sản xuất.

       Khi một lỗi được ghi, thông tin sau sẽ được thêm vào phản hồi:

        - `res.statusCode` được đặt từ `err.status` (hoặc `err.statusCode`). Nếu giá trị này nằm ngoài phạm vi 4xx hoặc 5xx thì nó sẽ được đặt thành 500.
        - The `res.statusMessage` sẽ được đặt theo status code
        - Phần thân sẽ là HTML của thông báo mã trạng thái khi ở trong môi trường sản xuất, nếu không sẽ là `err.stack.`
        - Bất kỳ headers nào được chỉ định trong `err.headers`

       Nếu bạn gọi `next()` và gặp lỗi sau khi bắt đầu viết phản hồi (ví dụ: nếu bạn gặp lỗi khi truyền trực tuyến phản hồi đến client), trình xử lý lỗi mặc định Express sẽ đóng kết nối và thực hiện yêu cầu không thành công.

       Vì vậy, khi thêm trình xử lý lỗi tùy chỉnh, bạn phải ủy quyền cho trình xử lý lỗi Express mặc định, khi các tiêu đề đã được gửi đến client:

        ```jsx
        function errorHandler(err, req, res, next) {
          if (res.headersSent) {
            return next(err);
          }
          res.status(500);
          res.render("error", { error: err });
        }
        ```

    3. Writing error handlers

       Xác định các hàm middleware xử lý lỗi giống như các hàm middleware khác, ngoại trừ các hàm xử lý lỗi có bốn đối số thay vì ba: `(err, req, res, next)`. Ví dụ:

        ```jsx
        app.use((err, req, res, next) => {
          console.error(err.stack)
          res.status(500).send('Something broke!')
        })
        ```

       Phản hồi từ hàm middleware có thể có nhiều loại như HTML, error page, message, json string.

       Đối với mục đích tổ chức, bạn có thể xác định một số hàm phần mềm trung gian xử lý lỗi, giống như cách bạn làm với các hàm phần mềm trung gian thông thường. Ví dụ: để xác định trình xử lý lỗi cho các yêu cầu được thực hiện bằng cách sử dụng XHR và những yêu cầu không có:

        ```jsx
        const bodyParser = require('body-parser')
        const methodOverride = require('method-override')
        
        app.use(bodyParser.urlencoded({
          extended: true
        }))
        app.use(bodyParser.json())
        app.use(methodOverride())
        app.use(logErrors)
        app.use(clientErrorHandler)
        app.use(errorHandler)
        ```

       Trong ví dụ này `logErrors` chúng có thể ghi thông và lỗi vào `stderr` ví dụ:

        ```jsx
        function logErrors (err, req, res, next) {
          console.error(err.stack)
          next(err)
        }
        ```

       Cũng trong ví dụ này clientErrorHandler được định nghĩa như sau, trong trường hợp này lỗi được chuyển sang lỗi tiếp theo:

       Lưu ý rằng khi không gọi `next` trong hàm xử lý lỗi, bạn có trách nhiệm viết (và kết thúc) phản hồi. Nếu không, những yêu cầu đó sẽ “treo”.

        ```jsx
        function clientErrorHandler (err, req, res, next) {
          if (req.xhr) {
            res.status(500).send({ error: 'Something failed!' })
          } else {
            next(err)
          }
        }
        ```

       Triển khai hàm errorHandler và catch tất cả lỗi như sau

        ```jsx
        function errorHandler(err, req, res, next) {
          res.status(500);
          res.render("error", { error: err });
        }
        ```

6. Express behind proxies

   Khi chạy ứng dụng Express phía sau reverse proxy, một số API Express có thể trả về các giá trị khác với mong đợi. Để điều chỉnh điều này, cài đặt ứng dụng proxy tin cậy có thể được sử dụng để hiển thị thông tin được cung cấp bởi reverse proxy trong API Express. Vấn đề phổ biến nhất là các API express hiển thị địa chỉ IP của clients thay vào đó có thể hiển thị địa chỉ IP nội bộ của reverse proxy.

   Khi định cấu hình cài đặt trust proxy, điều quan trọng là phải hiểu cách thiết lập chính xác của reverse proxy. Vì cài đặt này sẽ trust các giá trị được cung cấp trong yêu cầu nên điều quan trọng là sự kết hợp của cài đặt trong Express phải khớp với cách hoạt động của reverse proxy.

   | Type         | Value                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
       |--------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
   | Boolean      | Nếu đúng, địa chỉ IP của khách hàng được hiểu là mục nhập ngoài cùng bên trái trong tiêu đề X-Forwarded-For.<br/>Note: Khi đặt thành true, điều quan trọng là phải đảm bảo rằng reverse proxy đáng tin cậy cuối cùng đang xóa/ghi đè tất cả các tiêu đề HTTP sau: X-Forwarded-For, X-Forwarded-Host và X-Forwarded-Proto, nếu không thì có thể khách hàng có thể cung cấp bất kỳ giá trị nào.                                                                                                                                                                                                                                                                                                                                                        |
   | IP Addresses | Địa chỉ IP, mạng con hoặc một mảng địa chỉ IP và mạng con được tin cậy làm proxy ngược. Danh sách sau đây hiển thị tên mạng con được cấu hình sẵn:</br>- loopback - 127.0.0.1/8 :: 1/128</br>- linklocal - 169.254.0.0/16, fe80::/10</br>- uniquelocal - 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16, fc00::/7</br>Bạn có thể đặt địa chỉ IP theo bất kỳ cách nào sau đây:</br>app.set('trust proxy', 'loopback') // specify a single subnet</br>app.set('trust proxy', 'loopback, 123.123.123.123') // specify a subnet and an address</br>app.set('trust proxy', 'loopback, linklocal, uniquelocal') // specify multiple subnets as CSV</br>app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']) // specify multiple subnets as an array |
    | Number       | Sử dụng địa chỉ cách ứng dụng Express tối đa n bước nhảy. req.socket.remoteAddress là bước nhảy đầu tiên và phần còn lại được tìm kiếm trong tiêu đề X-Forwarded-For từ phải sang trái. Giá trị 0 có nghĩa là địa chỉ không đáng tin cậy đầu tiên sẽ là req.socket.remoteAddress, tức là không có Reverse Proxy.                                                                                                                                                                                                                                                                                                                                                                                                                                     |
    | Function     | Triển khai tùy chỉnh:</br>app.set('trust proxy', (ip) => {</br>if (ip === '127.0.0.1' hoặc ip === '123.123.123.123')                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |

   Việc sử dụng trust proxy sẽ có 1 vài tác động sau:

  - Giá trị của `req.hostname` được lấy từ giá trị được đặt trong tiêu đề X-Forwarded-Host, giá trị này có thể được đặt bởi máy khách hoặc proxy.
  - `X-Forwarded-Proto` có thể được đặt bởi proxy ngược để cho ứng dụng biết đó là https hay http hay thậm chí là tên không hợp lệ. Giá trị này được phản ánh bởi `req.protocol.`
  -

   Các giá trị `req.ip` và `req.ips` được điền dựa trên địa chỉ socker và tiêu đề X-Forwarded-For, bắt đầu từ địa chỉ không đáng tin cậy đầu tiên.
