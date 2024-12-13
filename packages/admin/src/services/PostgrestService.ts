import { PostgrestClient } from '@supabase/postgrest-js'
import { AuthService } from './AuthService'

export class PostgrestService {
  private client: PostgrestClient
  private authService: AuthService

  constructor() {
    this.authService = new AuthService()
    this.initializeClient()
  }

  private async initializeClient() {
    const token = await this.authService.getSession()
    console.log('token', token)
    const restUrl = import.meta.env.VITE_POSTGRES_API_URL
    this.client = new PostgrestClient(restUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }

  /**
   * Fetches the token from the authentication service.
   * @returns A promise resolving to the token string.
   */
  static async fetchToken(): Promise<string> {
    const response = await fetch('http://localhost:3737/postgrest/token', {
      method: 'POST',
      headers: {
        'x-tenant-id': 'hermes',
        'Cookie': 'better-auth.session_token=3b7JmJJcVDlJ0J3FINRHTML6KeZlsS9-.yFcsTilRQopX0pc2nokNgGsHvdeVdanm0JlGHPv2f0c%3D'
      }
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
    const query = this.client.from<T>(tableName).select(columns)

    // Applies filters dynamically
    Object.entries(filters).forEach(([key, value]) => {
      query.eq(key, value)
    })

    const { data, error } = await query
    if (error) throw new Error(`Error querying table "${tableName}": ${error.message}`)

    return data || []
  }

  /**
   * Lists all available tables in the database.
   * @returns List of tables in the `public` schema.
   */
  async listTables(): Promise<{ table_name: string; table_schema: string }[]> {
    const { data, error } = await this.client
      .from('information_schema.tables')
      .select('table_name, table_schema')
      .eq('table_schema', 'public')

    if (error) throw new Error(`Error listing tables: ${error.message}`)

    return data || []
  }

  /**
   * Lists the columns of a specific table.
   * @param tableName Name of the table whose columns will be listed.
   * @returns List of columns with details.
   */
  async listColumns(tableName: string): Promise<{ column_name: string; data_type: string; is_nullable: string }[]> {
    const { data, error } = await this.client
      .from('information_schema.columns')
      .select('column_name, data_type, is_nullable')
      .eq('table_name', tableName)

    if (error) throw new Error(`Error listing columns for table "${tableName}": ${error.message}`)

    return data || []
  }
}
