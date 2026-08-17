# Internship Management Module

A full-stack Internship Management Module developed for the **Inquisitor
Learning Platform**.

The module allows students to browse and apply for internship
opportunities, while teachers can review applications, select or reject
applicants, and provide feedback.

## Features

### Internship Page

-   View available internships
-   Search internships
-   Filter internships by company
-   View internship details
-   Apply for internships
-   Display internship status
-   Display title, company, duration, and deadline
-   Dynamic internship data from backend

### Application Management

-   Students can submit internship applications
-   Prevents duplicate applications
-   Teachers can view applicants
-   Select applicants
-   Reject applicants
-   Provide feedback
-   Application status management

## Technologies Used

-   Frontend: HTML5, CSS3, JavaScript
-   Backend: Node.js, Express.js
-   Database: MongoDB, MongoDB Atlas, Mongoose
-   Development & Testing: Visual Studio Code, Postman, Git, GitHub

## Internship API

-   `GET /api/internships` --- Get all internships
-   `GET /api/internships/:id` --- Get internship details

## Application API

-   `POST /api/applications` --- Submit an application
-   `GET /api/applications/internship/:internshipId` --- Get
    applications for an internship
-   `PUT /api/applications/:applicationId/evaluate` --- Evaluate an
    application

## Installation

``` bash
git clone <repository-url>
cd Internship-module
npm install
node server.js
```

Create a `.env` file with the required MongoDB connection configuration
before starting the server.

The backend runs on `http://localhost:5000`.

## Testing

The API endpoints were tested using Postman, including internship
retrieval, individual internship details, application submission,
duplicate application validation, applicant retrieval,
selection/rejection, feedback, and MongoDB integration.

## Security

Sensitive environment variables and database credentials are stored in
the `.env` file. The `.env` file should never be committed to GitHub and
should remain included in `.gitignore`.

## Project Status

The Internship Management functionality is implemented and integrated
with the backend and MongoDB database.

## Author

**Taha Ahmad**\
BSc Cyber Security\
University of Engineering and Technology (UET), Lahore
