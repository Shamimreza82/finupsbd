# API Documentation

This document provides documentation for all the API endpoints in the FinupsBD backend.

---

<br>

## Auth Module (`/api/v1/auth`)

### POST /signUp

- **Description:** Register a new user.
- **Request Body:** `application/json`
  ```json
  {
    "name": "string",
    "email": "string (email format)",
    "phone": "string (valid phone number)",
    "password": "string (min 6 characters)"
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "success": true,
    "message": "Cheack your phone or email and and verify!",
    "data": { ... }
  }
  ```

### POST /validate-pin

- **Description:** Validate user's PIN for verification.
- **Request Body:** `application/json`
  ```json
  {
    "phone": "string (valid phone number)",
    "pin": "string (min 6 characters)"
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "success": true,
    "message": "User verify successfully please Login",
    "data": { ... }
  }
  ```

### POST /login

- **Description:** Login for an existing user.
- **Request Body:** `application/json`
  ```json
  {
    "identifier": "string (email or phone)",
    "password": "string"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "User login successfully!",
    "data": {
      "accessToken": "string"
    }
  }
  ```

### POST /forget-password

- **Description:** Initiate password reset via email.
- **Request Body:** `application/json`
  ```json
  {
    "email": "string (email format)"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Check your email for verification!",
    "data": {}
  }
  ```

### POST /forget-password-phone

- **Description:** Initiate password reset via phone.
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Check your phone for verification!",
    "data": {}
  }
  ```

### POST /reset-password

- **Description:** Reset user password.
- **Request Body:** `application/json`
  ```json
  {
    "phone": "string (optional)",
    "email": "string (optional, email format)",
    "newPassword": "string (min 6 characters)"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Password Reset successfully please login",
    "data": {}
  }
  ```

### POST /change-password

- **Description:** Change password for an authenticated user.
- **Authentication:** Required (USER, ADMIN, SUPER_ADMIN).
- **Request Body:** `application/json`
  ```json
  {
    "oldPassword": "string (min 6 characters)",
    "newPassword": "string (min 6 characters)"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Password chnage successfully ",
    "data": {}
  }
  ```

### POST /refresh-token

- **Description:** Refresh the access token using the refresh token from cookies.
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Access Token is retrieve",
    "data": {
      "accessToken": "string"
    }
  }
  ```

### POST /logout

- **Description:** Logout an authenticated user.
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "logout Successfully",
    "data": {}
  }
  ```

---

<br>

## Application Module (`/api/v1/application`)

### POST /create-application

- **Description:** Create a new loan application.
- **Authentication:** Required (USER, SUPER_ADMIN, ADMIN).
- **Request Body:** `multipart/form-data`
  - `files`: max 10 files
  - `data`: JSON string
  - `loanRequest`: JSON string
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Application created successfully",
    "data": { ... }
  }
  ```

### POST /applicant-guarator-info-personal

- **Description:** Add guarantor personal information to an application.
- **Request Body:** `multipart/form-data`
  - `files`: array of files
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Guarantor information added successfully",
    "data": { ... }
  }
  ```

### POST /applicant-guarator-info-business

- **Description:** Add guarantor business information to an application.
- **Request Body:** `multipart/form-data`
  - `files`: array of files
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Guarantor information added successfully",
    "data": { ... }
  }
  ```

### GET /my-loan-application

- **Description:** Get the loan applications for the authenticated user.
- **Authentication:** Required (USER, SUPER_ADMIN, ADMIN).
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Retrieved loan applications successfully",
    "data": [ ... ]
  }
  ```

### GET /

- **Description:** Get all loan applications.
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Retrieved all applications successfully",
    "data": [ ... ]
  }
  ```

### POST /application-tracking

- **Description:** Track a loan application.
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Retrieved application status successfully",
    "data": { ... }
  }
  ```

### POST /application-forget

- **Description:** Handle forgotten application details.
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Handled forgotten application successfully",
    "data": { ... }
  }
  ```

