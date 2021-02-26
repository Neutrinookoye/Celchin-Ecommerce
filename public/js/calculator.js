let selector = e => document.querySelector(e) 
let amount = selector("#amounted") 
let annualPay = selector("#cai") 
let liability = selector("#liability")
let compute = selector("#submit") 
let consolidateAnnualPay 
let rateCheck 
const ReliefFactor = 200000
let relief 
let taxableIncome 
const TaxConstant = 300000 
let due = 0 
let add = selector("#add") 
let createElement = e => document.createElement(e)        
let control = selector("#control") 

let extraRelief = []
add.addEventListener("click" , e => { 
    
    let addArea = createElement("div") 

    addArea.setAttribute("class" , "flex justify-content-between m-b-2 flexes" )
    let select = createElement("select") 
    select.setAttribute("class" , "input input-border-faint") 

    select.innerHTML = 
    
    ` 
    <option value="N">NHIS</option>
    <option value="P">Pension</option>` 
    let theAmount = createElement("input") 
    theAmount.type = "text"
    theAmount.setAttribute("class" , "input input-border-faint pad-10 deductibleType" ) 
    theAmount.placeholder = "Amount"
    let theRate = createElement("input") 
    theRate.type = "text"
    theRate.setAttribute("class" , "input input-border-faint pad-10 deductibleBalance") 
    theRate.placeholder = "Rate"
    let theBalance = createElement("input") 
    theBalance.type = "text"
    theBalance.setAttribute("class" , "input input-border-faint pad-10 deductibleTotal") 
    theBalance.placeholder = "Relief"
    addArea.append(select , theAmount ,theRate , theBalance ) 
    control.append(addArea ) 
    //Select all the elements with a class called input 
    let allInputs = Array.from(document.querySelectorAll(".input")) 
    
    allInputs.map((input , i) => { 
        
        input.addEventListener("blur" , e => { 
            let {target} = e  
            // If the target is the relief amount
            if (target.classList.contains("deductibleType")){
                console.log(target.value) 
    
            } 
            if (target.classList.contains("deductibleBalance")){
                let amount = Number(target.previousElementSibling.value) 
                let relief = amount*12*Number(target.value)
                target.nextElementSibling.value = relief.toFixed(2) 
                extraRelief.push(relief)
                console.log(extraRelief)

            }
        }) 
        
    })
}) 


control.addEventListener("blur" , e => {
    console.log(e.target.tagName)
}) 
//Handling Events on the relief 
let allInputs = Array.from(document.querySelectorAll(".input")) 
allInputs.map((input , i) => {
    input.addEventListener("blur" , e => { 
        let {target} = e  
        if (target.classList.contains("deductibleType")){
            console.log(target.value)
        }
    })
}) 

let deductible = Array.from(document.querySelectorAll(".deductible")) 
deductible.map(m => {
    m.addEventListener("click" , e => { 
        let  { target} = e 
        if (target.id === "Y") {
           selector("#control").classList.toggle("d-nothing") 
           Array.from(document.querySelectorAll("button")).map(e => e.classList.toggle("d-nothing"))
           selector(".comot").classList.toggle("d-nothing")
        }else {
            selector(".comot").classList.toggle("d-nothing")
        }
        //console.log(e.target.value)
    })
})

amount.addEventListener("blur" , e => {
    e.target.value = e.target.value 
    amount = amount.value
    consolidateAnnualPay = amount*12 
    rateCheck = 0.01*consolidateAnnualPay 
    if (rateCheck < ReliefFactor) {
        relief = ReliefFactor + 0.2*consolidateAnnualPay
    }else {
        relief = 0.1*consolidateAnnualPay + 0.2*consolidateAnnualPay
    } 
   
    // NHIF relief factor 
    let nhf = 0.025*consolidateAnnualPay 
    let pensionRelief = 0.075*consolidateAnnualPay 
    let x = extraRelief.reduce((a , b) => a  + b , 0)
    let cumulativeRelief = relief + extraRelief.reduce((a , b) => a  + b , 0)
    taxableIncome = Number(consolidateAnnualPay - cumulativeRelief )  
    console.log(`The consolidate relief is ${relief}`) 
    console.log(`The nhf relief is ${nhf}`) 
    console.log(`The pension relief is ${pensionRelief}`) 
    console.log(`The relief is ${x}` , nhf + pensionRelief) 
    console.log(`The taxable income is ${taxableIncome}`) 
    if (taxableIncome < TaxConstant) {
        due += 0.01*consolidateAnnualPay 
        console.log(`Yes`) 
    }else if (taxableIncome >= TaxConstant) {  
        let sum = 0
        for ( let i = 1 ; taxableIncome > 0 ;  i++){  
            if (i === 1) { 
                if ( taxableIncome >= TaxConstant){
                    due += 0.07*300000
                    taxableIncome = taxableIncome - TaxConstant 
                    console.log(`The due  is ${due} for first 300000`) 
                }else {
                    due += 0.11*taxableIncome 
                    break;
                }
                 
            }else if (i === 2) { 
                if ( taxableIncome >= TaxConstant){
                    due += 0.11*300000 
                    console.log(0.11*300000) 
                    console.log(`The due  is ${0.11*300000} for sec 300000`)
                    taxableIncome = taxableIncome - TaxConstant
                }else {
                    due += 0.11*taxableIncome 
                    break;
                }
                
            }else if (i === 3){
                if ( taxableIncome >= 500000){
                    due += 0.15*500000 
                    taxableIncome = taxableIncome - 500000 
                }else {
                    due += 0.15*taxableIncome
                    console.log(`The due  is ${1.5*taxableIncome} for first 500000`)
                    break;
                }
                
            }else if (i === 4){
                if ( taxableIncome >= 500000){
                    due += 0.19*500000
                    taxableIncome = taxableIncome - 500000
                }else {
                    due += 0.19*500000
                    break;
                }
                console.log(`The due  is ${due} for second 500000`)
            }else if (i === 5){
                if ( taxableIncome >= 16000000){
                    due += 0.21*16000000
                    taxableIncome = taxableIncome - 1600000
                }else {
                    due += 0.21*taxableIncome
                    break;
                }
                console.log(`The due  is ${due} for first 1.6m`)
            }else if (i === 6){
                due += 0.24*taxableIncome 
                //taxableIncome = taxableIncome - 1600000 
                console.log(`The due  is ${due} for first above 1.6m`)
                break;
            }
        }
    } 
   
    console.log(`The due is ${due}`) 
})


    
compute.addEventListener("click" , e => { 
    e.preventDefault() 
    //  due = due.toFixed(2) 
    if (amount!== "" &&  Number(amount) > 0){ 
        selector("#add").classList.toggle("d-nothing")
        console.log(consolidateAnnualPay) 
        selector("#reveal").classList.toggle("d-nothing") 
        annualPay.value = consolidateAnnualPay.toLocaleString() 
        liability.value = due.toLocaleString()
        selector("#monthly").value = (due/12).toLocaleString()
        e.target.disabled = true 
        console.log(amount) 
        selector(".comot").style.display = "none" 
        selector("#control").style.display = "none"
    }
}) 


