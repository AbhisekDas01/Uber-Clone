# Uber Clone Backend API Documentation

## User Routes

### Register User

**Endpoint:** `/users/register` \
**Method:** `POST` \
**Description:** Register a new user with their name, email, and password.

#### Request Body

The request body must be a JSON object containing `fullname` (object with `firstname` and `lastname`), `email`, and `password`.

| Field | Type | Required | Validations |
| :--- | :--- | :--- | :--- |
| `fullname.firstname` | String | Yes | Min length: 3 characters |
| `fullname.lastname` | String | No | Min length: 3 characters |
| `email` | String | Yes | Must be a valid email |
| `password` | String | Yes | Min length: 6 characters |

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
