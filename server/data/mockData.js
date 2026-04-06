const mockProducts = [
  // Fruits & Vegetables
  {
    id: "p001",
    name: "Fresh Shimla Apples",
    category: "Fruits & Vegetables",
    price: 180,
    unit: "kg",
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=300&fit=crop",
    description: "Juicy Shimla apples from Himachal orchards. Crisp, sweet, and naturally grown.",
    popularity: 95,
    inStock: true,
    views: 234
  },
  {
    id: "p002",
    name: "Organic Bananas",
    category: "Fruits & Vegetables",
    price: 45,
    unit: "dozen",
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=300&fit=crop",
    description: "Farm fresh organic bananas, naturally ripened. Rich in potassium and energy.",
    popularity: 92,
    inStock: true,
    views: 210
  },
  {
    id: "p003",
    name: "Fresh Tomatoes",
    category: "Fruits & Vegetables",
    price: 40,
    unit: "kg",
    image: "https://tiimg.tistatic.com/fp/1/007/531/organic-fresh-red-colour-tomato-with-high-nutritious-values-taste-225.jpg",
    description: "Locally grown ripe tomatoes, perfect for sabzi, chutney, and salads.",
    popularity: 88,
    inStock: true,
    views: 195
  },
  {
    id: "p004",
    name: "Palak (Spinach)",
    category: "Fruits & Vegetables",
    price: 30,
    unit: "bunch",
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=300&fit=crop",
    description: "Fresh green palak leaves, washed and ready. Perfect for palak paneer and smoothies.",
    popularity: 76,
    inStock: true,
    views: 145
  },
  {
    id: "p005",
    name: "Aloo (Potatoes)",
    category: "Fruits & Vegetables",
    price: 35,
    unit: "kg",
    image: "https://m.media-amazon.com/images/I/41QKCkQ2A5L.jpg",
    description: "Fresh Himachali potatoes, ideal for aloo gobi, parantha, and sabzi.",
    popularity: 90,
    inStock: true,
    views: 198
  },
  {
    id: "p006",
    name: "Pyaaz (Onions)",
    category: "Fruits & Vegetables",
    price: 38,
    unit: "kg",
    image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400&h=300&fit=crop",
    description: "Premium quality onions, essential for every Indian kitchen.",
    popularity: 85,
    inStock: true,
    views: 176
  },

  // Dairy
  {
    id: "p007",
    name: "Amul Taza Milk",
    category: "Dairy",
    price: 68,
    unit: "1L",
    image: "https://cdn.dotpe.in/longtail/item_thumbnails/5897099/HNryhcLx-400-400.webp",
    description: "Amul Taza homogenised toned milk. Fresh and pasteurised.",
    popularity: 93,
    inStock: true,
    views: 220
  },
  {
    id: "p008",
    name: "Mother Dairy Dahi",
    category: "Dairy",
    price: 45,
    unit: "400g",
    image: "https://www.jiomart.com/images/product/original/491159916/mother-dairy-classic-dahi-80-g-cup-product-images-o491159916-p590041366-0-202305102041.jpg?im=Resize=(1000,1000)",
    description: "Thick and creamy curd (dahi), perfect for raita and lassi.",
    popularity: 82,
    inStock: true,
    views: 167
  },
  {
    id: "p009",
    name: "Amul Paneer",
    category: "Dairy",
    price: 95,
    unit: "200g",
    image: "https://www.bbassets.com/media/uploads/p/l/40096748_3-amul-malai-fresh-paneer.jpg",
    description: "Fresh Amul paneer, soft and rich. Ideal for paneer butter masala.",
    popularity: 91,
    inStock: true,
    views: 205
  },
  {
    id: "p010",
    name: "Amul Butter",
    category: "Dairy",
    price: 58,
    unit: "100g",
    image: "https://m.media-amazon.com/images/I/61FzvpdoS6L._AC_UF894,1000_QL80_.jpg",
    description: "Amul butter — the taste of India. Perfect on paranthas and toast.",
    popularity: 87,
    inStock: true,
    views: 185
  },
  {
    id: "p011",
    name: "Amul Ghee",
    category: "Dairy",
    price: 599,
    unit: "1L",
    image: "https://image-cdn.ubuy.com/amul-pure-ghee-1l-905g/400_400_100/6812e94ca1e66f31f1176ec9.jpg",
    description: "Pure Amul cow ghee, rich aroma. Essential for dal tadka and halwa.",
    popularity: 89,
    inStock: true,
    views: 192
  },

  // Bakery
  {
    id: "p012",
    name: "Britannia Bread",
    category: "Bakery",
    price: 45,
    unit: "loaf",
    image: "https://www.starquik.com/cdn/shop/files/SQ165204_86215508-4d3a-41d4-b864-f88beade2e8c.jpg?v=1754328688",
    description: "Britannia whole wheat bread, soft and fresh. Perfect for sandwiches.",
    popularity: 80,
    inStock: true,
    views: 163
  },
  {
    id: "p013",
    name: "Parle-G Biscuits",
    category: "Bakery",
    price: 30,
    unit: "pack",
    image: "https://m.media-amazon.com/images/I/714PuAiIeeL.jpg",
    description: "India's favourite glucose biscuit. Goes perfectly with chai.",
    popularity: 94,
    inStock: true,
    views: 230
  },
  {
    id: "p014",
    name: "Fresh Pav",
    category: "Bakery",
    price: 35,
    unit: "6 pcs",
    image: "https://www.bbassets.com/media/uploads/p/xl/40286393_3-bonn-milk-pav-bread-premium-rich-soft-great-taste.jpg",
    description: "Soft and fluffy pav buns, perfect for pav bhaji and vada pav.",
    popularity: 84,
    inStock: true,
    views: 171
  },
  {
    id: "p015",
    name: "Cake Rusk",
    category: "Bakery",
    price: 55,
    unit: "300g",
    image: "https://m.media-amazon.com/images/I/71S83y8ePnL.jpg",
    description: "Crunchy cake rusk, toasted to perfection. Best with evening chai.",
    popularity: 78,
    inStock: true,
    views: 152
  },

  // Beverages
  {
    id: "p016",
    name: "Tata Tea",
    category: "Beverages",
    price: 245,
    unit: "500g",
    image: "https://i0.wp.com/rasan.co.in/wp-content/uploads/2021/10/Tata-Tea-Premium-1kg.webp?fit=400%2C400&ssl=1",
    description: "Premium Tata Tea Gold, 15% long leaves for rich taste. India's favourite chai.",
    popularity: 90,
    inStock: true,
    views: 200
  },
  {
    id: "p017",
    name: "Nescafé Coffee",
    category: "Beverages",
    price: 195,
    unit: "200g",
    image: "https://i0.wp.com/rasan.co.in/wp-content/uploads/2021/10/Nescafe-Classic-Coffee-Jar-50gm.webp?fit=400%2C400&ssl=1",
    description: "Nescafé Classic instant coffee. Rich aroma and smooth taste.",
    popularity: 83,
    inStock: true,
    views: 168
  },
  {
    id: "p018",
    name: "Real Fruit Juice",
    category: "Beverages",
    price: 99,
    unit: "1L",
    image: "https://www.starquik.com/cdn/shop/files/Real__Masala_Mixed_Fruit_1Ltr_back_cd8605d0-6839-4919-8c90-b90c98643df5.jpg?v=1754328375&width=416",
    description: "Real mango juice, made with Alphonso mangoes. No added preservatives.",
    popularity: 86,
    inStock: true,
    views: 179
  },
  {
    id: "p019",
    name: "Bisleri Water",
    category: "Beverages",
    price: 20,
    unit: "1L",
    image: "https://i0.wp.com/sipnjoy.in/wp-content/uploads/2022/01/R76HHCoZE1j6B8U7cymd.jpg?fit=360%2C380&ssl=1",
    description: "Bisleri mineral water, safe and pure. Trusted hydration.",
    popularity: 70,
    inStock: true,
    views: 121
  },

  // Snacks
  {
    id: "p020",
    name: "Haldiram Namkeen",
    category: "Snacks",
    price: 85,
    unit: "200g",
    image: "https://rasan.co.in/wp-content/uploads/2021/10/Haldirams-Namkeen-All-In-One-150-g.webp",
    description: "Haldiram's Aloo Bhujia — crispy, crunchy, and irresistibly tasty.",
    popularity: 88,
    inStock: true,
    views: 190
  },
  {
    id: "p021",
    name: "Lay's Chips",
    category: "Snacks",
    price: 40,
    unit: "pack",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT40mEYxeHgjOjrwle2AKU5DAIcZyUS9lrxcQ&s",
    description: "Lay's Magic Masala chips. India's favourite flavour, extra crunchy.",
    popularity: 81,
    inStock: true,
    views: 165
  },
  {
    id: "p022",
    name: "Cadbury Dairy Milk",
    category: "Snacks",
    price: 15,
    unit: "bar",
    image: "https://cdn.dotpe.in/longtail/item_thumbnails/8839286/AhRHuLVI-400-400.webp",
    description: "Cadbury Dairy Milk Silk, smooth and creamy chocolate. Kuch meetha ho jaaye!",
    popularity: 92,
    inStock: true,
    views: 215
  },
  {
    id: "p023",
    name: "Maggi Noodles",
    category: "Snacks",
    price: 44,
    unit: "4 pack",
    image: "https://image-cdn.ubuy.com/maggi-noodles-masala-70g-pack-of-4/400_400_100/6813e68a076176cf1f0ba69f.jpg",
    description: "Maggi 2-Minute Noodles — India's ultimate comfort food. Masala flavour.",
    popularity: 96,
    inStock: true,
    views: 245
  },

  // Household
  {
    id: "p024",
    name: "Vim Dish Wash",
    category: "Household",
    price: 20,
    unit: "145ml",
    image: "https://cdn01.pharmeasy.in/dam/products_otc/S77032/vim-dish-wash-lemon-packet-of-145ml-liquid-2-1689842061.jpg?dim=400x0&dpr=1&q=100",
    description: "Vim dishwash liquid with lemon power. Tough on grease, gentle on hands.",
    popularity: 72,
    inStock: true,
    views: 130
  },
  {
    id: "p025",
    name: "Surf Excel Detergent",
    category: "Household",
    price: 400,
    unit: "2kg",
    image: "https://image-cdn.ubuy.com/quick-wash-detergent-powder-1-kg/400_400_100/68166c99d7330101bf0e5243.jpg",
    description: "Surf Excel Easy Wash detergent powder. Daag acche hain!",
    popularity: 75,
    inStock: true,
    views: 140
  },
  {
    id: "p026",
    name: "Harpic Cleaner",
    category: "Household",
    price: 89,
    unit: "500ml",
    image: "https://albine.in/storage/photoroom-20240405-152407-800x800.png",
    description: "Harpic toilet cleaner, kills 99.9% germs. Keeps your bathroom fresh.",
    popularity: 68,
    inStock: true,
    views: 112
  }
];

