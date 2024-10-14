let menu = document.querySelector(".menu");
let menuItems = document.querySelectorAll(".menuItem");
let hamburger = document.querySelector(".hamburger");
let closeIcon = document.querySelector(".closeIcon");
let menuIcon = document.querySelector(".menuIcon");

function toggleMenu() {
  menu.classList.toggle("showMenu");
  closeIcon.style.display = menu.classList.contains("showMenu") ? "block" : "none";
  menuIcon.style.display = menu.classList.contains("showMenu") ? "none" : "block";
}

hamburger.addEventListener("click", toggleMenu);
menuItems.forEach(menuItem => menuItem.addEventListener("click", toggleMenu));

document.addEventListener("click", function (event) {
  let dropdown = document.querySelector(".dropdown-content");
  let dropbtn = document.querySelector(".dropbtn");
  if (dropbtn.contains(event.target)) {
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
  } else if (!dropdown.contains(event.target)) {
    dropdown.style.display = "none";
  }
});

let products = Array.from(document.querySelectorAll('[data-collection]'));

function filterProducts() {
  let selectedCollection = document.querySelector('.dropdown-content a.active[data-filter="collection"]')?.textContent.toLowerCase();
  let selectedColor = document.querySelector('.dropdown-content a.active[data-filter="color"]')?.textContent.toLowerCase();
  let selectedCategory = document.querySelector('.dropdown-content a.active[data-filter="category"]')?.textContent.toLowerCase();
  let priceRange = parseInt(document.getElementById("price-range").value);
  let visibleCount = 0;

  products.forEach(product => {
    let category = product.querySelector(".filtres").textContent.toLowerCase();
    let price = parseInt(product.querySelector(".prix").textContent.replace("$", "").replace(",", ""));
    let collection = product.dataset.collection?.toLowerCase();
    let color = product.dataset.color?.toLowerCase();

    if ((!selectedCollection || collection === selectedCollection) &&
        (!selectedColor || color === selectedColor) &&
        (!selectedCategory || category === selectedCategory) &&
        (price <= priceRange)) {
      product.style.display = "block";
      visibleCount++;
    } else {
      product.style.display = "none";
    }
  });

  displayVisibleCount(visibleCount);
}

function displayVisibleCount(count) {
  let countElement = document.getElementById("visible-count") || document.createElement('div');
  if (!countElement.id) {
    countElement.id = "visible-count";
    document.querySelector('main').insertBefore(countElement, document.getElementById("container2"));
  }
  countElement.textContent = count > 0 ? `${count} produit(s) visible(s)` : "Aucun produit trouvé.";
}

document.querySelectorAll('.dropdown-content a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    let filterType = e.target.closest(".dropdown").querySelector(".dropbtn").textContent.trim().toLowerCase();
    document.querySelectorAll(`.dropdown-content a[data-filter="${filterType}"]`).forEach(a => a.classList.remove("active"));
    e.target.classList.add("active");
    filterProducts();
  });
});

document.getElementById("price-range").addEventListener('input', filterProducts);
filterProducts();


