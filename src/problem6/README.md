# Scoreboard API Module Specification

## Overview

This module is designed to handle live score updates for a website’s scoreboard. The scoreboard displays the top 10 users based on their scores. The API will allow for secure score updates triggered by user actions, ensure data integrity, and enable real-time updates for connected clients.

## Features

### 1. Real-Time Scoreboard

- The scoreboard display the **top 10 users with the highest score**
- Scores are updated in **real-time** to make sure users can see the latest ranking.

### 2. Score Update

- Users can perform specific actions to increase their currrent score
- Upon completing an action, an API is executed to update the user's score

### 3. **Score Security**

- **Authentication**: All API requests for updated score are authenticated for preventing malicious user

## Architecture

### 1. Technologies

- **Backend** : Node.js (Express.js or Nest.js suggested).
- **Database**: PostgreSQL
- **Websocket**: Socket.io for real-time updated
- **Authentication**: JSON Web Token (JWT)

### 2. Database Design

| Field     | Type    | Description          |
| --------- | ------- | -------------------- |
| user_id   | string  | Primary key, user ID |
| user_name | string  | User name            |
| password  | string  | Password             |
| score     | integer | Current user score   |

### 3. Flow Diagram

<img src="./images/Flow Diagram.png" alt="Scoreboard Module Flow Diagram"></img>

### 4. Security

- Use **JWT Authenticate** for request validation
- Validate **score** in request body to ensure it's within a suitable range.

## API Endpoints

### 1. Update User Score

- **Endpoint**: _/api/v1/score/:userId_
- **Method**: _POST_
- **Authentication**: JWT-based authentication with user roles.
- **Request Body**:
  ```
  {
      "score": "integer"
  }
  ```
- **Response**:
  - **200 OK**: Score updated successfully
  ```
  {
      "status_code": 200,
      "message": "Score updated successfully",
      "data": {
          "new_score": "integer"
      }
  }
  ```
  - **400 Bad Request**: Invalid request body (example: score: "abc")
  ```
  {
      "status_code": 200,
      "message": "Bad Request",
  }
  ```
  - **401 Unauthorized**: User not authenticated
  ```
  {
      "status_code": 401,
      "message": "Unauthorized",
  }
  ```

### 2. Update User Score

- **Endpoint**: _/api/v1/score/:userId_
- **Method**: _POST_
- **Authentication**: JWT-based authentication with user roles.
- **Request Body**:
  ```
  {
      "score": "integer"
  }
  ```
- **Response**:
  - **200 OK**: Score updated successfully
  ```
  {
      "status_code": 200,
      "message": "Score updated successfully",
      "data": {
          "new_score": "integer"
      }
  }
  ```
  - **400 Bad Request**: Invalid request body (example: score: "abc")
  ```
  {
      "status_code": 200,
      "message": "Bad Request",
  }
  ```
  - **401 Unauthorized**: User not authenticated
  ```
  {
      "status_code": 401,
      "message": "Unauthorized",
  }
  ```

### 2. Get Scoreboard:

- **Endpoint**: _/api/v1/score_
- **Method**: _GET_
- **Authentication**: Public (no authentication required)
- **Response**:
  - **200 OK**: Get scoreboard successfully
  ```
  {
      "status_code": 200,
      "message": "Score updated successfully",
      "data": {
          "list_users": [
              {
                  "user_id": "number",
                  "user_name": "string",
                  "score": "number"
              }
          ]
      }
  }
  ```

## Improvements And Recommendation

### Caching

- Use **Redis** to store the top 10 scores, reducing the load on the database for frequent queries.

### Scalability:

- Consider using **Load Balacing** (**Nginx** or **ELB**) for distributing incoming traffic helps to improve system reliability and prevent overloading a single server.

### Event-Driven Architecture
- Using **Message Queue** (**RabbitMQ** or **Kafka**) for improve the handling update events