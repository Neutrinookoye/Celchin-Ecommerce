

let buttonTrigger = document.querySelector("button")
buttonTrigger.addEventListener("click" , function(e){
    e.preventDefault() 
    let app = document.querySelector("#app")
    let httpRequest = new XMLHttpRequest() 
    if (!httpRequest){
        app.textContent = "XMLHttp is not supported by this browser"
    } 
    httpRequest.onreadystatechange = function(){
        if (this.readyState === 4 && this.status === 200){
            app.textContent = JSON.parse(this.responseText).message
        }
    } 
    httpRequest.open("GET" ,  "/get-content") 
    httpRequest.send() 
}) 


let sumbitButton  = document.querySelector("#submit") 
sumbitButton.addEventListener("click" , e => {
    e.preventDefault() 
    let app = document.querySelector("#app")
    let httpRequest = new XMLHttpRequest() 
    if (!httpRequest){
        app.textContent = "XMLHttp is not supported by this browser"
    } 
    // let data = {
    //     userName : document.querySelector("#userName").value.trim() , 
    //     email    : document.querySelector("#email").value.trim()
    // } 
    let userName = document.querySelector("#userName").value.trim() 
    httpRequest.onreadystatechange = function(){
        if (this.readyState === 4 && this.status === 200){
            app.textContent = JSON.parse(this.responseText).message
        }
    } 
    httpRequest.open("POST" ,  "/get-content") 
    httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    httpRequest.send('userName=' + encodeURIComponent(userName))
})