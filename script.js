
    // =============================
// PANIER (TEMPORAIRE)
// =============================// =============================
// PANIER PARTAGÉ ENTRE LES PAGES
// =============================
let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

// =============================
// METTRE À JOUR LE COMPTEUR
// =============================
function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  if (!cartCount) return;

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  cartCount.textContent = totalItems;
}

// =============================
// AJOUTER UN PRODUIT AU PANIER
// =============================
document.querySelectorAll(".add-to-cart").forEach(button => {
  button.addEventListener("click", () => {
    const name = button.dataset.name;
    const price = parseFloat(button.dataset.price);

    const existingProduct = cart.find(item => item.name === name);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({
        name,
        price,
        quantity: 1
      });
    }

    // 🔹 ENVOYER AU PANIER (cart.html)
    sessionStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();
  });
});

// =============================
// INITIALISATION
// =============================
updateCartCount();



    // =============================
    // PANIER TEMPORAIRE (RESET AU REFRESH)
    // =============================// 🔹 RÉCUPÉRER LE PANIER DEPUIS index.html

    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const emptyCart = document.getElementById("empty-cart");

    // =============================
    // AFFICHAGE DU PANIER
    // =============================
    function renderCart() {
      cartItems.innerHTML = "";
      let total = 0;

      if (cart.length === 0) {
        emptyCart.style.display = "block";
        cartTotal.innerText = "0";
        return;
      } else {
        emptyCart.style.display = "none";
      }

      cart.forEach((item, index) => {
        total += item.price * item.quantity;

        const li = document.createElement("li");
        li.className = "list-group-item cart-item";

        li.innerHTML = `
      <div>
        <strong>${item.name}</strong>
        <small>${item.price} DT / unité</small>
      </div>

      <div class="cart-actions">
        <button onclick="decrease(${index})">−</button>
        <span>${item.quantity}</span>
        <button onclick="increase(${index})">+</button>
        <button class="remove" onclick="removeItem(${index})">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
    `;

        cartItems.appendChild(li);
      });

      cartTotal.innerText = total.toFixed(2);

      // 🔹 synchroniser
      sessionStorage.setItem("cart", JSON.stringify(cart));
    }

    // =============================
    // ACTIONS
    // =============================
    function increase(index) {
      cart[index].quantity++;
      renderCart();
    }

    function decrease(index) {
      if (cart[index].quantity > 1) {
        cart[index].quantity--;
        renderCart();
      }
    }

    function removeItem(index) {
      cart.splice(index, 1);
      renderCart();
    }

    // =============================
    // VIDER LE PANIER
    // =============================
    document.getElementById("clear-cart").onclick = () => {
      cart = [];
      sessionStorage.removeItem("cart");
      renderCart();
    };

    // =============================
    // COMMANDER
    // =============================
    document.getElementById("checkout").onclick = () => {
      if (cart.length === 0) {
        alert("Votre panier est vide !");
      } else {
        alert("Commande effectuée avec succès !");
        cart = [];
        sessionStorage.removeItem("cart");
        renderCart();
      }
    };

    // =============================
    // INITIALISATION
    // =============================
    renderCart();
