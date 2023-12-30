const quantitySpan = document.getElementById('input-amount');

document.querySelectorAll('.btn-gaps').forEach(button => {
    button.addEventListener('click', function() {
        let currentQuantity = parseInt(quantitySpan.innerText, 10);
        if (button.innerText === '+') {
            currentQuantity++;
        } else if (button.innerText === '-' && currentQuantity > 0) {
            currentQuantity--;
        }
        quantitySpan.innerText = currentQuantity;
    });
});

function updateCartCounter(count) {
    const counterElement = document.getElementById('counter');
    const emptyMessage = document.getElementById('empty-message');

    if (count > 0) {
        counterElement.style.display = "flex";
        counterElement.innerText = count;
        emptyMessage.style.display = "none";
    } else {
        counterElement.style.display = "none";
        emptyMessage.style.display = "block";
    }
}

function addItemToCart(productName, productPrice, productQuantity, productTotalPrice) {
    const cartList = document.getElementById('cart-list');
    const cartItem = document.createElement('li');
    cartItem.setAttribute('data-id', productName);
    const itemContent = `
        <div style="display:flex;">
            <img src="images/image-product-1-thumbnail.jpg" width="20%" height="20%" class="drop-thumb">
            <div>
                <p>${productName} $${productPrice} x <span>${productQuantity}</span> <span><strong>$${productTotalPrice}</strong></span></p>
            </div>
            <img src="images/icon-delete.svg" width="8%" height="8%" class="for-delete">
        </div>
        <button class="check">Checkout</button>
    `;

    cartItem.innerHTML = itemContent;
    cartList.appendChild(cartItem);

    cartList.addEventListener('click', function(event) {
        if (event.target.classList.contains('for-delete')) {
            event.target.closest('li').remove();
            updateCartCounter(cartList.getElementsByTagName('li').length);
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const cartList = document.getElementById('cart-list');
    const initialItemCount = cartList.getElementsByTagName('li').length;
    updateCartCounter(initialItemCount);
});

document.querySelector('.cart-container').addEventListener('click', function() {
    const currentQuantity = parseInt(quantitySpan.innerText, 10);
    if (currentQuantity > 0) {
        updateCartCounter(currentQuantity);
        addItemToCart("Fall Limited Edition Sneakers", "125.00", currentQuantity, currentQuantity * 125.00);
    }
});

const cartDropdown = document.querySelector('.added-items');

document.getElementById('cart-icon-container').addEventListener('click', function() {
    if (cartDropdown.style.display === 'none' || !cartDropdown.style.display) {
        cartDropdown.style.display = 'block';
    } else {
        cartDropdown.style.display = 'none';
    }
});

// IMAGE GALLERY FUNCTIONALITY (Avoiding duplicate code)

const mainImage = document.querySelector('.displayed-image');
const thumbnails = Array.from(document.querySelectorAll('.small-image img'));

let currentIndex = 0;

function updateMainImage() {
    mainImage.src = thumbnails[currentIndex].src.replace('-thumbnail', '');
}

thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', function() {
        currentIndex = index;
        updateMainImage();
    });
});

document.querySelector('.mobile-prev').addEventListener('click', function() {
    currentIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
    updateMainImage();
});

document.querySelector('.mobile-next').addEventListener('click', function() {
    currentIndex = (currentIndex + 1) % thumbnails.length;
    updateMainImage();
});

document.getElementById('next').addEventListener('click', function() {
    currentIndex = (currentIndex + 1) % thumbnails.length;
    updateMainImage();
});

document.getElementById('previous').addEventListener('click', function() {
    currentIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
    updateMainImage();
});

mainImage.style.opacity = 0.5;
setTimeout(() => {
    mainImage.style.opacity = 1;
}, 300);

document.querySelector('.displayed-image').addEventListener('click', function() {
    document.querySelector('.hidden-image-display').style.display = 'block';
});

document.querySelector('.close-icon').addEventListener('click', function() {
    document.querySelector('.hidden-image-display').style.display = 'none';
});

// NAVIGATION FUNCTIONALITY

document.getElementById("navToggle").addEventListener("click", function() {
    let nav = document.querySelector("ul");
    let overlay = document.getElementById("overlay");
    if (nav.classList.contains("open")) {
        nav.classList.remove("open");
        overlay.style.display = "none";
    } else {
        nav.classList.add("open");
        overlay.style.display = "block";
    }
});

document.getElementById("overlay").addEventListener("click", function() {
    let nav = document.querySelector("ul");
    let overlay = document.getElementById("overlay");
    nav.classList.remove("open");
    overlay.style.display = "none";
});

document.querySelector(".close-nav").addEventListener("click", function() {
    let nav = document.querySelector("ul");
    let overlay = document.getElementById("overlay");
    nav.classList.remove("open");
    overlay.style.display = "none";
});
