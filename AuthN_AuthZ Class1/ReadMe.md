# 🔐 Authentication & Authorization using Express.js

A backend authentication and authorization project built using **Node.js, Express.js, MongoDB, and Mongoose**. This project demonstrates user registration, secure password hashing, user login, JWT-based authentication, and role-based user management.

It is developed as part of my Express.js backend learning journey to understand how authentication systems work in real-world backend applications.

## 🚀 Features

- **User Registration:** Register new users with name, email, password, and role.
- **User Login:** Authenticate registered users using email and password.
- **Password Encryption:** Securely hash user passwords using Bcrypt with 10 salt rounds.
- **JWT Authentication:** Generate JSON Web Tokens using JSON Web Token (JWT).
- **Cookie-Based Authentication:** Send authentication tokens through HTTP-only cookies.
- **Role-Based User Management:** Support three user roles: Admin, Student, and Visitor.
- **MongoDB Integration:** Store and manage user information using MongoDB and Mongoose.
- **Environment Variables:** Manage sensitive configuration using Dotenv.
- **Error Handling:** Handle registration, login, password hashing, and database connection errors.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime environment |
| Express.js | Backend web framework |
| MongoDB | NoSQL database |
| Mongoose | MongoDB object modeling |
| Bcrypt | Password hashing |
| JSON Web Token | Token generation and authentication |
| Dotenv | Environment variable management |
| Nodemon | Automatic server restart during development |

## 📁 Project Structure

```text
AuthN_AuthZ Class1/
│
├── config/
│   └── database.js
│
├── controllers/
│   └── Auth.js
│
├── models/
│   └── User.js
│
├── routes/
│   └── user.js
│
├── node_modules/
│
├── .env
├── .gitignore
├── index.js
├── package.json
└── package-lock.json
```

### Folder and File Explanation

| File / Folder | Description |
|---|---|
| `config/` | Contains database configuration. |
| `database.js` | Establishes the MongoDB connection using Mongoose. |
| `controllers/` | Contains authentication business logic. |
| `Auth.js` | Handles signup, login, password hashing, and JWT generation. |
| `models/` | Defines MongoDB data models. |
| `User.js` | Defines the user schema with name, email, password, and role. |
| `routes/` | Contains API route definitions. |
| `user.js` | Defines signup and login endpoints. |
| `index.js` | Main application entry point and server configuration. |
| `.env` | Stores environment variables and sensitive credentials. |
| `.gitignore` | Prevents sensitive and unnecessary files from being uploaded to GitHub. |

## 📦 Installed Dependencies

The following modules are used in this project:

| Package | Description |
|---|---|
| Express | Handles HTTP requests and API routing. |
| Nodemon | Automatically restarts the server when code changes. |
| Dotenv | Loads environment variables from the `.env` file. |
| Mongoose | Connects Node.js with MongoDB and manages database schemas. |
| Bcrypt | Hashes passwords securely before storing them. |
| Jsonwebtoken | Generates JWT tokens for user authentication. |

### Install Dependencies

Install the required packages using:

```bash
npm install express mongoose dotenv bcrypt jsonwebtoken
```

Install Nodemon as a development dependency:

```bash
npm install --save-dev nodemon
```

### Configure package.json

Add the following development script inside your `package.json`:

```json
"scripts": {
  "dev": "nodemon index.js"
}
```

## ⚙️ Installation & Setup

Follow these steps to run the project locally.

**Step 1: Clone the Repository**

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

**Step 2: Navigate to the Project Directory**

```bash
cd "AuthN_AuthZ Class1"
```

**Step 3: Install Dependencies**

```bash
npm install
```

**Step 4: Configure Environment Variables**

Create a `.env` file in the root directory.

