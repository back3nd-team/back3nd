/**
 * @file seedRoles.ts
 * @description Seeds the initial roles (Admin, Comum, Public) into the database.
 * Each role is inserted using an upsert strategy to avoid duplication.
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Function to seed roles into the database.
 */
export async function seedRoles() {
    const roles = [
        {
            name: "Admin",
            description: "Administrator with full access to all tables",
        },
        { name: "Comum", description: "Common user with limited access" },
        {
            name: "Public",
            description: "Public user with read-only access to public tables",
        },
    ];

    // Upsert each role into the database
    for (const role of roles) {
        await prisma.back3nd_role.upsert({
            where: { name: role.name },
            update: {},
            create: role,
        });
    }
}
