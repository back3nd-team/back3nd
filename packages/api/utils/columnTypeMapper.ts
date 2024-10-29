// Map of UI types to PostgreSQL column types
const columnTypeMap: Record<string, string> = {
  'string': 'VARCHAR',
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
  let postgresType = columnTypeMap[normalizedFieldType]

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
