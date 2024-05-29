# Puppeteer Library

# Concept

Puppeteer là thư viện Node.js cung cấp API cấp cao để kiểm soát Chrome/Chromium qua Giao thức DevTools. Puppeteer chạy ở chế độ headless theo mặc định, nhưng có thể được định cấu hình để chạy trong Chrome/Chromium đầy đủ ("headful").

1. 1 Vài tính năng đặc trưng
    - Tự động gửi biểu mẫu, kiểm tra giao diện người dùng, nhập liệu bằng bàn phím, v.v.
    - Tạo môi trường thử nghiệm tự động bằng cách sử dụng các tính năng trình duyệt và JavaScript mới nhất.
    - Ghi lại dấu vết dòng thời gian của trang web của bạn để giúp chẩn đoán các vấn đề về hiệu suất.
    - [Test Chrome Extensions](https://pptr.dev/guides/chrome-extensions).
    - Tạo ảnh chụp màn hình và tệp PDF của các trang.
    
    Thu thập dữ liệu SPA (Single-Page Application) và tạo nội dung được hiển thị trước (tức là "SSR" (Server-Side Rendering)).
    

# Cài đặt

Để sử dụng Puppeteer trong dự án của bạn, hãy chạy:

```jsx
npm i puppeteer
```

Khi bạn cài đặt Puppeteer, nó sẽ tự động tải xuống phiên bản Chrome for testing gần đây (~170 MB macOS, ~282 MB Linux, ~280 MB Windows) và tệp nhị phân `chrome-headless-shell`

Đối với mỗi bản phát hành sẽ có 2 package: 

- `puppeteer`
- `pepeteer-core`

`Puppeteer` là một sản phẩm dành cho tự động hóa trình duyệt. Khi được cài đặt, nó sẽ tải xuống một phiên bản Chrome, sau đó nó sẽ điều khiển bằng cách sử dụng `puppeteer`. Là sản phẩm dành cho người dùng cuối, `puppeteer` tự động hóa một số quy trình công việc bằng cách sử dụng các giá trị mặc định hợp lý có thể tùy chỉnh.

`puppeteer-core` là một thư viện giúp điều khiển mọi thứ hỗ trợ giao thức DevTools. Là một thư viện,`puppeteer-core` được điều khiển hoàn toàn thông qua giao diện lập trình của nó, nghĩa là không có giá trị mặc định nào được giả định và `puppeteer-core` sẽ không tải xuống Chrome khi được cài đặt.

Note: Bạn nên sử dụng `puppeteer-core` nếu bạn đang kết nối với trình duyệt từ xa hoặc tự mình quản lý trình duyệt. Nếu bạn đang tự quản lý trình duyệt, bạn sẽ cần phải gọi `puppeteer.launch` với một đường dẫn thực thi rõ ràng (hoặc `channel` nếu nó được cài đặt ở một vị trí tiêu chuẩn).

Khi sử dụng `puppeteer-core` hãy thay đổi phần import:

```jsx
import puppeteer from 'puppeteer-core';
```

# Core concept

Thông thường, chúng ta bắt đầu làm việc với Puppeteer bằng cách khởi chạy hoặc kết nối với trình duyệt.

1. Browser Managements
    1. Launching a Broswer

```jsx
import puppeteer from 'puppeteer';

const browser = await puppeteer.launch();

const page = await browser.newPage();

// ...
```

1. Closing a browser

Để đóng trình duyệt, bạn sử dụng phương thức `browser.close()`:

```jsx
await browser.close();
```

c. Browser contexts

 Nếu bạn cần tách biệt các tác vụ tự động hóa của mình, hãy sử dụng `BrowserContexts`. Cookie và bộ nhớ cục bộ không được chia sẻ giữa các bối cảnh trình duyệt. Ngoài ra, bạn có thể đóng tất cả các trang trong `context` bằng cách đóng `context`.

```jsx
const browser = await puppeteer.launch();

const context = await browser.createBrowserContext();

const page1 = await context.newPage();
const page2 = await context.newPage();

await context.close();
```

     d. Permission

Bạn cũng có thể định cấu hình quyền cho ngữ cảnh trình duyệt:

```jsx
const browser = await puppeteer.launch();
const context = browser.defaultBrowserContext();

await context.overridePermissions('https://html5demos.com', ['geolocation']);
```

1. Page Interactor

Puppeteer cho phép bạn tương tác với các trang theo nhiều cách khác nhau.

1. Locators

`Locators` là một API thử nghiệm mới kết hợp các chức năng chờ và hành động. Với các bước kiểm tra điều kiện tiên quyết bổ sung, tính năng này cho phép tự động thử lại các hành động không thành công, mang lại các tập lệnh tự động hóa đáng tin cậy hơn và ít sai sót hơn.

## **Use Case:**

- Chờ phần tử:

```jsx
await page.locator('button').wait();
```

- Chờ function

```jsx
await page
    .locator(() => {
      const observer = new MutationObserver((records) => {
        for (const record of records) {
          if (record.target instanceof HTMLCanvasElement) {
            resolve(record.target);
          }
        }
      });
      observer.observe(document);
      return promise;
    })
    .wait()
```

- Click Element

```jsx
await page.locator('button').click();
```

> Đảm bảo phần tử nằm trong khung nhìn.
Đợi phần tử hiển thị hoặc ẩn.
Chờ phần tử được kích hoạt.
Chờ phần tử có hộp giới hạn ổn định trên hai khung hình động liên tiếp.
> 

- Nhấp vào một phần tử phù hợp với tiêu chí

```jsx
await page
  .locator('button')
  .filter(button => !button.disabled)
  .click();
```

- Điền thông tin đầu vào

```jsx
await page.locator('input').fill('value');
```

- Truy xuất thuộc tính phần tử

```jsx
const enabled = await page
  .locator('button')
  .map(button => !button.disabled)
  .wait();
```

- Di chuột và phần tử

```jsx
await page.locator('div').hover();
```

- Cuộn 1 phần tử

```jsx
await page.locator('div').scroll({
  scrollLeft: 10,
  scrollTop: 20,
});
```

Configuring locators

Locators có thể được cấu hình để điều chỉnh cấu hình các điều kiện tiên quyết và các tùy chọn khác:

```jsx
await page
  .locator('button')
  .setEnsureElementIsInTheViewport(false)
  .setTimeout(0)
  .setVisibility(null)
  .setWaitForEnabled(false)
  .setWaitForStableBoundingBox(false)
  .click();
```

Getting locator events

Hiện tại, **`locator`** hỗ trợ một sự kiện duy nhất thông báo cho bạn khi **`locator`** sắp thực hiện hành động:

```jsx
let willClick = false;
await page
  .locator('button')
  .on(LocatorEvent.Action, () => {
    willClick = true;
  })
  .click();
```

**Query Selectors**

Truy vấn là cơ chế chính để tương tác với DOM trên trang web của bạn. Ví dụ: một quy trình làm việc điển hình sẽ như sau:

```jsx
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://developer.chrome.com/");
  const element = await page.waitForSelector("button"); // chờ cho đến khi element xuất hiện
  await element.click(); // click vào element
  await element.dispose(); // xóa element
```

`P` Selectors

 Puppeteer sử dụng siêu bộ cú pháp bộ chọn CSS để truy vấn. Chúng tôi gọi cú pháp này là `P Selectors` và nó được tăng cường thêm các khả năng bổ sung như bộ kết hợp sâu và lựa chọn văn bản.

Note: P Selectors chỉ hoạt động ở "độ sâu" đầu tiên của bộ chọn; ví dụ: `:is(div >>> a)` sẽ không hoạt động.

- `>>>` and `>>>>` combinators

`>>>` và `>>>>` được gọi là các bộ kết hợp "hậu duệ sâu" (deep descendant) và "sâu" (deep). Cả hai bộ kết hợp này đều có tác dụng đi vào các shadow host (vùng DOM bị che khuất), với >>> đi vào mọi shadow host dưới một nút và >>>> chỉ đi vào shadow host ngay lập tức (nếu nút đó là một shadow host; nếu không, nó không làm gì cả).

Lưu ý:

Một câu hỏi thường gặp là khi nào nên chọn `>>>>` thay vì `>>>` xét đến tính linh hoạt của `>>>`. Một câu hỏi tương tự có thể được đặt ra về > và dấu cách (khoảng trắng); chọn > nếu bạn không cần truy vấn tất cả các phần tử dưới một nút nhất định và dấu cách nếu không. Câu trả lời này mở rộng một cách tự nhiên cho `>>>>` (>) và `>>>` (dấu cách).

```html
<custom-element>
  <template shadowrootmode="open">
    <slot></slot>
  </template>
  <custom-element>
    <template shadowrootmode="open">
      <slot></slot>
    </template>
    <custom-element>
      <template shadowrootmode="open">
        <slot></slot>
      </template>
      <h2>Light content</h2>
    </custom-element>
  </custom-element>
</custom-element>
```

Sau đó, `custom-element >>> h2` sẽ trả về h2, nhưng `custom-element >>>> h2` sẽ không trả về gì vì h2 bên trong nằm trong `shadow root.`

`P-Elements`

`P` elements là các pseudo-element có tiền tố -p của nhà cung cấp. Nó cho phép bạn nâng cao bộ chọn của mình bằng các công cụ truy vấn dành riêng cho Puppeteer như XPath, truy vấn văn bản và ARIA.

Text selectors (`-p-text`)

Text selectors sẽ chọn các phần tử "minimal" có chứa văn bản đã cho, ngay cả trong các shadow roots. (mở). Ở đây, "minimal" có nghĩa là các phần tử sâu nhất chứa một văn bản nhất định chứ không phải phần tử gốc của chúng (về mặt kỹ thuật cũng sẽ chứa văn bản đã cho).

```jsx
const element = await page.waitForSelector('div ::-p-text(My name is Jun)');
// You can also use escapes.
const element = await page.waitForSelector(
  ':scope >>> ::-p-text(My name is Jun \\(pronounced like "June"\\))'
);
// or quotes
const element = await page.waitForSelector(
  'div >>>> ::-p-text("My name is Jun (pronounced like \\"June\\")"):hover'
);
```

XPath selectors (`-p-xpath`)

Bộ chọn XPath sẽ sử dụng `Document.evaluate` gốc của trình duyệt để truy vấn các phần tử.

```jsx
const element = await page.waitForSelector('::-p-xpath(h2)');
```

ARIA selectors (`-p-aria`)

Bộ chọn ARIA có thể được sử dụng để tìm các phần tử có nhãn ARIA nhất định. Các nhãn này được tính toán bằng cách sử dụng biểu diễn nội bộ của Chrome.

```jsx
const node = await page.waitForSelector('::-p-aria(Submit)');
const node = await page.waitForSelector(
  '::-p-aria([name="Click me"][role="button"])'
);
```

Custom Selectors

Bạn có thể đăng ký trình xử lý truy vấn tùy chỉnh cho phép bạn tạo bộ chọn tùy chỉnh. Ví dụ: xác định trình xử lý truy vấn cho bộ chọn getById:

```jsx
Puppeteer.registerCustomQueryHandler('getById', {
  queryOne: (elementOrDocument, selector) => {
    return elementOrDocument.querySelector(`[id="${CSS.escape(selector)}"]`);
  },
  // Note: for demonstation perpose only `id` should be page unique
  queryAll: (elementOrDocument, selector) => {
    return elementOrDocument.querySelectorAll(`[id="${CSS.escape(selector)}"]`);
  },
});
```

# Javascript execution

Puppeteer cho phép evaluating các hàm JavaScript trong ngữ cảnh của trang do Puppeteer điều khiển:

```jsx
const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://developer.chrome.com/");
  const three = await page.evaluate(() => {
    return 1 + 2;
  });
  console.log(three);
```

<aside>
<img src="https://www.notion.so/icons/skull_orange.svg" alt="https://www.notion.so/icons/skull_orange.svg" width="40px" /> Caution:  Mặc dù hàm này được xác định trong ngữ cảnh tập lệnh của bạn nhưng nó thực sự được Puppeteer xâu chuỗi, gửi đến trang đích qua giao thức Chrome DevTools và được đánh giá ở đó. Điều đó có nghĩa là hàm không thể truy cập các biến phạm vi trong tập lệnh của bạn.

</aside>

Ngoài ra bạn cũng có thể cung cấp nội dung hàm dưới dạng chuỗi:

```jsx
const three = await page.evaluate(`
    1 + 2
`);
```

<aside>
<img src="https://www.notion.so/icons/skull_orange.svg" alt="https://www.notion.so/icons/skull_orange.svg" width="40px" /> Ví dụ trên tạo ra kết quả tương đương nhưng nó cũng minh họa rằng không thể biết được các loại và biến toàn cục có sẵn cho hàm được đánh giá. Đặc biệt, trong TypeScript, bạn nên cẩn thận để đảm bảo rằng các đối tượng được tham chiếu bởi hàm đánh giá là chính xác.

</aside>

## Return Types

Các hàm bạn đánh giá có thể trả về giá trị. Nếu giá trị trả về thuộc loại nguyên thủy, nó sẽ được Puppeteer tự động chuyển đổi thành loại nguyên thủy trong ngữ cảnh tập lệnh như trong ví dụ trước.

Nếu tập lệnh trả về một đối tượng, Puppeteer sẽ tuần tự hóa nó thành JSON và xây dựng lại nó ở phía tập lệnh. Quá trình này không phải lúc nào cũng mang lại kết quả chính xác, chẳng hạn như khi bạn trả về nút DOM:

```jsx
const body = await page.evaluate(() => {
  return document.body;
});
console.log(body); // {}, unexpected!
```

Để làm việc với các đối tượng được trả về, Puppeteer đưa ra cách trả về các đối tượng bằng tham chiếu:

```jsx
const body = await page.evaluateHandle(() => {
  return document.body;
});
console.log(body instanceof ElementHandle); // true
```

Đối tượng được trả về là `JSHandle` hoặc `ElementHandle`. `ElementHandle` mở rộng JSHandle và nó chỉ được tạo cho các phần tử `DOM`.

## Passing arguments to the evaluate function

Bạn có thể cung cấp đối số cho hàm của mình:

```jsx
const three = await page.evaluate(
  (a, b) => {
    return 1 + 2;
  },
  1,
  2
);
```

Các đối số có thể là giá trị nguyên thủy hoặc JSHandles.

# Guildes

1. Debugging
    
     Gỡ lỗi với Puppeteer có thể là một nhiệm vụ khó khăn. Không có phương pháp duy nhất nào để gỡ lỗi tất cả các sự cố có thể xảy ra vì Puppeteer liên quan đến nhiều thành phần riêng biệt của trình duyệt, chẳng hạn như yêu cầu mạng và API Web. Đặc biệt, Puppeteer cung cấp một số phương pháp gỡ lỗi, hy vọng sẽ giải quyết được tất cả các vấn đề có thể xảy ra.
    
    1. Background
        
         Nói chung, có hai nguồn có thể gây ra sự cố: code chạy trên Node.js (mà chúng tôi gọi là code máy chủ) và mã chạy trong trình duyệt (mà chúng tôi gọi là code máy khách). Ngoài ra còn có một nguồn thứ ba có thể là chính trình duyệt (mà chúng tôi gọi là code nội bộ hoặc code trình duyệt), nhưng nếu bạn nghi ngờ đây là nguồn sau khi thử các phương pháp bên dưới, chúng tôi khuyên bạn nên tìm kiếm các vấn đề hiện có trước khi gửi vấn đề.
        
    2. Debugging methods for all situations
        
        Những phương pháp này có thể được sử dụng để gỡ lỗi trong mọi tình huống. Chúng nên được sử dụng như một biện pháp kiểm tra độ tỉnh táo nhanh chóng trước khi đi sâu vào các phương pháp phức tạp hơn.
        
    3. Turn off [`headless`](browserlaunchargumentoptions)
        
        Đôi khi việc xem trình duyệt đang hiển thị những gì sẽ rất hữu ích. Thay vì khởi chạy ở chế độ không đầu, hãy khởi chạy phiên bản đầy đủ của trình duyệt với chế độ không đầu được đặt thành sai:
        
        ```jsx
        const browser = await puppeteer.launch({headless: false});
        ```
        
    4. Puppeteer "slow-mo"
        
        Tùy chọn SlowMo làm chậm các hoạt động của Puppeteer trong một khoảng mili giây được chỉ định. Đó là một cách khác để giúp xem những gì đang xảy ra.
        
        ```jsx
        const browser = await puppeteer.launch({
          headless: false,
          slowMo: 250, // slow down by 250ms
        });
        ```
        
    5. Debugging methods for client code
        - Capture `console.*` output
            
             Vì mã máy khách chạy trong trình duyệt nên việc thực hiện `console.*` trong mã máy khách sẽ không đăng nhập trực tiếp vào Node.js. Tuy nhiên, bạn có thể nghe (page.on) sự kiện trên bảng điều khiển trả về tải trọng cùng với văn bản đã ghi.
            
        - Use the debugger in the browser
            
            ```jsx
            const browser = await puppeteer.launch({devtools: true});
            ```
            
            Thêm trình gỡ lỗi bên trong bất kỳ mã máy khách nào bạn muốn gỡ lỗi. Ví dụ,
            
            ```jsx
            await page.evaluate(() => {
              debugger;
            });
            ```
            
            Trình duyệt bây giờ sẽ dừng ở vị trí tìm thấy từ trình gỡ lỗi trong chế độ gỡ lỗi.
            
    6. Debugging methods for server code
        
         Vì mã máy chủ trộn lẫn với mã máy khách nên phương pháp gỡ lỗi này gắn chặt với trình duyệt. Ví dụ: bạn có thể bước qua trang chờ.click() trong tập lệnh máy chủ và xem thao tác nhấp chuột xảy ra trong trình duyệt.
        
        Thêm trình gỡ lỗi vào bất kỳ mã máy chủ nào bạn muốn gỡ lỗi. Ví dụ,
        
        ```jsx
        debugger;
        await page.click('a[target=_blank]');
        ```
        
        Chạy mã máy chủ của bạn với --inspect-brk. Ví dụ,
        
        ```jsx
        node --inspect-brk path/to/script.js
        ```
        
        Trong trình duyệt Chrome/Chromium đã mở, hãy mở `chrome://inspect/#devices` và nhấp vào kiểm tra.
        
    7. Debugging methods for the browser code
        - Print browser logs
            
            Nếu trình duyệt gặp sự cố bất ngờ hoặc không khởi chạy đúng cách, việc kiểm tra nhật ký từ quá trình trình duyệt có thể hữu ích bằng cách đặt thuộc tính khởi chạy dumpio thành true.
            
        
        ```jsx
        const browser = await puppeteer.launch({
          dumpio: true,
        });
        ```
        
        Trong trường hợp này, Puppeteer chuyển tiếp nhật ký trình duyệt tới `stdio`.
        
2. Headless Mode
    
    Theo mặc định Puppeteer khởi chạy trình duyệt ở `Headless Mode`
    
    ```jsx
    const browser = await puppeteer.launch();
    // Equivalent to
    const browser = await puppeteer.launch({headless: true});
    ```
    
     Trước v22, Puppeteer mặc định khởi chạy chế độ Không đầu cũ. Chế độ không đầu cũ hiện được gọi là chrome-headless-shell và xuất xưởng dưới dạng nhị phân riêng biệt. chrome-headless-shell không hoàn toàn khớp với hoạt động của Chrome thông thường nhưng hiện tại nó hoạt động hiệu quả hơn đối với các tác vụ tự động hóa mà không cần bộ tính năng Chrome hoàn chỉnh. Nếu hiệu suất quan trọng hơn đối với trường hợp sử dụng của bạn, hãy chuyển sang chrome-headless-shell như sau:
    
    ```jsx
    const browser = await puppeteer.launch({headless: 'shell'});
    ```
    
    Để khởi chạy phiên bản Chrome "headful", hãy đặt tùy chọn headless thành false khi khởi chạy trình duyệt:
    
    ```jsx
    const browser = await puppeteer.launch({headless: false});
    ```
    
3. Screenshots
    
    Để caturing screenshots hãy dùng `Page.screenshot()`
    
    ```jsx
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://news.ycombinator.com', {
      waitUntil: 'networkidle2',
    });
    await page.screenshot({
      path: 'hn.png',
    });
    
    await browser.close();
    ```
    
4. PDF geneation
    
    in thành file PDF thì dùng `Page.pdf()`
    
    ```jsx
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://news.ycombinator.com', {
      waitUntil: 'networkidle2',
    });
    // Saves the PDF to hn.pdf.
    await page.pdf({
      path: 'hn.pdf',
    });
    
    await browser.close();
    ```
    

# Mục đích sử dụng:

- **Tự động hóa trình duyệt:** Puppeteer cho phép bạn tự động hóa các tác vụ trong trình duyệt, chẳng hạn như:
    - Điền và gửi biểu mẫu
    - Tương tác với các phần tử trên trang web (nhấp chuột, di chuột, nhập văn bản)
    - Chụp ảnh màn hình hoặc tạo PDF của trang web
    - Thực hiện các hành động cuộn và điều hướng
    - Tự động kiểm tra giao diện người dùng (UI)
- **Cạo dữ liệu web (Web Scraping):** Puppeteer có thể được sử dụng để trích xuất dữ liệu từ các trang web, bao gồm:
    - Thu thập thông tin sản phẩm từ các trang thương mại điện tử
    - Lấy dữ liệu từ các trang mạng xã hội
    - Trích xuất thông tin từ các trang web tin tức
    - Tạo tập dữ liệu tùy chỉnh cho các mục đích khác nhau
- **Kiểm thử trang web:** Puppeteer cung cấp một môi trường mạnh mẽ để kiểm thử trang web, bao gồm:
    - Kiểm tra khả năng phản hồi trên các thiết bị và kích thước màn hình khác nhau
    - Kiểm tra hiệu suất trang web
    - Kiểm tra các luồng người dùng và kịch bản tương tác
    - Tự động kiểm tra hồi quy
- **Tạo ảnh chụp màn hình và PDF:** Puppeteer có thể được sử dụng để tạo ảnh chụp màn hình chất lượng cao hoặc PDF của các trang web, điều này hữu ích cho:
    - Lưu trữ các trang web để tham khảo ngoại tuyến
    - Tạo báo cáo và tài liệu
    - Chia sẻ thông tin trực quan về trang web
- **Thực thi JavaScript phía máy khách:** Puppeteer cho phép bạn thực thi mã JavaScript trong ngữ cảnh của trình duyệt, điều này có thể hữu ích cho:
    - Tương tác với các API web
    - Truy cập các phần tử DOM và thao tác chúng
    - Thực hiện các phép tính phía máy khách
    - Gỡ lỗi các ứng dụng web

# Document API

1. PuppeteerNode
    
    Nếu bạn đang sử dụng Puppeteer trong môi trường Node, đây là lớp bạn sẽ nhận được khi chạy `require('puppeteer')` (hoặc import ES ).
    
    - Method

        | Method                         | Modifiers | Description |
        |--------------------------------| --- | --- |
        | puppeteernode.connect()        |  | Phương pháp này gắn Puppeteer vào một phiên bản trình duyệt hiện có. |
        | puppeteernode.defaultargs()    |  |  |
        | puppeteernode.executablepath() |  | Đường dẫn thực thi mặc định. |
        | puppeteernode.launch()         |  |  Khởi chạy một phiên bản trình duyệt với các đối số và tùy chọn nhất định khi được chỉ định.Khi sử dụng với puppeteer-core, phải cung cấp options.executablePath hoặc options.channel. |
        | puppeteernode.trimcache |  |  Xóa tất cả các tệp nhị phân Firefox và Chrome không hiện hành trong thư mục bộ đệm được xác định bởi cấu hình Puppeteer được cung cấp. Phiên bản trình duyệt hiện tại được xác định bằng cách phân giải PUPPETEER_REVISIONS từ Puppeteer trừ khi cung cấp configure.browserRevision. |
2. Pupeteer

    | Method | Modifiers | Description |
    | --- | --- | --- |
    | Puppeteer.clearCustomQueryHandlers() |  | Hủy đăng ký tất cả các trình xử lý truy vấn tùy chỉnh.
     |
    | Puppeteer.connect() |  | Phương pháp này gắn Puppeteer vào một phiên bản trình duyệt hiện có.
     |
    | Puppeteer.customQueryHandlerNames() |  | Lấy tên của tất cả các trình xử lý truy vấn tùy chỉnh.
     |
    | Puppeteer.registerCustomQueryHandler() |  | Đăng ký một trình xử lý truy vấn tùy chỉnh.
     |
    | Puppeteer.unregisterCustomQueryHandler() |  | Hủy đăng ký trình xử lý truy vấn tùy chỉnh cho một tên cụ thể.
     |
3. Browser
    
    `Browser` đại diện cho một phiên bản trình duyệt: được kết nối qua `Puppeteer.connect()` hoặc - được khởi chạy bởi `PuppeteerNode.launch()`.
    
    `Browser emits` các sự kiện khác nhau được ghi lại trong enum `BrowserEvent`.

    | Method | Modifiers | Description |
    | --- | --- | --- |
    | browser.browsercontexts |  | Nhận danh sách các browser contexts đang mở.Trong trình duyệt mới được tạo, điều này sẽ trả về một phiên bản duy nhất của BrowserContext.
     |
    | browser.close |  | Đóng trình duyệt này và tất cả các trang liên quan. |
    | browser.createbrowsercontext |  | Tạo bối cảnh trình duyệt mới.Điều này sẽ không chia sẻ cookie/bộ đệm với các bối cảnh trình duyệt khác.
     |
    | browser.defaultbrowsercontext |  | Lấy bối cảnh trình duyệt mặc định.Nhận xét: Không thể đóng bối cảnh trình duyệt mặc định.
     |
    | browser.disconnect |  | Ngắt kết nối Puppeteer khỏi trình duyệt này nhưng vẫn để quá trình chạy.
     |
    | browser.newpage |  | Tạo một trang mới trong ngữ cảnh trình duyệt mặc định. |
    | browser.pages |  | Nhận danh sách tất cả các trang đang mở bên trong Trình duyệt này.Nếu có nhiều ngữ cảnh trình duyệt, điều này sẽ trả về tất cả các trang trong tất cả ngữ cảnh trình duyệt.Nhận xét:Các trang không hiển thị, chẳng hạn như "background_page", sẽ không được liệt kê ở đây. Bạn có thể tìm thấy chúng bằng Target.page(). |
    | browser.target |  | Nhận mục tiêu được liên kết với bối cảnh trình duyệt mặc định). |
    | browser.useragent |  | Nhận tác nhân người dùng ban đầu của trình duyệt này. Các trang có thể ghi đè tác nhân người dùng bằng Page.setUserAgent().
     |
