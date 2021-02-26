"use strict"

import {selector , selectAll , createElement , sendData , getData } from "./api.js" 
let content = selector("#postContent")
let id = content.getAttribute("data-identifier") 
getData(`/celchin-admin/product-categories/fetch/${id}`)
.then(res => {
    content.innerHTML = res.description 
}).catch(err => console.error(err))