### GET /:id

- **Description:** Get a single application by ID.
- **Authentication:** Required (USER, SUPER_ADMIN, ADMIN).
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Retrieved application successfully",
    "data": { ... }
  }
  ```

---

<br>

## Blog Module (`/api/v1/blogs`)

### POST /create-blog

- **Description:** Create a new blog post.
- **Authentication:** Required (USER, ADMIN, SUPER_ADMIN).
- **Request Body:** `multipart/form-data`
  - `file`: image file
  - `data`: JSON string with blog post details
- **Response (201 Created):**
  ```json
  {
    "success": true,
    "message": "Blog create successfully",
    "data": { ... }
  }
  ```

### POST /comment

- **Description:** Add a comment to a blog post.
- **Authentication:** Required (USER, ADMIN, SUPER_ADMIN).
- **Request Body:** `application/json`
  ```json
  {
    "blogId": "string",
    "comment": "string"
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "success": true,
    "message": "Comment added successfully.",
    "data": {}
  }
  ```

### PATCH /:id

- **Description:** Update a blog post.
- **Request Body:** `application/json`
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Blog updated successfully.",
    "data": { ... }
  }
  ```

### GET /single-blog/:id

- **Description:** Get a single blog post by ID.
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "A single blog post.",
    "data": { ... }
  }
  ```

### DELETE /:id

- **Description:** Delete a blog post by ID.
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Blog deleted successfully.",
    "data": {}
  }
  ```

### GET /all-blogs

- **Description:** Get all blog posts.
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "A list of blog posts.",
    "data": [ ... ]
  }
  ```

---

<br>

## Eligibility Check Module (`/api/v1/eligibility-check`)

### POST /

- **Description:** Check eligibility for loans/cards.
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Eligibility check completed successfully",
    "data": { ... }
  }
  ```

### GET /cards

- **Description:** Get all cards for eligibility check.
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Retrieved all cards successfully",
    "data": [ ... ]
  }
  ```

---

<br>

## Super Admin Module (`/api/v1/super-admin`)

### Cards (`/cards`)

#### POST /

- **Description:** Create a new card.
- **Request Body:** `multipart/form-data`
  - `file`: image file
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Card created successfully",
    "data": { ... }
  }
  ```

#### GET /

- **Description:** Get all cards.
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Retrieved all cards successfully",
    "data": [ ... ]
  }
  ```

#### PATCH /:id

- **Description:** Update a card by ID.
- **Request Body:** `multipart/form-data`
  - `file`: image file
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Card updated successfully",
    "data": { ... }
  }
  ```

#### GET /:id

- **Description:** Get a single card by ID.
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Retrieved card successfully",
    "data": { ... }
  }
  ```

### Dashboard (`/dashboard`)

#### GET /dashboard-home

- **Description:** Get dashboard home data.
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Retrieved dashboard home data successfully",
    "data": { ... }
  }
  ```

#### GET /modules

- **Description:** Get all modules.
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Retrieved all modules successfully",
    "data": [ ... ]
  }
  ```

#### PATCH /modules-status/:id

- **Description:** Change a module's status.
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Module status changed successfully",
    "data": { ... }
  }
  ```

### Application (`/application`)

#### GET /get-all-application

- **Description:** Get all applications.
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Retrieved all applications successfully",
    "data": [ ... ]
  }
  ```

#### GET /get-single-application/:id

- **Description:** Get a single application by ID.
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Retrieved application successfully",
    "data": { ... }
  }
  ```

#### PATCH /application-feedback/:id

- **Description:** Provide feedback for an application.
- **Request Body:** `application/json`
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Application feedback provided successfully",
    "data": { ... }
  }
  ```

#### GET /status-events/:id

- **Description:** Get status events for an application.
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Retrieved status events successfully",
    "data": [ ... ]
  }
  ```

### Users (`/users`)

#### GET /get-all-users

