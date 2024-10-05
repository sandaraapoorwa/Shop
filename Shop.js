


/**
 * The structure of a cart item
 * @typedef {Object} CartItem
 * @property {number} itemCount - Number of items.
 * @property {number} productArrayIndex - Relevant index for this item in the products array.
 */ 


/**
 * The structure of a cart item
 * @typedef {Object} ProductItem
 * @property {string} name - Item name.
 * @property {number} price - Single item price.
 * @property {string} image - Image for the item
 */
/**
 * This array holds the card items
 * @type {CartItem[]}
 */
const cartItems = [];
/**
 * All the available items
 * @type {ProductItem[]}
 */
const products = [
    {
        name: "Life on Land Pin",
        price: 5,
        image: "product1.jpg"
    },
    {
        name: "Protect wildlife themed T-shirt",
        price: 38.99,
        image: "product2.jpeg"
    },
    {
        name: "Life on Land Together band",
        price: 3,
        image: "product3.webp"
    },
    {
        name: "Panda Plush Toy",
        price: 10.99,
        image: "product4.webp"
    },
    {
        name: "White Elephant Plush Toy",
        price: 9.99,
        image: "product5.jpeg"
    },
    {
        name: "Black Bear Themed Cap",
        price: 12.50,
        image: "product6.jpeg"
    },
    {
        name: "50 pcs Migrating birds Sticker Pack",
        price: 3.99,
        image: "product7.avif"
    },
    {
        name: "Eco Friendly Bamboo Fibre flask",
        price: 15.75,
        image: "product8.webp"
    },
    {
        name: "Save the Elephants Tote Bag(Cream)",
        price: 10,
        image: "product9.jpeg"
    },
    {
        name: "Disposable Enamel Mug",
        price: 10,
        image: "product10.jpeg"
    },
    {
        name: "compostable Folks",
        price: 5,
        image: "product11.jpg"
    },
    {
        name: "Wildlife Themed Diary",
        price: 3.99,
        image: "product12.jpg"
    },
    {
        name: "Expedition Bracelet",
        price: 1.99,
        image: "product13.webp"
    },
    {
        name: "Coconut bowl",
        price: 2.99,
        image: "product14.jpeg"
    },
    {
        name: "Bamboo-Comb",
        price: 5.99,
        image: "product15.jpeg"
    }
];

function renderItems() {
    const containerElement = document.getElementsByClassName('content')[0];

    products.forEach((product, index) => {
        containerElement.innerHTML += /*html*/`
            <div class="product-box">
                <img src="${product.image}" alt="" class="product-img">
                <h4 class="product-title">${product.name}</h4>
                <span class="price">£${product.price}</span>
                <i class='bx bx-shopping-bag add-cart' data-index="${index}"></i>
            </div>
        `
    })
    Array.from(document.getElementsByClassName("add-cart")).forEach(el => {
        el.addEventListener('click', e => addItemToCart(e.target.dataset.index))
    });
}

/**
 * Adds a product to the cart only if it doesn't exist in the cart already. If it exists in the cart already, show an alert.
 * @param {number} index Index of the item in the products array.
 */
function addItemToCart(index) {
    const existingCartItem = cartItems.find(item => item.productArrayIndex == index);
    if (existingCartItem != undefined) {
        alert("already added to the cart");
        return;
    }

    cartItems.push({
        itemCount: 1,
        productArrayIndex: index
    });

    renderCartItems();
    attachEventListnersToCart();
    updateCart();
}

function renderCartItems() {
    const cartItemContainer = document.getElementsByClassName("cart-content")[0];

    // Clear content
    cartItemContainer.innerHTML = ""

    cartItems.forEach((item, cartIndex) => {
        const currentProduct = {
            index: item.productArrayIndex,
            count: item.itemCount,
            ...products[item.productArrayIndex]
        };

        cartItemContainer.innerHTML += /*html*/`
            <div class="cart-box">
                <img src="${currentProduct.image}" alt="" class="cart-image">
                <div class="detail-box">
                    <div class="cart-product-title">${currentProduct.name}</div>
                    <div class="cart-price">£${currentProduct.price}</div>
                    <input type="number" value="${currentProduct.count}" class="cart-quantity" data-cart-index="${cartIndex}">
                </div>
                <i class='bx bxs-trash-alt cart-remove' data-index="${currentProduct.index}" data-cart-index="${cartIndex}"></i>
            </div>
        `
    })
}

function attachEventListnersToCart() {
    Array.from(document.getElementsByClassName("cart-quantity")).forEach(el => {

        /**
         * @param {Event} e 
         */
        function changeListner(e) {
            // Update cartItems array
            const index = e.target.dataset.cartIndex;
            cartItems[index].itemCount = e.target.value;

            updateCart();
        }

        el.removeEventListener('change', changeListner);
        el.addEventListener('change', changeListner)
    });

    Array.from(document.getElementsByClassName("cart-remove")).forEach(el => {

        /**
         * @param {Event} e 
         */
        function clickListner(e) {
            // Update cartItems array
            const index = e.target.dataset.cartIndex;

            // Remove item at index
            cartItems.splice(index, 1);

            // Re-render cart items
            renderCartItems();
            attachEventListnersToCart();
            updateCart();
        }

        el.removeEventListener('click', clickListner)
        el.addEventListener('click', clickListner)
    });
}

function updateCart() {
    const total = cartItems.map(item => item.itemCount * products[item.productArrayIndex].price).reduce((acc, curr) => acc + curr, 0);
    const roundedTotal = Math.round(total * 100) / 100;
    document.getElementsByClassName('total-price')[0].innerText = "£" + roundedTotal.toFixed(2);
    document.getElementsByClassName('cart-count')[0].innerText = cartItems.length;
}

function handleBuyButtonClick() {
    if (cartItems.length == 0) {
        alert('Cart is empty. Please add items to Checkout');
    } else {
        // Save cart items to local storage
        const cartItemsWithData = cartItems.map(item => ({
            name: products[item.productArrayIndex].name,
            image: products[item.productArrayIndex].image,
            price: products[item.productArrayIndex].price,
            count: item.itemCount
        }))

        localStorage.setItem('cart-data', JSON.stringify(cartItemsWithData));

        window.location.href = 'checkout.html';
    }
}

function toggleCart() {
    const cart = document.getElementsByClassName("cart")[0].classList.toggle("cart-active") // Adds if doesn't exist, removes if exist
}
document.addEventListener("DOMContentLoaded", function () {
    renderItems();

    const buyNowButton = document.querySelector('.btn-buy');
    buyNowButton.addEventListener('click', handleBuyButtonClick);

    document.getElementById("cart-icon").addEventListener('click', toggleCart)
    document.getElementById("close-cart").addEventListener('click', toggleCart)
});