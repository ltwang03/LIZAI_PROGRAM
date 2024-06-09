1. Concept

   `Elaticsearch` là một công cụ phân tích và tìm kiếm phân tán, mã nguồn mở được thiết kế để có khả năng mở rộng theo chiều ngang, tìm kiếm theo thời gian thực và tính sẵn sàng cao. Nó thuộc họ cơ sở dữ liệu `NoSQL` và được xây dựng dựa trên thư viện công cụ tìm kiếm Apache Lucene. `Elaticsearch` thường được sử dụng cho nhiều trường hợp sử dụng bao gồm phân tích dữ liệu nhật ký và sự kiện, tìm kiếm toàn văn bản, phân tích kinh doanh và giám sát ứng dụng.

   Về cốt lõi, `Elaticsearch` lưu trữ dữ liệu ở định dạng `JSON` không có lược đồ, làm cho nó rất linh hoạt và có khả năng thích ứng với các mô hình và cấu trúc dữ liệu khác nhau. Nó sử dụng API `RESTful` phân tán để tương tác với dữ liệu, cho phép các nhà phát triển thực hiện các tìm kiếm, tổng hợp và phân tích phức tạp trên các tập dữ liệu lớn một cách dễ dàng.

   ![Untitled](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFddzph3lvXabeD5KX5zqn95cmv1IkX7CNJA&s)

2. Key Features of Elasticsearch
   1. **Distributed and Scalable**
      - Elaticsearch được thiết kế để hoạt động trong môi trường phân tán, cho phép nó mở rộng quy mô theo chiều ngang trên nhiều nút một cách liền mạch.
      - Khi khối lượng dữ liệu tăng lên, các nút mới có thể được thêm vào cụm Elaticsearch để xử lý các yêu cầu lưu trữ và khối lượng công việc tăng lên.
   2. **Real-time Search and Analytics**
      - Elaticsearch cung cấp khả năng tìm kiếm gần như thời gian thực, cho phép người dùng truy vấn và phân tích dữ liệu khi dữ liệu được đưa vào hệ thống.
      - Khía cạnh thời gian thực này rất quan trọng đối với các ứng dụng yêu cầu thông tin chi tiết và phân tích cập nhật về các bộ dữ liệu thay đổi nhanh chóng.
   3. **Full-text Search**
      - Elasticsearch vượt trội trong khả năng tìm kiếm toàn văn, cho phép người dùng thực hiện các tìm kiếm phức tạp trên khối lượng lớn dữ liệu văn bản.
      - Nó hỗ trợ DSL (Domain Specific Language) mạnh mẽ cho phép người dùng xây dựng các truy vấn tìm kiếm tinh vi bao gồm fuzzy matching, wildcard searches và proximity searches.
   4. **Schema-less JSON Documents**
      - Dữ liệu trong Elasticsearch được lưu trữ dưới dạng tài liệu JSON, về bản chất là không có lược đồ (schema-less).
      - Điều này có nghĩa là bạn không cần phải xác định một lược đồ cứng nhắc trước, giúp Elasticsearch linh hoạt và thích ứng với những thay đổi trong cấu trúc dữ liệu theo thời gian.
   5. **High Availability and Fault Tolerance**
      - Elasticsearch cung cấp các tính năng tích hợp để sao chép dữ liệu và khả năng chịu lỗi (fault tolerance) để đảm bảo tính khả dụng cao của dữ liệu.
      - Bằng cách phân phối dữ liệu trên nhiều node và duy trì các bản sao, Elasticsearch có thể tiếp tục hoạt động ngay cả khi xảy ra lỗi node hoặc phân vùng mạng.
   6. **RESTful API**
      - Elasticsearch cung cấp một RESTful API cho phép người dùng tương tác với hệ thống bằng các phương thức HTTP tiêu chuẩn (GET, POST, PUT, DELETE).
      - API này trực quan và dễ sử dụng, giúp các nhà phát triển từ nhiều nền tảng lập trình khác nhau dễ dàng tiếp cận.
   7. **Rich Query and Aggregation Capabilities**
      - Elasticsearch cung cấp một loạt các khả năng truy vấn và tổng hợp, cho phép người dùng thực hiện phân tích và trực quan hóa dữ liệu phức tạp.
      - Aggregations cho phép người dùng tóm tắt và rút ra thông tin chi tiết từ các bộ dữ liệu lớn bằng các số liệu, biểu đồ và các hoạt động bucketing.