const mockOffers = [
  {
    id: "o001",
    productId: "p001",
    name: "Fresh Shimla Apples",
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=300&fit=crop",
    originalPrice: 180,
    salePrice: 120,
    discount: 33,
    expiryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Fresh Himachali apples at an amazing price!"
  },
  {
    id: "o002",
    productId: "p009",
    name: "Amul Paneer",
    image: "https://www.bbassets.com/media/uploads/p/l/40096748_3-amul-malai-fresh-paneer.jpg",
    originalPrice: 95,
    salePrice: 69,
    discount: 27,
    expiryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Premium paneer at unbeatable price — make paneer tikka tonight!"
  },
  {
    id: "o003",
    productId: "p013",
    name: "Parle-G Biscuits",
    image: "https://m.media-amazon.com/images/I/714PuAiIeeL.jpg",
    originalPrice: 30,
    salePrice: 20,
    discount: 33,
    expiryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    description: "India's favourite biscuit — grab this chai-time deal!"
  },
  {
    id: "o004",
    productId: "p020",
    name: "Haldiram Namkeen",
    image: "https://rasan.co.in/wp-content/uploads/2021/10/Haldirams-Namkeen-All-In-One-150-g.webp",
    originalPrice: 85,
    salePrice: 59,
    discount: 31,
    expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Crunchy namkeen at an amazing price — stock up now!"
  },
  {
    id: "o005",
    productId: "p018",
    name: "Real Fruit Juice",
    image: "https://www.starquik.com/cdn/shop/files/Real__Masala_Mixed_Fruit_1Ltr_back_cd8605d0-6839-4919-8c90-b90c98643df5.jpg?v=1754328375&width=416",
    originalPrice: 99,
    salePrice: 69,
    discount: 30,
    expiryDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Premium mango juice — refreshing summer deal!"
  },
  {
    id: "o006",
    productId: "p023",
    name: "Maggi Noodles",
    image: "https://image-cdn.ubuy.com/maggi-noodles-masala-70g-pack-of-4/400_400_100/6813e68a076176cf1f0ba69f.jpg",
    originalPrice: 56,
    salePrice: 42,
    discount: 25,
    expiryDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Maggi at a special price — stock up for midnight cravings!"
  }
];

