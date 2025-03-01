# ProductInventoryPostman
479992084_2151873048590488_5528367802897626255_n.png

## Integration of POSTMAN

### Initialize Project:
```sh
mkdir product-inventory-api
cd product-inventory-api
npm init -y
```

### Install Required Dependencies:
```sh
npm install express mongoose dotenv bcryptjs jsonwebtoken cors morgan stripe
```

### Explanation of Packages:
- **express** → Framework for building the API
- **mongoose** → MongoDB ORM for defining schemas
- **dotenv** → Loads environment variables from a `.env` file
- **bcryptjs** → For hashing passwords securely
- **jsonwebtoken** → For authentication with JWT
- **cors** → To allow cross-origin requests
- **morgan** → Logger for monitoring API requests

### For Development:
```sh
npm install --save-dev nodemon
```

### Project Directory Structure:
```
product-inventory-api/
│-- config/
│   ├── database.js       # MongoDB connection
│-- models/
│   ├── Product.js        # Mongoose schema for products
│-- routes/
│   ├── productRoutes.js  # Product API endpoints
│-- controllers/
│   ├── productController.js # CRUD logic for products
│-- .env                   # Environment variables
│-- index.js               # Entry point
│-- package.json
```

### To Clone:
```sh
git clone https://github.com/chrisjallaine/ProductInventoryPostman.git
```
