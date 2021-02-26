let AdeCarousel = {} 
AdeCarousel.selectAll = e => document.querySelectorAll(e)
AdeCarousel.init = (function(slideContent , controls , indicators ,  cb){ 
    try { 
        let slides = Array.from(document.querySelectorAll(slideContent));
        if (slides){ 
            let slideParent = slides[0].parentNode 
            let slideIndicators = Array.from(document.querySelectorAll(indicators))
            let duration = Number(slideParent.getAttribute("data-slide-duration")) 
            let indicatorBackground = slideParent.getAttribute("data-indicators-background")
            let currentIndex = 0; 
            let indexed = 0 
            
            let nextButton = document.querySelector(".next") 
            let prevButton = document.querySelector(".prev")   
            //Handling each of the slide indicators to display the image
            slideIndicators.map((indicator , i ) => {
                indicator.addEventListener("click" , event => { 
                    slides.map(slide => slide.style.display = "none")   
                    slides[i].style.display = "block";  
                    slideIndicators.filter((e , j) => j !== i).map(e => e.style.cssText = ";background:none;")
                    indicator.style.cssText = `;background:${indicatorBackground};` 
                    currentIndex = i
                })
            })  
            // Handling the pressing of next button
            nextButton.addEventListener("click" , event => { 
                    indexed = currentIndex
                    if (indexed > 3) indexed  = 0
                    console.log(indexed , currentIndex) 
                    slideIndicators.filter((e , i) =>  i !== indexed).map(e => e.style.cssText = ";background:none;") 
                    slideIndicators[indexed].style.cssText = `;background:${indicatorBackground};` 
                    slides.map(slide => slide.style.display = "none") 
                    if (indexed === 3){
                        slides[3].style.display = "block";
                    }else {
                        slides[indexed].style.display = "block";
                    }
                    currentIndex = indexed + 1 
            }) 
            prevButton.addEventListener("click" , event => { 
                indexed = currentIndex - 1 
                if (indexed <= 0) {
                    indexed = 4 
                }
                indexed = indexed - 1
                slideIndicators.filter((e , i) =>  i !== indexed).map(e => e.style.cssText = ";background:none;") 
                slideIndicators[indexed].style.cssText = `;background:${indicatorBackground};` 
                slides.map(slide => slide.style.display = "none") 
                if (indexed === 3){
                    slides[3].style.display = "block";
                }else {
                    slides[indexed].style.display = "block";
                }
                currentIndex = indexed + 1 
            }) 
            // Handling the pressing of previous button 
            function launchSlides() {
                let i;
                slides.map(slide => slide.style.display = "none") 
                currentIndex++ 
                if (currentIndex > slides.length) currentIndex = 1 
                slides[currentIndex - 1].style.display = "block";  
                slideIndicators.filter((e , i) => i !== currentIndex - 1).map(indicator => indicator.style.cssText = ";background:none;")
                slideIndicators[currentIndex - 1].style.cssText = `;background:${indicatorBackground};` 
                setTimeout(launchSlides, duration) 
            } 
            launchSlides() 
            
        }else {
            throw new Error("This page cannot run slide show")
        }
    }catch(error){
        cb(error.message)
    }
})(".slide" , ".slideControls" , ".slide-indicator" ,  console.error) 