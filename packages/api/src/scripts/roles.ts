import { authConfig } from '../lib/auth'

async function createRole() {
  try {
    console.log('Creating role and assigning permissions...')

    // Connect to the database using the existing pool from authConfig
    const client = await authConfig.database.connect()
    try {
      // Step 1: Create the 'owner' role if it does not already exist
      const createRoleQuery = `
        DO $$
        BEGIN
            IF NOT EXISTS (
                SELECT 1 
                FROM pg_roles 
                WHERE rolname = 'owner'
            ) THEN
                CREATE ROLE owner;
            END IF;
        END
        $$;
      `
      await client.query(createRoleQuery)
      console.log('Role \'owner\' created (if it didn\'t already exist).')

      // Step 2: Grant SELECT, INSERT, and UPDATE permissions to all tables that don't start with '_'
      const grantPermissionsQuery = `
        DO $$
        DECLARE
            table_name text;
        BEGIN
            FOR table_name IN
                SELECT tablename
                FROM pg_tables
                WHERE schemaname = 'public'
                  AND tablename NOT LIKE '\\_%' ESCAPE '\\'
            LOOP
                EXECUTE format('GRANT SELECT, INSERT, UPDATE ON TABLE public.%I TO owner;', table_name);
            END LOOP;
        END
        $$;
      `
      await client.query(grantPermissionsQuery)
      console.log('Permissions granted to role \'owner\' for eligible tables.')
    }
    finally {
      // Release the database client back to the pool
      client.release()
    }
  }
  catch (error) {
    console.error('Error during role creation and permission assignment:', error)
  }
  finally {
    // Close the database pool to release resources
    await authConfig.database.end()
    console.log('Database connection closed.')
  }
}

// Execute the role creation process
createRole().catch((err) => {
  console.error('Unexpected error:', err)
})
