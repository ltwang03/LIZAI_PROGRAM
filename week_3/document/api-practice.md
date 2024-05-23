# Run App
**Installation** <br>
To install the necessary dependencies for the application, navigate to the project directory in your terminal and run the following command:
```shell
npm install
```
**Running the App** <br>
After the installation is complete, you can start the application by running the following command in your terminal:
```shell
npm run dev
```
**Endpoint** <br>
```text
http://localhost:3000
```

# Product API

## Get All Products
**Endpoint**: `GET /products`<br>
**Description**: Retrieves a list of all products.
**Response**:
```json
{
  "message": "Get All Product Success",
  "statusCode": 200,
  "metadata": [
    {
      "id": 4,
      "name": "Product 4",
      "description": "This is product 4",
      "price": 400
    },
    {
      "id": 5,
      "name": "Product 5",
      "description": "This is product 5",
      "price": 500
    }
  ]
}
```

## Create a Product
**Endpoint**: `POST /products` <br>
**Request Body**:
```json
{
  "name": "New Product",
  "description": "This is a new product",
  "price": 14.99
}
```
**Response**:
```json
{
  "message": " Create Product Success",
  "statusCode": 200,
  "metadata": {
    "name": "New Product",
    "description": "This is a new product",
    "price": 14.99,
    "id": 9
  }
}
```

## Delete a Product
**Endpoint**: `DELETE /products/:id`
**Parameters**:
- `id` (string): The ID of the product to delete.
  **Response**:
```json
{
  "message": "Delete Successful",
  "statusCode": 200,
  "metadata": {}
}
```

## Update a Product
**Endpoint**: `PUT /products/:id`
**Parameters**:
- `id` (string): The ID of the product to update.
  **Request Body**:
```json
{
  "name": "Updated Product",
  "description": "This is an updated product",
  "price": 16.99
}
```
**Response**:
```json
{
  "message": "Update Successful",
  "statusCode": 200,
  "metadata": {
    "id": 6,
    "name": "Updated Product",
    "description": "This is an updated product",
    "price": 16.99
  }
}
```

