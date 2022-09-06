let yourName = document.getElementById("name");
let roomNumber = document.getElementById("number");
let create = document.getElementById("create");
let showData = document.getElementById("showData");
let deleteAll = document.getElementById("deleteAll");
let searchData = document.getElementById("searchData");
let search = document.getElementById("search");

let arr = [];
let arrDate = "";
let dateNow = new Date();
let dateDay = dateNow.getDate();
let dateMonth = dateNow.getMonth() + 1;
let dateYear = dateNow.getFullYear();

// ##########

let printTime = `${dateDay < 10 ? (dateDay = `0${dateDay}`) : dateDay}/${
  dateMonth < 10 ? (dateMonth = `0${dateMonth}`) : dateMonth
}/${dateYear}`;

// #############

if (localStorage.info != null) {
  arr = JSON.parse(localStorage.info);
} else {
  arr = [];
}

create.onclick = function () {
  createInfo();
  printData();
  cleareInput();
};

function cleareInput() {
  yourName.value = "";
  roomNumber.value = "";
}

function createInfo() {
  let dataObj = {
    yourName: yourName.value,
    roomNumber: roomNumber.value,
    printTime: printTime,
  };
  arr.push(dataObj);
  console.log(arr);
}

function printData() {
  let data = "";
  for (let i = 0; i < arr.length; i++) {
    data += `
        <tr>
        <td id="idNum">${i + 1}</td>
        <td>${arr[i].yourName}</td>
        <td>${arr[i].roomNumber}</td>
        <td>${arr[i].printTime}</td>
        <td><button onclick = "deleteData(${i})" id="deletes">حذف</button></td>
        </tr>
        `;
  }
  showData.innerHTML = data;
  localStorage.setItem("info", JSON.stringify(arr));
}
printData();

// Delete

function deleteData(i) {
  arr.splice(i, 1);
  localStorage.info = JSON.stringify(arr);
  printData();
}

// Delete All
deleteAll.onclick = function () {
  if (window.confirm("هل أنت متأكد ؟") == true) {
    arr.splice(0);
    localStorage.clear();
    printData();
  } else {
    printData();
  }
};

// Search Data

searchData.onclick = function () {
  let data = "";
  for (let i = 0; i < arr.length; i++) {
    if (search.value == arr[i].roomNumber) {
      data += `
    <tr>
    <td id="idNum">${i}</td>
    <td>${arr[i].yourName}</td>
    <td>${arr[i].roomNumber}</td>
    <td>${arr[i].printTime}</td>
    <td><button onclick = "deleteData(${i})" id="deletes">حذف</button></td>
    </tr>
    `;
    } else if (arr[i].yourName.includes(search.value)) {
      data += `
        <tr>
        <td id="idNum">${i}</td>
        <td>${arr[i].yourName}</td>
        <td>${arr[i].roomNumber}</td>
        <td>${arr[i].printTime}</td>
        <td><button onclick = "deleteData(${i})" id="deletes">حذف</button></td>
        </tr>
        `;
    }
  }
  showData.innerHTML = data;
  search.value = "";
};
