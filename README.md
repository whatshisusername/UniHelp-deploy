# Unihelp

Unihelp is a web application designed to simplify the process of obtaining semester mark sheets. The application serves two main users: students and the exam department. It aims to make the mark sheet management process more efficient, especially for students who cannot physically visit the exam department.

## Features

### For Students
#### **Profile Management**
- Create an account, log in, and update profile details.
- Upload and update profile picture.

#### **Marksheet Request**
- Apply for mark sheets for previous semesters.
- View and download the requested mark sheets once verified by the exam department.
- Receive notifications when a requested mark sheet is sent by the exam department.

### For Exam Department
#### **Profile Management**
- Create an account, log in, and update profile details.

#### **Marksheet Verification**
- View a list of applications requesting mark sheets.
- Click on a request to view applicant details, previously sent mark sheets, and verify the new request.
- After verifying, upload the requested mark sheet and send it to the student.

---

## Tech Stack

- **Frontend**: `React.js`
- **Backend**: `Express.js`
- **Database**: `MongoDB`
- **Authentication**: `JWT (JSON Web Tokens)`
  - Access and refresh tokens for secure authentication and session management.
- **Encryption**: `bcrypt` for password encryption.
- **File Handling**:
  - `Multer` for handling file uploads.
  - `Cloudinary` for secure cloud storage of files.
- **Session Management**:
  - Persistent login using `securelocalstorage` to keep users logged in across browser tabs and sessions.
- **Notifications**:
  - Notifications for students when mark sheets are sent by the exam department.
  
---

## Key Practices and Implementation Details

1. **Authentication and Authorization**
   - Implemented JWT for user authentication and role-based access control.
   - Passwords are encrypted using `bcrypt` for enhanced security.
   - Secure tokens are stored in `securelocalstorage` to maintain user sessions.

2. **File Handling**
   - Files are uploaded from the frontend, processed by `multer` in the backend, and temporarily stored.
   - Files are then uploaded to Cloudinary, and the local files are deleted after successful upload.

3. **Environment Variables**
   - Sensitive information (e.g., database credentials, API keys) is stored in an `.env` file for security.

4. **Scalable Backend Architecture**
   - Codebase is organized with controllers, models, routes, and middlewares for better maintainability.

5. **Session Management**
   - Used JWT with access tokens and refresh tokens instead of session IDs for improved performance and session security.
   - `securelocalstorage` ensures persistent user login without compromising security.

---


## Screenshots

### Homepage
![uhome](https://github.com/user-attachments/assets/6f2ef5b9-2b36-41d2-8f2c-d0d0fe010661)
 

### Profile Management
<img src="https://github.com/user-attachments/assets/7323b7f4-d6fc-4701-a943-d43f8790e57d" widhth="250" height="250">
<img src="https://github.com/user-attachments/assets/1dc9a345-6f50-46ee-a189-700ca1974713" widhth="250" height="250">
<img src="https://github.com/user-attachments/assets/2b54f4dd-ed41-4c61-a02e-7d3545031b0b" widhth="250" height="250">
<img src="https://github.com/user-attachments/assets/e5b67448-daf8-403d-a956-4f87187867f2" widhth="250" height="250">
<img src="https://github.com/user-attachments/assets/be8796ad-fa53-4236-8594-29b372358259" widhth="250" height="250">
<!--![login ](https://github.com/user-attachments/assets/8e8b346f-534d-47a4-bcb1-b3eb2e9e90a2) -->
<!-- ![ssign](https://github.com/user-attachments/assets/1c2397be-c2b5-4699-a667-8d76287d7263) -->
<!-- ![tsign](https://github.com/user-attachments/assets/7fa49e47-59aa-4c1a-a664-350a3892e5e1) -->
<!-- ![profile](https://github.com/user-attachments/assets/e5b67448-daf8-403d-a956-4f87187867f2) -->
<!-- ![pp](https://github.com/user-attachments/assets/5ab76848-d4c5-47c6-b1a7-4e84410c99ee) -->
<!-- ![signupu](https://github.com/user-attachments/assets/1dc9a345-6f50-46ee-a189-700ca1974713) -->
<!-- ![loginu](https://github.com/user-attachments/assets/7323b7f4-d6fc-4701-a943-d43f8790e57d) -->
<!-- ![ssignu](https://github.com/user-attachments/assets/2b54f4dd-ed41-4c61-a02e-7d3545031b0b) -->
<!-- ![updateu](https://github.com/user-attachments/assets/be8796ad-fa53-4236-8594-29b372358259) -->

### Marksheet Request  
<img src="https://github.com/user-attachments/assets/f9007655-1abe-4867-8e97-6f0176537d07" widhth="1000" height="250">
<img src="https://github.com/user-attachments/assets/96d3a538-6c99-4d2d-9e45-d3cb53f01737" widhth="1000" height="250">
<!-- <img src="https://github.com/user-attachments/assets/8fe37b46-51c4-44d7-a76b-a3a5716bfc3d" widhth="250" height="250"> -->
<!-- <img src="https://github.com/user-attachments/assets/3a4fe68b-e871-4c90-86b9-1039753c18ba" widhth="250" height="250"> -->
<!-- <img src="https://github.com/user-attachments/assets/9f003a58-26ec-4e48-aa3b-8929a3187ec7" widhth="250" height="250"> -->
<!-- ![mycourses](https://github.com/user-attachments/assets/577fe14c-8343-461a-b453-8cb453f2c35b) -->
<!-- ![course](https://github.com/user-attachments/assets/4202d8ca-c084-4ff5-ae52-2196c0834a0b) -->
<!-- ![coursepage'](https://github.com/user-attachments/assets/8fe37b46-51c4-44d7-a76b-a3a5716bfc3d) -->
<!-- ![addcourse](https://github.com/user-attachments/assets/3a4fe68b-e871-4c90-86b9-1039753c18ba) -->
<!-- ![tcpage](https://github.com/user-attachments/assets/9f003a58-26ec-4e48-aa3b-8929a3187ec7) -->
<!-- ![marksheet](https://github.com/user-attachments/assets/f9007655-1abe-4867-8e97-6f0176537d07) -->
<!-- ![notiu](https://github.com/user-attachments/assets/96d3a538-6c99-4d2d-9e45-d3cb53f01737) -->


### Exam Department Dashboard 
![marksheetuploadexam](https://github.com/user-attachments/assets/7966e265-ff13-44b8-abf2-0d07ce9678be)
![applications](https://github.com/user-attachments/assets/366a4969-aca7-4b92-8435-ce020c451cd0)
![notiuexam](https://github.com/user-attachments/assets/454baa16-5c47-48c6-8049-3db0e04e8f5c)


<!--### Hall Ticket-->
<!--![hallticketpdf](https://github.com/user-attachments/assets/3cd254c3-358e-4c38-b713-b4400efb9927)-->
<!--![hallticket](https://github.com/user-attachments/assets/fa95979e-7629-4a3a-9b76-cc32ed790003)-->


---

## Deployed Web App

Visit the live application here(open with Microsoft Edge.): [Unihelp Web App](https://college-help-deploy.vercel.app/)

---
