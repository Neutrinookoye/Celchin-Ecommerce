"use strict"
import { validateFullName , 
     validateMobile , verifyPassword } from "./validate.js" 
import {selector , selectAll , createElement , sendData , getData } from "./api.js"  

class ValidateRegistration {
    constructor () {
        this.inputs = Array.from(selectAll(".wa"))
        this.addEvent() 
    } 
    handleBlur(event){
        let target = event.target 
        let classList = target.classList 
        let nextSibling = target.nextElementSibling
        let parent = target.parentNode 
        let parentSibling = parent.nextElementSibling
        let grandParent = parent.parentNode
        try { 
            switch(target.id){
                case "fullName" :
                    if (validateFullName(target.value.trim()).value !== null) {
                        classList.contains("border-error-color") ? classList.remove("border-error-color") : null 
                        classList.add("border-good-color")
                        if(nextSibling.tagName === "P") nextSibling.remove() 
                    }else {
                        if(nextSibling.tagName === "P") nextSibling.remove() 
                        let msg = createElement("p") 
                        msg.className = "label"
                        let sibling = target.nextElementSibling
                        msg.textContent = "Name should be only alphabets" 
                        classList.contains("border-good-color") ? classList.remove("border-good-color") : null 
                        classList.add("border-error-color") 
                        parent.insertBefore(msg ,  sibling)
                    }
                    break;
                case "walletNumber": 
                    console.log(30)
                    if (target.value.length === 42 && target.value.substr(0 , 2) === "0x") {
                        classList.contains("border-error-color") ? classList.remove("border-error-color") : null 
                        classList.add("border-good-color")
                        if(nextSibling.tagName === "P") nextSibling.remove() 
                    }else {
                        if(nextSibling.tagName === "P") nextSibling.remove() 
                        let msg = createElement("p") 
                        msg.className = "label"
                        let sibling = target.nextElementSibling
                        msg.textContent = "Your wallet number is not correct" 
                        classList.contains("border-good-color") ? classList.remove("border-good-color") : null 
                        classList.add("border-error-color") 
                        parent.insertBefore(msg ,  sibling)
                    }
                    break;
                    case "walletNumberC" : 
                        if (selector("#walletNumber").value === target.value && target.value) {
                            classList.contains("border-error-color") ? classList.remove("border-error-color") : null 
                            classList.add("border-good-color")
                            if(nextSibling.tagName === "P") nextSibling.remove() 
                        }else {
                            if(nextSibling.tagName === "P") nextSibling.remove() 
                            let msg = createElement("p") 
                            msg.className = "label"
                            let sibling = target.nextElementSibling
                            msg.textContent = "Your wallet number is not correct" 
                            classList.contains("border-good-color") ? classList.remove("border-good-color") : null 
                            classList.add("border-error-color") 
                            parent.insertBefore(msg ,  sibling)
                        }
                        break;
                case "phoneNumber" : 
                    if (validateMobile(target.value.trim()).value !== null) {
                        classList.contains("border-error-color") ? classList.remove("border-error-color") : null 
                        classList.add("border-good-color")
                        if(nextSibling.tagName === "P") nextSibling.remove() 
                    }else {
                        if(nextSibling.tagName === "P") nextSibling.remove() 
                        let msg = createElement("p") 
                        msg.className = "label"
                        let sibling = target.nextElementSibling
                        msg.textContent = "Please , provide a valid number" 
                        classList.contains("border-good-color") ? classList.remove("border-good-color") : null 
                        classList.add("border-error-color") 
                        parent.insertBefore(msg ,  sibling)
                    }
                   break;
                case "password" : 
                    if (validatePassword(target.value.trim()).value !== null) {
                        classList.contains("border-error-color") ? classList.remove("border-error-color") : null 
                        classList.add("border-good-color")
                        if(parentSibling.tagName === "P") parentSibling.remove() 
                    }else {
                        if(parentSibling.tagName === "P") parentSibling.remove() 
                        let msg = createElement("p") 
                        msg.className = "label"
                        let sibling = parent.nextElementSibling
                        msg.textContent = `Password must be 8 characters and above` 
                        classList.contains("border-good-color") ? classList.remove("border-good-color") : null 
                        classList.add("border-error-color") 
                        grandParent.insertBefore(msg ,  sibling)
                    }
                   break;
                case "confirmPassword" : 
                if (target.value === selector("#password").value && target.value !== "") {
                    classList.contains("border-error-color") ? classList.remove("border-error-color") : null 
                    classList.add("border-good-color")
                    if(parentSibling.tagName === "P") parentSibling.remove() 
                }else {
                    if(parentSibling.tagName === "P") parentSibling.remove() 
                    let msg = createElement("p") 
                    msg.className = "label"
                    let sibling = parent.nextElementSibling
                    msg.textContent = `Password does not match` 
                    classList.contains("border-good-color") ? classList.remove("border-good-color") : null 
                    classList.add("border-error-color") 
                    grandParent.insertBefore(msg ,  sibling)
                }
                   break;
                default : 
                  throw new Error() 
            }
            
        }catch(error){
            const errorConfig = {
                name : error.name ,
                msg  : error.message
            }
            console.error(errorConfig)
        }
        
    } 
    handleChange(event) { 
        let target = event.target
        if (target.id === "avatar"){
            let files = target.files[0]  
            let acceptedFile = ["image/jpeg" , "image/jpg" , "image/png" , "image/gif"] 
            let divisor = 1024*1024
            let size = Number(files.size)/divisor
            let type = files.type 
            console.log(type)
            if (acceptedFile.includes(type)  && size  < 10) {
                let reader = new FileReader() 
                reader.onload = function(event) {
                    // selector(".hide").style.display = "none"
                    // selector(".remove").style.display = "block"
                    let img = new Image() 
                    img.onload = function() { 
                        selector("#displayImage").textContent = ""
                        selector("#displayImage").appendChild(img)
                    }
                    img.src = event.target.result 
                    img.style.width = '150px'
                    img.style.height = '150px'
                    img.id = "previewImage"
                }
                reader.onerror = function(event) {
                    selector("#displayImage").textContent = "An error just occured"
                }
                reader.readAsDataURL(files) 
            }else{
                event.preventDefault() 
                  selector("#displayImage").textContent = "File size too large or not supported."
            }
        } 
    }
    
