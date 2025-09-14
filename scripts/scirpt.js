document.getElementById("moreInfo").addEventListener("click", function () {
  let gotoInfoPage = window.confirm(`Do you want to go to another page?
  (more information)`);
  if (gotoInfoPage) window.location.href = "infoPage/info.html";
  else "";
});

document.getElementById("shop").addEventListener("click", function () {
  document.getElementById("product").scrollIntoView({ behavior: "smooth" });
});

document.getElementById("aboutOrganic").addEventListener("click", function () {
  window.location.href = "aboutOrganic/about.html";
});

document.getElementById("checkOut").addEventListener("click", function () {
  window.location.href = "checkOut/check.html";
});

// cart data
let cart = [];
let discount = 0; // نسبة الخصم

// update cart UI
function updateCartUI() {
  const itemsContainer = document.getElementById("cart-items");
  const totalElement = document.getElementById("cart-total");
  const badges = document.querySelectorAll(".cart-badge");

  itemsContainer.innerHTML = "";
  if (cart.length === 0) {
    itemsContainer.innerHTML =
      "<li class='list-group-item'>No items in cart</li>";
    totalElement.textContent = "$0";
  } else {
    let total = 0;
    cart.forEach((item, index) => {
      const li = document.createElement("li");
      li.className =
        "list-group-item d-flex justify-content-between align-items-center";
      li.innerHTML = `
          <span>${item.name} - $${item.price}</span>
          <button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})">❌</button>
        `;
      itemsContainer.appendChild(li);
      total += item.price;
    });

    // تطبيق الخصم لو موجود
    if (discount > 0) {
      let discountedTotal = total - total * discount;
      totalElement.textContent =
        "$" + discountedTotal.toFixed(2) + " (after discount)";
    } else {
      totalElement.textContent = "$" + total;
    }
  }

  // update badge count
  badges.forEach((b) => (b.textContent = cart.length));
}

// add item to cart
function addToCart(name, price) {
  cart.push({ name, price });
  updateCartUI();
}

// remove item from cart
function removeFromCart(index) {
  cart.splice(index, 1); // remove 1 element
  updateCartUI();
}

// ربط الأزرار بالـfunction
document.querySelectorAll(".cart-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    const card = this.closest(".card-body");
    const name = card.querySelector(".card-head").textContent;
    const priceText = card.querySelector(
      "h4.card-head:last-of-type"
    ).textContent;
    const price = parseFloat(
      priceText.replace("£", "").replace("$", "").trim()
    );

    addToCart(name, price);
  });
});

// تخزين الكوبون الصحيح في localStorage
window.localStorage.setItem("Coupon", "MoBMo20");

// زرار Apply Coupon
document.getElementById("applyCoupon").addEventListener("click", function () {
  const userCoupon = document.getElementById("inputCoupon").value.trim();
  const realCoupon = window.localStorage.getItem("Coupon");

  if (userCoupon === realCoupon) {
    discount = 0.2; // خصم 20%
    alert("✅ Coupon applied successfully! You got 20% discount.");
  } else {
    discount = 0;
    alert("❌ Invalid coupon code.");
  }

  // تحديث الكارت بعد الخصم
  updateCartUI();

  // قفل المودال
  const modal = bootstrap.Modal.getInstance(
    document.getElementById("exampleModal")
  );
  modal.hide();
});

document.getElementById("sendBtn").addEventListener("click", function (e) {
  e.preventDefault(); // منع reload لو الزرار جوا form

  // قراءة القيم
  const name = document.getElementById("userName").value.trim();
  const email = document.getElementById("userEmail").value.trim();
  const phone = document.getElementById("userPhone").value.trim();
  const message = document.getElementById("userMessage").value.trim();

  // التحقق هل فيه حاجة مكتوبة
  if (!name && !email && !phone && !message) {
    alert("⚠️ Please write data before sending!");
    return;
  }

  // عمل object للبيانات
  const userData = { name, email, phone, message };

  // تخزين البيانات في localStorage
  localStorage.setItem("contactData", JSON.stringify(userData));

  // رسالة ترحيب
  alert(`Welcome ${userData.name || "Guest"}!
We are happy for you to contact us.
    
Message Sent successfully!`);
});
