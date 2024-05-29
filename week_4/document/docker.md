1. Overview

   Chế độ Swarm là một tính năng nâng cao để quản lý một cụm daemon Docker.

   Sử dụng chế độ Swarm nếu bạn định sử dụng Swarm làm môi trường thời gian chạy sản xuất.

   Nếu bạn không có ý định triển khai với Swarm, hãy sử dụng Docker Compose thay thế. Nếu bạn đang phát triển để triển khai Kubernetes, hãy cân nhắc sử dụng tính năng Kubernetes tích hợp trong Docker Desktop.

   Các phiên bản hiện tại của Docker bao gồm chế độ Swarm để quản lý nguyên bản một cụm Công cụ Docker được gọi là swarm. Sử dụng Docker CLI để tạo một swarm, triển khai các dịch vụ ứng dụng cho một swarm và quản lý hành vi của swarm.

   Chế độ Docker Swarm được tích hợp vào Docker Engine. Đừng nhầm lẫn chế độ Docker Swarm với Docker Classic Swarm không còn được phát triển tích cực nữa.

2. Một vài tính năng
    1. Cluster management integrated with Docker Engine

       Sử dụng Docker Engine CLI để tạo một nhóm Docker Engine nơi bạn có thể triển khai các dịch vụ ứng dụng. Bạn không cần phần mềm điều phối bổ sung để tạo hoặc quản lý swarm.

    2. Decentralized design

       Thay vì xử lý sự khác biệt giữa các vai trò node tại thời điểm triển khai, Docker Engine xử lý mọi chuyên môn hóa trong thời gian chạy. Bạn có thể triển khai cả hai loại node, manage và worker bằng cách sử dụng Docker Engine. Điều này có nghĩa là bạn có thể xây dựng toàn bộ đàn từ một disk image  duy nhất.

    3. Declarative service model

       Docker Engine sử dụng phương thức khai báo để cho phép bạn define trạng thái mong muốn của các dịch vụ khác nhau trong stack ứng dụng của bạn

    4. Scaling

       với mỗi service có thể khai báo số lượng task mà ta muốn chạy, Scale up, down replicas của 1 service một cách dễ dàng

    5. Desired state reconciliation

       Swarm đảm bảo 1 service hoạt động ổn định bằng cách tự động thay 1 replicas crash bằng 1 replicas mới cho các worker đang run

    6. Multi-host networking

       Swarm manager có thể tự động gán IP cho mỗi service khi nó khởi tạo và cập nhật application.

    7. Service discovery

       Swarm manager node gán mỗi service trong swarm một DNS server riêng. Do đó bạn có thể truy xuất thông qua DNS này

    8. Load balancing

       Có thể expose các port cho các services tới load balance. tích hợp cân bằng tải sử dụng thuật toán thuật toán Round-robin

    9. Secure by default

       Các service giao tiếp với nhau sử dụng giao thức bảo mật TLS

    10. Rolling updates

        Swarm giúp update image của service một cách hoàn toàn tự động. Swarm manager giúp bạn kiểm soát độ trễ giữa service deploy tới các node khác nhau và bạn có thể rolling back bất cứ lúc nào.

