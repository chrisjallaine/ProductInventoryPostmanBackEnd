# Add a New Product  

### **Endpoint:**  
`POST http://localhost:5000/api/products`  

### **Request Body (JSON - Raw):**  
```json
{
    "name": "Item Name", 
    "description": "Stylish Item Description", 
    "price": number, 
    "category": "Category (e.g : Men, Women, Kids)", 
    "supplier": "Supplier Name (e.g Nike, etc.)" 
}
```

# Add a Warehouse  

### **Endpoint:**  
`POST http://localhost:5000/api/warehouses`  

### **Request Body (JSON - Raw):**  
```json
{
    //example
    "location": "Main Storage",
    "capacity": 500
}
```

# Add a Category  

### **Endpoint:**  
`POST http://localhost:5000/api/categories`  

### **Request Body (JSON - Raw):**  
```json
{
    //example
    "name": "Men",
    "description": "Clothing for Men"
}
```

# Add Inventory  

### **Endpoint:**  
`POST http://localhost:5000/api/inventory`  

### **Request Body (JSON - Raw):**  
```json
{
    //example
    "product_id": "67c438953b60848d2918a216",
    "warehouse_id": "67c438293b60848d2918a210",
    "stock_quantity": 50
}