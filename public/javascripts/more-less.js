let BrightToggle = {} 
BrightToggle.toggleButton = document.querySelector(".toggle-less") 
BrightToggle.toggleButton.addEventListener("click" , event => {
   event.target.previousElementSibling.classList.toggle("hide")
   console.log(event.target.textContent)
   event.target.textContent = event.target.textContent.trim().toUpperCase().includes("SHOW M") ? "Show less" : "Show more"
})
