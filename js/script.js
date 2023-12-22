let currency = document.querySelectorAll('.opt')
let convertBtn = document.getElementById('convert-btn')
let inputAmount = document.getElementById('inputAmount')
let result = document.getElementById('result')

fetch('https://api.frankfurter.app/currencies')
.then(res=> res.json())
.then(data => displayDropDown(data))

function displayDropDown(data){
    let dataArr = Object.entries(data)
    for (let i = 0; i < dataArr.length; i++) {

    let curr = `<option value="${dataArr[i][0]}">${dataArr[i][0]}</option>`;
    currency[0].innerHTML += curr
    currency[1].innerHTML += curr
 
   }
}
convertBtn.addEventListener('click',()=>{
    let curr1 = currency[0].value
let curr2 = currency[1].value
let inputValue = inputAmount.value

if(inputValue === ""){
	alert('Currency value not valid')
}else if(curr1===curr2){
    alert('Select Different Currency')
}else{
    convert(curr1, curr2, inputValue)
}
})
inputAmount.addEventListener('change',(e)=>{
	if(e.target.value == ""){
		 result.style.display = "none";
	}
})


function convert(curr1, curr2, inputValue){
    const host = 'api.frankfurter.app';
fetch(`https://${host}/latest?amount=${inputValue}&from=${curr1}&to=${curr2}`)
  .then(resp => resp.json())
  .then((data) => {
    result.innerHTML= Object.values(data.rates)[0]
    result.style.display = "block";
  });
}
