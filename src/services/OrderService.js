import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { randomUUID } from 'crypto';
import { UserNotFound } from '../exceptions/UserNotFound.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ORDERS_FILE = path.join(__dirname, '../persistence/orderPersistence.json');
const USERS_FILE = path.join(__dirname, '../persistence/userPersistence.json');

export async function saveOrder(orderData) {
  const raw = await fs.readFile(ORDERS_FILE, 'utf-8');
  const orders = JSON.parse(raw);

  const newOrder = { id: randomUUID(), ...orderData };

  orders.push(newOrder);

  await fs.writeFile(ORDERS_FILE, JSON.stringify(orders, null, 2));

  return newOrder;
}

export async function getOrders(userId) {
  const [usersRaw, ordersRaw] = await Promise.all([
    fs.readFile(USERS_FILE, 'utf-8'),
    fs.readFile(ORDERS_FILE, 'utf-8')
  ]);
  

  const users = JSON.parse(usersRaw);
  const orders = JSON.parse(ordersRaw);

  const user = users.find(u => u.id === userId);
  
  if (!user) {
    throw new UserNotFound();
  }

  if (user.rol === 'admin') {
    return orders;
  }

  return orders.filter(order => order.userId === userId);
}