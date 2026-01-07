const products = [
    { id: 1, name: "Smartphone", price: 25000 },
    { id: 2, name: "Laptop", price: 60000 },
    { id: 3, name: "Headphones", price: 3000 },
    { id: 4, name: "Smart Watch", price: 8000 },
    { id: 5, name: "T-Shirt", price: 799 },
    { id: 6, name: "Running Shoes", price: 2499 },
    { id: 7, name: "Sofa", price: 18000 },
    { id: 8, name: "Study Table", price: 5500 },
    { id: 9, name: "Table Lamp", price: 1200 }
];

let cart = {};

const productContainer = document.getElementById("productContainer");
const cartItems = document.getElementById("cartItems");
const totalAmount = document.getElementById("totalAmount");
const searchInput = document.getElementById("searchInput");

/* Display Products */
function displayProducts(list) {
    productContainer.innerHTML = "";
    list.forEach(p => {
        const div = document.createElement("div");
        div.className = "product";
        div.innerHTML = `
            <h3>${p.name}</h3>
            <p>Price: ₹${p.price}</p>
            <label>Quantity:
                <input type="number" min="1" value="1" id="qty-${p.id}">
            </label><br>
            <button onclick="addToCart(${p.id})">Add to Cart</button>
        `;
        productContainer.appendChild(div);
    });
}

/* Add to Cart */
function addToCart(id) {
    const product = products.find(p => p.id === id);
    const qty = parseInt(document.getElementById(`qty-${id}`).value);

    if (cart[id]) {
        cart[id].quantity += qty;
    } else {
        cart[id] = {
            name: product.name,
            price: product.price,
            quantity: qty
        };
    }
    updateCart();
}

/* Update Cart UI */
function updateCart() {
    cartItems.innerHTML = "";
    let total = 0;

    for (let id in cart) {
        const item = cart[id];
        const subtotal = item.price * item.quantity;
        total += subtotal;

        const div = document.createElement("div");
        div.className = "cart-item";
        div.innerHTML = `
            <strong>${item.name}</strong><br>
            Qty: ${item.quantity} × ₹${item.price}<br>
            Subtotal: ₹${subtotal}
        `;
        cartItems.appendChild(div);
    }

    totalAmount.innerText = total;
}

/* Search */
searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase();
    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(value)
    );
    displayProducts(filtered);
});

/* Initial Load */
displayProducts(products);
