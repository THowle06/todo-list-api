# Todo List API

A RESTful API to allow users to manage their to-do list with user authentication, authorization, and comprehensive CRUD operations.

As found on [roadmap.sh](https://roadmap.sh/projects/todo-list-api).

## Goals

The skills you will learn from this project include:

- User authentication
- Schema design and Databases
- RESTful API design
- CRUD operations
- Error handling
- Security

## Requirements

You are required to develop a RESTful API with the following endpoints:

- User registration to create a new user
- Login endpoint to authenticate the user and generate a token
- CRUD operations for managing the to-do list
- User authentication to allow only authorized users to access the to-do list
- Error handling and security measures
- Database to store user and to-do list data
- Proper data validation
- Pagination and filtering for the to-do list

## API Endpoints

### User Registration

Register a new user:

```text
POST /register
```

**Request:**

```json
{
  "name": "John Doe",
  "email": "john@doe.com",
  "password": "password"
}
```

This will validate the given details, ensure the email is unique, and store the user details in the database with a hashed password.

**Response (201 Created):**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
}
```

The token can be a JWT or a random string used for authentication.

### User Login

Authenticate the user:

```text
POST /login
```

**Request:**

```json
{
  "email": "john@doe.com",
  "password": "password"
}
```

**Response (200 OK):**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
}
```

### Create a To-Do Item

Create a new to-do item:

```text
POST /todos
```

**Headers:**

```text
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
```

**Request:**

```json
{
  "title": "Buy groceries",
  "description": "Buy milk, eggs, and bread"
}
```

The user must send the token received from the login endpoint in the Authorization header. If the token is missing or invalid, respond with a 401 status code.

**Response (201 Created):**

```json
{
  "id": 1,
  "title": "Buy groceries",
  "description": "Buy milk, eggs, and bread"
}
```

**Error Response (401 Unauthorized):**

```json
{
  "message": "Unauthorized"
}
```

### Get To-Do Items

Get the list of to-do items:

```text
GET /todos?page=1&limit=10
```

**Headers:**

```text
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
```

The user must be authenticated. The response should be paginated.

**Response (200 OK):**

```json
{
  "data": [
    {
      "id": 1,
      "title": "Buy groceries",
      "description": "Buy milk, eggs, bread"
    },
    {
      "id": 2,
      "title": "Pay bills",
      "description": "Pay electricity and water bills"
    }
  ],
  "page": 1,
  "limit": 10,
  "total": 2
}
```

### Update a To-Do Item

Update an existing to-do item:

```text
PUT /todos/1
```

**Headers:**

```text
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
```

**Request:**

```json
{
  "title": "Buy groceries",
  "description": "Buy milk, eggs, bread, and cheese"
}
```

The user must be authenticated and authorized (must be the creator of the to-do item). If the user lacks permission, respond with a 403 status code.

**Response (200 OK):**

```json
{
  "id": 1,
  "title": "Buy groceries",
  "description": "Buy milk, eggs, bread, and cheese"
}
```

**Error Response (403 Forbidden):**

```json
{
  "message": "Forbidden"
}
```

### Delete a To-Do Item

Delete an existing to-do item:

```text
DELETE /todos/1
```

**Headers:**

```text
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
```

The user must be authenticated and authorized to delete the to-do item.

**Response (204 No Content):**

- No response body on successful deletion
