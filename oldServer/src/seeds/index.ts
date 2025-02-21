import { User } from '../models/user.js';

export const seedUsers = async () => {
  await User.bulkCreate([
    { username: 'jeremy', email: 'a@b.com', password: 'password' },
    { username: 'lina', email: 'b@e.com', password: 'password' },
    { username: 'fex', email: 'c@f.com', password: 'password' },
    { username: 'jonathan', email: 'd@g.com', password: 'password' },
  ], { individualHooks: true });
};
