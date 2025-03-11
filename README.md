# back3nd 🎉

Welcome to the **back3nd** project! This is a super cool project that helps you manage files and data easily. Let's dive in! 🚀

## How to Install Dependencies 📦

First, we need to install some important stuff to make everything work. Just run this command:

```bash
bun install
```

## How to Run the Project 🏃‍♂️

Now, let's start the project and see it in action! Run this command:

```bash
bun run main.ts
```
Now install the @better-auth/cli

```bash
bun add -g @better-auth/cli
```

Now enter the packages/api folder and run the following commands:
```
bunx @better-auth/cli generate
```

Time to seed your fresh database, running this following command in "/packages/api":
```
bun run src/scripts/seed.ts
```

## Environment Variables 🌍

To make everything work smoothly, we need to set up some environment variables. Create a `.env` file in the root directory and add the following variables:

```plaintext
BETTER_AUTH_URL=https://example.com/api/auth/
BETTER_AUTH_DATABASE=postgresql://username:password@hostname:5432/database
BETTER_AUTH_SECRET=your_secret_key
BACK3ND_ADMIN_USER=admin@example.com
BACK3ND_ADMIN_PASSWORD=your_admin_password
VITE_AUTH_API_URL=http://example.com/api/auth/
VITE_POSTGRES_API_URL=https://example.com/api/postgres
STORAGE_REGION=your-region
STORAGE_ENDPOINT=https://example.com/storage
STORAGE_ACCESS_KEY=your_access_key
STORAGE_SECRET_KEY=your_secret_key
STORAGE_BUCKET_NAME=your_bucket_name
```

These variables help us connect to the storage service and manage files. It's like giving our project the keys to the storage room! 🗝️

## What's Inside? 🧐

This project was created using `bun init` in bun v1.1 [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

### Special Features ✨

- **Better Auth**: This is a super cool tool that helps us authorize users to access PostgREST. It's like a security guard that makes sure only the right people can get in! 🛡️
- **File Management**: You can upload, list, and download files easily. It's like having your own personal cloud storage! ☁️
- **Swagger UI**: We use Swagger UI to make our API look nice and easy to use. It's like a map that shows you all the cool things you can do with our API! 🗺️

## How It Works 🔍

1. **Authorization**: We use `better-auth` to make sure only the right people can access our PostgREST. It's like having a secret password! 🔑
2. **File Service**: You can upload files, list them, and even download them. It's super easy and fun! 📂
3. **Swagger UI**: We use Swagger UI to show all the cool things you can do with our API. It's like a big menu of all the awesome features! 📜
4. **User Creation**: During the initial setup, a default admin user is created to manage the system. This user is given admin privileges to ensure proper access control.
5. **Role and Permissions**: A specific role called 'owner' is created and granted necessary permissions to interact with the database tables, ensuring secure and organized data management.

## Have Fun! 🎉

We hope you have a lot of fun using **back3nd**! If you have any questions, feel free to ask. Happy coding! 💻
