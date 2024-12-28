# User Registration Endpoint

## Endpoint: `/users/register`

### Description
This endpoint is used to register a new user.

### Method
`POST`

### Status Codes
- `201 Created`: User successfully registered.
- `400 Bad Request`: Validation errors or missing required fields.
- `500 Internal Server Error`: An error occurred on the server.

### Required Data
The following fields are required in the request body:
- `fullname.firstname` (string, minimum 3 characters)
- `fullname.lastname` (string, minimum 3 characters)
- `email` (string, valid email format)
- `password` (string, minimum 6 characters)

### Example Request
```json
{
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "password123"
}
```

### Example Response
```json
{
    "user": {
        "_id": "60d0fe4f5311236168a109ca",
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "john.doe@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

# User Login Endpoint

## Endpoint: `/users/login`

### Description
This endpoint is used to log in an existing user.

### Method
`POST`

### Status Codes
- `200 OK`: User successfully logged in.
- `400 Bad Request`: Validation errors or invalid credentials.
- `500 Internal Server Error`: An error occurred on the server.

### Required Data
The following fields are required in the request body:
- `email` (string, valid email format)
- `password` (string, minimum 6 characters)

### Example Request
```json
{
    "email": "john.doe@example.com",
    "password": "password123"
}
```

### Example Response
```json
{
    "user": {
        "_id": "60d0fe4f5311236168a109ca",
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "john.doe@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

# User Profile Endpoint

## Endpoint: `/users/profile`

### Description
This endpoint is used to get the profile of the logged-in user.

### Method
`GET`

### Authentication
This endpoint requires a valid JWT token.

### Status Codes
- `200 OK`: Profile retrieved successfully.
- `401 Unauthorized`: No token provided or token is invalid.
- `500 Internal Server Error`: An error occurred on the server.

### Example Response
```json
{
    "user": {
        "_id": "60d0fe4f5311236168a109ca",
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "john.doe@example.com"
    }
}
```

# User Logout Endpoint

## Endpoint: `/users/logout`

### Description
This endpoint is used to log out the logged-in user.

### Method
`GET`

### Authentication
This endpoint requires a valid JWT token.

### Status Codes
- `200 OK`: User successfully logged out.
- `401 Unauthorized`: No token provided or token is invalid.
- `500 Internal Server Error`: An error occurred on the server.

### Example Response
```json
{
    "message": "Logged out successfully"
}
```

# Captain Registration Endpoint

## Endpoint: `/captains/register`

### Description
This endpoint is used to register a new captain.

### Method
`POST`

### Status Codes
- `201 Created`: Captain successfully registered.
- `400 Bad Request`: Validation errors or missing required fields.
- `500 Internal Server Error`: An error occurred on the server.

### Required Data
The following fields are required in the request body:
- `fullname.firstname` (string, minimum 3 characters)
- `fullname.lastname` (string, minimum 3 characters)
- `email` (string, valid email format)
- `password` (string, minimum 6 characters)
- `vehicle.color` (string, minimum 3 characters)
- `vehicle.plate` (string, minimum 3 characters)
- `vehicle.capacity` (number)
- `vehicle.vehicleType` (string, must be 'car', 'motorcycle', or 'auto')

### Example Request
```json
{
    "fullname": {
        "firstname": "Jane",
        "lastname": "Doe"
    },
    "email": "jane.doe@example.com",
    "password": "password123",
    "vehicle": {
        "color": "red",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
    }
}
```

### Example Response
```json
{
    "captain": {
        "_id": "60d0fe4f5311236168a109cb",
        "fullname": {
            "firstname": "Jane",
            "lastname": "Doe"
        },
        "email": "jane.doe@example.com",
        "vehicle": {
            "color": "red",
            "plate": "ABC123",
            "capacity": 4,
            "vehicleType": "car"
        }
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

# Captain Login Endpoint

## Endpoint: `/captains/login`

### Description
This endpoint is used to log in an existing captain.

### Method
`POST`

### Status Codes
- `200 OK`: Captain successfully logged in.
- `400 Bad Request`: Validation errors or invalid credentials.
- `500 Internal Server Error`: An error occurred on the server.

### Required Data
The following fields are required in the request body:
- `email` (string, valid email format)
- `password` (string, minimum 6 characters)

### Example Request
```json
{
    "email": "jane.doe@example.com",
    "password": "password123"
}
```

### Example Response
```json
{
    "captain": {
        "_id": "60d0fe4f5311236168a109cb",
        "fullname": {
            "firstname": "Jane",
            "lastname": "Doe"
        },
        "email": "jane.doe@example.com",
        "vehicle": {
            "color": "red",
            "plate": "ABC123",
            "capacity": 4,
            "vehicleType": "car"
        }
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

# Captain Profile Endpoint

## Endpoint: `/captains/profile`

### Description
This endpoint is used to get the profile of the logged-in captain.

### Method
`GET`

### Authentication
This endpoint requires a valid JWT token.

### Status Codes
- `200 OK`: Profile retrieved successfully.
- `401 Unauthorized`: No token provided or token is invalid.
- `500 Internal Server Error`: An error occurred on the server.

### Example Response
```json
{
    "captain": {
        "_id": "60d0fe4f5311236168a109cb",
        "fullname": {
            "firstname": "Jane",
            "lastname": "Doe"
        },
        "email": "jane.doe@example.com",
        "vehicle": {
            "color": "red",
            "plate": "ABC123",
            "capacity": 4,
            "vehicleType": "car"
        }
    }
}
```

# Captain Logout Endpoint

## Endpoint: `/captains/logout`

### Description
This endpoint is used to log out the logged-in captain.

### Method
`GET`

### Authentication
This endpoint requires a valid JWT token.

### Status Codes
- `200 OK`: Captain successfully logged out.
- `401 Unauthorized`: No token provided or token is invalid.
- `500 Internal Server Error`: An error occurred on the server.

### Example Response
```json
{
    "message": "Logged out successfully"
}
```
