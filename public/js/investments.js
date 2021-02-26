"use strict"

import {selector , selectAll , createElement , sendData , getData } from "./api.js" 
let investmentDetails = {}
class ValidateRegistration {
    constructor () {
        this.inputs = Array.from(selectAll("input"))
        this.addEvent() 
    } 
    handleBlur(event){
        let target = event.target 
        if (target.id === "amount"){ 
            // Working on Javascript Date 
            let value = Number(target.value.trim()) 
            let date = new Date() 
            date.setDate(date.getDate() + 1) // Sets the date by one day , we can start from here in terms of initiation 
            //let investmentStartDate = date.getDate() 
            let investmentDays = [] //[date.toLocaleDateString()]  
            let validDays = [1 , 2 , 3 , 4 , 5]
            for ( let i = 0 ; investmentDays.length <= 14 ; i++){  
                let date = new Date() 
                let n = date.setDate(date.getDate() + i) 
                let today = new Date(n) 
                //console.log(i , today.getDay())
                if (validDays.includes(today.getDay())){ 
                    investmentDays.push(today.getTime())
                    //console.log(today.getDay() , today ,  i)
                }
            } 
            let startDate = investmentDays[0] , 
            firstWithdrawDate = new Date(investmentDays[7]) , 
            lastWithdrawDate  = investmentDays[investmentDays.length - 1] ,  
            expectedAmount = value + 0.5*value , 
            collectFirst = 0.5*value - 0.25*value ,
            balance = expectedAmount - collectFirst
            if (target.value.trim()){  
                let nextSibling  = target.nextElementSibling
                if (nextSibling.tagName === "DIV" ) nextSibling.remove()
                let extraInformation = createElement("div") 
                extraInformation.innerHTML = ` 
                    <label for="amount to collect"  class="label">To withdraw</label>
                    <input class="input validate pad-input input-m-b-1 input-border-faint" value=${expectedAmount} disabled> 
                    <label for="amount to collect"  class="label">First Withdraw Date</label>
                    <input type="text" class="input validate pad-input input-m-b-1 input-border-faint" value=${firstWithdrawDate.toLocaleDateString()} disabled> 
                    <label for="amount to collect"  class="label">First Withdraw Amount</label>
                    <input type="text" class="input validate pad-input input-m-b-1 input-border-faint" value=${collectFirst} disabled> 
                    <label for="amount to collect"  class="label">Last Withdraw Date</label>
                    <input type="text" class="input validate pad-input input-m-b-1 input-border-faint" value=${lastWithdrawDate} disabled> 
                    <label for="amount to collect"  class="label">Last Withdraw Amount</label>
                    <input type="text" class="input validate pad-input input-m-b-1 input-border-faint" value=${balance} disabled>
                `
                target.parentNode.insertBefore(extraInformation , target.nextElementSibling)
            } 
            investmentDetails = {
                amountInvested : value , 
                amountToWithdraw : expectedAmount , 
                investmentCountDays : investmentDays  , 
                firstWithdrawDate : firstWithdrawDate , 
                investmentStartDate : startDate , 
                amountToCollectFirst : collectFirst , 
                lastWithdrawDate : lastWithdrawDate , 
                amountToCollectLast : balance 
            }  
            console.log(investmentDetails) 
            console.log(target.nextElementSibling)
        }else {
            console.log(30)
        } 

    } 
    handleSubmit(event){ 
        let target = event.target
        if (target.type === "submit"){ 
            event.preventDefault() 
            if (investmentDetails && selector("#amount").value !== "" && typeof(Number(selector("#amount").value)) === "number"){  
             
            let sibling = createElement("div")
            sibling.textContent  = "" 
            let msg = createElement("p")  
            let div = createElement("div")
            div.className = "loader" 
            let span = createElement("span")
            span.textContent = "...Processing"
            span.className = "label"
            sibling.append(div , span) 
            target.parentNode.append(sibling)
            // sendData("/signup" , {data})
            // .then(res => {
                
            //     let sibling = event.target.nextElementSibling 
            //     sibling.textContent = res.message
            // })
            // .catch(err => {
            //     console.error(err)
            // })
          }else {
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
        console.log("Hello")
        this.inputs.map(input => {
            input.addEventListener("blur" , this.handleBlur)
            input.addEventListener("click" , this.handleSubmit) 
        })
    }
} 
new ValidateRegistration() 