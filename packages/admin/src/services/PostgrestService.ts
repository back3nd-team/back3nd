import { PostgrestClient } from '@supabase/postgrest-js'
import { fetch as crossFetch } from 'cross-fetch'
import extractBaseUrl from '../utils/extractBaseUrl'
import { AuthService } from './AuthService'

export class PostgrestService {
  private client: PostgrestClient | undefined
  private authService: AuthService
  private postgrestUrl = import.meta.env.VITE_POSTGRES_API_URL

  constructor() {
    this.authService = new AuthService()
    this.initializeClient().catch(console.error)
  }

  /**
   * 1. Get the token from the authentication service
   * 2. Initialize the Postgrest client with the token
   * 3. Get the token from postgrest
   */
  private async initializeClient() {
    try {
      const { data } = await this.authService.getSession()
      const token = data?.session?.token
      if (!token) {
        throw new Error('Token is missing')
      }

      const bearerToken = await this.fetchToken()
      this.client = new PostgrestClient(this.postgrestUrl, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
        fetch: crossFetch,
      })
    }
    catch (error) {
      console.error('Error initializing client:', error)
    }
  }

  private async ensureClientInitialized(): Promise<void> {
    if (!this.client) {
      await this.initializeClient()
      if (!this.client) {
        throw new Error('Postgrest client is not initialized after initialization attempt')
      }
    }
  }

  /**
   * Fetches the token from the authentication service.
   * @returns A promise resolving to the token string.
   */
  async fetchToken(): Promise<string> {
    const apiHono = import.meta.env.VITE_AUTH_API_URL
    const baseUrl = extractBaseUrl(apiHono)

    const response = await fetch(`${baseUrl}/postgrest/token`, {
      method: 'POST',
      credentials: 'include',
    })

    if (!response.ok) {
      throw new Error('Failed to fetch token')
    }

    const data = await response.json()
    return data.token
  }

  /**
   * Queries any table with optional filters.
   * @param tableName Name of the table to be queried.
   * @param filters Optional filters in the format `{ column: value }`.
   * @param columns Columns to be selected, separated by commas.
   * @returns The filtered table data.
   */
  async queryTable<T>(tableName: string, filters: Record<string, any> = {}, columns: string = '*'): Promise<T[]> {
    await this.ensureClientInitialized()

    const query = this.client!.from(tableName).select(columns)

    Object.entries(filters).forEach(([key, value]) => {
      query.eq(key, value)
    })

    const { data, error } = await query
    if (error)
      throw new Error(`Error querying table "${tableName}": ${error.message}`)

    return (data as T[]) || []
  }

  /**
   * Fetches the OpenAPI schema from the PostgREST endpoint.
   * @returns The OpenAPI schema as a JSON object.
   */
  async fetchOpenAPISchema(): Promise<any> {
    await this.ensureClientInitialized()

    const response = await fetch(`${this.postgrestUrl}`, {
      headers: {
        Authorization: `Bearer ${(await this.fetchToken())}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch OpenAPI schema: ${response.statusText}`)
    }

    return response.json()
  }

  /**
   * Lists the columns of a specific table.
   * @param tableName Name of the table whose columns will be listed.
   * @returns List of columns with details.
   */
  async listColumns(tableName: string): Promise<{ column_name: string, data_type: string, is_nullable: string }[]> {
    await this.ensureClientInitialized()
    const { data, error } = await this.client!
      .from('information_schema.columns')
      .select('column_name, data_type, is_nullable')
      .eq('table_name', tableName)

    if (error)
      throw new Error(`Error listing columns for table "${tableName}": ${error.message}`)

    return data || []
  }
}
