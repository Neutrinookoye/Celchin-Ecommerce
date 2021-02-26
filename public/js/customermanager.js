
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

      
        if (event.target.id === "removeCustomer"){
            if(event.target.parentNode.lastChild.tagName === "P"){
                event.target.nextElementSibling.remove()
            }
            let items = [] 
            Array.from(selectAll(".check")).map((e , i) => {
                if (e.checked){ 
                    let product = productIdentifier[i].getAttribute("data-identifier")
                    items.push(product)
                }
            }) 
           
            if (items.length !== 0){ 
                sendData(`/celchin/customers/delete`  , {items})
                .then(res => {
                    console.log(res.message)
                    setTimeout(() => {
                        window.location.replace("/celchin/customers") 
                    } , 2000)
                })
                .catch(err => console.error(err))
            }
        }
        if (event.target.id === "editCustomer"){
            if(event.target.parentNode.lastChild.tagName === "P"){
                event.target.nextElementSibling.remove()
            }
            let items = [] 
            Array.from(selectAll(".check")).map((e , i) => {
                if (e.checked){ 
                    let product = productIdentifier[i].getAttribute("data-identifier")   
                    let customer = { 
                        id : productIdentifier[i].getAttribute("data-identifier")  , 
                        name : productIdentifier[i].textContent  , 
                        email : customerEmail[i].textContent , 
                        mobile : customerMobile[i].textContent
                    }

                    items.push(customer)
                }
            }) 
            console.log(items)
            if (items.length !== 0){ 
                sendData(`/celchin/customers/edit`  , {items})
                .then(res => {
                    console.log(res.message)
                    setTimeout(() => {
                        window.location.replace("/celchin/customers") 
                    } , 10)
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
