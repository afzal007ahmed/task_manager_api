# Tasks Management API Documentation

This document describes the **request format, success responses, and error responses** for the Tasks & Auth APIs.

---

## Base URL

```
/api
```

---

# Authentication

## Register User

**POST** `/auth/register`

### Request Body

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Success Response

```json
{
  "success": true,
  "error": null
}
```

### Error Responses

| Status | Message                            |
| ------ | ---------------------------------- |
| 403    | Please provide name/email/password |
| 500    | Something went wrong               |

---

## Login User

**POST** `/auth/login`

### Request Body

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Success Response

```json
{
  "success": true,
  "error": null
}
```

> JWT token is stored in an **HTTP-only cookie**

### Error Responses

| Status | Message                       |
| ------ | ----------------------------- |
| 403    | Please provide email/password |
| 404    | user not found                |
| 401    | Password mismatch             |

---

# Tasks API (Protected)

All routes below require authentication.

---

## Get All Tasks

**GET** `/tasks`

### Query Params (Optional)

| Param         | Description                                 |
| ------------- | ------------------------------------------- |
| orderBy       | Column name (priority, dueDate, status)     |
| orderByValue  | ASC / DESC                                  |
| filterBy      | Field to filter (status, priority, dueDate) |
| filterByValue | Value for filter                            |
| from          | Start date (for dueDate)                    |
| to            | End date (for dueDate)                      |
| page          | Page number (10 items per page)             |

### Success Response

```json
{
  "data": [
    {
      "id": 1,
      "title": "Finish project",
      "priority": "high",
      "status": "pending",
      "dueDate": "2026-02-01"
    }
  ],
  "error": null
}
```

---

## Create Task

**POST** `/tasks`

### Request Body

```json
{
  "title": "Finish assignment",
  "description": "Complete API docs",
  "priority": "high",
  "status": "pending",
  "dueDate": "2026-02-01"
}
```

### Success Response

```json
{
  "success": true,
  "error": null
}
```

### Error Responses

| Status | Message                                      |
| ------ | -------------------------------------------- |
| 403    | Please provide title/priority/status/dueDate |

---

## Get Task By ID

**GET** `/tasks/:id`

### Success Response

```json
{
  "data": {
    "id": 1,
    "title": "Finish assignment",
    "priority": "high",
    "status": "pending",
    "dueDate": "2026-02-01"
  },
  "error": null
}
```

### Error Responses

| Status | Message                                         |
| ------ | ----------------------------------------------- |
| 401    | You are not authorized to see this task details |

---

## Update Task By ID

**PUT** `/tasks/:id`

### Request Body (Any field optional)

```json
{
  "status": "completed",
  "priority": "medium"
}
```

### Success Response

```json
{
  "success": true,
  "error": null
}
```

### Error Responses

| Status | Message                                                |
| ------ | ------------------------------------------------------ |
| 401    | You are not authorized to make any update to this task |

---

## Delete Task By ID

**DELETE** `/tasks/:id`

### Success Response

```json
{
  "success": true,
  "error": null
}
```

### Error Responses

| Status | Message                                    |
| ------ | ------------------------------------------ |
| 401    | You are not authorized to delete this task |

---

# Global Error Format

```json
{
  "data": null,
  "error": {
    "message": "Error message",
    "code": 401
  }
}
```

---

## Error Handling

### Global Error Middleware

All application errors are handled using a centralized Express error middleware.

#### Middleware Code

```js
const errorMiddleware = (err, req, res, next) => {
  const errorMessage = err.message || "Something went wrong.";
  const errorStatus = err.code || 500;

  res.status(errorStatus).send({
    message: errorMessage,
  });
};

module.exports = { errorMiddleware };
```

---

### Standard Error Response Format

````json
{
  "message": "Error message"
}
```json
{
  "data": null,
  "error": {
    "message": "Error message",
    "code": 401
  }
}
````

---

### Middleware Registration

```js
app.use(errorMiddleware);
```

---

✅ This ensures predictable, production-ready error handling across the API.
