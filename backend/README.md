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

### Get User Profile

Retrieves the profile information of the authenticated user.

**Endpoint:** `GET /api/users/profile`

**Headers:**

- `Authorization`: Bearer token (Required)
  or
- Cookie with `token` (Required)

**Success Response:**

- **Status Code:** 200 (OK)

```json
{
  "success": true,
  "message": "User profile fetched successfully",
  "data": {
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

**Error Response:**

- **Status Code:** 401 (Unauthorized)

```json
{
  "success": false,
  "message": "No token provided. Please login first"
}
```

### Logout User

Logs out the current user by blacklisting their token.

**Endpoint:** `GET /api/users/logout`

**Headers:**

- `Authorization`: Bearer token (Required)
  or
- Cookie with `token` (Required)

**Success Response:**

- **Status Code:** 200 (OK)

```json
{
  "success": true,
  "message": "User logged out successfully"
}
```

**Error Response:**

- **Status Code:** 401 (Unauthorized)

```json
{
  "success": false,
  "message": "No token provided. Please login first"
}
```

or

```json
{
  "success": false,
  "message": "Token is blacklisted"
}
```

### Register Captain

Creates a new captain account in the system.

**Endpoint:** `POST /api/captains/register`

**Request Body:**
```json
{
  "fullName": {
    "firstName": "string",    // Required
    "lastName": "string"      // Required
  },
  "email": "string",         // Required, must be unique
  "password": "string",      // Required
  "vehicle": {
    "color": "string",       // Required
    "plate": "string",       // Required, vehicle plate number
    "capacity": "number",    // Required, passenger capacity
    "vehicleType": "string"  // Required, type of vehicle (e.g., "car")
  }
}
```

**Success Response:**
- **Status Code:** 201 (Created)
```json
{
  "status": "success",
  "message": "Captain registered successfully",
  "data": {
    "captain": {
      "_id": "string",
      "fullName": {
        "firstName": "string",
        "lastName": "string"
      },
      "email": "string",
      "vehicle": {
        "color": "string",
        "plate": "string",
        "capacity": "number",
        "vehicleType": "string"
      },
      "status": "string"     // Initial status will be "inactive"
    },
    "token": "jwt_token_string"
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

### Login Captain

Authenticates a captain and returns a JWT token.

**Endpoint:** `POST /api/captains/login`

**Request Body:**
```json
{
  "email": "string",    // Required, must be valid email
  "password": "string"  // Required, min length: 5 characters
}
```

**Success Response:**
- **Status Code:** 200 (OK)
```json
{
  "status": "success",
  "message": "Captain logged in successfully",
  "data": {
    "captain": {
      "_id": "string",
      "fullName": {
        "firstName": "string",
        "lastName": "string"
      },
      "email": "string",
      "vehicle": {
        "color": "string",
        "plate": "string",
        "capacity": "number",
        "vehicleType": "string"
      },
      "status": "string"
    },
    "token": "jwt_token_string"
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

### Get Captain Profile

Retrieves the profile information of the authenticated captain.

**Endpoint:** `GET /api/captains/profile`

**Headers:**
```
Authorization: Bearer jwt_token_string
```

**Success Response:**
- **Status Code:** 200 (OK)
```json
{
  "status": "success",
  "message": "Captain profile fetched successfully",
  "data": {
    "captain": {
      "_id": "string",
      "fullName": {
        "firstName": "string",
        "lastName": "string"
      },
      "email": "string",
      "vehicle": {
        "color": "string",
        "plate": "string",
        "capacity": "number",
        "vehicleType": "string"
      },
      "status": "string"
    }
  }
}
```

**Error Responses:**

1. No Token
- **Status Code:** 401 (Unauthorized)
```json
{
  "success": false,
  "message": "No token provided. Please login first"
}
```

2. Invalid Token
- **Status Code:** 401 (Unauthorized)
```json
{
  "success": false,
  "message": "Invalid token"
}
```

3. Captain Not Found
- **Status Code:** 404 (Not Found)
```json
{
  "success": false,
  "message": "Captain not found"
}
```

### Logout Captain

Logs out the captain by blacklisting the current token.

**Endpoint:** `GET /api/captains/logout`

**Headers:**
```
Authorization: Bearer jwt_token_string
```

**Success Response:**
- **Status Code:** 200 (OK)
```json
{
  "status": "success",
  "message": "Captain logged out successfully"
}
```

**Error Responses:**

1. No Token
- **Status Code:** 400 (Bad Request)
```json
{
  "success": false,
  "message": "No token found"
}
```

2. Invalid Token
- **Status Code:** 401 (Unauthorized)
```json
{
  "success": false,
  "message": "Invalid token"
}
```