    handleSubmit(event){ 
        event.preventDefault() 
        let {target} = event
        if (target.id == "updateName"){  
            let data = {}
            let controls = Array.from(selectAll(".validate"))
            if (controls.every(e => e.value !== null)){  
                controls.map(e => {
                    data[`${e.id}`] = e.value 
                })
                if (target.nextElementSibling) target.nextElementSibling.remove()
                let sibling = createElement("div")
                sibling.textContent  = "" 
                let msg = createElement("p")  
                let div = createElement("div")
                div.className = "loader" 
                let span = createElement("span")
                span.textContent = "Processing..."
                span.className = "label"
                sibling.append(div , span)  
                target.parentNode.append(sibling)
                console.log(data)
                sendData("/profile/update" , {data})
                .then(res => {
                    
                    let sibling = event.target.nextElementSibling 
                    sibling.textContent = res.message
                })
                .catch(err => {
                    console.error(err)
                })
            }else { 
                if (target.nextElementSibling) target.nextElementSibling.remove()
                let sibling = createElement("div")
                sibling.textContent  = "" 
                let msg = createElement("p")  
                let div = createElement("div")
                div.className = "loader" 
                let span = createElement("span")
                span.textContent = "...Incorrect Details provided"
                span.className = "label"
                sibling.append(div , span)  
                target.parentNode.append(sibling)
            }
          
       } 
       if (event.target.id === "submitWallet"){  
        let data = {}
        let controls = Array.from(selectAll(".wa2"))
        if (controls.every(e => e.value.length === 42)){  
            controls.map(e => {
                data[`${e.id}`] = e.value 
            })
            if (target.nextElementSibling) target.nextElementSibling.remove()
            let sibling = createElement("div")
            sibling.textContent  = "" 
            let msg = createElement("p")  
            let div = createElement("div")
            div.className = "loader" 
            let span = createElement("span")
            span.textContent = "Processing..."
            span.className = "label"
            sibling.append(div , span)  
            target.parentNode.append(sibling)
            console.log(data)
            sendData("/profile/wallet" , {data})
            .then(res => {
                
                let sibling = event.target.nextElementSibling 
                sibling.textContent = res.message
            })
            .catch(err => {
                console.error(err)
            })
        }else { 
            if (target.nextElementSibling) target.nextElementSibling.remove()
            let sibling = createElement("div")
            sibling.textContent  = "" 
            let msg = createElement("p")  
            let div = createElement("div")
            div.className = "loader" 
            let span = createElement("span")
            span.textContent = "...Incorrect Details provided"
            span.className = "label"
            sibling.append(div , span)  
            target.parentNode.append(sibling)
        }
      
   }
        
    }
    addEvent(){
        this.inputs.map(input => {
            input.addEventListener("blur" , this.handleBlur)
            input.addEventListener("click" , this.handleSubmit) 
            
        })
        if (selector("#avatar")) selector("#avatar").addEventListener("change" , this.handleChange)
    }
} 
new ValidateRegistration() 