3. Structure Docker Swarm

   ![Untitled](https://docs.docker.com/engine/swarm/images/swarm-diagram.webp)

   Kiến trúc Swarm bao gồm một tập hợp các node có ít nhất một nút chính (Manager-Leader) và một số node worker có thể là máy ảo hoặc vật lý.

    - Swarm: là một cluster của một node trong chế độ Swarm, thay vì phải chạy các container bằng câu lệnh thì ta sẽ thiết lập các services để phân bổ các bản replicas tới các node.
    - Manager Node: Là node nhận các define service từ user, quản lý theo dõi các service và tác vụ đang chạy trong Swarm, điều phối và chỉ định các node worker làm việc
    - Worker Node: là một máy vật lý hay máy ảo chạy các tác vụ được chỉ định bới node manager
    - Task: là các Docker containers thực thi các lệnh bạn đã định nghĩa trong service. Tác vụ này sẽ do node Manager phân bổ xuống, và sau khi việc phân bổ này task không thể chuyển sang một worker khác. Nếu task thất bại, node Manager sẽ chỉ định một phiên bản mới của tác vụ đó cho một node có sẵn khác trong Swarm.
    - Service: Một service xác định image của container và số lượng các replicas (bản sao) mong muốn khởi chạy trong Swarm.
4. Create a Swarm

   Sau khi hoàn tất các bước thiết lập trong hướng dẫn, bạn đã sẵn sàng tạo một đàn. Đảm bảo daemon Docker Engine được khởi động trên máy chủ.

    - Mở một thiết bị đầu cuối và ssh vào máy nơi bạn muốn chạy nút quản lý của mình. Hướng dẫn này sử dụng máy có tên manager1.
    - Chạy lệnh sau để tạo một swarm mới.

        ```docker
        docker swarm init --advertise-addr <MANAGER-IP>
        ```

    - Chạy `docker info` để xem trạng thái hiện tại của swarm

        ```docker
        Swarm: active
          NodeID: w6t2zbc4puewhuta67yznf7my
          Is Manager: true
          Managers: 1
          Nodes: 1
          ...snip...
        ```

    - Chạy lệnh `docker node ls` để xem thông tin về các node

        ```docker
        ID                           HOSTNAME  STATUS  AVAILABILITY  MANAGER STATUS
        w6t2zbc4puewhuta67yznf7my *  manager1  Ready   Active        Leader
        ```

      Dấu * bên cạnh ID nút cho biết bạn hiện đang kết nối trên node này.

5. Add nodes to the swarm

   Khi bạn đã tạo một swarm bằng manager node, bạn đã sẵn sàng thêm các node worker.

   Mở một thiết bị đầu cuối và ssh vào máy nơi bạn muốn chạy node worker. Hướng dẫn này sử dụng tên worker1.

   Chạy lệnh được tạo bởi `docker swarm init` từ bước hướng dẫn Tạo một swarm để tạo một node worker được nối với worker hiện có:

    ```docker
    docker swarm join --token SWMTKN-1-32ricsnjcjq4l4uxemytrf7q277jx95uxrm0oq9pn83y6crtlt-58v2ahvsg4lmfumvz5qke9558 192.168.56.15:2377
    ```

   Mở server manager và kiểm tra bằng `docker node ls`:

   ![Untitled](https://scontent.fsgn2-3.fna.fbcdn.net/v/t1.15752-9/441081848_1184156856331520_6552782379347792411_n.png?_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_ohc=Mi0WH4tevW0Q7kNvgEs8QBX&_nc_ht=scontent.fsgn2-3.fna&oh=03_Q7cD1QGGwsgrc8vNTwFNzGXWnM4az1gIbLA0iXcS0ZywpdywYw&oe=667ED124)

6. Deploy a service

   Sau khi tạo một swarm, bạn có thể triển khai một dịch vụ cho swarm đó. Đối với hướng dẫn này, bạn cũng đã thêm các nút worker nhưng đó không phải là yêu cầu bắt buộc để triển khai dịch vụ.

   Chạy command:

    ```docker
     docker service create --replicas 1 --name helloworld alpine ping docker.com
    ```

   Lệnh `docker service create` sẽ tạo dịch vụ.
   Cờ --name đặt tên cho dịch vụ helloworld.
   Cờ --replicas chỉ định trạng thái mong muốn của 1 phiên bản đang chạy.
   Các đối số Alpine ping [docker.com](http://docker.com/) xác định dịch vụ là một bộ chứa Alpine Linux thực thi lệnh ping [docker.com](http://docker.com/).

7. Inspect a service on the swarm

   Khi bạn đã triển khai một dịch vụ cho swarm của mình, bạn có thể sử dụng Docker CLI để xem chi tiết về dịch vụ đang chạy trong swarm.

   Chạy `docker service inspect --pretty <SERVICE-ID>` để hiển thị chi tiết về dịch vụ ở định dạng dễ đọc.

   ![Screenshot 2024-05-30 at 00.20.09.png](https://scontent.fsgn2-4.fna.fbcdn.net/v/t1.15752-9/436748498_1490418295228423_3555161172081436346_n.png?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=X9UHT2USZhMQ7kNvgG2Agzg&_nc_ht=scontent.fsgn2-4.fna&oh=03_Q7cD1QFfN8Q6uJwjC7zIsN2YWCOVTkYKAMhFyygY7Ejq44V91A&oe=667EE5BE)

   Chạy `docker service ps <SERVICE-ID>` để xem nút nào đang chạy dịch vụ:

   ![Screenshot 2024-05-30 at 00.21.18.png](https://scontent.fsgn2-4.fna.fbcdn.net/v/t1.15752-9/441639715_978340557270731_6439847171764785606_n.png?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=aMFyK5T-4vIQ7kNvgGkNclN&_nc_ht=scontent.fsgn2-4.fna&oh=03_Q7cD1QHnt9v0GzcKp6772NjmjzPW-tn7EBGnf8ToVfVhs0iK9Q&oe=667ED9A7)

8. Scale the service

   Sau khi triển khai một dịch vụ cho một swarm, bạn đã sẵn sàng sử dụng Docker CLI để mở rộng số lượng vùng chứa trong dịch vụ. Các container chạy trong một dịch vụ được gọi là các tác vụ.

   Chạy lệnh sau để thay đổi trạng thái mong muốn của dịch vụ đang chạy trong swarm:

    ```docker
     docker service scale <SERVICE-ID>=<NUMBER-OF-TASKS>
    ```

    ```docker
    docker service ps helloworld
    
    NAME                                    IMAGE   NODE      DESIRED STATE  CURRENT STATE
    helloworld.1.8p1vev3fq5zm0mi8g0as41w35  alpine  worker2   Running        Running 7 minutes
    helloworld.2.c7a7tcdq5s0uk3qr88mf8xco6  alpine  worker1   Running        Running 24 seconds
    helloworld.3.6crl09vdcalvtfehfh69ogfb1  alpine  worker1   Running        Running 24 seconds
    helloworld.4.auky6trawmdlcne8ad8phb0f1  alpine  manager1  Running        Running 24 seconds
    helloworld.5.ba19kca06l18zujfwxyc5lkyn  alpine  worker2   Running        Running 24 seconds
    ```

9. Delete the service

   Các bước còn lại trong hướng dẫn không sử dụng dịch vụ helloworld nên bây giờ bạn có thể xóa dịch vụ này khỏi swarm.

   Chạy `docker service rm helloworld` để xóa dịch vụ helloworld.

   Chạy docker service kiểm tra <SERVICE-ID> để xác minh rằng swarm manager đã xóa dịch vụ. CLI trả về thông báo không tìm thấy dịch vụ

    ```docker
    docker service inspect helloworld
    []
    Status: Error: no such service: helloworld, Code: 1
    ```

   Mặc dù dịch vụ không còn tồn tại nhưng các vùng chứa tác vụ sẽ mất vài giây để dọn dẹp. Bạn có thể sử dụng `docker ps` trên các nút để xác minh khi nào tác vụ đã bị xóa.

    ```docker
    docker ps
    
    CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS     NAMES
    db1651f50347        alpine:latest       "ping docker.com"        44 minutes ago      Up 46 seconds                 helloworld.5.9lkmos2beppihw95vdwxy1j3w
    43bf6e532a92        alpine:latest       "ping docker.com"        44 minutes ago      Up 46 seconds                 helloworld.3.a71i8rp6fua79ad43ycocl4t2
    5a0fb65d8fa7        alpine:latest       "ping docker.com"        44 minutes ago      Up 45 seconds                 helloworld.2.2jpgensh7d935qdc857pxulfr
    afb0ba67076f        alpine:latest       "ping docker.com"        44 minutes ago      Up 46 seconds                 helloworld.4.1c47o7tluz7drve4vkm2m5olx
    688172d3bfaa        alpine:latest       "ping docker.com"        45 minutes ago      Up About a minute             helloworld.1.74nbhb3fhud8jfrhigd7s29we
    
    docker ps
    CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS     NAMES
    ```

10. Apply rolling updates

    Ở bước trước của hướng dẫn, bạn đã điều chỉnh số lượng phiên bản của một dịch vụ. Trong phần hướng dẫn này, bạn triển khai một dịch vụ dựa trên thẻ vùng chứa Redis 3.0.6. Sau đó, bạn nâng cấp dịch vụ để sử dụng hình ảnh vùng chứa Redis 3.0.7 bằng cách sử dụng các bản cập nhật luân phiên.

    Triển khai thẻ Redis của bạn cho swarm và định cấu hình swarm với độ trễ cập nhật là 10 giây. Lưu ý rằng ví dụ sau hiển thị thẻ Redis cũ hơn:

    ```docker
    docker service create \
      --replicas 3 \
      --name redis \
      --update-delay 10s \
      redis:7.2.5
    
    0u6a4s31ybk7yw2wyvtikmu50
    ```

    Cờ `--update-delay` định cấu hình độ trễ thời gian giữa các lần cập nhật cho một tác vụ dịch vụ hoặc một nhóm tác vụ. Bạn có thể mô tả thời gian `T` là sự kết hợp của số giây `Ts`, phút `Tm` hoặc giờ `Th`. Vì vậy, 10 phút 30 giây biểu thị độ trễ 10 phút 30 giây.

    Theo mặc định, bộ lập lịch cập nhật 1 tác vụ mỗi lần. Bạn có thể chuyển cờ `--update-parallelism` để định cấu hình số lượng tác vụ dịch vụ tối đa mà bộ lập lịch cập nhật đồng thời.

    Kiểm tra dịch vụ redis:

    ```docker
    docker service inspect --pretty redis
    
    ID:             0u6a4s31ybk7yw2wyvtikmu50
    Name:           redis
    Service Mode:   Replicated
     Replicas:      3
    Placement:
     Strategy:	    Spread
    UpdateConfig:
     Parallelism:   1
     Delay:         10s
    ContainerSpec:
     Image:         redis:7.2.5
    Resources:
    Endpoint Mode:  vip
    ```

    Bây giờ bạn có thể cập nhật hình ảnh vùng chứa cho redis. Trình quản lý swarm áp dụng bản cập nhật cho các nút theo chính sách UpdateConfig

    ```docker
     docker service update --image redis:7.2 redis
    ```

    Bộ lập lịch áp dụng các bản cập nhật luân phiên như sau theo mặc định:

    Dừng nhiệm vụ đầu tiên.
    Lên lịch cập nhật cho tác vụ đã dừng.
    Bắt đầu vùng chứa cho tác vụ đã cập nhật.
    Nếu bản cập nhật cho một tác vụ trả về ĐANG CHẠY, hãy đợi khoảng thời gian trễ được chỉ định rồi bắt đầu tác vụ tiếp theo.
    Nếu bất kỳ lúc nào trong quá trình cập nhật, một tác vụ trả về THẤT BẠI, hãy tạm dừng cập nhật.

    Kiểm tra lại image đã được thay đổi hay chưa bằng `docker service inspect --pretty redis`

    ![Screenshot 2024-05-30 at 00.47.49.png](https://scontent.fsgn2-9.fna.fbcdn.net/v/t1.15752-9/442006961_1114728983157768_3438757904535311404_n.png?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=sFLme4WYmzAQ7kNvgHRBZvH&_nc_ht=scontent.fsgn2-9.fna&oh=03_Q7cD1QH1QnvmpHR-b3W_1X6UJdU4WbPLPG2_jVIIPx62L_fmbQ&oe=667EF86F)

11. Drain a node on the swarm

    Trong các bước trước của hướng dẫn, tất cả các nút đều đang chạy ở trạng thái sẵn sàng Hoạt động. swarm manager có thể phân công nhiệm vụ cho bất kỳ node Hoạt động nào, vì vậy cho đến nay tất cả các node đều có sẵn để nhận nhiệm vụ.

    Lưu ý:  Việc đặt nút thành Drain sẽ không xóa các vùng chứa độc lập khỏi nút đó, chẳng hạn như các vùng chứa được tạo bằng docker run, docker soạn thảo hoặc API Docker Engine. Trạng thái của nút, bao gồm cả Drain, chỉ ảnh hưởng đến khả năng lên lịch khối lượng công việc dịch vụ bầy đàn của nút đó.

    - Xác minh rằng tất cả các nút của bạn đều có sẵn

      ![Screenshot 2024-05-30 at 00.53.21.png](https://scontent.fsgn2-3.fna.fbcdn.net/v/t1.15752-9/441081848_1184156856331520_6552782379347792411_n.png?_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_ohc=Mi0WH4tevW0Q7kNvgEs8QBX&_nc_ht=scontent.fsgn2-3.fna&oh=03_Q7cD1QGGwsgrc8vNTwFNzGXWnM4az1gIbLA0iXcS0ZywpdywYw&oe=667ED124)

    - Chạy docker node update --availability Drain <NODE-ID> để thoát một nút có nhiệm vụ được giao cho nó

        ```docker
        docker node update --availability drain worker1
        
        worker1
        ```

    - Kiểm tra nút để kiểm tra tính khả dụng của nó

      ![Screenshot 2024-05-30 at 00.56.49.png](https://scontent.fsgn2-7.fna.fbcdn.net/v/t1.15752-9/436381215_1011146784049812_7484534435098408406_n.png?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=7WXXToMEp28Q7kNvgGRkRPM&_nc_ht=scontent.fsgn2-7.fna&oh=03_Q7cD1QGmnRPgVrwwcga281_sU7f_jEkxj87cHQWAD0xxT5qq2g&oe=667EE0F1)

      Chạy docker service ps redis để xem Swarm Manager cập nhật nhiệm vụ phân công cho dịch vụ redis như thế nào

      ![Screenshot 2024-05-30 at 01.05.11.png](https://scontent.fsgn2-6.fna.fbcdn.net/v/t1.15752-9/441454902_7249313298524738_4064645827898749719_n.png?_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=53yHrsauUMYQ7kNvgG61evl&_nc_ht=scontent.fsgn2-6.fna&oh=03_Q7cD1QEJukMg1FCtfqKEvvH83pSWHPB65ZW57gGFz2btp5pd_w&oe=667EE086)

      Chạy docker node update --availability active <NODE-ID> để đưa node về trạng thái hoạt động

        ```docker
        docker node update --availability active worker1
        
        worker1
        ```

    1. Use swarm node routing mesh

       Chế độ Docker Engine Swarm giúp dễ dàng xuất bản các cổng cho các dịch vụ để cung cấp chúng cho các tài nguyên bên ngoài swarm. Tất cả các node tham gia vào lưới định tuyến lối vào. Lưới định tuyến cho phép mỗi node trong nhóm chấp nhận kết nối trên các cổng được công bố cho bất kỳ dịch vụ nào đang chạy trong swarm, ngay cả khi không có tác vụ nào chạy trên node đó. Lưới định tuyến định tuyến tất cả các yêu cầu đến tới các cổng được xuất bản trên các node có sẵn tới container đang hoạt động.

       Để sử dụng ingress network trong swarm, bạn cần mở các cổng sau giữa các nút bầy đàn trước khi bật chế độ Swarm:

        1. Publish a port for a service

       Sử dụng cờ --publish để xuất bản một cổng khi bạn tạo một dịch vụ. target được sử dụng để chỉ định cổng bên trong container và được xuất bản được sử dụng để chỉ định cổng sẽ liên kết trên lưới định tuyến. Nếu bạn bỏ qua cổng đã xuất bản, một cổng được đánh số cao ngẫu nhiên sẽ được ràng buộc cho từng tác vụ dịch vụ. Bạn cần kiểm tra nhiệm vụ để xác định cổng.

        ```docker
        docker service create \
          --name <SERVICE-NAME> \
          --publish published=<PUBLISHED-PORT>,target=<CONTAINER-PORT> \
          <IMAGE>
        ```

       Dạng cũ hơn của cú pháp này là một chuỗi được phân tách bằng dấu hai chấm, trong đó cổng được xuất bản là cổng đầu tiên và cổng đích là cổng thứ hai, chẳng hạn như `-p 8080:80.` Cú pháp mới được ưa chuộng hơn vì nó dễ đọc hơn và linh hoạt hơn.

        <PUBLISHED-PORT> là cổng nơi swarm cung cấp dịch vụ. Nếu bạn bỏ qua nó, một cổng được đánh số cao ngẫu nhiên sẽ bị ràng buộc. <CONTAINER-PORT> là cổng nơi container lắng nghe. Tham số này là bắt buộc.

        ```docker
        docker service create \
          --name my-web \
          --publish published=8080,target=80 \
          --replicas 2 \
          nginx
        ```

       Khi bạn truy cập cổng 8080 trên bất kỳ node nào, Docker sẽ định tuyến yêu cầu của bạn đến container đang hoạt động. Trên các node swarm, cổng 8080 có thể không thực sự bị ràng buộc, nhưng lưới định tuyến biết cách định tuyến lưu lượng và ngăn chặn bất kỳ xung đột cổng nào xảy ra.

       ![Untitled](https://docs.docker.com/engine/swarm/images/ingress-routing-mesh.webp)

       Bạn có thể sử dụng dịch vụ docker kiểm tra để xem cổng được xuất bản của dịch vụ. Ví dụ:

        ```docker
        docker service inspect --format="{{json .Endpoint.Spec.Ports}}" my-web
        ```

        ```docker
        docker service inspect --format="{{json .Endpoint.Spec.Ports}}" my-web
        
        [{"Protocol":"tcp","TargetPort":80,"PublishedPort":8080,"PublishMode":"ingress"}]
        ```

    2. How node work

       Manage Node:

        - Các nút quản lý xử lý các tác vụ quản lý cụm:

          Duy trì trạng thái cụm
          Dịch vụ lên lịch trình
          Cung cấp điểm cuối API HTTP ở chế độ Swarm

        - Bằng cách sử dụng triển khai Raft, managers duy trì trạng thái nội bộ nhất quán của toàn bộ swarm và tất cả các dịch vụ chạy trên đó. Với mục đích thử nghiệm, bạn có thể chạy một swarm với một manage swarm. Nếu trình quản lý trong swarm, một trình quản lý không thành công thì các dịch vụ của bạn vẫn tiếp tục chạy nhưng bạn cần tạo một cụm mới để khôi phục.
        - Để tận dụng các tính năng chịu lỗi của chế độ Swarm, chúng tôi khuyên bạn nên triển khai số lượng node lẻ theo yêu cầu về tính sẵn sàng cao của tổ chức của bạn. Khi có nhiều manager, bạn có thể khôi phục sau sự cố của node manage mà không có thời gian ngừng hoạt động.

       Một swarm có ba node manage cho phép mất tối đa một người quản lý.

       Một swarm năm node manage có thể chấp nhận việc mất đồng thời tối đa hai node manage.

       Một số lẻ N node quản lý trong cụm cho phép mất tối đa (N-1)/2 node manage. Docker đề xuất tối đa bảy nút quản lý cho một swarm.

       Worker Node:

       Các node worker cũng là phiên bản của Docker Engine với mục đích duy nhất là thực thi các container. Các node worker không tham gia vào trạng thái phân tán Raft, đưa ra quyết định lập lịch hoặc phục vụ API HTTP chế độ swarm.

       Bạn có thể tạo một swarm gồm một node manage, nhưng bạn không thể có node worker mà không có ít nhất một node manage. Theo mặc định, tất cả node manage đều là worker. Trong một cụm node manage duy nhất, bạn có thể chạy các lệnh như `docker service create` và bộ lập lịch đặt tất cả các tác vụ trên công cụ cục bộ.

       Để ngăn bộ lập lịch đặt các tác vụ lên node manage trong một swarm nhiều node, hãy đặt tính khả dụng của node manage thành Drain. Bộ lập lịch sẽ dừng các tác vụ trên các node ở chế độ `Drain` một cách khéo léo và lên lịch các tác vụ trên node `active`. Bộ lập lịch không chỉ định nhiệm vụ mới cho các node có sẵn Drain.

       Bạn có thể thăng cấp node worker thành node manage bằng cách chạy `docker node promte`. Ví dụ: bạn có thể muốn promote node worker khi đưa node manage ngoại tuyến để bảo trì.
