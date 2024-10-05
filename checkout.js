/**
 * The structure of a cart item
 * @typedef {Object} CartItem
 * @property {string} name - Item name.
 * @property {number} price - Single item price.
 * @property {number} count - Number of items.
 * @property {string} image - Image for the item
 */

/**
 * This array holds the card items
 * @type {CartItem[]}
 */
let cartItems = [];

function renderCartItems() {
    const cartItemContainer = document.getElementsByClassName("cart-items-container")[0];
    
    cartItems.forEach(item => {
        cartItemContainer.innerHTML += /*html*/`
            <div class="item">
                <img src="${item.image}">
                <div class="info">
                    <div class="name">${item.name}</div>
                    <div class="price">£${item.price}</div>
                    <div class="returnPrice">Total Price: £${item.price * item.count}</div>
                    <div class="quantity">Quantity: ${item.count}</div>
                </div>
            </div>
        `
    })
}


function renderSummary() {
    let totalQuantityHTML = document.getElementsByClassName('totalQuantity')[0];
    let totalPriceHTML = document.getElementsByClassName('totalPrice')[0];

    let totalPrice = cartItems.map(item => item.count * item.price).reduce((acc, curr) => acc + curr, 0);
    let roundedTotalPrice = totalPrice.toFixed(2); // Round to three decimal places
    totalPriceHTML.innerHTML = "£ " + roundedTotalPrice;
    totalQuantityHTML.innerHTML = cartItems.length;
}



document.addEventListener("DOMContentLoaded", function () {
    var countrySelect = document.getElementById("country");
    var citySelect = document.getElementById("city");

    countrySelect.addEventListener("change", function () {
        var selectedCountry = countrySelect.value;
        citySelect.innerHTML = "";

        if (selectedCountry === "UK") {
            // If UK is selected, only display London
            var londonOption = document.createElement("option");
            londonOption.text = "London";
            londonOption.value = "London";
            citySelect.add(londonOption);
            var manchesterOption = document.createElement("option");
            manchesterOption.text = "Manchester";
            manchesterOption.value = "Manchester";
            citySelect.add(manchesterOption);
            var LeedsOption = document.createElement("option");
            LeedsOption.text = "Leeds";
            LeedsOption.value = "Leeds";
            citySelect.add(LeedsOption);
            var BirminghamOption = document.createElement("option");
            BirminghamOption.text = "Birmingham";
            BirminghamOption.value = "Birmingham";
            citySelect.add(BirminghamOption);
        } else if (selectedCountry === "Wales") {
            var CardiffOption = document.createElement("option");
            CardiffOption.text = "Cardiff";
            CardiffOption.value = "Cardiff";
            citySelect.add(CardiffOption);
            var SwanseaOption = document.createElement("option");
            SwanseaOption.text = "Swansea";
            SwanseaOption.value = "Swansea";
            citySelect.add(SwanseaOption);
            var NewportOption = document.createElement("option");
            NewportOption.text = "Newport";
            NewportOption.value = "Newport";
            citySelect.add(NewportOption);

        } else if (selectedCountry === "Scotland") {
            var edinburghOption = document.createElement("option");
            edinburghOption.text = "Edinburgh";
            edinburghOption.value = "Edinburgh";
            citySelect.add(edinburghOption);
            var GlasgowOption = document.createElement("option");
            GlasgowOption.text = "Glasgow";
            GlasgowOption.value = "Glasgow";
            citySelect.add(GlasgowOption);
        
        }
    });

    renderCartItems();
    renderSummary();
});

// Load cart items from local storage
const cartItemsJSONString = localStorage.getItem('cart-data')

if (cartItemsJSONString != null) {
    cartItems = JSON.parse(cartItemsJSONString)
    console.log(cartItems);
}