# API

## Registration Route

**Endpoint:** `/register`

**Method:** `POST`

**Description:** This route is used to register a new user in the system.

**Data Params:**

- `email` [string, required]: The email address of the user. This will be used for account confirmation and future communication.
- `password` [string, required]: The password for the user. This should be sent as a plain text and will be hashed on the server side before storing in the database.

**Success Response:**

- **Code:** 200
- **Content:** `{ message: 'User registered successfully. Please check your email for confirmation instructions.' }`

**Error Response:**

- **Code:** 400
- **Content:** `{ error: 'Email is already in use.' }`
