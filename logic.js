const tempField = document.querySelector(".weather1");
const cityField = document.querySelector(".weather2 p");
const dateField = document.querySelector(".weather2 span");
const emojiField = document.querySelector(".weather3 img");
const weatherField = document.querySelector(".weather3 span");
const searchField = document.querySelector(".searchfield");
const form = document.querySelector("form");

let target = "Chandigarh";

const fetchData = async(target) => {

 try {
    let url = `https://api.weatherapi.com/v1/current.json?key=d04f434178b543948b1100331250407&q=${target}`;
    let response = await fetch(url);
    let data = await  response.json();
    console.log(data);

   const {
     current: {
        temp_c,
        condition:{text, icon},
     },
     location: {name,localtime},
   } = data;

   updateDom(temp_c , name,localtime , icon, text)



 } catch (error) {
    alert("Location Not Found");
 }

 }
 fetchData(target);

 function updateDom(temp, city, localtime ,emoji , text) {
    tempField.innerText = temp;
    cityField.innerText = city;
 
    // const exactTime = localtime.split(" ")[1];
    // const exactDate = localtime.split(" ")[0];
    // const exactDay = new Date(exactDate).getDay();
  

    // dateField.innerText = `${exactTime} - ${getday(exactDay)}   ${exactDate}`;

    const [exactDate, time24] = localtime.split(" ");
    let [hour, minute] = time24.split(":").map(Number);
    let ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    const exactTime = `${hour}:${minute.toString().padStart(2, '0')} ${ampm}`;

    const exactDay = new Date(exactDate).getDay();
    dateField.innerText = `${exactTime} - ${getday(exactDay)} ${exactDate}`;

    emojiField.src =  emoji
    weatherField.innerText = text;
 }

 function getday(num) {
   switch(num) {
    case 0: 
    return "Sunday";

    case 1: 
    return "Monday";

    case 2: 
    return "Tuesday";

    case 3: 
    return "Wednesday";

    case 4: 
    return "Thursday";

    case 5: 
    return "Friday";

    case 6: 
    return "Saturday";

    default:
     return " Day not exist";
   }
  
 }

 form.addEventListener("submit", (e)=>{

    e.preventDefault()
    target= searchField.value;
    fetchData(target) ;

 })