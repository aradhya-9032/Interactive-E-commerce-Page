console.log('====================================');
console.log("Connected");
console.log('====================================');


document.addEventListener("DOMContentLoaded", function() {
    let selectedColor = null;
    let selectedSize = null;
    let cart = [];
    let totalPrice = 0;
    
    const mainImage = document.getElementById('main-image');
    const quantityInput = document.getElementById('quantity');
    const messageContainer = document.getElementById('message-container');
    const cartContainer = document.createElement('div');
    cartContainer.classList.add('cart-container');
    document.body.appendChild(cartContainer); 
    
    function changeImage(imageSrc) {
        mainImage.src = imageSrc;
    }
    
    // function for Colors
    function selectColor(color) {
        selectedColor = color;
        document.querySelectorAll('.color').forEach(colorDiv => {
            colorDiv.classList.remove('selected');
        });
        event.target.classList.add('selected');
    }
         
    // function for sizes
    function selectSize(size) {
        selectedSize = size;
        document.querySelectorAll('.sizes input').forEach(sizeInput => {
            sizeInput.parentElement.classList.remove('selected');
        });
        event.target.parentElement.classList.add('selected');
    }
    
    // function for Increment
    function increaseQuantity() {
        let currentQuantity = parseInt(quantityInput.value);
        quantityInput.value = currentQuantity + 1;
    }
    
    // function for Decrement
    function decreaseQuantity() {
        let currentQuantity = parseInt(quantityInput.value);
        if (currentQuantity > 1) {
            quantityInput.value = currentQuantity - 1;
        }
    }
    
    // function for add to cart
    function addToCart() {
        if (!selectedColor || !selectedSize) {
            alert("Please select both color and size.");
            return;
        }
        
        const quantity = parseInt(quantityInput.value);
        const itemPrice = 12999.00;
        const item = {
            color: selectedColor,
            size: selectedSize,
            quantity: quantity,
            price: itemPrice
        };
        
        cart.push(item);
        totalPrice += itemPrice * quantity;
        updateCart();
        displayMessage(`Embrace Sideboard with ${selectedColor} Color, and ${selectedSize} Size added to cart`);
    }
    
    // function for remove items in Cart
    function removeFromCart(index) {
        totalPrice -= cart[index].price * cart[index].quantity;
        cart.splice(index, 1);
        updateCart();
        displayMessage("Item removed from cart!");
    }
    
    // function for updateCart
    function updateCart() {
        cartContainer.innerHTML = '';
        
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <div>Color: ${item.color}</div>
                <div>Size: ${item.size}</div>
                <div>Quantity: ${item.quantity}</div>
                <div>Price: $${(item.price * item.quantity).toFixed(2)}</div>
                <button onclick="removeFromCart(${index})">Delete</button>
            `;
            cartContainer.appendChild(cartItem);
        });
        
        const totalPriceElement = document.getElementById('total-price');
        if (!totalPriceElement) {
            const newTotalPriceElement = document.createElement('div');
            newTotalPriceElement.id = 'total-price';
            newTotalPriceElement.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
            document.body.appendChild(newTotalPriceElement);
        } else {
            totalPriceElement.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
        }
    }
    
    // function for display msg
    function displayMessage(message) {
        messageContainer.textContent = message;
        messageContainer.style.display = 'block';
        setTimeout(() => {
            messageContainer.style.display = 'none';
        }, 3000);
    }
    
    const firstColorElement = document.querySelector('.color');
    if (firstColorElement) {
        firstColorElement.addEventListener('click', function(event) {
            selectColor('color'); 
        });
    }
    
    const firstSizeElement = document.querySelector('.sizes input');
    if (firstSizeElement) {
        firstSizeElement.addEventListener('click', function(event) {
            selectSize('small'); 
        });
    }
    
    // Bind functions to the global scope
    window.changeImage = changeImage;
    window.selectColor = selectColor;
    window.selectSize = selectSize;
    window.increaseQuantity = increaseQuantity;
    window.decreaseQuantity = decreaseQuantity;
    window.addToCart = addToCart;
    window.removeFromCart = removeFromCart;
});