const mockBanners = [
  {
    id: "b001",
    title: "Himachali Fresh Sale",
    subtitle: "Up to 35% off on Fresh Fruits & Vegetables from local farms",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&h=400&fit=crop",
    color: "#2E7D32",
    link: "/offers"
  },
  {
    id: "b002",
    title: "Chai Time Bonanza",
    subtitle: "Special offers on Tea, Biscuits & Snacks — perfect with your chai!",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200&h=400&fit=crop",
    color: "#F57F17",
    link: "/offers"
  },
  {
    id: "b003",
    title: "Healthy India Week",
    subtitle: "Organic & Fresh Products at Special Prices — Eat Fresh, Stay Healthy",
    image: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=1200&h=400&fit=crop",
    color: "#1565C0",
    link: "/products"
  },
  {
    id: "b004",
    title: "Weekend Grocery Mela",
    subtitle: "Stock Up & Save Big — Free Delivery on orders above ₹500",
    image: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=1200&h=400&fit=crop",
    color: "#C62828",
    link: "/offers"
  }
];

const mockStores = [
  {
    id: "s001",
    name: "Moksh Store",
    address: "Near JUIT, Waknaghat, Solan, Himachal Pradesh 173234",
    phone: "+91 94183-64589",
    hours: "Mon-Sat: 8AM-9PM, Sun: 9AM-8PM",
    lat: 31.01679576015924,
    lng: 77.0733827218649
  },
  {
    id: "s002",
    name: "Temple General Store",
    address: "Inside JUIT Campus, Waknaghat , Himachal Pradesh 173234",
    phone: "NOT AVAILABLE",
    hours: "Mon-Sat: 7AM-10PM, Sun: 8AM-9PM",
    lat: 31.01762049176361,
    lng: 77.06702502534633
  },
  {
    id: "s003",
    name: "BHAKTI GENERAL STORE",
    address: "SHOP NO 5, MAIN MARKET ROAD, near WATER FALL HILL TOWN, Waknaghat, Himachal Pradesh 173234",
    phone: "+91 80548-78561",
    hours: "Mon-Sat: 8AM-9PM, Sun: 9AM-8PM",
    lat: 31.017492810041617,
    lng: 77.07926464304117
  },
  {
    id: "s004",
    name: "Shiv Shakti General store",
    address: "near Ketlighat, Sungal, Waknaghat, Himachal Pradesh 173234",
    phone: "+91 98166-13918",
    hours: "Mon-Sun: 8AM-9PM",
    lat: 31.007688225453848,
    lng: 77.0907062328324
  },
  {
    id: "s005",
    name: "Shankar Daily Needs",
    address: "Khawara chowki, NH-22, Shoghi, Himachal Pradesh 171219",
    phone: "+91 97360-52745",
    hours: "Mon-Sat: 7AM-10PM, Sun: 8AM-9PM",
    lat: 31.034212239960553,
    lng: 77.1095539277574
  }
];

module.exports = { mockProducts, mockOffers, mockBanners, mockStores };
