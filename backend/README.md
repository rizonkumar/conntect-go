## API Documentation

### Create User

Creates a new user account in the system.

**Endpoint:** `POST /api/users/register`

**Request Body:**

```json
{
  "fullName": {
    "firstName": "string", // Required, min length: 3 characters
    "lastName": "string" // Optional, min length: 3 characters if provided
  },
  "email": "string", // Required, min length: 5 characters, must be unique
  "password": "string" // Required, min length: 5 characters
}
```

**Success Response:**

- **Status Code:** 201 (Created)

```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "token": "jwt_token_string",
    "user": {
      "fullName": {
        "firstName": "string",
        "lastName": "string"
      },
      "email": "string",
      "_id": "user_id"
    }
  }
}
```

**Error Responses:**

1. Invalid Input

- **Status Code:** 400 (Bad Request)

```json
{
  "success": false,
  "errors": [
    {
      "msg": "Error message",
      "param": "field_name",
      "location": "body"
    }
  ]
}
```

2. Missing Required Fields

- **Status Code:** 400 (Bad Request)

```json
{
  "success": false,
  "message": "Missing required fields"
}
```

3. Email Already Exists

- **Status Code:** 409 (Conflict)

```json
{
  "success": false,
  "message": "Email already registered"
}
```

### Login User

Authenticates a user and returns a JWT token.

**Endpoint:** `POST /api/users/login`

**Request Body:**

```json
{
  "email": "string", // Required, must be valid email
  "password": "string" // Required, min length: 5 characters
}
```

**Success Response:**

- **Status Code:** 200 (OK)

```json
{
  "success": true,
  "message": "User logged in successfully",
  "data": {
    "token": "jwt_token_string",
    "user": {
      "fullName": {
        "firstName": "string",
        "lastName": "string"
      },
      "email": "string",
      "_id": "user_id"
    }
  }
}
```

**Error Responses:**

1. Invalid Input

- **Status Code:** 400 (Bad Request)

```json
{
  "success": false,
  "errors": [
    {
      "msg": "Error message",
      "param": "field_name",
      "location": "body"
    }
  ]
}
```

2. Invalid Credentials

- **Status Code:** 401 (Unauthorized)

```json
{
  "success": false,
  "message": "Invalid email or password"
}
```