```env
PORT=3000

MONGODB_URL=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

Replace the MongoDB connection string with your actual MongoDB Atlas connection string and provide a strong JWT secret.

**Step 5: Run the Application**

```bash
npm run dev
```

Expected terminal output after a successful database connection:

```text
DB Connected Successfully.
App is running at Port no. 3000.
```

## 🔑 API Endpoints

The application currently provides the following authentication endpoints.

**Base URL:**

```text
http://localhost:3000/api/v1
```

| HTTP Method | Endpoint | Description |
|---|---|---|
| POST | `/signup` | Register a new user. |
| POST | `/login` | Authenticate an existing user. |

### 1. User Signup

**Endpoint:**

```http
POST /api/v1/signup
```

**Request Body:**

```json
{
  "name": "Aman Verma",
  "email": "aman@example.com",
  "password": "Aman@123",
  "role": "Student"
}
```

**Successful Response:**

```json
{
  "success": true,
  "message": "User Created Successfully."
}
```

**Functionality:**
- Checks whether the email is already registered.
- Hashes the password using Bcrypt.
- Creates a new user record in MongoDB.
- Returns an appropriate response.

### 2. User Login

**Endpoint:**

```http
POST /api/v1/login
```

**Request Body:**

```json
{
  "email": "aman@example.com",
  "password": "Aman@123"
}
```

**Successful Response:**

```json
{
  "success": true,
  "token": "your_generated_jwt_token",
  "user": {
    "_id": "user_id",
    "name": "Aman Verma",
    "email": "aman@example.com",
    "role": "Student"
  },
  "message": "User Logged Successfully"
}
```

**Functionality:**
- Validates the email and password.
- Checks whether the user exists in MongoDB.
- Compares the entered password with the stored hashed password using Bcrypt.
- Generates a JWT token after successful authentication.
- Sends the token in an HTTP-only cookie and response.

## 👥 Supported User Roles

The application supports three user roles through the Mongoose User Schema:

| Role | Description |
|---|---|
| Admin | Administrative user. |
| Student | Student user. |
| Visitor | Visitor user. |

These roles are stored in MongoDB and included in the JWT payload for future role-based authorization implementation.

## 🔒 Security Implementation

This project demonstrates some fundamental backend security practices:

1. **Password Hashing:** User passwords are hashed using Bcrypt instead of storing plain-text passwords.
2. **JWT Authentication:** Tokens are generated using a secret key stored in environment variables.
3. **HTTP-Only Cookies:** Authentication cookies are configured with the `httpOnly` option.
4. **Environment Configuration:** Sensitive credentials are maintained in `.env`.
5. **Duplicate Email Check:** Prevents registration with an already existing email.
6. **Role Validation:** The User Schema restricts roles to Admin, Student, and Visitor.

**Security Note:** Before production deployment, validate signup inputs, prevent users from assigning themselves privileged roles, configure secure cookie settings, and implement JWT verification middleware and role-based authorization for protected routes.

## 🧪 Testing

You can test the authentication APIs using:

- Postman
- Thunder Client

Test the following scenarios:

- Register a new user.
- Attempt to register with an existing email.
- Login using valid credentials.
- Login using an incorrect password.
- Login using an unregistered email.
- Verify that a JWT token is generated after successful login.

## 🚧 Future Enhancements

The following features can be added to extend this project:

- JWT authentication middleware.
- Protected routes.
- Role-Based Access Control (RBAC).
- Authorization for Admin, Student, and Visitor.
- User logout functionality.
- Password reset functionality.
- Email verification.
- Refresh token implementation.
- Input validation and improved error handling.

## 🎯 Learning Outcomes

Through this project, I learned:

- How authentication works in backend applications.
- How to build REST APIs using Express.js.
- How to connect Node.js applications with MongoDB.
- How to create and manage Mongoose schemas.
- How to hash passwords using Bcrypt.
- How to generate JWT tokens.
- How to manage environment variables.
- How to organize backend applications using MVC-style folder separation.

## 👨‍💻 Author

**Aman Verma**

Java Full Stack Developer | Backend Development Enthusiast

- GitHub: https://github.com/Amanverma81
- LinkedIn: Add your LinkedIn profile URL
- LeetCode: Add your LeetCode profile URL

---

⭐ If you find this project useful for learning backend development and authentication, consider giving this repository a star!

**Built with ❤️ using Node.js, Express.js, and MongoDB.**