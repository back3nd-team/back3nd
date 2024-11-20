import { mapFieldTypeToSwagger } from '../utils/columnTypeMapper'
import { getColumns, getTables } from '../utils/informationSchemaUtils'

export async function generateOpenAPISpec() {
  const tables = await getTables()
  const paths: Record<string, any> = {}
  const schemas: Record<string, any> = {}

  for (const tableName of tables) {
    const columns = await getColumns(tableName)
    schemas[tableName] = {
      type: 'object',
      properties: columns.reduce((acc: Record<string, any>, column) => {
        const swaggerType = mapFieldTypeToSwagger(column.columnType)
        acc[column.columnName] = {
          type: swaggerType.type,
          format: swaggerType.format,
          description: swaggerType.description,
        }
        return acc
      }, {}),
    }

    const pathName = `/items/${tableName.toLowerCase()}`
    paths[pathName] = {
      get: {
        summary: `Retrieve all ${tableName} items`,
        security: [{ BearerAuth: [] }],
        responses: {
          200: {
            description: `List of ${tableName} items`,
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: `#/components/schemas/${tableName}` },
                },
              },
            },
          },
          401: { $ref: '#/components/responses/UnauthorizedError' },
        },
      },
      post: {
        summary: `Create a new ${tableName} item`,
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: `#/components/schemas/${tableName}` },
            },
          },
        },
        responses: {
          201: {
            description: `${tableName} item created`,
            content: {
              'application/json': {
                schema: { $ref: `#/components/schemas/${tableName}` },
              },
            },
          },
          401: { $ref: '#/components/responses/UnauthorizedError' },
        },
      },
    }

    paths[`${pathName}/{id}`] = {
      put: {
        summary: `Update an existing ${tableName} item`,
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
              schema: { $ref: `#/components/schemas/${tableName}` },
            },
          },
        },
        responses: {
          200: {
            description: `${tableName} item updated`,
            content: {
              'application/json': {
                schema: { $ref: `#/components/schemas/${tableName}` },
              },
            },
          },
          401: { $ref: '#/components/responses/UnauthorizedError' },
        },
      },
      delete: {
        summary: `Delete an existing ${tableName} item`,
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
            description: `${tableName} item deleted`,
          },
          401: { $ref: '#/components/responses/UnauthorizedError' },
        },
      },
    }
  }

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
