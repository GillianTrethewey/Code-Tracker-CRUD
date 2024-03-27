# Code Tracker API Documentation

Welcome to the Code Tracker API! This API allows you to manage tasks by providing endpoints to retrieve, add, and delete individual tasks. Below is the documentation to help you get started.

Base URL
The base URL for all API endpoints is:

```js
http://localhost:8000
```

## Endpoints

### Get All Tasks

Endpoint: GET /tasks

Description: Retrieve a list of all tasks.

Response:
```json
{
  "tasks": [
    {
      "task": "unique string identifier",
      "completed": true
    },
    {
      "task": "unique string identifier",
      "completed": false
    },
    // ... additional tasks
  ]
}
```

### Add a Task

Endpoint: POST /tasks/:id

Description: Add an individual task with the specified ID.

Request:
id (required): The unique identifier for the task.

```json
{
  "task": "New Task",
  "completed": false
}
```

Response:
```js

{
  "message": "Task added successfully",
  "task": {
    "id": "unique identifier provided",
    "task": "New Task",
    "completed": false
  }
}
```

### Delete a Task

Endpoint: DELETE /tasks/:id

Description: Delete the task with the specified ID.

Request: 
id (required): The unique identifier for the task to be deleted.

Response:

```js
{
  "message": "Task deleted successfully"
}
```

### Error Handling
In case of errors, the API will return an appropriate HTTP status code along with a JSON response containing an error message.

Feel free to reach out if you have any questions or need further assistance!