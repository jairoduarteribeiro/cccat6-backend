import dotenv from 'dotenv';

const path = process.env.NODE_ENV === 'development' ? '.env.test.local' : '.env';
dotenv.config({ path });
