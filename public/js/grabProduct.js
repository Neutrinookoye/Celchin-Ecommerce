"use strict"

import {selector , selectAll , createElement , sendData , getData } from "./api.js" 
let content = selector("#postContent")
let id = content.getAttribute("data-identifier") 
getData(`/celchin-admin/products/fetch/${id}`)
.then(res => {
    content.innerHTML = res.description 
}).catch(err => console.error(err))
