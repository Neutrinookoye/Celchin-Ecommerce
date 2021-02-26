const h1 = document.querySelector("#h1")
const a1 = document.querySelectorAll(".a1")
const h2 = document.querySelector("#h2")
const a2 = document.querySelectorAll(".a2")
const h3 = document.querySelector("#h3")
const a3 = document.querySelectorAll(".a3")
const h4 = document.querySelector("#h4")
const a4 = document.querySelectorAll(".a4")


h1.addEventListener('click' , event => {
    for(let i = 0 ; i < a1.length ; i++) {
        if(a1[i].classList.contains('d-none')){
            a1[i].classList.toggle('d-block')
        }
    }
})


h2.addEventListener('click' , event => {
    for(let i = 0 ; i < a2.length ; i++) {
        if(a2[i].classList.contains('d-none')){
            a2[i].classList.toggle('d-block')
        } 
    }
})


h3.addEventListener('click' , event => {
    for(let i = 0 ; i < a3.length ; i++) {
        if(a3[i].classList.contains('d-none')){
            a3[i].classList.toggle('d-block')
        } 
    }
})


h4.addEventListener('click' , event => {
    for(let i = 0 ; i < a4.length ; i++) {
        if(a4[i].classList.contains('d-none')){
            a4[i].classList.toggle('d-block')
        } 
    }
})