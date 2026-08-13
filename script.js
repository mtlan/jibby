// === STATE MANAGEMENT ===
let cart = [];
let comboSet = [];
let currentCategory = 'all';

// DOM Elements
const productsGrid = document.getElementById('products-grid');
const categoriesContainer = document.getElementById('categories-container');
const cartBadge = document.getElementById('cart-badge');
const cartItemsContainer = document.getElementById('cart-items');
const cartEmptyState = document.getElementById('cart-empty-state');
const cartTotalPriceEl = document.getElementById('cart-total-price');
const checkoutBtn = document.getElementById('checkout-btn');

// Combo Elements
const comboSlotsContainer = document.getElementById('combo-slots');
const comboCountEl = document.getElementById('combo-count');
const comboSubtotalEl = document.getElementById('combo-subtotal');
const comboDiscountRow = document.getElementById('combo-discount-row');
const comboDiscountPercentEl = document.getElementById('combo-discount-percent');
const comboDiscountAmountEl = document.getElementById('combo-discount-amount');
const comboTotalEl = document.getElementById('combo-total');
const comboProgressBar = document.getElementById('combo-progress');
const comboHint = document.getElementById('combo-hint');
const addComboToCartBtn = document.getElementById('add-combo-to-cart');
const clearComboBtn = document.getElementById('clear-combo-btn');

// Formatter
const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

// === INITIALIZATION ===
function init() {
    renderCategories();
    renderProducts();
    updateComboUI();
    setupEventListeners();
}

// === RENDER FUNCTIONS ===
function renderCategories() {
    categoriesContainer.innerHTML = '';
    categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = `whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${cat.id === currentCategory ? 'bg-primary text-white' : 'bg-gray-100 text-secondary hover:bg-gray-200'}`;
        btn.textContent = cat.name;
        btn.onclick = () => {
            currentCategory = cat.id;
            renderCategories();
            renderProducts();
        };
        categoriesContainer.appendChild(btn);
    });
}

function renderProducts() {
    productsGrid.innerHTML = '';
    const filteredProducts = currentCategory === 'all' 
        ? products 
        : products.filter(p => p.category === currentCategory);

    filteredProducts.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card bg-card rounded-2xl p-3 border border-gray-100 flex flex-col h-full relative group';
        
        // Badge
        let badgeHTML = '';
        if (product.isBestSeller) {
            badgeHTML = `<span class="absolute top-2 left-2 z-10 bg-accent text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider animate-pulse-soft">Bán Chạy</span>`;
        }

        card.innerHTML = `
            ${badgeHTML}
            <div class="product-image-container rounded-xl bg-gray-50 aspect-square mb-3 relative flex items-center justify-center p-4">
                <img src="${product.image}" alt="${product.name}" class="product-image w-full h-full object-contain">
                <!-- Quick add to combo button on hover -->
                <button onclick="addToCombo(${product.id})" class="absolute bottom-2 right-2 bg-white/90 backdrop-blur text-primary p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:text-accent" title="Thêm vào bộ Tự phối">
                    <i class="ph-fill ph-magic-wand"></i>
                </button>
            </div>
            <div class="flex-1 flex flex-col">
                <div class="flex items-center text-xs text-yellow-400 mb-1">
                    <i class="ph-fill ph-star"></i>
                    <span class="text-gray-500 ml-1 font-medium">${product.rating}</span>
                    <span class="text-gray-400 ml-1">(${product.sold})</span>
                </div>
                <h3 class="font-semibold text-sm text-primary mb-1 line-clamp-1">${product.name}</h3>
                <div class="mt-auto flex items-center justify-between pt-2">
                    <span class="font-bold text-primary">${formatPrice(product.price)}</span>
                    <button onclick="addToCart(${product.id})" class="bg-gray-100 hover:bg-primary hover:text-white text-primary w-8 h-8 rounded-full flex items-center justify-center transition-colors">
                        <i class="ph ph-plus"></i>
                    </button>
                </div>
            </div>
        `;
        productsGrid.appendChild(card);
    });
}

// === COMBO LOGIC (Make It Yours) ===
function addToCombo(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        comboSet.push({...product, cartId: Date.now() + Math.random()});
        updateComboUI();
        
        // Scroll to combo section if not visible
        const comboSection = document.getElementById('make-it-yours');
        const rect = comboSection.getBoundingClientRect();
        if(rect.top < 0 || rect.bottom > window.innerHeight) {
            comboSection.scrollIntoView({behavior: "smooth", block: "center"});
        }
    }
}

