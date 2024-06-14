
# Actionable Vercel

**Deploy your projects seamlessly.**

Actionable Vercel is a platform designed to simplify and accelerate web application deployment by integrating both frontend and backend components for a seamless user experience.

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- **AWS SDK S3 Integration:** Securely uploads project files to Cloudflare R2 for storage.
- **Queue Management:** Sends real-time deployment updates via Redis, ensuring users and services stay informed.
- **GitHub Integration:** Clones and prepares projects for deployment using `simple-git`.
- **Express Request Handlers:** Handles user requests and serves deployed projects dynamically.
- **Responsive Frontend Interface:** Built with React for an intuitive user experience.
- **Real-time Feedback:** Provides instant updates on deployment progress.

## Technology Stack

- **Backend:** Node.js, Express.js, AWS SDK S3, Redis
- **Frontend:** React.js, Axios

## Installation

### Prerequisites

- Node.js
- Redis
- AWS Account with Cloudflare R2 configuration
- redis

### Steps

1. Clone the repository:
   ```sh
   git clone https://github.com/rakeshkanneeswaranofficial/actionabel_vercel
   cd actionabel_vercel
   ```

2. Install dependencies for each service:

   - **Upload Service:**
     ```sh
     cd uploadService
     npm install
     cd ..
     ```

   - **Deploy Service:**
     ```sh
     cd deployService
     npm install
     cd ..
     ```

   - **Request Handlers:**
     ```sh
     cd requestHandlers
     npm install
     cd ..
     ```

   - **Frontend:**
     ```sh
     cd frontend
     npm install
     cd ..
     ```

3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the required environment variables as per the `.env.example` file.

## Usage

1. Start the backend services:
   - **Upload Service:**
     ```sh
     cd uploadService
     node dist/index.js
     cd ..
     ```

   - **Deploy Service:**
     ```sh
     cd deployService
     node dist/index.js
     cd ..
     ```

   - **Request Handlers:**
     ```sh
     cd requestHandlers
     node dist/index.js
     cd ..
     ```

2. Start the frontend service:
   ```sh
   cd frontend
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000` to access the frontend interface.

4. Input your GitHub repository URL and follow the prompts to deploy your project.

## Project Structure

- `root/`
  - `uploadService/` - Handles file uploads to Cloudflare R2.
  - `deployService/` - Manages project cloning and deployment.
  - `requestHandlers/` - Manages incoming requests and serves deployed content.
  - `frontend/` - React-based user interface for initiating and monitoring deployments.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue to discuss your ideas.

## License

This project is licensed under the MIT License.

---

Feel free to adjust the instructions or add more details as needed.