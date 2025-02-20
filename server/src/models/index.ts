//TODO: make sure foreign key is correct for search.ts
import sequelize from '../config/connection.js';
import { SearchFactory } from './search.js';
import { UserFactory } from './user.js';

const User = UserFactory(sequelize);
const Search = SearchFactory(sequelize);

export { sequelize, User, Search };
