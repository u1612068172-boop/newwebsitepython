// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('.main-nav');

    if (toggle && nav) {
        toggle.addEventListener('click', function () {
            nav.classList.toggle('open');
        });

        // Close on link click (mobile)
        nav.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                nav.classList.remove('open');
            });
        });
    }

    // Smooth scroll for in-page anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // Set min date for reservation form to today
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
    }

    // Scroll reveal — progressive fade/slide in as elements enter viewport
    const revealTargets = document.querySelectorAll(
        '.reveal, .showcase-item, .showcase-header, .stat, .gallery-item, .menu-category'
    );
    if ('IntersectionObserver' in window && revealTargets.length) {
        revealTargets.forEach(el => el.classList.add('reveal'));
        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
        revealTargets.forEach(el => io.observe(el));
    }

    // ---------------------------------------------------------------
    // Order page — Cart logic
    // ---------------------------------------------------------------
    const cartItemsEl = document.getElementById('cartItems');
    const cartEmpty = document.getElementById('cartEmpty');
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');
    const cartTotalAmount = document.getElementById('cartTotalAmount');
    const cartItemsInput = document.getElementById('cartItemsInput');
    const orderForm = document.getElementById('orderForm');
    const mobileCartToggle = document.getElementById('mobileCartToggle');
    const mobileCartBadge = document.getElementById('mobileCartBadge');
    const mobileCartTotal = document.getElementById('mobileCartTotal');
    const cartSidebar = document.getElementById('cartSidebar');

    if (cartItemsEl) {
        const cart = {}; // key: itemName, value: { name, price, priceStr, qty, category }

        function parsePrice(priceStr) {
            const cleaned = priceStr.split('/')[0].trim().replace('€', '').replace(',', '.').replace('/KG', '').trim();
            return parseFloat(cleaned) || 0;
        }

        function getCartArray() {
            return Object.values(cart);
        }

        function getCartTotal() {
            return getCartArray().reduce((sum, item) => sum + item.price * item.qty, 0);
        }

        function getCartCount() {
            return getCartArray().reduce((sum, item) => sum + item.qty, 0);
        }

        function renderCart() {
            const items = getCartArray();
            const total = getCartTotal();
            const count = getCartCount();

            if (items.length === 0) {
                cartEmpty.style.display = 'block';
                cartTotal.style.display = 'none';
                orderForm.style.display = 'none';
                if (mobileCartToggle) mobileCartToggle.style.display = 'none';
            } else {
                cartEmpty.style.display = 'none';
                cartTotal.style.display = 'block';
                orderForm.style.display = 'block';
                if (mobileCartToggle) mobileCartToggle.style.display = 'flex';
            }

            // Update counts & totals
            var itemWord = count === 1 ? (typeof t === 'function' ? t('order_item') : 'item') : (typeof t === 'function' ? t('order_items') : 'items');
            cartCount.textContent = count + ' ' + itemWord;
            cartTotalAmount.textContent = '\u20AC' + total.toFixed(2);

            if (mobileCartBadge) mobileCartBadge.textContent = count;
            if (mobileCartTotal) mobileCartTotal.textContent = '\u20AC' + total.toFixed(2);

            // Render item rows (keep existing non-item elements)
            const existingRows = cartItemsEl.querySelectorAll('.cart-item-row');
            existingRows.forEach(el => el.remove());

            items.forEach(item => {
                const row = document.createElement('div');
                row.className = 'cart-item-row';
                row.innerHTML =
                    '<div class="cart-item-details">' +
                        '<span class="cart-item-name">' + item.name + '</span>' +
                        '<span class="cart-item-price">\u20AC' + (item.price * item.qty).toFixed(2) + '</span>' +
                    '</div>' +
                    '<div class="cart-item-controls">' +
                        '<button type="button" class="qty-btn qty-minus" data-name="' + item.name + '">-</button>' +
                        '<span class="qty-value">' + item.qty + '</span>' +
                        '<button type="button" class="qty-btn qty-plus" data-name="' + item.name + '">+</button>' +
                        '<button type="button" class="qty-btn qty-remove" data-name="' + item.name + '">&times;</button>' +
                    '</div>';
                cartItemsEl.insertBefore(row, cartEmpty);
            });

            // Update hidden form input
            const cartData = items.map(item => ({
                name: item.name,
                price: item.priceStr,
                qty: item.qty,
                category: item.category,
            }));
            cartItemsInput.value = JSON.stringify(cartData);
        }

        // Add to cart
        document.querySelectorAll('.btn-add-cart').forEach(btn => {
            btn.addEventListener('click', function () {
                const name = this.dataset.name;
                const priceStr = this.dataset.price;
                const category = this.dataset.category;
                const price = parsePrice(priceStr);

                if (cart[name]) {
                    cart[name].qty += 1;
                } else {
                    cart[name] = { name, price, priceStr, qty: 1, category };
                }
                renderCart();

                // Button feedback
                var addText = typeof t === 'function' ? t('order_add') : '+ Add';
                this.textContent = '\u2713';
                this.classList.add('added');
                var btn = this;
                setTimeout(function () {
                    btn.textContent = addText;
                    btn.classList.remove('added');
                }, 600);
            });
        });

        // Cart item controls (delegated)
        cartItemsEl.addEventListener('click', function (e) {
            const btn = e.target.closest('.qty-btn');
            if (!btn) return;
            const name = btn.dataset.name;
            if (!cart[name]) return;

            if (btn.classList.contains('qty-minus')) {
                cart[name].qty = Math.max(1, cart[name].qty - 1);
            } else if (btn.classList.contains('qty-plus')) {
                cart[name].qty += 1;
            } else if (btn.classList.contains('qty-remove')) {
                delete cart[name];
            }
            renderCart();
        });

        // Order type toggle — show/hide delivery address
        const orderTypeRadios = document.querySelectorAll('input[name="order_type"]');
        const deliveryRow = document.getElementById('deliveryAddressRow');
        if (orderTypeRadios.length && deliveryRow) {
            orderTypeRadios.forEach(radio => {
                radio.addEventListener('change', function () {
                    deliveryRow.style.display = this.value === 'delivery' ? 'block' : 'none';
                });
            });
            // Init on page load
            const checked = document.querySelector('input[name="order_type"]:checked');
            if (checked && checked.value === 'delivery') {
                deliveryRow.style.display = 'block';
            }
        }

        // Mobile cart toggle — scroll to sidebar
        if (mobileCartToggle && cartSidebar) {
            mobileCartToggle.addEventListener('click', function () {
                cartSidebar.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        }

        // Form validation before submit
        orderForm.addEventListener('submit', function (e) {
            const items = getCartArray();
            if (items.length === 0) {
                e.preventDefault();
                alert('Your cart is empty. Please add items to order.');
                return;
            }
            const orderType = document.querySelector('input[name="order_type"]:checked');
            if (!orderType) {
                e.preventDefault();
                alert('Please select an order type.');
                return;
            }
            // Re-serialize cart before submit
            const cartData = items.map(item => ({
                name: item.name,
                price: item.priceStr,
                qty: item.qty,
                category: item.category,
            }));
            cartItemsInput.value = JSON.stringify(cartData);
        });

        renderCart();
    }

    // Parallax tilt on showcase media — subtle mouse follow
    document.querySelectorAll('.showcase-item').forEach(item => {
        const media = item.querySelector('.showcase-media');
        if (!media) return;
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            media.style.setProperty('--tilt-x', `${x * 6}deg`);
            media.style.setProperty('--tilt-y', `${-y * 6}deg`);
        });
        item.addEventListener('mouseleave', () => {
            media.style.setProperty('--tilt-x', `0deg`);
            media.style.setProperty('--tilt-y', `0deg`);
        });
    });
});
