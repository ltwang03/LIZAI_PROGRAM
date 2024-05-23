1. Concept

   **Factory Method Design Pattern** hay gọi ngắn gọn là **Factory Pattern** là một trong những Pattern thuộc nhóm **Creational Design Pattern**. Nhiệm vụ của Factory Pattern là quản lý và trả về các đối tượng theo yêu cầu, giúp cho việc khởi tạo đổi tượng một cách linh hoạt hơn.

   ![Untitled](https://refactoring.guru/images/patterns/content/factory-method/factory-method-en-2x.png)

   **Factory Pattern** đúng nghĩa là một **nhà máy**, và nhà máy này sẽ “**sản xuất**” các đối tượng theo yêu cầu của chúng ta.

2. Thành phần
    - **Super Class**: môt super class trong Factory Pattern có thể là một **interface**, **abstract class** hay một **class** thông thường.
    - **Sub Classes**: các sub class sẽ implement các phương thức của **super class** theo nghiệp vụ riêng của nó.
    - **Factory Class**: một class chịu tránh nhiệm khởi tạo các đối tượng **sub class** dựa theo tham số đầu vào. Lưu ý: lớp này là Singleton [](https://gpcoder.com/4190-huong-dan-java-design-pattern-singleton/)hoặc cung cấp một **public static method** cho việc truy xuất và khởi tạo đối tượng. Factory class sử dụng if-else hoặc switch-case để xác định class con đầu ra.
3. Vấn đề được đặt ra

   Hãy tưởng tượng rằng bạn đang tạo một ứng dụng quản lý vận tải. Phiên bản đầu tiên của ứng dụng chỉ có thể xử lý việc vận chuyển bằng xe tải, vì vậy phần lớn code của bạn nằm trong class Trucks.

   Sau một thời gian, ứng dụng của bạn sẽ trở nên khá phổ biến. Mỗi ngày bạn nhận được hàng chục yêu cầu từ các công ty vận tải biển về việc đưa dịch vụ logistics đường biển vào ứng dụng.

   ![Untitled](https://refactoring.guru/images/patterns/diagrams/factory-method/problem1-en-2x.png)

   Hiện tại, hầu hết code của bạn được ghép nối với class Trucks. Việc thêm Ships vào ứng dụng sẽ yêu cầu thực hiện các thay đổi đối với toàn bộ base code. Hơn nữa, nếu sau này bạn quyết định thêm một loại phương tiện giao thông khác vào ứng dụng, có thể bạn sẽ cần phải thực hiện lại tất cả những thay đổi này.

   Kết quả là, bạn sẽ gặp phải một đoạn code khá khó chịu, chứa đầy các điều kiện chuyển đổi hành vi của ứng dụng tùy thuộc vào loại đối tượng vận chuyển.

4. Giải pháp

   Factory pattern gợi ý rằng chúng ta thay thế các lệnh gọi bằng `new` bằng các lệnh gọi đến 1 method từ factory. Đừng lo lắng các đối tượng vẫn được tạo thông qua `new` nhưng nó được gọi từ bên trong method factory. Các đối tượng được trả về bằng phương thức Factory thường được gọi là *Products*

   Thoạt nhìn, sự thay đổi này có vẻ vô nghĩa: chúng ta chỉ chuyển lệnh gọi hàm tạo từ phần này sang phần khác của chương trình. Tuy nhiên, hãy xem xét điều này: bây giờ bạn có thể ghi đè phương thức Factory trong một sub class và thay đổi class sản phẩm được tạo bằng phương thức này.

   Với Factory Pattern, chúng ta sẽ có một lớp Factory chịu trách nhiệm tạo ra các đối tượng vận chuyển (như Trucks và Ships) thay vì tạo trực tiếp trong lớp ứng dụng. Với thiết kế này khi cần thêm 1 phương tiện vận chuyển mới (ví dụ máy bay), bạn chỉ cần:

    - Tạo 1 lớp mới kế thừa class cha của phương tiện
    - Cập nhật vào Factory để hỗ trợ loại phương tiện mới
5. Vậy sử dụng Factory Pattern khi nào ?

   Factory Pattern được sử dụng khi:

    - Chúng ta có một super class với nhiều class con và dựa trên đầu vào, chúng ta cần trả về một class con. Mô hình này giúp chúng ta đưa trách nhiệm của việc khởi tạo một lớp từ phía người dùng (client) sang lớp Factory.
    - Chúng ta không biết sau này sẽ cần đến những lớp con nào nữa. Khi cần mở rộng, hãy tạo ra sub class và implement thêm vào factory method cho việc khởi tạo sub class này.
6. Ưu điểm và nhược điềm

   Ưu điểm:

    - **Tránh liên kết chặt chẽ giữa creator và sản phẩm cụ thể**: Việc sử dụng Factory Pattern làm giảm sự phụ thuộc giữa code tạo các đối tượng và code sử dụng các đối tượng đó.
    - **Tuân thủ Single Responsibility Principle**: Việc tập trung code tạo các đối tượng vào một nơi làm cho code trở nên dễ bảo trì hơn.
    - **Tuân thủ Open/Closed Principle**: Bạn có thể thêm các loại sản phẩm mới vào ứng dụng mà không cần phải sửa đổi code hiện có.

   Nhược điểm:

    - **Phức tạp hóa code**: Việc triển khai mẫu thiết kế này yêu cầu thêm nhiều lớp con, làm cho code trở nên phức tạp hơn.
    - **Phù hợp nhất khi áp dụng vào một hệ thống các lớp tạo đối tượng hiện có**: Trong trường hợp bạn đang áp dụng mẫu thiết kế này vào một hệ thống đã có sẵn, việc triển khai sẽ trở nên dễ dàng hơn.
7. Triển khai

   Khởi tạo class `Transport`

    ```jsx
    module.exports = class Transport {
      deliver() {}
    };
    ```

   Tiếp theo khởi tạo 2 class con của Transport là `Ship` và `Truck`

    ```jsx
    const Transport = require("./Transport");
    
    module.exports = class Ship extends Transport {
      deliver() {
        super.deliver();
        console.log("Đang vân chuyển bằng tàu thủy!!");
      }
    };
    
    ```

    ```jsx
    const Transport = require("./Transport");
    
    module.exports = class Truck extends Transport {
      deliver() {
        super.deliver();
        console.log("Đang vận chuyển bằng xe tải!!!");
      }
    };
    
    ```

   Tiếp theo Khởi tạo Base class Factory ở đây là `Logistics`

    ```jsx
    module.exports = class Logistics {
      createTransport() {
        throw new Error("Method 'createTransport()' must be implemented.");
      }
    };
    
    ```

   Tiếp tục tạo thêm 2 class Factory khác là `SeaLogistics` và `RoadLogistics`  Mục đích để nếu sau này hệ thống có phát triển chúng ta chỉ cần thêm vào ví dụ như `Train` thì chỉ cần thêm vào `RoadLogistics` hay thêm loại `Cano` chúng ta sẽ thêm vào class SeaLogistics.

   RoadLogistics:

    ```jsx
    const Logistics = require("./Logistics");
    const Truck = require("../Truck");
    
    module.exports = class RoadLogistics extends Logistics {
      createTransport(string) {
        switch (string) {
          case "Truck":
            return new Truck();
          default:
            return new Error("Not match Transport");
        }
      }
    };
    ```

   SeaLogistics:

    ```jsx
    const Logistics = require("./Logistics");
    const Ship = require("../Ship");
    
    module.exports = class SeaLogistics extends Logistics {
      createTransport(string) {
        switch (string) {
          case "Ship":
            return new Ship();
          default:
            return new Error("Not match Transport");
        }
      }
    };
    
    ```
