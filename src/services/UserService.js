import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { randomUUID } from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const USERS_FILE = path.join(__dirname, '../persistence/userPersistence.json');

export async function saveUser(userData) {
  const raw = await fs.readFile(USERS_FILE, 'utf-8');
  const users = JSON.parse(raw);

  const newUser = { id: randomUUID(), ...userData };

  users.push(newUser);
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));

  return newUser;
}

export async function getUsers() {
  const raw = await fs.readFile(USERS_FILE, 'utf-8');
  const users = JSON.parse(raw);
  return users;
}
