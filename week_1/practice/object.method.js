const person = {
  name: "thanh quang",
  age: 21,
  gender: "Male",
};
const moreInfo = {
  age: 22,
  address: "HCM",
  health: "Good",
};
// get key trong object
const keys = Object.keys(person);
console.log(keys);
//get value trong object
const values = Object.values(person);
console.log(values);
//tạo một mảng lồng nhau trong với [key, value]
for (const [key, value] of Object.entries(person)) {
  console.log(`${key}: ${value}`);
}
//được sử dụng để sao chép từ object này tới object khác
const returnTarget = Object.assign(person, moreInfo);
console.log(returnTarget);

// kiểm tra có tồn tại key này trong object không
console.log(person.hasOwnProperty("name"));
console.log(person.hasOwnProperty("favorite"));

//////////

const students = {
  list: [],
  addStudent: function addStudent(name, age, major) {
    const student = { name, age, major };
    return this.list.push(student);
  },
  getStudent: function getStudent(name) {
    const student = this.list.find((student) => student.name === name);
    if (student) {
      console.log(
        `Name: ${student.name}, Age: ${student.age}, Major ${student.major}`
      );
    } else {
      console.log(`Student not found`);
    }
  },
  getAllStudent: function getAllStudent() {
    return this.list.forEach((val) => {
      for (const [key, value] of Object.entries(val)) {
        console.log(`${key}: ${value}`);
      }
    });
  },
};

students.addStudent("Thanh Quang", 21, "CNTT");
students.addStudent("Giang", 22, "CNTT");

students.getStudent("Giang");
students.getAllStudent();

const job = {
  position: "Intern",
  type: "hourly",
  isAvailable: true,
  showDetails() {
    const accepting = this.isAvailable
      ? "is accepting applications"
      : "is not currently accepting applications";

    console.log(
      `The ${this.position} position is ${this.type} and ${accepting}.`
    );
  },
};
// tạo mỗi object mới và liên kết với mẫu hiện có
const barista = Object.create(job);

barista.position = "barista";
barista.showDetails();

const user = {
  username: "baden",
  password: "Az145236",
};
//không có thay đổi hoặc thêm mới vào object
const newUser1 = Object.freeze(user);
newUser.password = "*******";
newUser.isActive = true;

// không cho thêm vào object
const newUser = Object.seal(user);
newUser.password = "******";
newUser.isActive = true;
console.log(user);
