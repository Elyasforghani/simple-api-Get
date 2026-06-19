      const inp = document.querySelector('#search');
        const grid = document.querySelector('#product-grid');
        const toggleBtn = document.querySelector('#theme-toggle');
        const baseUrl = 'https://dummyjson.com/products';

        // 1. Theme Initialization Logic (Prevents white flashing on dark backgrounds)
        if (
            localStorage.getItem('theme') === 'dark' || 
            (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
        ) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        // 2. Multi-Element GSAP Entry Sequencing
        window.addEventListener('DOMContentLoaded', () => {
            gsap.timeline()
                .to('#theme-toggle', { opacity: 1, duration: 0.4 })
                .to('#header-title', { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.2')
                .to('#header-subtitle', { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }, '-=0.2')
                .to('#search-container', { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }, '-=0.2');

            fetchData(baseUrl);
        });

        // 3. Theme Switch Action
        toggleBtn.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
            
            if (document.documentElement.classList.contains('dark')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });

        // 4. Fetch Controller
        async function fetchData(url) {
            grid.innerHTML = `
                <div class="col-span-full text-center py-16 text-slate-400 dark:text-slate-500 font-medium tracking-wide animate-pulse text-sm">
                    Loading catalog items...
                </div>
            `;

            try {
                const res = await fetch(url);
                if (!res.ok) throw new Error('API Execution Error');
                const data = await res.json();
                renderProducts(data.products);
            } catch (err) {
                console.error(err);
                grid.innerHTML = `
                    <div class="col-span-full text-center py-12">
                        <p class="text-rose-600 dark:text-rose-400 font-medium">Failed to synchronize catalog items.</p>
                    </div>
                `;
            }
        }

        // 5. Card Generation & GSAP Reveal Engine
        function renderProducts(products) {
            grid.innerHTML = '';

            if (!products || products.length === 0) {
                grid.innerHTML = `
                    <div class="col-span-full text-center py-16">
                        <p class="text-slate-400 dark:text-slate-500 text-lg">No matching catalog items found.</p>
                    </div>
                `;
                return;
            }

            products.forEach((val) => {
                const card = document.createElement('div');
                card.className = 'product-card bg-white hover:bg-slate-50/50 dark:bg-slate-900/40 dark:hover:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl p-4 flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-md dark:shadow-xl dark:hover:shadow-purple-500/5 group opacity-0 transform translate-y-4';

                card.innerHTML = `
                    <div>
                        <div class="w-full h-48 rounded-xl overflow-hidden bg-slate-100/70 border border-slate-100 dark:bg-slate-950 dark:border-slate-800/50 flex items-center justify-center relative">
                            <img src="${val.thumbnail}" alt="${val.title}" class="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105" loading="lazy">
                            <span class="absolute top-2 left-2 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider bg-white/90 border border-slate-200 text-purple-600 dark:bg-slate-900/80 dark:border-slate-800 dark:text-purple-400 rounded-md backdrop-blur-sm shadow-sm">
                                ${val.category}
                            </span>
                        </div>
                        
                        <div class="mt-4">
                            <h3 class="text-base font-semibold text-slate-800 dark:text-slate-200 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-1">${val.title}</h3>
                            <p class="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed min-h-[2.5rem]">${val.description}</p>
                        </div>
                    </div>

                    <div class="flex items-center justify-between mt-5 pt-3 border-t border-slate-100 dark:border-slate-800/50">
                        <span class="text-lg font-bold bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">$${val.price}</span>
                        <button 
                            onclick="inspectProduct('${val.title.replace(/'/g, "\\'")}', '${val.price}')" 
                            class="px-3.5 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-purple-600 hover:text-white dark:text-slate-200 dark:bg-slate-800 dark:hover:bg-purple-600 border border-slate-200/80 dark:border-slate-700 dark:hover:border-transparent rounded-lg transition-all active:scale-95 shadow-sm"
                        >
                            Inspect
                        </button>
                    </div>
                `;
                grid.appendChild(card);
            });

            // GSAP Card Stagger Sequence
            gsap.to('.product-card', {
                opacity: 1,
                y: 0,
                duration: 0.45,
                stagger: 0.05,
                ease: 'power2.out'
            });
        }

        // 6. Action Inspection Panel
        function inspectProduct(name, price) {
            alert(`Asset Inspection:\nItem: ${name}\nValue: $${price}`);
        }

        // 7. High-Performance Debounce Input Logic
        let searchTimeout;
        inp.addEventListener('input', () => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                const query = inp.value.trim();
                const targetUrl = query ? `${baseUrl}/search?q=${query}` : baseUrl;
                fetchData(targetUrl);
            }, 350);
        });