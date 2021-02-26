

import {selector , selectAll , sendData , createElement} from "./api.js" 
import {validateFullName ,validateEmail ,validateName , validateMobile ,  validatePassword} from "./validate.js" 

//let personInfoTabTrigger = Array.from(document.querySelectorAll()) 
const  tag = /(<([a-zA-Z0-9]+)>?)|(<\/([a-zA-Z0-9]+)>?)/g  
let removeTag = (content , replacement , pattern) => content.replace(pattern , replacement)  

const addClass = (elem , tab ,  className , linkClass) => {
    if (!elem.classList.contains(className)) {
       elem.classList.add(className)
       tab.classList.add(linkClass)
       return elem
    }
    return false
}

const revealContent = (hiddenFields , tabTriggers ,  activeContent , activeLink) => {
    tabTriggers.map((field , i , arr) => {
        field.addEventListener("click" , e => {
            e.preventDefault() 
            arr.filter((a , j) => j !== i).map(a => a.classList.remove(activeLink)) 
            hiddenFields.filter((c , j) => j !== i).map(c => c.classList.remove(activeContent)) 
            addClass(hiddenFields[i] , field , activeContent , activeLink)
        })
    }) 
    //Handling Next Button 
    Array.from(document.querySelectorAll(".next")).map((e , i) => { 
        e.addEventListener("click" , e => { 
            let indexOfCurrentContent = hiddenFields.findIndex(e => e.classList.contains(activeContent))
            tabTriggers.map(a => a.classList.remove(activeLink)) 
            hiddenFields.map(c => c.classList.remove(activeContent))

            e.preventDefault() 

            hiddenFields[indexOfCurrentContent + 1].classList.add(activeContent) 
            tabTriggers[indexOfCurrentContent + 1].classList.add(activeLink) 
            console.log(indexOfCurrentContent)
        })
    })
    //Handling Previous Button 
    Array.from(document.querySelectorAll(".previous")).map((e , i) => { 
        e.addEventListener("click" , e => { 
            let indexOfCurrentContent = hiddenFields.findIndex(e => e.classList.contains(activeContent))

            tabTriggers.map(a => a.classList.remove(activeLink)) 
            hiddenFields.map(c => c.classList.remove(activeContent))

            e.preventDefault() 

            hiddenFields[indexOfCurrentContent - 1].classList.add(activeContent) 
            tabTriggers[indexOfCurrentContent - 1].classList.add(activeLink) 
           
        })
    })
}  

let tabs         = Array.from(document.querySelectorAll(".person-info-reveal")) 
let contents     = Array.from(document.querySelectorAll(".person-tab")) 
//Reveal Individual Detail 
revealContent(contents , tabs , "active-info" , "active-info-tab")

// Reveal Corporate Detail 
let corporateTabs         = Array.from(document.querySelectorAll(".corporate-info-reveal")) 
let corporateContents     = Array.from(document.querySelectorAll(".corporate-tab")) 
revealContent(corporateContents , corporateTabs , "active-corporate-info" , "active-corporate-info-tab") 


//Handling Blur Events on the input fields onst 

const blurScope = {
    email : "Please , provide a valid email" , 
    name : "Please  , ensure you provide a valid Nigerian Name" ,
    userName : "Username can be alphanumeric" , 
    password : "Password must be 8 characters or more" , 
    phone : "Provide a valid Nigerian Number"
}  

let userInfo = {} 
userInfo.isIndividual = true
let userIndicator = []

const validateInput = (target , cb , errorClass , successClass , message) => { 
    let {value , id , classList , nextElementSibling , parentNode} = target 
    if (cb(value).value !== null){ 
        userInfo[`${id}`] = value
        classList.contains(errorClass) ? classList.remove(errorClass) : null 
        classList.add(successClass) 
        if(nextElementSibling.tagName === "P") nextElementSibling.remove()
    }else {
        if(nextElementSibling.tagName === "P") nextElementSibling.remove()
        let msg = document.createElement("p") 
        msg.className = "label" 
        let sibling = target.nextElementSibling 
        msg.textContent = message 
        classList.contains(errorClass) ? classList.remove(errorClass) : null 
        classList.toggle(errorClass) 
        parentNode.insertBefore(msg , sibling)
    }
}
const handleBlur = (targets) => {
    targets.map(target => {
        target.addEventListener("blur" , e => { 
            let {id , value} = target 
            let classList = target.classList 
            let nextSibling = target.nextElementSibling
            let parent = target.parentNode 
            let parentSibling = parent.nextElementSibling
            switch(id){
                case "individualName" : 
                  validateInput(target , validateFullName , "error" , "success" , blurScope.name) 
                  break;
                // case "individualTin" : 
                //   userInfo[`${id}`] = value
                //   break; 
                case "individualContactEmail" : 
                  validateInput(target , validateEmail , "error" , "success" , blurScope.email) 
                  break;
                case "individualPhone" : 
                  validateInput(target , validateMobile , "error" , "success" , blurScope.phone) 
                  break;
                case "userName" : 
                  validateInput(target , validateName, "error" , "success" , blurScope.userName) 
                  break; 
                case "userEmail" : 
                  validateInput(target , validateEmail, "error" , "success" , blurScope.email)
                  break;
                case "userPassword" : 
                  validateInput(target , validatePassword, "error" , "success" , blurScope.password) 
                  break;
                case "confirmPassword" : 
                    if (value === selector("#userPassword").value && value !== "") {
                        userInfo[`${id}`] = value
                        classList.contains("error") ? classList.remove("error") : null 
                        classList.add("success")
                        if(target.nextElementSibling.tagName === "P") target.nextElementSibling.remove()
                    }else {
                        if(target.nextElementSibling.tagName === "P") target.nextElementSibling.remove()
                        let msg = createElement("p") 
                        msg.className = "label"
                        let sibling = parent.nextElementSibling
                        msg.textContent = `Password does not match` 
                        classList.contains("success") ? classList.remove("success") : null 
                        classList.add("error") 
                        target.parentNode.insertBefore(msg , target.nextElementSibling)
                    }
                    break; 
                    
                default : 
                  target.classList.add("success")
                  userInfo[`${id}`] = value
            }
            
        })
    })
    
}
const blurInputs = Array.from(selectAll(".i") )
handleBlur(blurInputs)


//Handling Submit Events 
const handleSubmit = (target , inputs , dataToSend , url) => {
    target.addEventListener("click" , e => {
        e.preventDefault() 
        
        if (inputs.every(input => input.classList.contains("success"))){
            console.log(dataToSend)
            sendData(url , dataToSend) 
            .then(res => { 
                console.log(res) 
                let form  = target.parentNode.parentNode 
                if (form.lastChild.tagName === "P") form.lastChild.remove()
                let m = createElement("p") 
                m.textContent = res.message
                form.append(m) 
                if (res.ework){ 
                    setTimeout(() => {  
                        location.replace("/success")
                    } , 5000)
                }
            }) 
            .catch(err => console.error(err))
        }else { 
            let form  = target.parentNode.parentNode 
            if (form.lastChild.tagName === "P") form.lastChild.remove()
            let m = createElement("p") 
            m.textContent = "Please , fill the form correctly" 
            form.append(m)
        }
    })
} 
let submitTarget = selector("#userSubmit")
handleSubmit(submitTarget , blurInputs , userInfo , "http://localhost:4500/register") 

