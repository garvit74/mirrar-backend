# Assigment



## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/garvit74/mirrar-backend.git
   ```

2. **Install dependencies:**

   ```bash
   cd your-repo
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add the following:

   ```env
   PORT=8000
   MONGODB_URI=your_mongodb_uri
   ```

## Usage

1. **Run the server:**

   ```bash
   npm start
   ```

2. **Access the API:**

   The server will start at http://localhost:8000. You can use tools like Postman or cURL to interact with the following endpoints:

   - `POST /api/products`: Create New Product
   - `GET /api/products`: Get all products
   - `GET /api/products?query=name_of_product`: Search Query
   - `PUT /api/products/:id`: Modify products details
   - `DELETE /api/products/:id`: Delete products

## Folder Structure

- `config`: Configuration files (e.g., database connection)
- `controllers`: Functions handling business logic
- `routes`: Route definitions
- `models`: Data models for MongoDB

## Dependencies

- `express`: Web framework for Node.js
- `mongoose`: MongoDB object modeling tool
- `dotenv`: Environment variable management
- `cors`: Cross-Origin Resource Sharing