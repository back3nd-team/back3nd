# Back3nd

"back3nd" is a modular backend inspired by Directus, using **Bun v1.1.30**, **PostgreSQL**, and **Prisma ORM** for data management. The project includes an administrative panel (Data Studio) built with **Nuxt 4**, which enables dynamic API creation, JWT-based access control, user and permission management, and file upload features.

## Technologies Used

- **Bun v1.1.30**: Development platform for the backend.
- **Nuxt 4**: Vue framework for the frontend, used in the Data Studio.
- **PostgreSQL**: Relational database.
- **Prisma ORM**: Schema management and database operations.
- **JWT (JSON Web Token)**: Authentication and access control.
- **SMTP or Email API**: For sending automated emails.

## How the Project Works

### Hono

**Hono** is a minimalist framework used to build fast and efficient APIs. It is used in this project to manage routes and authentication middleware.

### Project Structure

```plaintext
back3nd/
├── api/
│   ├── controllers/
│   │   └── authController.ts
│   ├── middleware/
│   │   └── authMiddleware.ts
│   ├── routes/
│   │   └── authRoutes.ts
│   ├── services/
│   │   └── authService.ts
│   └── main.ts
├── prisma/
│   ├── data/
│   │   ├── seedRoles.ts
│   │   └── seedUsers.ts
│   ├── migrations/
│   │   └── 20241016112856_init/
│   │       └── migration.sql
│   └── schema.prisma
├── .env.sample
├── package.json
└── README.md
```

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
