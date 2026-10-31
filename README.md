# Express.js Authentication & Authorization

A backend authentication project built using **Node.js, Express.js, MongoDB, Mongoose, bcrypt, and JSON Web Tokens (JWT)** as part of my Express.js learning journey.

This project demonstrates how to register users, securely hash passwords, authenticate users during login, generate JWT tokens, manage authentication cookies, and define user roles such as Admin, Student, and Visitor.

It focuses on the fundamentals of authentication, user data management, password security, and role-based access control concepts in Express.js.

## 📚 Topics Covered

- Setting up an Express.js server
- Creating REST API endpoints
- Connecting MongoDB using Mongoose
- Defining user schemas and models
- Implementing user registration and login
- Hashing passwords using bcrypt
- Verifying passwords using `bcrypt.compare()`
- Generating JWT tokens using `jsonwebtoken`
- Setting token expiration
- Sending authentication tokens in HTTP-only cookies
- Managing configuration through environment variables using dotenv
- Handling asynchronous operations with `async/await`
- Handling errors using `try/catch`
- Defining user roles using Mongoose enums
- Understanding authentication and authorization concepts

## ✨ Features

### 1. User Registration

- Register users with their name, email, password, and role.
- Check whether an account with the same email already exists.
- Hash passwords using bcrypt before saving them to MongoDB.
- Store registered user details using a Mongoose model.
- Return appropriate JSON responses for successful and failed registration attempts.

### 2. User Login

- Authenticate users using email and password.
- Verify the submitted password against the stored password hash.
- Generate a signed JWT after successful authentication.
- Include the user's email, ID, and role in the JWT payload.
- Set a token expiration time of two hours.
- Return the token and user information in the response.
- Set the token in an HTTP-only cookie.

### 3. Password Security

- Hash passwords using bcrypt with 10 salt rounds.
- Avoid storing passwords as plain text.
- Compare login credentials against the stored password hash.

### 4. User Roles

The User model defines three allowed roles:

- `Admin`
- `Student`
- `Visitor`

These roles establish the foundation for implementing role-based authorization in future development.

**Important:** The current project stores user roles but does not yet enforce role-based access restrictions through authorization middleware.

## 🛠️ Technologies & Modules Used

| Technology / Module | Purpose |
|---|---|
| Node.js | JavaScript runtime for backend development |
| Express.js | Server creation and REST API routing |
| MongoDB | NoSQL database for storing user information |
| Mongoose | Database connectivity and schema management |
| bcrypt | Password hashing and password verification |
| jsonwebtoken | Generating and signing JWT authentication tokens |
| dotenv | Loading environment variables |
| Nodemon | Automatically restarting the server during development |
| Postman | Testing authentication APIs |

## 📁 Project Structure

```text
AuthN_AuthZ Class1/
├── config/
│   └── database.js
├── controllers/
│   └── Auth.js
├── models/
│   └── User.js
├── routes/
│   └── user.js
├── node_modules/
├── .env
├── .gitignore
├── index.js
├── package.json
├── package-lock.json
└── README.md
```

### File Descriptions

- `index.js` — Application entry point. Configures Express, loads environment variables, connects to MongoDB, mounts routes, and starts the server.
- `config/database.js` — Establishes a MongoDB connection using Mongoose.
- `controllers/Auth.js` — Implements user registration, password hashing, login verification, JWT generation, and cookie creation.
- `models/User.js` — Defines the User schema, including name, email, password, and role.
- `routes/user.js` — Defines the registration and login endpoints.
- `.env` — Stores sensitive configuration, including the MongoDB URL and JWT secret.
- `.gitignore` — Prevents specified files and directories from being tracked by Git.
- `package.json` — Contains project metadata, dependencies, and npm scripts.
- `package-lock.json` — Records the resolved dependency versions.
- `node_modules/` — Contains installed npm packages and should not be committed to GitHub.

## ⚙️ Prerequisites

Before running the project, install:

