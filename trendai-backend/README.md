# TrendAI Backend API

This is the backend API for the TrendAI platform, built with **Nest.js**, **MongoDB**, and **JWT-based authentication**. It provides endpoints for managing campaigns, influencers, submissions, and user authentication.

---

## Table of Contents

1. [Prerequisites](https://chat.deepseek.com/a/chat/s/e52959fe-3b86-428d-a658-4a663885c018#prerequisites)

2. [Setup](https://chat.deepseek.com/a/chat/s/e52959fe-3b86-428d-a658-4a663885c018#setup)

3. [Running the Application](https://chat.deepseek.com/a/chat/s/e52959fe-3b86-428d-a658-4a663885c018#running-the-application)

4. [Environment Variables](https://chat.deepseek.com/a/chat/s/e52959fe-3b86-428d-a658-4a663885c018#environment-variables)

5. [API Endpoints](https://chat.deepseek.com/a/chat/s/e52959fe-3b86-428d-a658-4a663885c018#api-endpoints)

   - [Authentication](https://chat.deepseek.com/a/chat/s/e52959fe-3b86-428d-a658-4a663885c018#authentication)

   - [Campaigns](https://chat.deepseek.com/a/chat/s/e52959fe-3b86-428d-a658-4a663885c018#campaigns)

   - [Influencers](https://chat.deepseek.com/a/chat/s/e52959fe-3b86-428d-a658-4a663885c018#influencers)

   - [Submissions](https://chat.deepseek.com/a/chat/s/e52959fe-3b86-428d-a658-4a663885c018#submissions)

6. [Testing the API](https://chat.deepseek.com/a/chat/s/e52959fe-3b86-428d-a658-4a663885c018#testing-the-api)

   - [Using Postman](https://chat.deepseek.com/a/chat/s/e52959fe-3b86-428d-a658-4a663885c018#using-postman)

   - [Using cURL](https://chat.deepseek.com/a/chat/s/e52959fe-3b86-428d-a658-4a663885c018#using-curl)

7. [Deployment](https://chat.deepseek.com/a/chat/s/e52959fe-3b86-428d-a658-4a663885c018#deployment)

---

## Prerequisites

Before running the application, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)

- [MongoDB Atlas](https://www.mongodb.com/atlas/database) account or a local MongoDB instance

- [Postman](https://www.postman.com/), Curl or any API testing tool

---

## Setup

1. Clone the repository:

   `git clone <https://github.com/Domengo/trendai-backend.git>`
   `cd trendai-backend`

2. Install dependencies:

   `npm install`

3. Set up environment variables.

---

## Running the Application

1. Start the development server:
`npm run start`

2. The API will be available at:

   <http://localhost:3000>

---

## Environment Variables

Create a `.env` file in the root directory with the following variables:

``` code
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mhrzhjx.mongodb.net/trendai?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=1h
```

Replace `<username>` and `<password>` with your MongoDB Atlas credentials.

---

## API Endpoints

### Authentication

#### Register a New User

- **URL**: `/auth/register`

- **Method**: `POST`

- **Body**:

``` json
{
  "email": "<user@example.com>",
  "password": "password123"
}
```

- **Response**:

``` json
  {
    "email": "<user@example.com>",
    "\_id": "12345"
  }
```

#### Log In an Existing User

- **URL**: `/auth/login`

- **Method**: `POST`

- **Body**:

```
  {
  "email": "<user@example.com>",
  "password": "password123"
  }
```

- **Response**:

``` json
  {
  "access_token": "your-jwt-token"
  }
```

---

### Campaigns

#### Fetch All Campaigns

- **URL**: `/campaigns`

- **Method**: `GET`

- **Headers**:

  Authorization: Bearer <your-jwt-token>

- **Response**:

``` json
  [
    {
    "_id": "12345",
    "name": "Summer Sale",
    "status": "active",
    "deadline": "2023-12-31T00:00:00.000Z"
    }
  ]
```

#### Fetch a Single Campaign

- **URL**: `/campaigns/:id`

- **Method**: `GET`

- **Headers**:

  ```Authorization: Bearer <your-jwt-token>```

- **Response**:

```
  {
    "\_id": "12345",
    "name": "Summer Sale",
    "status": "active",
    "deadline": "2023-12-31T00:00:00.000Z"
  }
```

#### Create a Campaign

- **URL**: `/campaigns`

- **Method**: `POST`

- **Headers**:

  `Authorization: Bearer <your-jwt-token>`

- **Body**:

```
  {
    "name": "Summer Sale",
    "status": "active",
    "deadline": "2023-12-31"
  }
```

- **Response**:

```
  {
    "\_id": "12345",
    "name": "Summer Sale",
    "status": "active",
    "deadline": "2023-12-31T00:00:00.000Z"
  }
```

---

### Influencers

#### Fetch All Influencers

- **URL**: `/influencers`

- **Method**: `GET`

- **Headers**:

  ```Authorization: Bearer <your-jwt-token>```

- **Response**:

```
  [
    {
      "\_id": "12345",
      "name": "John Doe",
      "joinedCampaigns": []
    }
  ]
```

#### Create an Influencer

- **URL**: `/influencers`

- **Method**: `POST`

- **Headers**:

  ```Authorization: Bearer <your-jwt-token>```

- **Body**:

```
  {
    "name": "John Doe",
    "joinedCampaigns": []
  }
```

- **Response**:

```
  {
    "\_id": "12345",
    "name": "John Doe",
    "joinedCampaigns": []
  }
```

---

### Submissions

#### Fetch All Submissions

- **URL**: `/submissions`

- **Method**: `GET`

- **Headers**:

  ```Authorization: Bearer <your-jwt-token>```

- **Response**:

```
  [
    {
      "_id": "12345",
      "influencer": "influencerId123",
      "campaign": "campaignId123",
      "content": "https://tiktok.com/post123",
      "status": "pending",
      "submissionDate": "2023-10-01T00:00:00.000Z"
    }
  ]
```

#### Approve a Submission

- **URL**: `/submissions/:id/approve`

- **Method**: `PATCH`

- **Headers**:

  ```Authorization: Bearer <your-jwt-token>```

- **Response**:

``` json
  {
    "\_id": "12345",
    "status": "approved"
  }
```

---

## Testing the API

### Using Postman

1. **Create a Postman Collection**:

   - Open Postman and click on **New > Collection**.

   - Name the collection `TrendAI API`.

   - Add requests for each endpoint (e.g., `/auth/register`, `/auth/login`, `/campaigns`, etc.).

   - For authenticated endpoints, add the `Authorization` header with the JWT token.

2. **Import the Collection**:

   - Save the following as `trendai-postman-collection`:

<details>
  <summary>Click to expand API collection</summary>

``` json
    {
  "info": {
    "name": "TrendAI API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Register",
      "request": {
        "method": "POST",
        "header": [],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"email\": \"user@example.com\",\n  \"password\": \"password123\"\n}"
        },
        "url": {
          "raw": "http://localhost:3000/auth/register",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["auth", "register"]
        }
      }
    },
    {
      "name": "Login",
      "request": {
        "method": "POST",
        "header": [],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"email\": \"user@example.com\",\n  \"password\": \"password123\"\n}"
        },
        "url": {
          "raw": "http://localhost:3000/auth/login",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["auth", "login"]
        }
      }
    },
    {
      "name": "Fetch All Campaigns",
      "request": {
        "method": "GET",
        "header": [
          {
            "key": "Authorization",
            "value": "Bearer <your-jwt-token>"
          }
        ],
        "url": {
          "raw": "http://localhost:3000/campaigns",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["campaigns"]
        }
      }
    },
    {
      "name": "Fetch Single Campaign",
      "request": {
        "method": "GET",
        "header": [
          {
            "key": "Authorization",
            "value": "Bearer <your-jwt-token>"
          }
        ],
        "url": {
          "raw": "http://localhost:3000/campaigns/12345",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["campaigns", "12345"]
        }
      }
    },
    {
      "name": "Create Campaign",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Authorization",
            "value": "Bearer <your-jwt-token>"
          },
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"name\": \"Summer Sale\",\n  \"status\": \"active\",\n  \"deadline\": \"2023-12-31\"\n}"
        },
        "url": {
          "raw": "http://localhost:3000/campaigns",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["campaigns"]
        }
      }
    },
    {
      "name": "Fetch All Influencers",
      "request": {
        "method": "GET",
        "header": [
          {
            "key": "Authorization",
            "value": "Bearer <your-jwt-token>"
          }
        ],
        "url": {
          "raw": "http://localhost:3000/influencers",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["influencers"]
        }
      }
    },
    {
      "name": "Create Influencer",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Authorization",
            "value": "Bearer <your-jwt-token>"
          },
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"name\": \"John Doe\",\n  \"joinedCampaigns\": []\n}"
        },
        "url": {
          "raw": "http://localhost:3000/influencers",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["influencers"]
        }
      }
    },
    {
      "name": "Fetch All Submissions",
      "request": {
        "method": "GET",
        "header": [
          {
            "key": "Authorization",
            "value": "Bearer <your-jwt-token>"
          }
        ],
        "url": {
          "raw": "http://localhost:3000/submissions",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["submissions"]
        }
      }
    },
    {
      "name": "Create Submission",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Authorization",
            "value": "Bearer <your-jwt-token>"
          },
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"influencer\": \"influencerId123\",\n  \"campaign\": \"campaignId123\",\n  \"content\": \"https://tiktok.com/post123\"\n}"
        },
        "url": {
          "raw": "http://localhost:3000/submissions",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["submissions"]
        }
      }
    },
    {
      "name": "Approve Submission",
      "request": {
        "method": "PATCH",
        "header": [
          {
            "key": "Authorization",
            "value": "Bearer <your-jwt-token>"
          }
        ],
        "url": {
          "raw": "http://localhost:3000/submissions/12345/approve",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["submissions", "12345", "approve"]
        }
      }
    },
    {
      "name": "Reject Submission",
      "request": {
        "method": "PATCH",
        "header": [
          {
            "key": "Authorization",
            "value": "Bearer <your-jwt-token>"
          }
        ],
        "url": {
          "raw": "http://localhost:3000/submissions/12345/reject",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["submissions", "12345", "reject"]
        }
      }
    }
  ]
}
```

</details>

- In Postman, click **Import** and upload the file.

---

### Using cURL

#### 1. Authentication Endpoints

#### Register a New User

``` bash
curl -X POST <http://localhost:3000/auth/register\>
-H "Content-Type: application"\
-d '{"email": "<user@example.com>", "password": "password123"}'
```

#### Log In an Existing User

``` bash
curl -X POST <http://localhost:3000/auth/login\>
-H "Content-Type: application"\
-d '{"email": "<user@example.com>", "password": "password123"}'
```

#### 2. Campaign Endpoints

#### Fetch All Campaigns

``` bash
curl -X GET <http://localhost:3000/campaigns\>
-H "Authorization: Bearer <your-jwt-token>"
```

#### Fetch a Single Campaign

Replace :id with the actual campaign ID.

```bash
curl -X GET http://localhost:3000/campaigns/12345 \
-H "Authorization: Bearer <your-jwt-token>"
```

#### Create a Campaign

``` bash
curl -X POST <http://localhost:3000/campaigns\>
-H "Content-Type: application"\
-H "Authorization: Bearer <your-jwt-token>"\
-d '{"name": "Summer Sale", "status": "active", "deadline": "2023-12-31"}'
```

#### 3. Influencer Endpoints

#### Fetch All Influencers

```bash
curl -X GET http://localhost:3000/influencers \
-H "Authorization: Bearer <your-jwt-token>"
```

#### Create an Influencer

```bash
curl -X POST http://localhost:3000/influencers \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <your-jwt-token>" \
-d '{"name": "John Doe", "joinedCampaigns": []}'
```

#### 4. Submission Endpoints

#### Fetch All Submissions

```bash
curl -X GET http://localhost:3000/submissions \
-H "Authorization: Bearer <your-jwt-token>"
```

#### Create a Submission

Replace influencerId123 and campaignId123 with actual IDs.

```bash
curl -X POST http://localhost:3000/submissions \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <your-jwt-token>" \
-d '{"influencer": "influencerId123", "campaign": "campaignId123", "content": "https://tiktok.com/post123"}'
```

#### Approve a Submission

Replace :id with the actual submission ID.

```bash
curl -X PATCH http://localhost:3000/submissions/12345/approve \
-H "Authorization: Bearer <your-jwt-token>"
```

#### Reject a Submission

Replace :id with the actual submission ID.

```bash
curl -X PATCH http://localhost:3000/submissions/12345/reject \
-H "Authorization: Bearer <your-jwt-token>"
```

---

## Deployment

1. Deploy the backend to a platform like [Render](https://render.com/) or [Heroku](https://www.heroku.com/).

2. Update the `MONGODB_URI` in your `.env` file to point to your production database.

---

## Support

For any issues or questions, please contact <dominicsengo@gmail.com>.

curl -X POST <http://localhost:3000/submissions> -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJzdWIiOiI2N2E1Zjg5ZDczNTU0NmVkNzNhOTU1NjIiLCJpYXQiOjE3Mzg5Mzg3NzcsImV4cCI6MTczODk0MjM3N30.EZaH4GgSHQrwGIlK4wmaS-MgvMRkHpA4oGTPG8-8Mwk" -d '{"influencer": "67a624e70dae33b16195d0bd", "campaign": "67a61a593f2251ba82660dac", "content": "<https://tiktok.com/post123"}>'
