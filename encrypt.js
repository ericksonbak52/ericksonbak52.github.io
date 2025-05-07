//document bits
const hideButton = document.getElementById("hidden");
const input = document.getElementById("text-input");
const title = document.getElementById("title");
const output = document.getElementById("output");
const inputDiv = document.getElementById("input-div");
const key = document.getElementById("key");
const leftTab = document.getElementById("left-tab");
const rightTab = document.getElementById("right-tab");

//variables
var cypher = "caesar";
var hidden = false;
var mode = "encode";

//creating document bits
const caesarShift = document.createElement("input");
createCeasar();
const vigShift = document.createElement("input");
createVig();

//changing between encoding and decoding on tab click
function updateTab(tab){
  if(parseInt(tab) == 1){
    mode = "encode";
    leftTab.classList.toggle("active-tab", true);
    rightTab.classList.toggle("active-tab", false);
  }else{
    mode = "decode";
    leftTab.classList.toggle("active-tab", false);
    rightTab.classList.toggle("active-tab", true);
  }
  
  clicky();
}

//when button is clicked show and hide the right things
function change(x) {
  if (x == "c") {
    cypher = "caesar";
    title.value = "Caesar Cipher";
    caesarShift.style.display = "block";
    vigShift.style.display = "none";

    vigShift.value = "";
  } else {
    cypher = "vigenere";
    title.value = "Vigenere Cipher";
    caesarShift.style.display = "none";
    vigShift.style.display = "block";
    caesarShift.value = "";
  }
}

//updating the output based on inputs
function clicky() {
  const text = input.value.trim();
  var num = "";
 
  if (cypher == "caesar") {
    if(mode == "encode"){
      num = caesarShift.value;
      output.value = caesar(text, num);
    }else{
     return caesar(text, -num);
    } 
  } else {
    if(mode == "encode"){
      num = vigShift.value.trim();
      output.value = vigenere(text, num);
    }else{
      num = vigShift.value.trim();
      output.value = unVigenere(text, num);
    }
  }
}

//hiding text
function hide() {
  hidden = !hidden;
  if (hidden) {
    input.type = "password";
    hideButton.innerText = "Show Input";
  } else {
    input.type = "text";
    hideButton.innerText = "Hide Input";
  }
}

//caesar cypher
function caesar(s, k) {
  let result = "";

  for (let i = 0; i < s.length; i++) {
    let charCode = s[i].charCodeAt();
    // check that charCode is a lowercase letter; automatically ignores non-letters
    if (charCode > 96 && charCode < 123) {
      charCode += k % 26; // makes it work with numbers greater than 26 to maintain correct shift
      // if shift passes 'z', resets to 'a' to maintain looping shift
      if (charCode > 122) {
        charCode = charCode - 122 + 96;
        // same as previous, but checking shift doesn't pass 'a' when shifting negative numbers
      } else if (charCode < 97) {
        charCode = charCode - 97 + 123;
      }
    }

    if (charCode > 64 && charCode < 91) {
      charCode += k % 26;

      if (charCode > 90) {
        charCode = charCode - 90 + 64;
      } else if (charCode < 65) {
        charCode = charCode - 65 + 91;
      }
    }

    result += String.fromCharCode(charCode);
  }
  return result;
}

//the wierd cypher
function vigenere(message, key) {
  let result = "";

  for (let i = 0, j = 0; i < message.length; i++) {
    const c = message.charAt(i);
    if (isLetter(c)) {
      if (isUpperCase(c)) {
        result += String.fromCharCode(
          ((c.charCodeAt(0) + key.toUpperCase().charCodeAt(j) - 2 * 65) % 26) +
            65
        ); // A: 65
      } else {
        result += String.fromCharCode(
          ((c.charCodeAt(0) + key.toLowerCase().charCodeAt(j) - 2 * 97) % 26) +
            97
        ); // a: 97
      }
    } else {
      result += c;
    }
    j = ++j % key.length;
  }
  return result;
}

//decripting vigenere cypher
function unVigenere(message, key) {
  let result = ''
 
  for (let i = 0, j = 0; i < message.length; i++) {
    const c = message.charAt(i)
    if (isLetter(c)) {
      if (isUpperCase(c)) {
        result += String.fromCharCode(90 - (25 - (c.charCodeAt(0) - key.toUpperCase().charCodeAt(j))) % 26)
      } else {
        result += String.fromCharCode(122 - (25 - (c.charCodeAt(0) - key.toLowerCase().charCodeAt(j))) % 26)
      }
    } else {
      result += c
    }
    j = ++j % key.length
  }
  return result
}

//checking if lettter is letter
function isLetter(str) {
  return str.length === 1 && str.match(/[a-zA-Z]/i);
}

//checking if letter is uppercase
function isUpperCase(character) {
  if (character === character.toUpperCase()) {
    return true;
  }
  if (character === character.toLowerCase()) {
    return false;
  }
}

//creating ceasar input
function createCeasar() {
  caesarShift.innerHTML = `
  <input type="number" id="num-input" onchange="clicky()">
  `;

  inputDiv.appendChild(caesarShift);
  caesarShift.placeholder = "Shift Amount";
  caesarShift.type = "number";
  caesarShift.addEventListener("change", clicky);
  caesarShift.addEventListener("keyup", clicky);
}

//creating vigenere input
function createVig() {
  vigShift.innerHTML = `
  <input type="text" id="key-input" onchange="clicky()">
  `;

  inputDiv.appendChild(vigShift);
  vigShift.placeholder = "Input Key";
  vigShift.type = "text";
  vigShift.addEventListener("change", clicky);
  vigShift.addEventListener("keyup", clicky);
  vigShift.style.display = "none";
}
