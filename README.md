# NewsStar  

## Overview  

NewsStar is a news search application that lets users:  
- 🔍 **Search for news articles** by topic and filter by date  
- ⭐ **Save & favorite stories** for later  
- 📖 **View saved articles** on a "Favorites" page  
- 🔐 **Securely log in** with JWT authentication  

## Tech Stack  
- **Frontend:** React, Bootstrap, Semantic  
- **Backend:** Node.js, Express.js, GraphQL  
- **Database:** MongoDB (via MongoDB Atlas)  
- **Authentication:** JWT  
- **News API:** [NewsAPI.org](https://newsapi.org/)  

## Installation  

### Prerequisites  
Install Node if you have not already:
- **[Node.js](https://nodejs.org/)**   
 

After install, create a .env file (in the server level folder) with the required information.

```
cp .env.example .env

DB_URL=your_database_url_here
API_KEY=your_api_key_here
JWT_SECRET_KEY=your_jwt_secret_here
```
Generate a Secure JWT Secret Key

```
openssl rand -base64 32
```
Then install dependencies and run NewsStar.
```
# Install dependencies
npm install  

# Build the project and start the server
npm run develop
```

## Usage

Create a new account and login to start searching!

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Builders

Built with ❤️ by [Wsanchez91](https://github.com/Wsanchez91), [themodestokid](https://github.com/themodestokid), [
Silv3rHRT](https://github.com/Silv3rHRT), [joshc130](https://github.com/joshc130) ,  & [cbroomew](https://github.com/cbroomew)