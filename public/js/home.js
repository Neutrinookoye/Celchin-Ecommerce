let select = e => document.querySelector(e)
let selectAll = e => document.querySelectorAll(e)
let header = document.querySelector(".fixed-top")  , 
getStarted = select("#getStarted") , 
navAnchors = Array.from(selectAll(".main-navigation a")) ,
spanTogglers = Array.from(selectAll(".search-and-toggle span")) 
window.addEventListener("scroll" , function(event){
    if (this.scrollY > 50) {
        header.classList.add("bg-white")
        header.classList.add("shadow") 
        navAnchors.map(e => e.style.cssText = `;color:#000!important;`)
        spanTogglers.map(e => e.style.cssText = `;background:#000!important;`)
        getStarted.classList.add("register-cta") 
        getStarted.classList.remove("border-sorround-white") 
        getStarted.style.color = "#fff"
    }else {
        header.classList.remove("bg-white")
        header.classList.remove("shadow")
        navAnchors.map(e => e.style.cssText = `;color:#fff!important;`)
        spanTogglers.map(e => e.style.cssText = `;background:#fff!important;`)
        getStarted.classList.remove("register-cta")
        getStarted.classList.add("border-sorround-white") 
    }  
}) 

let videoLoader = select("#video-loader")  , 
video  = select("video")  , 
message = select("#video-message") 
videoLoader.addEventListener("click" , e=> { 
    let targetClass = e.target.classList
    
    if (video.paused){
        video.play() 
    }else {
        // video.removeAttribute("src") 
        // video.load()
        // select("#video-box").classList.toggle("d-nothing")
        video.pause()
    }
    message.textContent = message.textContent.trim().toLowerCase() == "watch how" ? "Pause Video" : "Watch How"//message.textContent.trim().toLowerCase() === "Watch How" ? "Pause Video" : "Watch How"
    targetClass.toggle("fa-play") 
    targetClass.toggle("fa-pause")
}) 

window.addEventListener("scroll" , e => {
    video.play()
})
           