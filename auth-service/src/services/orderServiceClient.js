const axios = require('axios');

const ORDER_SERVICE_URL = (process.env.ORDER_SERVICE_URL || 'http://localhost:3001')
  .replace(/\/+$/, '');
const INTERNAL_SECRET = process.env.INTERNAL_SERVICE_SECRET || 'wowwraps_internal_secret';

const client = axios.create({
  baseURL: `${ORDER_SERVICE_URL}/api`,
  timeout: 5000
});

exports.ensureUserCart = async (userId) => {
  if (!userId) return;
  try {
    await client.post(
      '/carts/system/create',
      { userId },
      {
        headers: {
          'x-internal-secret': INTERNAL_SECRET
        }
      }
    );
  } catch (error) {
    console.error('Failed to ensure cart for user', userId, error.response?.data || error.message);
  }
};