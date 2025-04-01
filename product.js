function goBack() {
    window.history.back();
}

function orderOnWhatsApp() {
    const product = {
        id: 1,
        title: 'Amazing Product',
        price: 99.99
    };
    
    const phoneNumber = '1234567890'; // Replace with your actual WhatsApp number
    const message = encodeURIComponent(
        `I would like to order:\n\n` +
        `Product ID: ${product.id}\n` +
        `Product: ${product.title}\n` +
        `Price: Rs. ${product.price}`
    );
    
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
}

// Initialize product page
document.addEventListener('DOMContentLoaded', () => {
    // Add click event for the "Add to Cart" button
    document.querySelector('.buy-button').addEventListener('click', () => {
    const product = {
            id: 1,
            title: 'Amazing Product',
            price: 99.99
        };
        addToCart(product);
    });
});