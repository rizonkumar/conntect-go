## API Documentation

### Authentication Routes

#### Create User

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

**Success Response:** 201 Created

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

#### Login User

Authenticates a user and returns a JWT token.

**Endpoint:** `POST /api/users/login`

**Request Body:**

```json
{
  "email": "string", // Required, must be valid email
  "password": "string" // Required, min length: 5 characters
}
```

**Success Response:** 200 OK

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

#### Get User Profile

Retrieves the profile information of the authenticated user.

**Endpoint:** `GET /api/users/profile`

**Headers:**

- `Authorization`: Bearer token (Required)
  or
- Cookie with `token` (Required)

**Success Response:** 200 OK

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

#### Logout User

Logs out the current user by blacklisting their token.

**Endpoint:** `GET /api/users/logout`

**Headers:**

- `Authorization`: Bearer token (Required)
  or
- Cookie with `token` (Required)

**Success Response:** 200 OK

```json
{
  "success": true,
  "message": "User logged out successfully"
}
```

### Ride Routes

#### Create Ride

Create a new ride offering or request.

**Endpoint:** `POST /api/rides/create`

**Headers:**

- `Authorization`: Bearer token (Required)

**Request Body:**

```json
{
  "type": "offer|request", // Required
  "origin": "string", // Required
  "destination": "string", // Required
  "departureTime": "ISO 8601 datetime", // Required
  "availableSeats": "number", // Required for offer type
  "vehicle": {
    "make": "string",
    "model": "string",
    "year": "number"
  }, // Optional for offer type
  "price": "number" // Optional
}
```

**Success Response:** 201 Created

```json
{
  "success": true,
  "message": "Ride created successfully",
  "data": {
    "ride": {
      "_id": "ride_id",
      "type": "offer|request",
      "origin": "string",
      "destination": "string",
      "departureTime": "ISO 8601 datetime",
      "createdBy": "user_id"
    }
  }
}
```

#### Get User Rides

Retrieve all rides created by the authenticated user.

**Endpoint:** `GET /api/rides/user`

**Headers:**

- `Authorization`: Bearer token (Required)

**Success Response:** 200 OK

```json
{
  "success": true,
  "message": "User rides fetched successfully",
  "data": {
    "rides": [
      {
        "_id": "ride_id",
        "type": "offer|request",
        "origin": "string",
        "destination": "string",
        "departureTime": "ISO 8601 datetime"
      }
      // More rides...
    ]
  }
}
```

#### Search Rides

Search for available rides based on various filters.

**Endpoint:** `GET /api/rides/search`

**Query Parameters:**

- `origin`: string (optional)
- `destination`: string (optional)
- `departureDate`: ISO 8601 date (optional)
- `type`: "offer|request" (optional)

**Success Response:** 200 OK

```json
{
  "success": true,
  "message": "Rides found successfully",
  "data": {
    "rides": [
      {
        "_id": "ride_id",
        "type": "offer|request",
        "origin": "string",
        "destination": "string",
        "departureTime": "ISO 8601 datetime",
        "createdBy": {
          "_id": "user_id",
          "fullName": {
            "firstName": "string",
            "lastName": "string"
          }
        }
      }
      // More rides...
    ]
  }
}
```

### Error Handling

All error responses follow a consistent format:

```json
{
  "success": false,
  "message": "Descriptive error message",
  "errors": [
    {
      "msg": "Specific error details",
      "param": "field_name", // Optional
      "location": "body|query|params" // Optional
    }
  ]
}
```

### Authentication Middleware

Most routes require authentication. Unauthorized access will result in a 401 Unauthorized response:

```json
{
  "success": false,
  "message": "Unauthorized. Please login."
}
```

### Rate Limiting

API routes are protected with rate limiting to prevent abuse. Exceeding the limit will result in a 429 Too Many Requests response.

### Captain Routes

#### Register Captain

Creates a new captain account in the system.

**Endpoint:** `POST /api/captains/register`

**Request Body:**

```json
{
  "fullName": {
    "firstName": "string", // Required
    "lastName": "string" // Required
  },
  "email": "string", // Required, must be unique
  "password": "string", // Required
  "vehicle": {
    "color": "string", // Required
    "plate": "string", // Required, vehicle plate number
    "capacity": "number", // Required, passenger capacity
    "vehicleType": "string" // Required, type of vehicle (e.g., "car")
  }
}
```

