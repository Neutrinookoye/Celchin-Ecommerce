"use strict"

import {selector , selectAll , createElement , sendData , getData } from "./api.js" 
let content = selector("#postContent")
let id = content.getAttribute("data-identifier") 
getData(`/celchin-admin/ad-manager/fetch/${id}`)
.then(res => {
    content.innerHTML = res.content
}).catch(err => console.error(err))