4. Page, Frame and ElementHandle
    
    Page cung cấp các phương thức để tương tác với một tab hoặc page nền tiện ích mở rộng trong trình duyệt.
    
    <aside>
    <img src="https://www.notion.so/icons/subtitles_gray.svg" alt="https://www.notion.so/icons/subtitles_gray.svg" width="40px" /> Một phiên bản Trình duyệt có thể có nhiều phiên bản Trang.
    </aside>
    
    | Method                                                                                                     | Modifiers | Description |
    |------------------------------------------------------------------------------------------------------------| --- | --- |
    | page.$                                                                                                     |  | Chạy document.querySelector trong trang. Nếu không có phần tử nào khớp với bộ chọn thì giá trị trả về sẽ là null.
     |
    | page.$$                                                                                                    |  | Phương thức này chạy document.querySelectorAll trong trang. Nếu không có phần tử nào khớp với bộ chọn, giá trị trả về sẽ phân giải thành [].
     |
    | page.$$eval                                                                                                |  | Phương thức này chạy Array.from(document.querySelectorAll(selector)) trong trang và chuyển kết quả làm đối số đầu tiên cho pageFunction.Note: 
    Nếu pageFunction trả về một lời hứa $$eval sẽ đợi lời hứa được giải quyết và sau đó trả về giá trị của nó. |
    | page.$eval                                                                                                 |  | Phương thức này chạy document.querySelector trong trang và chuyển kết quả làm đối số đầu tiên cho pageFunction.Remarks:Nếu không tìm thấy phần tử nào khớp với bộ chọn, phương thức sẽ đưa ra lỗi.Nếu pageFunction trả về một lời hứa $eval sẽ đợi lời hứa được giải quyết và sau đó trả về giá trị của nó. |
    | page.addscripttag |  | Thêm thẻ `script` vào trang có URL hoặc nội dung mong muốn.
     |
    | page.addstyletag |  | Thêm thẻ `<link rel="stylesheet">` vào trang có URL mong muốn hoặc thẻ `<style type="text/css">` với nội dung.
     |
    | page.authenticate |  | Cung cấp thông tin xác thực để xác thực HTTP.
     |
    | page.browser |  | Lấy trình duyệt của trang đó.
     |
    | page.browsercontext |  | Lấy bối cảnh trình duyệt chứa trang đó. |
    | page.click |  | Phương thức này tìm nạp một phần tử bằng bộ chọn, cuộn phần tử đó vào chế độ xem nếu cần và sau đó sử dụng Page.mouse để nhấp vào giữa phần tử. Nếu không có bộ chọn phần tử nào phù hợp thì phương thức sẽ báo lỗi.
     |
    | page.content |  | Nội dung HTML đầy đủ của trang, bao gồm cả DOCTYPE.
     |
    | page.cookies |  | Nếu không có URL nào được chỉ định, phương thức này sẽ trả về cookie cho URL trang hiện tại. Nếu URL được chỉ định thì chỉ trả về cookie cho các URL đó.
     |
    | page.createcdpsession |  | Tạo phiên Giao thức Chrome Devtools được đính kèm vào trang.
     |
    | page.emulate |  | Mô phỏng số liệu và tác nhân người dùng của một thiết bị nhất định. Để hỗ trợ việc mô phỏng, Puppeteer cung cấp danh sách các thiết bị đã biết có thể thông qua KnownDevices. |
    | page.evaluate |  |  Đánh giá một hàm trong ngữ cảnh của trang và trả về kết quả.Nếu hàm được chuyển đến page.evaluate trả về một Lời hứa, thì hàm đó sẽ đợi lời hứa được giải quyết và trả về giá trị của nó. |
    | page.focus |  | Phương thức này tìm nạp một phần tử bằng bộ chọn và tập trung vào phần tử đó. Nếu không có bộ chọn phần tử nào phù hợp thì phương thức sẽ báo lỗi.
     |
    | page.frames |  | Một mảng gồm tất cả các khung được đính kèm vào trang. |
    | page.goback |  | Phương pháp này điều hướng đến trang trước trong lịch sử. |
    | page.goforward |  | Phương pháp này điều hướng đến trang tiếp theo trong lịch sử.
     |
    | page.goto |  | Điều hướng trang tới url đã cho.
     |
    | page.hover |  |  Phương thức này tìm nạp một phần tử bằng bộ chọn, cuộn phần tử đó vào chế độ xem nếu cần, sau đó sử dụng Page.mouse để di chuột qua tâm của phần tử. Nếu không có bộ chọn phần tử nào phù hợp thì phương thức sẽ báo lỗi. |
    | page.isclosed |  | Cho biết rằng trang đã bị đóng.
     |
    | page.locator |  | Tạo một locator cho bộ chọn được cung cấp. Xem locator để biết chi tiết và hành động được hỗ trợ.
     |
    | page.queryobjects |  | Phương thức này lặp lại vùng nhớ JavaScript và tìm tất cả các đối tượng có nguyên mẫu đã cho.
     |
    | page.reload |  | Tải lại trang. |
    | page.screenshot |  | Chụp ảnh màn hình của trang này.
     |
    | page.select |  | Kích hoạt sự kiện thay đổi và nhập liệu khi tất cả các tùy chọn được cung cấp đã được chọn. Nếu không có bộ chọn phần tử <select> phù hợp, phương thức sẽ báo lỗi.
     |
    | page.setcacheenabled |  | Chuyển đổi bỏ qua bộ nhớ đệm cho mỗi yêu cầu dựa trên trạng thái được bật. Theo mặc định, bộ nhớ đệm được bật.
     |
    | page.setcontent |  | Đặt nội dung của trang.
     |
    | page.setgeolocation |  | Đặt vị trí địa lý của trang.
     |
    | page.setviewport |  | page.setViewport sẽ thay đổi kích thước trang. Rất nhiều trang web không mong đợi điện thoại sẽ thay đổi kích thước, vì vậy bạn nên đặt chế độ xem trước khi điều hướng đến trang.Trong trường hợp có nhiều trang trong một trình duyệt, mỗi trang có thể có kích thước khung nhìn riêng. |
    | page.tap |  |  Phương thức này tìm nạp một phần tử bằng bộ chọn, cuộn phần tử đó vào chế độ xem nếu cần, sau đó sử dụng Page.touchscreen để chạm vào giữa phần tử. Nếu không có bộ chọn phần tử nào phù hợp thì phương thức sẽ báo lỗi.Remarks:Shortcut for frame.tap. |
    | page.target | deprecated | Một mục tiêu mà trang này được tạo ra từ đó.
     |
    | page.title |  | Tiêu đề của trang |
    | page.type |  | gửi 1 keydown, keypress/input, và keyup cho mỗi ký tự trong văn bản.Để nhấn một phím đặc biệt, như Control hoặc ArrowDown, hãy sử dụng Keyboard.press(). |
    | page.url |  | URL của trang. |
    | page.viewport |  | Trả về cài đặt chế độ xem trang hiện tại mà không kiểm tra chế độ xem trang thực tế.
     |
    | page.waitfordeviceprompt |  | Phương pháp này thường được kết hợp với một hành động kích hoạt yêu cầu thiết bị từ một api như WebBluetooth.
     |
    | page.waitforfilechooser |  | Phương pháp này thường được kết hợp với một hành động kích hoạt việc chọn tệp.
     |
    | page.waitforframe |  | Chờ một khung phù hợp với các điều kiện nhất định xuất hiện.
     |
    | page.waitforfunction |  | Chờ hàm được cung cấp, pageFunction, trả về giá trị trung thực khi được đánh giá trong ngữ cảnh của trang.
     |
    | page.waitforselector |  | Đợi selector xuất hiện trong trang. Nếu tại thời điểm gọi phương thức mà selector đã tồn tại, phương thức sẽ trả về ngay lập tức. Nếu selector không xuất hiện sau thời gian chờ một phần nghìn giây, hàm sẽ ném lỗi |