3. **Log Management and Analysis**
   1. **Centralized Logging**

      Trong môi trường DevOps, nhiều dịch vụ vi mô (microservices), containers và thành phần cơ sở hạ tầng tạo ra một lượng lớn dữ liệu nhật ký. Elasticsearch đóng vai trò như một kho lưu trữ nhật ký tập trung, thu thập nhật ký từ các nguồn khác nhau và giúp chúng dễ dàng truy cập để phân tích và xử lý sự cố.

   2. **Real-time Monitoring**

      Elasticsearch cho phép các nhóm DevOps giám sát tình trạng hệ thống và các số liệu hiệu suất theo thời gian thực. Bằng cách lập chỉ mục và phân tích dữ liệu nhật ký, Elasticsearch giúp các nhóm phát hiện ra các bất thường, xác định các điểm nghẽn hiệu suất và phản hồi nhanh chóng các vấn đề.

   3. **Alerting and Notification**

      Elasticsearch tích hợp với các cơ chế cảnh báo để thông báo cho các nhóm DevOps về các sự kiện quan trọng và bất thường trong hệ thống. Bằng cách thiết lập các cảnh báo tùy chỉnh dựa trên các ngưỡng được xác định trước, các nhóm có thể chủ động giải quyết các vấn đề trước khi chúng ảnh hưởng đến người dùng hoặc hoạt động kinh doanh.
4. **Key Concepts of Elasticsearch Cluster**
   1. **Node**
      - Một `node` là một phiên bản đơn lẻ của `Elasticsearch` chạy trên một máy. Mỗi node có một mục đích cụ thể trong cluster.
      - Các `node` có thể được cấu hình làm các node dữ liệu (`data node`) để lưu trữ và lập chỉ mục dữ liệu, các node điều phối (coordinating node) để xử lý các yêu cầu của client và phân phối các tác vụ, hoặc các node đủ điều kiện làm `master` (master-eligible node) để quản lý trạng thái của `cluster`.
   2. **Cluster**
      - Một `cluster` là một tập hợp gồm một hoặc nhiều node chia sẻ cùng tên `cluster` và làm việc cùng nhau để lưu trữ và lập chỉ mục dữ liệu.
      - Tất cả các `node` trong một cluster giao tiếp với nhau để duy trì trạng thái `cluster`, điều phối các hoạt động và phân phối dữ liệu trên toàn `cluster`.
   3. **Index**
      - Một `index` là một không gian tên logic đại diện cho một tập hợp các `document` có các đặc điểm tương tự.
      - Dữ liệu trong `Elasticsearch` được lưu trữ và lập chỉ mục ở cấp độ `index`, cho phép truy vấn và truy xuất các `document` một cách hiệu quả.
   4. **Shard**
      - Một `shard` là một đơn vị lưu trữ dữ liệu duy nhất trong một `index`. `Elasticsearch` chia các index thành nhiều shard để phân phối dữ liệu trên các node và cho phép xử lý truy vấn song song.
      - Mỗi shard có thể được sao chép để đảm bảo tính khả dụng cao và khả năng chịu lỗi.
   5. **Replication**
      - `Replication` là quá trình tạo và duy trì các bản sao của các shard index trên nhiều node.
      - Các `shard` được sao chép đóng vai trò là bản sao lưu trong trường hợp lỗi `node` và đảm bảo tính sẵn sàng và độ bền của dữ liệu.
   6. **Cluster State**
      - `Cluster state` là một kho lưu trữ siêu dữ liệu toàn cục chứa thông tin về cấu hình cluster, các index và phân bổ `shard`.
      - Các `node` trong `cluster` phối hợp để duy trì và cập nhật `cluster state` theo thời gian thực.
