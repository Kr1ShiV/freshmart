const { connectRedis, getClient } = require('./config/redis');
const { mockProducts, mockOffers, mockBanners, mockStores } = require('./data/mockData');

async function seedDatabase() {
  try {
    await connectRedis();
    const client = getClient();
    
    console.log('🌱 Seeding Redis database...\n');

    // Clear existing data
    await client.flushDb();
    console.log('🗑️  Cleared existing data');

    // Seed products
    await client.set('products:all', JSON.stringify(mockProducts));
    console.log(`✅ Seeded ${mockProducts.length} products`);

    // Seed by category
    const categories = [...new Set(mockProducts.map(p => p.category))];
    for (const category of categories) {
      const catProducts = mockProducts.filter(p => p.category === category);
      await client.set(`products:category:${category.toLowerCase()}`, JSON.stringify(catProducts));
      console.log(`   📁 Category: ${category} (${catProducts.length} products)`);
    }

    // Seed individual products
    for (const product of mockProducts) {
      await client.set(`product:${product.id}`, JSON.stringify(product));
    }
    console.log('   📦 Individual product entries created');

    // Seed offers
    await client.set('offers:all', JSON.stringify(mockOffers));
    console.log(`✅ Seeded ${mockOffers.length} offers`);

    // Seed banners
    await client.set('offers:banners', JSON.stringify(mockBanners));
    console.log(`✅ Seeded ${mockBanners.length} banners`);

    // Seed stores
    await client.set('stores:all', JSON.stringify(mockStores));
    console.log(`✅ Seeded ${mockStores.length} stores`);

    // Seed view counts (sorted set for leaderboard)
    for (const product of mockProducts) {
      await client.zAdd('leaderboard:views', { score: product.views, value: product.id });
    }
    console.log('✅ Seeded product view leaderboard');

    console.log('\n🎉 Database seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  }
}

seedDatabase();
