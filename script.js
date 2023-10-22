const products = [];
const cart = [];
let currentMode = 'buyer';

function setMode(mode) {
  currentMode = mode;
  updateUI();
}

function updateUI() {
  if (currentMode === 'seller') {
    document.querySelector('.seller-mode').style.display = 'block';
    document.querySelector('.buyer-mode').style.display = 'none';
  } else {
    document.querySelector('.seller-mode').style.display = 'none';
    document.querySelector('.buyer-mode').style.display = 'block';
    showProducts();
  }
}

function addProduct() {
    const imageInput = document.getElementById("productImage");
    const name = document.getElementById("productName").value;
    const description = document.getElementById("productDescription").value;
    const price = parseFloat(document.getElementById("productPrice").value);
  
    if (name && price && imageInput.files.length > 0) {
      const imageFile = imageInput.files[0];
      const reader = new FileReader();
  
      reader.onload = function(event) {
        const imageUrl = event.target.result; // URL representing the image file
        const product = { image: imageUrl, name, description, price };
        products.push(product);
        clearSellerFields();
      };
  
      reader.readAsDataURL(imageFile); // Read the image file as a data URL
    }
}
  

function clearSellerFields() {
  document.getElementById("productImage").value = "";
  document.getElementById("productName").value = "";
  document.getElementById("productDescription").value = "";
  document.getElementById("productPrice").value = "";
}

function showProducts() {
  const productsContainer = document.getElementById("products");
  productsContainer.innerHTML = "";
  products.forEach((product, index) => {
    const productElement = document.createElement("div");
    productElement.innerHTML = `
      <img src="${product.image}" alt="${product.name}" style="max-width: 100px;">
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p>Price: $${product.price.toFixed(2)}</p>
      <button onclick="addToCart(${index})">Add to Cart</button>
    `;
    productsContainer.appendChild(productElement);
  });
}

function addToCart(index) {
  const product = products[index];
  cart.push(product);
  showCart();
}

function showCart() {
  const cartItems = document.getElementById("cartItems");
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((product, index) => {
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
      <span>${product.name}</span>
      <input type="number" value="1" onchange="updateQuantity(${index}, this)">
      <span>$${product.price.toFixed(2)}</span>
      <button onclick="removeFromCart(${index})">Remove</button>
    `;
    cartItems.appendChild(cartItem);
    total += product.price;
  });

  document.getElementById("totalPrice").innerText = total.toFixed(2);
}

function updateQuantity(index, inputElement) {
  const quantity = parseInt(inputElement.value);
  cart[index].quantity = quantity;
  showCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  showCart();
}

function toggleCart() {
  const cartContent = document.querySelector(".cart-content");
  cartContent.style.display = cartContent.style.display === "block" ? "none" : "block";
}

updateUI();