5. Data Modeling
   1. **Schema-less Nature**: Elasticsearch tuân theo cách tiếp cận không có schema, nghĩa là bạn không phải xác định trước cấu trúc cứng nhắc (schema) cho dữ liệu của mình, không giống như các cơ sở dữ liệu quan hệ truyền thống. Tính linh hoạt này cho phép bạn lưu trữ và lập chỉ mục các tài liệu với các cấu trúc khác nhau trong cùng một chỉ mục.
   2. **JSON Documents**: Trong Elasticsearch, dữ liệu được biểu thị dưới dạng tài liệu JSON. Mỗi tài liệu đại diện cho một thực thể hoặc bản ghi duy nhất và nó bao gồm các cặp giá trị trường. Các tài liệu này được lưu trữ trong các chỉ mục, hoạt động như các thùng chứa để tổ chức và quản lý các tài liệu liên quan.
   3. **Dynamic Mapping**: Khi bạn lập chỉ mục một tài liệu mà không chỉ định ánh xạ, Elasticsearch sẽ tự động tạo ánh xạ động dựa trên cấu trúc của tài liệu. Nó phân tích các trường và tự động gán các kiểu dữ liệu cho chúng. Mặc dù ánh xạ động cung cấp sự thuận tiện, nhưng điều cần thiết là phải hiểu cách Elasticsearch suy ra ánh xạ để tránh các kết quả không mong muốn.
   4. **Explicit Mapping**: Mặc dù ánh xạ động rất tiện lợi, nhưng thường có lợi khi xác định ánh xạ rõ ràng cho các chỉ mục của bạn. Ánh xạ rõ ràng cho phép bạn kiểm soát cách các trường được lập chỉ mục và phân tích, điều này có thể cải thiện mức độ phù hợp và hiệu suất tìm kiếm. Với ánh xạ rõ ràng, bạn có thể xác định các kiểu dữ liệu, cài đặt chỉ mục và trình phân tích tùy chỉnh cho từng trường.
   5. **Mapping Types and Properties**: Trong các phiên bản trước của Elasticsearch, các tài liệu trong một chỉ mục được tổ chức thành các loại ánh xạ. Tuy nhiên, bắt đầu từ Elasticsearch 7.x, các loại ánh xạ không được chấp nhận và các chỉ mục chỉ có thể chứa một loại ánh xạ duy nhất. Mỗi loại ánh xạ bao gồm các thuộc tính xác định đặc điểm của các trường trong tài liệu.
   6. **Field Data Types**: Elasticsearch hỗ trợ nhiều kiểu dữ liệu trường khác nhau, bao gồm:
      - **Text**
      - **Keyword**
      - **Numeric**
      - **Date**
      - **Object**
      - **Array**
   7. **Nested Documents**: Elasticsearch cho phép bạn lập chỉ mục các tài liệu lồng nhau trong một tài liệu mẹ. Tính năng này hữu ích để biểu diễn các cấu trúc dữ liệu phân cấp hoặc các mảng đối tượng.
   8. **Mapping Dynamic Templates**: Các mẫu động cho phép bạn xác định các mẫu khớp với tên trường và áp dụng các ánh xạ cụ thể cho các trường đó một cách linh hoạt. Điều này hữu ích khi xử lý các trường động hoặc các trường có kiểu dữ liệu khác nhau.
   9. **Index Settings**: Cài đặt chỉ mục xác định hành vi và đặc điểm của chỉ mục. Các cài đặt này bao gồm số lượng phân đoạn, bản sao, cấu hình trình phân tích, v.v.
