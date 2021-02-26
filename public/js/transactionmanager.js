
import {sendData , putData , getData , deleteResource ,  selector , selectAll , createElement } from "./api.js"  
/**
 * Ensure that the username , email , phone number , account name , account number , 
 * bitcoin wallet is unique. Send request to the server while registration is ongion
 */

let productIdentifier = Array.from(selectAll(".products")) 
let shopIdentifier = Array.from(selectAll(".shops")) 
let rentIdentifier = Array.from(selectAll(".rents")) 
let tableBody = selector("tbody") 
const RegistrationModel = {
    validFormValue : {} 
}
class RegistrationView  { 
    constructor() {
        this.buttons = Array.from(this.getElements("button"))
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
    constructor(view , model) {
        this.view = new view()
        this.model = model
        this.addEvent() 
    }
    handleClick(event) {
        if (event.target.id === "addButton"){
            if(event.target.parentNode.lastChild.tagName === "P"){
                event.target.nextElementSibling.remove()
            }
            let items = [] 
            Array.from(selectAll(".checkProduct")).map((e , i) => {
                if (e.checked){ 
                    let product = productIdentifier[i].getAttribute("product-identifier")
                    let value = e.parentNode.previousSibling.firstElementChild.value 
                    let productQuantity = Number(e.parentNode.previousSibling.previousSibling.textContent)
                    if (!isNaN(value) && value !== "" && value !== null && value <= productQuantity){
                        items.push({
                            product : product , 
                            quantity : Number(value)
                        }) 
                    }
                }
            }) 
            if (items.length !== 0){ 
                
                sendData(`/celchin-admin/shop/add`  , {items})
                .then(res => {
                    setTimeout(() => {
                        window.location.replace("/celchin-admin/shop") 
                    } , 2000)
                })
                .catch(err => console.error(err))
            }
        } 
        if (event.target.id === "hideButton"){
            if(event.target.parentNode.lastChild.tagName === "P"){
                event.target.nextElementSibling.remove()
            }
            let items = [] 
            Array.from(selectAll(".checkShop")).map((e , i) => {
                if (e.checked){ 
                    let product = shopIdentifier[i].getAttribute("shop-identifier")
                    items.push(product)
                }
            }) 
            console.log(items) 
            sendData(`/celchin-admin/shop/toggle-status`  , {items})
            .then(res => {
                console.log(res.message)
                setTimeout(() => {
                    window.location.replace("/celchin-admin/shop") 
                } , 2000)
            })
            .catch(err => console.error(err))
        }
        if (event.target.id === "removeButton"){
            let items = [] 
            Array.from(selectAll(".checkShop")).map((e , i) => {
                if (e.checked){ 
                    let product = shopIdentifier[i].getAttribute("shop-identifier")
                    items.push(product)
                }
            }) 
            console.log(items) 
            sendData(`/celchin-admin/shop/delete`  , {items})
            .then(res => {
                setTimeout(() => {
                    window.location.replace("/celchin-admin/shop") 
                } , 2000)
            })
            .catch(err => console.error(err))
        }
        if (event.target.id === "topupButton"){
            if(event.target.parentNode.lastChild.tagName === "P"){
                event.target.nextElementSibling.remove()
            }
            let items = [] 
            Array.from(selectAll(".checkProduct")).map((e , i) => {
                if (e.checked){ 
                    let product = productIdentifier[i].getAttribute("product-identifier")
                    let value = e.parentNode.previousSibling.firstElementChild.value 
                    let productQuantity = Number(e.parentNode.previousSibling.previousSibling.textContent)
                    if (!isNaN(value) && value !== "" && value !== null){
                        items.push({
                            product : product , 
                            quantity : Number(value)
                        }) 
                    }
                }
            }) 
            console.log(items)
            if (items.length !== 0){ 
                sendData(`/celchin-admin/shop/top-up`  , {items})
                .then(res => {
                    console.log(res.message)
                    setTimeout(() => {
                        window.location.replace("/celchin-admin/shop") 
                    } , 2000)
                })
                .catch(err => console.error(err))
            }
        } 
        //Handling of Rental Feature within the application 
        if (event.target.id === "addHire"){
            event.preventDefault()
            if(event.target.parentNode.lastChild.tagName === "P"){
                event.target.nextElementSibling.remove()
            }
            let items = [] 
            let item = {}
            Array.from(selectAll(".checkProduct")).map((e , i) => {
                if (e.checked){ 
                    let product = productIdentifier[i].getAttribute("product-identifier")
                    let value = e.parentNode.previousSibling.firstElementChild.value 
                    let productQuantity = Number(e.parentNode.previousSibling.previousSibling.textContent)
                    if (!isNaN(value) && value !== "" && value !== null && value <= productQuantity){
                        item.product = product 
                        item.quantity = Number(value)
                    }
                }
            }) 
            Array.from(selectAll(".hire-field")).map((e , i) => {
                if (e.value.trim() !== null && e.value.trim() !== ""){
                    if (e.id === "price"){
                        item[`${e.id}`] = Number(e.value)
                    }else {
                        item[`${e.id}`] = e.value
                    }
                    
                }
            })
            items.push(item)
            if (items.length !== 0){ 
                sendData(`/celchin-admin/hire/add`  , {items})
                .then(res => {
                    console.log(res.message)
                    setTimeout(() => {
                        window.location.replace("/celchin-admin/hire") 
                    } , 10)
                })
                .catch(err => console.error(err))
            }
        } 
        if (event.target.id === "toggleHire"){
            if(event.target.parentNode.lastChild.tagName === "P"){
                event.target.nextElementSibling.remove()
            }
            let items = [] 
            Array.from(selectAll(".checkRent")).map((e , i) => {
                if (e.checked){ 
                    let product = rentIdentifier[i].getAttribute("rent-identifier")
                    items.push(product)
                }
            }) 
            console.log(items)
            sendData(`/celchin-admin/hire/toggle-status`  , {items})
            .then(res => {
                console.log(res.message)
                setTimeout(() => {
                    window.location.replace("/celchin-admin/hire") 
                } , 10)
            })
            .catch(err => console.error(err))
        }
        if (event.target.id === "removeHire"){
            if(event.target.parentNode.lastChild.tagName === "P"){
                event.target.nextElementSibling.remove()
            }
            let items = [] 
            Array.from(selectAll(".checkRent")).map((e , i) => {
                if (e.checked){ 
                    let product = rentIdentifier[i].getAttribute("rent-identifier")
                    items.push(product)
                }
            }) 
            console.log(items) 
            sendData(`/celchin-admin/hire/delete`  , {items})
            .then(res => {
                console.log(res.message)
                setTimeout(() => {
                    window.location.replace("/celchin-admin/hire") 
                } , 10)
            })
            .catch(err => console.error(err))
        }
        if (event.target.id === "hireNow"){
            let data = {} 
            event.preventDefault() 
            if(Array.from(selectAll(".hire")).every(input => input.value !== null && input.value !== "")){
                Array.from(selectAll(".hire")).map(input => {
                    data[`${input.id}`] = input.value
                })
            }
            console.log(data) 
            let hireForm = selector("#hireForm")
            let loader = createElement("p")
            loader.classList.add("loader") 
            hireForm.innerHTML = "" 
            let serverMessage = createElement("h3")
            serverMessage.textContent = "Processing your information..."
            hireForm.append(loader , serverMessage)
            sendData(`/hire/${hireForm.getAttribute("data-category")}/${hireForm.getAttribute("data-product")}`  , {data})
            .then(res => {
                loader.classList.remove("loader")
                serverMessage.textContent = res.message
            })
            .catch(err => console.error(err))
        }
    }
    addEvent() {
        this.view.buttons.map(button => {
            button.addEventListener("click" , this.handleClick)
        }) 
    }
} 

const app = new RegistrationController(RegistrationView , RegistrationModel)
