import {sendData , createElement , selector , selectAll} from "./api.js" 
import {validateFullName , validateEmail , validateMobile} from "./validate.js"  

let form = selector("form")
let formData = new FormData(form) 
let fileInput = selector("#avatar") 


const validation = (fn , targetObject, styles , text , cb ) => { 
    let {value , classList , nextElementSibling , parentNode} = targetObject 
    let {error , moderate , success} = styles
    if (fn(value).value !== null){
        classList.contains(error) ? classList.remove(error) : null  
        classList.add(success)
        if (nextElementSibling) nextElementSibling.remove() 
    }else {
        if (nextElementSibling) nextElementSibling.remove()
        let msg = createElement("p") 
        msg.className = "label" 
        let brother = nextElementSibling 
        msg.style.fontSize = ".75rem"
        msg.textContent = text 
        classList.contains(success) ? classList.remove(success) : null  
        classList.add(error) 
        parentNode.insertBefore(msg , targetObject.nextElementSibling)
    } 
    typeof cb === "function" ? cb()  : null 
} 
class ValidateRegistration {
    constructor () {
        this.inputs = Array.from(selectAll(".input"))
        this.addEvent() 
    } 
    handleBlur(event){
        let target = event.target 
        // let classList = target.classList 
        // let nextSibling = target.nextElementSibling
        // let parent = target.parentNode 
        // let parentSibling = parent.nextElementSibling
        // let grandParent = parent.parentNode 
        let styles = {
            success : "border-good-color"  , 
            error    : "border-error-color"  , 
            moderate : "border-moderate-color"  , 
        }
        try { 
            switch(target.id){
                case "name" :
                    validation(validateFullName , target, styles , "Your name must be alphanumeric")
                    break;
               
                case "email" : 
                   validation(validateEmail , target , styles , "Please , provide a valid email")
                   break;
                case "mobile" : 
                  validation(validateMobile , target , styles , "Please , provide a valid mobile")
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
        if (event.target.id === "submit"){
            event.preventDefault() 
            let data = {} 
            let controls  = Array.from(selectAll(".input")).filter(elem => elem.id !== "submit")
            
            if (controls.every(e => e.value !== "")){  
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
                let inputs = Array.from(selectAll(".data-field"))  
                // inputs.map((input , i) => { 
                //     formData.append(input.id , input.value) 
                // }) 
                formData.append("name" , selector("#name").value) 
                formData.append("mobile" , selector("#mobile").value) 
                formData.append("email" , selector("#email").value)
                formData.append("residence" , selector("#stateOfResidence").value) 
                formData.append("productName" , selector("#productName").value)
                formData.append("manufacturer" , selector("#manufacturer").value)
                formData.append("price" , selector("#price").value) 
                formData.append("description" , selector("#description").value) 
                for(let i = 0 ; i < fileInput.files.length ; i++){
                    formData.append(fileInput.name , fileInput.files[i]) 
                } 
                let {target} = event  
                //You can show an onload image while the file is processed
                fetch("/sell" , {   
                    method : "POST" , 
                    body : formData
                })
                .then(res => res.json()) 
                .then(res => { 
                    if (target.nextElementSibling) target.nextElementSibling.remove() 
                    let successMessage = createElement("p") 
                    successMessage.textContent = res.message 
                    target.parentNode.append(successMessage) 
                    // Array.from(selectAll("input")).filter(elem => elem.id !== "update") 
                    // .map(elem => { 
                    //     elem.value = "" 
                    //     if (elem.id === "avatar") {
                    //         elem.file = ""
                    //     }
                    // })
                })
                .catch(err => console.error(err))
            }else { 
                if (event.target.nextElementSibling) event.target.nextElementSibling.remove()
                let div = createElement("div") 
                let myBox = createElement("div")        
                div.className = "loader" 
                let span = createElement("span") 
                span.textContent = "Fill the form correctly , try again ..." 
                span.className = "label" 
                myBox.append(div , span)
                event.target.parentNode.append(myBox) 
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