6. Mapping types and properties
   1. **Mapping Type**

      Trong các phiên bản Elasticsearch trước đó (trước 7.x), các tài liệu trong một chỉ mục được tổ chức thành các loại ánh xạ (mapping types). Mapping types cho phép bạn xác định các lược đồ (schemas) khác nhau cho các tài liệu trong cùng một chỉ mục. Ví dụ, trong một chỉ mục đại diện cho "product", bạn có thể có các mapping types cho "laptop", "điện thoại thông minh" và "tablets", mỗi loại có bộ trường và thuộc tính riêng.

      Tuy nhiên, bắt đầu từ Elasticsearch 7.x, mapping types đã bị phản đối (deprecated). Điều này có nghĩa là các chỉ mục chỉ có thể chứa một mapping type duy nhất và tất cả các tài liệu trong chỉ mục đó chia sẻ cùng một cấu trúc ánh xạ.

   2. **Properties:**

      Properties xác định đặc điểm và hành vi của các trường trong một document. Mỗi trường trong một document được liên kết với một tập hợp các properties xác định cách trường được lập chỉ mục, phân tích và truy vấn. Dưới đây là một số properties thường được sử dụng trong ánh xạ Elasticsearch:

      - **Type**: Xác định kiểu dữ liệu của trường (ví dụ: text, keyword, integer, date).
      - **Indexing Options**: Xác định cách trường được lập chỉ mục. Các tùy chọn bao gồm "analyzed" (cho tìm kiếm toàn văn bản), "not_analyzed" (cho khớp chính xác) và "no" (trường không được lập chỉ mục).
      - **Analyzer**: Chỉ định trình phân tích được sử dụng để mã hóa và phân tích các trường văn bản trong quá trình lập chỉ mục và tìm kiếm.
      - **Searchable**: Cho biết liệu trường có thể tìm kiếm được hay không (mặc định là true).
      - **Stored**: Xác định xem trường có được lưu trữ trong chỉ mục và có thể truy xuất được từ kết quả tìm kiếm hay không (mặc định là false).
      - **Multi-fields**: Cho phép bạn xác định nhiều đại diện của một trường, mỗi trường có các thuộc tính và trình phân tích riêng.
      - **Null Value**: Chỉ định giá trị mặc định cho trường nếu trường không có giá trị hoặc bị thiếu trong tài liệu.
      - **Format**: Đối với trường ngày, chỉ định định dạng ngày.

   3. Ví dụ về mapping:

      ```jsx
      {
        "mappings": {
          "properties": {
            "title": {
              "type": "text",
              "analyzer": "english",
              "fields": {
                "keyword": {
                  "type": "keyword"
                }
              }
            },
            "price": {
              "type": "double"
            },
            "category": {
              "type": "keyword"
            },
            "description": {
              "type": "text",
              "index": false
            },
            "created_at": {
              "type": "date",
              "format": "yyyy-MM-dd HH:mm:ss"
            }
          }
        }
      }
      ```

      - **title**: Một trường văn bản được phân tích bằng trình phân tích tiếng Anh và một trường con từ khóa để khớp chính xác.
      - **price**: Một trường double để lưu trữ các giá trị số.
      - **category**: Một trường từ khóa để lưu trữ dữ liệu phân loại.
      - **description**: Một trường văn bản không được lập chỉ mục (chỉ lưu trữ).
      - **created_at**: Một trường ngày với một định dạng ngày cụ thể.
