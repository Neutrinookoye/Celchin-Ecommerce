"use strict"

import {selector , selectAll , createElement , sendData , getData } from "./api.js"    

let submitButton = selector("#submit") 
submitButton.addEventListener("click" , e => {
    e.preventDefault() 
    if (e.target.previousElementSibling) e.target.previousElementSibling.remove() 
    let sibling = createElement("p")  
    sibling.textContent = "Validating submitted data. This may take awhile..." 
    e.target.parentNode.append(sibling , e.target)
    let data = {
        email : selector("#email").value.trim() , 
        password : selector("#password").value.trim() , 
    } 
    sendData("/celchin-admin" , { data }) 
        .then(res => {
            if (res.valid){
                sibling.textContent = "Validation was ok. Redirecting to dashboard" 
                setTimeout(() => {
                    location.replace("/celchin-admin/dashboard")
                } , 1500)
            }else {
                sibling.textContent = "Incorrect details provided" 
            }
        }).catch(err => {
            console.error(err)
        })
}) 