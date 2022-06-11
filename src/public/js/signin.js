import { expSignIn } from "./module.js"

//Dom elemenmts
const form = document.querySelector('form')
const inputs = form.querySelectorAll('input')
const button = document.querySelector('button')

const array = Object.values(expSignIn)
const newArray = []

function validation(){
    for (let index = 0; index < array.length; index++) {
        newArray.push(array[index].test(inputs[index].value))
    }
    if(newArray[0] && newArray[1] == true){
        return true
    } else{
        form.reset()
		newArray.splice()
    }
}

button.addEventListener('click', (e) => {
    validation();
    // error
	if (validation() == undefined){
		e.preventDefault()
		alert('invalid form')
	}
})