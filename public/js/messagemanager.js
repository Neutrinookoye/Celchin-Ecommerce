
import {sendData , putData , getData , deleteResource ,  selector , selectAll , createElement } from "./api.js"  
/**
 * Ensure that the username , email , phone number , account name , account number , 
 * bitcoin wallet is unique. Send request to the server while registration is ongion
 */

let productIdentifier = Array.from(selectAll(".customerName")) 

let customerEmail = Array.from(selectAll(".customerEmail")) 
let customerMobile = Array.from(selectAll(".customerMobile")) 
const RegistrationModel = {
    validFormValue : {} 
}
class RegistrationView  { 
    constructor() {
        this.buttons = Array.from(selectAll("button"))
    } 
    createElement(tag){
		return document.createElement(tag)  
	}
	getElement(target) {
		return document.querySelector(target) 
    } 
	getElements(target) {
		return document.querySelectorAll(target) 
	} 
} 

class RegistrationController {
    constructor( model) {
        this.view = Array.from(selectAll("button"))
        // this.model = model 
        this.addEvent() 
    }
    handleClick(event) { 
        event.preventDefault()
        if (event.target.id === "send"){  
            
            if (true){ 
                sendData(`/celchin-admin/messaging`  , {
                   to : selector("#to").value , 
                   subject : selector("#subject").value , 
                   content : selector("#content").innerHTML
                })
                .then(res => {
                    console.log(res.message)
                    // setTimeout(() => {
                    //     window.location.replace("/celchin-admin/messaging") 
                    // } , 2000)
                })
                .catch(err => console.error(err))
            }
        }
        
        
        
    }
    addEvent() {
        this.view.map(button => {
            button.addEventListener("click" , this.handleClick)
        }) 
    }
} 
new RegistrationController()
