
let selector = e => document.querySelector(e) 

let pictureChange = selector("#avatar")

pictureChange.addEventListener('change' , showImage) 
function showImage() {
	let files = this.files[0]  
    let acceptedFile = ["image/jpeg" , "image/jpg" , "image/png" , "image/gif"] 
    let divisor = 1024*1024
    let size = Number(files.size)/divisor
	let type = files.type 
	if (acceptedFile.includes(type)  && size  < 10) {
		let reader = new FileReader() 
		reader.onload = function(event) {
			 
			let img = new Image() 
			img.onload = function() { 

				img.style.cssText = `;width:100%;border-radius:50%` 
				if (selector("#displayImage").firstChild) selector("#displayImage").innerHTML = ""
				selector("#displayImage").append(img)
			}
			img.src = event.target.result 
			img.style.width = '150px'
			img.style.height = '150px'
			img.id = "previewImage"
		}
		reader.onerror = function(event) {
			selector("#displayImage").textContent = "An error just occured"
		}
		reader.readAsDataURL(files) 
	}else{
		event.preventDefault() 
      	selector("#displayImage").textContent = "File size too large or not supported."
	}
} 
