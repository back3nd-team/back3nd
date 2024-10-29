export interface Field {
  id?: string
  columnName: string
  columnType: 'String' | 'UUID' | 'Big Integer' | 'Integer' | 'Float' | 'Decimal' | 'Text'
  size?: number | null
  placeholder?: string
  defaultValue?: string
  entity_id: string
  created_at?: Date
}

export interface CreateCollectionData {
  collectionName: string
  primaryKeyField: string
  type: string
  roles: string[]
}
