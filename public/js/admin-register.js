"use strict"
import { validateEmail , validatePassword , verifyPassword} from "./validate.js" 
import {selector , selectAll , createElement , sendData , getData } from "./api.js"  


const validation = (fn , targetObject, styles , text , cb ) => { 
    let {value , classList , nextElementSibling , parentNode} = targetObject 
    let {error , moderate , success} = styles
    if (fn(value).value !== null){
        classList.contains(error) ? classList.remove(error) : null  
        classList.add(success)
        if (parentNode.nextElementSibling.tagName === "P") parentNode.nextElementSibling.remove() 
    }else {
        if (parentNode.nextElementSibling.tagName === "P") parentNode.nextElementSibling.remove()
        let msg = createElement("p") 
        msg.className = "label" 
        let brother = parentNode.nextElementSibling 
        msg.textContent = text 
        classList.contains(success) ? classList.remove(success) : null  
        classList.add(error) 
        parentNode.parentNode.insertBefore(msg , brother)
    } 
    typeof cb === "function" ? cb()  : null 
} 


class ValidateRegistration {
    constructor () {
        this.inputs = Array.from(selectAll("input")).filter(e => e.id !== "course") 
        this.addEvent() 
    } 
    handleBlur(event){
        let target = event.target 
        let classList = target.classList 
        let nextSibling = target.nextElementSibling
        let parent = target.parentNode 
        let parentSibling = parent.nextElementSibling
        let grandParent = parent.parentNode 
        let styles = {
            success : "border-good-color"  , 
            error    : "border-error-color"  , 
            moderate : "border-moderate-color"  , 
        }
        try { 
            switch(target.id){
                case "password" :
                    validation(validatePassword , target, styles , "Weak password")
                    break;
               
                case "email" : 
                   validation(validateEmail , target , styles , "Please , provide a valid email")
                   break;
                case "confirmPassword" : 
                   if(target.value !== "" && target.value === selector("#password")){
                       console.log("Very good")
                   }else {
                       throw new Error()
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
    
    handleSubmit(event){
        if (event.target.type === "submit"){
          event.preventDefault() 
          let data = {} 
          let controls  = Array.from(selectAll(".validate"))
          if (controls.every(e => e.classList.contains("border-good-color"))){  
            controls.map(e => {
                data[`${e.id}`] = e.value 
            })
            if (event.target.nextElementSibling) event.target.nextElementSibling.remove()
            let div = createElement("div") 
              let myBox = createElement("div")        
              div.className = "loader" 
              let span = createElement("span") 
              span.textContent = "...Processing"
              span.className = "label" 
              myBox.append(div , span)
              event.target.parentNode.append(myBox) 
               
            sendData("/celchin-admin/register" , {data})
            .then(res => {
                
                let sibling = event.target.nextElementSibling 
                sibling.textContent = res.message 
                if (res.ework){ 
                    location.replace(`/celchin-admin/dashboard`)
                }
               
            })
            .catch(err => {
                console.error(err)
            })
          }else { 
              if (event.target.nextElementSibling) event.target.nextElementSibling.remove()
            //   let sibling = event.target.nextElementSibling 
            //   sibling.textContent  = ""
              let div = createElement("div") 
              let myBox = createElement("div")        
              div.className = "loader" 
              let span = createElement("span") 
              span.textContent = "Fill the form correctly , try again ..." 
              span.className = "label" 
              myBox.append(div , span)
              event.target.parentNode.append(myBox) 
              console.log(event.target.nextElementSibling)
          }
          
       }
        
    }
    addEvent(){
        this.inputs.map(input => {
            input.addEventListener("blur" , this.handleBlur)
            input.addEventListener("click" , this.handleSubmit) 
           
        })
    }
} 
new ValidateRegistration() 

