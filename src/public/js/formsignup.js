import {expSignUp} from './module.js'

// Dom elements
const form = document.querySelector('form')
const inputs = document.querySelectorAll('input')
const button = document.querySelector('#button-submit')

//Convert array
const array = Object.values(expSignUp)
const newArray = []

function validation(){
	for (let index = 0; index < array.length; index++) {
		newArray.push(array[index].test(inputs[index].value))
	}
	if (newArray[0] && newArray[1] && newArray[2] == true){
		return true
	} else{
		form.reset()
		newArray.splice()
	}
}

button.addEventListener('click', (e)=> {
	validation();
	if (validation() == undefined){
		e.preventDefault()
		alert('invalid form')
	}
})