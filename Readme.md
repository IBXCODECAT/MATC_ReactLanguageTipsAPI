# Language Learning Tips API Documentation
The Language Learning Tips API provides a collection of language learning tips that can be accessed through various endpoints. This API is designed to provide random tips and tips by specific ID.
## Base URL
The base URL for this API is `http://localhost:8000`
## Endpoints
### Get a Random Language Learning Tip
- **Endpoint:** `/tips`
- **HTTP Method:** GET
- **Description:** Retrieves a random language learning tip.
- **Request Headers:**
  - `Content-Type: application/raw`
- **Response Headers:**
  - `Allow: GET`
  - `Content-Type: application/raw`
  - `Cache-Control: public, maxAge=3600` (HTTP 1.1)
  - `Last-Modified: [current date]` (last modified timestamp)
  - `ETag: [tip ETag]` (entity tag for the response)
  - `X-RateLimit-Limit: 60` (maximum allowed requests per minute)
  - `X-RateLimit-Remaining: [remaining requests]` (remaining requests within the rate limit)
  - `X-RateLimit-Reset: [reset timestamp]` (timestamp when rate limit resets)
- **Status Codes:**
  - 200 OK: Returns a random language learning tip.
  - 405 Method Not Allowed: Invalid HTTP method.
- **Sample Request:**
  ```http
  GET http://localhost:<port>/tips
  ```
### Get a Language Learning Tip by ID
- **Endpoint:** `/tips/:id`
- **HTTP Method:** GET
- **Description:** Retrieves a language learning tip by its ID.
- **Request Headers:**
  - `Content-Type: application/raw`
- **URL Parameters:**
  - `id`: The ID of the tip to retrieve.
- **Response Headers:**
  - `Allow: GET`
  - `Content-Type: application/raw`
  - `Last-Modified: [current date]` (last modified timestamp)
  - `ETag: [tip ETag]` (entity tag for the response)
  - `X-RateLimit-Limit: 60` (maximum allowed requests per minute)
  - `X-RateLimit-Remaining: [remaining requests]` (remaining requests within the rate limit)
  - `X-RateLimit-Reset: [reset timestamp]` (timestamp when rate limit resets)
- **Status Codes:**
  - 200 OK: Returns the language learning tip with the specified ID.
  - 404 Not Found: Tip with the specified ID not found.
  - 405 Method Not Allowed: Invalid HTTP method.
- **Sample Request:**
  ```http
  GET http://localhost:<port>/tips/1
  ```
### Get Health Check
- **Endpoint:** `/`
- **HTTP Method:** GET
- **Description:** Provides a health check endpoint to verify the server's status.
- **Request Headers:**
  - `Content-Type: empty`
- **Response Headers:**
  - `Allow: GET`
  - `Content-Type: empty`
  - `Cache-Control: private, no-cache, no-store, must-revalidate` (HTTP 1.1)
  - `Last-Modified: [current date]` (last modified timestamp)
  - `ETag: [health check ETag]` (entity tag for the response)
- **Status Codes:**
  - 204 No Content: Server is running and healthy.
  - 405 Method Not Allowed: Invalid HTTP method.
- **Sample Request:**
  ```http
  GET http://localhost:<port>/
  ```
## Rate Limiting
- The API enforces a rate limit of 60 requests per minute per client.
- The `X-RateLimit-Limit` header indicates the maximum allowed requests per minute.
- The `X-RateLimit-Remaining` header indicates the remaining requests within the rate limit.
- The `X-RateLimit-Reset` header indicates the timestamp when the rate limit resets.
## Error Handling
- If an error occurs, the API will respond with a 500 Internal Server Error and an error message in the response body.