let aaa = document.querySelector('.aaa')
let str = JSON.parse(localStorage.response).response
let bbb = document.querySelector('.cart-length')
bbb.textContent = `${str.length} Item(s)`
for(let i = 0 ; i<str.length ; i++) {
    // column that contains the image and item name
    let wrap1 = document.createElement('div')
    wrap1.className = "col-md-5 d-flex"
    let img = document.createElement('img') //image
    img.src = "../images/good/Solar panel1.jpg"
    img.alt = "Image of item"
    img.className="product-img mr-4"
    let span1 = document.createElement("span")
    span1.className = "pt-3"
    let itemh5 = document.createElement("h5")
    itemh5.className = "text-muted"
    itemh5.textContent = str[i].name
    let itemp = document.createElement("p")
    itemp.className = "text-muted small"
    itemp.textContent = "Sold by Celchin"
    span1.append(itemh5 , itemp)
    wrap1.append(img , span1)
    //----------------------------------------------

    // column that contains the buttons and remove link
    let wrap2 = document.createElement('div')
    wrap2.className = "col-md-7 mb-5"
    let row = document.createElement('div')
    row.className = "row"

    // column for the increase and decrease buttons
    let wrap3 = document.createElement('div')
    wrap3.className = "col-md-5 pt-3"
    let para1 = document.createElement('p')
    para1.className = "button-para"
    let span2 = document.createElement('button')
    span2.textContent = "-"
    span2.id = `decrement-${i}`
    span2.className="btn decrement"
    let span3 = document.createElement('span')
    span3.textContent = "1"
    span3.className = "output"
    span3.id = `output-${i}`
    let span4 = document.createElement('button')
    span4.textContent = "+"
    span4.id = `increment-${i}`
    span4.className="btn increment"
    para1.append(span2 , span3 , span4)
    wrap3.append(para1)

    // column that contains the enquiry button and remove link
    let wrap4 = document.createElement('div')
    wrap4.className = "col-md-7 pt-3 mb-1"
    let row2 = document.createElement('div')
    row2.className = "row"
    let col61st = document.createElement("div") //First col-6 for the enquiry button
    col61st.className="col-6"
    let col62nd = document.createElement("div") //Second col-6 for the remove link
    col62nd.className="col-6"
    let a1 = document.createElement('a')
    a1.textContent = "Make Enquiry"
    a1.href = "#"
    a1.className = "btn btn-orange btn-enq"
    let span5 = document.createElement('a')
    span5.className = "btn orange-text x"
    span5.href="#"
    span5.textContent = "Remove"
    col61st.append(a1)
    col62nd.append(span5)
    row2.append(col61st , col62nd)
    wrap4.append(row2)
    row.append(wrap3 , wrap4)

    wrap2.append(row)
    aaa.append(wrap1 , wrap2) //The root div in the view

    //For the increase and decrease button functionality
    let increment = document.getElementById(`increment-${i}`)
    let decrement = document.getElementById(`decrement-${i}`)
    let output = document.getElementById(`output-${i}`)
    let j = output.textContent
    let arr = []
    console.log(`output-${2}`.textContent)
    increment.addEventListener("click" , event => {
        output.textContent = ++j
        arr.push(1)
        console.log(arr)
        console.log(str.length += arr.length)
        arr.pop()
        bbb.textContent = `${str.length += arr.length} Item(s)`
    })
    decrement.addEventListener("click" , event => {
        output.textContent = --j
        console.log(output.textContent)
        console.log(str.length -= 1)
        bbb.textContent = `${str.length} Item(s)`
    })

    
}