5. WebWorker
    
    Lớp này đại diện cho một WebWorker.
    
    | Method | Modifiers | Description |
    | --- | --- | --- |
    | webworker.close |  |  |
    | webworker.evaluate |  | Đánh giá một chức năng nhất định trong worker.
     |
    | webworker.evaluatehandle |  | Đánh giá một chức năng nhất định trong worker.Nói chung, bạn nên sử dụng evaluteHandle nếu đánh giá không thể tuần tự hóa giá trị trả về một cách chính xác hoặc bạn cần một bộ điều khiển có thể thay đổi đối với đối tượng trả về. |
    | webworker.url |  | URL của worker web này. |
6. Accessibility
    
    **`Accessibility.snapshot()`**
    
    Nắm bắt trạng thái hiện tại của accessibility tree. Đối tượng được trả về đại diện cho nút gốc có thể truy cập được của trang.
    
7. Keyboard
    
    Bàn phím cung cấp api để quản lý bàn phím ảo. Api cấp cao là `Keyboard.type()`, lấy các ký tự thô và tạo ra các sự kiện nhấn phím, nhấn/nhập và gõ phím thích hợp trên trang của bạn.
    
    | Method | Modifiers | Description |
    | --- | --- | --- |
    | keyboard.down |  | Gửi một sự kiện keydown.
     |
    | keyboard.press |  | Phím tắt cho Keyboard.down() và Keyboard.up().
     |
    | keyboard.sendcharacter |  | Gửi một sự kiện nhấn phím và nhập liệu. Điều này không gửi sự kiện keydown hoặc keyup.
     |
    | keyboard.type |  | Gửi một sự kiện keydown, keypress/input và keyup cho mỗi ký tự trong văn bản.
     |
    | keyboard.up |  | Gửi một sự kiện keyup. |
