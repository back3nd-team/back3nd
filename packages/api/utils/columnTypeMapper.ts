// Map of UI types to PostgreSQL column types
const columnTypeMap: Record<string, string> = {
  'string': 'VARCHAR',
  'character varying': 'VARCHAR',
  'uuid': 'UUID',
  'integer': 'INTEGER',
  'big integer': 'BIGINT',
  'float': 'REAL',
  'double': 'DOUBLE PRECISION',
  'decimal': 'DECIMAL',
  'text': 'TEXT',
  'boolean': 'BOOLEAN',
  'date': 'DATE',
  'timestamp': 'TIMESTAMP',
  'timestamp without time zone': 'TIMESTAMP',
  'time': 'TIME',
  'json': 'JSON',
  'jsonb': 'JSONB',
  'point': 'POINT',
  'line': 'LINE',
  'polygon': 'POLYGON',
  'bytea': 'BYTEA',
}

export function mapFieldTypeToPostgreSQL(fieldType: string, size?: number | null): string {
  const normalizedFieldType = fieldType.trim().toLowerCase()
  let postgresType = columnTypeMap[normalizedFieldType] || 'VARCHAR'

  if (!postgresType) {
    throw new Error(`Unsupported field type: ${fieldType}`)
  }

  const typesWithoutSize = ['text', 'boolean', 'uuid', 'json', 'jsonb', 'date', 'timestamp', 'time']

  if (size && !typesWithoutSize.includes(normalizedFieldType)) {
    postgresType += `(${size})`
  }

  return postgresType
}

export function getDefaultValueClause(fieldType: string, defaultValue?: string | null): string {
  if (!defaultValue) {
    return ''
  }

  const normalizedFieldType = fieldType.trim().toLowerCase()

  if (normalizedFieldType === 'timestamp') {
    return `DEFAULT current_timestamp`
  }

  return `DEFAULT ${defaultValue}`
}

export function mapFieldTypeToSwagger(fieldType: string): { type: string, format?: string, description?: string } {
  const normalizedFieldType = fieldType.trim().toLowerCase()
  const swaggerTypeMap: Record<string, { type: string, format?: string, description?: string }> = {
    'varchar': { type: 'string' },
    'uuid': { type: 'string', format: 'uuid', description: 'Universally Unique Identifier' },
    'integer': { type: 'integer', format: 'int32' },
    'bigint': { type: 'integer', format: 'int64' },
    'real': { type: 'number', format: 'float' },
    'double precision': { type: 'number', format: 'double' },
    'decimal': { type: 'number' },
    'text': { type: 'string' },
    'boolean': { type: 'boolean' },
    'date': { type: 'string', format: 'date', description: 'Date in the format YYYY-MM-DD' },
    'timestamp': { type: 'string', format: 'date-time', description: 'Date and time in the format YYYY-MM-DDTHH:MM:SS' },
    'time': { type: 'string', format: 'time' },
    'json': { type: 'object' },
    'jsonb': { type: 'object' },
    'point': { type: 'string' },
    'line': { type: 'string' },
    'polygon': { type: 'string' },
    'bytea': { type: 'string', format: 'byte' },
  }

  return swaggerTypeMap[normalizedFieldType] || { type: 'string' }
}
