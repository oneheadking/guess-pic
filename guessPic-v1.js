/**
 * logic
 * 1. Click any one picture
 * 2. The picture will flip and display
 * 3. If the player click other one picture, which is same to the first one, that 2 pictures will become white, until all the pictures become white.
 * 4. If the player click another picture, all the pictures will flip over to initial state.
 */

//how to random pictures

// Total 9 divs, 1 picture for 2 divs

// Declare all small divs
let divs = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let pNums = [1, 2, 3, 4, 5];
let pics = {
  1: [],
  2: [],
  3: [],
  4: [],
  5: [],
};
var selectedNums = [];
let allsDiv = document.querySelectorAll(".sDiv");
let userClickArr = [];
let prev = "";
let current = "";

let addOilWords = [
  "Good job, a few more!",
  "Yes, not bad, Keep going!",
  "I am waiting you"
];

let stuckWords = [
  "Be patient!",
  "XX you, so stupid."
];

// Game init

gameInit();
// First, assign all the corresponding pic class to each div
displayPic();

// Let all small divs trigger click event
for (let i = 0; i < allsDiv.length; i++) {
  allsDiv[i].addEventListener("click", function () {
    // Thinking this problem
    // 1.After click, every
    let selectedDiv = allsDiv[i];
    let ranAddOilNum = Math.floor(Math.random()*addOilWords.length);
    let ranStuckNum = Math.floor(Math.random()*stuckWords.length);
    console.log(selectedDiv.classList.value);

    selectedDiv.classList.remove("sDiv");

    // 1.If selectedDiv.classList.value === corresponding class
    // 2.Add the class with picture
    switch (selectedDiv.classList.value) {
      case "pic1":
        selectedDiv.classList.add("pic1Pic");
        selectedDiv.classList.remove("pic1");
        userClickArr.push({ div: selectedDiv, pic: "pic1" });
        break;
      case "pic2":
        selectedDiv.classList.add("pic2Pic");
        selectedDiv.classList.remove("pic2");
        userClickArr.push({ div: selectedDiv, pic: "pic2" });
        break;
      case "pic3":
        selectedDiv.classList.add("pic3Pic");
        selectedDiv.classList.remove("pic3");
        userClickArr.push({ div: selectedDiv, pic: "pic3" });
        break;
      case "pic4":
        selectedDiv.classList.add("pic4Pic");
        selectedDiv.classList.remove("pic4");
        userClickArr.push({ div: selectedDiv, pic: "pic4" });
        break;
      case "pic5":
        selectedDiv.classList.add("pic5Pic");
        selectedDiv.classList.remove("pic5");
        userClickArr.push({ div: selectedDiv, pic: "pic5" });
        break;
    }

    prev = userClickArr[0].pic;

    if (userClickArr.length > 1) {
      current = userClickArr[1].pic;
      let prevClass = userClickArr[0].div.classList.value;
      let currentClass = userClickArr[1].div.classList.value;
      if (current === prev) {
        setTimeout(function () {
          userClickArr[0].div.classList.remove(prevClass);
          userClickArr[0].div.classList.add("solved");
          userClickArr[1].div.classList.remove(currentClass);
          userClickArr[1].div.classList.add("solved");
          userClickArr.splice(0, 2);
          document.querySelector('h1').textContent = addOilWords[ranAddOilNum];
        }, 100);
    
      } else {
        /**Stucking at this point */
        // If the picture is not the same as previous
        // both become yellow(init) again
        setTimeout(function () {
          userClickArr[0].div.classList.remove(prevClass);
          userClickArr[0].div.classList.add("sDiv");
          userClickArr[0].div.classList.add(userClickArr[0].pic);
          userClickArr[1].div.classList.remove(currentClass);
          userClickArr[1].div.classList.add("sDiv");
          userClickArr[1].div.classList.add(userClickArr[1].pic);
          document.querySelector('h1').textContent = stuckWords[ranStuckNum];
          userClickArr = [];
        }, 200);
      }
    }
    
  

    // How to display something when only last picture is left

    // console.log(`prev = ${prev}, current = ${current}`);
    console.log(userClickArr);


  });
}

function gameInit() {
  // If the divs.length has value, run the while loop
  while (divs.length > 0) {
    var ranNum = Math.floor(Math.random() * divs.length);
    // Push the selected divs into the arr
    selectedNums.push(divs[ranNum]);
    // Remove the divs
    divs.splice(divs.indexOf(divs[ranNum]), 1);

    // Whenever the selectedNums arr have added 2 nums
    if (selectedNums.length === 2) {
      var ranPicNum = Math.floor(Math.random() * pNums.length); //0-4
      var ranPic = pNums[ranPicNum]; //1-5
      // Push all the selectedNums into pics object
      for (var i = 0; i < selectedNums.length; i++) {
        pics["" + ranPic].push(selectedNums[i]);
      }
      selectedNums = [];
      pNums.splice(pNums.indexOf(pNums[ranPicNum]), 1);
    }
    // Add the last div in the pics arr without any value
    if (divs.length === 1) {
      let lastPicNum = pNums[0];
      let lastNum = divs[0];
      pics["" + lastPicNum].push(lastNum);
    }
  }
  console.log(pics);
}

function displayPic() {
  // 1. Every div should have random 1 picture first. (base on pics object)
  // 2. all the divs are yellow
  // 3. after user click, the yellow div become pic

  for (var i = 0; i < Object.keys(pics).length; i++) {
    switch (i + 1) {
      case 1:
        var eachPic = pics[1];
        for (var j = 0; j < eachPic.length; j++) {
          allsDiv[eachPic[j]].classList.toggle("pic1");
        }
        break;
      case 2:
        var eachPic = pics[2];
        for (var j = 0; j < eachPic.length; j++) {
          allsDiv[eachPic[j]].classList.toggle("pic2");
        }
        break;
      case 3:
        var eachPic = pics[3];
        for (var j = 0; j < eachPic.length; j++) {
          allsDiv[eachPic[j]].classList.toggle("pic3");
        }
        break;
      case 4:
        var eachPic = pics[4];
        for (var j = 0; j < eachPic.length; j++) {
          allsDiv[eachPic[j]].classList.toggle("pic4");
        }
        break;
      case 5:
        var eachPic = pics[5];
        for (var j = 0; j < eachPic.length; j++) {
          allsDiv[eachPic[j]].classList.toggle("pic5");
        }
        break;
    }
  }
}

// Bugs
// 1. If not same as previous one, cant see the 2nd pic (Solved-> setTimeout->0.2s)
// 2. After the div is solved, cant be pressed again (Solved-> add other class)
// 3. Press too fast, logic crash (Solve method => tune the speed in 0.2s)
// 4. How to display something when last picture is left