function removeFromCombo(cartId) {
    comboSet = comboSet.filter(item => item.cartId !== cartId);
    updateComboUI();
}

function clearCombo() {
    comboSet = [];
    updateComboUI();
}

function calculateComboDiscount(count) {
    let discount = 0;
    for (const rule of comboRules) {
        if (count >= rule.count) {
            discount = rule.discountPercent;
        }
    }
    return discount;
}

function getNextComboTarget(count) {
    for (const rule of comboRules) {
        if (count < rule.count) return rule;
    }
    return null;
}

function updateComboUI() {
    // Update count
    comboCountEl.textContent = comboSet.length;
    
    // Toggle clear button
    clearComboBtn.style.display = comboSet.length > 0 ? 'block' : 'none';

    // Render Slots
    if (comboSet.length === 0) {
        comboSlotsContainer.innerHTML = `<div class="w-full text-center text-gray-400 text-sm py-6">Chưa có charm nào được chọn. Hãy thêm từ danh mục bên dưới!</div>`;
    } else {
        comboSlotsContainer.innerHTML = '';
        comboSet.forEach(item => {
            const slot = document.createElement('div');
            slot.className = 'w-16 h-16 bg-white rounded-xl shadow-sm border border-gray-100 relative group flex items-center justify-center p-2';
            slot.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="w-full h-full object-contain">
                <button onclick="removeFromCombo(${item.cartId})" class="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    <i class="ph ph-x"></i>
                </button>
            `;
            comboSlotsContainer.appendChild(slot);
        });
        
        // Add empty placeholder for next
        const emptySlot = document.createElement('div');
        emptySlot.className = 'w-16 h-16 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center text-gray-300';
        emptySlot.innerHTML = `<i class="ph ph-plus"></i>`;
        comboSlotsContainer.appendChild(emptySlot);
    }

    // Calculations
    const subtotal = comboSet.reduce((sum, item) => sum + item.price, 0);
    const discountPercent = calculateComboDiscount(comboSet.length);
    const discountAmount = subtotal * (discountPercent / 100);
    const total = subtotal - discountAmount;

    // Update Text
    comboSubtotalEl.textContent = formatPrice(subtotal);
    if (discountPercent > 0) {
        comboDiscountRow.classList.remove('hidden');
        comboDiscountPercentEl.textContent = discountPercent;
        comboDiscountAmountEl.textContent = `-${formatPrice(discountAmount)}`;
    } else {
        comboDiscountRow.classList.add('hidden');
    }
    comboTotalEl.textContent = formatPrice(total);

    // Progress Bar & Hint
    const nextTarget = getNextComboTarget(comboSet.length);
    const maxCount = comboRules[comboRules.length - 1].count;
    const progressPercentage = Math.min((comboSet.length / maxCount) * 100, 100);
    comboProgressBar.style.width = `${progressPercentage}%`;

    if (nextTarget) {
        const needed = nextTarget.count - comboSet.length;
        comboHint.textContent = `Thêm ${needed} charm nữa để được giảm ${nextTarget.discountPercent}%!`;
        comboHint.className = "text-xs text-secondary mt-2 font-medium text-center";
    } else {
        comboHint.textContent = `Bạn đã đạt mức giảm giá tối đa ${comboRules[comboRules.length - 1].discountPercent}%! 🎉`;
        comboHint.className = "text-xs text-accent mt-2 font-bold text-center";
    }

    // Button state
    addComboToCartBtn.disabled = comboSet.length === 0;
}

function addComboToGlobalCart() {
    if (comboSet.length === 0) return;
    
    // Group them as a combo item in the cart
    const comboItem = {
        id: 'combo_' + Date.now(),
        isCombo: true,
        name: `Set ${comboSet.length} Charm Tự Phối`,
        items: [...comboSet],
        price: comboSet.reduce((sum, item) => sum + item.price, 0) * (1 - calculateComboDiscount(comboSet.length)/100),
        quantity: 1
    };
    
    cart.push(comboItem);
    clearCombo();
    updateCartUI();
    toggleCart(true);
}

// === CART LOGIC ===
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => !item.isCombo && item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1, isCombo: false });
    }
    
    updateCartUI();
    toggleCart(true); // Open cart automatically
}

function updateCartQuantity(itemId, delta) {
    const item = cart.find(i => i.id === itemId);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.id !== itemId);
        }
        updateCartUI();
    }
}

function removeCartItem(itemId) {
    cart = cart.filter(i => i.id !== itemId);
    updateCartUI();
}

function updateCartUI() {
    // Total count (number of physical items, combos count as 1 set or multiple? Let's count quantities of rows)
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    // Update Badge
    cartBadge.textContent = totalItems;
    if (totalItems > 0) {
        cartBadge.classList.remove('opacity-0', 'scale-0');
        cartBadge.classList.add('opacity-100', 'scale-100');
    } else {
        cartBadge.classList.remove('opacity-100', 'scale-100');
        cartBadge.classList.add('opacity-0', 'scale-0');
    }
    
    document.getElementById('cart-drawer-count').textContent = totalItems;
    document.getElementById('mobile-count').textContent = totalItems;

    // Render Items
    if (cart.length === 0) {
        cartEmptyState.style.display = 'flex';
        cartItemsContainer.querySelectorAll('.cart-item-row').forEach(el => el.remove());
        checkoutBtn.disabled = true;
        document.getElementById('mobile-bottom-bar').classList.remove('translate-y-0');
        document.getElementById('mobile-bottom-bar').classList.add('translate-y-full');
    } else {
        cartEmptyState.style.display = 'none';
        
        // Remove existing items before re-render
        cartItemsContainer.querySelectorAll('.cart-item-row').forEach(el => el.remove());
        
        cart.forEach(item => {
            const row = document.createElement('div');
            row.className = 'cart-item-row flex gap-4 py-4 border-b border-gray-100 last:border-0';
            
            if (item.isCombo) {
                 row.innerHTML = `
                    <div class="w-20 h-20 bg-accent-light rounded-xl flex items-center justify-center p-2 flex-wrap gap-1">
                       <i class="ph-fill ph-magic-wand text-accent text-2xl"></i>
                    </div>
                    <div class="flex-1 flex flex-col">
                        <div class="flex justify-between items-start">
                            <h4 class="font-medium text-sm text-primary">${item.name}</h4>
                            <button onclick="removeCartItem('${item.id}')" class="text-gray-400 hover:text-red-500"><i class="ph ph-trash"></i></button>
                        </div>
                        <p class="text-xs text-secondary mb-2">${item.items.length} charm đã chọn</p>
                        <div class="mt-auto flex justify-between items-center">
                            <span class="font-bold text-primary">${formatPrice(item.price)}</span>
                            <div class="flex items-center bg-gray-100 rounded-lg p-1">
                                <button onclick="updateCartQuantity('${item.id}', -1)" class="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm text-primary">-</button>
                                <span class="w-8 text-center text-sm font-medium">${item.quantity}</span>
                                <button onclick="updateCartQuantity('${item.id}', 1)" class="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm text-primary">+</button>
                            </div>
                        </div>
                    </div>
                `;
            } else {
                row.innerHTML = `
                    <div class="w-20 h-20 bg-gray-50 rounded-xl p-2 flex items-center justify-center">
                        <img src="${item.image}" alt="${item.name}" class="w-full h-full object-contain">
                    </div>
                    <div class="flex-1 flex flex-col">
                        <div class="flex justify-between items-start">
                            <h4 class="font-medium text-sm text-primary">${item.name}</h4>
                            <button onclick="removeCartItem(${item.id})" class="text-gray-400 hover:text-red-500"><i class="ph ph-trash"></i></button>
                        </div>
                        <div class="mt-auto flex justify-between items-center">
                            <span class="font-bold text-primary">${formatPrice(item.price)}</span>
                            <div class="flex items-center bg-gray-100 rounded-lg p-1">
                                <button onclick="updateCartQuantity(${item.id}, -1)" class="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm text-primary">-</button>
                                <span class="w-8 text-center text-sm font-medium">${item.quantity}</span>
                                <button onclick="updateCartQuantity(${item.id}, 1)" class="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm text-primary">+</button>
                            </div>
                        </div>
                    </div>
                `;
            }
            cartItemsContainer.insertBefore(row, cartEmptyState);
        });
        
        checkoutBtn.disabled = false;
        document.getElementById('mobile-bottom-bar').classList.remove('translate-y-full');
        document.getElementById('mobile-bottom-bar').classList.add('translate-y-0');
    }

    // Total Price
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalPriceEl.textContent = formatPrice(totalPrice);
    document.getElementById('mobile-total').textContent = formatPrice(totalPrice);
}


// === UI INTERACTIONS ===
const cartDrawer = document.getElementById('cart-drawer');
const cartOverlay = document.getElementById('cart-overlay');
const checkoutModal = document.getElementById('checkout-modal');
const checkoutModalOverlay = document.getElementById('checkout-modal-overlay');
const successModal = document.getElementById('success-modal');

function toggleCart(show) {
    if (show) {
        cartDrawer.classList.remove('translate-x-full');
        cartDrawer.classList.add('translate-x-0');
        cartOverlay.classList.remove('opacity-0', 'pointer-events-none');
        cartOverlay.classList.add('opacity-100');
        document.body.style.overflow = 'hidden';
    } else {
        cartDrawer.classList.remove('translate-x-0');
        cartDrawer.classList.add('translate-x-full');
        cartOverlay.classList.remove('opacity-100');
        cartOverlay.classList.add('opacity-0', 'pointer-events-none');
        document.body.style.overflow = '';
    }
}

function toggleCheckout(show) {
    if (show) {
        toggleCart(false); // close cart first
        checkoutModalOverlay.classList.remove('opacity-0', 'pointer-events-none');
        checkoutModalOverlay.classList.add('opacity-100');
        checkoutModal.classList.remove('scale-95');
        checkoutModal.classList.add('scale-100');
        document.body.style.overflow = 'hidden';
    } else {
        checkoutModalOverlay.classList.remove('opacity-100');
        checkoutModalOverlay.classList.add('opacity-0', 'pointer-events-none');
        checkoutModal.classList.remove('scale-100');
        checkoutModal.classList.add('scale-95');
        document.body.style.overflow = '';
    }
}

function toggleSuccess(show) {
    if (show) {
        toggleCheckout(false);
        successModal.classList.remove('opacity-0', 'pointer-events-none');
        successModal.classList.add('opacity-100');
        document.getElementById('success-content').classList.remove('scale-95');
        document.getElementById('success-content').classList.add('scale-100');
    } else {
        successModal.classList.remove('opacity-100');
        successModal.classList.add('opacity-0', 'pointer-events-none');
        document.getElementById('success-content').classList.remove('scale-100');
        document.getElementById('success-content').classList.add('scale-95');
    }
}

function setupEventListeners() {
    // Header Scroll
    window.addEventListener('scroll', () => {
        const header = document.getElementById('header');
        if (window.scrollY > 10) {
            header.classList.add('shadow-sm');
        } else {
            header.classList.remove('shadow-sm');
        }
    });

    // Cart Toggles
    document.getElementById('cart-btn').addEventListener('click', () => toggleCart(true));
    document.getElementById('mobile-checkout-btn').addEventListener('click', () => toggleCart(true));
    document.getElementById('close-cart-btn').addEventListener('click', () => toggleCart(false));
    cartOverlay.addEventListener('click', () => toggleCart(false));
    document.getElementById('start-shopping-btn').addEventListener('click', () => {
        toggleCart(false);
        document.getElementById('shop').scrollIntoView({behavior: "smooth"});
    });

    // Combo
    clearComboBtn.addEventListener('click', clearCombo);
    addComboToCartBtn.addEventListener('click', addComboToGlobalCart);

    // Checkout
    checkoutBtn.addEventListener('click', () => toggleCheckout(true));
    document.getElementById('close-checkout-btn').addEventListener('click', () => toggleCheckout(false));
    checkoutModalOverlay.addEventListener('click', (e) => {
        if(e.target === checkoutModalOverlay) toggleCheckout(false);
    });

    // Form Submit
    document.getElementById('checkout-form').addEventListener('submit', (e) => {
        e.preventDefault();
        // Here we would normally send data to Google Sheets via Fetch API
        // For MVP, just show success and clear cart
        cart = [];
        updateCartUI();
        toggleSuccess(true);
    });

    // Success close
    document.getElementById('close-success-btn').addEventListener('click', () => {
        toggleSuccess(false);
        window.scrollTo({top: 0, behavior: 'smooth'});
    });
}

// Start
init();
