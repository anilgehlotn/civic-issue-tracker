# Frontend & Backend Feature Specification

## Project Name

**Civic Issue Tracker**

## Purpose of This Document

This document clearly defines **all features** that need to be implemented in the **Frontend** and **Backend** of the Civic Issue Tracker project. It acts as a **single source of truth** for development, testing, and evaluation.

---

## 1. User Roles

### 1.1 Citizen (Public User)

* Can report civic issues
* Can view reported issues
* Can track issue status using Issue ID

### 1.2 Admin (Municipality Authority)

* Can view all issues
* Can update issue status
* Can verify and close issues

---

## 2. FRONTEND FEATURES

### 2.1 User Interface (UI) Requirements

#### 2.1.1 Home Page

**Purpose:** Entry point for users

Features:

* Project introduction
* "Report an Issue" button
* "Track Issue" option
* List of recently reported issues

---

#### 2.1.2 Report Issue Page

**Purpose:** Allow users to submit civic issues

Features:

* Image upload (mandatory)
* Auto-fetch location (latitude & longitude)
* Manual address input (optional)
* Description text box
* Submit button

Validations:

* Image required
* Location permission prompt

---

#### 2.1.3 AI-based Issue Preview

**Purpose:** Show detected issue category

Features:

* Display detected issue type (Garbage / Road / Water / Other)
* Show confidence level
* Allow user to confirm before submission

---

#### 2.1.4 Submission Confirmation Page

**Purpose:** Acknowledge issue submission

Features:

* Display unique Issue ID
* Show detected category
* Show location on map
* Status: "Reported"

---

#### 2.1.5 Track Issue Page

**Purpose:** Allow users to track progress

Features:

* Input field for Issue ID
* Display issue status
* Timeline view (Reported → In Progress → Resolved)

---

#### 2.1.6 Public Issues Dashboard

**Purpose:** Transparency for all citizens

Features:

* List of all reported issues
* Filters by category, status, location
* Map view with issue markers

---

#### 2.1.7 Admin Dashboard

**Purpose:** Manage reported issues

Features:

* Secure login
* Table view of issues
* Update issue status
* Add admin remarks

---

## 3. BACKEND FEATURES

### 3.1 Authentication & Authorization

Features:

* Admin login using JWT
* Role-based access control
* Secure API routes

---

### 3.2 Issue Management APIs

#### 3.2.1 Create Issue API

Responsibilities:

* Receive image
* Store image in cloud/local storage
* Generate unique Issue ID
* Save issue data to database

---

#### 3.2.2 AI Issue Classification Service

Responsibilities:

* Accept uploaded image
* Analyze image using AI model
* Detect issue category
* Return classification result

---

#### 3.2.3 Location Processing Service

Responsibilities:

* Accept latitude & longitude
* Convert to readable address
* Store location data

---

#### 3.2.4 Fetch Issues API

Responsibilities:

* Fetch all issues
* Filter by category/status
* Pagination support

---

#### 3.2.5 Track Issue API

Responsibilities:

* Fetch issue by Issue ID
* Return current status
* Return timeline data

---

#### 3.2.6 Update Issue Status API (Admin)

Responsibilities:

* Change issue status
* Add admin remarks
* Log update time

---

### 3.3 Database Design

#### Issue Collection

Fields:

* issueId
* imageUrl
* category
* description
* location (lat, lng, address)
* status
* aiConfidence
* createdAt
* updatedAt

---

### 3.4 Transparency & Accountability Features

Features:

* Immutable issue ID
* Status change logs
* Public visibility of issues
* Admin action tracking

---

## 4. NON-FUNCTIONAL REQUIREMENTS

* Responsive UI
* Secure data handling
* Scalable backend
* Fast image processing
* High availability

---

## 5. FUTURE ENHANCEMENTS

* Mobile application
* AI severity prediction
* Citizen upvoting
* Government system integration
* Blockchain-based audit trail

---

## 6. CONCLUSION

This document outlines a complete feature-level breakdown of the Civic Issue Tracker system, ensuring clarity in development, accountability in implementation, and transparency for citizens.
