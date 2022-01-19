const main  = document.getElementById('main');
const addUser  = document.getElementById('add-user');
const sort  = document.getElementById('sort');
const double  = document.getElementById('double');
const showMillionaires  = document.getElementById('show-millionaires');
const calculateWealth  = document.getElementById('calculate-wealth');
const totalWealthElement = document.querySelector('.total-wealth')
let data = [];
getRandomUser();
getRandomUser();
getRandomUser();

// Fetch random user and add money

async function getRandomUser(){
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();
    // console.log(data)

    const user = data.results[0];
    // console.log(user)

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money : Math.floor(Math.random()*1000000)
    }
   addData(newUser)   
}
// double money
function doubleMoney(){
   
    data = data.map((user)=>{
        return {...user, money : user.money *2}
        
    }) ;
    updateDOM();
   }
   //    sorting by Wealth
function sortByWealth(){
    data.sort((a, b) => 
        b.money - a.money
        )
        updateDOM();  
}

// filter only millionaire
function showMillionaire(){
    data = data.filter((item)=>
        item.money > 1000000
    )
    updateDOM();
}

// total wealth
function totalWealth(){
    const wealth = data.reduce((acc, user)=>acc += user.money,0);
    const elementTwo = document.createElement('div');
    elementTwo.innerHTML = `<h2><strong>TotalWealth</strong> $${convertMoney(wealth)}</h2>`;
    main.appendChild(elementTwo)
}

function addData(obj){
    data.push(obj)
    updateDOM();
}

// update dom

function updateDOM(providedData = data){
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';
    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> $${convertMoney(item.money)}`;

        main.appendChild(element)
    })
}

// numbers to money
 
function convertMoney(number){
    return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}


addUser.addEventListener('click',getRandomUser);
double.addEventListener('click',doubleMoney);
sort.addEventListener('click',sortByWealth);
showMillionaires.addEventListener('click',showMillionaire);
calculateWealth.addEventListener('click',totalWealth);