7. Createing indexes and defining mappings
   1. Creating Indexes

      Một index trong Elasticsearch tương tự như một cơ sở dữ liệu trong các cơ sở dữ liệu SQL truyền thống. Nó là một không gian tên logic trỏ đến một hoặc nhiều shard vật lý lưu trữ dữ liệu của bạn. Đây là cách bạn tạo một index:

      ```jsx
      PUT /my_index
      {
        "settings": {
          "number_of_shards": 3,
          "number_of_replicas": 2
        }
      }
      ```

      - PUT /my_index: Đây là điểm cuối API để tạo một index có tên là "my_index".
      - "settings": Phần này cho phép bạn chỉ định các cài đặt cho chỉ mục.
      - "number_of_shards": Xác định số lượng shard chính mà chỉ mục nên có. Nhiều shard hơn sẽ phân phối dữ liệu trên cluster để có khả năng mở rộng và xử lý song song tốt hơn.
      - "number_of_replicas": Cho biết số lượng shard bản sao cho mỗi shard chính. Các shard bản sao cung cấp khả năng chịu lỗi và cải thiện hiệu suất tìm kiếm bằng cách phân phối tải tìm kiếm.

   2. Defining Mappings

      Mappings trong Elasticsearch xác định lược đồ (schema) cho các tài liệu của bạn trong một chỉ mục. Chúng chỉ định các kiểu dữ liệu, thuộc tính và hành vi của mỗi trường trong tài liệu của bạn. Đây là cách bạn xác định các ánh xạ trong khi tạo index:

      ```jsx
      PUT /my_index
      {
        "mappings": {
          "properties": {
            "title": {
              "type": "text",
              "analyzer": "english"
            },
            "description": {
              "type": "text"
            },
            "price": {
              "type": "double"
            },
            "tags": {
              "type": "keyword"
            },
            "created_at": {
              "type": "date"
            }
          }
        }
      }
      ```

      "`mappings`": Phần này chỉ định các ánh xạ cho các trường trong tài liệu của bạn.

      "`properties`": Xác định các thuộc tính cho mỗi trường.

      "`type`": Chỉ định kiểu dữ liệu của trường (ví dụ: text, keyword, double, date).

      "`analyzer`": Chỉ định trình phân tích được sử dụng cho các trường văn bản trong quá trình lập chỉ mục và tìm kiếm. Nó xác định cách văn bản được mã hóa và xử lý.

      "`created_at`": Một trường ngày mà không có định dạng cụ thể nào. Elasticsearch sẽ sử dụng logic phân tích cú pháp ngày mặc định của nó.

   3. Update Mappings

      Mappings có thể được cập nhật sau khi tạo chỉ mục, nhưng một số thay đổi không được phép đối với các trường hiện có (ví dụ: thay đổi kiểu dữ liệu của một trường). Tuy nhiên, bạn có thể thêm các trường mới hoặc sửa đổi cài đặt như trình phân tích và định dạng.

      ```jsx
      PUT /my_index/_mapping
      {
        "properties": {
          "views": {
            "type": "integer"
          }
        }
      }
      ```

      Việc tạo các index và xác định Mapping là các bước quan trọng trong việc thiết lập kho lưu trữ dữ liệu Elasticsearch của bạn. Việc xác định Mapping đúng cách đảm bảo rằng Elasticsearch hiểu cấu trúc dữ liệu của bạn và có thể lập index và tìm kiếm nó một cách hiệu quả.
