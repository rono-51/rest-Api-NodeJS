const hamburger = document.querySelector('#hamburger')
const navigation = document.querySelector('#navigation')
const buttonImg = document.querySelector('#button-img')
const profile = document.querySelector('#card-img')

hamburger.addEventListener('click' , () => {
    if(navigation.classList[navigation.classList.length-1] == 'ghost') {
        hamburger.firstElementChild.classList.replace('fa-bars','fa-times')
        navigation.classList.remove('ghost')
    } else{
        navigation.classList.add('ghost')
        hamburger.firstElementChild.classList.replace('fa-times','fa-bars')
    }
})

buttonImg.addEventListener('click', () => {
    profile.classList.toggle('ghost')
});