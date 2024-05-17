const fs = require("fs");
// đọc file
fs.readFile("test.txt", "utf8", (err, data) => {
  if (err) {
    throw err;
  }
  console.log(data);
});

//đọc file đồng bộ có nghĩa là nó sẽ chặn chương trình cho đến khi thực thi xong
try {
  const data = fs.readFileSync("test.txt", "utf8");
  console.log(data);
} catch (e) {
  throw e;
}

//ghi file phương thức này được sử dụng để tạo một tệp mới. Nếu tệp đã tồn tại, nội dung của tệp sẽ bị ghi đè
fs.writeFile("test.txt", "Hello World!", function (err) {
  if (err) throw err;
  console.log("Saved!");
});
//Phương thức này tương tự như fs.writeFile(), nhưng nó là một phương thức đồng bộ, nghĩa là nó sẽ chặn chương trình cho đến khi hoàn thành việc ghi tệp.
try {
  fs.writeFileSync("test.txt", "Hello World!");
  console.log("Saved!");
} catch (err) {
  console.error(err);
}

//Phương thức này lấy flag làm đối số thứ 2, nếu flag là “w” nghĩa là cho “ghi”, tệp đã chỉ định sẽ được mở và ghi. Nếu tệp không tồn tại thì một tệp trống sẽ được tạo
fs.open("test.txt", "w", function (err) {
  if (err) throw err;
  console.log("Saved!");
});
//Phương thức này nối thêm nội dung được chỉ định vào một tệp. Nếu tệp không tồn tại, tệp sẽ được tạo
fs.appendFile("test.txt", "Hello content!", function (err) {
  if (err) throw err;
  console.log("Saved!");
});
// xóa file
fs.unlink("test.txt", function (err) {
  if (err) throw err;
  console.log("File deleted!");
});
//Phương thức này tương tự như fs.unlink(), nhưng nó là một phương thức đồng bộ, nghĩa là nó sẽ chặn chương trình cho đến khi hoàn thành việc xóa tệp.
try {
  fs.unlinkSync("test.txt");
  console.log("File deleted!");
} catch (err) {
  console.error(err);
}
// rename file
fs.rename("test.txt", "newTest.txt", function (err) {
  if (err) throw err;
  console.log("File Renamed!");
});

// rename file sync
try {
  fs.renameSync("test.txt", "newTest.txt");
  console.log("File Renamed!");
} catch (err) {
  console.error(err);
}
