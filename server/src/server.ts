const forceDatabaseRefresh = false; 

import express from 'express';
import sequelize from './config/connection.js'; // Import the initialized Sequelize instance
import routes from './routes/index.js';  // Import the routes for handling different endpoints

const app = express();
const PORT = process.env.PORT || 3001;

app. use(express.static('../client/dist'));

app.use(express.json());
app.use(routes);

sequelize.sync({ force: forceDatabaseRefresh}).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`)
    })
})