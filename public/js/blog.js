"use strict"

import {selector , selectAll , createElement , sendData , getData } from "./api.js" 

let buttons = Array.from(selectAll(".editor-icons button")) , 
savePost    = selector("#save")  , 
postTitle   = selector("#title") , 
postContent = selector("#content")  
let form = selector("form")
let formData = new FormData(form) 
let fileInput = selector("#avatar") 
// visualButton = selector("#visual")  , 
// textButton   = selector("#text")

//save a post
savePost.addEventListener("click" , event => {
    let {target} = event   
    event.preventDefault() 
    formData.append("title" ,postTitle.value.trim()) 
    formData.append("content" , postContent.innerHTML)
    for(let i = 0 ; i < fileInput.files.length ; i++){
        formData.append(fileInput.name , fileInput.files[i]) 
    } 
    fetch("/celchin-admin/product-categories" , {
        method : "POST" , 
        body : formData
    })
    .then(res => res.json()) 
    .then(res => { 
        if (target.nextElementSibling) target.nextElementSibling.remove() 
        let successMessage = createElement("p") 
        successMessage.textContent = res.message 
        target.parentNode.append(successMessage) 
        setTimeout(() => {
            history.go()
        } , 2000)
    })
    .catch(err => console.error(err))
})

let commands = [
    "bold" , "italic" , "delete" , "indent" , "justifyCenter" , "insertImage" , 
    "jusfityFull" , "justifyLeft" , "justifyRight" , "removeFormat" , 
    "selectAll" , "strikeThrough" , "subscript" , "superscript" , "underline" , 
   "insertOrderedList" , "insertUnorderedList" , "insertParagraph" , 
    "createLink" , "fontName" , "fontSize" , "foreColor" , "heading" , "hiliteColor" , 
    "insertHorizontalRule" , "insertBrOnReturn" , "insertHTML" , "outdent" , "unlink" ,
    "styleWithCSS"
]


/**
 * @description executeCommand executes a command on any particular target
 * @param {Object} target 
 * @param {Object} commands 
 */
const  executeCommand = (target , commands) => {
    if (commands.includes(target.id)){ 
        return document.execCommand(target.id)
    } 
    return false
}

buttons.map(button => { 
    button.addEventListener("click" , event => { 
        event.preventDefault()
        //let  { target} = event 
        switch(button.id){
            case "createLink" : 
              let headings = selector("#link") 
              let hrefInput = selector("#linkHref")
              headings.style.display = "block" 
              //You need to grab the element that was selected because by the time you start typeing 
              // the selection will be lost
              hrefInput.addEventListener("blur" , e => { 
                console.log(hrefInput.value)
                document.execCommand("createLink" , false , hrefInput.value) 
                hrefInput.value = ""
                headings.style.display = "none"
              })
              break ; 
            case "fontName" : 
              let fonts = selector("#fonts") 
              fonts.style.display = "block" 
              fonts.addEventListener("change" , e => { 
                document.execCommand("fontName" , false , fonts.value) 
                fonts.style.display = "none"
              })
              break ; 
            case "fontSize" : 
              let size = selector("#size") 
              size.style.display = "block" 
              size.addEventListener("change" , e => { 
                document.execCommand("fontSize" , false , size.value) 
                size.style.display = "none"
              })
              break ;
            case "fillTrigger" : 
              let fill = selector("#fill") 
              fill.style.display = "block" 
              fill.addEventListener("change" , e => { 
                document.execCommand("hiliteColor" , false , fill.value) 
                fill.style.display = "none"
              })
              break ; 
            case "colorTrigger" : 
              let color = selector("#color") 
              color.style.display = "block" 
              color.addEventListener("change" , e => { 
                document.execCommand("foreColor" , false , color.value) 
                color.style.display = "none"
              })
              break ; 
            default : 
              executeCommand(button , commands)
        }   
    })
}) 

// let content = postContent.innerHTML 
// textButton.addEventListener("click" , event => { 
//     event.preventDefault() 
//     let content = postContent.innerHTML 
//     postContent.textContent = content
// }) 
// visualButton.addEventListener("click" , event => { 
//     event.preventDefault()  
//     let content = postContent.textContent
//     postContent.innerHTML = content
// }) 