8. Mouse
    
    Lớp Chuột hoạt động ở các pixel CSS khung chính tương ứng với góc trên cùng bên trái của khung nhìn.
    
    | Method | Modifiers | Description |
    | --- | --- | --- |
    | mouse.click |  | Phím tắt cho mouse.move, mouse.down và mouse.up.
     |
    | mouse.down |  | Nhấn chuột |
    | mouse.drag |  | Gửi một sự kiện kéo. |
    | mouse.draganddrop |  | Thực hiện thao tác kéo, kéo, kéo qua và thả theo trình tự.
     |
    | mouse.dragenter |  | Gửi một sự kiện dragenter. |
    | mouse.dragover |  | Gửi một sự kiện dragover.
     |
    | mouse.drop |  | Thực hiện thao tác kéo, kéo qua và thả theo trình tự. |
    | mouse.move |  | Di chuyển chuột đến tọa độ đã cho. |
    | mouse.reset |  | Đặt lại chuột về trạng thái mặc định: Không nhấn nút nào; vị trí tại (0,0). |
    | mouse.up |  | Thả chuột. |
    | mouse.wheel |  | Gửi một sự kiện con lăn chuột. |
9. Touchscreen
    
    Lớp Màn hình cảm ứng hiển thị các sự kiện trên màn hình cảm ứng.
    
    | Method | Modifiers | Description |
    | --- | --- | --- |
    | touchscreen.tap |  | Gửi một sự kiện touchstart và touchend.
     |
    | touchscreen.touchend |  | Gửi một sự kiện touchend. |
    | touchscreen.touchmove |  | Gửi một sự kiện touchMove. |
    | touchscreen.touchstart |  | Gửi một sự kiện touchstart. |
