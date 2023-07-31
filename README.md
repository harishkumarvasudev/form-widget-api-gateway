# API Gateway

API Gateway is a Node.js web application that serves as a backend for a form widget Angular application. It provides APIs to manage widgets, forms, and user authentication.

## Getting Started

### Installation

1. Clone the repository:

2. Install the dependencies:

   ```bash
   npm install
   ```

### Configuration

1. Set up environment variables:

   - Create a `.env` file in the project root.
   - Copy the content from `.env.example` and replace the placeholders with your actual values.

2. Configure Firebase:

   - Create a Firebase project and obtain the necessary credentials (Firebase Type, Project ID, Private Key, Client Email, etc.).
   - Update the `.env` file with the Firebase credentials.

## Usage

To start the application, run:

```bash
npm start:dev
```

The application will be available at `http://localhost:9900`.

## API Endpoints

The application provides the following API endpoints:

- `/api/widget-config/:widgetId`: Fetches the configuration details of the widget with the specified ID.
- TODO: `/api/form/:formId`: Fetches the form details with the specified ID.
- TODO: `/api/create-widget`: Creates a new widget (Note: UI dashboard for widget creation to be implemented).
- `/api/save-form`: Saves form data.

## Authentication

The application uses JWT (JSON Web Token) for authentication. To access protected routes, include the JWT token in the `Authorization` header of the API request. The token is obtained after successful login.