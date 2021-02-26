import {sendData , getData , selector , selectAll , createElement } from "./api.js"   
import {validateEmail , validateFullName, validateMobile} from "./validate.js"

/*
 * @description Creates a new element of tag {tag} and attaches it to parent 
 * with the given text
 * @param {String} parent The parent element within the DOM
 * @param {String} tag 
 * @param {String} text 
 * @return {String} parent
*/
const createAndAttach = (parent , tag , text) => {
    let element = createElement(tag) 
    element.textContent = text 
    parent.append(element) 
    return parent
}
     
if (!window.localStorage) {
    selector("body").textContent = "You cannot write this exam except you update your browser to the latest release"
} 
let checkout = selector("#checkout") 
if (checkout){ 
    if (!localStorage.response){
        setTimeout(() => {
            window.location.replace(`/shop/Generators`) 
        } , 10)
    }
}


if (localStorage.response){
    let cartNumbers = Array.from(selectAll(".cart-number"))
    if (cartNumbers){ 
        cartNumbers.map(cartNumber => {
            cartNumber.textContent = JSON.parse(localStorage.response).response.reduce((a , b) => a + b.quantity , 0)
        })
    }
    let cartButtons = Array.from(selectAll(".cart-item")) 
    console.log(cartButtons.length)
    let responses = JSON.parse(localStorage.response).response 
    cartButtons.map((button , i) => {
        if (responses.find(response => response.name.includes(button.getAttribute("data-name")))){
            button.textContent = "Already in cart"
            
        }
    })
}

window.addEventListener("click" , e => { 
    if (e.target.classList.contains("cart-item")) {  
        e.preventDefault()
        let productName = e.target.getAttribute("data-name") 
        let productCode  = e.target.getAttribute("data-code") 
        e.target.textContent = "Updating cart...."
        let saveResponse = ((id , name , quantity ) => {
            try {
                if (localStorage.response) { 
                    let responses = JSON.parse(localStorage.response).response
                    let addResponse = ((code , name , amount ) => {
                        let checkRes = responses.find(res => res.id == code ) 
                        if (checkRes) { 
                            let idex =  responses.findIndex(res => res.id === checkRes.id) 
                            responses.splice(idex , 1)
                            responses.push({
                                id : id ,  
                                name : name , 
                                quantity : amount 
                            })
                             localStorage.response = JSON.stringify({response : responses})
                             return localStorage.response
                        }else{
                            responses.push({
                                id : id ,  
                                name : name , 
                                quantity : quantity 
                            })
                            localStorage.response = JSON.stringify({response : responses})
                            return localStorage.response
                        }
                    })(id , name , quantity)
                }else {
                    let responses =  [{
                        id : id ,  
                        name : name , 
                        quantity : quantity
                    }]
                    localStorage.response = JSON.stringify({response : responses})
                    return localStorage.response
                }
            }catch(error) {
                console.log(error.message)
            }
        })(productCode ,  productName , 1)
        e.target.textContent = "Product Added...."
        let cartNumber = selector(".cart-number") 
        if (cartNumber){
            cartNumber.textContent = JSON.parse(localStorage.response).response.reduce((a , b) => a + b.quantity , 0)
            
        }
    }
}) 
//Handling Update of our shopping cart 
window.addEventListener("load" , event => {
    let editableItems = Array.from(selectAll(".edit-cart")) 
    let result = selector("#totalItem") 
    // let result = Array.from(totalField.childNodes).map((e , i) => i === 2 )
    //console.log(result.textContent)
    editableItems.map(editField => {
        editField.addEventListener("change" , e => { 
           let previousTotal = editableItems.filter(input => input !== e).reduce((a , b) => a + Number(b.value.trim()) , 0) 
           console.log(previousTotal)
           let cartValue = e.target.value 
           let itemName  = e.target.getAttribute("data-name") 
           let itemCode  = e.target.getAttribute("data-code") 
           //Send a request to the database to ensure the value entered is not 
           // more than the value of the item in shop
           if (cartValue !== null && cartValue !== ""){
               //Now , update the item within the localstorage 
                e.target.value = Number(cartValue)  
                result.textContent = previousTotal
                let carts = JSON.parse(localStorage.response).response
                let currentItem = carts.findIndex(item => item.id == itemCode ) 
                // let idex =  responses.findIndex(res => res.id === checkRes.id) 
                carts.splice(currentItem , 1 )
                carts.push({
                    id : itemCode ,  
                    name : itemName , 
                    quantity : Number(cartValue) 
                })
                let cartNumber = selector(".cart-number") 
                if (cartNumber){
                    cartNumber.textContent = carts.reduce((a , b) => a + b.quantity , 0)
                    
                }
                localStorage.response = JSON.stringify({response : carts})
                return localStorage.response
           }
        })
        
    })
    
})
//Cart Item counter 