8. **Introduction to indexing and CRUD operations**

   Các thao tác này là cần thiết để tương tác hiệu quả với dữ liệu của bạn. Chúng cho phép bạn lưu trữ, truy xuất, cập nhật và xóa các tài liệu trong `cluster` `Elasticsearch` của bạn. Hãy cùng tìm hiểu chi tiết về từng thao tác này:

   1. **Indexing Documents**

      Indexing là quá trình thêm các document vào một index trong Elasticsearch. Mỗi document là một đối tượng `JSON` chứa các trường dữ liệu và các giá trị tương ứng của chúng. Khi bạn lập index một `document`, `Elasticsearch` sẽ lưu trữ nó trong một hoặc nhiều shard dựa trên cấu hình của index.

      Để lập chỉ mục (index) một document, bạn sử dụng phương thức HTTP ‘PUT’ hoặc ‘POST’ cùng với tên index, loại document (không bắt buộc trong Elasticsearch 7.x trở lên) và một mã định danh duy nhất cho document (không bắt buộc). Đây là một ví dụ về việc lập index một document:

      ```jsx
      POST /my_index/_doc/1
      {
        "title": "Sample Document",
        "content": "This is a sample document for indexing in Elasticsearch."
      }
      ```

      - POST /my_index/\_doc/1: Lệnh này hướng dẫn Elasticsearch lập chỉ mục (index) document vào index "my_index" với mã định danh duy nhất là "1".
      - {"title": "Sample Document", "content": "..."}: Đây là tài liệu JSON được lập chỉ mục.

   2. **Retrieving Documents**

      Truy xuất các document cho phép bạn tìm kiếm và lấy các document cụ thể hoặc một tập hợp các document từ một index. Bạn có thể thực hiện nhiều loại tìm kiếm khác nhau, bao gồm tìm kiếm toàn văn bản, tìm kiếm dựa trên thuật ngữ, truy vấn phạm vi, v.v.

      Để truy xuất document, bạn sử dụng phương thức HTTP ‘GET’ cùng với tên index và ID của document. Đây là một ví dụ về việc truy xuất một document theo ID:

      ```jsx
      GET / my_index / _doc / 1;
      ```

      Yêu cầu này sẽ tìm nạp document có ID "1" từ index "my_index".

   3. **Updating Documents**

      Cập nhật document cho phép bạn sửa đổi các document hiện có trong index mà không cần lập chỉ mục lại toàn bộ document. Bạn có thể cập nhật các trường cụ thể hoặc thay thế toàn bộ document bằng một trường mới.

      Để cập nhật một document, bạn sử dụng phương thức HTTP ‘`POST`’ hoặc ‘`PUT`’ cùng với tên index, loại document (tùy chọn) và ID của document. Đây là một ví dụ về việc cập nhật một document:

      ```jsx
      PUT /
        my_index /
        _doc /
        1 /
        {
          doc: {
            content: 'Updated content for the sample document.',
          },
        };
      ```

      Trong ví dụ này, chúng ta đang cập nhật trường "content" của document có ID "1" trong index "my_index".

   4. Delete Documents

      Xóa documents cho phép bạn loại bỏ các document cụ thể khỏi một index. Khi đã bị xóa, các document sẽ không còn khả dụng để tìm kiếm hoặc truy xuất.

      Để xóa một document, bạn sử dụng phương thức HTTP ‘DELETE’ cùng với tên index, loại document (tùy chọn) và ID của document. Đây là một ví dụ về việc xóa một document:

      ```jsx
      DELETE / my_index / _doc / 1;
      ```

      Yêu cầu này sẽ xóa document có ID "1" khỏi index "my_index".

