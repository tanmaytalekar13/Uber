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