//Displaying our cart 
let cartRoot = selector("#cart-root") 

if (cartRoot){
    //Now , display the items in cart
    try {
        if (localStorage.response) {
            let products = JSON.parse(localStorage.response).response 
            if (products.length > 0){ 
                let table = createElement("table") 
                table.setAttribute("class" , "table table-responsive table-bordered")
                table.innerHTML = ` 
                    <thead>
                        <tr>
                            <th> S/N</th>
                            <th>Name </th>
                            <th>Quantity</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                ` 
                let tableBody  = createElement("tbody") 
                let tableFooter = createElement("tfooter")
                products.map((product , index) => {
                    let dataRow    = createElement("tr") 
                    //The field for productQuantity should be editable
                    let productQuantity = createElement("input") 
                    productQuantity.value = product.quantity 
                    productQuantity.setAttribute("class" , "edit-cart")
                    productQuantity.size = 1
                    productQuantity.setAttribute("data-code" , product.id) 
                    productQuantity.setAttribute("data-name" , product.name)
                    createAndAttach(dataRow , "td" , index + 1 ) 
                    
                    createAndAttach(dataRow , "td" , product.name) 
                    tableBody.append(dataRow)
                    let td = createElement("td") 
                    td.append(productQuantity) 
                    dataRow.append(td) 

                    //The field in the cart should be removed easily 
                    let removeButton = createElement("button") 
                    removeButton.setAttribute("class" , "btn btn-danger btn-sm removeButton") 
                    removeButton.innerHTML = `<i class="fa fa-remove"></i>` 
                    let buttonCell = createElement("td") 
                    buttonCell.append(removeButton)
                    dataRow.append(buttonCell)
                })
                let totalProductAdded = products.reduce((a , b) => a + b.quantity , 0) 
                console.log(products)
                //The footer of our table 
                let tFooterRow = createElement("tr") 
                tFooterRow.setAttribute("id" , "totalRow")
                createAndAttach(tFooterRow ,"th" , "") 
                // createAndAttach(tFooterRow ,"th" , "") 
                createAndAttach(tFooterRow ,"th" , "Total")
                let resultCell = createElement("th") 
                resultCell.setAttribute("id" , "totalItem") 
                resultCell.textContent = totalProductAdded 
                tFooterRow.append(resultCell)
                
                createAndAttach(tFooterRow ,"th" , "")
                tableBody.append(tFooterRow)
                table.append(tableBody) 
                //Create the checkout button 
                let checkOut = createElement("a")
                checkOut.type = "button" 
                checkOut.href = "/checkout" 
                checkOut.target = "_blank"
                checkOut.setAttribute("class" , "btn btn-primary bt-md mr-3") 
                checkOut.textContent = "Checkout"
                //Create the make inquiry button 
                let makeInquiry = createElement("a") 
                makeInquiry.type = "button" 
                makeInquiry.href = "/inquire" 
                makeInquiry.target = "_blank"
                makeInquiry.setAttribute("class" , "btn btn-inquire btn-md mr-3") 
                makeInquiry.innerHTML = `<i class="fa fa-cloud"></i> Inquire`
                //Empty the cart 
                let emptyCart = createElement("button") 
                emptyCart.type = "button" 
                emptyCart.setAttribute("class" , "btn btn-danger btn-md mr-3") 
                emptyCart.setAttribute("id" , "emptyCart")
                emptyCart.innerHTML = `<i class="fa fa-trash"></i> Empty Cart`
                cartRoot.append(table  , makeInquiry , emptyCart)
            }else {
                // createAndAttach(cartRoot , "p" , "No item in cart")
                setTimeout(() => {
                    window.location.replace(`/shop/Generators`) 
                } , 10)
            }
        }else {
            // createAndAttach(cartRoot , "p" , "No item in cart")
            setTimeout(() => {
                window.location.replace(`/shop/Generators`) 
            } , 10)
        }
    }catch(error) {
        console.log(error.message)
    }
}
//Emptying the cart 
let emptyCart = selector("#emptyCart") 
if (emptyCart){
    emptyCart.addEventListener("click" , event => {
        delete localStorage.response 
        setTimeout(() => {
            window.location.replace(`/shop/Generators`) 
        } , 10)
    })
}
//Removing an item from the cart 
const removeButtons = Array.from(selectAll(".removeButton")) 
if (removeButtons){
    removeButtons.map((button , i) => {
        button.addEventListener("click" , event => {
            let cartItems = Array.from(selectAll(".edit-cart")) 
            let cartCode = cartItems[i].getAttribute("data-code") 
            let carts = JSON.parse(localStorage.response).response
            let itemIndex = carts.findIndex(item => item.id == cartCode )  
            carts.splice(itemIndex , 1 )
            localStorage.response = JSON.stringify({response : carts})
            // return localStorage.response 
            setTimeout(() => {
                window.location.replace(`/cart`) 
            } , 10)
            
        })
    })
}
//Checking out from cart 
// Processing payment information 
let orderRoot = selector("#order-root") 
if (orderRoot){
    let products = JSON.parse(localStorage.response).response 
    let cartContainer = createElement("ul")
    cartContainer.setAttribute("class" , "list-unstyled")
    products.map((product , index) => { 
        const {quantity , name} = product
        let cartContent = quantity > 1 ? `${quantity} units of ${name}` : `${quantity} unit of ${name}`
        createAndAttach(cartContainer , "li" , cartContent)
    })
    orderRoot.append(cartContainer)
    selector("#makePayment").addEventListener("click" , event => {
        sendData("/orders" , {products})
        .then(res => {
            if (res.status){
                selector("body").textContent = "Your transaction was successful"
                delete localStorage.response
            }else {
                selector("body").textContent = "Problem with your card"
            }
        }).catch(err => {
            console.err(err)
        })
    })
}
// Making inquiry 
let inquireButton = selector("#inquire") 
if (inquireButton){ 
    if (!localStorage.response){
        setTimeout(() => {
            window.location.replace(`/shop`) 
        } , 10)
    }
    let products = JSON.parse(localStorage.response).response 
    let cartContainer = createElement("ul")
    cartContainer.setAttribute("class" , "list-unstyled")
    products.map((product , index) => { 
        const {quantity , name} = product
        let cartContent = quantity > 1 ? `${quantity} units of ${name}` : `${quantity} unit of ${name}`
        createAndAttach(cartContainer , "li" , cartContent)
    }) 
    selector("#inquire-root").append(cartContainer)
    inquireButton.addEventListener("click" , event => {
        event.preventDefault()
        let formFields = Array.from(selectAll(".ma")) 
        if (formFields.every(input => input.value !== null && input.value !== "")){
            let products = JSON.parse(localStorage.response).response 
            let inquireData = {} 
            //validateFunctions will hold all our functions for validating
            let validateFunctions = [validateEmail , validateFullName,  validateMobile] 
            // The respective funtion to validate the field will be gotten 

            let validating = validateFunctions.filter(func => 
                func.name.replace("validate" , " ").trim().charAt(0).toLocaleLowerCase() !== "e"
            ) 
            //Run a loop over each item within the form 
            formFields.map(field => {
                //Check if valid 
                if (field.id !== "address"  || field.id !== "phone" || validating[0](field.value).value){
                    //Attach it to our data to submit
                    inquireData[`${field.id}`] = field.value 
                }else if (field.id === "email"){
                    if (validateEmail(field.value).value){
                        inquireData[`${field.id}`] = field.value 
                    }else {
                        return 
                    }
                }else if (field.id === "phone"){
                    if (validateMobile(field.value).value){
                        inquireData[`${field.id}`] = field.value 
                    }else {
                        return 
                    }
                }else {
                    if (field.nextElementSibling.tagName === "P"){
                        field.nextElementSibling.remove()
                    }
                    //Don't submit the form and send messages to the user 
                    event.preventDefault() 
                    let warning = createElement("p") 
                    warning.textContent = `Fill your ${field.id} properly` 
                    field.parentNode.insertBefore(warning , field.nextElementSibling)
                    return 
                }
            })
            // console.log(inquireData)
            if (inquireData){
                inquireData.products = products 
                sendData("/inquiry" , inquireData)
                .then(res => {
                    if (res.status){
                        let alertMessage = createElement("div") 
                        alertMessage.innerHTML = `
                            <p class="alert alert-success alert-dismissible fad slow" role="alert">
                                <span class="alert-heading"> ${res.message} </span>
                            </p>`
                        event.target.parentNode.replaceChild(alertMessage , event.target)
                        delete localStorage.response
                    }else {
                        let alertMessage = createElement("div") 
                        alertMessage.innerHTML = `
                            <p class="alert alert-success alert-dismissible fad slow" role="alert">
                                <span class="alert-heading"> Please , a network error occured while trying to 
                                process your request. Try again or contact support </span>
                            </p>`
                        event.target.parentNode.replaceChild(alertMessage , event.target)
                    }
                }).catch(err => {
                    console.err(err)
                })
            }
        }else {
            console.log("Nothing to do")
            return 
        }
    })
    
} 

