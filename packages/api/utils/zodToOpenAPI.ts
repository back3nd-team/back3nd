import { z } from 'zod'

export function zodToOpenAPISchema(zodSchema: any): any {
  if (zodSchema instanceof z.ZodObject) {
    const properties: any = {}
    const required: string[] = []
    for (const [key, value] of Object.entries(zodSchema.shape)) {
      properties[key] = zodToOpenAPISchema(value)
      if (!value.isOptional()) {
        required.push(key)
      }
    }
    return { type: 'object', properties, required }
  }
  else if (zodSchema instanceof z.ZodString) {
    return { type: 'string' }
  }
  else if (zodSchema instanceof z.ZodNumber) {
    return { type: 'number' }
  }
  else if (zodSchema instanceof z.ZodEnum) {
    return { type: 'string', enum: zodSchema.options }
  }
  return {}
}
