# NewsStar

NewsStar is an application that allows users to search for and find the latest news articles from their favorite publishers. Use this app to make your life simpler and find articles that are top of mind!

## Installation

First, install Node.js and npm if you haven't already:  

```sh
npm install npm@latest -g  
```

After install, creat a .env file (in the server level folder) with the required information.

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

# Build the project
npm run build  

# Start the development server
npm run start:dev  
```

## Usage

Create a new account and login to start searching!

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Builders

Built with ❤️ by [jpoor33](https://github.com/jpoor33), [themodestokid](https://github.com/themodestokid), [
Silv3rHRT](https://github.com/Silv3rHRT), & [fexsadridinov](https://github.com/fexsadridinov)