10. Tracing class
    
    Lớp Truy tìm hiển thị giao diện kiểm tra theo dõi.
    
    | Method | Modifiers | Description |
    | --- | --- | --- |
    | tracing.start |  | Bắt đầu theo dõi trang hiện tại.
     |
    | tracing.stop |  | Dừng một dấu vết bắt đầu bằng phương thức bắt đầu. |
11. FileChooser class
    
    Trình chọn tệp cho phép bạn phản ứng với trang yêu cầu tệp.
    
    | Method | Modifiers | Description |
    | --- | --- | --- |
    | filechooser.accept |  | Chấp nhận yêu cầu chọn tệp với đường dẫn tệp đã cho. |
    | filechooser.cancel |  | Đóng trình chọn tệp mà không chọn bất kỳ tệp nào. |
    | filechooser.ismultiple |  | Trình chọn tệp có cho phép chọn nhiều tệp hay không. |
12. Dialog class
    
    Các phiên bản hộp thoại được Trang gửi đi thông qua sự kiện hộp thoại.
    
    | Method | Modifiers | Description |
    | --- | --- | --- |
    | dialog.accept |  | Một lời hứa sẽ được giải quyết khi dialog được chấp nhận. |
    | dialog.defaultvalue |  | Giá trị mặc định của lời nhắc hoặc một chuỗi trống nếu dialog không phải là prompt. |
    | dialog.dismiss |  | Một lời hứa sẽ được giải quyết sau khi dialog bị loại bỏ |
    | dialog.message |  | Thông báo hiển thị trong dialog. |
    | dialog.type |  | Loại dialog. |
