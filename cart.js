// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const DELIVERY_FEE = 200;
const FREE_DELIVERY_THRESHOLD = 3500;

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

function calculateTotal() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = subtotal < FREE_DELIVERY_THRESHOLD ? DELIVERY_FEE : 0;
    return {
        subtotal,
        deliveryFee,
        total: subtotal + deliveryFee
    };
}

function updateCartTotal() {
    const { subtotal, deliveryFee, total } = calculateTotal();
    document.getElementById('cartSubtotal').textContent = subtotal.toFixed(2);
    document.getElementById('deliveryFee').textContent = deliveryFee.toFixed(2);
    document.getElementById('cartTotal').textContent = total.toFixed(2);
}

function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCart();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCart();
}

function updateQuantity(productId, delta) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            renderCart();
        }
    }
}

function renderCart() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';
    
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-title">${item.title}</div>
                <div class="cart-item-price">Rs. ${item.price.toFixed(2)}</div>
            </div>
            <div class="cart-item-quantity">
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
            </div>
            <button onclick="removeFromCart(${item.id})" class="remove-item">×</button>
        `;
        cartItems.appendChild(itemElement);
    });
    
    updateCartTotal();
}

function openCart() {
    document.getElementById('cartModal').style.display = 'block';
    renderCart();
}

function openCheckoutForm1() {
    document.getElementById('checkoutModal1').style.display = 'block';
}

function closeCheckoutForm1() {
    document.getElementById('checkoutModal1').style.display = 'none';
}

function closeCart() {
    document.getElementById('cartModal').style.display = 'none';
}

function showCheckoutForm() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    document.getElementById('cartModal').style.display = 'none';
    document.getElementById('checkoutModal').style.display = 'block';
}

function closeCheckoutForm() {
    document.getElementById('checkoutModal').style.display = 'none';
}


 // Function to handle user form submission
 document.getElementById('submitUser Form').addEventListener('click', function() {
    const formData = new FormData(document.getElementById('userForm'));

    // Create orderData object
    const orderData = {
        customerName: formData.get('name'),
        phoneNumber: formData.get('phone'),
        address: formData.get('address'),
        items: cart.map(item => ({
            id: item.id,
            title: item.title,
            price: item.price,
            quantity: item.quantity
        })),
        ...calculateTotal()
    };

    // Populate the order form with orderData values
    document.getElementById('customerName').value = orderData.customerName;
    document.getElementById('phoneNumber').value = orderData.phoneNumber;
    document.getElementById('orderAddress').value = orderData.address;
    document.getElementById('total').value = orderData.total;
    document.getElementById('item').value =    document.getElementById('items').value = orderData.items.map(item => 
        `${item.title} (x${item.quantity}) - ${item.price} PKR - ${item.id}, `
    ).join('\n');


       

    // Optionally, you can clear the user form after submission
    document.getElementById('userForm').reset();
});


        // Set the current date in the date input field
        document.getElementById('date').value = new Date().toISOString().split('T')[0];

        document.getElementById('orderForm').addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the default form submission

            const formData = new FormData(this);
            fetch('https://script.google.com/macros/s/AKfycbzr3zkdnu6ClhHjwXwr4OsJ6QHPJWS68AL0lj-9GCwx-LMheJf0aibyuMynL_VgnXVpwg/exec', {
                method: 'POST',
                body: formData
            })
            .then(response => response.text())
            .then(data => {
                // Redirect to another HTML page after successful submission
                // window.location.href = 'ordersubmitted.html'; // Change this to your desired page
                alert('Order placed successfully!');
                cart = [];
                localStorage.removeItem('cart');
                updateCartCount();
                closeCheckoutForm1();
                closeCheckoutForm();
            })
            .catch(error => {
                alert('Error: ' + error);
            });
        });


// Initialize cart
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
});

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    const cartModal = document.getElementById('cartModal');
    const checkoutModal = document.getElementById('checkoutModal');
    const checkoutModal1 = document.getElementById('checkoutModal1');
    if (e.target === cartModal) {
        closeCart();
    } else if (e.target === checkoutModal) {
        closeCheckoutForm();
    }
    else if (e.target === checkoutModal1) {
        closeCheckoutForm1();
    }
});