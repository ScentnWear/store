function typeWriterEffect(element, text, speed = 10) {
    let index = 0;
    element.style.visibility = "visible";
    function type() {
        if (index < text.length) {
            element.innerHTML += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }
    type();
}

function observeElement(target, callback) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                callback();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    observer.observe(target);
}

document.addEventListener("DOMContentLoaded", () => {
    observeElement(document.getElementById("introText"), () => {
        typeWriterEffect(document.getElementById("introText"), 
            "Welcome to our online store, your trusted destination for premium watches, elegant jewelry, long-lasting perfumes, and beautifully crafted gift packs. Established in 2025 by Ahsan, our mission is to offer high-quality products at unbeatable prices. Whether you’re looking for a stylish wristwatch to elevate your fashion, stunning jewelry to enhance your look, or a luxurious fragrance that makes a statement, we have it all. Our unique customized gift packaging ensures that every purchase feels special, making it the perfect choice for any occasion. We also cater to wholesale buyers, providing businesses with access to high-demand products at affordable rates. Customer satisfaction, affordability, and premium quality are our top priorities, ensuring a seamless and rewarding shopping experience for everyone."
        );
    });

    observeElement(document.getElementById("servicesText"), () => {
        typeWriterEffect(document.getElementById("servicesText"), 
            "At our store, we go beyond selling products—we offer an experience. Our wide collection of watches, jewelry, perfumes, and exclusive gift packs are available at highly competitive prices, ensuring luxury remains affordable. Our **customized gift packaging** service allows you to add a personal touch to every gift, making it even more special for your loved ones. We also provide **bulk wholesale options** for businesses, making high-quality products accessible at discounted rates. Fast and secure shipping guarantees timely delivery, and our dedicated customer support team is always available to assist you. Whether you’re shopping for yourself or looking for the perfect gift, we promise top-tier quality, unbeatable prices, and a shopping experience tailored to your needs."
        );
    });
});


 // Select all divs with the class 'nav-div'
 const navDivs = document.querySelectorAll('.product');

 // Add click event listener to each div
 navDivs.forEach(div => {
     div.addEventListener('click', () => {
         // Get the URL from the data attribute
         const url = div.getAttribute('data-url');
         // Navigate to the specified URL
         window.location.href = url;
     });
 });



 // Home page specific JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Add any home page specific functionality here
});