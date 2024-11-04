import type { OpenAPIHono } from '@hono/zod-openapi'
import { PrismaClient } from '@prisma/client'
import { mapFieldTypeToSwagger } from '../utils/columnTypeMapper'

const prisma = new PrismaClient()

export async function generateOpenAPISpec() {
  const entities = await prisma.back3nd_entity.findMany()

  const entityFields = await prisma.back3nd_entity_fields.findMany()

  const paths: Record<string, any> = {}
  const schemas: Record<string, any> = {}

  entities.forEach((entity) => {
    const entityName = entity.name
    const entityFieldsForModel = entityFields.filter(
      field => field.entity_id === entity.id,
    )

    schemas[entityName] = {
      type: 'object',
      properties: entityFieldsForModel.reduce((acc: Record<string, any>, field) => {
        const swaggerType = mapFieldTypeToSwagger(field.columnType)
        acc[field.columnName] = {
          type: swaggerType.type,
          format: swaggerType.format,
          description:
            swaggerType.description
            || (field.isUnique ? 'This field is unique' : undefined),
          unique: field.isUnique || undefined,
        }
        return acc
      }, {}),
    }

    const pathName = `/items/${entityName.toLowerCase()}`

    paths[pathName] = {
      get: {
        summary: `Retrieve all ${entityName} items`,
        security: [{ BearerAuth: [] }],
        responses: {
          200: {
            description: `List of ${entityName} items`,
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: `#/components/schemas/${entityName}` },
                },
              },
            },
          },
          401: { $ref: '#/components/responses/UnauthorizedError' },
        },
      },
      post: {
        summary: `Create a new ${entityName} item`,
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: `#/components/schemas/${entityName}` },
            },
          },
        },
        responses: {
          201: {
            description: `${entityName} item created`,
            content: {
              'application/json': {
                schema: { $ref: `#/components/schemas/${entityName}` },
              },
            },
          },
          401: { $ref: '#/components/responses/UnauthorizedError' },
        },
      },
    }

    paths[`${pathName}/{id}`] = {
      put: {
        summary: `Update an existing ${entityName} item`,
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: `#/components/schemas/${entityName}` },
            },
          },
        },
        responses: {
          200: {
            description: `${entityName} item updated`,
            content: {
              'application/json': {
                schema: { $ref: `#/components/schemas/${entityName}` },
              },
            },
          },
          401: { $ref: '#/components/responses/UnauthorizedError' },
        },
      },
      delete: {
        summary: `Delete an existing ${entityName} item`,
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          204: {
            description: `${entityName} item deleted`,
          },
          401: { $ref: '#/components/responses/UnauthorizedError' },
        },
      },
    }
  })

  const openAPISpec = {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
    },
    paths,
    components: {
      schemas,
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      responses: {
        UnauthorizedError: {
          description: 'Access token is missing or invalid',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'Unauthorized',
                  },
                },
              },
            },
          },
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  }

  return openAPISpec
}
