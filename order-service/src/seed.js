/* eslint-disable no-console */
const { sequelize, MenuItem } = require('./models');

const MENU_ITEMS = [
    // Breakfast
    {
        name: 'Trứng lòng đào phủ pesto',
        price: 89000,
        category: 'breakfast',
        type: 'food',
        description: 'Bánh muffin sourdough áp chảo, trứng lòng đào và pesto basil tươi.',
        imageUrl: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=800&q=80',
        badge: 'PIN IT',
        orderIndex: 101,
        isFeatured: true,
        sku: 'PT-322',
        tags: ['Breakfast', 'Muffin'],
    },
    {
        name: 'Thanh bánh mì ngũ cốc nướng',
        price: 129000,
        category: 'breakfast',
        type: 'food',
        description: 'Sourdough ngũ cốc nguyên cám nướng giòn cùng mật ong và trái cây theo mùa.',
        imageUrl: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=80',
        badge: 'PIN IT',
        orderIndex: 102,
        isFeatured: false,
        sku: 'BB-110',
        tags: ['Wholegrain', 'Sweet'],
    },
    {
        name: 'Sandwich phô mai mật ong',
        price: 99000,
        category: 'breakfast',
        type: 'food',
        description: 'Sandwich phô mai dê, mật ong hoa cải và hạt óc chó rang.',
        imageUrl: 'https://images.unsplash.com/photo-1508736793122-f516e3ba5569?auto=format&fit=crop&w=800&q=80',
        badge: 'PIN IT',
        orderIndex: 103,
        isFeatured: false,
        sku: 'SW-221',
        tags: ['Sandwich', 'Cheese'],
    },
    // Lunch
    {
        name: 'Gà chiên giòn phủ sốt mật ong',
        price: 145000,
        category: 'lunch',
        type: 'food',
        description: 'Ức gà chiên giòn kết hợp sốt mật ong cay và salad lúa mạch.',
        imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
        badge: 'Món bán chạy',
        orderIndex: 201,
        isFeatured: true,
        sku: 'LC-401',
        tags: ['Chicken', 'Crunchy'],
    },
    {
        name: 'Mì Szechuan chay',
        price: 135000,
        category: 'lunch',
        type: 'food',
        description: 'Mì Szechuan sốt bơ lạc, đậu hủ chiên và rau củ hữu cơ.',
        imageUrl: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80',
        badge: 'Thuần chay',
        orderIndex: 202,
        isFeatured: false,
        sku: 'SZ-214',
        tags: ['Szechuan', 'Vegan'],
    },
    {
        name: 'Burger cá hồi nướng',
        price: 169000,
        category: 'lunch',
        type: 'food',
        description: 'Bánh burger cá hồi nướng lửa than, mayo chanh leo và dưa chuột muối.',
        imageUrl: 'https://images.unsplash.com/photo-1493770348161-369560ae357d?auto=format&fit=crop&w=800&q=80',
        badge: 'Chef pick',
        orderIndex: 203,
        isFeatured: false,
        sku: 'BG-502',
        tags: ['Burger', 'Salmon'],
    },
    // Dinner
    {
        name: 'Thăn bò nướng than hồng',
        price: 260000,
        category: 'dinner',
        type: 'food',
        description: 'Thăn vai bò Úc nướng nhiệt độ thấp, khoai nghiền bơ nâu và sốt tiêu xanh.',
        imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
        badge: 'Signature',
        orderIndex: 301,
        isFeatured: true,
        sku: 'ST-744',
        tags: ['Steak', 'Dinner'],
    },
    {
        name: 'Mì Szechuan hải sản',
        price: 210000,
        category: 'dinner',
        type: 'food',
        description: 'Sợi mì tươi xào hải sản và dầu ớt Szechuan, kèm cải thìa non.',
        imageUrl: 'https://images.unsplash.com/photo-1460306855393-0410f61241c7?auto=format&fit=crop&w=800&q=80',
        badge: 'Spicy',
        orderIndex: 302,
        isFeatured: false,
        sku: 'SZ-734',
        tags: ['Spicy', 'Seafood'],
    },
    {
        name: 'Cá tuyết sốt miso',
        price: 235000,
        category: 'dinner',
        type: 'food',
        description: 'Phi lê cá tuyết Na Uy áp chảo sốt miso đỏ, phục vụ cùng đậu Hà Lan.',
        imageUrl: 'https://images.unsplash.com/photo-1488900128323-21503983a07e?auto=format&fit=crop&w=800&q=80',
        badge: 'Mùa đông',
        orderIndex: 303,
        isFeatured: false,
        sku: 'CD-611',
        tags: ['Cod', 'Miso'],
    },
    // Starters
    {
        name: 'Khoai tây truffle',
        price: 89000,
        category: 'starters',
        type: 'food',
        description: 'Khoai tây cắt tay chiên bơ nâu, muối biển Maldon và dầu truffle.',
        imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
        badge: 'Sharing',
        orderIndex: 401,
        isFeatured: true,
        sku: 'AP-101',
        tags: ['Starter', 'Sharing'],
    },
    {
        name: 'Cocktail tôm sốt cam thảo',
        price: 119000,
        category: 'starters',
        type: 'food',
        description: 'Tôm sú hấp, sốt cam thảo và salad táo xanh mát lạnh.',
        imageUrl: 'https://images.unsplash.com/photo-1478749485505-2a903a729c63?auto=format&fit=crop&w=800&q=80',
        badge: 'Fresh catch',
        orderIndex: 402,
        isFeatured: false,
        sku: 'SR-932',
        tags: ['Seafood', 'Starter'],
    },
    {
        name: 'Burger mini bò Wagyu',
        price: 159000,
        category: 'starters',
        type: 'food',
        description: 'Slider bò Wagyu, phô mai Gruyère và hành caramel.',
        imageUrl: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=800&q=80',
        badge: 'Mini',
        orderIndex: 403,
        isFeatured: false,
        sku: 'WG-812',
        tags: ['Slider', 'Premium'],
    },
];

async function seedMenuItems() {
    for (const item of MENU_ITEMS) {
        const [record, created] = await MenuItem.findOrCreate({
            where: { name: item.name, category: item.category },
            defaults: item,
        });

        if (!created) {
            await record.update(item);
        }
    }
}

async function run() {
    try {
        await sequelize.authenticate();
        console.log('Kết nối cơ sở dữ liệu thành công.');
        await seedMenuItems();
        console.log('Đã seed dữ liệu menu mẫu 🎉');
    } catch (error) {
        console.error('Seed thất bại:', error.message);
    } finally {
        await sequelize.close();
    }
}

run();

