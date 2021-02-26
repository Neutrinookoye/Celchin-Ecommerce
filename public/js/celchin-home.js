/**
 ** Project : ACE AFRICA INTERFACE LIBRARY
 ** Author  : Adeleke Bright 
 ** Description :  This library is built to allow easy and fast product development for 
 **    ACE AFRICA
**/
const AIL = {} 
AIL.selector = e => document.querySelector(e)
AIL.selectAll = e => Array.from(document.querySelectorAll(e))

AIL.toggle = (function(target , content , errorHandler  , ...icons) {
    try {
        let triggers = AIL.selectAll(target) 
        let toggleAbleContents = AIL.selectAll(content)
        if (triggers.length < 1) throw new Error("The element is not available") 
        triggers.map((trigger , i) => {
            trigger.addEventListener("click" , e => { 
                event.preventDefault()
                let currentIcons = trigger.classList
                let realContent = toggleAbleContents[i].classList
                toggleAbleContents.filter((e , j) => j !== i)
                   .map(toggleable =>  {
                       toggleable.classList.remove("active")
                })
                if (!realContent.contains("grow-animation-ease")){
                    realContent.add("grow-animation-ease")
                }
                realContent.toggle("active") 

                if (!currentIcons.contains("grow-animation-ease")){
                    currentIcons.add("grow-animation-ease")
                }
                //trigger.parentNode.nextElementSibling.classList.add("grow-animation-ease")
                if (icons.length > 0 && currentIcons.contains("fa")){
                   currentIcons.toggle("fa-chevron-down")
                   currentIcons.toggle("fa-chevron-right")
                }
            })
        })
    }catch(error){
        errorHandler(error.message) 
        return 
    }
})(".tabber" , ".tab-content" , console.error , "fa fa-chevron-down") 


var Mobile = /** @class */ (function () {
    function Mobile(element) {
        this.element = element;
    }
    Mobile.prototype.toggle = function (event) {
        var target = event.target.classList;
        if (target.contains("toggler-icon")) {
            Mobile.root.classList.toggle("mobile-hide");
            target.toggle("fa-bars")
            target.toggle("fa-close")
        }
    };
    Mobile.prototype.addEventListener = function (type, e) {
        return addEventListener(type, e);
    };
    Mobile.root = document.querySelector(".mobile-nav");
    
    return Mobile;
}());

var mobileNav = new Mobile(".mobile-toggle");
mobileNav.addEventListener("click", function (event) {
    mobileNav.toggle(event);
});
AIL.modal = (function(target , content , closer ,  errorHandler ){
    try {
        let triggers = AIL.selectAll(target) 
        let contents = AIL.selectAll(content)
        let closers  = AIL.selectAll(closer)
        if (triggers.length < 1) throw new Error("The element is not available")
        triggers.map((trigger , i) => {
            trigger.addEventListener("click" , e => { 
                let currentContent = contents[i]
                currentContent.style.display = "block"
                
                let modalContent = currentContent.firstElementChild
                let contentWidth = Number(modalContent.getAttribute("data-modal-content-width"))
                let distanceFromTop = Number(modalContent.getAttribute("data-modal-content-distance-from-top"))
                modalContent.style.cssText += `;width:${contentWidth}%;margin:${distanceFromTop}% auto`
                closers[i].addEventListener("click" , e => {
                    currentContent.style.display = "none"
                })
            })
        })
    }catch(error){
        errorHandler(error.message) 
        return 
    }
})(".modal-trigger" , ".modal" , ".close" ,  console.error) 

let footerToggler = AIL.selector(".footer-toggler") 
if(footerToggler){
    footerToggler.addEventListener("click" , e => { 
        e.preventDefault() 
        let targetClassList = e.target.classList
        let showArea = AIL.selector(".show-text") 
        let footerNav = AIL.selector(".mobile-nav-box")
        let targetGrandParent = AIL.selector(".baba")
        showArea.textContent = showArea.textContent.trim() === "Less Options" ? "More Options" : "Less Options" 
        targetClassList.toggle("fa-chevron-up")
        targetClassList.toggle("fa-chevron-down") 
        footerNav.classList.toggle("mobile-hide") 
        targetGrandParent.classList.toggle("foot-border-bottom")
    })
}
