# 🌐 Looplab Platform — REST API Specification for Frontend Engineers
**Version:** 1.0 (Production Ready)  
**Base URL:** `http://localhost:5000/api/v1` (Development) | `https://api.looplab.site/api/v1` (Production)  

### 🔑 Authentication Strategy: `httpOnly` JWT Cookies
- All Admin endpoints rely on `httpOnly` cookies (`accessToken`).
- **Axios Configuration:** You MUST enable `withCredentials: true` globally:
  ```js
  import axios from 'axios';
  export const api = axios.create({
    baseURL: 'http://localhost:5000/api/v1',
    withCredentials: true, // Sends and receives httpOnly cookies
  });
  ```
- **Fetch API:** Pass `credentials: 'include'` in all fetch calls.

---

## 📐 1. Standard Response Envelope

All endpoints return JSON wrapped in a standard structure.

### Success Response (`200 OK`, `201 Created`)
```json
{
  "statusCode": 200,
  "success": true,
  "message": "Operation completed successfully",
  "data": { ... }
}
```

### Error Response (`400`, `401`, `403`, `404`, `409`, `500`)
```json
{
  "statusCode": 400,
  "success": false,
  "message": "Form validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Email Address must be a valid email address"
    }
  ]
}
```

---

## 🔓 2. Public Endpoints (Public Website & Registration Flow)

### 2.1 Health Check
- **`GET /health`**
- **Auth:** None
- **Response:** `200 OK`
```json
{
  "statusCode": 200,
  "success": true,
  "message": "Server is healthy",
  "data": {
    "status": "UP",
    "timestamp": "2026-09-03T12:00:00.000Z"
  }
}
```

---

### 2.2 Admin Login
- **`POST /auth/login`**
- **Auth:** None
- **Request Payload:**
```json
{
  "email": "admin@looplab.site",
  "password": "your_password_here"
}
```
- **Response:** `200 OK` *(Browser automatically stores `accessToken` httpOnly cookie)*
```json
{
  "statusCode": 200,
  "success": true,
  "message": "Login successful",
  "data": {
    "admin": {
      "id": "66d6a8f1e2b3c4d5e6f70001",
      "name": "LoopLab Admin",
      "email": "admin@looplab.site",
      "role": "superadmin",
      "isActive": true,
      "lastLoginAt": "2026-09-03T12:00:00.000Z"
    }
  }
}
```

---

### 2.3 Fetch Live Banner Event (Homepage Banner)
- **`GET /events/active`**
- **Auth:** None
- **Description:** Returns the active event flagged for the live website banner.
- **Response:** `200 OK`
```json
{
  "statusCode": 200,
  "success": true,
  "message": "Active event fetched",
  "data": {
    "event": {
      "_id": "66d6b123e2b3c4d5e6f70002",
      "title": "LoopVerse 3.0 Hackathon",
      "slug": "loopverse-3",
      "description": "36-hour flagship hackathon organized by LoopLab.",
      "category": "Hackathon",
      "baseFee": 1500,
      "isActive": true,
      "isLiveBanner": true
    }
  }
}
```

---

### 2.4 Fetch Event Metadata & Dynamic Form Fields by Slug
- **`GET /events/:slug`**
- **Example:** `GET /events/loopverse-3`
- **Auth:** None
- **Description:** Used by the registration renderer (`/events/:slug/register`) to build dynamic inputs.
- **Response:** `200 OK`
```json
{
  "statusCode": 200,
  "success": true,
  "message": "Event fetched successfully",
  "data": {
    "event": {
      "_id": "66d6b123e2b3c4d5e6f70002",
      "title": "LoopVerse 3.0 Hackathon",
      "slug": "loopverse-3",
      "description": "36-hour flagship hackathon organized by LoopLab.",
      "category": "Hackathon",
      "eventDate": "2026-10-15T09:00:00.000Z",
      "venue": "NUST Campus, Islamabad",
      "baseFee": 1500,
      "isActive": true,
      "isLiveBanner": true,
      "formFields": [
        {
          "fieldId": "fullName",
          "label": "Full Name",
          "fieldType": "text",
          "isRequired": true,
          "placeholder": "Enter your full name",
          "order": 1
        },
        {
          "fieldId": "email",
          "label": "Email Address",
          "fieldType": "email",
          "isRequired": true,
          "placeholder": "you@example.com",
          "order": 2
        },
        {
          "fieldId": "trackSelect",
          "label": "Select Track",
          "fieldType": "dropdown",
          "options": ["AI & ML", "Web3", "Cybersecurity"],
          "isRequired": true,
          "placeholder": "Choose your track",
          "order": 3
        }
      ]
    }
  }
}
```

