import { auth, authConfig } from '../lib/auth'

async function seedDatabase() {
  try {
    console.log('Seeding database...')

    const ADMIN_EMAIL = import.meta.env.BACK3ND_ADMIN_USER || 'user@back3nd.com'
    const ADMIN_PASSWORD = import.meta.env.BACK3ND_ADMIN_PASSWORD || 'adminFakePassword123'

    const client = await authConfig.database.connect() // Reusing the pool from authConfig
    try {
      // Check if a user already exists
      const checkUserQuery = `
        SELECT COUNT(*) FROM public."user";
      `
      const res = await client.query(checkUserQuery)
      const userCount = Number.parseInt(res.rows[0].count, 10)

      if (userCount > 0) {
        console.log('User already exists. Skipping user creation.')
      }
      else {
        // Create the first user using better-auth
        const newUser = await auth.api.signUpEmail({
          body: {
            email: ADMIN_EMAIL,
            password: ADMIN_PASSWORD,
            name: 'Back3nd Admin',
          },
        })

        console.log('User created:', newUser)

        // Promote the user to admin
        const updateQuery = `
          UPDATE public."user"
          SET role = 'admin'
          WHERE email = $1;
        `
        const values = [ADMIN_EMAIL]

        await client.query(updateQuery, values)

        console.log(`User with email ${ADMIN_EMAIL} promoted to admin.`)
      }
    }
    finally {
      client.release()
    }
  }
  catch (error) {
    console.error('Error during database seeding:', error)
  }
  finally {
    await authConfig.database.end() // Close the pool to release resources
  }
}

seedDatabase().catch((err) => {
  console.error('Unexpected error:', err)
})
