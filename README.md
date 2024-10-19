# Back3nd: The third-party boost your project needs.

Back3nd is designed to combine robust backend architecture with the flexibility of third-party integrations. The "3" in the name is a nod to the essential role of third-party services in modern systems.

## Features

- **Third-party Integrations**: Effortless integration with external services and APIs.
- **Prisma ORM**: Simplified database management with automatic type generation and migrations.
- **Nuxt Frontend**: Powered by Nuxt, offering SSR, SEO optimizations, and a highly responsive UI.
- **Hono API**: Lightweight and performant API handling, capable of scaling efficiently.
- **Bun**: High-performance runtime and package manager, optimized for speed and developer experience.
- **Permission Management**: Fine-grained access control through user roles and permissions.

## Project Structure

This project is organized as a monorepo using Bun Workspaces, allowing seamless management of multiple packages within the same repository.

### Bun Workspaces

The project uses **Bun Workspaces** to manage multiple packages within the same repository, enabling efficient code sharing and dependency management for both frontend and backend.

### Directory Layout

- **`/packages/api`**: The API package, built with Hono, responsible for backend logic and Prisma integration.
- **`/packages/studio`**: The frontend package, powered by Nuxt, handling the user interface and interactions.
- **`/prisma`**: Contains the Prisma schema shared across the entire project, managing database models and migrations.

### Key Features

- **Backend (API)**:
  - Handles authentication, permission checks, and data retrieval using Hono.
  - Integrated with Prisma for managing users, roles, and permissions.

- **Frontend (Studio)**:
  - Built with Nuxt and Pinia for state management and UI interactions.
  - Consumes the backend API, handling user authentication and data visualization.

## Features Implemented

- **JWT Authentication**: Routes for user registration (signup) and login, with JWT token generation.
- **Access Control**: Authorization middleware based on roles and permissions.
- **Data Seeding**: Scripts to populate the database with initial users and roles.
- **Prisma Configuration**: Database schema and migrations configured using Prisma ORM.

## Features to Implement

- **Data Studio**: Administrative panel with Nuxt 4 for managing users, roles, and permissions.
- **File Upload and Management**: Routes for uploading and downloading files, with an interface in the Data Studio.
- **Email System**: Setup for sending email notifications and password recovery.
- **Dynamic APIs**: Automatic CRUD APIs for each table configured in Prisma.

## Environment Setup

### Prerequisites

- **Bun v1.1.30**
- **Docker and Docker Compose**
- **PostgreSQL** (can be initiated via Docker)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/back3nd-team/back3nd.git
   cd back3nd
   ```
2. Configure environment variables:
   - Copy the `.env.sample` file to `.env`:

     ```bash
     cp .env.sample .env
     ```
   - Fill in the `.env` file with the necessary configuration (passwords, API keys, etc.).

3. Start PostgreSQL with Docker Compose:
   ```bash
   docker-compose up -d
   ```

4. Install the dependencies with Bun:
   ```bash
   bun install
   ```

5. Run Prisma migrations:
   ```bash
   bun prisma:migrate:dev
   ```

6. Seed the database with initial data:
   ```bash
   bun prisma:seed
   ```

## Running the Project

To start the development server:
```bash
bun api
```

Open [http://localhost:3737](http://localhost:3737) in your browser.

### Password Setup

To set specific passwords for the initial users, configure the following environment variables in the `.env` file:

- `BACK3ND_ADMIN_PASSWORD`
- `BACK3ND_USER_PASSWORD`
- `BACK3ND_PUBLIC_PASSWORD`

If these variables are not defined, random passwords will be generated and logged to the console. Be sure to note these passwords for later use.

## Available Scripts

- `bun run api`: Starts the API server.
- `bun run lint`: Runs the linter.
- `bun run lint:fix`: Automatically fixes linter issues.
- `bun run prisma:generate`: Generates the Prisma client.
- `bun run prisma:migrate:dev`: Runs migrations in the development environment.
- `bun run prisma:migrate:prod`: Runs migrations in the production environment.
- `bun run prisma:studio`: Opens Prisma Studio.
- `bun run prisma:push`: Syncs the Prisma schema with the database.
- `bun run prisma:reset`: Resets the database.
- `bun run prisma:seed`: Seeds the database with initial data.

## License

This project is open-source and licensed under the MIT License. See the LICENSE file for details.

## Links

- [Project repository on GitHub](https://github.com/back3nd-team/back3nd)
