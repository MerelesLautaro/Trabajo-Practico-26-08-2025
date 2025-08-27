import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { randomUUID } from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ORDERS_FILE = path.join(__dirname, '../persistence/orderPersistence.json');

export async function saveOrder(orderData) {
  const raw = await fs.readFile(ORDERS_FILE, 'utf-8');
  const orders = JSON.parse(raw);

  const newOrder = { id: randomUUID(), ...orderData };

  orders.push(newOrder);

  await fs.writeFile(ORDERS_FILE, JSON.stringify(orders, null, 2));

  return newOrder;
}