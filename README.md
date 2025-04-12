# ProductInventoryPostmanBackEnd

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

### Open Connection:
```sh
nodemon index.js
```

### Project Directory Structure:
```
product-inventory-api/
│
├── config/
├── models/
├── routes/
├── controllers/
├── testing/
├── .env
├── index.js
├── package.json
├── requirements.txt
│
├── frontend/                        
│   ├── public/
│   ├── src/
│   │   ├── api/                    
│   │   │   └── axios.js
│   │   ├── components/            
│   │   ├── pages/                 
│   │   │   ├── ProductPage.js
│   │   │   ├── InventoryPage.js
│   │   │   ├── CategoryPage.js
│   │   │   ├── SupplierPage.js
│   │   │   └── WarehousePage.js
│   │   ├── App.js                 
│   │   └── index.js
│   ├── .env                       
│   ├── package.json
│   └── README.md

```

### To Clone:
```sh
git clone https://github.com/chrisjallaine/ProductInventoryPostmanBackEnd.git
```
