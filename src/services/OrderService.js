import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { randomUUID } from 'crypto';
import { UserNotFound } from '../exceptions/UserNotFound.js';
import { UnauthorizedAccess } from '../exceptions/UnauthorizedAccess.js';
import { ResourceNotFound } from '../exceptions/ResourceNotFound.js';

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
  const user = await findUserById(userId);

  const ordersRaw = await fs.readFile(ORDERS_FILE, 'utf-8');
  const orders = JSON.parse(ordersRaw);

  if (user.rol === 'admin') {
    return orders;
  }

  return orders.filter(order => order.userId === userId);
}

export async function updateOrderState(userId, orderId, newState) {
  await validateAdmin(userId);

  const ordersRaw = await fs.readFile(ORDERS_FILE, 'utf-8');
  const orders = JSON.parse(ordersRaw);

  const orderIndex = orders.findIndex(o => o.id === orderId);
  if (orderIndex === -1) {
    throw new ResourceNotFound();
  }

  orders[orderIndex].status = newState;

  await fs.writeFile(ORDERS_FILE, JSON.stringify(orders, null, 2));


  console.log(`Usuario que realizó la acción: ${userId}
  id del pedido: ${orderId}
  Nuevo estado: ${newState}`);

  return orders[orderIndex];
}

async function getAllUsers() {
  const usersRaw = await fs.readFile(USERS_FILE, 'utf-8');
  return JSON.parse(usersRaw);
}

async function findUserById(userId) {
  const users = await getAllUsers();
  const user = users.find(u => u.id === userId);

  if (!user) {
    throw new UserNotFound();
  }

  return user;
}

async function validateAdmin(userId) {
  const user = await findUserById(userId);

  if (user.rol !== 'admin') {
    throw new UnauthorizedAccess();
  }

  return user;
}