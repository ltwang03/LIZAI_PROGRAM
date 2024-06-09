1. Concept RabbitMQ

   RabbitMQ là 1 phần mềm trung gian hệ thống, server, ứng dụng có thể giao tiếp và trao đổi dữ liệu với nhau. Nhiệm vụ của RabbitMQ được hiểu đơn giản là:

   **Nhận request từ nhiều nguồn → Lưu trữ → Đẩy tới consumer**

   Ngoài ra RabbitMQ còn là 1 message broker mã nguồn mở có dung lượng nhẹ dễ dàng triển khai với các OS và Cloud.

   Các đặc điểm chính của RabbitMQ:

    1. **Interoperable**
       RabbitMQ hỗ trợ một số giao thức tiêu chuẩn để giao tiếp như: `AMQP 1.0` `MQTT 5` . Nó có sẳn những thư viện và với các ngôn ngữ mà bạn làm việc. Chỉ cần chọn 1 và nó không có các Vendor License
    2. **Flexible**
       RabbitMQ cung cấp cho chúng ta nhiều options. Bạn có thể kết hợp để xác định cách truyền đi message của mình từ produce tới 1 hoặc nhiều consumer.
    3. **Reliable**
       Với khả năng xác nhận tin nhắn và sao chép tin nhắn trên cùng 1 cụm. Bạn có thể chắc rằng message của bạn sẽ được bảo mật với RabbitMQ
2. Example Use Case
    1. **Decoupling interconnected services**
       Bạn có 1 backend service cần gửi notification tới end users. Sẽ có 2 notification channels là email và push cho ứng dụng mobile

        Phần backend sẽ có gửi notification tới 2 queue, một cho mỗi kênh. Các chương trình để quản lý email và thông báo đẩy đăng ký hàng đợi mà chúng quan tâm và xử lý thông báo ngay khi chúng đến.

        **Lợi ích:**
        
        - RabbitMQ hấp thụ mức tăng đột biến của tải.
        - Bạn có thể thực hiện một số bảo trì trên trình quản lý thông báo mà không làm gián đoạn toàn bộ dịch vụ.
 
    2. **Streaming**
        
        Bạn điều hành một nền tảng video. Khi người dùng tải video mới lên, bạn có nhiều nhiệm vụ phải hoàn thành khi video được lưu trữ an toàn: chạy một số phân tích sau khi tải lên, chuyển mã các bản sao video có chất lượng thấp hơn, thông báo cho những người dùng khác đã đăng ký tác phẩm của tác giả, v.v.
        
        Dịch vụ tải lên sẽ thêm các sự kiện “New Video” vào stream RabbitMQ. Nhiều ứng dụng backend có thể đăng ký stream đó và đọc các sự kiện mới độc lập với nhau. Người dùng phải được thông báo ngay lập tức nhưng quá trình phân tích sau khi tải lên có thể đợi và chạy một lần mỗi ngày.
        
        Lợi ích:
        
        - Streams một cách hiệu quả và tránh được việc phải sao chép các tin nhắn.
        - Consumer có thể qua lại trong streams ngay cả khi có consumer đồng thời.

3. Installing

   Ở đây mình sẽ sử dụng docker để triển khai RabbitMQ trên local, để việc quản lý dễ dàng nhất. Ngoài ra chúng ta có thể sử dụng Cloud để có thể setup dễ dàng hơn.

    ```docker
    docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3.10-management
    ```

   Ngoài ra chúng ta có thể đăng ký Cloud ngay tại đây:

   https://www.cloudamqp.com/

   Tiếp theo để cài những công cụ để nodejs và RabbitMQ tương tác với nhau:

    ```docker
    npm i amqplib
    ```

