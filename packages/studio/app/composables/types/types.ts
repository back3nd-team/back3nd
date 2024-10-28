export interface Field {
  key: string
  type: 'String' | 'UUID' | 'Big Integer' | 'Integer' | 'Float' | 'Decimal' | 'Text'
  defaultValue: string
  required: boolean
  placeholder?: string
}

export interface CreateCollectionData {
  collectionName: string
  primaryKeyField: string
  type: string
  roles: string[]
}
