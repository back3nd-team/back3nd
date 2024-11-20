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
    // Date types as strings with specific formats
    'date': { type: 'string', format: 'date', description: 'Date in the format YYYY-MM-DD' },
    'timestamp': { type: 'string', format: 'date-time', description: 'Date and time in the format YYYY-MM-DDTHH:MM:SS' },
    'timestamp without time zone': { type: 'string', format: 'date-time', description: 'Date and time in the format YYYY-MM-DDTHH:MM:SS' },
    'time': { type: 'string', format: 'time', description: 'Time in the format HH:MM:SS' },
    // JSON types as objects
    'json': { type: 'object' },
    'jsonb': { type: 'object' },
    // Geometry types as strings (fallback for simplicity)
    'point': { type: 'string' },
    'line': { type: 'string' },
    'polygon': { type: 'string' },
    // Binary data
    'bytea': { type: 'string', format: 'byte', description: 'Binary data encoded in Base64' },
  }

  // Default to string for unsupported types
  return swaggerTypeMap[normalizedFieldType] || { type: 'string' }
}
