// Function to handle changes in the column type and set the default value accordingly
export function handleColumnTypeChange(columnType: string): string | null {
  switch (columnType) {
    case 'String':
    case 'Text':
      return '' // Default value for strings or text
    case 'UUID':
      return 'gen_random_uuid()' // Default value for UUID
    case 'Integer':
    case 'Big Integer':
      return '0' // Default value for integers
    case 'Float':
    case 'Double':
    case 'Decimal':
      return '0.0' // Default value for decimals
    case 'Boolean':
      return 'false' // Default value for boolean
    case 'Date':
      return 'current_date' // Default for date fields
    case 'Timestamp':
      return 'current_timestamp' // Default for timestamp fields
    case 'Time':
      return 'current_time' // Default for time fields
    case 'JSON':
    case 'JSONB':
      return '\'{}\'' // Empty JSON object
    case 'Point':
    case 'Line':
    case 'Polygon':
      return null // No default for geometric fields
    case 'Bytea':
      return '\'\'' // Empty binary data
    default:
      return '' // Empty default for unrecognized types
  }
}
