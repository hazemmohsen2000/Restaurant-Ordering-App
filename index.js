
import { menuArray } from './data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid'
let userName = ''
document.addEventListener('click', function(e) {
    handleClicks(e)
})
function handleClicks(e) {
    if(e.target.dataset.id && e.target.className == "add-item-btn") {
        addOrderItem(e.target.dataset.id)
        render()
    } else if (e.target.dataset.uuid && e.target.className == "remove-btn") {
        removeOrderItem(e.target.dataset.uuid)
    }else if (e.target.dataset.name && e.target.className == "complete-order-btn"&& getTotalOrderPrice()) {
        showModal()
    } 
    else if (e.target.dataset.close && e.target.className == "x") {
        modal.style.display = "none"
    } 
}
form.addEventListener('submit', function(e) {
    e.preventDefault()
    payOrder(e)
})

// render the menu items
function getItemHtml() {
    let itemHtml = menuArray.map( item => {
        let descrtiption = item.ingredients.join(", ")        
        return `
        <div class="item">
            <div class="item-info">
                <p class="item-emoji">${item.emoji}</p>
                <div class"item-description"> 
                    <p class="item-name">${item.name}</p>
                    <p class="item-ingredients">${descrtiption}</p>
                    <p class="item-price">$${item.price}</p>  
                </div>
            </div>
            <button class="add-item-btn" data-id="${item.id}">+</button>
        </div>
        `
    }).join("")
    return itemHtml
}

// render the selected item
let orderList = []
function addOrderItem(clickedId) { 
    
    const addedItem = menuArray.filter( item => item.id == clickedId  )
    const uuid = uuidv4()
    orderList.push({...addedItem[0], uuid})
  
    
}
function getOrderListHtml() {
    let orderListHtml =  orderList.map(order => 
         `
            <div class="order-item">
            <div class = "order-item-child">
                <p>${order.name}</p>
                <button class="remove-btn" data-uuid="${order.uuid}">remove</button>
                </div>
                <p class="order-item-price">$${order.price}</p>
            </div>
        ` ).join("")
    return orderListHtml
}

function getTotalOrderPrice() {
    return orderList.reduce((sum, price) => sum + price.price,0)
}

function getOrderHtml() {
    let orderHtml =  `
        <p class="order-title">Your Oder</p>
        ${getOrderListHtml()}
        <div class="total-price">
            <p>Total Price</p>
            <p>$${getTotalOrderPrice()}</p>
        </div>
        <button id="complete-order-btn" class="complete-order-btn" data-name="btn">Complete Order</button>        
    `   
    return orderHtml
}
 //remove btn
 function removeOrderItem(clickedUuid) {
    orderList.splice( orderList.findIndex(order => order.uuid == clickedUuid), 1 )
    render()
}
//   Display payment Modal 
const modal = document.getElementById("modal")

function showModal() {
    modal.style.display = "block"
}

function payOrder(e) {
    userName = e.target.name.value
    resetModal()
    orderList = []
    render()
    userName = ''
}

function resetModal() {
    document.getElementById("form").reset()
    modal.style.display = "none"
}
// render 
function render() {
    document.getElementById('items').innerHTML = getItemHtml()

    
    document.getElementById('order-list').innerHTML =  getOrderHtml()

    const orderCompleteHtmml = userName ? `<p class="order-complete">Thanks ${userName}! Your order is on its way!<p>` : ''
    document.getElementById('order-complete').innerHTML = orderCompleteHtmml   
}

render()