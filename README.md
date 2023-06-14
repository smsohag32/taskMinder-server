### Task Minder

The Task Minder server is responsible for handling the backend logic and API operations for the Task Minder web application. This documentation provides an overview of the server features, installation instructions, and usage guidelines.

## Live Link

You can access the live version of Task Minder by following this link: [Task Minder Live]()

## Features

1. **API Endpoints**: The server provides the following API endpoints:

   - `GET /task/all`: Retrieves all tasks from the database.
   - `POST /task/add`: Creates a new task.
   - `PUT /task/update/:id`: Updates an existing task.
   - `PATCH /task/status/:id`: Updates an existing task.
   - `DELETE /task/:id`: Deletes a task.

2. **Express.js Framework**: The server is built using Express.js, providing a robust and flexible web application framework for handling API requests and routing.
3. **MongoDB Database**: Task data is stored and retrieved from a MongoDB database using Mongoose, enabling CRUD operations and efficient data management.