**Success Response:** 201 Created

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
      "status": "string" // Initial status will be "inactive"
    },
    "token": "jwt_token_string"
  }
}
```

#### Login Captain

Authenticates a captain and returns a JWT token.

**Endpoint:** `POST /api/captains/login`

**Request Body:**

```json
{
  "email": "string", // Required, must be valid email
  "password": "string" // Required, min length: 5 characters
}
```

**Success Response:** 200 OK

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

#### Get Captain Profile

Retrieves the profile information of the authenticated captain.

**Endpoint:** `GET /api/captains/profile`

**Headers:**

```
Authorization: Bearer jwt_token_string
```

**Success Response:** 200 OK

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

#### Logout Captain

Logs out the captain by blacklisting the current token.

**Endpoint:** `GET /api/captains/logout`

**Headers:**

```
Authorization: Bearer jwt_token_string
```

**Success Response:** 200 OK

```json
{
  "status": "success",
  "message": "Captain logged out successfully"
}
```

### Map Services

#### Get Coordinates

Converts an address to geographical coordinates.

**Endpoint:** `GET /api/map/get-coordinates`

**Query Parameters:**

- `address`: string (Required, min length: 3 characters)

**Headers:**

- `Authorization`: Bearer token (Required)

**Success Response:** 200 OK

```json
{
  "status": "success",
  "message": "Coordinates fetched successfully",
  "data": {
    "coordinates": {
      "lat": number,
      "lng": number
    }
  }
}
```

#### Get Distance and Time

Calculates the distance and travel time between two locations.

**Endpoint:** `GET /api/map/get-distance-time`

**Query Parameters:**

- `origin`: string (Required, min length: 3 characters)
- `destination`: string (Required, min length: 3 characters)

**Headers:**

- `Authorization`: Bearer token (Required)

**Success Response:** 200 OK

```json
{
  "status": "success",
  "message": "Distance and time fetched successfully",
  "data": {
    "distanceTime": {
      "distance": {
        "text": string,
        "value": number
      },
      "duration": {
        "text": string,
        "value": number
      }
    }
  }
}
```

#### Get Address Suggestions

Returns address suggestions based on user input using Google Places Autocomplete.

**Endpoint:** `GET /api/map/get-suggestions`

**Query Parameters:**

- `input`: string (Required, min length: 3 characters)

**Headers:**

- `Authorization`: Bearer token (Required)

**Success Response:** 200 OK

```json
{
    "status": "success",
    "message": "Suggestions fetched successfully",
    "data": {
        "suggestions": [
            {
                "description": "Full address description",
                "matched_substrings": [
                    {
                        "length": number,
                        "offset": number
                    }
                ],
                "place_id": "string",
                "reference": "string",
                "structured_formatting": {
                    "main_text": "string",
                    "main_text_matched_substrings": [
                        {
                            "length": number,
                            "offset": number
                        }
                    ],
                    "secondary_text": "string"
                },
                "terms": [
                    {
                        "offset": number,
                        "value": "string"
                    }
                ],
                "types": [
                    "string"
                ]
            }
        ]
    }
}
```

### Create Ride

Creates a new ride request in the system.

**Endpoint:** `POST /api/rides/create-ride`

**Headers:**

```
Authorization: Bearer your_jwt_token
```

**Request Body:**

```json
{
  "pickup": "string", // Required, min length: 3 characters
  "destination": "string", // Required, min length: 3 characters
  "vehicleType": "string" // Required, one of: "car", "auto", "motorcycle"
}
```

**Success Response:** 201 Created

```json
{
  "status": "success",
  "message": "Ride created successfully",
  "data": {
    "ride": {
      "user": "string", // User ID of the requester
      "pickup": "string", // Pickup location
      "destination": "string", // Destination location
      "fare": "number", // Calculated fare for the ride
      "status": "string", // Current status of the ride (e.g., "pending")
      "otp": "string", // 4-digit OTP for ride verification
      "_id": "string", // Unique ride ID
      "__v": "number" // Version key
    }
  }
}
```

### Get All Rides

Retrieves all rides from the system.

**Endpoint:** `GET /rides/rides`

**Success Response:** 200 OK

```json
{
  "status": "success",
  "message": "Rides fetched successfully",
  "data": {
    "rides": [
      {
        "_id": "string",
        "user": {
          "_id": "string",
          "name": "string",
          "email": "string"
        },
        "pickup": "string",
        "destination": "string",
        "fare": "number",
        "status": "string",
        "createdAt": "date"
      }
    ]
  }
}
```

### Get User Rides

Retrieves the ride history for the authenticated user.

**Endpoint:** `GET /api/rides/user/rides`

**Headers:**

- `Authorization`: Bearer token (Required)

**Success Response:** 200 OK

```json
{
  "success": true,
  "message": "User rides fetched successfully",
  "data": {
    "rides": [
      {
        "pickup": "string",
        "destination": "string",
        "fare": "number",
        "status": "string", // "completed" or "cancelled"
        "captain": {
          "fullName": {
            "firstName": "string",
            "lastName": "string"
          }
        },
        "createdAt": "date",
        "duration": "number", // in seconds
        "distance": "number" // in meters
      }
    ]
  }
}
```

### Fare Calculation

Fares are calculated based on the following rates:

1. Auto

   - Base fare: ₹30
   - Per kilometer: ₹15
   - Minimum fare: ₹30

2. Car

   - Base fare: ₹50
   - Per kilometer: ₹20
   - Minimum fare: ₹50

3. Motorcycle
   - Base fare: ₹20
   - Per kilometer: ₹12
   - Minimum fare: ₹20

Note: Distance is calculated using Google Maps Distance Matrix API.