13. ConsoleMessage
    
    Các đối tượng ConsoleMessage được gửi đi theo trang thông qua sự kiện 'console'.
    
    | Method | Modifiers | Description |
    | --- | --- | --- |
    | consolemessage.args |  | Một mảng đối số được truyền tới bảng điều khiển. |
    | consolemessage.location |  | Vị trí của thông báo trên bảng điều khiển. |
    | consolemessage.stacktrace |  | Mảng vị trí trên ngăn xếp của thông báo trên bảng điều khiển. |
    | consolemessage.text |  | Nội dung của thông báo trên bảng điều khiển. |
    | consolemessage.type |  | Loại thông báo trên bảng điều khiển. |

12. JSHandle

Đại diện cho một tham chiếu đến một đối tượng JavaScript. Các phiên bản có thể được tạo bằng `Page.evaluateHandle()`.

| Method | Modifiers | Description |
| --- | --- | --- |
| jshandle.aselement |  | Giá trị null hoặc chính phần điều khiển nếu phần điều khiển là một phiên bản của ElementHandle. |
| jshandle.dispose |  | Giải phóng đối tượng được tham chiếu bởi bộ điều khiển để thu gom rác. |
| jshandle.evaluate |  | Evalutes hàm đã cho với phần điều khiển hiện tại làm đối số đầu tiên của nó. |
| jshandle.evaluatehandle |  | Evalutes hàm đã cho với phần điều khiển hiện tại làm đối số đầu tiên của nó. |
| jshandle.getproperties |  | Nhận map of handles đại diện cho các thuộc tính của map of handles hiện tại.
 |
| jshandle.getproperty |  | Lấy một thuộc tính duy nhất từ ​​đối tượng được tham chiếu. |
| jshandle.getproperty_1 |  |  |
| jshandle.jsonvalue |  | Một đối tượng vanilla đại diện cho các phần có thể tuần tự hóa của đối tượng được tham chiếu.
 |
| jshandle.remoteobject |  | Cung cấp quyền truy cập vào Protocol.Runtime.RemoteObject hỗ trợ tay cầm này. |
| jshandle.tostring |  | Trả về một chuỗi biểu diễn của JSHandle. |