- **Description:** Get all users.
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Retrieved all users successfully",
    "data": [ ... ]
  }
  ```

#### GET /get-single-user/:id

- **Description:** Get a single user by ID.
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Retrieved user successfully",
    "data": { ... }
  }
  ```

---

<br>

## NewsLetter Module (`/api/v1/news-letter`)

### POST /

- **Description:** Subscribe to the newsletter.
- **Request Body:** `application/json`
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Subscribed to newsletter successfully",
    "data": { ... }
  }
  ```

### GET /

- **Description:** Get all newsletter subscribers.
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Retrieved all subscribers successfully",
    "data": [ ... ]
  }
  ```

---

<br>

## Bank Portal Module (`/api/v1/bank-portal/auth`)

### POST /regiater

- **Description:** Register a new bank user.
- **Request Body:** `application/json`
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Bank user registered successfully",
    "data": { ... }
  }
  ```

### POST /login

- **Description:** Login for a bank user.
- **Request Body:** `application/json`
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Bank user logged in successfully",
    "data": { ... }
  }
  ```

### GET /me

- **Description:** Get the profile of the authenticated bank user.
- **Authentication:** Required (BANK_USER).
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Retrieved bank user profile successfully",
    "data": { ... }
  }
  ```

---

<br>

## User Module (`/api/v1/users`)

### GET /get-all-new-loans/:id

- **Description:** Get all new loans for a user.
- **Authentication:** Required (USER).
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Retrieved all new loans successfully",
    "data": [ ... ]
  }
  ```

### GET /get-all-existing-loan/:id

- **Description:** Get all existing loans for a user.
- **Authentication:** Required (USER).
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Retrieved all existing loans successfully",
    "data": [ ... ]
  }
  ```

### GET /get-all-rejects-loan/:id

- **Description:** Get all rejected loans for a user.
- **Authentication:** Required (USER).
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Retrieved all rejected loans successfully",
    "data": [ ... ]
  }
  ```

### GET /

- **Description:** Get all users.
- **Authentication:** Required (USER, ADMIN, SUPER_ADMIN).
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Retrieved all users successfully",
    "data": [ ... ]
  }
  ```

### GET /my-profile

- **Description:** Get the profile of the authenticated user.
- **Authentication:** Required (USER, ADMIN, SUPER_ADMIN).
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Retrieved user profile successfully",
    "data": { ... }
  }
  ```

### GET /:id

- **Description:** Get a single user by ID.
- **Authentication:** Required (USER, ADMIN, SUPER_ADMIN).
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Retrieved user successfully",
    "data": { ... }
  }
  ```

### GET /get-application/:id

- **Description:** Get an application by ID.
- **Authentication:** Required (USER).
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Retrieved application successfully",
    "data": { ... }
  }
  ```

### POST /create-addi-doc/:id

- **Description:** Create additional documents for an application.
- **Authentication:** Required (USER).
- **Request Body:** `multipart/form-data`
  - `files`: max 10 files
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Additional documents created successfully",
    "data": { ... }
  }
  ```

### GET /agreement-doc/:id

- **Description:** Get the agreement document for an application.
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Retrieved agreement document successfully",
    "data": { ... }
  }
  ```

---

<br>

## Profile Module (`/api/v1/profiles`)

### POST /

- **Description:** Create a user profile.
- **Authentication:** Required (USER, ADMIN, SUPER_ADMIN).
- **Request Body:** `multipart/form-data`
  - `file`: image file
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Profile created successfully",
    "data": { ... }
  }
  ```

---

<br>

## OpenAI Module (`/api/v1/openai`)

### POST /assistant/:id/message

- **Description:** Interact with the AI assistant.
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "AI assistant responded successfully",
    "data": { ... }
  }
  ```

---

<br>

## Public Module (`/api/v1/public`)

### POST /emi-calculator

- **Description:** Calculate EMI.
- **Request Body:** `application/json`
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "EMI calculated successfully",
    "data": { ... }
  }
  ```
