# MFPaint Backend

## Description
This repository contains the backend implementation for the Project Name project. It consists of various controllers for handling different entities such as artists, artworks, blog posts, and users. The backend is built using Node.js, Express.js, and MongoDB, with Firebase used for storage and authentication.

## Table of Contents
- [Setup](#setup)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [Future Development](#future-development)

## Setup
To set up and run the backend locally, follow these steps:

1. **Clone the Repository:**
    ```bash
    git clone <repository_url>
    ```

2. **Install Dependencies:**
    ```bash
    cd project-name-backend
    npm install
    ```

3. **Set Environment Variables:**
    - Create a `.env` file in the root directory and add the following environment variables:
        ```plaintext
        PORT=3000
        MONGO_URI=<your_mongodb_connection_string>
        FIREBASE_API_KEY=<your_firebase_api_key>
        FIREBASE_AUTH_DOMAIN=<your_firebase_auth_domain>
        FIREBASE_PROJECT_ID=<your_firebase_project_id>
        FIREBASE_STORAGE_BUCKET=<your_firebase_storage_bucket>
        FIREBASE_MESSAGING_SENDER_ID=<your_firebase_messaging_sender_id>
        FIREBASE_APP_ID=<your_firebase_app_id>
        ```

4. **Start the Server:**
    ```bash
    npm start
    ```
    The server will start running on http://localhost:3000 by default.

## Project Structure
- `config/`: Contains configuration files for MongoDB and Firebase.
- `controllers/`: Controllers for handling various entities (artists, artworks, blog posts, users).
- `middleware/`: Middleware functions, including authentication middleware.
- `models/`: MongoDB schema models for different entities.
- `routes/`: API routes for different entities and user authentication.
- `serviceAccount.json`: Firebase service account credentials.
- `index.js`: Main entry point for the application.
- `package.json`: Contains project metadata and dependencies.

## API Documentation
The backend exposes the following API endpoints:

### Artwork Routes:
- `GET /artworks`: Retrieve all artworks.
- `GET /artwork/:id`: Retrieve artwork by ID.
- `POST /createartwork`: Create a new artwork.
- `PATCH /updateartwork/:id`: Update artwork by ID.
- `DELETE /deleteartwork/:id`: Delete artwork by ID.

### Artist Routes:
Similar routes for artists.

### Blog Routes:
Similar routes for blog posts.

### User Routes:
Similar routes for users.

## Contributing
If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Commit your changes (`git commit -am 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Create a new Pull Request.

## Future Development
I plan to continue developing this project and implementing the following features soon:

- **Better Styling:** Enhance the visual appeal and user experience of the website through improved styling using CSS frameworks like Bootstrap or Materialize CSS.
- **Cross-Referencing Artists with Their Artworks:** Create a relational database to associate each artwork with its respective artist, enabling seamless navigation and exploration of artists' portfolios.
- **User Comments on Blog Posts:** Introduce a commenting system where users can engage with blog posts by leaving comments, fostering community interaction and feedback.
- **Sorting Artworks and Artists:** Implement sorting functionality for artworks and artists based on various criteria such as size, price, year, alphabetical order, or recent uploads, providing users with customizable browsing options.
- **Video Attachment for Digital Artworks:** Allow artists to upload video attachments along with their digital artworks, enriching the presentation and showcasing dynamic aspects of their creations.
- **Different View Modes:** Offer users the flexibility to switch between different view modes (e.g., horizontal, cards, large) for browsing artworks and blog posts, catering to diverse preferences and viewing experiences.

Stay tuned for updates as I work on integrating these features into the project!