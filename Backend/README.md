# Uber Clone Backend API Documentation

## Table of Contents

- [User Routes](#user-routes)
- [Captain Routes](#captain-routes)
- [Maps Routes](#maps-routes)
- [Ride Routes](#ride-routes)
- [Maps Routes](#maps-routes)
- [Ride Routes](#ride-routes)

## User Routes

### Register User

**Endpoint:** `/users/register` \
**Method:** `POST` \
**Description:** Register a new user with their name, email, and password.

#### Request Body

The request body must be a JSON object containing `fullname` (object with `firstname` and `lastname`), `email`, and `password`.

| Field                | Type   | Required | Validations              |
| :------------------- | :----- | :------- | :----------------------- |
| `fullname.firstname` | String | Yes      | Min length: 3 characters |
| `fullname.lastname`  | String | No       | Min length: 3 characters |
| `email`              | String | Yes      | Must be a valid email    |
| `password`           | String | Yes      | Min length: 6 characters |

**Example Request:**

```json
{
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "securepassword123"
}
```

#### Responses

**Success (201 Created)**

Returns the JWT authentication token and the created user details.

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "john.doe@example.com",
        "_id": "65af8e9d40...",
        "__v": 0
    }
}
```

**Error (400 Bad Request) - Validation Failure**

Occurs if the input data fails validation checks (e.g., password too short, invalid email).

```json
{
    "errors": [
        {
            "type": "field",
            "value": "jo",
            "msg": "First name must be at least 3 char long",
            "path": "fullname.firstname",
            "location": "body"
        }
    ]
}
```

**Error (400 Bad Request) - User Already Exists**

Occurs if an account with the provided email already exists.

```json
{
    "message": "User already exists"
}
```

### Login User

**Endpoint:** `/users/login` \
**Method:** `POST` \
**Description:** Authenticate a user with their email and password.

#### Request Body

The request body must be a JSON object containing `email` and `password`.

| Field      | Type   | Required | Validations              |
| :--------- | :----- | :------- | :----------------------- |
| `email`    | String | Yes      | Must be a valid email    |
| `password` | String | Yes      | Min length: 6 characters |

**Example Request:**

```json
{
    "email": "john.doe@example.com",
    "password": "securepassword123"
}
```

#### Responses

**Success (200 OK)**

Returns the JWT authentication token and the user details.

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "john.doe@example.com",
        "_id": "65af8e9d40...",
        "__v": 0
    }
}
```

**Error (400 Bad Request) - Validation Failure**

Occurs if the input data fails validation checks.

```json
{
    "errors": [
        {
            "type": "field",
            "value": "invalid-email",
            "msg": "Invalid Email",
            "path": "email",
            "location": "body"
        }
    ]
}
```

**Error (401 Unauthorized) - Invalid Credentials**

Occurs if the email or password is incorrect.

```json
{
    "message": "Invalid email or password"
}
```

### User Profile

**Endpoint:** `/users/profile` \
**Method:** `GET` \
**Description:** Retrieve the profile information of the authenticated user.

#### Headers

| Key             | Value            | Description                                                                   |
| :-------------- | :--------------- | :---------------------------------------------------------------------------- |
| `Authorization` | `Bearer <token>` | JWT token received upon login/registration. Alternatively, passed via cookie. |

#### Responses

**Success (200 OK)**

Returns the user details.

```json
{
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": "socket123",
    "_id": "65af8e9d40...",
    "__v": 0
}
```

**Error (401 Unauthorized)**

Occurs if no token is provided or the token is invalid/blacklisted.

```json
{
    "message": "Unauthorized"
}
```

### Logout User

**Endpoint:** `/users/logout` \
**Method:** `GET` \
**Description:** Logout the current user and invalidate the authentication token.

#### Headers

| Key             | Value            | Description                                                                   |
| :-------------- | :--------------- | :---------------------------------------------------------------------------- |
| `Authorization` | `Bearer <token>` | JWT token received upon login/registration. Alternatively, passed via cookie. |

#### Responses

**Success (200 OK)**

Confirms that the user has been logged out.

```json
{
    "message": "Logged out"
}
```

**Error (401 Unauthorized)**

Occurs if no token is provided or the token is invalid/blacklisted.

```json
{
    "message": "Unauthorized"
}
```

---

## Captain Routes

### Register Captain

**Endpoint:** `/captains/register` \
**Method:** `POST` \
**Description:** Register a new captain with their personal and vehicle details.

#### Request Body

The request body must be a JSON object containing `fullname`, `email`, `password`, and `vehicle` details.

| Field                 | Type   | Required | Validations                         |
| :-------------------- | :----- | :------- | :---------------------------------- |
| `fullname.firstname`  | String | Yes      | Min length: 3 characters            |
| `fullname.lastname`   | String | No       | Min length: 3 characters            |
| `email`               | String | Yes      | Must be a valid email               |
| `password`            | String | Yes      | Min length: 6 characters            |
| `vehicle.color`       | String | Yes      | Min length: 3 characters            |
| `vehicle.plate`       | String | Yes      | Min length: 3 characters            |
| `vehicle.capacity`    | Number | Yes      | Min: 1                              |
| `vehicle.vehicleType` | String | Yes      | One of: 'car', 'motorcycle', 'auto' |

**Example Request:**

```json
{
    "fullname": {
        "firstname": "Jane",
        "lastname": "Doe"
    },
    "email": "jane.captain@example.com",
    "password": "securepassword456",
    "vehicle": {
        "color": "Red",
        "plate": "KA-01-AB-1234",
        "capacity": 4,
        "vehicleType": "car"
    }
}
```

#### Responses

**Success (201 Created)**

Returns the JWT authentication token and the created captain details.

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "captain": {
        "fullname": {
            "firstname": "Jane",
            "lastname": "Doe"
        },
        "email": "jane.captain@example.com",
        "vehicle": {
            "color": "Red",
            "plate": "KA-01-AB-1234",
            "capacity": 4,
            "vehicleType": "car"
        },
        "_id": "65af8e9d40...",
        "status": "inactive"
    }
}
```

**Error (400 Bad Request) - Validation Failure**

Occurs if input validation fails.

```json
{
    "errors": [
        {
            "type": "field",
            "value": "invalid",
            "msg": "Invalid vehicle type",
            "path": "vehicle.vehicleType",
            "location": "body"
        }
    ]
}
```

**Error (400 Bad Request) - Captain Already Exists**

Occurs if a captain with the email already exists.

```json
{
    "message": "Captain already exists"
}
```

### Login Captain

**Endpoint:** `/captains/login` \
**Method:** `POST` \
**Description:** Authenticate a captain with their email and password.

#### Request Body

The request body must be a JSON object containing `email` and `password`.

| Field      | Type   | Required | Validations              |
| :--------- | :----- | :------- | :----------------------- |
| `email`    | String | Yes      | Must be a valid email    |
| `password` | String | Yes      | Min length: 6 characters |

**Example Request:**

```json
{
    "email": "jane.captain@example.com",
    "password": "securepassword456"
}
```

#### Responses

**Success (200 OK)**

Returns the JWT authentication token and the captain details.

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "captain": {
        "fullname": {
            "firstname": "Jane",
            "lastname": "Doe"
        },
        "email": "jane.captain@example.com",
        "vehicle": {
            "color": "Red",
            "plate": "KA-01-AB-1234",
            "capacity": 4,
            "vehicleType": "car"
        },
        "_id": "65af8e9d40...",
        "status": "active"
    }
}
```

**Error (400 Bad Request) - Validation Failure**

Occurs if the input data fails validation checks.

```json
{
    "errors": [
        {
            "type": "field",
            "value": "invalid-email",
            "msg": "Invalid Email",
            "path": "email",
            "location": "body"
        }
    ]
}
```

**Error (401 Unauthorized) - Invalid Credentials**

Occurs if the email or password is incorrect.

```json
{
    "message": "Invalid email or password!"
}
```

### Get Captain Profile

**Endpoint:** `/captains/profile` \
**Method:** `GET` \
**Description:** Retrieve the profile information of the authenticated captain.

#### Headers

| Key             | Value            | Description                                                                   |
| :-------------- | :--------------- | :---------------------------------------------------------------------------- |
| `Authorization` | `Bearer <token>` | JWT token received upon login/registration. Alternatively, passed via cookie. |

#### Responses

**Success (200 OK)**

Returns the captain details.

```json
{
  "captain": {
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "jane.captain@example.com",
    "vehicle": { ... },
    "_id": "65af8e9d40...",
    "status": "active"
  }
}
```

**Error (401 Unauthorized)**

Occurs if no token is provided or the token is invalid/blacklisted.

```json
{
    "message": "Unauthorized"
}
```

### Logout Captain

**Endpoint:** `/captains/logout` \
**Method:** `GET` \
**Description:** Logout the current captain and invalidate the authentication token.

#### Headers

| Key             | Value            | Description                                                                   |
| :-------------- | :--------------- | :---------------------------------------------------------------------------- |
| `Authorization` | `Bearer <token>` | JWT token received upon login/registration. Alternatively, passed via cookie. |

#### Responses

**Success (200 OK)**

Confirms that the captain has been logged out.

```json
{
    "message": "Logout successfully!"
}
```

**Error (401 Unauthorized)**

Occurs if no token is provided or the token is invalid/blacklisted.

```json
{
    "message": "Unauthorized"
}
```

## Maps Routes

### Get Coordinates

**Endpoint:** `/maps/get-coordinates` \
**Method:** `GET` \
**Description:** Retrieve the latitude and longitude for a given address.

#### Query Parameters

| Field     | Type   | Required | Validations              |
| :-------- | :----- | :------- | :----------------------- |
| `address` | String | Yes      | Min length: 3 characters |

#### Headers

| Key             | Value            | Description                                                                   |
| :-------------- | :--------------- | :---------------------------------------------------------------------------- |
| `Authorization` | `Bearer <token>` | JWT token received upon login/registration. Alternatively, passed via cookie. |

#### Responses

**Success (200 OK)**

Returns the coordinates for the specified address.

```json
{
    "ltd": 37.7749,
    "lng": -122.4194
}
```

**Error (400 Bad Request) - Validation Failure**

Occurs if the input data fails validation checks.

**Error (404 Not Found) - Coordinates Not Found**

Occurs if the coordinates for the address could not be found.

```json
{
    "message": "Coordinates not found"
}
```

### Get Distance and Time

**Endpoint:** `/maps/get-distance-time` \
**Method:** `GET` \
**Description:** Retrieve the distance and estimated travel time between two locations.

#### Query Parameters

| Field         | Type   | Required | Validations              |
| :------------ | :----- | :------- | :----------------------- |
| `origin`      | String | Yes      | Min length: 3 characters |
| `destination` | String | Yes      | Min length: 3 characters |

#### Headers

| Key             | Value            | Description                                                                   |
| :-------------- | :--------------- | :---------------------------------------------------------------------------- |
| `Authorization` | `Bearer <token>` | JWT token received upon login/registration. Alternatively, passed via cookie. |

#### Responses

**Success (200 OK)**

Returns the distance and duration.

```json
{
    "distance": {
        "text": "10 km",
        "value": 10000
    },
    "duration": {
        "text": "15 mins",
        "value": 900
    }
}
```

**Error (400 Bad Request) - Validation Failure**

Occurs if the input data fails validation checks.

**Error (404 Not Found) - No Routes Found**

Occurs if no route could be found between the origin and destination.

```json
{
    "message": "No routes found"
}
```

### Get Auto-Complete Suggestions

**Endpoint:** `/maps/get-suggestions` \
**Method:** `GET` \
**Description:** Retrieve auto-complete suggestions for a partial address.

#### Query Parameters

| Field   | Type   | Required | Validations              |
| :------ | :----- | :------- | :----------------------- |
| `input` | String | Yes      | Min length: 3 characters |

#### Headers

| Key             | Value            | Description                                                                   |
| :-------------- | :--------------- | :---------------------------------------------------------------------------- |
| `Authorization` | `Bearer <token>` | JWT token received upon login/registration. Alternatively, passed via cookie. |

#### Responses

**Success (200 OK)**

Returns a list of suggestions.

```json
["123 Main St, City, Country", "124 Main St, City, Country"]
```

## Ride Routes

### Create Ride

**Endpoint:** `/rides/create` \
**Method:** `POST` \
**Description:** Create a new ride request.

#### Request Body

The request body must be a JSON object containing `pickup`, `destination`, and `vehicleType`.

| Field         | Type   | Required | Validations                      |
| :------------ | :----- | :------- | :------------------------------- |
| `pickup`      | String | Yes      | Min length: 3 characters         |
| `destination` | String | Yes      | Min length: 3 characters         |
| `vehicleType` | String | Yes      | Must be 'auto', 'car', or 'moto' |

#### Headers

| Key             | Value            | Description                                                                   |
| :-------------- | :--------------- | :---------------------------------------------------------------------------- |
| `Authorization` | `Bearer <token>` | JWT token received upon login/registration. Alternatively, passed via cookie. |

#### Responses

**Success (201 Created)**

Returns the created ride details.

```json
{
    "ride": {
        "user": "65af8e9d40...",
        "pickup": "123 Main St",
        "destination": "456 Market St",
        "fare": 150,
        "status": "pending",
        "otp": "1234",
        "_id": "65b0c123...",
        "__v": 0
    }
}
```

**Error (400 Bad Request) - Validation Failure**

Occurs if the input data fails validation checks.