---

### 2.5 Validate Promo Code
- **`POST /promo/validate`**
- **Auth:** None
- **Description:** Validates promo code case-insensitively (`loop2026` → `LOOP2026`).
- **Request Payload:**
```json
{
  "code": "LOOP2026",
  "eventId": "66d6b123e2b3c4d5e6f70002"
}
```
- **Success Response:** `200 OK`
```json
{
  "statusCode": 200,
  "success": true,
  "message": "Promo code is valid",
  "data": {
    "discountPercent": 10
  }
}
```
- **Error Response:** `400 Bad Request`
```json
{
  "statusCode": 400,
  "success": false,
  "message": "Invalid or expired promo code",
  "errors": []
}
```

---

### 2.6 Upload Payment Receipt Photo
- **`POST /upload/receipt`**
- **Auth:** None
- **Header:** `Content-Type: multipart/form-data`
- **Form Data Field:** `receipt` (File: JPEG, PNG, WebP, or PDF up to 5 MB)
- **Response:** `200 OK`
```json
{
  "statusCode": 200,
  "success": true,
  "message": "Receipt uploaded successfully",
  "data": {
    "url": "https://res.cloudinary.com/looplab-media/image/upload/v1725360000/looplab/receipts/abc123xyz.jpg"
  }
}
```

---

### 2.7 Submit Event Registration
- **`POST /registrations`**
- **Auth:** None
- **Description:** Submits form answers, promo code, and Cloudinary screenshot URL.
- **Request Payload:**
```json
{
  "eventId": "66d6b123e2b3c4d5e6f70002",
  "participantData": {
    "fullName": "Jane Doe",
    "email": "jane@example.com",
    "trackSelect": "AI & ML"
  },
  "appliedPromoCode": "LOOP2026",
  "paymentScreenshotUrl": "https://res.cloudinary.com/looplab-media/image/upload/v1725360000/looplab/receipts/abc123xyz.jpg"
}
```
- **Response:** `201 Created`
```json
{
  "statusCode": 201,
  "success": true,
  "message": "Registration submitted successfully",
  "data": {
    "registration": {
      "_id": "66d6c987e2b3c4d5e6f70005",
      "eventId": "66d6b123e2b3c4d5e6f70002",
      "participantData": {
        "fullName": "Jane Doe",
        "email": "jane@example.com",
        "trackSelect": "AI & ML"
      },
      "appliedPromoCode": "LOOP2026",
      "baseAmount": 1500,
      "discountAmount": 150,
      "finalAmount": 1350,
      "paymentScreenshotUrl": "https://res.cloudinary.com/looplab-media/image/upload/v1725360000/looplab/receipts/abc123xyz.jpg",
      "paymentStatus": "pending",
      "adminRemarks": "",
      "submittedAt": "2026-09-03T12:00:00.000Z"
    }
  }
}
```

---

## 🔒 3. Admin Panel Endpoints (Cookie Auth Required)

### 3.1 Fetch Current Admin Session Profile
- **`GET /auth/me`**
- **Response:** `200 OK`
```json
{
  "statusCode": 200,
  "success": true,
  "message": "Profile fetched successfully",
  "data": {
    "admin": {
      "_id": "66d6a8f1e2b3c4d5e6f70001",
      "name": "LoopLab Admin",
      "email": "admin@looplab.site",
      "role": "superadmin",
      "isActive": true
    }
  }
}
```

---

### 3.2 Create Additional Admin Account
- **`POST /auth/create-admin`**
- **Request Payload:**
```json
{
  "name": "Co-Admin",
  "email": "coadmin@looplab.site",
  "password": "CoAdminPassword123!",
  "role": "admin"
}
```
- **Response:** `201 Created`

---

### 3.3 Admin Logout
- **`POST /auth/logout`**
- **Response:** `200 OK` *(Clears `accessToken` cookie)*

---

### 3.4 Dashboard KPI Metrics
- **`GET /admin/registrations/metrics`**
- **Response:** `200 OK`
```json
{
  "statusCode": 200,
  "success": true,
  "message": "Dashboard metrics fetched",
  "data": {
    "totalRegistrations": 42,
    "pendingCount": 12,
    "verifiedCount": 28,
    "rejectedCount": 2,
    "totalApprovedRevenue": 37800,
    "totalPromoUsage": 18,
    "recentRegistrations": [
      {
        "_id": "66d6c987e2b3c4d5e6f70005",
        "participantData": {
          "fullName": "Jane Doe",
          "email": "jane@example.com"
        },
        "paymentStatus": "pending",
        "finalAmount": 1350,
        "submittedAt": "2026-09-03T12:00:00.000Z",
        "eventId": {
          "_id": "66d6b123e2b3c4d5e6f70002",
          "title": "LoopVerse 3.0 Hackathon"
        }
      }
    ]
  }
}
```

