
import {sendData , putData , getData , deleteResource ,  selector , selectAll , createElement } from "./api.js"  
/**
 * Ensure that the username , email , phone number , account name , account number , 
 * bitcoin wallet is unique. Send request to the server while registration is ongion
 */

let productIdentifier = Array.from(selectAll(".name")) 

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

        if (event.target.id === "clearButton"){
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
            console.log(items)
            if (items.length !== 0){ 
                sendData(`/admin/orders/clear`  , {items})
                .then(res => {
                    console.log(res.message)
                    setTimeout(() => {
                        window.location.replace("/admin/orders") 
                    } , 2000)
                })
                .catch(err => console.error(err))
            }
        } 
        if (event.target.id === "clearHire"){
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
                sendData(`/celchin-admin/inquiries/clear`  , {items})
                .then(res => {
                    console.log(res.message)
                    setTimeout(() => {
                        window.location.replace("/celchin-admin/transactions/inquiry") 
                    } , 2000)
                })
                .catch(err => console.error(err))
            }
        } 
        if (event.target.id === "deleteButton"){
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
            console.log(items)
            if (items.length !== 0){ 
                sendData(`/admin/orders/delete`  , {items})
                .then(res => {
                    console.log(res.message)
                    setTimeout(() => {
                        window.location.replace("/admin/orders") 
                    } , 2000)
                })
                .catch(err => console.error(err))
            }
        }
        if (event.target.id === "deleteHire"){
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
                sendData(`/celchin-admin/inquiries/delete`  , {items})
                .then(res => {
                    console.log(res.message)
                    setTimeout(() => {
                        window.location.replace("/celchin-admin/transactions/inquiry") 
                    } , 2000)
                })
                .catch(err => console.error(err))
            }
        }
        if (event.target.id === "clearRent"){
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
            console.log(items)
            if (items.length !== 0){ 
                sendData(`/celchin-admin/rentals/clear`  , {items})
                .then(res => {
                    console.log(res.message)
                    setTimeout(() => {
                        window.location.replace("/celchin-admin/transactions/hire") 
                    } , 10)
                })
                .catch(err => console.error(err))
            }
        }
        if (event.target.id === "deleteRent"){
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
                sendData(`/celchin-admin/rentals/delete`  , {items})
                .then(res => {
                   
                    setTimeout(() => {
                        window.location.replace("/celchin-admin/transactions/hire") 
                    } , 10)
                })
                .catch(err => console.error(err))
            }
        }
        if (event.target.id === "removeSell"){
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
                sendData(`/celchin-admin/sellers/delete`  , {items})
                .then(res => {
                   
                    // setTimeout(() => {
                    //     window.location.replace("/celchin-admin/sellers") 
                    // } , 10)
                })
                .catch(err => console.error(err))
            }
        }
        if (event.target.id === "clearSell"){ 
            console.log("45")
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
                sendData(`/celchin-admin/sellers/clear`  , {items})
                .then(res => {
                   
                    setTimeout(() => {
                        window.location.replace("/celchin-admin/sellers") 
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