4. Introduction

   RabbitMQ là một message broker: nó chấp nhận và chuyển tiếp tin nhắn. Bạn có thể coi nó như một bưu điện: khi bạn đặt bức thư bạn muốn gửi vào hộp thư, bạn có thể chắc chắn rằng người vận chuyển thư cuối cùng sẽ chuyển thư đến người nhận của bạn. Theo cách tương tự này, RabbitMQ là một hộp thư, một bưu điện và một người vận chuyển thư.

   Sự khác biệt chính giữa RabbitMQ và bưu điện là nó không xử lý giấy tờ, thay vào đó nó chấp nhận, lưu trữ và chuyển tiếp các khối dữ liệu nhị phân - tin nhắn.

   Giải thích các thuật ngữ:

    - **Producer**: Phía bên đảm nhận việc gửi message. Bạn có thể xem đây là người cần gửi thư cho một ai đó.
    - **Consumer**: Phía bên đảm nhận việc nhận message. Bạn có thể xem đây là người nhận được thư mà ai đó gửi tới.
    - **Message**: Thông tin dữ liệu truyền từ Producer đến Consumer. Đây chính là thư được gửi đi chứa nội dung gửi, nó có thể là thư tay, hàng hóa, bưu phẩm…
    - **Queue**: Nơi lưu trữ messages. Bạn có thể xem đây là một hòm lưu trữ thư với cơ chế, ai gửi trước thì được chuyển phát trước (First in first out)
    - **Connection**: Kết nối giữa ứng dụng và RabbitMQ broker. Đây có thể coi là các bưu điện đặt tại các tỉnh thành, khi bạn gửi thư thì bạn sẽ phải ra bưu điện đúng không nào
    - **Exchange**: Là nơi nhận message được publish từ Producer và đẩy chúng vào queue dựa vào quy tắc của từng loại Exchange. Để nhận được message, queue phải được nằm (binding) trong ít nhất 1 Exchange.. Có thể hiểu đây là một khu vực kho tổng hợp tất cả các thư mà mọi người gửi thư tới được tổng hợp, phân loại khu vực, gửi hàng loạt hay không…
    - **Binding**: Đảm nhận nhiệm vụ liên kết giữa Exchange và Queue. Có thể xem đây là quá trình chuyển thừ hòm lưu trữ thư vào kho phân loại.
    - R**outing key**: Một key mà Exchange dựa vào đó để quyết định cách để định tuyến message đến queue. Khi kiểm tra địa chỉ trên mỗi bức thư thì Routing key chính là địa chỉ người nhận, khi này việc phân loại thư trong kho sẽ phân loại dựa theo địa chỉ này để đưa tới từng khu vực bưu điện đích.
    - **AMQP (Advance Message Queuing Protocol)**: là giao thức truyền message được sử dụng trong RabbitMQ.
    - **User**: Gồm username và password giúp truy cập vào RabbitMQ dashboard hoặc tạo connection. Có thể xem đây là những nhân viên bưu điện, họ có thể theo dõi, phân loại, can thiệp, hỗ trợ trong quá trình gửi bưu phẩm.
    - **Virtual host/Vhost**: Cung cấp những cách riêng biệt để các ứng dụng dùng chung một RabbitMQ instance. Hãy xem đây là những bưu cục chi nhánh rải trên khắp đất nước để thuận tiện cho người gửi cũng như người nhận.
    1. Sử dụng cơ bản của RabbitMQ

       Chúng ta sẽ gọi message publisher (người gửi) là `send.js` và người tiêu dùng tin nhắn (người nhận) là `receive.js`. Publisher sẽ kết nối với RabbitMQ, gửi một tin nhắn duy nhất, sau đó thoát ra.

       `Send.js`

        - Đầu tiên để sử dụng được các phương thức, chúng ta phải khai báo thư viện:

            ```jsx
            const amqp = require('amqplib/callback_api');
            ```

        - Kết nối tới rabbitMQ server:

            ```jsx
            amqp.connect("amqp://localhost:5672", (error0, connection) => {
              if (error0) {
                throw error0;
              }
            ```

        - Tạo channel đây là nơi sẽ chứa hầu hết API hoàn thành công việc:

            ```jsx
            connection.createChannel((error1, channel) => {
                if (error1) {
                  throw error1;
                }
             }
            ```

        - Để gửi, chúng ta phải khai báo một hàng đợi để chúng ta gửi tới; sau đó chúng ta có thể publish một tin nhắn lên hàng đợi:

            ```jsx
            connection.createChannel((error1, channel) => {
                if (error1) {
                  throw error1;
                }
                const queue = "hello-queue";
                const message = "this is producer";
                channel.assertQueue(queue, {
                  durable: false,
                });
                channel.sendToQueue(queue, Buffer.from(message));
                console.log(" [x] Sent %s", message);
              });
            ```

          Khai báo một hàng đợi là bình thường - nó sẽ chỉ được tạo nếu nó chưa tồn tại. Nội dung tin nhắn là một mảng byte nên bạn có thể mã hóa bất cứ thứ gì bạn thích ở đó.

        `Receive.js`
        
        Consumer của chúng tôi lắng nghe tin nhắn từ RabbitMQ, vì vậy không giống như publisher xuất bản một tin nhắn duy nhất, chúng tôi sẽ để consumer chạy để nghe tin nhắn và in chúng ra.
        
        - Đầu tiên vẫn là khai báo thư viện ở Receive.js:
            
            ```jsx
            const amqp = require('amqplib/callback_api');
            ```
            
        - Việc thiết lập cũng giống như nhà xuất bản; chúng tôi mở một connection và một channel, đồng thời khai báo queue mà chúng tôi sẽ sử dụng. Lưu ý điều này khớp với hàng đợi mà sendToQueue xuất bản tới.
            
            ```jsx
            amqp.connect("amqp://localhost:5672", (error0, connection) => {
              if (error0) {
                throw error0;
              }
              connection.createChannel((error1, channel) => {
                if (error1) {
                  throw error1;
                }
                const queue = "hello-queue";
                channel.assertQueue(queue, {
                  durable: false,
                });
                console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
            
                channel.consume(queue, (msg) => {
                  console.log(" [x] Received %s", msg.content.toString());
                });
              });
            });
            
            ```
             
        Tiến hành chạy:

        Consumer sẽ in thông báo nhận được từ nhà xuất bản thông qua RabbitMQ. Consumer sẽ tiếp tục chạy, chờ tin nhắn (Sử dụng Ctrl-C để dừng tin nhắn), vì vậy hãy thử chạy Publisher từ một thiết bị đầu cuối khác.
        
    2. **Work Queues**
        
        Ý tưởng chính đằng sau `Work Queues` (còn gọi là: Task Queues) là tránh thực hiện một nhiệm vụ tiêu tốn nhiều tài nguyên ngay lập tức và phải đợi nó hoàn thành. Thay vào đó chúng ta lên lịch công việc sẽ được thực hiện sau. Chúng tôi gói gọn một tác vụ dưới dạng một tin nhắn và gửi nó vào Queue. Một tiến trình Worker chạy ở chế độ nền sẽ bật các tác vụ và cuối cùng thực thi công việc. Khi bạn điều hành nhiều Workers, nhiệm vụ sẽ được chia sẻ giữa họ.
        
        - Chúng ta tạo 1 file mới tên là `new-task.js` code gần giống tương tự send.js
        
        ```jsx
          connection.createChannel((error1, channel) => {
            if (error1) {
              throw error1;
            }
            const queue = "task_queue";
            const msg = process.argv.slice(2).join(" ") || "sent!";
            channel.assertQueue(queue, {
              durable: true,
            });
            channel.sendToQueue(queue, Buffer.from(msg), {
              persistent: true,
            });
            console.log(" [x] Sent '%s'", msg);
          });
        ```
        
        - Tiếp theo chúng ta tạo 1 `worker.js`
        
        ```jsx
        connection.createChannel((error1, channel) => {
            if (error1) {
              throw error1;
            }
            const queue = "task_queue";
            channel.consume(
              queue,
              (msg) => {
                const secs = msg.content.toString().split(".").length - 1;
                console.log(" [x] Received %s", msg.content.toString());
                setTimeout(function () {
                  console.log(" [x] Done");
                }, secs * 1000);
              },
              { noAck: true }
            );
          });
        ```
        
        Chạy 2 file trên:
        
        ```jsx
        node new_task.js
        ```
        
        ```jsx
        node worker.js
        ```
        
        **Round-Robin dispatching**
        
        - Một trong những lợi thế của việc sử dụng Task Queues là khả năng dễ dàng thực hiện song song công việc. Nếu chúng tôi đang xây dựng một lượng công việc tồn đọng, chúng tôi có thể thêm nhiều Workers hơn và bằng cách đó, có thể mở rộng quy mô một cách dễ dàng.
        
        ```bash
        #new-task.js
        ➜  basic_rabbitmq git:(main) ✗ node task_queue.js LIZAI 1         
        < [x] Sent 'LIZAI 1'
        ^C
        ➜  basic_rabbitmq git:(main) ✗ node task_queue.js LIZAI 2
        < [x] Sent 'LIZAI 2'
        ```
        
        - Như có thể thấy chúng ta gửi đi 2 message:
        
        ```bash
        #Worker 1
        [x] Received LIZAI 1
         [x] Done
        ```
        
        - Worker 1 nhận message.
        
        ```bash
        #Worker 2
        [x] Received LIZAI 2
        [x] Done
        
        ```
        
        - Worker 2 nhận được message 2
            
            Theo mặc định, RabbitMQ sẽ gửi từng tin nhắn đến người tiêu dùng tiếp theo theo trình tự. Trung bình mỗi Consumer sẽ nhận được số lượng tin nhắn như nhau. Cách phân phối tin nhắn này được gọi là round-robin. Hãy thử điều này với ba worker trở lên.

        **Message acknowledgment**
        
        Thực hiện một tác vụ có thể mất vài giây, bạn có thể thắc mắc điều gì sẽ xảy ra nếu consumer bắt đầu một tác vụ dài và nó kết thúc trước khi hoàn thành. Với mã hiện tại của chúng tôi, khi RabbitMQ gửi tin nhắn đến người tiêu dùng, nó sẽ ngay lập tức đánh dấu tin nhắn đó để xóa. Trong trường hợp này, nếu bạn chấm dứt một worker, bạn sẽ mất thông báo mà nó vừa xử lý. Các tin nhắn đã được gửi đến worker cụ thể này nhưng chưa được xử lý cũng bị mất.
        
        Nhưng chúng tôi không muốn mất bất kỳ nhiệm vụ nào. Nếu một worker chết, chúng tôi muốn nhiệm vụ được giao cho một worker khác.
        
        Để đảm bảo tin nhắn không bao giờ bị mất, RabbitMQ hỗ trợ xác nhận tin nhắn. Một xác nhận (nowledgement) được consumer gửi lại để thông báo cho RabbitMQ rằng một tin nhắn cụ thể đã được nhận, xử lý và RabbitMQ có quyền xóa nó.
        
        Nếu consumer chết (channel của nó bị đóng, kết nối bị đóng hoặc mất kết nối TCP) mà không gửi xác nhận, RabbitMQ sẽ hiểu rằng tin nhắn chưa được xử lý đầy đủ và sẽ xếp hàng lại. Nếu có những người tiêu dùng khác trực tuyến cùng lúc, nó sẽ nhanh chóng phân phối lại cho consumer khác. Bằng cách đó, bạn có thể chắc chắn rằng không có tin nhắn nào bị mất, ngay cả khi worker thỉnh thoảng chết.
        
        Xác nhận thủ công của consumer đã bị tắt trong các ví dụ trước. Đã đến lúc bật chúng bằng tùy chọn `{noAck: false}` và gửi xác nhận thích hợp từ nhân viên sau khi chúng ta hoàn thành nhiệm vụ.
        
        Sử dụng code này, bạn có thể đảm bảo rằng ngay cả khi bạn chấm dứt một nhân viên bằng cách sử dụng CTRL+C trong khi nó đang xử lý tin nhắn, thì không có gì bị mất. Ngay sau khi worker chấm dứt, tất cả các tin nhắn chưa được xác nhận sẽ được gửi lại.
        
        **Message durability**
        
        Chúng tôi đã học được cách đảm bảo rằng ngay cả khi cónusmer chết thì nhiệm vụ vẫn không bị mất. Nhưng nhiệm vụ của chúng ta vẫn sẽ bị mất nếu server RabbitMQ dừng lại.
        
         Khi RabbitMQ thoát hoặc gặp sự cố, nó sẽ quên hàng đợi và tin nhắn trừ khi bạn yêu cầu nó không làm vậy. Cần có hai điều để đảm bảo tin nhắn không bị mất: chúng ta cần đánh dấu cả hàng đợi và tin nhắn là lâu bền.
        
        Trước tiên, chúng ta cần đảm bảo rằng hàng đợi sẽ tồn tại khi khởi động lại nút RabbitMQ. Để làm như vậy, chúng ta cần khai báo nó là bền:
        
        ```bash
        channel.assertQueue('task_queue', {durable: true});
        ```
        
        Thay đổi tùy chọn lâu dài này cần được áp dụng cho cả code producer và code consumer.
        
        Tại thời điểm này, chúng tôi chắc chắn rằng hàng đợi task_queue sẽ không bị mất ngay cả khi RabbitMQ khởi động lại. Bây giờ chúng ta cần đánh dấu tin nhắn của mình là liên tục
        
        bằng cách sử dụng tùy chọn `persistent` mà `Channel.sendToQueue` thực hiện.
        
        ```jsx
        channel.sendToQueue(queue, Buffer.from(msg), {persistent: true});
        ```
        
        **Fair dispatch**
        
        Bạn có thể nhận thấy rằng việc điều phối vẫn không hoạt động chính xác như chúng ta mong muốn. Ví dụ, trong tình huống có hai worker, khi tất cả các tin nhắn lẻ đều nặng và các tin nhắn chẵn đều nhẹ, một worker sẽ liên tục bận rộn và người còn lại sẽ hầu như không làm bất kỳ công việc nào. Chà, RabbitMQ không biết gì về điều đó và vẫn sẽ gửi tin nhắn một cách đồng đều.
        
        Điều này xảy ra vì RabbitMQ chỉ gửi tin nhắn khi tin nhắn đó được đưa vào queue. Nó không xem xét số lượng tin nhắn chưa được xử lý của consumer. Nó chỉ gửi một cách mù quáng mọi tin nhắn thứ n đến consumer thứ n.
        
        Để khắc phục điều đó, chúng ta có thể sử dụng phương thức `prefetch` với giá trị là `1`. Điều này yêu cầu RabbitMQ không gửi nhiều tin nhắn cho một worker cùng một lúc. Hay nói cách khác, không gửi tin nhắn mới cho một worker cho đến khi nó xử lý và xác nhận tin nhắn trước đó. Thay vào đó, nó sẽ gửi nó cho worker tiếp theo không còn bận.
        
        ```jsx
        channel.prefetch(1);
        ```
        
    3. **Publish/Subscribe**
        
        Giả định đằng sau task queues là mỗi task được giao cho chính xác một worker. Trong phần này, chúng tôi sẽ làm điều gì đó hoàn toàn khác -- chúng tôi sẽ gửi message tới nhiều consumers. Mẫu này được gọi là "Publish/subscribe".
        
         Để minh họa mẫu này, chúng ta sẽ xây dựng một hệ thống ghi logs đơn giản. Nó sẽ bao gồm hai chương trình — chương trình đầu tiên sẽ phát ra các message và chương trình thứ hai sẽ nhận và in chúng.
        
        Trong hệ thống ghi logs của chúng tôi, mọi bản sao đang chạy của chương trình nhận sẽ nhận được thông báo. Bằng cách đó, chúng ta sẽ có thể chạy một bộ receiver và chuyển các logs vào disk; đồng thời chúng ta sẽ có thể chạy một receiver khác và xem logs trên màn hình.
        
        Về cơ bản, các logs message được publish sẽ được phát tới tất cả Receivers.
        
        Exchange
        
        Exchange là các thực thể AMQP 0-9-1 nơi tin nhắn được gửi tới. Các exchange nhận một tin nhắn và route nó vào không hoặc nhiều queue. Thuật toán định tuyến được sử dụng phụ thuộc vào loại exchange và quy tắc được gọi là ràng buộc. Các broker AMQP 0-9-1 cung cấp bốn loại trao đổi:
        
        | Exchange type | Default pre-declared names |
        | --- | --- |
        | Direct exchange | (Empty string) and amq.direct |
        | Fanout exchange | amq.fanout |
        | Topic exchange | amq.topic |
        | Headers exchange | amq.match (and amq.headers in RabbitMQ) |
        
        Ý tưởng cốt lõi trong mô hình nhắn tin trong RabbitMQ là producer không bao giờ gửi bất kỳ tin nhắn nào trực tiếp đến hàng đợi. Trên thực tế, thường thì producer thậm chí còn không biết liệu một message có được gửi đến bất kỳ queue nào hay không.
        
        Thay vào đó, producer chỉ có thể gửi tin nhắn đến một exchange. exchange là một điều rất đơn giản. Một mặt, nó nhận được tin nhắn từ producer và mặt khác, nó đẩy họ vào queue. exchange phải biết chính xác phải làm gì với tin nhắn mà nó nhận được. Nó có nên được thêm vào một queue cụ thể không? Có nên thêm nó vào nhiều queúe không? Hoặc nó nên bị loại bỏ. Các quy tắc cho điều đó được xác định bởi loại exchange
        
        Có một số loại exchange có sẵn: `direct`, `topics`, `headers` và `fanout`. Chúng ta sẽ tập trung vào phần cuối cùng -- phần fanout. Hãy tạo một trao đổi kiểu này và gọi nó là nhật ký:
        
        ```jsx
        ch.assertExchange('logs', 'fanout', {durable: false})
        ```
        
        Việc exchange fanout rất đơn giản. Như bạn có thể đoán từ cái tên, nó chỉ phát tất cả các tin nhắn mà nó nhận được tới tất cả các queue mà nó biết. Và đó chính xác là những gì chúng ta cần cho logger của mình.
        
        Default Exchange:
        
        Chúng ta chưa biết gì về exchange nhưng vẫn có thể gửi tin nhắn đến queue. Điều đó có thể thực hiện được vì chúng tôi đang sử dụng exchange mặc định, được xác định bằng chuỗi trống ("").
        
        Bây giờ, thay vào đó, chúng ta có thể xuất bản lên exchange được đặt tên của mình:
        
        ```jsx
        channel.publish('logs', '', Buffer.from('Hello World!'));
        ```
        
        Chuỗi trống làm tham số thứ hai có nghĩa là chúng tôi không muốn gửi tin nhắn đến bất kỳ queue cụ thể nào. Chúng tôi chỉ muốn xuất bản nó lên exchange 'logs' của chúng tôi.
        
        Temporary queues:
        
        Việc có thể đặt tên cho một queue là rất quan trọng đối với chúng tôi -- chúng tôi cần chỉ cho các worker đến cùng một queue. Đặt tên cho queue là điều quan trọng khi bạn muốn chia sẻ queue giữa producer và consumer.
        
        Nhưng đó không phải là trường hợp logger của tôi. Chúng tôi muốn biết về tất cả các log message chứ không chỉ một tập hợp con của chúng. Chúng tôi cũng chỉ quan tâm đến những tin nhắn hiện đang được gửi chứ không phải những tin nhắn cũ. Để giải quyết vấn đề đó chúng ta cần hai điều.
        
        Đầu tiên, bất cứ khi nào chúng ta kết nối với Rabbit, chúng ta cần một queue trống mới. Để làm điều này, chúng ta có thể tạo một queue có tên ngẫu nhiên hoặc thậm chí tốt hơn - hãy để máy chủ chọn một tên hàng đợi ngẫu nhiên cho chúng ta.
        
        Thứ hai, khi chúng tôi ngắt kết nối consumer, queue sẽ tự động bị xóa.
        
        Trong `amqp.node`, khi chúng tôi cung cấp tên hàng đợi dưới dạng một chuỗi trống, chúng tôi sẽ tạo một hàng đợi không bền với tên được tạo:
        
        ```jsx
        channel.assertQueue('', {
          exclusive: true
        });
        ```
        
        Khi phương thức trả về, queue chứa tên queue ngẫu nhiên được tạo bởi RabbitMQ. Ví dụ: nó có thể trông giống như amq.gen-JzTY20BRgKO-HjmUJj0wLg.
        
        Khi kết nối được khai báo đóng, hàng đợi sẽ bị xóa vì nó được khai báo là độc quyền. Bạn có thể tìm hiểu thêm về `exclusive` và các thuộc tính hàng đợi khác trong hướng dẫn về hàng đợi.
        
        Putting it all together
        
        Producer Program emit logs message trông không khác nhiều so với hướng dẫn trước đó. Thay đổi quan trọng nhất là giờ đây chúng tôi muốn Publish thông báo lên exchange `logs` của mình thay vì thông báo ẩn danh. Chúng tôi cần cung cấp khóa routing key khi gửi, nhưng giá trị của nó bị bỏ qua đối với các trao đổi `fanout` .
        
        `Emit_log.js`
        
        ```jsx
        		const connection = await amqp.connect("amqp://localhost:5672");
            const channel = await connection.createChannel();
            const exchange = "logs";
            const msg = process.argv.slice(2).join(" ") || "Hello World!";
            await channel.assertExchange(exchange, "fanout", { durable: false });
            channel.publish(exchange, "", Buffer.from(msg));
            console.log(" [x] Sent %s", msg);
            setTimeout(function () {
              connection.close();
              process.exit(0);
            }, 500);
        ```
        
        Như bạn thấy, sau khi thiết lập kết nối, chúng ta đã khai báo exchange. Bước này là cần thiết vì việc Publish lên một exchange không tồn tại bị cấm.
        
        Tin nhắn sẽ bị mất nếu chưa có queue nào được liên kết với sàn giao dịch, nhưng điều đó không sao đối với chúng tôi; nếu không có consumer nào lắng nghe, chúng tôi có thể loại bỏ tin nhắn một cách an toàn.
        
        `Receive_log.js`
        
        ```jsx
          const connection = await amqp.connect("amqp://localhost:5672");
          const channel = await connection.createChannel();
          const exchange = "logs";
          await channel.assertExchange(exchange, "fanout", { durable: false });
          const q = await channel.assertQueue("", { exclusive: true });
          console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
          await channel.bindQueue(q.queue, exchange, "");
          await channel.consume(
            q.queue,
            (msg) => {
              if (msg.content) {
                console.log(" [x] %s", msg.content.toString());
              }
            },
            { noAck: true }
          );
        ```
        
        Việc giải thích kết quả rất đơn giản: dữ liệu từ logs exchange sẽ được chuyển đến hai queue có tên do máy chủ chỉ định. Và đó chính xác là những gì chúng tôi dự định.
        
    4. Routing
        
        tôi sẽ làm cho nó chỉ có thể đăng ký một tập hợp con các tin nhắn. Ví dụ:  tôi sẽ chỉ có thể chuyển các thông báo lỗi nghiêm trọng tới file log (để tiết kiệm dung lượng ổ đĩa), trong khi vẫn có thể in tất cả các log message trên console 
        
        - Bindings
            
            ```jsx
            channel.bindQueue(q.queue, exchange, '');
            ```
            
            Binding là mối quan hệ giữa trao đổi và queue. Điều này có thể được đọc đơn giản là: queue quan tâm đến các message từ trao đổi này.
            
            Các binding có thể lấy thêm một tham số khóa liên kết (chuỗi trống trong mã ở trên). Đây là cách chúng ta có thể tạo liên kết bằng một khóa:
            
        - Driect exchange
            
            Driect exchange là một trong những exchange được tích hợp vào RabbitMQ và có lẽ là exchange đơn giản nhất trong số đó. Sử dụng Driect exchange khi biết routing key và bạn muốn thực hiện các tác vụ khác nhau dựa trên routing key.
            
            Driect exchange sẽ định tuyến tin nhắn đến một queue có route key khớp chính xác với route key của tin nhắn. Vì vậy, nếu bạn liên kết một hàng đợi với một Driect exchange bằng binding key “blue”, tất cả các tin nhắn được xuất bản tới trao đổi đó với route key “blue” sẽ kết thúc trong hàng đợi đó. Một hàng đợi có thể có nhiều liên kết với cùng một exchange với các binding keys khác nhau.
            
             tôi sẽ sử dụng direct exchange. Thuật toán route đằng sau direct exchange rất đơn giản - một tin nhắn sẽ được chuyển đến hàng đợi có binding key khớp chính xác với routing key của tin nhắn.
 
            Trong thiết lập này, chúng ta có thể thấy direct exchange X có hai hàng đợi được liên kết với nó. Hàng đợi đầu tiên được binding `orange` và hàng thứ hai có hai liên kết, một liên kết với phím binding `black` và một binding khác với phím `green`
            
             Trong thiết lập như vậy, một tin nhắn được xuất bản tới sàn giao dịch có route key `orange` sẽ được chuyển đến hàng đợi Q1. Tin nhắn có route key `black` hoặc `green` sẽ chuyển đến Q2. Tất cả các tin nhắn khác sẽ bị loại bỏ.
            
        - Multiple bindings
            
            Việc liên kết nhiều hàng đợi với cùng một khóa liên kết là hoàn toàn hợp pháp. Trong ví dụ của chúng tôi, chúng tôi có thể binding giữa X và Q1 bằng binding key màu đen. Trong trường hợp đó, direct exchange sẽ hoạt động giống như `fanout` và sẽ phát thông báo tới tất cả các hàng đợi phù hợp. Một tin nhắn có routing key `black` sẽ được gửi đến cả Q1 và Q2.
            
        - **Emitting logs**
            
             Chúng tôi sẽ sử dụng mô hình này cho hệ thống ghi log của mình. Thay vì fanout, chúng tôi sẽ gửi tin nhắn đến một direct exchange. Chúng tôi sẽ cung cấp servety log làm route key. Bằng cách đó, tập lệnh nhận sẽ có thể chọn servety mà nó muốn nhận. Trước tiên hãy tập trung vào việc phát ra logs.
            
            Tạo 1 exchange:
            
            ```jsx
            const exchange = 'direct_logs';
            
            channel.assertExchange(exchange, 'direct', {
              durable: false
            });
            ```
            
            Publish message:
            
            ```jsx
            const exchange = 'direct_logs';
            
            channel.assertExchange(exchange, 'direct', {
              durable: false
            });
            channel.publish(exchange, severity, Buffer.from(msg));
            ```
            
        - Triển khai:
            
            `emit_log_direct.js`
            
            ```jsx
            const amqp = require("amqplib");
            
            async function run() {
              try {
                const connection = await amqp.connect("amqp://localhost:5672");
                const channel = await connection.createChannel();
                const exchange = "direct_logs";
                const args = process.argv.slice(2);
                const severity = args.length > 0 ? args[0] : "info";
                const message = args.slice(1).join(" ") || "Hello World!";
                await channel.assertExchange(exchange, "direct", { durable: false });
                await channel.publish(exchange, severity, Buffer.from(message));
                console.log(" [x] Sent %s: '%s'", severity, message);
                setTimeout(function () {
                  connection.close();
                  process.exit(0);
                }, 500);
              } catch (e) {
                throw e;
              }
            }
            run();
            
            ```
            
            `receive_log_direct.js`
            
            ```jsx
            const amqp = require("amqplib");
            
            async function run() {
              const connection = await amqp.connect("amqp://localhost:5672");
              const channel = await connection.createChannel();
              const exchange = "direct_logs";
              const args = process.argv.slice(2);
              if (args.length == 0) {
                console.log("Usage: receive_logs_direct.js [info] [warning] [error]");
                process.exit(1);
              }
              await channel.assertExchange(exchange, "direct", { durable: false });
              const q = await channel.assertQueue("", { exclusive: true });
              console.log(" [*] Waiting for logs. To exit press CTRL+C");
              args.forEach((severity) => {
                channel.bindQueue(q.queue, exchange, severity);
              });
              await channel.consume(
                q.queue,
                (msg) => {
                  console.log(
                    " [x] %s: '%s'",
                    msg.fields.routingKey,
                    msg.content.toString()
                  );
                },
                { noAck: true }
              );
            }
            run();
            
            ```
            
    5. Topic Exchange
        
        Trong RabbitMQ, tin nhắn được publish lên một exchange và tùy thuộc vào loại exchange, tin nhắn sẽ được chuyển đến một hoặc nhiều hàng đợi. RabbitMQ có một số built-in exchange và một số exchange được kích hoạt thông qua plugin. topic exchange là một trong những exchange được tích hợp vào RabbitMQ và tương tự như direct exchange nhưng có khả năng định tuyến mạnh mẽ hơn.
        
         Nó tương tự như direct exchange ở chỗ nó sẽ routing các tin nhắn trong đó routing key khớp với binding key từ liên kết hàng đợi. Tuy nhiên, với topic exchange, bạn cũng có thể sử dụng ký tự đại diện trong binding key. Khi sử dụng topic exchange, routing key của tin nhắn phải là danh sách các từ được phân tách bằng dấu chấm, chẳng hạn như “metrics.server.cpu”. Lý do là việc topic exchange cho phép bạn khớp các phần của routing key và sử dụng dấu chấm làm dấu phân cách.
        
        Tin nhắn được gửi tới một `topic` exchange không được có `Routing_key` tùy ý - nó phải là một danh sách các từ, được phân cách bằng dấu chấm. Các từ có thể là bất kỳ từ nào, nhưng thông thường chúng chỉ rõ một số tính năng liên quan đến tin nhắn. Một số ví dụ về routing key hợp lệ: "`stock.usd.nyse`", "`nyse.vmw`", "`quick.orange.rabbit`". Có thể có bao nhiêu từ trong routing key tùy thích, tối đa giới hạn là `255 byte.`
        
        `binding key` cũng phải ở dạng tương tự. Logic đằng sau việc `topic exchange` tương tự như logic trực tiếp - một tin nhắn được gửi bằng một `routing key` cụ thể sẽ được gửi đến tất cả các hàng đợi được binding bằng một `binding key` phù hợp. Tuy nhiên, có hai trường hợp đặc biệt quan trọng đối với khóa liên kết:
        
        - (star) có thể thay thế chính xác một từ.
        - (hash) có thể thay thế bằng 0 hoặc nhiều từ.
        
        tôi sẽ gửi tin nhắn mô tả động vật. Tin nhắn sẽ được gửi bằng routing key bao gồm ba từ (hai dấu chấm). Từ đầu tiên trong route keu sẽ mô tả tốc độ, thứ hai là màu sắc và thứ ba là loài: "<speed>.<color>.<species>".
        
         tôi đã tạo ba binding: Q1 được liên kết với binding key "`*.orange.*`" và Q2 với "*`.*.rabbit`" và "`lazy.#`".
        
        Những ràng buộc này có thể được tóm tắt như sau:
        
        - Q1 quan tâm đến tất cả các con vật màu cam.
        - Q2 muốn nghe mọi thứ về thỏ và mọi thứ về động vật lười biếng.
        
        Một tin nhắn có route key được đặt thành "`quick.orange.rabbit`" sẽ được gửi đến cả hai hàng đợi. Tin nhắn "`lazy.orange.elephant`" cũng sẽ được gửi đến cả hai queue. Mặt khác, "`quick.orange.fox`" sẽ chỉ đi đến hàng đợi đầu tiên và "`lazy. brown.fox`" chỉ đến hàng thứ hai. "`lazy.pink.rabbit`" sẽ chỉ được gửi đến hàng đợi thứ hai một lần, mặc dù nó khớp với hai liên kết. "`quick.Brown.fox`" không khớp với bất kỳ binding nào nên nó sẽ bị loại bỏ.
        
        `emit_log_topic.js` 
        
        ```jsx
        const amqp = require('amqplib/callback_api');
        
        amqp.connect('amqp://localhost:5672', function(error0, connection) {
          if (error0) {
            throw error0;
          }
          connection.createChannel(function(error1, channel) {
            if (error1) {
              throw error1;
            }
            const exchange = 'topic_logs';
            const args = process.argv.slice(2);
            const key = (args.length > 0) ? args[0] : 'anonymous.info';
            const msg = args.slice(1).join(' ') || 'Hello World!';
        
            channel.assertExchange(exchange, 'topic', {
              durable: false
            });
            channel.publish(exchange, key, Buffer.from(msg));
            console.log(" [x] Sent %s:'%s'", key, msg);
          });
        
          setTimeout(function() {
            connection.close();
            process.exit(0)
          }, 500);
        });
        ```
        
        `receive_logs_topic.js`
        
        ```jsx
        const amqp = require('amqplib/callback_api');
        
        const args = process.argv.slice(2);
        
        if (args.length == 0) {
          console.log("Usage: receive_logs_topic.js <facility>.<severity>");
          process.exit(1);
        }
        
        amqp.connect('amqp://localhost:5672', function(error0, connection) {
          if (error0) {
            throw error0;
          }
          connection.createChannel(function(error1, channel) {
            if (error1) {
              throw error1;
            }
            var exchange = 'topic_logs';
        
            channel.assertExchange(exchange, 'topic', {
              durable: false
            });
        
            channel.assertQueue('', {
              exclusive: true
            }, function(error2, q) {
              if (error2) {
                throw error2;
              }
              console.log(' [*] Waiting for logs. To exit press CTRL+C');
        
              args.forEach(function(key) {
                channel.bindQueue(q.queue, exchange, key);
              });
        
              channel.consume(q.queue, function(msg) {
                console.log(" [x] %s:'%s'", msg.fields.routingKey, msg.content.toString());
              }, {
                noAck: true
              });
            });
          });
        });
        ```
        
        Để nhận các log:
        
        ```bash
        node receive_logs_topic.js "#"
        
        ```
        
        Để nhận các logs từ `“kern”`
        
        ```bash
        node receive_logs_topic.js "kern.*"
        
        ```
        
        Hoặc nếu bạn chỉ muốn nghe về logs "`critical`":
        
        ```bash
        node receive_logs_topic.js "*.critical"
        
        ```
        
        Bạn có thể tạo nhiều ràng buộc:
        
        ```bash
        node receive_logs_topic.js "kern.*" "*.critical"
        
        ```
        
        Và để phát ra log có routing key loại "kern.critical”
        
        ```bash
        node emit_log_topic.js "kern.critical" "A critical kernel error"
        
        ```
        
    6. Headers Exchange:
        
        **Header exchange** (amq.headers) được thiết kế để định tuyến với nhiều thuộc tính, để dàng thực hiện dưới dạng header của message hơn là routing key. Header exchange bỏ đi routing key mà thay vào đó định tuyến dựa trên header của message. Trường hợp này, broker cần một hoặc nhiều thông tin từ application developer, cụ thể là, nên quan tâm đến những tin nhắn với tiêu đề nào phù hợp hoặc tất cả chúng.
        
        Headers Exchange rất giống với Topic Exchange, nhưng nó định tuyến dựa trên các giá trị header thay vì routing key.
        
        Một Message được coi là phù hợp nếu giá trị của header bằng với giá trị được chỉ định khi ràng buộc.
        
        Flow của một Message trong Headers Exchange như sau:
        
        - Một hoặc nhiều **Queue** được tạo và binding tới một Headers Exchange sử dụng các header property (H).
        - Một **Producer** sẽ tạo một **Message** với các header property (MH) và publish tới **Exchange**.
        - Một Message được Exchange chuyển đến Queue nếu Header H match với Header MH.
        - **Consumer** đăng ký tới Queue để nhận Message.
        
        **Headers Matching:** Có hai cách để khớp headers:
        
        - **"all":** Tin nhắn chỉ được định tuyến đến queue nếu tất cả các headers được chỉ định trong binding khớp với các headers của tin nhắn.
        - **"any":** Tin nhắn được định tuyến đến queue nếu ít nhất một trong các headers được chỉ định trong binding khớp với các headers của tin nhắn.
        
        **Giá trị Headers:** Giá trị của headers có thể là bất kỳ kiểu dữ liệu nào (string, integer, boolean, etc.).
        
        **Ví dụ:**
        
        Giả sử bạn có một headers exchange tên là "image_exchange". Bạn có hai queue:
        
        - **queue_jpg:** Được ràng buộc với exchange với header `format` có giá trị là "jpg".
        - **queue_png:** Được ràng buộc với exchange với header `format` có giá trị là "png".
        
        Khi bạn gửi một tin nhắn đến `image_exchange` với header `format: "jpg"`, tin nhắn sẽ được định tuyến đến `queue_jpg`. Nếu bạn gửi một tin nhắn với header `format: "png"`, nó sẽ được định tuyến đến `queue_png`.