---

### 3.5 List All Events (Admin Management)
- **`GET /admin/events`**
- **Response:** `200 OK`

---

### 3.6 Create New Event + Dynamic Form Schema (Admin)
- **`POST /admin/events`**
- **Request Payload:**
```json
{
  "title": "LoopVerse 4.0 Summit",
  "slug": "loopverse-4-summit",
  "description": "Tech summit",
  "category": "Summit",
  "baseFee": 1000,
  "isActive": true,
  "formFields": [
    {
      "fieldId": "fullName",
      "label": "Full Name",
      "fieldType": "text",
      "isRequired": true,
      "order": 1
    }
  ]
}
```
- **Response:** `201 Created`

---

### 3.7 Toggle Event Live Banner (Admin)
- **`PATCH /admin/events/:id/banner`**
- **Request Payload:**
```json
{
  "isLiveBanner": true
}
```
- **Response:** `200 OK`

---

### 3.8 List Registrations with Pagination & Filtering (Admin)
- **`GET /admin/registrations?status=pending&page=1&limit=20`**
- **Query Parameters:**
  - `status` *(optional)*: `'pending' | 'verified' | 'rejected'`
  - `eventId` *(optional)*: MongoDB ObjectId string
  - `page` *(optional, default: 1)*: Number
  - `limit` *(optional, default: 20)*: Number
- **Response:** `200 OK`
```json
{
  "statusCode": 200,
  "success": true,
  "message": "Registrations fetched successfully",
  "data": {
    "data": [
      {
        "_id": "66d6c987e2b3c4d5e6f70005",
        "eventId": {
          "_id": "66d6b123e2b3c4d5e6f70002",
          "title": "LoopVerse 3.0 Hackathon",
          "slug": "loopverse-3"
        },
        "participantData": {
          "fullName": "Jane Doe",
          "email": "jane@example.com",
          "trackSelect": "AI & ML"
        },
        "appliedPromoCode": "LOOP2026",
        "baseAmount": 1500,
        "discountAmount": 150,
        "finalAmount": 1350,
        "paymentScreenshotUrl": "https://res.cloudinary.com/looplab-media/image/upload/v1725360000/looplab/receipts/abc123xyz.jpg",
        "paymentStatus": "pending",
        "adminRemarks": "",
        "submittedAt": "2026-09-03T12:00:00.000Z"
      }
    ],
    "total": 1,
    "page": 1,
    "limit": 20,
    "totalPages": 1
  }
}
```

---

### 3.9 Single Registration Detail (Admin Modal Side-by-Side View)
- **`GET /admin/registrations/:id`**
- **Response:** `200 OK`

---

### 3.10 Verify or Reject Payment Submission (Admin)
- **`PATCH /admin/registrations/:id/status`**
- **Description:** Sets status to `'verified'` or `'rejected'`. If set to `'verified'`, auto-increments usage on the promo code.
- **Request Payload:**
```json
{
  "status": "verified",
  "remarks": "Bank receipt matched"
}
```
- **Response:** `200 OK`
```json
{
  "statusCode": 200,
  "success": true,
  "message": "Registration status updated",
  "data": {
    "registration": {
      "_id": "66d6c987e2b3c4d5e6f70005",
      "paymentStatus": "verified",
      "adminRemarks": "Bank receipt matched",
      "verifiedBy": "66d6a8f1e2b3c4d5e6f70001",
      "verifiedAt": "2026-09-03T12:05:00.000Z"
    }
  }
}
```

---

### 3.11 Create Promo Code (Admin)
- **`POST /admin/promo-codes`**
- **Request Payload:**
```json
{
  "code": "SOCIETY15",
  "partnerName": "ACM Chapter",
  "partnerType": "community_partner",
  "discountPercent": 15,
  "maxUsage": 50,
  "isActive": true,
  "eventId": null
}
```
- **Response:** `201 Created`

---

### 3.12 Toggle Promo Code Active Status (Admin)
- **`PATCH /admin/promo-codes/:id`**
- **Request Payload:**
```json
{
  "isActive": false
}
```
- **Response:** `200 OK`