- [Node.js](https://nodejs.org/)
- npm, included with Node.js
- [MongoDB Community Server](https://www.mongodb.com/try/download/community) or a MongoDB Atlas account
- [Postman](https://www.postman.com/downloads/) for API testing
- Git

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd "AuthN_AuthZ Class1"
```

Replace `<YOUR_GITHUB_REPOSITORY_URL>` with your actual GitHub repository URL.

If you clone the repository into a differently named folder, navigate to that folder instead.

### 2. Install Dependencies

Run the following command:

```bash
npm install
```

This installs the dependencies specified in `package.json`.

### 3. Configure Environment Variables

Create a `.env` file in the project root directory:

```env
PORT=4000
MONGODB_URL=mongodb://127.0.0.1:27017/authDB
JWT_SECRET=replace_with_a_long_random_secret
NODE_ENV=development
```

**Environment variable descriptions:**

- `PORT` — Port on which the Express server runs.
- `MONGODB_URL` — MongoDB connection string.
- `JWT_SECRET` — Secret key used to sign JWT tokens.
- `NODE_ENV` — Application environment, such as `development` or `production`.

If you use MongoDB Atlas, replace the local MongoDB URL with your Atlas connection string.

**Security reminder:** Use a long, random JWT secret and never commit your actual `.env` file to GitHub.

### 4. Start MongoDB

If you are using a local MongoDB installation, ensure the MongoDB server is running before starting the application.

If you use MongoDB Atlas, ensure your database user and network access settings permit the connection.

### 5. Start the Server

If your `package.json` contains the appropriate scripts, run:

**Development mode:**

```bash
npm run dev
```

**Normal start:**

```bash
npm start
```

Alternatively, run the entry file directly:

```bash
node index.js
```

The server will use port `4000` if that value is configured in `.env`.

**Base URL:**

```text
http://localhost:4000
```

**API base URL:**

```text
http://localhost:4000/api/v1
```

## 🔗 API Endpoints

The application exposes two authentication endpoints.

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/v1/signup` | Registers a new user |
| POST | `/api/v1/login` | Authenticates an existing user |

All request bodies should be sent as JSON with the `Content-Type: application/json` header.

## 📝 API Usage and Examples

### 1. User Registration

**Method:** `POST`

**Endpoint:**

```text
http://localhost:4000/api/v1/signup
```

**Request body:**

Select **Body → raw → JSON** in Postman.

```json
{
  "name": "Aman Verma",
  "email": "aman@example.com",
  "password": "StrongPassword123!",
  "role": "Student"
}
```

The `role` value must match one of the values allowed by the User schema: `Admin`, `Student`, or `Visitor`.

**Example success response:**

```json
{
  "success": true,
  "message": "User Created Successfully."
}
```

**Possible error responses:**

If a user with the same email already exists:

```json
{
  "success": false,
  "message": "User Already Exists."
}
```

The current controller returns an error response if password hashing fails or user registration encounters an unexpected error.

### 2. User Login

**Method:** `POST`

**Endpoint:**

```text
http://localhost:4000/api/v1/login
```

**Request body:**

```json
{
  "email": "aman@example.com",
  "password": "StrongPassword123!"
}
```

The application checks whether the email exists and compares the submitted password against the stored bcrypt hash.

If the credentials are correct, the server generates a signed JWT containing the user's email, ID, and role.

**Example success response structure:**

```json
{
  "success": true,
  "token": "GENERATED_JWT_TOKEN",
  "user": {
    "_id": "GENERATED_USER_ID",
    "name": "Aman Verma",
    "email": "aman@example.com",
    "role": "Student"
  },
  "message": "User Logged Successfully"
}
```

The actual response contains a generated token and the registered user's information. The password is removed from the response object by the current controller.

The response also sets a cookie named `token`.

**Possible login errors:**

- `400 Bad Request` — Email or password is missing.
- `401 Unauthorized` — No registered user was found for the email.
- `403 Forbidden` — The password is incorrect.
- `500 Internal Server Error` — An unexpected server error occurred.

## 🔐 Authentication vs. Authorization

### Authentication

Authentication verifies **who the user is**.

In this project, authentication includes:

1. Registering a user.
2. Hashing the password with bcrypt.
3. Verifying the password during login.
4. Generating a JWT after successful login.

### Authorization

Authorization determines **what an authenticated user is allowed to access**.

The current project defines user roles, but does not implement authorization middleware to protect routes based on those roles.

A future implementation could restrict administrative routes to `Admin` users while allowing `Student` and `Visitor` users only the actions permitted to them.

## 🔑 How JWT Authentication Works

The application uses the `jsonwebtoken` package to generate tokens.

After a successful login, the controller signs a payload containing the user's email, database ID, and role.

```javascript
const token = jwt.sign(
    {
        email: user.email,
        id: user._id,
        role: user.role
    },
    process.env.JWT_SECRET,
    {
        expiresIn: "2h"
    }
);
```

The generated token expires after two hours.

JWTs are signed, not encrypted by default. Do not include passwords or other sensitive information in the payload.

**Current implementation:** The application generates a JWT and sends it in both the JSON response and an HTTP-only cookie. The project does not yet include middleware to verify the token on protected routes.

## 🍪 HTTP-Only Cookie

The login controller sets a cookie named `token` with the following options:

- `httpOnly: true` — Prevents client-side JavaScript from reading the cookie.
- `secure` — Enabled when `NODE_ENV` is set to `production`.
- `sameSite: "lax"` — Provides a degree of cross-site request protection.
- Expiration — The cookie expires after approximately three days.

The JWT itself expires after two hours, so the cookie's longer lifetime does not extend the validity of the token.

Because the application also returns the token in the JSON response, client code can access it. For a cookie-based authentication design, consider returning only the user information and keeping the token in the HTTP-only cookie.

## 🗄️ User Model

The User model is defined in `models/User.js`.

| Field | Type | Description |
|---|---|---|
| `_id` | ObjectId | Automatically generated unique identifier |
| `name` | String | User's name; required and trimmed |
| `email` | String | User's email; required and trimmed |
| `password` | String | Hashed password; required |
| `role` | String | User role restricted to Admin, Student, or Visitor |

The email field is not currently marked as unique in the schema, although the registration controller checks for an existing email before creating a user.

Adding a database-level unique index on the email field is recommended to help prevent duplicate registrations during concurrent requests.

## 🧪 Testing with Postman

Follow this workflow to test the application:

1. Start MongoDB and the Express server.
2. Send a POST request to `/api/v1/signup` with the required user details.
3. Verify that registration succeeds.
4. Try registering the same email again and confirm that the duplicate-email check works.
5. Send a POST request to `/api/v1/login` with the registered email and password.
6. Verify that a JWT is returned after successful authentication.
7. Test login with an incorrect password.
8. Inspect the `Set-Cookie` response header to verify that the token cookie is set.

For additional testing, try missing fields and invalid role values. The current code does not validate all of these cases consistently, so some invalid inputs may produce server errors.

## 🔒 Environment Variables and Git

Ensure your `.gitignore` contains:

```gitignore
node_modules/
.env
```

Never upload real database credentials or JWT signing secrets to a public GitHub repository.

You may provide a `.env.example` file containing placeholders:

```env
PORT=4000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_random_secret
NODE_ENV=development
```

## 🔮 Future Improvements

- Add authentication middleware to verify JWT tokens.
- Implement authorization middleware for Admin, Student, and Visitor roles.
- Protect private API endpoints.
- Validate required fields, email format, password strength, and role values.
- Add a unique database index for email.
- Add password reset functionality.
- Implement token revocation or refresh-token handling if required.
- Improve cookie-based authentication and CSRF protection.
- Return consistent HTTP status codes and error responses.
- Add automated API tests.
- Implement rate limiting for login and registration endpoints.

## 👨‍💻 Author

**Aman Verma**

Java Full Stack Developer | Learning Node.js, Express.js, and Backend Development

This repository represents my Express.js authentication class project, focusing on password hashing, user login, JWT generation, HTTP-only cookies, and the fundamentals of authentication and authorization.

---

⭐ If you find this project useful for learning backend development, feel free to explore the code and follow my progress.