9. Basic search concept

   Các khái niệm tìm kiếm cơ bản trong Elasticsearch là nền tảng của chức năng tìm kiếm của nó, cho phép người dùng truy xuất hiệu quả dữ liệu liên quan từ các chỉ mục của họ. Dưới đây là tổng quan chi tiết:

   1. Indexing

      là quá trình lưu trữ dữ liệu của bạn trong `Elasticsearch` dưới dạng có cấu trúc. `Elasticsearch` tổ chức dữ liệu thành các `index`, là các tập hợp logic của các `document` có chung các đặc điểm tương tự. Mỗi `document` đại diện cho một thực thể dữ liệu duy nhất và được lưu trữ ở định dạng `JSON`.

      - `Index`: `Index` giống như một cơ sở dữ liệu trong các cơ sở dữ liệu quan hệ truyền thống. Nó là một tập hợp các `document` có các đặc điểm tương đối giống nhau.
      - `Document`: `Document` là một đơn vị thông tin cơ bản có thể được lập chỉ mục. Nó được biểu diễn ở định dạng `JSON` và chứa các trường dữ liệu với các giá trị tương ứng.

      Ví dụ: nếu bạn đang lập chỉ mục các tài liệu liên quan đến sách, mỗi `document` có thể chứa các trường như tiêu đề, tác giả, năm xuất bản và mô tả.

   2. Querying

      Khi dữ liệu của bạn đã được lập chỉ mục, bạn có thể thực hiện các tìm kiếm để truy xuất các document cụ thể hoặc tổng hợp dữ liệu dựa trên các tiêu chí nhất định. Elasticsearch cung cấp một Query DSL (Ngôn ngữ miền cụ thể) mạnh mẽ để xây dựng các truy vấn.

      - Query DSL: Query DSL của Elasticsearch là một ngôn ngữ dựa trên JSON được sử dụng để xác định các truy vấn. Nó cung cấp một loạt các loại truy vấn và tùy chọn để lọc, tổng hợp và sắp xếp dữ liệu.

   3. Searching

      Tìm kiếm trong `Elasticsearch` liên quan đến việc truy xuất các `document` khớp với các tiêu chí hoặc điều kiện cụ thể. `Elasticsearch` hỗ trợ nhiều loại tìm kiếm khác nhau, bao gồm:

      - **Match Query:** Tìm kiếm các `document` chứa một hoặc nhiều term được chỉ định.
      - **Term Query:** Tìm kiếm các `document` chứa một term chính xác trong một trường được chỉ định.
      - **Range Query:** Tìm kiếm các `document` với các trường có chứa các giá trị nằm trong một phạm vi được chỉ định.
      - **Bool Query:** Cho phép kết hợp nhiều truy vấn bằng cách sử dụng `logic` `boolean` (AND, OR, NOT).

   4. Aggregations

      Aggregation trong Elasticsearch cho phép bạn thực hiện phân tích dữ liệu của mình và rút ra thông tin chi tiết. Tổng hợp có thể được sử dụng để tính toán các chỉ số, tạo biểu đồ và hơn thế nữa.

      - **Terms Aggregation:** Nhóm các document dựa trên giá trị của một trường được chỉ định.
      - **Histogram Aggregation:** Chia dữ liệu số thành các khoảng (bucket) có kích thước cố định hoặc thay đổi và cung cấp số lượng cho mỗi khoảng.
      - **Date Histogram Aggregation:** Tương tự như tổng hợp histogram nhưng được sử dụng đặc biệt cho các trường ngày tháng.

   5. **Query DSL (Domain Specific Language) fundamentals**
      1. Query Types: Elasticsearch hỗ trợ nhiều loại truy vấn khác nhau có thể được sử dụng riêng lẻ hoặc kết hợp để tạo ra các tiêu chí tìm kiếm phức tạp. Một số loại truy vấn phổ biến bao gồm:

         - **Match Query:** Tìm kiếm các tài liệu chứa một hoặc nhiều term được chỉ định. Nó phân tích văn bản đầu vào và thực hiện tìm kiếm toàn văn bản.

         ```jsx
         {
           "query": {
             "match": {
               "title": "elasticsearch"
             }
           }
         }
         ```

         - **Term Query:** Tìm kiếm các tài liệu chứa một term chính xác trong một trường được chỉ định. Không giống như truy vấn match, nó không phân tích văn bản đầu vào.

         ```jsx
         {
           "query": {
             "term": {
               "status": "published"
             }
           }
         }
         ```

         - **Range Query:** Tìm kiếm các tài liệu có các trường chứa các giá trị nằm trong một phạm vi được chỉ định.

         ```jsx
         {
           "query": {
             "range": {
               "price": {
                 "gte": 100,
                 "lte": 500
               }
             }
           }
         }
         ```

         - **Bool Query:** Cho phép kết hợp nhiều truy vấn bằng cách sử dụng logic boolean (AND, OR, NOT).

         ```jsx
         {
           "query": {
             "bool": {
               "must": [
                 { "match": { "title": "elasticsearch" }},
                 { "match": { "author": "John Doe" }}
               ]
             }
           }
         }
         ```

      2. Filters: Bộ lọc được sử dụng để thu hẹp kết quả tìm kiếm dựa trên các tiêu chí cụ thể. Không giống như truy vấn, bộ lọc không ảnh hưởng đến điểm liên quan của tài liệu.

         - **Term Filter:** Lọc các tài liệu chứa một term chính xác trong một trường được chỉ định.
         - **Range Filter:** Lọc các tài liệu có các trường chứa các giá trị nằm trong một phạm vi được chỉ định.
         - **Bool Filter:** Cho phép kết hợp nhiều bộ lọc bằng cách sử dụng logic boolean.

         Bộ lọc thường được sử dụng cho các kết quả khớp chính xác, phạm vi ngày tháng và các tiêu chí khác không yêu cầu tính điểm liên quan.
