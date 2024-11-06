import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const Test_tableScalarFieldEnumSchema = z.enum(['id','data_field','created_at','updated_at','unico','opa','asasas','teste','outro','asasasas','testee','asaawww','sdgsdfsdf','asdasd','hermes','madeira']);

export const AnotherScalarFieldEnumSchema = z.enum(['id','name','phone','moherName','data_field','created_at','updated_at']);

export const CategoryScalarFieldEnumSchema = z.enum(['id','name']);

export const TagScalarFieldEnumSchema = z.enum(['id','name']);

export const NewsScalarFieldEnumSchema = z.enum(['id','title','content','publishedAt','status','createdAt','updatedAt','categoryId']);

export const HermesScalarFieldEnumSchema = z.enum(['id','nome','telefone']);

export const Back3nd_userScalarFieldEnumSchema = z.enum(['id','name','email','password','reset_token','created_at','updated_at']);

export const Back3nd_roleScalarFieldEnumSchema = z.enum(['id','name','description','created_at','updated_at']);

export const Back3nd_user_roleScalarFieldEnumSchema = z.enum(['id','user_id','role_id','created_at']);

export const Back3nd_permissionScalarFieldEnumSchema = z.enum(['id','role_id','table_id','can_create','can_read','can_update','can_delete','created_at']);

export const Back3nd_entityScalarFieldEnumSchema = z.enum(['id','name','created_at','updated_at']);

export const Back3nd_entity_fieldsScalarFieldEnumSchema = z.enum(['id','columnName','columnType','size','placeholder','defaultValue','isUnique','entity_id','created_at']);

export const Back3nd_password_resetScalarFieldEnumSchema = z.enum(['id','user_id','token','created_at','expires_at']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const test_tableOrderByRelevanceFieldEnumSchema = z.enum(['id','data_field','unico','asasas','teste','outro','asasasas','testee','asaawww','sdgsdfsdf','asdasd','hermes','madeira']);

export const anotherOrderByRelevanceFieldEnumSchema = z.enum(['id','name','moherName','data_field']);

export const CategoryOrderByRelevanceFieldEnumSchema = z.enum(['id','name']);

export const TagOrderByRelevanceFieldEnumSchema = z.enum(['id','name']);

export const NewsOrderByRelevanceFieldEnumSchema = z.enum(['id','title','content','categoryId']);

export const hermesOrderByRelevanceFieldEnumSchema = z.enum(['id','nome','telefone']);

export const back3nd_userOrderByRelevanceFieldEnumSchema = z.enum(['id','name','email','password','reset_token']);

export const back3nd_roleOrderByRelevanceFieldEnumSchema = z.enum(['id','name','description']);

export const back3nd_user_roleOrderByRelevanceFieldEnumSchema = z.enum(['id','user_id','role_id']);

export const back3nd_permissionOrderByRelevanceFieldEnumSchema = z.enum(['id','role_id','table_id']);

export const back3nd_entityOrderByRelevanceFieldEnumSchema = z.enum(['id','name']);

export const back3nd_entity_fieldsOrderByRelevanceFieldEnumSchema = z.enum(['id','columnName','columnType','placeholder','defaultValue','entity_id']);

export const back3nd_password_resetOrderByRelevanceFieldEnumSchema = z.enum(['id','user_id','token']);

export const NewsStatusSchema = z.enum(['DRAFT','PUBLISHED','ARCHIVED']);

export type NewsStatusType = `${z.infer<typeof NewsStatusSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// TEST TABLE SCHEMA
/////////////////////////////////////////

export const test_tableSchema = z.object({
  id: z.string(),
  data_field: z.string(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  unico: z.string().nullable(),
  opa: z.coerce.date().nullable(),
  asasas: z.string().nullable(),
  teste: z.string().nullable(),
  outro: z.string().nullable(),
  asasasas: z.string().nullable(),
  testee: z.string().nullable(),
  asaawww: z.string().nullable(),
  sdgsdfsdf: z.string().nullable(),
  asdasd: z.string().nullable(),
  hermes: z.string().nullable(),
  madeira: z.string().nullable(),
})

export type test_table = z.infer<typeof test_tableSchema>

/////////////////////////////////////////
// ANOTHER SCHEMA
/////////////////////////////////////////

export const anotherSchema = z.object({
  id: z.string(),
  name: z.string(),
  phone: z.number(),
  moherName: z.string().nullable(),
  data_field: z.string(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
})

export type another = z.infer<typeof anotherSchema>

/////////////////////////////////////////
// CATEGORY SCHEMA
/////////////////////////////////////////

export const CategorySchema = z.object({
  id: z.string(),
  name: z.string(),
})

export type Category = z.infer<typeof CategorySchema>

/////////////////////////////////////////
// TAG SCHEMA
/////////////////////////////////////////

export const TagSchema = z.object({
  id: z.string(),
  name: z.string(),
})

export type Tag = z.infer<typeof TagSchema>

/////////////////////////////////////////
// NEWS SCHEMA
/////////////////////////////////////////

export const NewsSchema = z.object({
  status: NewsStatusSchema,
  id: z.string(),
  title: z.string(),
  content: z.string(),
  publishedAt: z.coerce.date(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  categoryId: z.string().nullable(),
})

export type News = z.infer<typeof NewsSchema>

/////////////////////////////////////////
// HERMES SCHEMA
/////////////////////////////////////////

export const hermesSchema = z.object({
  id: z.string(),
  nome: z.string().nullable(),
  telefone: z.string().nullable(),
})

export type hermes = z.infer<typeof hermesSchema>

/////////////////////////////////////////
// BACK 3 ND USER SCHEMA
/////////////////////////////////////////

export const back3nd_userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  reset_token: z.string().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
})

export type back3nd_user = z.infer<typeof back3nd_userSchema>

/////////////////////////////////////////
// BACK 3 ND ROLE SCHEMA
/////////////////////////////////////////

export const back3nd_roleSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
})

export type back3nd_role = z.infer<typeof back3nd_roleSchema>

/////////////////////////////////////////
// BACK 3 ND USER ROLE SCHEMA
/////////////////////////////////////////

export const back3nd_user_roleSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  role_id: z.string(),
  created_at: z.coerce.date(),
})

export type back3nd_user_role = z.infer<typeof back3nd_user_roleSchema>

/////////////////////////////////////////
// BACK 3 ND PERMISSION SCHEMA
/////////////////////////////////////////

export const back3nd_permissionSchema = z.object({
  id: z.string(),
  role_id: z.string(),
  table_id: z.string(),
  can_create: z.boolean(),
  can_read: z.boolean(),
  can_update: z.boolean(),
  can_delete: z.boolean(),
  created_at: z.coerce.date(),
})

export type back3nd_permission = z.infer<typeof back3nd_permissionSchema>

/////////////////////////////////////////
// BACK 3 ND ENTITY SCHEMA
/////////////////////////////////////////

export const back3nd_entitySchema = z.object({
  id: z.string(),
  name: z.string(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
})

export type back3nd_entity = z.infer<typeof back3nd_entitySchema>

/////////////////////////////////////////
// BACK 3 ND ENTITY FIELDS SCHEMA
/////////////////////////////////////////

export const back3nd_entity_fieldsSchema = z.object({
  id: z.string(),
  columnName: z.string(),
  columnType: z.string(),
  size: z.number().int().nullable(),
  placeholder: z.string().nullable(),
  defaultValue: z.string().nullable(),
  isUnique: z.boolean(),
  entity_id: z.string(),
  created_at: z.coerce.date(),
})

export type back3nd_entity_fields = z.infer<typeof back3nd_entity_fieldsSchema>

/////////////////////////////////////////
// BACK 3 ND PASSWORD RESET SCHEMA
/////////////////////////////////////////

export const back3nd_password_resetSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  token: z.string(),
  created_at: z.coerce.date(),
  expires_at: z.coerce.date(),
})

export type back3nd_password_reset = z.infer<typeof back3nd_password_resetSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// TEST TABLE
//------------------------------------------------------

export const test_tableSelectSchema: z.ZodType<Prisma.test_tableSelect> = z.object({
  id: z.boolean().optional(),
  data_field: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  unico: z.boolean().optional(),
  opa: z.boolean().optional(),
  asasas: z.boolean().optional(),
  teste: z.boolean().optional(),
  outro: z.boolean().optional(),
  asasasas: z.boolean().optional(),
  testee: z.boolean().optional(),
  asaawww: z.boolean().optional(),
  sdgsdfsdf: z.boolean().optional(),
  asdasd: z.boolean().optional(),
  hermes: z.boolean().optional(),
  madeira: z.boolean().optional(),
}).strict()

// ANOTHER
//------------------------------------------------------

export const anotherSelectSchema: z.ZodType<Prisma.anotherSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  phone: z.boolean().optional(),
  moherName: z.boolean().optional(),
  data_field: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
}).strict()

// CATEGORY
//------------------------------------------------------

export const CategoryIncludeSchema: z.ZodType<Prisma.CategoryInclude> = z.object({
  news: z.union([z.boolean(),z.lazy(() => NewsFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CategoryCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const CategoryArgsSchema: z.ZodType<Prisma.CategoryDefaultArgs> = z.object({
  select: z.lazy(() => CategorySelectSchema).optional(),
  include: z.lazy(() => CategoryIncludeSchema).optional(),
}).strict();

export const CategoryCountOutputTypeArgsSchema: z.ZodType<Prisma.CategoryCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => CategoryCountOutputTypeSelectSchema).nullish(),
}).strict();

export const CategoryCountOutputTypeSelectSchema: z.ZodType<Prisma.CategoryCountOutputTypeSelect> = z.object({
  news: z.boolean().optional(),
}).strict();

export const CategorySelectSchema: z.ZodType<Prisma.CategorySelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  news: z.union([z.boolean(),z.lazy(() => NewsFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CategoryCountOutputTypeArgsSchema)]).optional(),
}).strict()

// TAG
//------------------------------------------------------

export const TagIncludeSchema: z.ZodType<Prisma.TagInclude> = z.object({
  news: z.union([z.boolean(),z.lazy(() => NewsFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TagCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const TagArgsSchema: z.ZodType<Prisma.TagDefaultArgs> = z.object({
  select: z.lazy(() => TagSelectSchema).optional(),
  include: z.lazy(() => TagIncludeSchema).optional(),
}).strict();

export const TagCountOutputTypeArgsSchema: z.ZodType<Prisma.TagCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => TagCountOutputTypeSelectSchema).nullish(),
}).strict();

export const TagCountOutputTypeSelectSchema: z.ZodType<Prisma.TagCountOutputTypeSelect> = z.object({
  news: z.boolean().optional(),
}).strict();

export const TagSelectSchema: z.ZodType<Prisma.TagSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  news: z.union([z.boolean(),z.lazy(() => NewsFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => TagCountOutputTypeArgsSchema)]).optional(),
}).strict()

// NEWS
//------------------------------------------------------

export const NewsIncludeSchema: z.ZodType<Prisma.NewsInclude> = z.object({
  category: z.union([z.boolean(),z.lazy(() => CategoryArgsSchema)]).optional(),
  tags: z.union([z.boolean(),z.lazy(() => TagFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => NewsCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const NewsArgsSchema: z.ZodType<Prisma.NewsDefaultArgs> = z.object({
  select: z.lazy(() => NewsSelectSchema).optional(),
  include: z.lazy(() => NewsIncludeSchema).optional(),
}).strict();

export const NewsCountOutputTypeArgsSchema: z.ZodType<Prisma.NewsCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => NewsCountOutputTypeSelectSchema).nullish(),
}).strict();

export const NewsCountOutputTypeSelectSchema: z.ZodType<Prisma.NewsCountOutputTypeSelect> = z.object({
  tags: z.boolean().optional(),
}).strict();

export const NewsSelectSchema: z.ZodType<Prisma.NewsSelect> = z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  content: z.boolean().optional(),
  publishedAt: z.boolean().optional(),
  status: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  categoryId: z.boolean().optional(),
  category: z.union([z.boolean(),z.lazy(() => CategoryArgsSchema)]).optional(),
  tags: z.union([z.boolean(),z.lazy(() => TagFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => NewsCountOutputTypeArgsSchema)]).optional(),
}).strict()

// HERMES
//------------------------------------------------------

export const hermesSelectSchema: z.ZodType<Prisma.hermesSelect> = z.object({
  id: z.boolean().optional(),
  nome: z.boolean().optional(),
  telefone: z.boolean().optional(),
}).strict()

// BACK 3 ND USER
//------------------------------------------------------

export const back3nd_userIncludeSchema: z.ZodType<Prisma.back3nd_userInclude> = z.object({
  back3nd_password_reset: z.union([z.boolean(),z.lazy(() => back3nd_password_resetFindManyArgsSchema)]).optional(),
  roles: z.union([z.boolean(),z.lazy(() => back3nd_user_roleFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => Back3nd_userCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const back3nd_userArgsSchema: z.ZodType<Prisma.back3nd_userDefaultArgs> = z.object({
  select: z.lazy(() => back3nd_userSelectSchema).optional(),
  include: z.lazy(() => back3nd_userIncludeSchema).optional(),
}).strict();

export const back3nd_userCountOutputTypeArgsSchema: z.ZodType<Prisma.back3nd_userCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => back3nd_userCountOutputTypeSelectSchema).nullish(),
}).strict();

export const back3nd_userCountOutputTypeSelectSchema: z.ZodType<Prisma.back3nd_userCountOutputTypeSelect> = z.object({
  back3nd_password_reset: z.boolean().optional(),
  roles: z.boolean().optional(),
}).strict();

export const back3nd_userSelectSchema: z.ZodType<Prisma.back3nd_userSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  email: z.boolean().optional(),
  password: z.boolean().optional(),
  reset_token: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  back3nd_password_reset: z.union([z.boolean(),z.lazy(() => back3nd_password_resetFindManyArgsSchema)]).optional(),
  roles: z.union([z.boolean(),z.lazy(() => back3nd_user_roleFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => Back3nd_userCountOutputTypeArgsSchema)]).optional(),
}).strict()

// BACK 3 ND ROLE
//------------------------------------------------------

export const back3nd_roleIncludeSchema: z.ZodType<Prisma.back3nd_roleInclude> = z.object({
  permissions: z.union([z.boolean(),z.lazy(() => back3nd_permissionFindManyArgsSchema)]).optional(),
  users: z.union([z.boolean(),z.lazy(() => back3nd_user_roleFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => Back3nd_roleCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const back3nd_roleArgsSchema: z.ZodType<Prisma.back3nd_roleDefaultArgs> = z.object({
  select: z.lazy(() => back3nd_roleSelectSchema).optional(),
  include: z.lazy(() => back3nd_roleIncludeSchema).optional(),
}).strict();

export const back3nd_roleCountOutputTypeArgsSchema: z.ZodType<Prisma.back3nd_roleCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => back3nd_roleCountOutputTypeSelectSchema).nullish(),
}).strict();

export const back3nd_roleCountOutputTypeSelectSchema: z.ZodType<Prisma.back3nd_roleCountOutputTypeSelect> = z.object({
  permissions: z.boolean().optional(),
  users: z.boolean().optional(),
}).strict();

export const back3nd_roleSelectSchema: z.ZodType<Prisma.back3nd_roleSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  permissions: z.union([z.boolean(),z.lazy(() => back3nd_permissionFindManyArgsSchema)]).optional(),
  users: z.union([z.boolean(),z.lazy(() => back3nd_user_roleFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => Back3nd_roleCountOutputTypeArgsSchema)]).optional(),
}).strict()

// BACK 3 ND USER ROLE
//------------------------------------------------------

export const back3nd_user_roleIncludeSchema: z.ZodType<Prisma.back3nd_user_roleInclude> = z.object({
  role: z.union([z.boolean(),z.lazy(() => back3nd_roleArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => back3nd_userArgsSchema)]).optional(),
}).strict()

export const back3nd_user_roleArgsSchema: z.ZodType<Prisma.back3nd_user_roleDefaultArgs> = z.object({
  select: z.lazy(() => back3nd_user_roleSelectSchema).optional(),
  include: z.lazy(() => back3nd_user_roleIncludeSchema).optional(),
}).strict();

export const back3nd_user_roleSelectSchema: z.ZodType<Prisma.back3nd_user_roleSelect> = z.object({
  id: z.boolean().optional(),
  user_id: z.boolean().optional(),
  role_id: z.boolean().optional(),
  created_at: z.boolean().optional(),
  role: z.union([z.boolean(),z.lazy(() => back3nd_roleArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => back3nd_userArgsSchema)]).optional(),
}).strict()

// BACK 3 ND PERMISSION
//------------------------------------------------------

export const back3nd_permissionIncludeSchema: z.ZodType<Prisma.back3nd_permissionInclude> = z.object({
  role: z.union([z.boolean(),z.lazy(() => back3nd_roleArgsSchema)]).optional(),
  table: z.union([z.boolean(),z.lazy(() => back3nd_entityArgsSchema)]).optional(),
}).strict()

export const back3nd_permissionArgsSchema: z.ZodType<Prisma.back3nd_permissionDefaultArgs> = z.object({
  select: z.lazy(() => back3nd_permissionSelectSchema).optional(),
  include: z.lazy(() => back3nd_permissionIncludeSchema).optional(),
}).strict();

export const back3nd_permissionSelectSchema: z.ZodType<Prisma.back3nd_permissionSelect> = z.object({
  id: z.boolean().optional(),
  role_id: z.boolean().optional(),
  table_id: z.boolean().optional(),
  can_create: z.boolean().optional(),
  can_read: z.boolean().optional(),
  can_update: z.boolean().optional(),
  can_delete: z.boolean().optional(),
  created_at: z.boolean().optional(),
  role: z.union([z.boolean(),z.lazy(() => back3nd_roleArgsSchema)]).optional(),
  table: z.union([z.boolean(),z.lazy(() => back3nd_entityArgsSchema)]).optional(),
}).strict()

// BACK 3 ND ENTITY
//------------------------------------------------------

export const back3nd_entityIncludeSchema: z.ZodType<Prisma.back3nd_entityInclude> = z.object({
  back3nd_entity_fields: z.union([z.boolean(),z.lazy(() => back3nd_entity_fieldsFindManyArgsSchema)]).optional(),
  back3nd_permission: z.union([z.boolean(),z.lazy(() => back3nd_permissionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => Back3nd_entityCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const back3nd_entityArgsSchema: z.ZodType<Prisma.back3nd_entityDefaultArgs> = z.object({
  select: z.lazy(() => back3nd_entitySelectSchema).optional(),
  include: z.lazy(() => back3nd_entityIncludeSchema).optional(),
}).strict();

export const back3nd_entityCountOutputTypeArgsSchema: z.ZodType<Prisma.back3nd_entityCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => back3nd_entityCountOutputTypeSelectSchema).nullish(),
}).strict();

export const back3nd_entityCountOutputTypeSelectSchema: z.ZodType<Prisma.back3nd_entityCountOutputTypeSelect> = z.object({
  back3nd_entity_fields: z.boolean().optional(),
  back3nd_permission: z.boolean().optional(),
}).strict();

export const back3nd_entitySelectSchema: z.ZodType<Prisma.back3nd_entitySelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  back3nd_entity_fields: z.union([z.boolean(),z.lazy(() => back3nd_entity_fieldsFindManyArgsSchema)]).optional(),
  back3nd_permission: z.union([z.boolean(),z.lazy(() => back3nd_permissionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => Back3nd_entityCountOutputTypeArgsSchema)]).optional(),
}).strict()

// BACK 3 ND ENTITY FIELDS
//------------------------------------------------------

export const back3nd_entity_fieldsIncludeSchema: z.ZodType<Prisma.back3nd_entity_fieldsInclude> = z.object({
  back3nd_entity: z.union([z.boolean(),z.lazy(() => back3nd_entityArgsSchema)]).optional(),
}).strict()

export const back3nd_entity_fieldsArgsSchema: z.ZodType<Prisma.back3nd_entity_fieldsDefaultArgs> = z.object({
  select: z.lazy(() => back3nd_entity_fieldsSelectSchema).optional(),
  include: z.lazy(() => back3nd_entity_fieldsIncludeSchema).optional(),
}).strict();

export const back3nd_entity_fieldsSelectSchema: z.ZodType<Prisma.back3nd_entity_fieldsSelect> = z.object({
  id: z.boolean().optional(),
  columnName: z.boolean().optional(),
  columnType: z.boolean().optional(),
  size: z.boolean().optional(),
  placeholder: z.boolean().optional(),
  defaultValue: z.boolean().optional(),
  isUnique: z.boolean().optional(),
  entity_id: z.boolean().optional(),
  created_at: z.boolean().optional(),
  back3nd_entity: z.union([z.boolean(),z.lazy(() => back3nd_entityArgsSchema)]).optional(),
}).strict()

// BACK 3 ND PASSWORD RESET
//------------------------------------------------------

export const back3nd_password_resetIncludeSchema: z.ZodType<Prisma.back3nd_password_resetInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => back3nd_userArgsSchema)]).optional(),
}).strict()

export const back3nd_password_resetArgsSchema: z.ZodType<Prisma.back3nd_password_resetDefaultArgs> = z.object({
  select: z.lazy(() => back3nd_password_resetSelectSchema).optional(),
  include: z.lazy(() => back3nd_password_resetIncludeSchema).optional(),
}).strict();

export const back3nd_password_resetSelectSchema: z.ZodType<Prisma.back3nd_password_resetSelect> = z.object({
  id: z.boolean().optional(),
  user_id: z.boolean().optional(),
  token: z.boolean().optional(),
  created_at: z.boolean().optional(),
  expires_at: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => back3nd_userArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const test_tableWhereInputSchema: z.ZodType<Prisma.test_tableWhereInput> = z.object({
  AND: z.union([ z.lazy(() => test_tableWhereInputSchema),z.lazy(() => test_tableWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => test_tableWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => test_tableWhereInputSchema),z.lazy(() => test_tableWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  data_field: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  unico: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  opa: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  asasas: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  teste: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  outro: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  asasasas: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  testee: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  asaawww: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  sdgsdfsdf: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  asdasd: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  hermes: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  madeira: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const test_tableOrderByWithRelationInputSchema: z.ZodType<Prisma.test_tableOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  data_field: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  unico: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  opa: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  asasas: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  teste: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  outro: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  asasasas: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  testee: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  asaawww: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  sdgsdfsdf: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  asdasd: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  hermes: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  madeira: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _relevance: z.lazy(() => test_tableOrderByRelevanceInputSchema).optional()
}).strict();

export const test_tableWhereUniqueInputSchema: z.ZodType<Prisma.test_tableWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    unico: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    unico: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  unico: z.string().optional(),
  AND: z.union([ z.lazy(() => test_tableWhereInputSchema),z.lazy(() => test_tableWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => test_tableWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => test_tableWhereInputSchema),z.lazy(() => test_tableWhereInputSchema).array() ]).optional(),
  data_field: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  opa: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  asasas: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  teste: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  outro: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  asasasas: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  testee: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  asaawww: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  sdgsdfsdf: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  asdasd: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  hermes: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  madeira: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict());

export const test_tableOrderByWithAggregationInputSchema: z.ZodType<Prisma.test_tableOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  data_field: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  unico: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  opa: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  asasas: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  teste: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  outro: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  asasasas: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  testee: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  asaawww: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  sdgsdfsdf: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  asdasd: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  hermes: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  madeira: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => test_tableCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => test_tableMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => test_tableMinOrderByAggregateInputSchema).optional()
}).strict();

export const test_tableScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.test_tableScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => test_tableScalarWhereWithAggregatesInputSchema),z.lazy(() => test_tableScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => test_tableScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => test_tableScalarWhereWithAggregatesInputSchema),z.lazy(() => test_tableScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  data_field: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  unico: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  opa: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  asasas: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  teste: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  outro: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  asasasas: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  testee: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  asaawww: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  sdgsdfsdf: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  asdasd: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  hermes: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  madeira: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const anotherWhereInputSchema: z.ZodType<Prisma.anotherWhereInput> = z.object({
  AND: z.union([ z.lazy(() => anotherWhereInputSchema),z.lazy(() => anotherWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => anotherWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => anotherWhereInputSchema),z.lazy(() => anotherWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  phone: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  moherName: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  data_field: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const anotherOrderByWithRelationInputSchema: z.ZodType<Prisma.anotherOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  moherName: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  data_field: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  _relevance: z.lazy(() => anotherOrderByRelevanceInputSchema).optional()
}).strict();

export const anotherWhereUniqueInputSchema: z.ZodType<Prisma.anotherWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => anotherWhereInputSchema),z.lazy(() => anotherWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => anotherWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => anotherWhereInputSchema),z.lazy(() => anotherWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  phone: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  moherName: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  data_field: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict());

export const anotherOrderByWithAggregationInputSchema: z.ZodType<Prisma.anotherOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  moherName: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  data_field: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => anotherCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => anotherAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => anotherMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => anotherMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => anotherSumOrderByAggregateInputSchema).optional()
}).strict();

export const anotherScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.anotherScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => anotherScalarWhereWithAggregatesInputSchema),z.lazy(() => anotherScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => anotherScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => anotherScalarWhereWithAggregatesInputSchema),z.lazy(() => anotherScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  phone: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  moherName: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  data_field: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const CategoryWhereInputSchema: z.ZodType<Prisma.CategoryWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CategoryWhereInputSchema),z.lazy(() => CategoryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CategoryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CategoryWhereInputSchema),z.lazy(() => CategoryWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  news: z.lazy(() => NewsListRelationFilterSchema).optional()
}).strict();

export const CategoryOrderByWithRelationInputSchema: z.ZodType<Prisma.CategoryOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  news: z.lazy(() => NewsOrderByRelationAggregateInputSchema).optional(),
  _relevance: z.lazy(() => CategoryOrderByRelevanceInputSchema).optional()
}).strict();

export const CategoryWhereUniqueInputSchema: z.ZodType<Prisma.CategoryWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    name: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    name: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  AND: z.union([ z.lazy(() => CategoryWhereInputSchema),z.lazy(() => CategoryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CategoryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CategoryWhereInputSchema),z.lazy(() => CategoryWhereInputSchema).array() ]).optional(),
  news: z.lazy(() => NewsListRelationFilterSchema).optional()
}).strict());

export const CategoryOrderByWithAggregationInputSchema: z.ZodType<Prisma.CategoryOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CategoryCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CategoryMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CategoryMinOrderByAggregateInputSchema).optional()
}).strict();

export const CategoryScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CategoryScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CategoryScalarWhereWithAggregatesInputSchema),z.lazy(() => CategoryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CategoryScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CategoryScalarWhereWithAggregatesInputSchema),z.lazy(() => CategoryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const TagWhereInputSchema: z.ZodType<Prisma.TagWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TagWhereInputSchema),z.lazy(() => TagWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TagWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TagWhereInputSchema),z.lazy(() => TagWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  news: z.lazy(() => NewsListRelationFilterSchema).optional()
}).strict();

export const TagOrderByWithRelationInputSchema: z.ZodType<Prisma.TagOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  news: z.lazy(() => NewsOrderByRelationAggregateInputSchema).optional(),
  _relevance: z.lazy(() => TagOrderByRelevanceInputSchema).optional()
}).strict();

export const TagWhereUniqueInputSchema: z.ZodType<Prisma.TagWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    name: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    name: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  AND: z.union([ z.lazy(() => TagWhereInputSchema),z.lazy(() => TagWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TagWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TagWhereInputSchema),z.lazy(() => TagWhereInputSchema).array() ]).optional(),
  news: z.lazy(() => NewsListRelationFilterSchema).optional()
}).strict());

export const TagOrderByWithAggregationInputSchema: z.ZodType<Prisma.TagOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TagCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TagMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TagMinOrderByAggregateInputSchema).optional()
}).strict();

export const TagScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TagScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TagScalarWhereWithAggregatesInputSchema),z.lazy(() => TagScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TagScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TagScalarWhereWithAggregatesInputSchema),z.lazy(() => TagScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const NewsWhereInputSchema: z.ZodType<Prisma.NewsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => NewsWhereInputSchema),z.lazy(() => NewsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => NewsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NewsWhereInputSchema),z.lazy(() => NewsWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  publishedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  status: z.union([ z.lazy(() => EnumNewsStatusFilterSchema),z.lazy(() => NewsStatusSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  categoryId: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  category: z.union([ z.lazy(() => CategoryNullableRelationFilterSchema),z.lazy(() => CategoryWhereInputSchema) ]).optional().nullable(),
  tags: z.lazy(() => TagListRelationFilterSchema).optional()
}).strict();

export const NewsOrderByWithRelationInputSchema: z.ZodType<Prisma.NewsOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  publishedAt: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  categoryId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  category: z.lazy(() => CategoryOrderByWithRelationInputSchema).optional(),
  tags: z.lazy(() => TagOrderByRelationAggregateInputSchema).optional(),
  _relevance: z.lazy(() => NewsOrderByRelevanceInputSchema).optional()
}).strict();

export const NewsWhereUniqueInputSchema: z.ZodType<Prisma.NewsWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => NewsWhereInputSchema),z.lazy(() => NewsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => NewsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NewsWhereInputSchema),z.lazy(() => NewsWhereInputSchema).array() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  publishedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  status: z.union([ z.lazy(() => EnumNewsStatusFilterSchema),z.lazy(() => NewsStatusSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  categoryId: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  category: z.union([ z.lazy(() => CategoryNullableRelationFilterSchema),z.lazy(() => CategoryWhereInputSchema) ]).optional().nullable(),
  tags: z.lazy(() => TagListRelationFilterSchema).optional()
}).strict());

export const NewsOrderByWithAggregationInputSchema: z.ZodType<Prisma.NewsOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  publishedAt: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  categoryId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => NewsCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => NewsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => NewsMinOrderByAggregateInputSchema).optional()
}).strict();

export const NewsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.NewsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => NewsScalarWhereWithAggregatesInputSchema),z.lazy(() => NewsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => NewsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NewsScalarWhereWithAggregatesInputSchema),z.lazy(() => NewsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  publishedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  status: z.union([ z.lazy(() => EnumNewsStatusWithAggregatesFilterSchema),z.lazy(() => NewsStatusSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  categoryId: z.union([ z.lazy(() => UuidNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const hermesWhereInputSchema: z.ZodType<Prisma.hermesWhereInput> = z.object({
  AND: z.union([ z.lazy(() => hermesWhereInputSchema),z.lazy(() => hermesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => hermesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => hermesWhereInputSchema),z.lazy(() => hermesWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  nome: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  telefone: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const hermesOrderByWithRelationInputSchema: z.ZodType<Prisma.hermesOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  nome: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  telefone: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _relevance: z.lazy(() => hermesOrderByRelevanceInputSchema).optional()
}).strict();

export const hermesWhereUniqueInputSchema: z.ZodType<Prisma.hermesWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => hermesWhereInputSchema),z.lazy(() => hermesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => hermesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => hermesWhereInputSchema),z.lazy(() => hermesWhereInputSchema).array() ]).optional(),
  nome: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  telefone: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict());

export const hermesOrderByWithAggregationInputSchema: z.ZodType<Prisma.hermesOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  nome: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  telefone: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => hermesCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => hermesMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => hermesMinOrderByAggregateInputSchema).optional()
}).strict();

export const hermesScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.hermesScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => hermesScalarWhereWithAggregatesInputSchema),z.lazy(() => hermesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => hermesScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => hermesScalarWhereWithAggregatesInputSchema),z.lazy(() => hermesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  nome: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  telefone: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const back3nd_userWhereInputSchema: z.ZodType<Prisma.back3nd_userWhereInput> = z.object({
  AND: z.union([ z.lazy(() => back3nd_userWhereInputSchema),z.lazy(() => back3nd_userWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => back3nd_userWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => back3nd_userWhereInputSchema),z.lazy(() => back3nd_userWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  reset_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  back3nd_password_reset: z.lazy(() => Back3nd_password_resetListRelationFilterSchema).optional(),
  roles: z.lazy(() => Back3nd_user_roleListRelationFilterSchema).optional()
}).strict();

export const back3nd_userOrderByWithRelationInputSchema: z.ZodType<Prisma.back3nd_userOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  reset_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  back3nd_password_reset: z.lazy(() => back3nd_password_resetOrderByRelationAggregateInputSchema).optional(),
  roles: z.lazy(() => back3nd_user_roleOrderByRelationAggregateInputSchema).optional(),
  _relevance: z.lazy(() => back3nd_userOrderByRelevanceInputSchema).optional()
}).strict();

export const back3nd_userWhereUniqueInputSchema: z.ZodType<Prisma.back3nd_userWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    email: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => back3nd_userWhereInputSchema),z.lazy(() => back3nd_userWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => back3nd_userWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => back3nd_userWhereInputSchema),z.lazy(() => back3nd_userWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  reset_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  back3nd_password_reset: z.lazy(() => Back3nd_password_resetListRelationFilterSchema).optional(),
  roles: z.lazy(() => Back3nd_user_roleListRelationFilterSchema).optional()
}).strict());

export const back3nd_userOrderByWithAggregationInputSchema: z.ZodType<Prisma.back3nd_userOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  reset_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => back3nd_userCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => back3nd_userMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => back3nd_userMinOrderByAggregateInputSchema).optional()
}).strict();

export const back3nd_userScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.back3nd_userScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => back3nd_userScalarWhereWithAggregatesInputSchema),z.lazy(() => back3nd_userScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => back3nd_userScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => back3nd_userScalarWhereWithAggregatesInputSchema),z.lazy(() => back3nd_userScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  reset_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const back3nd_roleWhereInputSchema: z.ZodType<Prisma.back3nd_roleWhereInput> = z.object({
  AND: z.union([ z.lazy(() => back3nd_roleWhereInputSchema),z.lazy(() => back3nd_roleWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => back3nd_roleWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => back3nd_roleWhereInputSchema),z.lazy(() => back3nd_roleWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  permissions: z.lazy(() => Back3nd_permissionListRelationFilterSchema).optional(),
  users: z.lazy(() => Back3nd_user_roleListRelationFilterSchema).optional()
}).strict();

export const back3nd_roleOrderByWithRelationInputSchema: z.ZodType<Prisma.back3nd_roleOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  permissions: z.lazy(() => back3nd_permissionOrderByRelationAggregateInputSchema).optional(),
  users: z.lazy(() => back3nd_user_roleOrderByRelationAggregateInputSchema).optional(),
  _relevance: z.lazy(() => back3nd_roleOrderByRelevanceInputSchema).optional()
}).strict();

export const back3nd_roleWhereUniqueInputSchema: z.ZodType<Prisma.back3nd_roleWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    name: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    name: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  AND: z.union([ z.lazy(() => back3nd_roleWhereInputSchema),z.lazy(() => back3nd_roleWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => back3nd_roleWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => back3nd_roleWhereInputSchema),z.lazy(() => back3nd_roleWhereInputSchema).array() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  permissions: z.lazy(() => Back3nd_permissionListRelationFilterSchema).optional(),
  users: z.lazy(() => Back3nd_user_roleListRelationFilterSchema).optional()
}).strict());

export const back3nd_roleOrderByWithAggregationInputSchema: z.ZodType<Prisma.back3nd_roleOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => back3nd_roleCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => back3nd_roleMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => back3nd_roleMinOrderByAggregateInputSchema).optional()
}).strict();

export const back3nd_roleScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.back3nd_roleScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => back3nd_roleScalarWhereWithAggregatesInputSchema),z.lazy(() => back3nd_roleScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => back3nd_roleScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => back3nd_roleScalarWhereWithAggregatesInputSchema),z.lazy(() => back3nd_roleScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const back3nd_user_roleWhereInputSchema: z.ZodType<Prisma.back3nd_user_roleWhereInput> = z.object({
  AND: z.union([ z.lazy(() => back3nd_user_roleWhereInputSchema),z.lazy(() => back3nd_user_roleWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => back3nd_user_roleWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => back3nd_user_roleWhereInputSchema),z.lazy(() => back3nd_user_roleWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  role_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  role: z.union([ z.lazy(() => Back3nd_roleRelationFilterSchema),z.lazy(() => back3nd_roleWhereInputSchema) ]).optional(),
  user: z.union([ z.lazy(() => Back3nd_userRelationFilterSchema),z.lazy(() => back3nd_userWhereInputSchema) ]).optional(),
}).strict();

export const back3nd_user_roleOrderByWithRelationInputSchema: z.ZodType<Prisma.back3nd_user_roleOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  role_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => back3nd_roleOrderByWithRelationInputSchema).optional(),
  user: z.lazy(() => back3nd_userOrderByWithRelationInputSchema).optional(),
  _relevance: z.lazy(() => back3nd_user_roleOrderByRelevanceInputSchema).optional()
}).strict();

export const back3nd_user_roleWhereUniqueInputSchema: z.ZodType<Prisma.back3nd_user_roleWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    user_id_role_id: z.lazy(() => back3nd_user_roleUser_idRole_idCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    user_id_role_id: z.lazy(() => back3nd_user_roleUser_idRole_idCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().optional(),
  user_id_role_id: z.lazy(() => back3nd_user_roleUser_idRole_idCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => back3nd_user_roleWhereInputSchema),z.lazy(() => back3nd_user_roleWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => back3nd_user_roleWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => back3nd_user_roleWhereInputSchema),z.lazy(() => back3nd_user_roleWhereInputSchema).array() ]).optional(),
  user_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  role_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  role: z.union([ z.lazy(() => Back3nd_roleRelationFilterSchema),z.lazy(() => back3nd_roleWhereInputSchema) ]).optional(),
  user: z.union([ z.lazy(() => Back3nd_userRelationFilterSchema),z.lazy(() => back3nd_userWhereInputSchema) ]).optional(),
}).strict());

export const back3nd_user_roleOrderByWithAggregationInputSchema: z.ZodType<Prisma.back3nd_user_roleOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  role_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => back3nd_user_roleCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => back3nd_user_roleMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => back3nd_user_roleMinOrderByAggregateInputSchema).optional()
}).strict();

export const back3nd_user_roleScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.back3nd_user_roleScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => back3nd_user_roleScalarWhereWithAggregatesInputSchema),z.lazy(() => back3nd_user_roleScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => back3nd_user_roleScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => back3nd_user_roleScalarWhereWithAggregatesInputSchema),z.lazy(() => back3nd_user_roleScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  role_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const back3nd_permissionWhereInputSchema: z.ZodType<Prisma.back3nd_permissionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => back3nd_permissionWhereInputSchema),z.lazy(() => back3nd_permissionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => back3nd_permissionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => back3nd_permissionWhereInputSchema),z.lazy(() => back3nd_permissionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  role_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  table_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  can_create: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  can_read: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  can_update: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  can_delete: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  role: z.union([ z.lazy(() => Back3nd_roleRelationFilterSchema),z.lazy(() => back3nd_roleWhereInputSchema) ]).optional(),
  table: z.union([ z.lazy(() => Back3nd_entityRelationFilterSchema),z.lazy(() => back3nd_entityWhereInputSchema) ]).optional(),
}).strict();

export const back3nd_permissionOrderByWithRelationInputSchema: z.ZodType<Prisma.back3nd_permissionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  role_id: z.lazy(() => SortOrderSchema).optional(),
  table_id: z.lazy(() => SortOrderSchema).optional(),
  can_create: z.lazy(() => SortOrderSchema).optional(),
  can_read: z.lazy(() => SortOrderSchema).optional(),
  can_update: z.lazy(() => SortOrderSchema).optional(),
  can_delete: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => back3nd_roleOrderByWithRelationInputSchema).optional(),
  table: z.lazy(() => back3nd_entityOrderByWithRelationInputSchema).optional(),
  _relevance: z.lazy(() => back3nd_permissionOrderByRelevanceInputSchema).optional()
}).strict();

export const back3nd_permissionWhereUniqueInputSchema: z.ZodType<Prisma.back3nd_permissionWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    role_id_table_id: z.lazy(() => back3nd_permissionRole_idTable_idCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    role_id_table_id: z.lazy(() => back3nd_permissionRole_idTable_idCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().optional(),
  role_id_table_id: z.lazy(() => back3nd_permissionRole_idTable_idCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => back3nd_permissionWhereInputSchema),z.lazy(() => back3nd_permissionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => back3nd_permissionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => back3nd_permissionWhereInputSchema),z.lazy(() => back3nd_permissionWhereInputSchema).array() ]).optional(),
  role_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  table_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  can_create: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  can_read: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  can_update: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  can_delete: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  role: z.union([ z.lazy(() => Back3nd_roleRelationFilterSchema),z.lazy(() => back3nd_roleWhereInputSchema) ]).optional(),
  table: z.union([ z.lazy(() => Back3nd_entityRelationFilterSchema),z.lazy(() => back3nd_entityWhereInputSchema) ]).optional(),
}).strict());

export const back3nd_permissionOrderByWithAggregationInputSchema: z.ZodType<Prisma.back3nd_permissionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  role_id: z.lazy(() => SortOrderSchema).optional(),
  table_id: z.lazy(() => SortOrderSchema).optional(),
  can_create: z.lazy(() => SortOrderSchema).optional(),
  can_read: z.lazy(() => SortOrderSchema).optional(),
  can_update: z.lazy(() => SortOrderSchema).optional(),
  can_delete: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => back3nd_permissionCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => back3nd_permissionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => back3nd_permissionMinOrderByAggregateInputSchema).optional()
}).strict();

export const back3nd_permissionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.back3nd_permissionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => back3nd_permissionScalarWhereWithAggregatesInputSchema),z.lazy(() => back3nd_permissionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => back3nd_permissionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => back3nd_permissionScalarWhereWithAggregatesInputSchema),z.lazy(() => back3nd_permissionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  role_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  table_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  can_create: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  can_read: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  can_update: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  can_delete: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const back3nd_entityWhereInputSchema: z.ZodType<Prisma.back3nd_entityWhereInput> = z.object({
  AND: z.union([ z.lazy(() => back3nd_entityWhereInputSchema),z.lazy(() => back3nd_entityWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => back3nd_entityWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => back3nd_entityWhereInputSchema),z.lazy(() => back3nd_entityWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  back3nd_entity_fields: z.lazy(() => Back3nd_entity_fieldsListRelationFilterSchema).optional(),
  back3nd_permission: z.lazy(() => Back3nd_permissionListRelationFilterSchema).optional()
}).strict();

export const back3nd_entityOrderByWithRelationInputSchema: z.ZodType<Prisma.back3nd_entityOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  back3nd_entity_fields: z.lazy(() => back3nd_entity_fieldsOrderByRelationAggregateInputSchema).optional(),
  back3nd_permission: z.lazy(() => back3nd_permissionOrderByRelationAggregateInputSchema).optional(),
  _relevance: z.lazy(() => back3nd_entityOrderByRelevanceInputSchema).optional()
}).strict();

export const back3nd_entityWhereUniqueInputSchema: z.ZodType<Prisma.back3nd_entityWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    name: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    name: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  AND: z.union([ z.lazy(() => back3nd_entityWhereInputSchema),z.lazy(() => back3nd_entityWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => back3nd_entityWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => back3nd_entityWhereInputSchema),z.lazy(() => back3nd_entityWhereInputSchema).array() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  back3nd_entity_fields: z.lazy(() => Back3nd_entity_fieldsListRelationFilterSchema).optional(),
  back3nd_permission: z.lazy(() => Back3nd_permissionListRelationFilterSchema).optional()
}).strict());

export const back3nd_entityOrderByWithAggregationInputSchema: z.ZodType<Prisma.back3nd_entityOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => back3nd_entityCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => back3nd_entityMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => back3nd_entityMinOrderByAggregateInputSchema).optional()
}).strict();

export const back3nd_entityScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.back3nd_entityScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => back3nd_entityScalarWhereWithAggregatesInputSchema),z.lazy(() => back3nd_entityScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => back3nd_entityScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => back3nd_entityScalarWhereWithAggregatesInputSchema),z.lazy(() => back3nd_entityScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const back3nd_entity_fieldsWhereInputSchema: z.ZodType<Prisma.back3nd_entity_fieldsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => back3nd_entity_fieldsWhereInputSchema),z.lazy(() => back3nd_entity_fieldsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => back3nd_entity_fieldsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => back3nd_entity_fieldsWhereInputSchema),z.lazy(() => back3nd_entity_fieldsWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  columnName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  columnType: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  size: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  placeholder: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  defaultValue: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  isUnique: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  entity_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  back3nd_entity: z.union([ z.lazy(() => Back3nd_entityRelationFilterSchema),z.lazy(() => back3nd_entityWhereInputSchema) ]).optional(),
}).strict();

export const back3nd_entity_fieldsOrderByWithRelationInputSchema: z.ZodType<Prisma.back3nd_entity_fieldsOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  columnName: z.lazy(() => SortOrderSchema).optional(),
  columnType: z.lazy(() => SortOrderSchema).optional(),
  size: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  placeholder: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  defaultValue: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  isUnique: z.lazy(() => SortOrderSchema).optional(),
  entity_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  back3nd_entity: z.lazy(() => back3nd_entityOrderByWithRelationInputSchema).optional(),
  _relevance: z.lazy(() => back3nd_entity_fieldsOrderByRelevanceInputSchema).optional()
}).strict();

export const back3nd_entity_fieldsWhereUniqueInputSchema: z.ZodType<Prisma.back3nd_entity_fieldsWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    entity_id_columnName: z.lazy(() => back3nd_entity_fieldsEntity_idColumnNameCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    entity_id_columnName: z.lazy(() => back3nd_entity_fieldsEntity_idColumnNameCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().optional(),
  entity_id_columnName: z.lazy(() => back3nd_entity_fieldsEntity_idColumnNameCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => back3nd_entity_fieldsWhereInputSchema),z.lazy(() => back3nd_entity_fieldsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => back3nd_entity_fieldsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => back3nd_entity_fieldsWhereInputSchema),z.lazy(() => back3nd_entity_fieldsWhereInputSchema).array() ]).optional(),
  columnName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  columnType: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  size: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  placeholder: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  defaultValue: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  isUnique: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  entity_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  back3nd_entity: z.union([ z.lazy(() => Back3nd_entityRelationFilterSchema),z.lazy(() => back3nd_entityWhereInputSchema) ]).optional(),
}).strict());

export const back3nd_entity_fieldsOrderByWithAggregationInputSchema: z.ZodType<Prisma.back3nd_entity_fieldsOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  columnName: z.lazy(() => SortOrderSchema).optional(),
  columnType: z.lazy(() => SortOrderSchema).optional(),
  size: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  placeholder: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  defaultValue: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  isUnique: z.lazy(() => SortOrderSchema).optional(),
  entity_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => back3nd_entity_fieldsCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => back3nd_entity_fieldsAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => back3nd_entity_fieldsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => back3nd_entity_fieldsMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => back3nd_entity_fieldsSumOrderByAggregateInputSchema).optional()
}).strict();

export const back3nd_entity_fieldsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.back3nd_entity_fieldsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => back3nd_entity_fieldsScalarWhereWithAggregatesInputSchema),z.lazy(() => back3nd_entity_fieldsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => back3nd_entity_fieldsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => back3nd_entity_fieldsScalarWhereWithAggregatesInputSchema),z.lazy(() => back3nd_entity_fieldsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  columnName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  columnType: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  size: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  placeholder: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  defaultValue: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  isUnique: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  entity_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const back3nd_password_resetWhereInputSchema: z.ZodType<Prisma.back3nd_password_resetWhereInput> = z.object({
  AND: z.union([ z.lazy(() => back3nd_password_resetWhereInputSchema),z.lazy(() => back3nd_password_resetWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => back3nd_password_resetWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => back3nd_password_resetWhereInputSchema),z.lazy(() => back3nd_password_resetWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  expires_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => Back3nd_userRelationFilterSchema),z.lazy(() => back3nd_userWhereInputSchema) ]).optional(),
}).strict();

export const back3nd_password_resetOrderByWithRelationInputSchema: z.ZodType<Prisma.back3nd_password_resetOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => back3nd_userOrderByWithRelationInputSchema).optional(),
  _relevance: z.lazy(() => back3nd_password_resetOrderByRelevanceInputSchema).optional()
}).strict();

export const back3nd_password_resetWhereUniqueInputSchema: z.ZodType<Prisma.back3nd_password_resetWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => back3nd_password_resetWhereInputSchema),z.lazy(() => back3nd_password_resetWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => back3nd_password_resetWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => back3nd_password_resetWhereInputSchema),z.lazy(() => back3nd_password_resetWhereInputSchema).array() ]).optional(),
  user_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  expires_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => Back3nd_userRelationFilterSchema),z.lazy(() => back3nd_userWhereInputSchema) ]).optional(),
}).strict());

export const back3nd_password_resetOrderByWithAggregationInputSchema: z.ZodType<Prisma.back3nd_password_resetOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => back3nd_password_resetCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => back3nd_password_resetMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => back3nd_password_resetMinOrderByAggregateInputSchema).optional()
}).strict();

export const back3nd_password_resetScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.back3nd_password_resetScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => back3nd_password_resetScalarWhereWithAggregatesInputSchema),z.lazy(() => back3nd_password_resetScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => back3nd_password_resetScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => back3nd_password_resetScalarWhereWithAggregatesInputSchema),z.lazy(() => back3nd_password_resetScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  expires_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const test_tableCreateInputSchema: z.ZodType<Prisma.test_tableCreateInput> = z.object({
  id: z.string().optional(),
  data_field: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  unico: z.string().optional().nullable(),
  opa: z.coerce.date().optional().nullable(),
  asasas: z.string().optional().nullable(),
  teste: z.string().optional().nullable(),
  outro: z.string().optional().nullable(),
  asasasas: z.string().optional().nullable(),
  testee: z.string().optional().nullable(),
  asaawww: z.string().optional().nullable(),
  sdgsdfsdf: z.string().optional().nullable(),
  asdasd: z.string().optional().nullable(),
  hermes: z.string().optional().nullable(),
  madeira: z.string().optional().nullable()
}).strict();

export const test_tableUncheckedCreateInputSchema: z.ZodType<Prisma.test_tableUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  data_field: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  unico: z.string().optional().nullable(),
  opa: z.coerce.date().optional().nullable(),
  asasas: z.string().optional().nullable(),
  teste: z.string().optional().nullable(),
  outro: z.string().optional().nullable(),
  asasasas: z.string().optional().nullable(),
  testee: z.string().optional().nullable(),
  asaawww: z.string().optional().nullable(),
  sdgsdfsdf: z.string().optional().nullable(),
  asdasd: z.string().optional().nullable(),
  hermes: z.string().optional().nullable(),
  madeira: z.string().optional().nullable()
}).strict();

export const test_tableUpdateInputSchema: z.ZodType<Prisma.test_tableUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  data_field: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  unico: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  opa: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  asasas: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  teste: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  outro: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  asasasas: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  testee: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  asaawww: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sdgsdfsdf: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  asdasd: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hermes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  madeira: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const test_tableUncheckedUpdateInputSchema: z.ZodType<Prisma.test_tableUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  data_field: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  unico: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  opa: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  asasas: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  teste: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  outro: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  asasasas: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  testee: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  asaawww: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sdgsdfsdf: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  asdasd: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hermes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  madeira: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const test_tableCreateManyInputSchema: z.ZodType<Prisma.test_tableCreateManyInput> = z.object({
  id: z.string().optional(),
  data_field: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  unico: z.string().optional().nullable(),
  opa: z.coerce.date().optional().nullable(),
  asasas: z.string().optional().nullable(),
  teste: z.string().optional().nullable(),
  outro: z.string().optional().nullable(),
  asasasas: z.string().optional().nullable(),
  testee: z.string().optional().nullable(),
  asaawww: z.string().optional().nullable(),
  sdgsdfsdf: z.string().optional().nullable(),
  asdasd: z.string().optional().nullable(),
  hermes: z.string().optional().nullable(),
  madeira: z.string().optional().nullable()
}).strict();

export const test_tableUpdateManyMutationInputSchema: z.ZodType<Prisma.test_tableUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  data_field: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  unico: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  opa: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  asasas: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  teste: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  outro: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  asasasas: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  testee: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  asaawww: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sdgsdfsdf: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  asdasd: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hermes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  madeira: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const test_tableUncheckedUpdateManyInputSchema: z.ZodType<Prisma.test_tableUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  data_field: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  unico: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  opa: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  asasas: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  teste: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  outro: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  asasasas: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  testee: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  asaawww: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sdgsdfsdf: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  asdasd: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hermes: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  madeira: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const anotherCreateInputSchema: z.ZodType<Prisma.anotherCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  phone: z.number(),
  moherName: z.string().optional().nullable(),
  data_field: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional()
}).strict();

export const anotherUncheckedCreateInputSchema: z.ZodType<Prisma.anotherUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  phone: z.number(),
  moherName: z.string().optional().nullable(),
  data_field: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional()
}).strict();

export const anotherUpdateInputSchema: z.ZodType<Prisma.anotherUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  moherName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  data_field: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const anotherUncheckedUpdateInputSchema: z.ZodType<Prisma.anotherUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  moherName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  data_field: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const anotherCreateManyInputSchema: z.ZodType<Prisma.anotherCreateManyInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  phone: z.number(),
  moherName: z.string().optional().nullable(),
  data_field: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional()
}).strict();

export const anotherUpdateManyMutationInputSchema: z.ZodType<Prisma.anotherUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  moherName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  data_field: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const anotherUncheckedUpdateManyInputSchema: z.ZodType<Prisma.anotherUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  moherName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  data_field: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CategoryCreateInputSchema: z.ZodType<Prisma.CategoryCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  news: z.lazy(() => NewsCreateNestedManyWithoutCategoryInputSchema).optional()
}).strict();

export const CategoryUncheckedCreateInputSchema: z.ZodType<Prisma.CategoryUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  news: z.lazy(() => NewsUncheckedCreateNestedManyWithoutCategoryInputSchema).optional()
}).strict();

export const CategoryUpdateInputSchema: z.ZodType<Prisma.CategoryUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  news: z.lazy(() => NewsUpdateManyWithoutCategoryNestedInputSchema).optional()
}).strict();

export const CategoryUncheckedUpdateInputSchema: z.ZodType<Prisma.CategoryUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  news: z.lazy(() => NewsUncheckedUpdateManyWithoutCategoryNestedInputSchema).optional()
}).strict();

export const CategoryCreateManyInputSchema: z.ZodType<Prisma.CategoryCreateManyInput> = z.object({
  id: z.string().optional(),
  name: z.string()
}).strict();

export const CategoryUpdateManyMutationInputSchema: z.ZodType<Prisma.CategoryUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CategoryUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CategoryUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TagCreateInputSchema: z.ZodType<Prisma.TagCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  news: z.lazy(() => NewsCreateNestedManyWithoutTagsInputSchema).optional()
}).strict();

export const TagUncheckedCreateInputSchema: z.ZodType<Prisma.TagUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  news: z.lazy(() => NewsUncheckedCreateNestedManyWithoutTagsInputSchema).optional()
}).strict();

export const TagUpdateInputSchema: z.ZodType<Prisma.TagUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  news: z.lazy(() => NewsUpdateManyWithoutTagsNestedInputSchema).optional()
}).strict();

export const TagUncheckedUpdateInputSchema: z.ZodType<Prisma.TagUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  news: z.lazy(() => NewsUncheckedUpdateManyWithoutTagsNestedInputSchema).optional()
}).strict();

export const TagCreateManyInputSchema: z.ZodType<Prisma.TagCreateManyInput> = z.object({
  id: z.string().optional(),
  name: z.string()
}).strict();

export const TagUpdateManyMutationInputSchema: z.ZodType<Prisma.TagUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TagUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TagUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const NewsCreateInputSchema: z.ZodType<Prisma.NewsCreateInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  content: z.string(),
  publishedAt: z.coerce.date().optional(),
  status: z.lazy(() => NewsStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  category: z.lazy(() => CategoryCreateNestedOneWithoutNewsInputSchema).optional(),
  tags: z.lazy(() => TagCreateNestedManyWithoutNewsInputSchema).optional()
}).strict();

export const NewsUncheckedCreateInputSchema: z.ZodType<Prisma.NewsUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  content: z.string(),
  publishedAt: z.coerce.date().optional(),
  status: z.lazy(() => NewsStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  categoryId: z.string().optional().nullable(),
  tags: z.lazy(() => TagUncheckedCreateNestedManyWithoutNewsInputSchema).optional()
}).strict();

export const NewsUpdateInputSchema: z.ZodType<Prisma.NewsUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publishedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => NewsStatusSchema),z.lazy(() => EnumNewsStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  category: z.lazy(() => CategoryUpdateOneWithoutNewsNestedInputSchema).optional(),
  tags: z.lazy(() => TagUpdateManyWithoutNewsNestedInputSchema).optional()
}).strict();

export const NewsUncheckedUpdateInputSchema: z.ZodType<Prisma.NewsUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publishedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => NewsStatusSchema),z.lazy(() => EnumNewsStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  categoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tags: z.lazy(() => TagUncheckedUpdateManyWithoutNewsNestedInputSchema).optional()
}).strict();

export const NewsCreateManyInputSchema: z.ZodType<Prisma.NewsCreateManyInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  content: z.string(),
  publishedAt: z.coerce.date().optional(),
  status: z.lazy(() => NewsStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  categoryId: z.string().optional().nullable()
}).strict();

export const NewsUpdateManyMutationInputSchema: z.ZodType<Prisma.NewsUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publishedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => NewsStatusSchema),z.lazy(() => EnumNewsStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const NewsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.NewsUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publishedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => NewsStatusSchema),z.lazy(() => EnumNewsStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  categoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const hermesCreateInputSchema: z.ZodType<Prisma.hermesCreateInput> = z.object({
  id: z.string().optional(),
  nome: z.string().optional().nullable(),
  telefone: z.string().optional().nullable()
}).strict();

export const hermesUncheckedCreateInputSchema: z.ZodType<Prisma.hermesUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  nome: z.string().optional().nullable(),
  telefone: z.string().optional().nullable()
}).strict();

export const hermesUpdateInputSchema: z.ZodType<Prisma.hermesUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nome: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  telefone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const hermesUncheckedUpdateInputSchema: z.ZodType<Prisma.hermesUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nome: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  telefone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const hermesCreateManyInputSchema: z.ZodType<Prisma.hermesCreateManyInput> = z.object({
  id: z.string().optional(),
  nome: z.string().optional().nullable(),
  telefone: z.string().optional().nullable()
}).strict();

export const hermesUpdateManyMutationInputSchema: z.ZodType<Prisma.hermesUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nome: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  telefone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const hermesUncheckedUpdateManyInputSchema: z.ZodType<Prisma.hermesUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nome: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  telefone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const back3nd_userCreateInputSchema: z.ZodType<Prisma.back3nd_userCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  reset_token: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  back3nd_password_reset: z.lazy(() => back3nd_password_resetCreateNestedManyWithoutUserInputSchema).optional(),
  roles: z.lazy(() => back3nd_user_roleCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const back3nd_userUncheckedCreateInputSchema: z.ZodType<Prisma.back3nd_userUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  reset_token: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  back3nd_password_reset: z.lazy(() => back3nd_password_resetUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  roles: z.lazy(() => back3nd_user_roleUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const back3nd_userUpdateInputSchema: z.ZodType<Prisma.back3nd_userUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reset_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  back3nd_password_reset: z.lazy(() => back3nd_password_resetUpdateManyWithoutUserNestedInputSchema).optional(),
  roles: z.lazy(() => back3nd_user_roleUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const back3nd_userUncheckedUpdateInputSchema: z.ZodType<Prisma.back3nd_userUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reset_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  back3nd_password_reset: z.lazy(() => back3nd_password_resetUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  roles: z.lazy(() => back3nd_user_roleUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const back3nd_userCreateManyInputSchema: z.ZodType<Prisma.back3nd_userCreateManyInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  reset_token: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional()
}).strict();

export const back3nd_userUpdateManyMutationInputSchema: z.ZodType<Prisma.back3nd_userUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reset_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const back3nd_userUncheckedUpdateManyInputSchema: z.ZodType<Prisma.back3nd_userUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reset_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const back3nd_roleCreateInputSchema: z.ZodType<Prisma.back3nd_roleCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  permissions: z.lazy(() => back3nd_permissionCreateNestedManyWithoutRoleInputSchema).optional(),
  users: z.lazy(() => back3nd_user_roleCreateNestedManyWithoutRoleInputSchema).optional()
}).strict();

export const back3nd_roleUncheckedCreateInputSchema: z.ZodType<Prisma.back3nd_roleUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  permissions: z.lazy(() => back3nd_permissionUncheckedCreateNestedManyWithoutRoleInputSchema).optional(),
  users: z.lazy(() => back3nd_user_roleUncheckedCreateNestedManyWithoutRoleInputSchema).optional()
}).strict();

export const back3nd_roleUpdateInputSchema: z.ZodType<Prisma.back3nd_roleUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  permissions: z.lazy(() => back3nd_permissionUpdateManyWithoutRoleNestedInputSchema).optional(),
  users: z.lazy(() => back3nd_user_roleUpdateManyWithoutRoleNestedInputSchema).optional()
}).strict();

export const back3nd_roleUncheckedUpdateInputSchema: z.ZodType<Prisma.back3nd_roleUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  permissions: z.lazy(() => back3nd_permissionUncheckedUpdateManyWithoutRoleNestedInputSchema).optional(),
  users: z.lazy(() => back3nd_user_roleUncheckedUpdateManyWithoutRoleNestedInputSchema).optional()
}).strict();

export const back3nd_roleCreateManyInputSchema: z.ZodType<Prisma.back3nd_roleCreateManyInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional()
}).strict();

export const back3nd_roleUpdateManyMutationInputSchema: z.ZodType<Prisma.back3nd_roleUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const back3nd_roleUncheckedUpdateManyInputSchema: z.ZodType<Prisma.back3nd_roleUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const back3nd_user_roleCreateInputSchema: z.ZodType<Prisma.back3nd_user_roleCreateInput> = z.object({
  id: z.string().optional(),
  created_at: z.coerce.date().optional(),
  role: z.lazy(() => back3nd_roleCreateNestedOneWithoutUsersInputSchema),
  user: z.lazy(() => back3nd_userCreateNestedOneWithoutRolesInputSchema)
}).strict();

export const back3nd_user_roleUncheckedCreateInputSchema: z.ZodType<Prisma.back3nd_user_roleUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  user_id: z.string(),
  role_id: z.string(),
  created_at: z.coerce.date().optional()
}).strict();

export const back3nd_user_roleUpdateInputSchema: z.ZodType<Prisma.back3nd_user_roleUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.lazy(() => back3nd_roleUpdateOneRequiredWithoutUsersNestedInputSchema).optional(),
  user: z.lazy(() => back3nd_userUpdateOneRequiredWithoutRolesNestedInputSchema).optional()
}).strict();

export const back3nd_user_roleUncheckedUpdateInputSchema: z.ZodType<Prisma.back3nd_user_roleUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const back3nd_user_roleCreateManyInputSchema: z.ZodType<Prisma.back3nd_user_roleCreateManyInput> = z.object({
  id: z.string().optional(),
  user_id: z.string(),
  role_id: z.string(),
  created_at: z.coerce.date().optional()
}).strict();

export const back3nd_user_roleUpdateManyMutationInputSchema: z.ZodType<Prisma.back3nd_user_roleUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const back3nd_user_roleUncheckedUpdateManyInputSchema: z.ZodType<Prisma.back3nd_user_roleUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const back3nd_permissionCreateInputSchema: z.ZodType<Prisma.back3nd_permissionCreateInput> = z.object({
  id: z.string().optional(),
  can_create: z.boolean().optional(),
  can_read: z.boolean().optional(),
  can_update: z.boolean().optional(),
  can_delete: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  role: z.lazy(() => back3nd_roleCreateNestedOneWithoutPermissionsInputSchema),
  table: z.lazy(() => back3nd_entityCreateNestedOneWithoutBack3nd_permissionInputSchema)
}).strict();

export const back3nd_permissionUncheckedCreateInputSchema: z.ZodType<Prisma.back3nd_permissionUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  role_id: z.string(),
  table_id: z.string(),
  can_create: z.boolean().optional(),
  can_read: z.boolean().optional(),
  can_update: z.boolean().optional(),
  can_delete: z.boolean().optional(),
  created_at: z.coerce.date().optional()
}).strict();

export const back3nd_permissionUpdateInputSchema: z.ZodType<Prisma.back3nd_permissionUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  can_create: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_read: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_update: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_delete: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.lazy(() => back3nd_roleUpdateOneRequiredWithoutPermissionsNestedInputSchema).optional(),
  table: z.lazy(() => back3nd_entityUpdateOneRequiredWithoutBack3nd_permissionNestedInputSchema).optional()
}).strict();

export const back3nd_permissionUncheckedUpdateInputSchema: z.ZodType<Prisma.back3nd_permissionUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  table_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  can_create: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_read: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_update: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_delete: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const back3nd_permissionCreateManyInputSchema: z.ZodType<Prisma.back3nd_permissionCreateManyInput> = z.object({
  id: z.string().optional(),
  role_id: z.string(),
  table_id: z.string(),
  can_create: z.boolean().optional(),
  can_read: z.boolean().optional(),
  can_update: z.boolean().optional(),
  can_delete: z.boolean().optional(),
  created_at: z.coerce.date().optional()
}).strict();

export const back3nd_permissionUpdateManyMutationInputSchema: z.ZodType<Prisma.back3nd_permissionUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  can_create: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_read: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_update: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_delete: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const back3nd_permissionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.back3nd_permissionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  table_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  can_create: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_read: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_update: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_delete: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const back3nd_entityCreateInputSchema: z.ZodType<Prisma.back3nd_entityCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  back3nd_entity_fields: z.lazy(() => back3nd_entity_fieldsCreateNestedManyWithoutBack3nd_entityInputSchema).optional(),
  back3nd_permission: z.lazy(() => back3nd_permissionCreateNestedManyWithoutTableInputSchema).optional()
}).strict();

export const back3nd_entityUncheckedCreateInputSchema: z.ZodType<Prisma.back3nd_entityUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  back3nd_entity_fields: z.lazy(() => back3nd_entity_fieldsUncheckedCreateNestedManyWithoutBack3nd_entityInputSchema).optional(),
  back3nd_permission: z.lazy(() => back3nd_permissionUncheckedCreateNestedManyWithoutTableInputSchema).optional()
}).strict();

export const back3nd_entityUpdateInputSchema: z.ZodType<Prisma.back3nd_entityUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  back3nd_entity_fields: z.lazy(() => back3nd_entity_fieldsUpdateManyWithoutBack3nd_entityNestedInputSchema).optional(),
  back3nd_permission: z.lazy(() => back3nd_permissionUpdateManyWithoutTableNestedInputSchema).optional()
}).strict();

export const back3nd_entityUncheckedUpdateInputSchema: z.ZodType<Prisma.back3nd_entityUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  back3nd_entity_fields: z.lazy(() => back3nd_entity_fieldsUncheckedUpdateManyWithoutBack3nd_entityNestedInputSchema).optional(),
  back3nd_permission: z.lazy(() => back3nd_permissionUncheckedUpdateManyWithoutTableNestedInputSchema).optional()
}).strict();

export const back3nd_entityCreateManyInputSchema: z.ZodType<Prisma.back3nd_entityCreateManyInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional()
}).strict();

export const back3nd_entityUpdateManyMutationInputSchema: z.ZodType<Prisma.back3nd_entityUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const back3nd_entityUncheckedUpdateManyInputSchema: z.ZodType<Prisma.back3nd_entityUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const back3nd_entity_fieldsCreateInputSchema: z.ZodType<Prisma.back3nd_entity_fieldsCreateInput> = z.object({
  id: z.string().optional(),
  columnName: z.string(),
  columnType: z.string(),
  size: z.number().int().optional().nullable(),
  placeholder: z.string().optional().nullable(),
  defaultValue: z.string().optional().nullable(),
  isUnique: z.boolean(),
  created_at: z.coerce.date().optional(),
  back3nd_entity: z.lazy(() => back3nd_entityCreateNestedOneWithoutBack3nd_entity_fieldsInputSchema)
}).strict();

export const back3nd_entity_fieldsUncheckedCreateInputSchema: z.ZodType<Prisma.back3nd_entity_fieldsUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  columnName: z.string(),
  columnType: z.string(),
  size: z.number().int().optional().nullable(),
  placeholder: z.string().optional().nullable(),
  defaultValue: z.string().optional().nullable(),
  isUnique: z.boolean(),
  entity_id: z.string(),
  created_at: z.coerce.date().optional()
}).strict();

export const back3nd_entity_fieldsUpdateInputSchema: z.ZodType<Prisma.back3nd_entity_fieldsUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  columnName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  columnType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  placeholder: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  defaultValue: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isUnique: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  back3nd_entity: z.lazy(() => back3nd_entityUpdateOneRequiredWithoutBack3nd_entity_fieldsNestedInputSchema).optional()
}).strict();

export const back3nd_entity_fieldsUncheckedUpdateInputSchema: z.ZodType<Prisma.back3nd_entity_fieldsUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  columnName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  columnType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  placeholder: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  defaultValue: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isUnique: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  entity_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const back3nd_entity_fieldsCreateManyInputSchema: z.ZodType<Prisma.back3nd_entity_fieldsCreateManyInput> = z.object({
  id: z.string().optional(),
  columnName: z.string(),
  columnType: z.string(),
  size: z.number().int().optional().nullable(),
  placeholder: z.string().optional().nullable(),
  defaultValue: z.string().optional().nullable(),
  isUnique: z.boolean(),
  entity_id: z.string(),
  created_at: z.coerce.date().optional()
}).strict();

export const back3nd_entity_fieldsUpdateManyMutationInputSchema: z.ZodType<Prisma.back3nd_entity_fieldsUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  columnName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  columnType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  placeholder: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  defaultValue: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isUnique: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const back3nd_entity_fieldsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.back3nd_entity_fieldsUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  columnName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  columnType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  placeholder: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  defaultValue: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isUnique: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  entity_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const back3nd_password_resetCreateInputSchema: z.ZodType<Prisma.back3nd_password_resetCreateInput> = z.object({
  id: z.string().optional(),
  token: z.string(),
  created_at: z.coerce.date().optional(),
  expires_at: z.coerce.date(),
  user: z.lazy(() => back3nd_userCreateNestedOneWithoutBack3nd_password_resetInputSchema)
}).strict();

export const back3nd_password_resetUncheckedCreateInputSchema: z.ZodType<Prisma.back3nd_password_resetUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  user_id: z.string(),
  token: z.string(),
  created_at: z.coerce.date().optional(),
  expires_at: z.coerce.date()
}).strict();

export const back3nd_password_resetUpdateInputSchema: z.ZodType<Prisma.back3nd_password_resetUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  expires_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => back3nd_userUpdateOneRequiredWithoutBack3nd_password_resetNestedInputSchema).optional()
}).strict();

export const back3nd_password_resetUncheckedUpdateInputSchema: z.ZodType<Prisma.back3nd_password_resetUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  expires_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const back3nd_password_resetCreateManyInputSchema: z.ZodType<Prisma.back3nd_password_resetCreateManyInput> = z.object({
  id: z.string().optional(),
  user_id: z.string(),
  token: z.string(),
  created_at: z.coerce.date().optional(),
  expires_at: z.coerce.date()
}).strict();

export const back3nd_password_resetUpdateManyMutationInputSchema: z.ZodType<Prisma.back3nd_password_resetUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  expires_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const back3nd_password_resetUncheckedUpdateManyInputSchema: z.ZodType<Prisma.back3nd_password_resetUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  expires_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UuidFilterSchema: z.ZodType<Prisma.UuidFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  search: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidFilterSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  search: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  search: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const test_tableOrderByRelevanceInputSchema: z.ZodType<Prisma.test_tableOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => test_tableOrderByRelevanceFieldEnumSchema),z.lazy(() => test_tableOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const test_tableCountOrderByAggregateInputSchema: z.ZodType<Prisma.test_tableCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  data_field: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  unico: z.lazy(() => SortOrderSchema).optional(),
  opa: z.lazy(() => SortOrderSchema).optional(),
  asasas: z.lazy(() => SortOrderSchema).optional(),
  teste: z.lazy(() => SortOrderSchema).optional(),
  outro: z.lazy(() => SortOrderSchema).optional(),
  asasasas: z.lazy(() => SortOrderSchema).optional(),
  testee: z.lazy(() => SortOrderSchema).optional(),
  asaawww: z.lazy(() => SortOrderSchema).optional(),
  sdgsdfsdf: z.lazy(() => SortOrderSchema).optional(),
  asdasd: z.lazy(() => SortOrderSchema).optional(),
  hermes: z.lazy(() => SortOrderSchema).optional(),
  madeira: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const test_tableMaxOrderByAggregateInputSchema: z.ZodType<Prisma.test_tableMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  data_field: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  unico: z.lazy(() => SortOrderSchema).optional(),
  opa: z.lazy(() => SortOrderSchema).optional(),
  asasas: z.lazy(() => SortOrderSchema).optional(),
  teste: z.lazy(() => SortOrderSchema).optional(),
  outro: z.lazy(() => SortOrderSchema).optional(),
  asasasas: z.lazy(() => SortOrderSchema).optional(),
  testee: z.lazy(() => SortOrderSchema).optional(),
  asaawww: z.lazy(() => SortOrderSchema).optional(),
  sdgsdfsdf: z.lazy(() => SortOrderSchema).optional(),
  asdasd: z.lazy(() => SortOrderSchema).optional(),
  hermes: z.lazy(() => SortOrderSchema).optional(),
  madeira: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const test_tableMinOrderByAggregateInputSchema: z.ZodType<Prisma.test_tableMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  data_field: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  unico: z.lazy(() => SortOrderSchema).optional(),
  opa: z.lazy(() => SortOrderSchema).optional(),
  asasas: z.lazy(() => SortOrderSchema).optional(),
  teste: z.lazy(() => SortOrderSchema).optional(),
  outro: z.lazy(() => SortOrderSchema).optional(),
  asasasas: z.lazy(() => SortOrderSchema).optional(),
  testee: z.lazy(() => SortOrderSchema).optional(),
  asaawww: z.lazy(() => SortOrderSchema).optional(),
  sdgsdfsdf: z.lazy(() => SortOrderSchema).optional(),
  asdasd: z.lazy(() => SortOrderSchema).optional(),
  hermes: z.lazy(() => SortOrderSchema).optional(),
  madeira: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UuidWithAggregatesFilterSchema: z.ZodType<Prisma.UuidWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  search: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  search: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  search: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const FloatFilterSchema: z.ZodType<Prisma.FloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const anotherOrderByRelevanceInputSchema: z.ZodType<Prisma.anotherOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => anotherOrderByRelevanceFieldEnumSchema),z.lazy(() => anotherOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const anotherCountOrderByAggregateInputSchema: z.ZodType<Prisma.anotherCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  moherName: z.lazy(() => SortOrderSchema).optional(),
  data_field: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const anotherAvgOrderByAggregateInputSchema: z.ZodType<Prisma.anotherAvgOrderByAggregateInput> = z.object({
  phone: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const anotherMaxOrderByAggregateInputSchema: z.ZodType<Prisma.anotherMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  moherName: z.lazy(() => SortOrderSchema).optional(),
  data_field: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const anotherMinOrderByAggregateInputSchema: z.ZodType<Prisma.anotherMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  moherName: z.lazy(() => SortOrderSchema).optional(),
  data_field: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const anotherSumOrderByAggregateInputSchema: z.ZodType<Prisma.anotherSumOrderByAggregateInput> = z.object({
  phone: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FloatWithAggregatesFilterSchema: z.ZodType<Prisma.FloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const NewsListRelationFilterSchema: z.ZodType<Prisma.NewsListRelationFilter> = z.object({
  every: z.lazy(() => NewsWhereInputSchema).optional(),
  some: z.lazy(() => NewsWhereInputSchema).optional(),
  none: z.lazy(() => NewsWhereInputSchema).optional()
}).strict();

export const NewsOrderByRelationAggregateInputSchema: z.ZodType<Prisma.NewsOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CategoryOrderByRelevanceInputSchema: z.ZodType<Prisma.CategoryOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => CategoryOrderByRelevanceFieldEnumSchema),z.lazy(() => CategoryOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const CategoryCountOrderByAggregateInputSchema: z.ZodType<Prisma.CategoryCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CategoryMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CategoryMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CategoryMinOrderByAggregateInputSchema: z.ZodType<Prisma.CategoryMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TagOrderByRelevanceInputSchema: z.ZodType<Prisma.TagOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => TagOrderByRelevanceFieldEnumSchema),z.lazy(() => TagOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const TagCountOrderByAggregateInputSchema: z.ZodType<Prisma.TagCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TagMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TagMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TagMinOrderByAggregateInputSchema: z.ZodType<Prisma.TagMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumNewsStatusFilterSchema: z.ZodType<Prisma.EnumNewsStatusFilter> = z.object({
  equals: z.lazy(() => NewsStatusSchema).optional(),
  in: z.lazy(() => NewsStatusSchema).array().optional(),
  notIn: z.lazy(() => NewsStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => NewsStatusSchema),z.lazy(() => NestedEnumNewsStatusFilterSchema) ]).optional(),
}).strict();

export const UuidNullableFilterSchema: z.ZodType<Prisma.UuidNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  search: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const CategoryNullableRelationFilterSchema: z.ZodType<Prisma.CategoryNullableRelationFilter> = z.object({
  is: z.lazy(() => CategoryWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => CategoryWhereInputSchema).optional().nullable()
}).strict();

export const TagListRelationFilterSchema: z.ZodType<Prisma.TagListRelationFilter> = z.object({
  every: z.lazy(() => TagWhereInputSchema).optional(),
  some: z.lazy(() => TagWhereInputSchema).optional(),
  none: z.lazy(() => TagWhereInputSchema).optional()
}).strict();

export const TagOrderByRelationAggregateInputSchema: z.ZodType<Prisma.TagOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NewsOrderByRelevanceInputSchema: z.ZodType<Prisma.NewsOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => NewsOrderByRelevanceFieldEnumSchema),z.lazy(() => NewsOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const NewsCountOrderByAggregateInputSchema: z.ZodType<Prisma.NewsCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  publishedAt: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  categoryId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NewsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.NewsMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  publishedAt: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  categoryId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NewsMinOrderByAggregateInputSchema: z.ZodType<Prisma.NewsMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  publishedAt: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  categoryId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumNewsStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumNewsStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => NewsStatusSchema).optional(),
  in: z.lazy(() => NewsStatusSchema).array().optional(),
  notIn: z.lazy(() => NewsStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => NewsStatusSchema),z.lazy(() => NestedEnumNewsStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumNewsStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumNewsStatusFilterSchema).optional()
}).strict();

export const UuidNullableWithAggregatesFilterSchema: z.ZodType<Prisma.UuidNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  search: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const hermesOrderByRelevanceInputSchema: z.ZodType<Prisma.hermesOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => hermesOrderByRelevanceFieldEnumSchema),z.lazy(() => hermesOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const hermesCountOrderByAggregateInputSchema: z.ZodType<Prisma.hermesCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  nome: z.lazy(() => SortOrderSchema).optional(),
  telefone: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const hermesMaxOrderByAggregateInputSchema: z.ZodType<Prisma.hermesMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  nome: z.lazy(() => SortOrderSchema).optional(),
  telefone: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const hermesMinOrderByAggregateInputSchema: z.ZodType<Prisma.hermesMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  nome: z.lazy(() => SortOrderSchema).optional(),
  telefone: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Back3nd_password_resetListRelationFilterSchema: z.ZodType<Prisma.Back3nd_password_resetListRelationFilter> = z.object({
  every: z.lazy(() => back3nd_password_resetWhereInputSchema).optional(),
  some: z.lazy(() => back3nd_password_resetWhereInputSchema).optional(),
  none: z.lazy(() => back3nd_password_resetWhereInputSchema).optional()
}).strict();

export const Back3nd_user_roleListRelationFilterSchema: z.ZodType<Prisma.Back3nd_user_roleListRelationFilter> = z.object({
  every: z.lazy(() => back3nd_user_roleWhereInputSchema).optional(),
  some: z.lazy(() => back3nd_user_roleWhereInputSchema).optional(),
  none: z.lazy(() => back3nd_user_roleWhereInputSchema).optional()
}).strict();

export const back3nd_password_resetOrderByRelationAggregateInputSchema: z.ZodType<Prisma.back3nd_password_resetOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const back3nd_user_roleOrderByRelationAggregateInputSchema: z.ZodType<Prisma.back3nd_user_roleOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const back3nd_userOrderByRelevanceInputSchema: z.ZodType<Prisma.back3nd_userOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => back3nd_userOrderByRelevanceFieldEnumSchema),z.lazy(() => back3nd_userOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const back3nd_userCountOrderByAggregateInputSchema: z.ZodType<Prisma.back3nd_userCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  reset_token: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const back3nd_userMaxOrderByAggregateInputSchema: z.ZodType<Prisma.back3nd_userMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  reset_token: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const back3nd_userMinOrderByAggregateInputSchema: z.ZodType<Prisma.back3nd_userMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  reset_token: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Back3nd_permissionListRelationFilterSchema: z.ZodType<Prisma.Back3nd_permissionListRelationFilter> = z.object({
  every: z.lazy(() => back3nd_permissionWhereInputSchema).optional(),
  some: z.lazy(() => back3nd_permissionWhereInputSchema).optional(),
  none: z.lazy(() => back3nd_permissionWhereInputSchema).optional()
}).strict();

export const back3nd_permissionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.back3nd_permissionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const back3nd_roleOrderByRelevanceInputSchema: z.ZodType<Prisma.back3nd_roleOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => back3nd_roleOrderByRelevanceFieldEnumSchema),z.lazy(() => back3nd_roleOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const back3nd_roleCountOrderByAggregateInputSchema: z.ZodType<Prisma.back3nd_roleCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const back3nd_roleMaxOrderByAggregateInputSchema: z.ZodType<Prisma.back3nd_roleMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const back3nd_roleMinOrderByAggregateInputSchema: z.ZodType<Prisma.back3nd_roleMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Back3nd_roleRelationFilterSchema: z.ZodType<Prisma.Back3nd_roleRelationFilter> = z.object({
  is: z.lazy(() => back3nd_roleWhereInputSchema).optional(),
  isNot: z.lazy(() => back3nd_roleWhereInputSchema).optional()
}).strict();

export const Back3nd_userRelationFilterSchema: z.ZodType<Prisma.Back3nd_userRelationFilter> = z.object({
  is: z.lazy(() => back3nd_userWhereInputSchema).optional(),
  isNot: z.lazy(() => back3nd_userWhereInputSchema).optional()
}).strict();

export const back3nd_user_roleOrderByRelevanceInputSchema: z.ZodType<Prisma.back3nd_user_roleOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => back3nd_user_roleOrderByRelevanceFieldEnumSchema),z.lazy(() => back3nd_user_roleOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const back3nd_user_roleUser_idRole_idCompoundUniqueInputSchema: z.ZodType<Prisma.back3nd_user_roleUser_idRole_idCompoundUniqueInput> = z.object({
  user_id: z.string(),
  role_id: z.string()
}).strict();

export const back3nd_user_roleCountOrderByAggregateInputSchema: z.ZodType<Prisma.back3nd_user_roleCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  role_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const back3nd_user_roleMaxOrderByAggregateInputSchema: z.ZodType<Prisma.back3nd_user_roleMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  role_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const back3nd_user_roleMinOrderByAggregateInputSchema: z.ZodType<Prisma.back3nd_user_roleMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  role_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const Back3nd_entityRelationFilterSchema: z.ZodType<Prisma.Back3nd_entityRelationFilter> = z.object({
  is: z.lazy(() => back3nd_entityWhereInputSchema).optional(),
  isNot: z.lazy(() => back3nd_entityWhereInputSchema).optional()
}).strict();

export const back3nd_permissionOrderByRelevanceInputSchema: z.ZodType<Prisma.back3nd_permissionOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => back3nd_permissionOrderByRelevanceFieldEnumSchema),z.lazy(() => back3nd_permissionOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const back3nd_permissionRole_idTable_idCompoundUniqueInputSchema: z.ZodType<Prisma.back3nd_permissionRole_idTable_idCompoundUniqueInput> = z.object({
  role_id: z.string(),
  table_id: z.string()
}).strict();

export const back3nd_permissionCountOrderByAggregateInputSchema: z.ZodType<Prisma.back3nd_permissionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  role_id: z.lazy(() => SortOrderSchema).optional(),
  table_id: z.lazy(() => SortOrderSchema).optional(),
  can_create: z.lazy(() => SortOrderSchema).optional(),
  can_read: z.lazy(() => SortOrderSchema).optional(),
  can_update: z.lazy(() => SortOrderSchema).optional(),
  can_delete: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const back3nd_permissionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.back3nd_permissionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  role_id: z.lazy(() => SortOrderSchema).optional(),
  table_id: z.lazy(() => SortOrderSchema).optional(),
  can_create: z.lazy(() => SortOrderSchema).optional(),
  can_read: z.lazy(() => SortOrderSchema).optional(),
  can_update: z.lazy(() => SortOrderSchema).optional(),
  can_delete: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const back3nd_permissionMinOrderByAggregateInputSchema: z.ZodType<Prisma.back3nd_permissionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  role_id: z.lazy(() => SortOrderSchema).optional(),
  table_id: z.lazy(() => SortOrderSchema).optional(),
  can_create: z.lazy(() => SortOrderSchema).optional(),
  can_read: z.lazy(() => SortOrderSchema).optional(),
  can_update: z.lazy(() => SortOrderSchema).optional(),
  can_delete: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const Back3nd_entity_fieldsListRelationFilterSchema: z.ZodType<Prisma.Back3nd_entity_fieldsListRelationFilter> = z.object({
  every: z.lazy(() => back3nd_entity_fieldsWhereInputSchema).optional(),
  some: z.lazy(() => back3nd_entity_fieldsWhereInputSchema).optional(),
  none: z.lazy(() => back3nd_entity_fieldsWhereInputSchema).optional()
}).strict();

export const back3nd_entity_fieldsOrderByRelationAggregateInputSchema: z.ZodType<Prisma.back3nd_entity_fieldsOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const back3nd_entityOrderByRelevanceInputSchema: z.ZodType<Prisma.back3nd_entityOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => back3nd_entityOrderByRelevanceFieldEnumSchema),z.lazy(() => back3nd_entityOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const back3nd_entityCountOrderByAggregateInputSchema: z.ZodType<Prisma.back3nd_entityCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const back3nd_entityMaxOrderByAggregateInputSchema: z.ZodType<Prisma.back3nd_entityMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const back3nd_entityMinOrderByAggregateInputSchema: z.ZodType<Prisma.back3nd_entityMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const back3nd_entity_fieldsOrderByRelevanceInputSchema: z.ZodType<Prisma.back3nd_entity_fieldsOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => back3nd_entity_fieldsOrderByRelevanceFieldEnumSchema),z.lazy(() => back3nd_entity_fieldsOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const back3nd_entity_fieldsEntity_idColumnNameCompoundUniqueInputSchema: z.ZodType<Prisma.back3nd_entity_fieldsEntity_idColumnNameCompoundUniqueInput> = z.object({
  entity_id: z.string(),
  columnName: z.string()
}).strict();

export const back3nd_entity_fieldsCountOrderByAggregateInputSchema: z.ZodType<Prisma.back3nd_entity_fieldsCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  columnName: z.lazy(() => SortOrderSchema).optional(),
  columnType: z.lazy(() => SortOrderSchema).optional(),
  size: z.lazy(() => SortOrderSchema).optional(),
  placeholder: z.lazy(() => SortOrderSchema).optional(),
  defaultValue: z.lazy(() => SortOrderSchema).optional(),
  isUnique: z.lazy(() => SortOrderSchema).optional(),
  entity_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const back3nd_entity_fieldsAvgOrderByAggregateInputSchema: z.ZodType<Prisma.back3nd_entity_fieldsAvgOrderByAggregateInput> = z.object({
  size: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const back3nd_entity_fieldsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.back3nd_entity_fieldsMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  columnName: z.lazy(() => SortOrderSchema).optional(),
  columnType: z.lazy(() => SortOrderSchema).optional(),
  size: z.lazy(() => SortOrderSchema).optional(),
  placeholder: z.lazy(() => SortOrderSchema).optional(),
  defaultValue: z.lazy(() => SortOrderSchema).optional(),
  isUnique: z.lazy(() => SortOrderSchema).optional(),
  entity_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const back3nd_entity_fieldsMinOrderByAggregateInputSchema: z.ZodType<Prisma.back3nd_entity_fieldsMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  columnName: z.lazy(() => SortOrderSchema).optional(),
  columnType: z.lazy(() => SortOrderSchema).optional(),
  size: z.lazy(() => SortOrderSchema).optional(),
  placeholder: z.lazy(() => SortOrderSchema).optional(),
  defaultValue: z.lazy(() => SortOrderSchema).optional(),
  isUnique: z.lazy(() => SortOrderSchema).optional(),
  entity_id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const back3nd_entity_fieldsSumOrderByAggregateInputSchema: z.ZodType<Prisma.back3nd_entity_fieldsSumOrderByAggregateInput> = z.object({
  size: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const back3nd_password_resetOrderByRelevanceInputSchema: z.ZodType<Prisma.back3nd_password_resetOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => back3nd_password_resetOrderByRelevanceFieldEnumSchema),z.lazy(() => back3nd_password_resetOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const back3nd_password_resetCountOrderByAggregateInputSchema: z.ZodType<Prisma.back3nd_password_resetCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const back3nd_password_resetMaxOrderByAggregateInputSchema: z.ZodType<Prisma.back3nd_password_resetMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const back3nd_password_resetMinOrderByAggregateInputSchema: z.ZodType<Prisma.back3nd_password_resetMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable()
}).strict();

export const FloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.FloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const NewsCreateNestedManyWithoutCategoryInputSchema: z.ZodType<Prisma.NewsCreateNestedManyWithoutCategoryInput> = z.object({
  create: z.union([ z.lazy(() => NewsCreateWithoutCategoryInputSchema),z.lazy(() => NewsCreateWithoutCategoryInputSchema).array(),z.lazy(() => NewsUncheckedCreateWithoutCategoryInputSchema),z.lazy(() => NewsUncheckedCreateWithoutCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NewsCreateOrConnectWithoutCategoryInputSchema),z.lazy(() => NewsCreateOrConnectWithoutCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NewsCreateManyCategoryInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => NewsWhereUniqueInputSchema),z.lazy(() => NewsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NewsUncheckedCreateNestedManyWithoutCategoryInputSchema: z.ZodType<Prisma.NewsUncheckedCreateNestedManyWithoutCategoryInput> = z.object({
  create: z.union([ z.lazy(() => NewsCreateWithoutCategoryInputSchema),z.lazy(() => NewsCreateWithoutCategoryInputSchema).array(),z.lazy(() => NewsUncheckedCreateWithoutCategoryInputSchema),z.lazy(() => NewsUncheckedCreateWithoutCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NewsCreateOrConnectWithoutCategoryInputSchema),z.lazy(() => NewsCreateOrConnectWithoutCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NewsCreateManyCategoryInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => NewsWhereUniqueInputSchema),z.lazy(() => NewsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NewsUpdateManyWithoutCategoryNestedInputSchema: z.ZodType<Prisma.NewsUpdateManyWithoutCategoryNestedInput> = z.object({
  create: z.union([ z.lazy(() => NewsCreateWithoutCategoryInputSchema),z.lazy(() => NewsCreateWithoutCategoryInputSchema).array(),z.lazy(() => NewsUncheckedCreateWithoutCategoryInputSchema),z.lazy(() => NewsUncheckedCreateWithoutCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NewsCreateOrConnectWithoutCategoryInputSchema),z.lazy(() => NewsCreateOrConnectWithoutCategoryInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => NewsUpsertWithWhereUniqueWithoutCategoryInputSchema),z.lazy(() => NewsUpsertWithWhereUniqueWithoutCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NewsCreateManyCategoryInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => NewsWhereUniqueInputSchema),z.lazy(() => NewsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => NewsWhereUniqueInputSchema),z.lazy(() => NewsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => NewsWhereUniqueInputSchema),z.lazy(() => NewsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => NewsWhereUniqueInputSchema),z.lazy(() => NewsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => NewsUpdateWithWhereUniqueWithoutCategoryInputSchema),z.lazy(() => NewsUpdateWithWhereUniqueWithoutCategoryInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => NewsUpdateManyWithWhereWithoutCategoryInputSchema),z.lazy(() => NewsUpdateManyWithWhereWithoutCategoryInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => NewsScalarWhereInputSchema),z.lazy(() => NewsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NewsUncheckedUpdateManyWithoutCategoryNestedInputSchema: z.ZodType<Prisma.NewsUncheckedUpdateManyWithoutCategoryNestedInput> = z.object({
  create: z.union([ z.lazy(() => NewsCreateWithoutCategoryInputSchema),z.lazy(() => NewsCreateWithoutCategoryInputSchema).array(),z.lazy(() => NewsUncheckedCreateWithoutCategoryInputSchema),z.lazy(() => NewsUncheckedCreateWithoutCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NewsCreateOrConnectWithoutCategoryInputSchema),z.lazy(() => NewsCreateOrConnectWithoutCategoryInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => NewsUpsertWithWhereUniqueWithoutCategoryInputSchema),z.lazy(() => NewsUpsertWithWhereUniqueWithoutCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => NewsCreateManyCategoryInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => NewsWhereUniqueInputSchema),z.lazy(() => NewsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => NewsWhereUniqueInputSchema),z.lazy(() => NewsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => NewsWhereUniqueInputSchema),z.lazy(() => NewsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => NewsWhereUniqueInputSchema),z.lazy(() => NewsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => NewsUpdateWithWhereUniqueWithoutCategoryInputSchema),z.lazy(() => NewsUpdateWithWhereUniqueWithoutCategoryInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => NewsUpdateManyWithWhereWithoutCategoryInputSchema),z.lazy(() => NewsUpdateManyWithWhereWithoutCategoryInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => NewsScalarWhereInputSchema),z.lazy(() => NewsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NewsCreateNestedManyWithoutTagsInputSchema: z.ZodType<Prisma.NewsCreateNestedManyWithoutTagsInput> = z.object({
  create: z.union([ z.lazy(() => NewsCreateWithoutTagsInputSchema),z.lazy(() => NewsCreateWithoutTagsInputSchema).array(),z.lazy(() => NewsUncheckedCreateWithoutTagsInputSchema),z.lazy(() => NewsUncheckedCreateWithoutTagsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NewsCreateOrConnectWithoutTagsInputSchema),z.lazy(() => NewsCreateOrConnectWithoutTagsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => NewsWhereUniqueInputSchema),z.lazy(() => NewsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NewsUncheckedCreateNestedManyWithoutTagsInputSchema: z.ZodType<Prisma.NewsUncheckedCreateNestedManyWithoutTagsInput> = z.object({
  create: z.union([ z.lazy(() => NewsCreateWithoutTagsInputSchema),z.lazy(() => NewsCreateWithoutTagsInputSchema).array(),z.lazy(() => NewsUncheckedCreateWithoutTagsInputSchema),z.lazy(() => NewsUncheckedCreateWithoutTagsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NewsCreateOrConnectWithoutTagsInputSchema),z.lazy(() => NewsCreateOrConnectWithoutTagsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => NewsWhereUniqueInputSchema),z.lazy(() => NewsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NewsUpdateManyWithoutTagsNestedInputSchema: z.ZodType<Prisma.NewsUpdateManyWithoutTagsNestedInput> = z.object({
  create: z.union([ z.lazy(() => NewsCreateWithoutTagsInputSchema),z.lazy(() => NewsCreateWithoutTagsInputSchema).array(),z.lazy(() => NewsUncheckedCreateWithoutTagsInputSchema),z.lazy(() => NewsUncheckedCreateWithoutTagsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NewsCreateOrConnectWithoutTagsInputSchema),z.lazy(() => NewsCreateOrConnectWithoutTagsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => NewsUpsertWithWhereUniqueWithoutTagsInputSchema),z.lazy(() => NewsUpsertWithWhereUniqueWithoutTagsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => NewsWhereUniqueInputSchema),z.lazy(() => NewsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => NewsWhereUniqueInputSchema),z.lazy(() => NewsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => NewsWhereUniqueInputSchema),z.lazy(() => NewsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => NewsWhereUniqueInputSchema),z.lazy(() => NewsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => NewsUpdateWithWhereUniqueWithoutTagsInputSchema),z.lazy(() => NewsUpdateWithWhereUniqueWithoutTagsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => NewsUpdateManyWithWhereWithoutTagsInputSchema),z.lazy(() => NewsUpdateManyWithWhereWithoutTagsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => NewsScalarWhereInputSchema),z.lazy(() => NewsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NewsUncheckedUpdateManyWithoutTagsNestedInputSchema: z.ZodType<Prisma.NewsUncheckedUpdateManyWithoutTagsNestedInput> = z.object({
  create: z.union([ z.lazy(() => NewsCreateWithoutTagsInputSchema),z.lazy(() => NewsCreateWithoutTagsInputSchema).array(),z.lazy(() => NewsUncheckedCreateWithoutTagsInputSchema),z.lazy(() => NewsUncheckedCreateWithoutTagsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => NewsCreateOrConnectWithoutTagsInputSchema),z.lazy(() => NewsCreateOrConnectWithoutTagsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => NewsUpsertWithWhereUniqueWithoutTagsInputSchema),z.lazy(() => NewsUpsertWithWhereUniqueWithoutTagsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => NewsWhereUniqueInputSchema),z.lazy(() => NewsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => NewsWhereUniqueInputSchema),z.lazy(() => NewsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => NewsWhereUniqueInputSchema),z.lazy(() => NewsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => NewsWhereUniqueInputSchema),z.lazy(() => NewsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => NewsUpdateWithWhereUniqueWithoutTagsInputSchema),z.lazy(() => NewsUpdateWithWhereUniqueWithoutTagsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => NewsUpdateManyWithWhereWithoutTagsInputSchema),z.lazy(() => NewsUpdateManyWithWhereWithoutTagsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => NewsScalarWhereInputSchema),z.lazy(() => NewsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CategoryCreateNestedOneWithoutNewsInputSchema: z.ZodType<Prisma.CategoryCreateNestedOneWithoutNewsInput> = z.object({
  create: z.union([ z.lazy(() => CategoryCreateWithoutNewsInputSchema),z.lazy(() => CategoryUncheckedCreateWithoutNewsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CategoryCreateOrConnectWithoutNewsInputSchema).optional(),
  connect: z.lazy(() => CategoryWhereUniqueInputSchema).optional()
}).strict();

export const TagCreateNestedManyWithoutNewsInputSchema: z.ZodType<Prisma.TagCreateNestedManyWithoutNewsInput> = z.object({
  create: z.union([ z.lazy(() => TagCreateWithoutNewsInputSchema),z.lazy(() => TagCreateWithoutNewsInputSchema).array(),z.lazy(() => TagUncheckedCreateWithoutNewsInputSchema),z.lazy(() => TagUncheckedCreateWithoutNewsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TagCreateOrConnectWithoutNewsInputSchema),z.lazy(() => TagCreateOrConnectWithoutNewsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TagWhereUniqueInputSchema),z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TagUncheckedCreateNestedManyWithoutNewsInputSchema: z.ZodType<Prisma.TagUncheckedCreateNestedManyWithoutNewsInput> = z.object({
  create: z.union([ z.lazy(() => TagCreateWithoutNewsInputSchema),z.lazy(() => TagCreateWithoutNewsInputSchema).array(),z.lazy(() => TagUncheckedCreateWithoutNewsInputSchema),z.lazy(() => TagUncheckedCreateWithoutNewsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TagCreateOrConnectWithoutNewsInputSchema),z.lazy(() => TagCreateOrConnectWithoutNewsInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TagWhereUniqueInputSchema),z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EnumNewsStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumNewsStatusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => NewsStatusSchema).optional()
}).strict();

export const CategoryUpdateOneWithoutNewsNestedInputSchema: z.ZodType<Prisma.CategoryUpdateOneWithoutNewsNestedInput> = z.object({
  create: z.union([ z.lazy(() => CategoryCreateWithoutNewsInputSchema),z.lazy(() => CategoryUncheckedCreateWithoutNewsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CategoryCreateOrConnectWithoutNewsInputSchema).optional(),
  upsert: z.lazy(() => CategoryUpsertWithoutNewsInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => CategoryWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => CategoryWhereInputSchema) ]).optional(),
  connect: z.lazy(() => CategoryWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CategoryUpdateToOneWithWhereWithoutNewsInputSchema),z.lazy(() => CategoryUpdateWithoutNewsInputSchema),z.lazy(() => CategoryUncheckedUpdateWithoutNewsInputSchema) ]).optional(),
}).strict();

export const TagUpdateManyWithoutNewsNestedInputSchema: z.ZodType<Prisma.TagUpdateManyWithoutNewsNestedInput> = z.object({
  create: z.union([ z.lazy(() => TagCreateWithoutNewsInputSchema),z.lazy(() => TagCreateWithoutNewsInputSchema).array(),z.lazy(() => TagUncheckedCreateWithoutNewsInputSchema),z.lazy(() => TagUncheckedCreateWithoutNewsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TagCreateOrConnectWithoutNewsInputSchema),z.lazy(() => TagCreateOrConnectWithoutNewsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TagUpsertWithWhereUniqueWithoutNewsInputSchema),z.lazy(() => TagUpsertWithWhereUniqueWithoutNewsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => TagWhereUniqueInputSchema),z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TagWhereUniqueInputSchema),z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TagWhereUniqueInputSchema),z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TagWhereUniqueInputSchema),z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TagUpdateWithWhereUniqueWithoutNewsInputSchema),z.lazy(() => TagUpdateWithWhereUniqueWithoutNewsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TagUpdateManyWithWhereWithoutNewsInputSchema),z.lazy(() => TagUpdateManyWithWhereWithoutNewsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TagScalarWhereInputSchema),z.lazy(() => TagScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TagUncheckedUpdateManyWithoutNewsNestedInputSchema: z.ZodType<Prisma.TagUncheckedUpdateManyWithoutNewsNestedInput> = z.object({
  create: z.union([ z.lazy(() => TagCreateWithoutNewsInputSchema),z.lazy(() => TagCreateWithoutNewsInputSchema).array(),z.lazy(() => TagUncheckedCreateWithoutNewsInputSchema),z.lazy(() => TagUncheckedCreateWithoutNewsInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TagCreateOrConnectWithoutNewsInputSchema),z.lazy(() => TagCreateOrConnectWithoutNewsInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TagUpsertWithWhereUniqueWithoutNewsInputSchema),z.lazy(() => TagUpsertWithWhereUniqueWithoutNewsInputSchema).array() ]).optional(),
  set: z.union([ z.lazy(() => TagWhereUniqueInputSchema),z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TagWhereUniqueInputSchema),z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TagWhereUniqueInputSchema),z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TagWhereUniqueInputSchema),z.lazy(() => TagWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TagUpdateWithWhereUniqueWithoutNewsInputSchema),z.lazy(() => TagUpdateWithWhereUniqueWithoutNewsInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TagUpdateManyWithWhereWithoutNewsInputSchema),z.lazy(() => TagUpdateManyWithWhereWithoutNewsInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TagScalarWhereInputSchema),z.lazy(() => TagScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const back3nd_password_resetCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.back3nd_password_resetCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => back3nd_password_resetCreateWithoutUserInputSchema),z.lazy(() => back3nd_password_resetCreateWithoutUserInputSchema).array(),z.lazy(() => back3nd_password_resetUncheckedCreateWithoutUserInputSchema),z.lazy(() => back3nd_password_resetUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => back3nd_password_resetCreateOrConnectWithoutUserInputSchema),z.lazy(() => back3nd_password_resetCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => back3nd_password_resetCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => back3nd_password_resetWhereUniqueInputSchema),z.lazy(() => back3nd_password_resetWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const back3nd_user_roleCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.back3nd_user_roleCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => back3nd_user_roleCreateWithoutUserInputSchema),z.lazy(() => back3nd_user_roleCreateWithoutUserInputSchema).array(),z.lazy(() => back3nd_user_roleUncheckedCreateWithoutUserInputSchema),z.lazy(() => back3nd_user_roleUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => back3nd_user_roleCreateOrConnectWithoutUserInputSchema),z.lazy(() => back3nd_user_roleCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => back3nd_user_roleCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => back3nd_user_roleWhereUniqueInputSchema),z.lazy(() => back3nd_user_roleWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const back3nd_password_resetUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.back3nd_password_resetUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => back3nd_password_resetCreateWithoutUserInputSchema),z.lazy(() => back3nd_password_resetCreateWithoutUserInputSchema).array(),z.lazy(() => back3nd_password_resetUncheckedCreateWithoutUserInputSchema),z.lazy(() => back3nd_password_resetUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => back3nd_password_resetCreateOrConnectWithoutUserInputSchema),z.lazy(() => back3nd_password_resetCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => back3nd_password_resetCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => back3nd_password_resetWhereUniqueInputSchema),z.lazy(() => back3nd_password_resetWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const back3nd_user_roleUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.back3nd_user_roleUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => back3nd_user_roleCreateWithoutUserInputSchema),z.lazy(() => back3nd_user_roleCreateWithoutUserInputSchema).array(),z.lazy(() => back3nd_user_roleUncheckedCreateWithoutUserInputSchema),z.lazy(() => back3nd_user_roleUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => back3nd_user_roleCreateOrConnectWithoutUserInputSchema),z.lazy(() => back3nd_user_roleCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => back3nd_user_roleCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => back3nd_user_roleWhereUniqueInputSchema),z.lazy(() => back3nd_user_roleWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const back3nd_password_resetUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.back3nd_password_resetUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => back3nd_password_resetCreateWithoutUserInputSchema),z.lazy(() => back3nd_password_resetCreateWithoutUserInputSchema).array(),z.lazy(() => back3nd_password_resetUncheckedCreateWithoutUserInputSchema),z.lazy(() => back3nd_password_resetUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => back3nd_password_resetCreateOrConnectWithoutUserInputSchema),z.lazy(() => back3nd_password_resetCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => back3nd_password_resetUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => back3nd_password_resetUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => back3nd_password_resetCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => back3nd_password_resetWhereUniqueInputSchema),z.lazy(() => back3nd_password_resetWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => back3nd_password_resetWhereUniqueInputSchema),z.lazy(() => back3nd_password_resetWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => back3nd_password_resetWhereUniqueInputSchema),z.lazy(() => back3nd_password_resetWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => back3nd_password_resetWhereUniqueInputSchema),z.lazy(() => back3nd_password_resetWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => back3nd_password_resetUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => back3nd_password_resetUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => back3nd_password_resetUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => back3nd_password_resetUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => back3nd_password_resetScalarWhereInputSchema),z.lazy(() => back3nd_password_resetScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const back3nd_user_roleUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.back3nd_user_roleUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => back3nd_user_roleCreateWithoutUserInputSchema),z.lazy(() => back3nd_user_roleCreateWithoutUserInputSchema).array(),z.lazy(() => back3nd_user_roleUncheckedCreateWithoutUserInputSchema),z.lazy(() => back3nd_user_roleUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => back3nd_user_roleCreateOrConnectWithoutUserInputSchema),z.lazy(() => back3nd_user_roleCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => back3nd_user_roleUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => back3nd_user_roleUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => back3nd_user_roleCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => back3nd_user_roleWhereUniqueInputSchema),z.lazy(() => back3nd_user_roleWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => back3nd_user_roleWhereUniqueInputSchema),z.lazy(() => back3nd_user_roleWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => back3nd_user_roleWhereUniqueInputSchema),z.lazy(() => back3nd_user_roleWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => back3nd_user_roleWhereUniqueInputSchema),z.lazy(() => back3nd_user_roleWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => back3nd_user_roleUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => back3nd_user_roleUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => back3nd_user_roleUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => back3nd_user_roleUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => back3nd_user_roleScalarWhereInputSchema),z.lazy(() => back3nd_user_roleScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const back3nd_password_resetUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.back3nd_password_resetUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => back3nd_password_resetCreateWithoutUserInputSchema),z.lazy(() => back3nd_password_resetCreateWithoutUserInputSchema).array(),z.lazy(() => back3nd_password_resetUncheckedCreateWithoutUserInputSchema),z.lazy(() => back3nd_password_resetUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => back3nd_password_resetCreateOrConnectWithoutUserInputSchema),z.lazy(() => back3nd_password_resetCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => back3nd_password_resetUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => back3nd_password_resetUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => back3nd_password_resetCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => back3nd_password_resetWhereUniqueInputSchema),z.lazy(() => back3nd_password_resetWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => back3nd_password_resetWhereUniqueInputSchema),z.lazy(() => back3nd_password_resetWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => back3nd_password_resetWhereUniqueInputSchema),z.lazy(() => back3nd_password_resetWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => back3nd_password_resetWhereUniqueInputSchema),z.lazy(() => back3nd_password_resetWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => back3nd_password_resetUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => back3nd_password_resetUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => back3nd_password_resetUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => back3nd_password_resetUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => back3nd_password_resetScalarWhereInputSchema),z.lazy(() => back3nd_password_resetScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const back3nd_user_roleUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.back3nd_user_roleUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => back3nd_user_roleCreateWithoutUserInputSchema),z.lazy(() => back3nd_user_roleCreateWithoutUserInputSchema).array(),z.lazy(() => back3nd_user_roleUncheckedCreateWithoutUserInputSchema),z.lazy(() => back3nd_user_roleUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => back3nd_user_roleCreateOrConnectWithoutUserInputSchema),z.lazy(() => back3nd_user_roleCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => back3nd_user_roleUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => back3nd_user_roleUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => back3nd_user_roleCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => back3nd_user_roleWhereUniqueInputSchema),z.lazy(() => back3nd_user_roleWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => back3nd_user_roleWhereUniqueInputSchema),z.lazy(() => back3nd_user_roleWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => back3nd_user_roleWhereUniqueInputSchema),z.lazy(() => back3nd_user_roleWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => back3nd_user_roleWhereUniqueInputSchema),z.lazy(() => back3nd_user_roleWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => back3nd_user_roleUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => back3nd_user_roleUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => back3nd_user_roleUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => back3nd_user_roleUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => back3nd_user_roleScalarWhereInputSchema),z.lazy(() => back3nd_user_roleScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const back3nd_permissionCreateNestedManyWithoutRoleInputSchema: z.ZodType<Prisma.back3nd_permissionCreateNestedManyWithoutRoleInput> = z.object({
  create: z.union([ z.lazy(() => back3nd_permissionCreateWithoutRoleInputSchema),z.lazy(() => back3nd_permissionCreateWithoutRoleInputSchema).array(),z.lazy(() => back3nd_permissionUncheckedCreateWithoutRoleInputSchema),z.lazy(() => back3nd_permissionUncheckedCreateWithoutRoleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => back3nd_permissionCreateOrConnectWithoutRoleInputSchema),z.lazy(() => back3nd_permissionCreateOrConnectWithoutRoleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => back3nd_permissionCreateManyRoleInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => back3nd_permissionWhereUniqueInputSchema),z.lazy(() => back3nd_permissionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const back3nd_user_roleCreateNestedManyWithoutRoleInputSchema: z.ZodType<Prisma.back3nd_user_roleCreateNestedManyWithoutRoleInput> = z.object({
  create: z.union([ z.lazy(() => back3nd_user_roleCreateWithoutRoleInputSchema),z.lazy(() => back3nd_user_roleCreateWithoutRoleInputSchema).array(),z.lazy(() => back3nd_user_roleUncheckedCreateWithoutRoleInputSchema),z.lazy(() => back3nd_user_roleUncheckedCreateWithoutRoleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => back3nd_user_roleCreateOrConnectWithoutRoleInputSchema),z.lazy(() => back3nd_user_roleCreateOrConnectWithoutRoleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => back3nd_user_roleCreateManyRoleInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => back3nd_user_roleWhereUniqueInputSchema),z.lazy(() => back3nd_user_roleWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const back3nd_permissionUncheckedCreateNestedManyWithoutRoleInputSchema: z.ZodType<Prisma.back3nd_permissionUncheckedCreateNestedManyWithoutRoleInput> = z.object({
  create: z.union([ z.lazy(() => back3nd_permissionCreateWithoutRoleInputSchema),z.lazy(() => back3nd_permissionCreateWithoutRoleInputSchema).array(),z.lazy(() => back3nd_permissionUncheckedCreateWithoutRoleInputSchema),z.lazy(() => back3nd_permissionUncheckedCreateWithoutRoleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => back3nd_permissionCreateOrConnectWithoutRoleInputSchema),z.lazy(() => back3nd_permissionCreateOrConnectWithoutRoleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => back3nd_permissionCreateManyRoleInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => back3nd_permissionWhereUniqueInputSchema),z.lazy(() => back3nd_permissionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const back3nd_user_roleUncheckedCreateNestedManyWithoutRoleInputSchema: z.ZodType<Prisma.back3nd_user_roleUncheckedCreateNestedManyWithoutRoleInput> = z.object({
  create: z.union([ z.lazy(() => back3nd_user_roleCreateWithoutRoleInputSchema),z.lazy(() => back3nd_user_roleCreateWithoutRoleInputSchema).array(),z.lazy(() => back3nd_user_roleUncheckedCreateWithoutRoleInputSchema),z.lazy(() => back3nd_user_roleUncheckedCreateWithoutRoleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => back3nd_user_roleCreateOrConnectWithoutRoleInputSchema),z.lazy(() => back3nd_user_roleCreateOrConnectWithoutRoleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => back3nd_user_roleCreateManyRoleInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => back3nd_user_roleWhereUniqueInputSchema),z.lazy(() => back3nd_user_roleWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const back3nd_permissionUpdateManyWithoutRoleNestedInputSchema: z.ZodType<Prisma.back3nd_permissionUpdateManyWithoutRoleNestedInput> = z.object({
  create: z.union([ z.lazy(() => back3nd_permissionCreateWithoutRoleInputSchema),z.lazy(() => back3nd_permissionCreateWithoutRoleInputSchema).array(),z.lazy(() => back3nd_permissionUncheckedCreateWithoutRoleInputSchema),z.lazy(() => back3nd_permissionUncheckedCreateWithoutRoleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => back3nd_permissionCreateOrConnectWithoutRoleInputSchema),z.lazy(() => back3nd_permissionCreateOrConnectWithoutRoleInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => back3nd_permissionUpsertWithWhereUniqueWithoutRoleInputSchema),z.lazy(() => back3nd_permissionUpsertWithWhereUniqueWithoutRoleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => back3nd_permissionCreateManyRoleInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => back3nd_permissionWhereUniqueInputSchema),z.lazy(() => back3nd_permissionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => back3nd_permissionWhereUniqueInputSchema),z.lazy(() => back3nd_permissionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => back3nd_permissionWhereUniqueInputSchema),z.lazy(() => back3nd_permissionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => back3nd_permissionWhereUniqueInputSchema),z.lazy(() => back3nd_permissionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => back3nd_permissionUpdateWithWhereUniqueWithoutRoleInputSchema),z.lazy(() => back3nd_permissionUpdateWithWhereUniqueWithoutRoleInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => back3nd_permissionUpdateManyWithWhereWithoutRoleInputSchema),z.lazy(() => back3nd_permissionUpdateManyWithWhereWithoutRoleInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => back3nd_permissionScalarWhereInputSchema),z.lazy(() => back3nd_permissionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const back3nd_user_roleUpdateManyWithoutRoleNestedInputSchema: z.ZodType<Prisma.back3nd_user_roleUpdateManyWithoutRoleNestedInput> = z.object({
  create: z.union([ z.lazy(() => back3nd_user_roleCreateWithoutRoleInputSchema),z.lazy(() => back3nd_user_roleCreateWithoutRoleInputSchema).array(),z.lazy(() => back3nd_user_roleUncheckedCreateWithoutRoleInputSchema),z.lazy(() => back3nd_user_roleUncheckedCreateWithoutRoleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => back3nd_user_roleCreateOrConnectWithoutRoleInputSchema),z.lazy(() => back3nd_user_roleCreateOrConnectWithoutRoleInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => back3nd_user_roleUpsertWithWhereUniqueWithoutRoleInputSchema),z.lazy(() => back3nd_user_roleUpsertWithWhereUniqueWithoutRoleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => back3nd_user_roleCreateManyRoleInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => back3nd_user_roleWhereUniqueInputSchema),z.lazy(() => back3nd_user_roleWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => back3nd_user_roleWhereUniqueInputSchema),z.lazy(() => back3nd_user_roleWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => back3nd_user_roleWhereUniqueInputSchema),z.lazy(() => back3nd_user_roleWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => back3nd_user_roleWhereUniqueInputSchema),z.lazy(() => back3nd_user_roleWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => back3nd_user_roleUpdateWithWhereUniqueWithoutRoleInputSchema),z.lazy(() => back3nd_user_roleUpdateWithWhereUniqueWithoutRoleInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => back3nd_user_roleUpdateManyWithWhereWithoutRoleInputSchema),z.lazy(() => back3nd_user_roleUpdateManyWithWhereWithoutRoleInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => back3nd_user_roleScalarWhereInputSchema),z.lazy(() => back3nd_user_roleScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const back3nd_permissionUncheckedUpdateManyWithoutRoleNestedInputSchema: z.ZodType<Prisma.back3nd_permissionUncheckedUpdateManyWithoutRoleNestedInput> = z.object({
  create: z.union([ z.lazy(() => back3nd_permissionCreateWithoutRoleInputSchema),z.lazy(() => back3nd_permissionCreateWithoutRoleInputSchema).array(),z.lazy(() => back3nd_permissionUncheckedCreateWithoutRoleInputSchema),z.lazy(() => back3nd_permissionUncheckedCreateWithoutRoleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => back3nd_permissionCreateOrConnectWithoutRoleInputSchema),z.lazy(() => back3nd_permissionCreateOrConnectWithoutRoleInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => back3nd_permissionUpsertWithWhereUniqueWithoutRoleInputSchema),z.lazy(() => back3nd_permissionUpsertWithWhereUniqueWithoutRoleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => back3nd_permissionCreateManyRoleInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => back3nd_permissionWhereUniqueInputSchema),z.lazy(() => back3nd_permissionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => back3nd_permissionWhereUniqueInputSchema),z.lazy(() => back3nd_permissionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => back3nd_permissionWhereUniqueInputSchema),z.lazy(() => back3nd_permissionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => back3nd_permissionWhereUniqueInputSchema),z.lazy(() => back3nd_permissionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => back3nd_permissionUpdateWithWhereUniqueWithoutRoleInputSchema),z.lazy(() => back3nd_permissionUpdateWithWhereUniqueWithoutRoleInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => back3nd_permissionUpdateManyWithWhereWithoutRoleInputSchema),z.lazy(() => back3nd_permissionUpdateManyWithWhereWithoutRoleInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => back3nd_permissionScalarWhereInputSchema),z.lazy(() => back3nd_permissionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const back3nd_user_roleUncheckedUpdateManyWithoutRoleNestedInputSchema: z.ZodType<Prisma.back3nd_user_roleUncheckedUpdateManyWithoutRoleNestedInput> = z.object({
  create: z.union([ z.lazy(() => back3nd_user_roleCreateWithoutRoleInputSchema),z.lazy(() => back3nd_user_roleCreateWithoutRoleInputSchema).array(),z.lazy(() => back3nd_user_roleUncheckedCreateWithoutRoleInputSchema),z.lazy(() => back3nd_user_roleUncheckedCreateWithoutRoleInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => back3nd_user_roleCreateOrConnectWithoutRoleInputSchema),z.lazy(() => back3nd_user_roleCreateOrConnectWithoutRoleInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => back3nd_user_roleUpsertWithWhereUniqueWithoutRoleInputSchema),z.lazy(() => back3nd_user_roleUpsertWithWhereUniqueWithoutRoleInputSchema).array() ]).optional(),
  createMany: z.lazy(() => back3nd_user_roleCreateManyRoleInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => back3nd_user_roleWhereUniqueInputSchema),z.lazy(() => back3nd_user_roleWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => back3nd_user_roleWhereUniqueInputSchema),z.lazy(() => back3nd_user_roleWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => back3nd_user_roleWhereUniqueInputSchema),z.lazy(() => back3nd_user_roleWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => back3nd_user_roleWhereUniqueInputSchema),z.lazy(() => back3nd_user_roleWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => back3nd_user_roleUpdateWithWhereUniqueWithoutRoleInputSchema),z.lazy(() => back3nd_user_roleUpdateWithWhereUniqueWithoutRoleInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => back3nd_user_roleUpdateManyWithWhereWithoutRoleInputSchema),z.lazy(() => back3nd_user_roleUpdateManyWithWhereWithoutRoleInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => back3nd_user_roleScalarWhereInputSchema),z.lazy(() => back3nd_user_roleScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const back3nd_roleCreateNestedOneWithoutUsersInputSchema: z.ZodType<Prisma.back3nd_roleCreateNestedOneWithoutUsersInput> = z.object({
  create: z.union([ z.lazy(() => back3nd_roleCreateWithoutUsersInputSchema),z.lazy(() => back3nd_roleUncheckedCreateWithoutUsersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => back3nd_roleCreateOrConnectWithoutUsersInputSchema).optional(),
  connect: z.lazy(() => back3nd_roleWhereUniqueInputSchema).optional()
}).strict();

export const back3nd_userCreateNestedOneWithoutRolesInputSchema: z.ZodType<Prisma.back3nd_userCreateNestedOneWithoutRolesInput> = z.object({
  create: z.union([ z.lazy(() => back3nd_userCreateWithoutRolesInputSchema),z.lazy(() => back3nd_userUncheckedCreateWithoutRolesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => back3nd_userCreateOrConnectWithoutRolesInputSchema).optional(),
  connect: z.lazy(() => back3nd_userWhereUniqueInputSchema).optional()
}).strict();

export const back3nd_roleUpdateOneRequiredWithoutUsersNestedInputSchema: z.ZodType<Prisma.back3nd_roleUpdateOneRequiredWithoutUsersNestedInput> = z.object({
  create: z.union([ z.lazy(() => back3nd_roleCreateWithoutUsersInputSchema),z.lazy(() => back3nd_roleUncheckedCreateWithoutUsersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => back3nd_roleCreateOrConnectWithoutUsersInputSchema).optional(),
  upsert: z.lazy(() => back3nd_roleUpsertWithoutUsersInputSchema).optional(),
  connect: z.lazy(() => back3nd_roleWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => back3nd_roleUpdateToOneWithWhereWithoutUsersInputSchema),z.lazy(() => back3nd_roleUpdateWithoutUsersInputSchema),z.lazy(() => back3nd_roleUncheckedUpdateWithoutUsersInputSchema) ]).optional(),
}).strict();

export const back3nd_userUpdateOneRequiredWithoutRolesNestedInputSchema: z.ZodType<Prisma.back3nd_userUpdateOneRequiredWithoutRolesNestedInput> = z.object({
  create: z.union([ z.lazy(() => back3nd_userCreateWithoutRolesInputSchema),z.lazy(() => back3nd_userUncheckedCreateWithoutRolesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => back3nd_userCreateOrConnectWithoutRolesInputSchema).optional(),
  upsert: z.lazy(() => back3nd_userUpsertWithoutRolesInputSchema).optional(),
  connect: z.lazy(() => back3nd_userWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => back3nd_userUpdateToOneWithWhereWithoutRolesInputSchema),z.lazy(() => back3nd_userUpdateWithoutRolesInputSchema),z.lazy(() => back3nd_userUncheckedUpdateWithoutRolesInputSchema) ]).optional(),
}).strict();

export const back3nd_roleCreateNestedOneWithoutPermissionsInputSchema: z.ZodType<Prisma.back3nd_roleCreateNestedOneWithoutPermissionsInput> = z.object({
  create: z.union([ z.lazy(() => back3nd_roleCreateWithoutPermissionsInputSchema),z.lazy(() => back3nd_roleUncheckedCreateWithoutPermissionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => back3nd_roleCreateOrConnectWithoutPermissionsInputSchema).optional(),
  connect: z.lazy(() => back3nd_roleWhereUniqueInputSchema).optional()
}).strict();

export const back3nd_entityCreateNestedOneWithoutBack3nd_permissionInputSchema: z.ZodType<Prisma.back3nd_entityCreateNestedOneWithoutBack3nd_permissionInput> = z.object({
  create: z.union([ z.lazy(() => back3nd_entityCreateWithoutBack3nd_permissionInputSchema),z.lazy(() => back3nd_entityUncheckedCreateWithoutBack3nd_permissionInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => back3nd_entityCreateOrConnectWithoutBack3nd_permissionInputSchema).optional(),
  connect: z.lazy(() => back3nd_entityWhereUniqueInputSchema).optional()
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const back3nd_roleUpdateOneRequiredWithoutPermissionsNestedInputSchema: z.ZodType<Prisma.back3nd_roleUpdateOneRequiredWithoutPermissionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => back3nd_roleCreateWithoutPermissionsInputSchema),z.lazy(() => back3nd_roleUncheckedCreateWithoutPermissionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => back3nd_roleCreateOrConnectWithoutPermissionsInputSchema).optional(),
  upsert: z.lazy(() => back3nd_roleUpsertWithoutPermissionsInputSchema).optional(),
  connect: z.lazy(() => back3nd_roleWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => back3nd_roleUpdateToOneWithWhereWithoutPermissionsInputSchema),z.lazy(() => back3nd_roleUpdateWithoutPermissionsInputSchema),z.lazy(() => back3nd_roleUncheckedUpdateWithoutPermissionsInputSchema) ]).optional(),
}).strict();

export const back3nd_entityUpdateOneRequiredWithoutBack3nd_permissionNestedInputSchema: z.ZodType<Prisma.back3nd_entityUpdateOneRequiredWithoutBack3nd_permissionNestedInput> = z.object({
  create: z.union([ z.lazy(() => back3nd_entityCreateWithoutBack3nd_permissionInputSchema),z.lazy(() => back3nd_entityUncheckedCreateWithoutBack3nd_permissionInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => back3nd_entityCreateOrConnectWithoutBack3nd_permissionInputSchema).optional(),
  upsert: z.lazy(() => back3nd_entityUpsertWithoutBack3nd_permissionInputSchema).optional(),
  connect: z.lazy(() => back3nd_entityWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => back3nd_entityUpdateToOneWithWhereWithoutBack3nd_permissionInputSchema),z.lazy(() => back3nd_entityUpdateWithoutBack3nd_permissionInputSchema),z.lazy(() => back3nd_entityUncheckedUpdateWithoutBack3nd_permissionInputSchema) ]).optional(),
}).strict();

export const back3nd_entity_fieldsCreateNestedManyWithoutBack3nd_entityInputSchema: z.ZodType<Prisma.back3nd_entity_fieldsCreateNestedManyWithoutBack3nd_entityInput> = z.object({
  create: z.union([ z.lazy(() => back3nd_entity_fieldsCreateWithoutBack3nd_entityInputSchema),z.lazy(() => back3nd_entity_fieldsCreateWithoutBack3nd_entityInputSchema).array(),z.lazy(() => back3nd_entity_fieldsUncheckedCreateWithoutBack3nd_entityInputSchema),z.lazy(() => back3nd_entity_fieldsUncheckedCreateWithoutBack3nd_entityInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => back3nd_entity_fieldsCreateOrConnectWithoutBack3nd_entityInputSchema),z.lazy(() => back3nd_entity_fieldsCreateOrConnectWithoutBack3nd_entityInputSchema).array() ]).optional(),
  createMany: z.lazy(() => back3nd_entity_fieldsCreateManyBack3nd_entityInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => back3nd_entity_fieldsWhereUniqueInputSchema),z.lazy(() => back3nd_entity_fieldsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const back3nd_permissionCreateNestedManyWithoutTableInputSchema: z.ZodType<Prisma.back3nd_permissionCreateNestedManyWithoutTableInput> = z.object({
  create: z.union([ z.lazy(() => back3nd_permissionCreateWithoutTableInputSchema),z.lazy(() => back3nd_permissionCreateWithoutTableInputSchema).array(),z.lazy(() => back3nd_permissionUncheckedCreateWithoutTableInputSchema),z.lazy(() => back3nd_permissionUncheckedCreateWithoutTableInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => back3nd_permissionCreateOrConnectWithoutTableInputSchema),z.lazy(() => back3nd_permissionCreateOrConnectWithoutTableInputSchema).array() ]).optional(),
  createMany: z.lazy(() => back3nd_permissionCreateManyTableInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => back3nd_permissionWhereUniqueInputSchema),z.lazy(() => back3nd_permissionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const back3nd_entity_fieldsUncheckedCreateNestedManyWithoutBack3nd_entityInputSchema: z.ZodType<Prisma.back3nd_entity_fieldsUncheckedCreateNestedManyWithoutBack3nd_entityInput> = z.object({
  create: z.union([ z.lazy(() => back3nd_entity_fieldsCreateWithoutBack3nd_entityInputSchema),z.lazy(() => back3nd_entity_fieldsCreateWithoutBack3nd_entityInputSchema).array(),z.lazy(() => back3nd_entity_fieldsUncheckedCreateWithoutBack3nd_entityInputSchema),z.lazy(() => back3nd_entity_fieldsUncheckedCreateWithoutBack3nd_entityInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => back3nd_entity_fieldsCreateOrConnectWithoutBack3nd_entityInputSchema),z.lazy(() => back3nd_entity_fieldsCreateOrConnectWithoutBack3nd_entityInputSchema).array() ]).optional(),
  createMany: z.lazy(() => back3nd_entity_fieldsCreateManyBack3nd_entityInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => back3nd_entity_fieldsWhereUniqueInputSchema),z.lazy(() => back3nd_entity_fieldsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const back3nd_permissionUncheckedCreateNestedManyWithoutTableInputSchema: z.ZodType<Prisma.back3nd_permissionUncheckedCreateNestedManyWithoutTableInput> = z.object({
  create: z.union([ z.lazy(() => back3nd_permissionCreateWithoutTableInputSchema),z.lazy(() => back3nd_permissionCreateWithoutTableInputSchema).array(),z.lazy(() => back3nd_permissionUncheckedCreateWithoutTableInputSchema),z.lazy(() => back3nd_permissionUncheckedCreateWithoutTableInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => back3nd_permissionCreateOrConnectWithoutTableInputSchema),z.lazy(() => back3nd_permissionCreateOrConnectWithoutTableInputSchema).array() ]).optional(),
  createMany: z.lazy(() => back3nd_permissionCreateManyTableInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => back3nd_permissionWhereUniqueInputSchema),z.lazy(() => back3nd_permissionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const back3nd_entity_fieldsUpdateManyWithoutBack3nd_entityNestedInputSchema: z.ZodType<Prisma.back3nd_entity_fieldsUpdateManyWithoutBack3nd_entityNestedInput> = z.object({
  create: z.union([ z.lazy(() => back3nd_entity_fieldsCreateWithoutBack3nd_entityInputSchema),z.lazy(() => back3nd_entity_fieldsCreateWithoutBack3nd_entityInputSchema).array(),z.lazy(() => back3nd_entity_fieldsUncheckedCreateWithoutBack3nd_entityInputSchema),z.lazy(() => back3nd_entity_fieldsUncheckedCreateWithoutBack3nd_entityInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => back3nd_entity_fieldsCreateOrConnectWithoutBack3nd_entityInputSchema),z.lazy(() => back3nd_entity_fieldsCreateOrConnectWithoutBack3nd_entityInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => back3nd_entity_fieldsUpsertWithWhereUniqueWithoutBack3nd_entityInputSchema),z.lazy(() => back3nd_entity_fieldsUpsertWithWhereUniqueWithoutBack3nd_entityInputSchema).array() ]).optional(),
  createMany: z.lazy(() => back3nd_entity_fieldsCreateManyBack3nd_entityInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => back3nd_entity_fieldsWhereUniqueInputSchema),z.lazy(() => back3nd_entity_fieldsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => back3nd_entity_fieldsWhereUniqueInputSchema),z.lazy(() => back3nd_entity_fieldsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => back3nd_entity_fieldsWhereUniqueInputSchema),z.lazy(() => back3nd_entity_fieldsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => back3nd_entity_fieldsWhereUniqueInputSchema),z.lazy(() => back3nd_entity_fieldsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => back3nd_entity_fieldsUpdateWithWhereUniqueWithoutBack3nd_entityInputSchema),z.lazy(() => back3nd_entity_fieldsUpdateWithWhereUniqueWithoutBack3nd_entityInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => back3nd_entity_fieldsUpdateManyWithWhereWithoutBack3nd_entityInputSchema),z.lazy(() => back3nd_entity_fieldsUpdateManyWithWhereWithoutBack3nd_entityInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => back3nd_entity_fieldsScalarWhereInputSchema),z.lazy(() => back3nd_entity_fieldsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const back3nd_permissionUpdateManyWithoutTableNestedInputSchema: z.ZodType<Prisma.back3nd_permissionUpdateManyWithoutTableNestedInput> = z.object({
  create: z.union([ z.lazy(() => back3nd_permissionCreateWithoutTableInputSchema),z.lazy(() => back3nd_permissionCreateWithoutTableInputSchema).array(),z.lazy(() => back3nd_permissionUncheckedCreateWithoutTableInputSchema),z.lazy(() => back3nd_permissionUncheckedCreateWithoutTableInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => back3nd_permissionCreateOrConnectWithoutTableInputSchema),z.lazy(() => back3nd_permissionCreateOrConnectWithoutTableInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => back3nd_permissionUpsertWithWhereUniqueWithoutTableInputSchema),z.lazy(() => back3nd_permissionUpsertWithWhereUniqueWithoutTableInputSchema).array() ]).optional(),
  createMany: z.lazy(() => back3nd_permissionCreateManyTableInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => back3nd_permissionWhereUniqueInputSchema),z.lazy(() => back3nd_permissionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => back3nd_permissionWhereUniqueInputSchema),z.lazy(() => back3nd_permissionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => back3nd_permissionWhereUniqueInputSchema),z.lazy(() => back3nd_permissionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => back3nd_permissionWhereUniqueInputSchema),z.lazy(() => back3nd_permissionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => back3nd_permissionUpdateWithWhereUniqueWithoutTableInputSchema),z.lazy(() => back3nd_permissionUpdateWithWhereUniqueWithoutTableInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => back3nd_permissionUpdateManyWithWhereWithoutTableInputSchema),z.lazy(() => back3nd_permissionUpdateManyWithWhereWithoutTableInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => back3nd_permissionScalarWhereInputSchema),z.lazy(() => back3nd_permissionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const back3nd_entity_fieldsUncheckedUpdateManyWithoutBack3nd_entityNestedInputSchema: z.ZodType<Prisma.back3nd_entity_fieldsUncheckedUpdateManyWithoutBack3nd_entityNestedInput> = z.object({
  create: z.union([ z.lazy(() => back3nd_entity_fieldsCreateWithoutBack3nd_entityInputSchema),z.lazy(() => back3nd_entity_fieldsCreateWithoutBack3nd_entityInputSchema).array(),z.lazy(() => back3nd_entity_fieldsUncheckedCreateWithoutBack3nd_entityInputSchema),z.lazy(() => back3nd_entity_fieldsUncheckedCreateWithoutBack3nd_entityInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => back3nd_entity_fieldsCreateOrConnectWithoutBack3nd_entityInputSchema),z.lazy(() => back3nd_entity_fieldsCreateOrConnectWithoutBack3nd_entityInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => back3nd_entity_fieldsUpsertWithWhereUniqueWithoutBack3nd_entityInputSchema),z.lazy(() => back3nd_entity_fieldsUpsertWithWhereUniqueWithoutBack3nd_entityInputSchema).array() ]).optional(),
  createMany: z.lazy(() => back3nd_entity_fieldsCreateManyBack3nd_entityInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => back3nd_entity_fieldsWhereUniqueInputSchema),z.lazy(() => back3nd_entity_fieldsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => back3nd_entity_fieldsWhereUniqueInputSchema),z.lazy(() => back3nd_entity_fieldsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => back3nd_entity_fieldsWhereUniqueInputSchema),z.lazy(() => back3nd_entity_fieldsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => back3nd_entity_fieldsWhereUniqueInputSchema),z.lazy(() => back3nd_entity_fieldsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => back3nd_entity_fieldsUpdateWithWhereUniqueWithoutBack3nd_entityInputSchema),z.lazy(() => back3nd_entity_fieldsUpdateWithWhereUniqueWithoutBack3nd_entityInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => back3nd_entity_fieldsUpdateManyWithWhereWithoutBack3nd_entityInputSchema),z.lazy(() => back3nd_entity_fieldsUpdateManyWithWhereWithoutBack3nd_entityInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => back3nd_entity_fieldsScalarWhereInputSchema),z.lazy(() => back3nd_entity_fieldsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const back3nd_permissionUncheckedUpdateManyWithoutTableNestedInputSchema: z.ZodType<Prisma.back3nd_permissionUncheckedUpdateManyWithoutTableNestedInput> = z.object({
  create: z.union([ z.lazy(() => back3nd_permissionCreateWithoutTableInputSchema),z.lazy(() => back3nd_permissionCreateWithoutTableInputSchema).array(),z.lazy(() => back3nd_permissionUncheckedCreateWithoutTableInputSchema),z.lazy(() => back3nd_permissionUncheckedCreateWithoutTableInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => back3nd_permissionCreateOrConnectWithoutTableInputSchema),z.lazy(() => back3nd_permissionCreateOrConnectWithoutTableInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => back3nd_permissionUpsertWithWhereUniqueWithoutTableInputSchema),z.lazy(() => back3nd_permissionUpsertWithWhereUniqueWithoutTableInputSchema).array() ]).optional(),
  createMany: z.lazy(() => back3nd_permissionCreateManyTableInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => back3nd_permissionWhereUniqueInputSchema),z.lazy(() => back3nd_permissionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => back3nd_permissionWhereUniqueInputSchema),z.lazy(() => back3nd_permissionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => back3nd_permissionWhereUniqueInputSchema),z.lazy(() => back3nd_permissionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => back3nd_permissionWhereUniqueInputSchema),z.lazy(() => back3nd_permissionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => back3nd_permissionUpdateWithWhereUniqueWithoutTableInputSchema),z.lazy(() => back3nd_permissionUpdateWithWhereUniqueWithoutTableInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => back3nd_permissionUpdateManyWithWhereWithoutTableInputSchema),z.lazy(() => back3nd_permissionUpdateManyWithWhereWithoutTableInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => back3nd_permissionScalarWhereInputSchema),z.lazy(() => back3nd_permissionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const back3nd_entityCreateNestedOneWithoutBack3nd_entity_fieldsInputSchema: z.ZodType<Prisma.back3nd_entityCreateNestedOneWithoutBack3nd_entity_fieldsInput> = z.object({
  create: z.union([ z.lazy(() => back3nd_entityCreateWithoutBack3nd_entity_fieldsInputSchema),z.lazy(() => back3nd_entityUncheckedCreateWithoutBack3nd_entity_fieldsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => back3nd_entityCreateOrConnectWithoutBack3nd_entity_fieldsInputSchema).optional(),
  connect: z.lazy(() => back3nd_entityWhereUniqueInputSchema).optional()
}).strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const back3nd_entityUpdateOneRequiredWithoutBack3nd_entity_fieldsNestedInputSchema: z.ZodType<Prisma.back3nd_entityUpdateOneRequiredWithoutBack3nd_entity_fieldsNestedInput> = z.object({
  create: z.union([ z.lazy(() => back3nd_entityCreateWithoutBack3nd_entity_fieldsInputSchema),z.lazy(() => back3nd_entityUncheckedCreateWithoutBack3nd_entity_fieldsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => back3nd_entityCreateOrConnectWithoutBack3nd_entity_fieldsInputSchema).optional(),
  upsert: z.lazy(() => back3nd_entityUpsertWithoutBack3nd_entity_fieldsInputSchema).optional(),
  connect: z.lazy(() => back3nd_entityWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => back3nd_entityUpdateToOneWithWhereWithoutBack3nd_entity_fieldsInputSchema),z.lazy(() => back3nd_entityUpdateWithoutBack3nd_entity_fieldsInputSchema),z.lazy(() => back3nd_entityUncheckedUpdateWithoutBack3nd_entity_fieldsInputSchema) ]).optional(),
}).strict();

export const back3nd_userCreateNestedOneWithoutBack3nd_password_resetInputSchema: z.ZodType<Prisma.back3nd_userCreateNestedOneWithoutBack3nd_password_resetInput> = z.object({
  create: z.union([ z.lazy(() => back3nd_userCreateWithoutBack3nd_password_resetInputSchema),z.lazy(() => back3nd_userUncheckedCreateWithoutBack3nd_password_resetInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => back3nd_userCreateOrConnectWithoutBack3nd_password_resetInputSchema).optional(),
  connect: z.lazy(() => back3nd_userWhereUniqueInputSchema).optional()
}).strict();

export const back3nd_userUpdateOneRequiredWithoutBack3nd_password_resetNestedInputSchema: z.ZodType<Prisma.back3nd_userUpdateOneRequiredWithoutBack3nd_password_resetNestedInput> = z.object({
  create: z.union([ z.lazy(() => back3nd_userCreateWithoutBack3nd_password_resetInputSchema),z.lazy(() => back3nd_userUncheckedCreateWithoutBack3nd_password_resetInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => back3nd_userCreateOrConnectWithoutBack3nd_password_resetInputSchema).optional(),
  upsert: z.lazy(() => back3nd_userUpsertWithoutBack3nd_password_resetInputSchema).optional(),
  connect: z.lazy(() => back3nd_userWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => back3nd_userUpdateToOneWithWhereWithoutBack3nd_password_resetInputSchema),z.lazy(() => back3nd_userUpdateWithoutBack3nd_password_resetInputSchema),z.lazy(() => back3nd_userUncheckedUpdateWithoutBack3nd_password_resetInputSchema) ]).optional(),
}).strict();

export const NestedUuidFilterSchema: z.ZodType<Prisma.NestedUuidFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  search: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidFilterSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  search: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  search: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedUuidWithAggregatesFilterSchema: z.ZodType<Prisma.NestedUuidWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  search: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  search: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  search: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedFloatWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const NestedEnumNewsStatusFilterSchema: z.ZodType<Prisma.NestedEnumNewsStatusFilter> = z.object({
  equals: z.lazy(() => NewsStatusSchema).optional(),
  in: z.lazy(() => NewsStatusSchema).array().optional(),
  notIn: z.lazy(() => NewsStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => NewsStatusSchema),z.lazy(() => NestedEnumNewsStatusFilterSchema) ]).optional(),
}).strict();

export const NestedUuidNullableFilterSchema: z.ZodType<Prisma.NestedUuidNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  search: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumNewsStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumNewsStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => NewsStatusSchema).optional(),
  in: z.lazy(() => NewsStatusSchema).array().optional(),
  notIn: z.lazy(() => NewsStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => NewsStatusSchema),z.lazy(() => NestedEnumNewsStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumNewsStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumNewsStatusFilterSchema).optional()
}).strict();

export const NestedUuidNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedUuidNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  search: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NewsCreateWithoutCategoryInputSchema: z.ZodType<Prisma.NewsCreateWithoutCategoryInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  content: z.string(),
  publishedAt: z.coerce.date().optional(),
  status: z.lazy(() => NewsStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tags: z.lazy(() => TagCreateNestedManyWithoutNewsInputSchema).optional()
}).strict();

export const NewsUncheckedCreateWithoutCategoryInputSchema: z.ZodType<Prisma.NewsUncheckedCreateWithoutCategoryInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  content: z.string(),
  publishedAt: z.coerce.date().optional(),
  status: z.lazy(() => NewsStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tags: z.lazy(() => TagUncheckedCreateNestedManyWithoutNewsInputSchema).optional()
}).strict();

export const NewsCreateOrConnectWithoutCategoryInputSchema: z.ZodType<Prisma.NewsCreateOrConnectWithoutCategoryInput> = z.object({
  where: z.lazy(() => NewsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => NewsCreateWithoutCategoryInputSchema),z.lazy(() => NewsUncheckedCreateWithoutCategoryInputSchema) ]),
}).strict();

export const NewsCreateManyCategoryInputEnvelopeSchema: z.ZodType<Prisma.NewsCreateManyCategoryInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => NewsCreateManyCategoryInputSchema),z.lazy(() => NewsCreateManyCategoryInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const NewsUpsertWithWhereUniqueWithoutCategoryInputSchema: z.ZodType<Prisma.NewsUpsertWithWhereUniqueWithoutCategoryInput> = z.object({
  where: z.lazy(() => NewsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => NewsUpdateWithoutCategoryInputSchema),z.lazy(() => NewsUncheckedUpdateWithoutCategoryInputSchema) ]),
  create: z.union([ z.lazy(() => NewsCreateWithoutCategoryInputSchema),z.lazy(() => NewsUncheckedCreateWithoutCategoryInputSchema) ]),
}).strict();

export const NewsUpdateWithWhereUniqueWithoutCategoryInputSchema: z.ZodType<Prisma.NewsUpdateWithWhereUniqueWithoutCategoryInput> = z.object({
  where: z.lazy(() => NewsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => NewsUpdateWithoutCategoryInputSchema),z.lazy(() => NewsUncheckedUpdateWithoutCategoryInputSchema) ]),
}).strict();

export const NewsUpdateManyWithWhereWithoutCategoryInputSchema: z.ZodType<Prisma.NewsUpdateManyWithWhereWithoutCategoryInput> = z.object({
  where: z.lazy(() => NewsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => NewsUpdateManyMutationInputSchema),z.lazy(() => NewsUncheckedUpdateManyWithoutCategoryInputSchema) ]),
}).strict();

export const NewsScalarWhereInputSchema: z.ZodType<Prisma.NewsScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => NewsScalarWhereInputSchema),z.lazy(() => NewsScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => NewsScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NewsScalarWhereInputSchema),z.lazy(() => NewsScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  publishedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  status: z.union([ z.lazy(() => EnumNewsStatusFilterSchema),z.lazy(() => NewsStatusSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  categoryId: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const NewsCreateWithoutTagsInputSchema: z.ZodType<Prisma.NewsCreateWithoutTagsInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  content: z.string(),
  publishedAt: z.coerce.date().optional(),
  status: z.lazy(() => NewsStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  category: z.lazy(() => CategoryCreateNestedOneWithoutNewsInputSchema).optional()
}).strict();

export const NewsUncheckedCreateWithoutTagsInputSchema: z.ZodType<Prisma.NewsUncheckedCreateWithoutTagsInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  content: z.string(),
  publishedAt: z.coerce.date().optional(),
  status: z.lazy(() => NewsStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  categoryId: z.string().optional().nullable()
}).strict();

export const NewsCreateOrConnectWithoutTagsInputSchema: z.ZodType<Prisma.NewsCreateOrConnectWithoutTagsInput> = z.object({
  where: z.lazy(() => NewsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => NewsCreateWithoutTagsInputSchema),z.lazy(() => NewsUncheckedCreateWithoutTagsInputSchema) ]),
}).strict();

export const NewsUpsertWithWhereUniqueWithoutTagsInputSchema: z.ZodType<Prisma.NewsUpsertWithWhereUniqueWithoutTagsInput> = z.object({
  where: z.lazy(() => NewsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => NewsUpdateWithoutTagsInputSchema),z.lazy(() => NewsUncheckedUpdateWithoutTagsInputSchema) ]),
  create: z.union([ z.lazy(() => NewsCreateWithoutTagsInputSchema),z.lazy(() => NewsUncheckedCreateWithoutTagsInputSchema) ]),
}).strict();

export const NewsUpdateWithWhereUniqueWithoutTagsInputSchema: z.ZodType<Prisma.NewsUpdateWithWhereUniqueWithoutTagsInput> = z.object({
  where: z.lazy(() => NewsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => NewsUpdateWithoutTagsInputSchema),z.lazy(() => NewsUncheckedUpdateWithoutTagsInputSchema) ]),
}).strict();

export const NewsUpdateManyWithWhereWithoutTagsInputSchema: z.ZodType<Prisma.NewsUpdateManyWithWhereWithoutTagsInput> = z.object({
  where: z.lazy(() => NewsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => NewsUpdateManyMutationInputSchema),z.lazy(() => NewsUncheckedUpdateManyWithoutTagsInputSchema) ]),
}).strict();

export const CategoryCreateWithoutNewsInputSchema: z.ZodType<Prisma.CategoryCreateWithoutNewsInput> = z.object({
  id: z.string().optional(),
  name: z.string()
}).strict();

export const CategoryUncheckedCreateWithoutNewsInputSchema: z.ZodType<Prisma.CategoryUncheckedCreateWithoutNewsInput> = z.object({
  id: z.string().optional(),
  name: z.string()
}).strict();

export const CategoryCreateOrConnectWithoutNewsInputSchema: z.ZodType<Prisma.CategoryCreateOrConnectWithoutNewsInput> = z.object({
  where: z.lazy(() => CategoryWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CategoryCreateWithoutNewsInputSchema),z.lazy(() => CategoryUncheckedCreateWithoutNewsInputSchema) ]),
}).strict();

export const TagCreateWithoutNewsInputSchema: z.ZodType<Prisma.TagCreateWithoutNewsInput> = z.object({
  id: z.string().optional(),
  name: z.string()
}).strict();

export const TagUncheckedCreateWithoutNewsInputSchema: z.ZodType<Prisma.TagUncheckedCreateWithoutNewsInput> = z.object({
  id: z.string().optional(),
  name: z.string()
}).strict();

export const TagCreateOrConnectWithoutNewsInputSchema: z.ZodType<Prisma.TagCreateOrConnectWithoutNewsInput> = z.object({
  where: z.lazy(() => TagWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TagCreateWithoutNewsInputSchema),z.lazy(() => TagUncheckedCreateWithoutNewsInputSchema) ]),
}).strict();

export const CategoryUpsertWithoutNewsInputSchema: z.ZodType<Prisma.CategoryUpsertWithoutNewsInput> = z.object({
  update: z.union([ z.lazy(() => CategoryUpdateWithoutNewsInputSchema),z.lazy(() => CategoryUncheckedUpdateWithoutNewsInputSchema) ]),
  create: z.union([ z.lazy(() => CategoryCreateWithoutNewsInputSchema),z.lazy(() => CategoryUncheckedCreateWithoutNewsInputSchema) ]),
  where: z.lazy(() => CategoryWhereInputSchema).optional()
}).strict();

export const CategoryUpdateToOneWithWhereWithoutNewsInputSchema: z.ZodType<Prisma.CategoryUpdateToOneWithWhereWithoutNewsInput> = z.object({
  where: z.lazy(() => CategoryWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CategoryUpdateWithoutNewsInputSchema),z.lazy(() => CategoryUncheckedUpdateWithoutNewsInputSchema) ]),
}).strict();

export const CategoryUpdateWithoutNewsInputSchema: z.ZodType<Prisma.CategoryUpdateWithoutNewsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CategoryUncheckedUpdateWithoutNewsInputSchema: z.ZodType<Prisma.CategoryUncheckedUpdateWithoutNewsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TagUpsertWithWhereUniqueWithoutNewsInputSchema: z.ZodType<Prisma.TagUpsertWithWhereUniqueWithoutNewsInput> = z.object({
  where: z.lazy(() => TagWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TagUpdateWithoutNewsInputSchema),z.lazy(() => TagUncheckedUpdateWithoutNewsInputSchema) ]),
  create: z.union([ z.lazy(() => TagCreateWithoutNewsInputSchema),z.lazy(() => TagUncheckedCreateWithoutNewsInputSchema) ]),
}).strict();

export const TagUpdateWithWhereUniqueWithoutNewsInputSchema: z.ZodType<Prisma.TagUpdateWithWhereUniqueWithoutNewsInput> = z.object({
  where: z.lazy(() => TagWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TagUpdateWithoutNewsInputSchema),z.lazy(() => TagUncheckedUpdateWithoutNewsInputSchema) ]),
}).strict();

export const TagUpdateManyWithWhereWithoutNewsInputSchema: z.ZodType<Prisma.TagUpdateManyWithWhereWithoutNewsInput> = z.object({
  where: z.lazy(() => TagScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TagUpdateManyMutationInputSchema),z.lazy(() => TagUncheckedUpdateManyWithoutNewsInputSchema) ]),
}).strict();

export const TagScalarWhereInputSchema: z.ZodType<Prisma.TagScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TagScalarWhereInputSchema),z.lazy(() => TagScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TagScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TagScalarWhereInputSchema),z.lazy(() => TagScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const back3nd_password_resetCreateWithoutUserInputSchema: z.ZodType<Prisma.back3nd_password_resetCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  token: z.string(),
  created_at: z.coerce.date().optional(),
  expires_at: z.coerce.date()
}).strict();

export const back3nd_password_resetUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.back3nd_password_resetUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  token: z.string(),
  created_at: z.coerce.date().optional(),
  expires_at: z.coerce.date()
}).strict();

export const back3nd_password_resetCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.back3nd_password_resetCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => back3nd_password_resetWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => back3nd_password_resetCreateWithoutUserInputSchema),z.lazy(() => back3nd_password_resetUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const back3nd_password_resetCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.back3nd_password_resetCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => back3nd_password_resetCreateManyUserInputSchema),z.lazy(() => back3nd_password_resetCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const back3nd_user_roleCreateWithoutUserInputSchema: z.ZodType<Prisma.back3nd_user_roleCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  created_at: z.coerce.date().optional(),
  role: z.lazy(() => back3nd_roleCreateNestedOneWithoutUsersInputSchema)
}).strict();

export const back3nd_user_roleUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.back3nd_user_roleUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().optional(),
  role_id: z.string(),
  created_at: z.coerce.date().optional()
}).strict();

export const back3nd_user_roleCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.back3nd_user_roleCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => back3nd_user_roleWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => back3nd_user_roleCreateWithoutUserInputSchema),z.lazy(() => back3nd_user_roleUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const back3nd_user_roleCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.back3nd_user_roleCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => back3nd_user_roleCreateManyUserInputSchema),z.lazy(() => back3nd_user_roleCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const back3nd_password_resetUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.back3nd_password_resetUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => back3nd_password_resetWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => back3nd_password_resetUpdateWithoutUserInputSchema),z.lazy(() => back3nd_password_resetUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => back3nd_password_resetCreateWithoutUserInputSchema),z.lazy(() => back3nd_password_resetUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const back3nd_password_resetUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.back3nd_password_resetUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => back3nd_password_resetWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => back3nd_password_resetUpdateWithoutUserInputSchema),z.lazy(() => back3nd_password_resetUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const back3nd_password_resetUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.back3nd_password_resetUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => back3nd_password_resetScalarWhereInputSchema),
  data: z.union([ z.lazy(() => back3nd_password_resetUpdateManyMutationInputSchema),z.lazy(() => back3nd_password_resetUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const back3nd_password_resetScalarWhereInputSchema: z.ZodType<Prisma.back3nd_password_resetScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => back3nd_password_resetScalarWhereInputSchema),z.lazy(() => back3nd_password_resetScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => back3nd_password_resetScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => back3nd_password_resetScalarWhereInputSchema),z.lazy(() => back3nd_password_resetScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  expires_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const back3nd_user_roleUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.back3nd_user_roleUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => back3nd_user_roleWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => back3nd_user_roleUpdateWithoutUserInputSchema),z.lazy(() => back3nd_user_roleUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => back3nd_user_roleCreateWithoutUserInputSchema),z.lazy(() => back3nd_user_roleUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const back3nd_user_roleUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.back3nd_user_roleUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => back3nd_user_roleWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => back3nd_user_roleUpdateWithoutUserInputSchema),z.lazy(() => back3nd_user_roleUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const back3nd_user_roleUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.back3nd_user_roleUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => back3nd_user_roleScalarWhereInputSchema),
  data: z.union([ z.lazy(() => back3nd_user_roleUpdateManyMutationInputSchema),z.lazy(() => back3nd_user_roleUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const back3nd_user_roleScalarWhereInputSchema: z.ZodType<Prisma.back3nd_user_roleScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => back3nd_user_roleScalarWhereInputSchema),z.lazy(() => back3nd_user_roleScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => back3nd_user_roleScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => back3nd_user_roleScalarWhereInputSchema),z.lazy(() => back3nd_user_roleScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  role_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const back3nd_permissionCreateWithoutRoleInputSchema: z.ZodType<Prisma.back3nd_permissionCreateWithoutRoleInput> = z.object({
  id: z.string().optional(),
  can_create: z.boolean().optional(),
  can_read: z.boolean().optional(),
  can_update: z.boolean().optional(),
  can_delete: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  table: z.lazy(() => back3nd_entityCreateNestedOneWithoutBack3nd_permissionInputSchema)
}).strict();

export const back3nd_permissionUncheckedCreateWithoutRoleInputSchema: z.ZodType<Prisma.back3nd_permissionUncheckedCreateWithoutRoleInput> = z.object({
  id: z.string().optional(),
  table_id: z.string(),
  can_create: z.boolean().optional(),
  can_read: z.boolean().optional(),
  can_update: z.boolean().optional(),
  can_delete: z.boolean().optional(),
  created_at: z.coerce.date().optional()
}).strict();

export const back3nd_permissionCreateOrConnectWithoutRoleInputSchema: z.ZodType<Prisma.back3nd_permissionCreateOrConnectWithoutRoleInput> = z.object({
  where: z.lazy(() => back3nd_permissionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => back3nd_permissionCreateWithoutRoleInputSchema),z.lazy(() => back3nd_permissionUncheckedCreateWithoutRoleInputSchema) ]),
}).strict();

export const back3nd_permissionCreateManyRoleInputEnvelopeSchema: z.ZodType<Prisma.back3nd_permissionCreateManyRoleInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => back3nd_permissionCreateManyRoleInputSchema),z.lazy(() => back3nd_permissionCreateManyRoleInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const back3nd_user_roleCreateWithoutRoleInputSchema: z.ZodType<Prisma.back3nd_user_roleCreateWithoutRoleInput> = z.object({
  id: z.string().optional(),
  created_at: z.coerce.date().optional(),
  user: z.lazy(() => back3nd_userCreateNestedOneWithoutRolesInputSchema)
}).strict();

export const back3nd_user_roleUncheckedCreateWithoutRoleInputSchema: z.ZodType<Prisma.back3nd_user_roleUncheckedCreateWithoutRoleInput> = z.object({
  id: z.string().optional(),
  user_id: z.string(),
  created_at: z.coerce.date().optional()
}).strict();

export const back3nd_user_roleCreateOrConnectWithoutRoleInputSchema: z.ZodType<Prisma.back3nd_user_roleCreateOrConnectWithoutRoleInput> = z.object({
  where: z.lazy(() => back3nd_user_roleWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => back3nd_user_roleCreateWithoutRoleInputSchema),z.lazy(() => back3nd_user_roleUncheckedCreateWithoutRoleInputSchema) ]),
}).strict();

export const back3nd_user_roleCreateManyRoleInputEnvelopeSchema: z.ZodType<Prisma.back3nd_user_roleCreateManyRoleInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => back3nd_user_roleCreateManyRoleInputSchema),z.lazy(() => back3nd_user_roleCreateManyRoleInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const back3nd_permissionUpsertWithWhereUniqueWithoutRoleInputSchema: z.ZodType<Prisma.back3nd_permissionUpsertWithWhereUniqueWithoutRoleInput> = z.object({
  where: z.lazy(() => back3nd_permissionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => back3nd_permissionUpdateWithoutRoleInputSchema),z.lazy(() => back3nd_permissionUncheckedUpdateWithoutRoleInputSchema) ]),
  create: z.union([ z.lazy(() => back3nd_permissionCreateWithoutRoleInputSchema),z.lazy(() => back3nd_permissionUncheckedCreateWithoutRoleInputSchema) ]),
}).strict();

export const back3nd_permissionUpdateWithWhereUniqueWithoutRoleInputSchema: z.ZodType<Prisma.back3nd_permissionUpdateWithWhereUniqueWithoutRoleInput> = z.object({
  where: z.lazy(() => back3nd_permissionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => back3nd_permissionUpdateWithoutRoleInputSchema),z.lazy(() => back3nd_permissionUncheckedUpdateWithoutRoleInputSchema) ]),
}).strict();

export const back3nd_permissionUpdateManyWithWhereWithoutRoleInputSchema: z.ZodType<Prisma.back3nd_permissionUpdateManyWithWhereWithoutRoleInput> = z.object({
  where: z.lazy(() => back3nd_permissionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => back3nd_permissionUpdateManyMutationInputSchema),z.lazy(() => back3nd_permissionUncheckedUpdateManyWithoutRoleInputSchema) ]),
}).strict();

export const back3nd_permissionScalarWhereInputSchema: z.ZodType<Prisma.back3nd_permissionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => back3nd_permissionScalarWhereInputSchema),z.lazy(() => back3nd_permissionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => back3nd_permissionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => back3nd_permissionScalarWhereInputSchema),z.lazy(() => back3nd_permissionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  role_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  table_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  can_create: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  can_read: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  can_update: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  can_delete: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const back3nd_user_roleUpsertWithWhereUniqueWithoutRoleInputSchema: z.ZodType<Prisma.back3nd_user_roleUpsertWithWhereUniqueWithoutRoleInput> = z.object({
  where: z.lazy(() => back3nd_user_roleWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => back3nd_user_roleUpdateWithoutRoleInputSchema),z.lazy(() => back3nd_user_roleUncheckedUpdateWithoutRoleInputSchema) ]),
  create: z.union([ z.lazy(() => back3nd_user_roleCreateWithoutRoleInputSchema),z.lazy(() => back3nd_user_roleUncheckedCreateWithoutRoleInputSchema) ]),
}).strict();

export const back3nd_user_roleUpdateWithWhereUniqueWithoutRoleInputSchema: z.ZodType<Prisma.back3nd_user_roleUpdateWithWhereUniqueWithoutRoleInput> = z.object({
  where: z.lazy(() => back3nd_user_roleWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => back3nd_user_roleUpdateWithoutRoleInputSchema),z.lazy(() => back3nd_user_roleUncheckedUpdateWithoutRoleInputSchema) ]),
}).strict();

export const back3nd_user_roleUpdateManyWithWhereWithoutRoleInputSchema: z.ZodType<Prisma.back3nd_user_roleUpdateManyWithWhereWithoutRoleInput> = z.object({
  where: z.lazy(() => back3nd_user_roleScalarWhereInputSchema),
  data: z.union([ z.lazy(() => back3nd_user_roleUpdateManyMutationInputSchema),z.lazy(() => back3nd_user_roleUncheckedUpdateManyWithoutRoleInputSchema) ]),
}).strict();

export const back3nd_roleCreateWithoutUsersInputSchema: z.ZodType<Prisma.back3nd_roleCreateWithoutUsersInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  permissions: z.lazy(() => back3nd_permissionCreateNestedManyWithoutRoleInputSchema).optional()
}).strict();

export const back3nd_roleUncheckedCreateWithoutUsersInputSchema: z.ZodType<Prisma.back3nd_roleUncheckedCreateWithoutUsersInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  permissions: z.lazy(() => back3nd_permissionUncheckedCreateNestedManyWithoutRoleInputSchema).optional()
}).strict();

export const back3nd_roleCreateOrConnectWithoutUsersInputSchema: z.ZodType<Prisma.back3nd_roleCreateOrConnectWithoutUsersInput> = z.object({
  where: z.lazy(() => back3nd_roleWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => back3nd_roleCreateWithoutUsersInputSchema),z.lazy(() => back3nd_roleUncheckedCreateWithoutUsersInputSchema) ]),
}).strict();

export const back3nd_userCreateWithoutRolesInputSchema: z.ZodType<Prisma.back3nd_userCreateWithoutRolesInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  reset_token: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  back3nd_password_reset: z.lazy(() => back3nd_password_resetCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const back3nd_userUncheckedCreateWithoutRolesInputSchema: z.ZodType<Prisma.back3nd_userUncheckedCreateWithoutRolesInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  reset_token: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  back3nd_password_reset: z.lazy(() => back3nd_password_resetUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const back3nd_userCreateOrConnectWithoutRolesInputSchema: z.ZodType<Prisma.back3nd_userCreateOrConnectWithoutRolesInput> = z.object({
  where: z.lazy(() => back3nd_userWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => back3nd_userCreateWithoutRolesInputSchema),z.lazy(() => back3nd_userUncheckedCreateWithoutRolesInputSchema) ]),
}).strict();

export const back3nd_roleUpsertWithoutUsersInputSchema: z.ZodType<Prisma.back3nd_roleUpsertWithoutUsersInput> = z.object({
  update: z.union([ z.lazy(() => back3nd_roleUpdateWithoutUsersInputSchema),z.lazy(() => back3nd_roleUncheckedUpdateWithoutUsersInputSchema) ]),
  create: z.union([ z.lazy(() => back3nd_roleCreateWithoutUsersInputSchema),z.lazy(() => back3nd_roleUncheckedCreateWithoutUsersInputSchema) ]),
  where: z.lazy(() => back3nd_roleWhereInputSchema).optional()
}).strict();

export const back3nd_roleUpdateToOneWithWhereWithoutUsersInputSchema: z.ZodType<Prisma.back3nd_roleUpdateToOneWithWhereWithoutUsersInput> = z.object({
  where: z.lazy(() => back3nd_roleWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => back3nd_roleUpdateWithoutUsersInputSchema),z.lazy(() => back3nd_roleUncheckedUpdateWithoutUsersInputSchema) ]),
}).strict();

export const back3nd_roleUpdateWithoutUsersInputSchema: z.ZodType<Prisma.back3nd_roleUpdateWithoutUsersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  permissions: z.lazy(() => back3nd_permissionUpdateManyWithoutRoleNestedInputSchema).optional()
}).strict();

export const back3nd_roleUncheckedUpdateWithoutUsersInputSchema: z.ZodType<Prisma.back3nd_roleUncheckedUpdateWithoutUsersInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  permissions: z.lazy(() => back3nd_permissionUncheckedUpdateManyWithoutRoleNestedInputSchema).optional()
}).strict();

export const back3nd_userUpsertWithoutRolesInputSchema: z.ZodType<Prisma.back3nd_userUpsertWithoutRolesInput> = z.object({
  update: z.union([ z.lazy(() => back3nd_userUpdateWithoutRolesInputSchema),z.lazy(() => back3nd_userUncheckedUpdateWithoutRolesInputSchema) ]),
  create: z.union([ z.lazy(() => back3nd_userCreateWithoutRolesInputSchema),z.lazy(() => back3nd_userUncheckedCreateWithoutRolesInputSchema) ]),
  where: z.lazy(() => back3nd_userWhereInputSchema).optional()
}).strict();

export const back3nd_userUpdateToOneWithWhereWithoutRolesInputSchema: z.ZodType<Prisma.back3nd_userUpdateToOneWithWhereWithoutRolesInput> = z.object({
  where: z.lazy(() => back3nd_userWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => back3nd_userUpdateWithoutRolesInputSchema),z.lazy(() => back3nd_userUncheckedUpdateWithoutRolesInputSchema) ]),
}).strict();

export const back3nd_userUpdateWithoutRolesInputSchema: z.ZodType<Prisma.back3nd_userUpdateWithoutRolesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reset_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  back3nd_password_reset: z.lazy(() => back3nd_password_resetUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const back3nd_userUncheckedUpdateWithoutRolesInputSchema: z.ZodType<Prisma.back3nd_userUncheckedUpdateWithoutRolesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reset_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  back3nd_password_reset: z.lazy(() => back3nd_password_resetUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const back3nd_roleCreateWithoutPermissionsInputSchema: z.ZodType<Prisma.back3nd_roleCreateWithoutPermissionsInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  users: z.lazy(() => back3nd_user_roleCreateNestedManyWithoutRoleInputSchema).optional()
}).strict();

export const back3nd_roleUncheckedCreateWithoutPermissionsInputSchema: z.ZodType<Prisma.back3nd_roleUncheckedCreateWithoutPermissionsInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  users: z.lazy(() => back3nd_user_roleUncheckedCreateNestedManyWithoutRoleInputSchema).optional()
}).strict();

export const back3nd_roleCreateOrConnectWithoutPermissionsInputSchema: z.ZodType<Prisma.back3nd_roleCreateOrConnectWithoutPermissionsInput> = z.object({
  where: z.lazy(() => back3nd_roleWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => back3nd_roleCreateWithoutPermissionsInputSchema),z.lazy(() => back3nd_roleUncheckedCreateWithoutPermissionsInputSchema) ]),
}).strict();

export const back3nd_entityCreateWithoutBack3nd_permissionInputSchema: z.ZodType<Prisma.back3nd_entityCreateWithoutBack3nd_permissionInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  back3nd_entity_fields: z.lazy(() => back3nd_entity_fieldsCreateNestedManyWithoutBack3nd_entityInputSchema).optional()
}).strict();

export const back3nd_entityUncheckedCreateWithoutBack3nd_permissionInputSchema: z.ZodType<Prisma.back3nd_entityUncheckedCreateWithoutBack3nd_permissionInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  back3nd_entity_fields: z.lazy(() => back3nd_entity_fieldsUncheckedCreateNestedManyWithoutBack3nd_entityInputSchema).optional()
}).strict();

export const back3nd_entityCreateOrConnectWithoutBack3nd_permissionInputSchema: z.ZodType<Prisma.back3nd_entityCreateOrConnectWithoutBack3nd_permissionInput> = z.object({
  where: z.lazy(() => back3nd_entityWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => back3nd_entityCreateWithoutBack3nd_permissionInputSchema),z.lazy(() => back3nd_entityUncheckedCreateWithoutBack3nd_permissionInputSchema) ]),
}).strict();

export const back3nd_roleUpsertWithoutPermissionsInputSchema: z.ZodType<Prisma.back3nd_roleUpsertWithoutPermissionsInput> = z.object({
  update: z.union([ z.lazy(() => back3nd_roleUpdateWithoutPermissionsInputSchema),z.lazy(() => back3nd_roleUncheckedUpdateWithoutPermissionsInputSchema) ]),
  create: z.union([ z.lazy(() => back3nd_roleCreateWithoutPermissionsInputSchema),z.lazy(() => back3nd_roleUncheckedCreateWithoutPermissionsInputSchema) ]),
  where: z.lazy(() => back3nd_roleWhereInputSchema).optional()
}).strict();

export const back3nd_roleUpdateToOneWithWhereWithoutPermissionsInputSchema: z.ZodType<Prisma.back3nd_roleUpdateToOneWithWhereWithoutPermissionsInput> = z.object({
  where: z.lazy(() => back3nd_roleWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => back3nd_roleUpdateWithoutPermissionsInputSchema),z.lazy(() => back3nd_roleUncheckedUpdateWithoutPermissionsInputSchema) ]),
}).strict();

export const back3nd_roleUpdateWithoutPermissionsInputSchema: z.ZodType<Prisma.back3nd_roleUpdateWithoutPermissionsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => back3nd_user_roleUpdateManyWithoutRoleNestedInputSchema).optional()
}).strict();

export const back3nd_roleUncheckedUpdateWithoutPermissionsInputSchema: z.ZodType<Prisma.back3nd_roleUncheckedUpdateWithoutPermissionsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => back3nd_user_roleUncheckedUpdateManyWithoutRoleNestedInputSchema).optional()
}).strict();

export const back3nd_entityUpsertWithoutBack3nd_permissionInputSchema: z.ZodType<Prisma.back3nd_entityUpsertWithoutBack3nd_permissionInput> = z.object({
  update: z.union([ z.lazy(() => back3nd_entityUpdateWithoutBack3nd_permissionInputSchema),z.lazy(() => back3nd_entityUncheckedUpdateWithoutBack3nd_permissionInputSchema) ]),
  create: z.union([ z.lazy(() => back3nd_entityCreateWithoutBack3nd_permissionInputSchema),z.lazy(() => back3nd_entityUncheckedCreateWithoutBack3nd_permissionInputSchema) ]),
  where: z.lazy(() => back3nd_entityWhereInputSchema).optional()
}).strict();

export const back3nd_entityUpdateToOneWithWhereWithoutBack3nd_permissionInputSchema: z.ZodType<Prisma.back3nd_entityUpdateToOneWithWhereWithoutBack3nd_permissionInput> = z.object({
  where: z.lazy(() => back3nd_entityWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => back3nd_entityUpdateWithoutBack3nd_permissionInputSchema),z.lazy(() => back3nd_entityUncheckedUpdateWithoutBack3nd_permissionInputSchema) ]),
}).strict();

export const back3nd_entityUpdateWithoutBack3nd_permissionInputSchema: z.ZodType<Prisma.back3nd_entityUpdateWithoutBack3nd_permissionInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  back3nd_entity_fields: z.lazy(() => back3nd_entity_fieldsUpdateManyWithoutBack3nd_entityNestedInputSchema).optional()
}).strict();

export const back3nd_entityUncheckedUpdateWithoutBack3nd_permissionInputSchema: z.ZodType<Prisma.back3nd_entityUncheckedUpdateWithoutBack3nd_permissionInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  back3nd_entity_fields: z.lazy(() => back3nd_entity_fieldsUncheckedUpdateManyWithoutBack3nd_entityNestedInputSchema).optional()
}).strict();

export const back3nd_entity_fieldsCreateWithoutBack3nd_entityInputSchema: z.ZodType<Prisma.back3nd_entity_fieldsCreateWithoutBack3nd_entityInput> = z.object({
  id: z.string().optional(),
  columnName: z.string(),
  columnType: z.string(),
  size: z.number().int().optional().nullable(),
  placeholder: z.string().optional().nullable(),
  defaultValue: z.string().optional().nullable(),
  isUnique: z.boolean(),
  created_at: z.coerce.date().optional()
}).strict();

export const back3nd_entity_fieldsUncheckedCreateWithoutBack3nd_entityInputSchema: z.ZodType<Prisma.back3nd_entity_fieldsUncheckedCreateWithoutBack3nd_entityInput> = z.object({
  id: z.string().optional(),
  columnName: z.string(),
  columnType: z.string(),
  size: z.number().int().optional().nullable(),
  placeholder: z.string().optional().nullable(),
  defaultValue: z.string().optional().nullable(),
  isUnique: z.boolean(),
  created_at: z.coerce.date().optional()
}).strict();

export const back3nd_entity_fieldsCreateOrConnectWithoutBack3nd_entityInputSchema: z.ZodType<Prisma.back3nd_entity_fieldsCreateOrConnectWithoutBack3nd_entityInput> = z.object({
  where: z.lazy(() => back3nd_entity_fieldsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => back3nd_entity_fieldsCreateWithoutBack3nd_entityInputSchema),z.lazy(() => back3nd_entity_fieldsUncheckedCreateWithoutBack3nd_entityInputSchema) ]),
}).strict();

export const back3nd_entity_fieldsCreateManyBack3nd_entityInputEnvelopeSchema: z.ZodType<Prisma.back3nd_entity_fieldsCreateManyBack3nd_entityInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => back3nd_entity_fieldsCreateManyBack3nd_entityInputSchema),z.lazy(() => back3nd_entity_fieldsCreateManyBack3nd_entityInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const back3nd_permissionCreateWithoutTableInputSchema: z.ZodType<Prisma.back3nd_permissionCreateWithoutTableInput> = z.object({
  id: z.string().optional(),
  can_create: z.boolean().optional(),
  can_read: z.boolean().optional(),
  can_update: z.boolean().optional(),
  can_delete: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  role: z.lazy(() => back3nd_roleCreateNestedOneWithoutPermissionsInputSchema)
}).strict();

export const back3nd_permissionUncheckedCreateWithoutTableInputSchema: z.ZodType<Prisma.back3nd_permissionUncheckedCreateWithoutTableInput> = z.object({
  id: z.string().optional(),
  role_id: z.string(),
  can_create: z.boolean().optional(),
  can_read: z.boolean().optional(),
  can_update: z.boolean().optional(),
  can_delete: z.boolean().optional(),
  created_at: z.coerce.date().optional()
}).strict();

export const back3nd_permissionCreateOrConnectWithoutTableInputSchema: z.ZodType<Prisma.back3nd_permissionCreateOrConnectWithoutTableInput> = z.object({
  where: z.lazy(() => back3nd_permissionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => back3nd_permissionCreateWithoutTableInputSchema),z.lazy(() => back3nd_permissionUncheckedCreateWithoutTableInputSchema) ]),
}).strict();

export const back3nd_permissionCreateManyTableInputEnvelopeSchema: z.ZodType<Prisma.back3nd_permissionCreateManyTableInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => back3nd_permissionCreateManyTableInputSchema),z.lazy(() => back3nd_permissionCreateManyTableInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const back3nd_entity_fieldsUpsertWithWhereUniqueWithoutBack3nd_entityInputSchema: z.ZodType<Prisma.back3nd_entity_fieldsUpsertWithWhereUniqueWithoutBack3nd_entityInput> = z.object({
  where: z.lazy(() => back3nd_entity_fieldsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => back3nd_entity_fieldsUpdateWithoutBack3nd_entityInputSchema),z.lazy(() => back3nd_entity_fieldsUncheckedUpdateWithoutBack3nd_entityInputSchema) ]),
  create: z.union([ z.lazy(() => back3nd_entity_fieldsCreateWithoutBack3nd_entityInputSchema),z.lazy(() => back3nd_entity_fieldsUncheckedCreateWithoutBack3nd_entityInputSchema) ]),
}).strict();

export const back3nd_entity_fieldsUpdateWithWhereUniqueWithoutBack3nd_entityInputSchema: z.ZodType<Prisma.back3nd_entity_fieldsUpdateWithWhereUniqueWithoutBack3nd_entityInput> = z.object({
  where: z.lazy(() => back3nd_entity_fieldsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => back3nd_entity_fieldsUpdateWithoutBack3nd_entityInputSchema),z.lazy(() => back3nd_entity_fieldsUncheckedUpdateWithoutBack3nd_entityInputSchema) ]),
}).strict();

export const back3nd_entity_fieldsUpdateManyWithWhereWithoutBack3nd_entityInputSchema: z.ZodType<Prisma.back3nd_entity_fieldsUpdateManyWithWhereWithoutBack3nd_entityInput> = z.object({
  where: z.lazy(() => back3nd_entity_fieldsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => back3nd_entity_fieldsUpdateManyMutationInputSchema),z.lazy(() => back3nd_entity_fieldsUncheckedUpdateManyWithoutBack3nd_entityInputSchema) ]),
}).strict();

export const back3nd_entity_fieldsScalarWhereInputSchema: z.ZodType<Prisma.back3nd_entity_fieldsScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => back3nd_entity_fieldsScalarWhereInputSchema),z.lazy(() => back3nd_entity_fieldsScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => back3nd_entity_fieldsScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => back3nd_entity_fieldsScalarWhereInputSchema),z.lazy(() => back3nd_entity_fieldsScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  columnName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  columnType: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  size: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  placeholder: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  defaultValue: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  isUnique: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  entity_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const back3nd_permissionUpsertWithWhereUniqueWithoutTableInputSchema: z.ZodType<Prisma.back3nd_permissionUpsertWithWhereUniqueWithoutTableInput> = z.object({
  where: z.lazy(() => back3nd_permissionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => back3nd_permissionUpdateWithoutTableInputSchema),z.lazy(() => back3nd_permissionUncheckedUpdateWithoutTableInputSchema) ]),
  create: z.union([ z.lazy(() => back3nd_permissionCreateWithoutTableInputSchema),z.lazy(() => back3nd_permissionUncheckedCreateWithoutTableInputSchema) ]),
}).strict();

export const back3nd_permissionUpdateWithWhereUniqueWithoutTableInputSchema: z.ZodType<Prisma.back3nd_permissionUpdateWithWhereUniqueWithoutTableInput> = z.object({
  where: z.lazy(() => back3nd_permissionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => back3nd_permissionUpdateWithoutTableInputSchema),z.lazy(() => back3nd_permissionUncheckedUpdateWithoutTableInputSchema) ]),
}).strict();

export const back3nd_permissionUpdateManyWithWhereWithoutTableInputSchema: z.ZodType<Prisma.back3nd_permissionUpdateManyWithWhereWithoutTableInput> = z.object({
  where: z.lazy(() => back3nd_permissionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => back3nd_permissionUpdateManyMutationInputSchema),z.lazy(() => back3nd_permissionUncheckedUpdateManyWithoutTableInputSchema) ]),
}).strict();

export const back3nd_entityCreateWithoutBack3nd_entity_fieldsInputSchema: z.ZodType<Prisma.back3nd_entityCreateWithoutBack3nd_entity_fieldsInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  back3nd_permission: z.lazy(() => back3nd_permissionCreateNestedManyWithoutTableInputSchema).optional()
}).strict();

export const back3nd_entityUncheckedCreateWithoutBack3nd_entity_fieldsInputSchema: z.ZodType<Prisma.back3nd_entityUncheckedCreateWithoutBack3nd_entity_fieldsInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  back3nd_permission: z.lazy(() => back3nd_permissionUncheckedCreateNestedManyWithoutTableInputSchema).optional()
}).strict();

export const back3nd_entityCreateOrConnectWithoutBack3nd_entity_fieldsInputSchema: z.ZodType<Prisma.back3nd_entityCreateOrConnectWithoutBack3nd_entity_fieldsInput> = z.object({
  where: z.lazy(() => back3nd_entityWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => back3nd_entityCreateWithoutBack3nd_entity_fieldsInputSchema),z.lazy(() => back3nd_entityUncheckedCreateWithoutBack3nd_entity_fieldsInputSchema) ]),
}).strict();

export const back3nd_entityUpsertWithoutBack3nd_entity_fieldsInputSchema: z.ZodType<Prisma.back3nd_entityUpsertWithoutBack3nd_entity_fieldsInput> = z.object({
  update: z.union([ z.lazy(() => back3nd_entityUpdateWithoutBack3nd_entity_fieldsInputSchema),z.lazy(() => back3nd_entityUncheckedUpdateWithoutBack3nd_entity_fieldsInputSchema) ]),
  create: z.union([ z.lazy(() => back3nd_entityCreateWithoutBack3nd_entity_fieldsInputSchema),z.lazy(() => back3nd_entityUncheckedCreateWithoutBack3nd_entity_fieldsInputSchema) ]),
  where: z.lazy(() => back3nd_entityWhereInputSchema).optional()
}).strict();

export const back3nd_entityUpdateToOneWithWhereWithoutBack3nd_entity_fieldsInputSchema: z.ZodType<Prisma.back3nd_entityUpdateToOneWithWhereWithoutBack3nd_entity_fieldsInput> = z.object({
  where: z.lazy(() => back3nd_entityWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => back3nd_entityUpdateWithoutBack3nd_entity_fieldsInputSchema),z.lazy(() => back3nd_entityUncheckedUpdateWithoutBack3nd_entity_fieldsInputSchema) ]),
}).strict();

export const back3nd_entityUpdateWithoutBack3nd_entity_fieldsInputSchema: z.ZodType<Prisma.back3nd_entityUpdateWithoutBack3nd_entity_fieldsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  back3nd_permission: z.lazy(() => back3nd_permissionUpdateManyWithoutTableNestedInputSchema).optional()
}).strict();

export const back3nd_entityUncheckedUpdateWithoutBack3nd_entity_fieldsInputSchema: z.ZodType<Prisma.back3nd_entityUncheckedUpdateWithoutBack3nd_entity_fieldsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  back3nd_permission: z.lazy(() => back3nd_permissionUncheckedUpdateManyWithoutTableNestedInputSchema).optional()
}).strict();

export const back3nd_userCreateWithoutBack3nd_password_resetInputSchema: z.ZodType<Prisma.back3nd_userCreateWithoutBack3nd_password_resetInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  reset_token: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  roles: z.lazy(() => back3nd_user_roleCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const back3nd_userUncheckedCreateWithoutBack3nd_password_resetInputSchema: z.ZodType<Prisma.back3nd_userUncheckedCreateWithoutBack3nd_password_resetInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  reset_token: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
  roles: z.lazy(() => back3nd_user_roleUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const back3nd_userCreateOrConnectWithoutBack3nd_password_resetInputSchema: z.ZodType<Prisma.back3nd_userCreateOrConnectWithoutBack3nd_password_resetInput> = z.object({
  where: z.lazy(() => back3nd_userWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => back3nd_userCreateWithoutBack3nd_password_resetInputSchema),z.lazy(() => back3nd_userUncheckedCreateWithoutBack3nd_password_resetInputSchema) ]),
}).strict();

export const back3nd_userUpsertWithoutBack3nd_password_resetInputSchema: z.ZodType<Prisma.back3nd_userUpsertWithoutBack3nd_password_resetInput> = z.object({
  update: z.union([ z.lazy(() => back3nd_userUpdateWithoutBack3nd_password_resetInputSchema),z.lazy(() => back3nd_userUncheckedUpdateWithoutBack3nd_password_resetInputSchema) ]),
  create: z.union([ z.lazy(() => back3nd_userCreateWithoutBack3nd_password_resetInputSchema),z.lazy(() => back3nd_userUncheckedCreateWithoutBack3nd_password_resetInputSchema) ]),
  where: z.lazy(() => back3nd_userWhereInputSchema).optional()
}).strict();

export const back3nd_userUpdateToOneWithWhereWithoutBack3nd_password_resetInputSchema: z.ZodType<Prisma.back3nd_userUpdateToOneWithWhereWithoutBack3nd_password_resetInput> = z.object({
  where: z.lazy(() => back3nd_userWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => back3nd_userUpdateWithoutBack3nd_password_resetInputSchema),z.lazy(() => back3nd_userUncheckedUpdateWithoutBack3nd_password_resetInputSchema) ]),
}).strict();

export const back3nd_userUpdateWithoutBack3nd_password_resetInputSchema: z.ZodType<Prisma.back3nd_userUpdateWithoutBack3nd_password_resetInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reset_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  roles: z.lazy(() => back3nd_user_roleUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const back3nd_userUncheckedUpdateWithoutBack3nd_password_resetInputSchema: z.ZodType<Prisma.back3nd_userUncheckedUpdateWithoutBack3nd_password_resetInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reset_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  roles: z.lazy(() => back3nd_user_roleUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const NewsCreateManyCategoryInputSchema: z.ZodType<Prisma.NewsCreateManyCategoryInput> = z.object({
  id: z.string().optional(),
  title: z.string(),
  content: z.string(),
  publishedAt: z.coerce.date().optional(),
  status: z.lazy(() => NewsStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const NewsUpdateWithoutCategoryInputSchema: z.ZodType<Prisma.NewsUpdateWithoutCategoryInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publishedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => NewsStatusSchema),z.lazy(() => EnumNewsStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.lazy(() => TagUpdateManyWithoutNewsNestedInputSchema).optional()
}).strict();

export const NewsUncheckedUpdateWithoutCategoryInputSchema: z.ZodType<Prisma.NewsUncheckedUpdateWithoutCategoryInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publishedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => NewsStatusSchema),z.lazy(() => EnumNewsStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.lazy(() => TagUncheckedUpdateManyWithoutNewsNestedInputSchema).optional()
}).strict();

export const NewsUncheckedUpdateManyWithoutCategoryInputSchema: z.ZodType<Prisma.NewsUncheckedUpdateManyWithoutCategoryInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publishedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => NewsStatusSchema),z.lazy(() => EnumNewsStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const NewsUpdateWithoutTagsInputSchema: z.ZodType<Prisma.NewsUpdateWithoutTagsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publishedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => NewsStatusSchema),z.lazy(() => EnumNewsStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  category: z.lazy(() => CategoryUpdateOneWithoutNewsNestedInputSchema).optional()
}).strict();

export const NewsUncheckedUpdateWithoutTagsInputSchema: z.ZodType<Prisma.NewsUncheckedUpdateWithoutTagsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publishedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => NewsStatusSchema),z.lazy(() => EnumNewsStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  categoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const NewsUncheckedUpdateManyWithoutTagsInputSchema: z.ZodType<Prisma.NewsUncheckedUpdateManyWithoutTagsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  publishedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => NewsStatusSchema),z.lazy(() => EnumNewsStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  categoryId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const TagUpdateWithoutNewsInputSchema: z.ZodType<Prisma.TagUpdateWithoutNewsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TagUncheckedUpdateWithoutNewsInputSchema: z.ZodType<Prisma.TagUncheckedUpdateWithoutNewsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TagUncheckedUpdateManyWithoutNewsInputSchema: z.ZodType<Prisma.TagUncheckedUpdateManyWithoutNewsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const back3nd_password_resetCreateManyUserInputSchema: z.ZodType<Prisma.back3nd_password_resetCreateManyUserInput> = z.object({
  id: z.string().optional(),
  token: z.string(),
  created_at: z.coerce.date().optional(),
  expires_at: z.coerce.date()
}).strict();

export const back3nd_user_roleCreateManyUserInputSchema: z.ZodType<Prisma.back3nd_user_roleCreateManyUserInput> = z.object({
  id: z.string().optional(),
  role_id: z.string(),
  created_at: z.coerce.date().optional()
}).strict();

export const back3nd_password_resetUpdateWithoutUserInputSchema: z.ZodType<Prisma.back3nd_password_resetUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  expires_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const back3nd_password_resetUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.back3nd_password_resetUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  expires_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const back3nd_password_resetUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.back3nd_password_resetUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  expires_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const back3nd_user_roleUpdateWithoutUserInputSchema: z.ZodType<Prisma.back3nd_user_roleUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.lazy(() => back3nd_roleUpdateOneRequiredWithoutUsersNestedInputSchema).optional()
}).strict();

export const back3nd_user_roleUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.back3nd_user_roleUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const back3nd_user_roleUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.back3nd_user_roleUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const back3nd_permissionCreateManyRoleInputSchema: z.ZodType<Prisma.back3nd_permissionCreateManyRoleInput> = z.object({
  id: z.string().optional(),
  table_id: z.string(),
  can_create: z.boolean().optional(),
  can_read: z.boolean().optional(),
  can_update: z.boolean().optional(),
  can_delete: z.boolean().optional(),
  created_at: z.coerce.date().optional()
}).strict();

export const back3nd_user_roleCreateManyRoleInputSchema: z.ZodType<Prisma.back3nd_user_roleCreateManyRoleInput> = z.object({
  id: z.string().optional(),
  user_id: z.string(),
  created_at: z.coerce.date().optional()
}).strict();

export const back3nd_permissionUpdateWithoutRoleInputSchema: z.ZodType<Prisma.back3nd_permissionUpdateWithoutRoleInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  can_create: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_read: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_update: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_delete: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  table: z.lazy(() => back3nd_entityUpdateOneRequiredWithoutBack3nd_permissionNestedInputSchema).optional()
}).strict();

export const back3nd_permissionUncheckedUpdateWithoutRoleInputSchema: z.ZodType<Prisma.back3nd_permissionUncheckedUpdateWithoutRoleInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  table_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  can_create: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_read: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_update: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_delete: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const back3nd_permissionUncheckedUpdateManyWithoutRoleInputSchema: z.ZodType<Prisma.back3nd_permissionUncheckedUpdateManyWithoutRoleInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  table_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  can_create: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_read: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_update: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_delete: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const back3nd_user_roleUpdateWithoutRoleInputSchema: z.ZodType<Prisma.back3nd_user_roleUpdateWithoutRoleInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => back3nd_userUpdateOneRequiredWithoutRolesNestedInputSchema).optional()
}).strict();

export const back3nd_user_roleUncheckedUpdateWithoutRoleInputSchema: z.ZodType<Prisma.back3nd_user_roleUncheckedUpdateWithoutRoleInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const back3nd_user_roleUncheckedUpdateManyWithoutRoleInputSchema: z.ZodType<Prisma.back3nd_user_roleUncheckedUpdateManyWithoutRoleInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const back3nd_entity_fieldsCreateManyBack3nd_entityInputSchema: z.ZodType<Prisma.back3nd_entity_fieldsCreateManyBack3nd_entityInput> = z.object({
  id: z.string().optional(),
  columnName: z.string(),
  columnType: z.string(),
  size: z.number().int().optional().nullable(),
  placeholder: z.string().optional().nullable(),
  defaultValue: z.string().optional().nullable(),
  isUnique: z.boolean(),
  created_at: z.coerce.date().optional()
}).strict();

export const back3nd_permissionCreateManyTableInputSchema: z.ZodType<Prisma.back3nd_permissionCreateManyTableInput> = z.object({
  id: z.string().optional(),
  role_id: z.string(),
  can_create: z.boolean().optional(),
  can_read: z.boolean().optional(),
  can_update: z.boolean().optional(),
  can_delete: z.boolean().optional(),
  created_at: z.coerce.date().optional()
}).strict();

export const back3nd_entity_fieldsUpdateWithoutBack3nd_entityInputSchema: z.ZodType<Prisma.back3nd_entity_fieldsUpdateWithoutBack3nd_entityInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  columnName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  columnType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  placeholder: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  defaultValue: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isUnique: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const back3nd_entity_fieldsUncheckedUpdateWithoutBack3nd_entityInputSchema: z.ZodType<Prisma.back3nd_entity_fieldsUncheckedUpdateWithoutBack3nd_entityInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  columnName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  columnType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  placeholder: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  defaultValue: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isUnique: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const back3nd_entity_fieldsUncheckedUpdateManyWithoutBack3nd_entityInputSchema: z.ZodType<Prisma.back3nd_entity_fieldsUncheckedUpdateManyWithoutBack3nd_entityInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  columnName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  columnType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  placeholder: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  defaultValue: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isUnique: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const back3nd_permissionUpdateWithoutTableInputSchema: z.ZodType<Prisma.back3nd_permissionUpdateWithoutTableInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  can_create: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_read: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_update: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_delete: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.lazy(() => back3nd_roleUpdateOneRequiredWithoutPermissionsNestedInputSchema).optional()
}).strict();

export const back3nd_permissionUncheckedUpdateWithoutTableInputSchema: z.ZodType<Prisma.back3nd_permissionUncheckedUpdateWithoutTableInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  can_create: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_read: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_update: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_delete: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const back3nd_permissionUncheckedUpdateManyWithoutTableInputSchema: z.ZodType<Prisma.back3nd_permissionUncheckedUpdateManyWithoutTableInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  can_create: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_read: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_update: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_delete: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const test_tableFindFirstArgsSchema: z.ZodType<Prisma.test_tableFindFirstArgs> = z.object({
  select: test_tableSelectSchema.optional(),
  where: test_tableWhereInputSchema.optional(),
  orderBy: z.union([ test_tableOrderByWithRelationInputSchema.array(),test_tableOrderByWithRelationInputSchema ]).optional(),
  cursor: test_tableWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Test_tableScalarFieldEnumSchema,Test_tableScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const test_tableFindFirstOrThrowArgsSchema: z.ZodType<Prisma.test_tableFindFirstOrThrowArgs> = z.object({
  select: test_tableSelectSchema.optional(),
  where: test_tableWhereInputSchema.optional(),
  orderBy: z.union([ test_tableOrderByWithRelationInputSchema.array(),test_tableOrderByWithRelationInputSchema ]).optional(),
  cursor: test_tableWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Test_tableScalarFieldEnumSchema,Test_tableScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const test_tableFindManyArgsSchema: z.ZodType<Prisma.test_tableFindManyArgs> = z.object({
  select: test_tableSelectSchema.optional(),
  where: test_tableWhereInputSchema.optional(),
  orderBy: z.union([ test_tableOrderByWithRelationInputSchema.array(),test_tableOrderByWithRelationInputSchema ]).optional(),
  cursor: test_tableWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Test_tableScalarFieldEnumSchema,Test_tableScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const test_tableAggregateArgsSchema: z.ZodType<Prisma.test_tableAggregateArgs> = z.object({
  where: test_tableWhereInputSchema.optional(),
  orderBy: z.union([ test_tableOrderByWithRelationInputSchema.array(),test_tableOrderByWithRelationInputSchema ]).optional(),
  cursor: test_tableWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const test_tableGroupByArgsSchema: z.ZodType<Prisma.test_tableGroupByArgs> = z.object({
  where: test_tableWhereInputSchema.optional(),
  orderBy: z.union([ test_tableOrderByWithAggregationInputSchema.array(),test_tableOrderByWithAggregationInputSchema ]).optional(),
  by: Test_tableScalarFieldEnumSchema.array(),
  having: test_tableScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const test_tableFindUniqueArgsSchema: z.ZodType<Prisma.test_tableFindUniqueArgs> = z.object({
  select: test_tableSelectSchema.optional(),
  where: test_tableWhereUniqueInputSchema,
}).strict() ;

export const test_tableFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.test_tableFindUniqueOrThrowArgs> = z.object({
  select: test_tableSelectSchema.optional(),
  where: test_tableWhereUniqueInputSchema,
}).strict() ;

export const anotherFindFirstArgsSchema: z.ZodType<Prisma.anotherFindFirstArgs> = z.object({
  select: anotherSelectSchema.optional(),
  where: anotherWhereInputSchema.optional(),
  orderBy: z.union([ anotherOrderByWithRelationInputSchema.array(),anotherOrderByWithRelationInputSchema ]).optional(),
  cursor: anotherWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AnotherScalarFieldEnumSchema,AnotherScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const anotherFindFirstOrThrowArgsSchema: z.ZodType<Prisma.anotherFindFirstOrThrowArgs> = z.object({
  select: anotherSelectSchema.optional(),
  where: anotherWhereInputSchema.optional(),
  orderBy: z.union([ anotherOrderByWithRelationInputSchema.array(),anotherOrderByWithRelationInputSchema ]).optional(),
  cursor: anotherWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AnotherScalarFieldEnumSchema,AnotherScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const anotherFindManyArgsSchema: z.ZodType<Prisma.anotherFindManyArgs> = z.object({
  select: anotherSelectSchema.optional(),
  where: anotherWhereInputSchema.optional(),
  orderBy: z.union([ anotherOrderByWithRelationInputSchema.array(),anotherOrderByWithRelationInputSchema ]).optional(),
  cursor: anotherWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AnotherScalarFieldEnumSchema,AnotherScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const anotherAggregateArgsSchema: z.ZodType<Prisma.anotherAggregateArgs> = z.object({
  where: anotherWhereInputSchema.optional(),
  orderBy: z.union([ anotherOrderByWithRelationInputSchema.array(),anotherOrderByWithRelationInputSchema ]).optional(),
  cursor: anotherWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const anotherGroupByArgsSchema: z.ZodType<Prisma.anotherGroupByArgs> = z.object({
  where: anotherWhereInputSchema.optional(),
  orderBy: z.union([ anotherOrderByWithAggregationInputSchema.array(),anotherOrderByWithAggregationInputSchema ]).optional(),
  by: AnotherScalarFieldEnumSchema.array(),
  having: anotherScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const anotherFindUniqueArgsSchema: z.ZodType<Prisma.anotherFindUniqueArgs> = z.object({
  select: anotherSelectSchema.optional(),
  where: anotherWhereUniqueInputSchema,
}).strict() ;

export const anotherFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.anotherFindUniqueOrThrowArgs> = z.object({
  select: anotherSelectSchema.optional(),
  where: anotherWhereUniqueInputSchema,
}).strict() ;

export const CategoryFindFirstArgsSchema: z.ZodType<Prisma.CategoryFindFirstArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  where: CategoryWhereInputSchema.optional(),
  orderBy: z.union([ CategoryOrderByWithRelationInputSchema.array(),CategoryOrderByWithRelationInputSchema ]).optional(),
  cursor: CategoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CategoryScalarFieldEnumSchema,CategoryScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CategoryFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CategoryFindFirstOrThrowArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  where: CategoryWhereInputSchema.optional(),
  orderBy: z.union([ CategoryOrderByWithRelationInputSchema.array(),CategoryOrderByWithRelationInputSchema ]).optional(),
  cursor: CategoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CategoryScalarFieldEnumSchema,CategoryScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CategoryFindManyArgsSchema: z.ZodType<Prisma.CategoryFindManyArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  where: CategoryWhereInputSchema.optional(),
  orderBy: z.union([ CategoryOrderByWithRelationInputSchema.array(),CategoryOrderByWithRelationInputSchema ]).optional(),
  cursor: CategoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CategoryScalarFieldEnumSchema,CategoryScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CategoryAggregateArgsSchema: z.ZodType<Prisma.CategoryAggregateArgs> = z.object({
  where: CategoryWhereInputSchema.optional(),
  orderBy: z.union([ CategoryOrderByWithRelationInputSchema.array(),CategoryOrderByWithRelationInputSchema ]).optional(),
  cursor: CategoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CategoryGroupByArgsSchema: z.ZodType<Prisma.CategoryGroupByArgs> = z.object({
  where: CategoryWhereInputSchema.optional(),
  orderBy: z.union([ CategoryOrderByWithAggregationInputSchema.array(),CategoryOrderByWithAggregationInputSchema ]).optional(),
  by: CategoryScalarFieldEnumSchema.array(),
  having: CategoryScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CategoryFindUniqueArgsSchema: z.ZodType<Prisma.CategoryFindUniqueArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  where: CategoryWhereUniqueInputSchema,
}).strict() ;

export const CategoryFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CategoryFindUniqueOrThrowArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  where: CategoryWhereUniqueInputSchema,
}).strict() ;

export const TagFindFirstArgsSchema: z.ZodType<Prisma.TagFindFirstArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereInputSchema.optional(),
  orderBy: z.union([ TagOrderByWithRelationInputSchema.array(),TagOrderByWithRelationInputSchema ]).optional(),
  cursor: TagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TagScalarFieldEnumSchema,TagScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TagFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TagFindFirstOrThrowArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereInputSchema.optional(),
  orderBy: z.union([ TagOrderByWithRelationInputSchema.array(),TagOrderByWithRelationInputSchema ]).optional(),
  cursor: TagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TagScalarFieldEnumSchema,TagScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TagFindManyArgsSchema: z.ZodType<Prisma.TagFindManyArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereInputSchema.optional(),
  orderBy: z.union([ TagOrderByWithRelationInputSchema.array(),TagOrderByWithRelationInputSchema ]).optional(),
  cursor: TagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TagScalarFieldEnumSchema,TagScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TagAggregateArgsSchema: z.ZodType<Prisma.TagAggregateArgs> = z.object({
  where: TagWhereInputSchema.optional(),
  orderBy: z.union([ TagOrderByWithRelationInputSchema.array(),TagOrderByWithRelationInputSchema ]).optional(),
  cursor: TagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TagGroupByArgsSchema: z.ZodType<Prisma.TagGroupByArgs> = z.object({
  where: TagWhereInputSchema.optional(),
  orderBy: z.union([ TagOrderByWithAggregationInputSchema.array(),TagOrderByWithAggregationInputSchema ]).optional(),
  by: TagScalarFieldEnumSchema.array(),
  having: TagScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TagFindUniqueArgsSchema: z.ZodType<Prisma.TagFindUniqueArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereUniqueInputSchema,
}).strict() ;

export const TagFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TagFindUniqueOrThrowArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereUniqueInputSchema,
}).strict() ;

export const NewsFindFirstArgsSchema: z.ZodType<Prisma.NewsFindFirstArgs> = z.object({
  select: NewsSelectSchema.optional(),
  include: NewsIncludeSchema.optional(),
  where: NewsWhereInputSchema.optional(),
  orderBy: z.union([ NewsOrderByWithRelationInputSchema.array(),NewsOrderByWithRelationInputSchema ]).optional(),
  cursor: NewsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ NewsScalarFieldEnumSchema,NewsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const NewsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.NewsFindFirstOrThrowArgs> = z.object({
  select: NewsSelectSchema.optional(),
  include: NewsIncludeSchema.optional(),
  where: NewsWhereInputSchema.optional(),
  orderBy: z.union([ NewsOrderByWithRelationInputSchema.array(),NewsOrderByWithRelationInputSchema ]).optional(),
  cursor: NewsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ NewsScalarFieldEnumSchema,NewsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const NewsFindManyArgsSchema: z.ZodType<Prisma.NewsFindManyArgs> = z.object({
  select: NewsSelectSchema.optional(),
  include: NewsIncludeSchema.optional(),
  where: NewsWhereInputSchema.optional(),
  orderBy: z.union([ NewsOrderByWithRelationInputSchema.array(),NewsOrderByWithRelationInputSchema ]).optional(),
  cursor: NewsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ NewsScalarFieldEnumSchema,NewsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const NewsAggregateArgsSchema: z.ZodType<Prisma.NewsAggregateArgs> = z.object({
  where: NewsWhereInputSchema.optional(),
  orderBy: z.union([ NewsOrderByWithRelationInputSchema.array(),NewsOrderByWithRelationInputSchema ]).optional(),
  cursor: NewsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const NewsGroupByArgsSchema: z.ZodType<Prisma.NewsGroupByArgs> = z.object({
  where: NewsWhereInputSchema.optional(),
  orderBy: z.union([ NewsOrderByWithAggregationInputSchema.array(),NewsOrderByWithAggregationInputSchema ]).optional(),
  by: NewsScalarFieldEnumSchema.array(),
  having: NewsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const NewsFindUniqueArgsSchema: z.ZodType<Prisma.NewsFindUniqueArgs> = z.object({
  select: NewsSelectSchema.optional(),
  include: NewsIncludeSchema.optional(),
  where: NewsWhereUniqueInputSchema,
}).strict() ;

export const NewsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.NewsFindUniqueOrThrowArgs> = z.object({
  select: NewsSelectSchema.optional(),
  include: NewsIncludeSchema.optional(),
  where: NewsWhereUniqueInputSchema,
}).strict() ;

export const hermesFindFirstArgsSchema: z.ZodType<Prisma.hermesFindFirstArgs> = z.object({
  select: hermesSelectSchema.optional(),
  where: hermesWhereInputSchema.optional(),
  orderBy: z.union([ hermesOrderByWithRelationInputSchema.array(),hermesOrderByWithRelationInputSchema ]).optional(),
  cursor: hermesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ HermesScalarFieldEnumSchema,HermesScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const hermesFindFirstOrThrowArgsSchema: z.ZodType<Prisma.hermesFindFirstOrThrowArgs> = z.object({
  select: hermesSelectSchema.optional(),
  where: hermesWhereInputSchema.optional(),
  orderBy: z.union([ hermesOrderByWithRelationInputSchema.array(),hermesOrderByWithRelationInputSchema ]).optional(),
  cursor: hermesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ HermesScalarFieldEnumSchema,HermesScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const hermesFindManyArgsSchema: z.ZodType<Prisma.hermesFindManyArgs> = z.object({
  select: hermesSelectSchema.optional(),
  where: hermesWhereInputSchema.optional(),
  orderBy: z.union([ hermesOrderByWithRelationInputSchema.array(),hermesOrderByWithRelationInputSchema ]).optional(),
  cursor: hermesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ HermesScalarFieldEnumSchema,HermesScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const hermesAggregateArgsSchema: z.ZodType<Prisma.hermesAggregateArgs> = z.object({
  where: hermesWhereInputSchema.optional(),
  orderBy: z.union([ hermesOrderByWithRelationInputSchema.array(),hermesOrderByWithRelationInputSchema ]).optional(),
  cursor: hermesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const hermesGroupByArgsSchema: z.ZodType<Prisma.hermesGroupByArgs> = z.object({
  where: hermesWhereInputSchema.optional(),
  orderBy: z.union([ hermesOrderByWithAggregationInputSchema.array(),hermesOrderByWithAggregationInputSchema ]).optional(),
  by: HermesScalarFieldEnumSchema.array(),
  having: hermesScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const hermesFindUniqueArgsSchema: z.ZodType<Prisma.hermesFindUniqueArgs> = z.object({
  select: hermesSelectSchema.optional(),
  where: hermesWhereUniqueInputSchema,
}).strict() ;

export const hermesFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.hermesFindUniqueOrThrowArgs> = z.object({
  select: hermesSelectSchema.optional(),
  where: hermesWhereUniqueInputSchema,
}).strict() ;

export const back3nd_userFindFirstArgsSchema: z.ZodType<Prisma.back3nd_userFindFirstArgs> = z.object({
  select: back3nd_userSelectSchema.optional(),
  include: back3nd_userIncludeSchema.optional(),
  where: back3nd_userWhereInputSchema.optional(),
  orderBy: z.union([ back3nd_userOrderByWithRelationInputSchema.array(),back3nd_userOrderByWithRelationInputSchema ]).optional(),
  cursor: back3nd_userWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Back3nd_userScalarFieldEnumSchema,Back3nd_userScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const back3nd_userFindFirstOrThrowArgsSchema: z.ZodType<Prisma.back3nd_userFindFirstOrThrowArgs> = z.object({
  select: back3nd_userSelectSchema.optional(),
  include: back3nd_userIncludeSchema.optional(),
  where: back3nd_userWhereInputSchema.optional(),
  orderBy: z.union([ back3nd_userOrderByWithRelationInputSchema.array(),back3nd_userOrderByWithRelationInputSchema ]).optional(),
  cursor: back3nd_userWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Back3nd_userScalarFieldEnumSchema,Back3nd_userScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const back3nd_userFindManyArgsSchema: z.ZodType<Prisma.back3nd_userFindManyArgs> = z.object({
  select: back3nd_userSelectSchema.optional(),
  include: back3nd_userIncludeSchema.optional(),
  where: back3nd_userWhereInputSchema.optional(),
  orderBy: z.union([ back3nd_userOrderByWithRelationInputSchema.array(),back3nd_userOrderByWithRelationInputSchema ]).optional(),
  cursor: back3nd_userWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Back3nd_userScalarFieldEnumSchema,Back3nd_userScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const back3nd_userAggregateArgsSchema: z.ZodType<Prisma.back3nd_userAggregateArgs> = z.object({
  where: back3nd_userWhereInputSchema.optional(),
  orderBy: z.union([ back3nd_userOrderByWithRelationInputSchema.array(),back3nd_userOrderByWithRelationInputSchema ]).optional(),
  cursor: back3nd_userWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const back3nd_userGroupByArgsSchema: z.ZodType<Prisma.back3nd_userGroupByArgs> = z.object({
  where: back3nd_userWhereInputSchema.optional(),
  orderBy: z.union([ back3nd_userOrderByWithAggregationInputSchema.array(),back3nd_userOrderByWithAggregationInputSchema ]).optional(),
  by: Back3nd_userScalarFieldEnumSchema.array(),
  having: back3nd_userScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const back3nd_userFindUniqueArgsSchema: z.ZodType<Prisma.back3nd_userFindUniqueArgs> = z.object({
  select: back3nd_userSelectSchema.optional(),
  include: back3nd_userIncludeSchema.optional(),
  where: back3nd_userWhereUniqueInputSchema,
}).strict() ;

export const back3nd_userFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.back3nd_userFindUniqueOrThrowArgs> = z.object({
  select: back3nd_userSelectSchema.optional(),
  include: back3nd_userIncludeSchema.optional(),
  where: back3nd_userWhereUniqueInputSchema,
}).strict() ;

export const back3nd_roleFindFirstArgsSchema: z.ZodType<Prisma.back3nd_roleFindFirstArgs> = z.object({
  select: back3nd_roleSelectSchema.optional(),
  include: back3nd_roleIncludeSchema.optional(),
  where: back3nd_roleWhereInputSchema.optional(),
  orderBy: z.union([ back3nd_roleOrderByWithRelationInputSchema.array(),back3nd_roleOrderByWithRelationInputSchema ]).optional(),
  cursor: back3nd_roleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Back3nd_roleScalarFieldEnumSchema,Back3nd_roleScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const back3nd_roleFindFirstOrThrowArgsSchema: z.ZodType<Prisma.back3nd_roleFindFirstOrThrowArgs> = z.object({
  select: back3nd_roleSelectSchema.optional(),
  include: back3nd_roleIncludeSchema.optional(),
  where: back3nd_roleWhereInputSchema.optional(),
  orderBy: z.union([ back3nd_roleOrderByWithRelationInputSchema.array(),back3nd_roleOrderByWithRelationInputSchema ]).optional(),
  cursor: back3nd_roleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Back3nd_roleScalarFieldEnumSchema,Back3nd_roleScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const back3nd_roleFindManyArgsSchema: z.ZodType<Prisma.back3nd_roleFindManyArgs> = z.object({
  select: back3nd_roleSelectSchema.optional(),
  include: back3nd_roleIncludeSchema.optional(),
  where: back3nd_roleWhereInputSchema.optional(),
  orderBy: z.union([ back3nd_roleOrderByWithRelationInputSchema.array(),back3nd_roleOrderByWithRelationInputSchema ]).optional(),
  cursor: back3nd_roleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Back3nd_roleScalarFieldEnumSchema,Back3nd_roleScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const back3nd_roleAggregateArgsSchema: z.ZodType<Prisma.back3nd_roleAggregateArgs> = z.object({
  where: back3nd_roleWhereInputSchema.optional(),
  orderBy: z.union([ back3nd_roleOrderByWithRelationInputSchema.array(),back3nd_roleOrderByWithRelationInputSchema ]).optional(),
  cursor: back3nd_roleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const back3nd_roleGroupByArgsSchema: z.ZodType<Prisma.back3nd_roleGroupByArgs> = z.object({
  where: back3nd_roleWhereInputSchema.optional(),
  orderBy: z.union([ back3nd_roleOrderByWithAggregationInputSchema.array(),back3nd_roleOrderByWithAggregationInputSchema ]).optional(),
  by: Back3nd_roleScalarFieldEnumSchema.array(),
  having: back3nd_roleScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const back3nd_roleFindUniqueArgsSchema: z.ZodType<Prisma.back3nd_roleFindUniqueArgs> = z.object({
  select: back3nd_roleSelectSchema.optional(),
  include: back3nd_roleIncludeSchema.optional(),
  where: back3nd_roleWhereUniqueInputSchema,
}).strict() ;

export const back3nd_roleFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.back3nd_roleFindUniqueOrThrowArgs> = z.object({
  select: back3nd_roleSelectSchema.optional(),
  include: back3nd_roleIncludeSchema.optional(),
  where: back3nd_roleWhereUniqueInputSchema,
}).strict() ;

export const back3nd_user_roleFindFirstArgsSchema: z.ZodType<Prisma.back3nd_user_roleFindFirstArgs> = z.object({
  select: back3nd_user_roleSelectSchema.optional(),
  include: back3nd_user_roleIncludeSchema.optional(),
  where: back3nd_user_roleWhereInputSchema.optional(),
  orderBy: z.union([ back3nd_user_roleOrderByWithRelationInputSchema.array(),back3nd_user_roleOrderByWithRelationInputSchema ]).optional(),
  cursor: back3nd_user_roleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Back3nd_user_roleScalarFieldEnumSchema,Back3nd_user_roleScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const back3nd_user_roleFindFirstOrThrowArgsSchema: z.ZodType<Prisma.back3nd_user_roleFindFirstOrThrowArgs> = z.object({
  select: back3nd_user_roleSelectSchema.optional(),
  include: back3nd_user_roleIncludeSchema.optional(),
  where: back3nd_user_roleWhereInputSchema.optional(),
  orderBy: z.union([ back3nd_user_roleOrderByWithRelationInputSchema.array(),back3nd_user_roleOrderByWithRelationInputSchema ]).optional(),
  cursor: back3nd_user_roleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Back3nd_user_roleScalarFieldEnumSchema,Back3nd_user_roleScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const back3nd_user_roleFindManyArgsSchema: z.ZodType<Prisma.back3nd_user_roleFindManyArgs> = z.object({
  select: back3nd_user_roleSelectSchema.optional(),
  include: back3nd_user_roleIncludeSchema.optional(),
  where: back3nd_user_roleWhereInputSchema.optional(),
  orderBy: z.union([ back3nd_user_roleOrderByWithRelationInputSchema.array(),back3nd_user_roleOrderByWithRelationInputSchema ]).optional(),
  cursor: back3nd_user_roleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Back3nd_user_roleScalarFieldEnumSchema,Back3nd_user_roleScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const back3nd_user_roleAggregateArgsSchema: z.ZodType<Prisma.back3nd_user_roleAggregateArgs> = z.object({
  where: back3nd_user_roleWhereInputSchema.optional(),
  orderBy: z.union([ back3nd_user_roleOrderByWithRelationInputSchema.array(),back3nd_user_roleOrderByWithRelationInputSchema ]).optional(),
  cursor: back3nd_user_roleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const back3nd_user_roleGroupByArgsSchema: z.ZodType<Prisma.back3nd_user_roleGroupByArgs> = z.object({
  where: back3nd_user_roleWhereInputSchema.optional(),
  orderBy: z.union([ back3nd_user_roleOrderByWithAggregationInputSchema.array(),back3nd_user_roleOrderByWithAggregationInputSchema ]).optional(),
  by: Back3nd_user_roleScalarFieldEnumSchema.array(),
  having: back3nd_user_roleScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const back3nd_user_roleFindUniqueArgsSchema: z.ZodType<Prisma.back3nd_user_roleFindUniqueArgs> = z.object({
  select: back3nd_user_roleSelectSchema.optional(),
  include: back3nd_user_roleIncludeSchema.optional(),
  where: back3nd_user_roleWhereUniqueInputSchema,
}).strict() ;

export const back3nd_user_roleFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.back3nd_user_roleFindUniqueOrThrowArgs> = z.object({
  select: back3nd_user_roleSelectSchema.optional(),
  include: back3nd_user_roleIncludeSchema.optional(),
  where: back3nd_user_roleWhereUniqueInputSchema,
}).strict() ;

export const back3nd_permissionFindFirstArgsSchema: z.ZodType<Prisma.back3nd_permissionFindFirstArgs> = z.object({
  select: back3nd_permissionSelectSchema.optional(),
  include: back3nd_permissionIncludeSchema.optional(),
  where: back3nd_permissionWhereInputSchema.optional(),
  orderBy: z.union([ back3nd_permissionOrderByWithRelationInputSchema.array(),back3nd_permissionOrderByWithRelationInputSchema ]).optional(),
  cursor: back3nd_permissionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Back3nd_permissionScalarFieldEnumSchema,Back3nd_permissionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const back3nd_permissionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.back3nd_permissionFindFirstOrThrowArgs> = z.object({
  select: back3nd_permissionSelectSchema.optional(),
  include: back3nd_permissionIncludeSchema.optional(),
  where: back3nd_permissionWhereInputSchema.optional(),
  orderBy: z.union([ back3nd_permissionOrderByWithRelationInputSchema.array(),back3nd_permissionOrderByWithRelationInputSchema ]).optional(),
  cursor: back3nd_permissionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Back3nd_permissionScalarFieldEnumSchema,Back3nd_permissionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const back3nd_permissionFindManyArgsSchema: z.ZodType<Prisma.back3nd_permissionFindManyArgs> = z.object({
  select: back3nd_permissionSelectSchema.optional(),
  include: back3nd_permissionIncludeSchema.optional(),
  where: back3nd_permissionWhereInputSchema.optional(),
  orderBy: z.union([ back3nd_permissionOrderByWithRelationInputSchema.array(),back3nd_permissionOrderByWithRelationInputSchema ]).optional(),
  cursor: back3nd_permissionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Back3nd_permissionScalarFieldEnumSchema,Back3nd_permissionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const back3nd_permissionAggregateArgsSchema: z.ZodType<Prisma.back3nd_permissionAggregateArgs> = z.object({
  where: back3nd_permissionWhereInputSchema.optional(),
  orderBy: z.union([ back3nd_permissionOrderByWithRelationInputSchema.array(),back3nd_permissionOrderByWithRelationInputSchema ]).optional(),
  cursor: back3nd_permissionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const back3nd_permissionGroupByArgsSchema: z.ZodType<Prisma.back3nd_permissionGroupByArgs> = z.object({
  where: back3nd_permissionWhereInputSchema.optional(),
  orderBy: z.union([ back3nd_permissionOrderByWithAggregationInputSchema.array(),back3nd_permissionOrderByWithAggregationInputSchema ]).optional(),
  by: Back3nd_permissionScalarFieldEnumSchema.array(),
  having: back3nd_permissionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const back3nd_permissionFindUniqueArgsSchema: z.ZodType<Prisma.back3nd_permissionFindUniqueArgs> = z.object({
  select: back3nd_permissionSelectSchema.optional(),
  include: back3nd_permissionIncludeSchema.optional(),
  where: back3nd_permissionWhereUniqueInputSchema,
}).strict() ;

export const back3nd_permissionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.back3nd_permissionFindUniqueOrThrowArgs> = z.object({
  select: back3nd_permissionSelectSchema.optional(),
  include: back3nd_permissionIncludeSchema.optional(),
  where: back3nd_permissionWhereUniqueInputSchema,
}).strict() ;

export const back3nd_entityFindFirstArgsSchema: z.ZodType<Prisma.back3nd_entityFindFirstArgs> = z.object({
  select: back3nd_entitySelectSchema.optional(),
  include: back3nd_entityIncludeSchema.optional(),
  where: back3nd_entityWhereInputSchema.optional(),
  orderBy: z.union([ back3nd_entityOrderByWithRelationInputSchema.array(),back3nd_entityOrderByWithRelationInputSchema ]).optional(),
  cursor: back3nd_entityWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Back3nd_entityScalarFieldEnumSchema,Back3nd_entityScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const back3nd_entityFindFirstOrThrowArgsSchema: z.ZodType<Prisma.back3nd_entityFindFirstOrThrowArgs> = z.object({
  select: back3nd_entitySelectSchema.optional(),
  include: back3nd_entityIncludeSchema.optional(),
  where: back3nd_entityWhereInputSchema.optional(),
  orderBy: z.union([ back3nd_entityOrderByWithRelationInputSchema.array(),back3nd_entityOrderByWithRelationInputSchema ]).optional(),
  cursor: back3nd_entityWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Back3nd_entityScalarFieldEnumSchema,Back3nd_entityScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const back3nd_entityFindManyArgsSchema: z.ZodType<Prisma.back3nd_entityFindManyArgs> = z.object({
  select: back3nd_entitySelectSchema.optional(),
  include: back3nd_entityIncludeSchema.optional(),
  where: back3nd_entityWhereInputSchema.optional(),
  orderBy: z.union([ back3nd_entityOrderByWithRelationInputSchema.array(),back3nd_entityOrderByWithRelationInputSchema ]).optional(),
  cursor: back3nd_entityWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Back3nd_entityScalarFieldEnumSchema,Back3nd_entityScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const back3nd_entityAggregateArgsSchema: z.ZodType<Prisma.back3nd_entityAggregateArgs> = z.object({
  where: back3nd_entityWhereInputSchema.optional(),
  orderBy: z.union([ back3nd_entityOrderByWithRelationInputSchema.array(),back3nd_entityOrderByWithRelationInputSchema ]).optional(),
  cursor: back3nd_entityWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const back3nd_entityGroupByArgsSchema: z.ZodType<Prisma.back3nd_entityGroupByArgs> = z.object({
  where: back3nd_entityWhereInputSchema.optional(),
  orderBy: z.union([ back3nd_entityOrderByWithAggregationInputSchema.array(),back3nd_entityOrderByWithAggregationInputSchema ]).optional(),
  by: Back3nd_entityScalarFieldEnumSchema.array(),
  having: back3nd_entityScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const back3nd_entityFindUniqueArgsSchema: z.ZodType<Prisma.back3nd_entityFindUniqueArgs> = z.object({
  select: back3nd_entitySelectSchema.optional(),
  include: back3nd_entityIncludeSchema.optional(),
  where: back3nd_entityWhereUniqueInputSchema,
}).strict() ;

export const back3nd_entityFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.back3nd_entityFindUniqueOrThrowArgs> = z.object({
  select: back3nd_entitySelectSchema.optional(),
  include: back3nd_entityIncludeSchema.optional(),
  where: back3nd_entityWhereUniqueInputSchema,
}).strict() ;

export const back3nd_entity_fieldsFindFirstArgsSchema: z.ZodType<Prisma.back3nd_entity_fieldsFindFirstArgs> = z.object({
  select: back3nd_entity_fieldsSelectSchema.optional(),
  include: back3nd_entity_fieldsIncludeSchema.optional(),
  where: back3nd_entity_fieldsWhereInputSchema.optional(),
  orderBy: z.union([ back3nd_entity_fieldsOrderByWithRelationInputSchema.array(),back3nd_entity_fieldsOrderByWithRelationInputSchema ]).optional(),
  cursor: back3nd_entity_fieldsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Back3nd_entity_fieldsScalarFieldEnumSchema,Back3nd_entity_fieldsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const back3nd_entity_fieldsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.back3nd_entity_fieldsFindFirstOrThrowArgs> = z.object({
  select: back3nd_entity_fieldsSelectSchema.optional(),
  include: back3nd_entity_fieldsIncludeSchema.optional(),
  where: back3nd_entity_fieldsWhereInputSchema.optional(),
  orderBy: z.union([ back3nd_entity_fieldsOrderByWithRelationInputSchema.array(),back3nd_entity_fieldsOrderByWithRelationInputSchema ]).optional(),
  cursor: back3nd_entity_fieldsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Back3nd_entity_fieldsScalarFieldEnumSchema,Back3nd_entity_fieldsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const back3nd_entity_fieldsFindManyArgsSchema: z.ZodType<Prisma.back3nd_entity_fieldsFindManyArgs> = z.object({
  select: back3nd_entity_fieldsSelectSchema.optional(),
  include: back3nd_entity_fieldsIncludeSchema.optional(),
  where: back3nd_entity_fieldsWhereInputSchema.optional(),
  orderBy: z.union([ back3nd_entity_fieldsOrderByWithRelationInputSchema.array(),back3nd_entity_fieldsOrderByWithRelationInputSchema ]).optional(),
  cursor: back3nd_entity_fieldsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Back3nd_entity_fieldsScalarFieldEnumSchema,Back3nd_entity_fieldsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const back3nd_entity_fieldsAggregateArgsSchema: z.ZodType<Prisma.back3nd_entity_fieldsAggregateArgs> = z.object({
  where: back3nd_entity_fieldsWhereInputSchema.optional(),
  orderBy: z.union([ back3nd_entity_fieldsOrderByWithRelationInputSchema.array(),back3nd_entity_fieldsOrderByWithRelationInputSchema ]).optional(),
  cursor: back3nd_entity_fieldsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const back3nd_entity_fieldsGroupByArgsSchema: z.ZodType<Prisma.back3nd_entity_fieldsGroupByArgs> = z.object({
  where: back3nd_entity_fieldsWhereInputSchema.optional(),
  orderBy: z.union([ back3nd_entity_fieldsOrderByWithAggregationInputSchema.array(),back3nd_entity_fieldsOrderByWithAggregationInputSchema ]).optional(),
  by: Back3nd_entity_fieldsScalarFieldEnumSchema.array(),
  having: back3nd_entity_fieldsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const back3nd_entity_fieldsFindUniqueArgsSchema: z.ZodType<Prisma.back3nd_entity_fieldsFindUniqueArgs> = z.object({
  select: back3nd_entity_fieldsSelectSchema.optional(),
  include: back3nd_entity_fieldsIncludeSchema.optional(),
  where: back3nd_entity_fieldsWhereUniqueInputSchema,
}).strict() ;

export const back3nd_entity_fieldsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.back3nd_entity_fieldsFindUniqueOrThrowArgs> = z.object({
  select: back3nd_entity_fieldsSelectSchema.optional(),
  include: back3nd_entity_fieldsIncludeSchema.optional(),
  where: back3nd_entity_fieldsWhereUniqueInputSchema,
}).strict() ;

export const back3nd_password_resetFindFirstArgsSchema: z.ZodType<Prisma.back3nd_password_resetFindFirstArgs> = z.object({
  select: back3nd_password_resetSelectSchema.optional(),
  include: back3nd_password_resetIncludeSchema.optional(),
  where: back3nd_password_resetWhereInputSchema.optional(),
  orderBy: z.union([ back3nd_password_resetOrderByWithRelationInputSchema.array(),back3nd_password_resetOrderByWithRelationInputSchema ]).optional(),
  cursor: back3nd_password_resetWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Back3nd_password_resetScalarFieldEnumSchema,Back3nd_password_resetScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const back3nd_password_resetFindFirstOrThrowArgsSchema: z.ZodType<Prisma.back3nd_password_resetFindFirstOrThrowArgs> = z.object({
  select: back3nd_password_resetSelectSchema.optional(),
  include: back3nd_password_resetIncludeSchema.optional(),
  where: back3nd_password_resetWhereInputSchema.optional(),
  orderBy: z.union([ back3nd_password_resetOrderByWithRelationInputSchema.array(),back3nd_password_resetOrderByWithRelationInputSchema ]).optional(),
  cursor: back3nd_password_resetWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Back3nd_password_resetScalarFieldEnumSchema,Back3nd_password_resetScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const back3nd_password_resetFindManyArgsSchema: z.ZodType<Prisma.back3nd_password_resetFindManyArgs> = z.object({
  select: back3nd_password_resetSelectSchema.optional(),
  include: back3nd_password_resetIncludeSchema.optional(),
  where: back3nd_password_resetWhereInputSchema.optional(),
  orderBy: z.union([ back3nd_password_resetOrderByWithRelationInputSchema.array(),back3nd_password_resetOrderByWithRelationInputSchema ]).optional(),
  cursor: back3nd_password_resetWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Back3nd_password_resetScalarFieldEnumSchema,Back3nd_password_resetScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const back3nd_password_resetAggregateArgsSchema: z.ZodType<Prisma.back3nd_password_resetAggregateArgs> = z.object({
  where: back3nd_password_resetWhereInputSchema.optional(),
  orderBy: z.union([ back3nd_password_resetOrderByWithRelationInputSchema.array(),back3nd_password_resetOrderByWithRelationInputSchema ]).optional(),
  cursor: back3nd_password_resetWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const back3nd_password_resetGroupByArgsSchema: z.ZodType<Prisma.back3nd_password_resetGroupByArgs> = z.object({
  where: back3nd_password_resetWhereInputSchema.optional(),
  orderBy: z.union([ back3nd_password_resetOrderByWithAggregationInputSchema.array(),back3nd_password_resetOrderByWithAggregationInputSchema ]).optional(),
  by: Back3nd_password_resetScalarFieldEnumSchema.array(),
  having: back3nd_password_resetScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const back3nd_password_resetFindUniqueArgsSchema: z.ZodType<Prisma.back3nd_password_resetFindUniqueArgs> = z.object({
  select: back3nd_password_resetSelectSchema.optional(),
  include: back3nd_password_resetIncludeSchema.optional(),
  where: back3nd_password_resetWhereUniqueInputSchema,
}).strict() ;

export const back3nd_password_resetFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.back3nd_password_resetFindUniqueOrThrowArgs> = z.object({
  select: back3nd_password_resetSelectSchema.optional(),
  include: back3nd_password_resetIncludeSchema.optional(),
  where: back3nd_password_resetWhereUniqueInputSchema,
}).strict() ;

export const test_tableCreateArgsSchema: z.ZodType<Prisma.test_tableCreateArgs> = z.object({
  select: test_tableSelectSchema.optional(),
  data: z.union([ test_tableCreateInputSchema,test_tableUncheckedCreateInputSchema ]),
}).strict() ;

export const test_tableUpsertArgsSchema: z.ZodType<Prisma.test_tableUpsertArgs> = z.object({
  select: test_tableSelectSchema.optional(),
  where: test_tableWhereUniqueInputSchema,
  create: z.union([ test_tableCreateInputSchema,test_tableUncheckedCreateInputSchema ]),
  update: z.union([ test_tableUpdateInputSchema,test_tableUncheckedUpdateInputSchema ]),
}).strict() ;

export const test_tableCreateManyArgsSchema: z.ZodType<Prisma.test_tableCreateManyArgs> = z.object({
  data: z.union([ test_tableCreateManyInputSchema,test_tableCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const test_tableCreateManyAndReturnArgsSchema: z.ZodType<Prisma.test_tableCreateManyAndReturnArgs> = z.object({
  data: z.union([ test_tableCreateManyInputSchema,test_tableCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const test_tableDeleteArgsSchema: z.ZodType<Prisma.test_tableDeleteArgs> = z.object({
  select: test_tableSelectSchema.optional(),
  where: test_tableWhereUniqueInputSchema,
}).strict() ;

export const test_tableUpdateArgsSchema: z.ZodType<Prisma.test_tableUpdateArgs> = z.object({
  select: test_tableSelectSchema.optional(),
  data: z.union([ test_tableUpdateInputSchema,test_tableUncheckedUpdateInputSchema ]),
  where: test_tableWhereUniqueInputSchema,
}).strict() ;

export const test_tableUpdateManyArgsSchema: z.ZodType<Prisma.test_tableUpdateManyArgs> = z.object({
  data: z.union([ test_tableUpdateManyMutationInputSchema,test_tableUncheckedUpdateManyInputSchema ]),
  where: test_tableWhereInputSchema.optional(),
}).strict() ;

export const test_tableDeleteManyArgsSchema: z.ZodType<Prisma.test_tableDeleteManyArgs> = z.object({
  where: test_tableWhereInputSchema.optional(),
}).strict() ;

export const anotherCreateArgsSchema: z.ZodType<Prisma.anotherCreateArgs> = z.object({
  select: anotherSelectSchema.optional(),
  data: z.union([ anotherCreateInputSchema,anotherUncheckedCreateInputSchema ]),
}).strict() ;

export const anotherUpsertArgsSchema: z.ZodType<Prisma.anotherUpsertArgs> = z.object({
  select: anotherSelectSchema.optional(),
  where: anotherWhereUniqueInputSchema,
  create: z.union([ anotherCreateInputSchema,anotherUncheckedCreateInputSchema ]),
  update: z.union([ anotherUpdateInputSchema,anotherUncheckedUpdateInputSchema ]),
}).strict() ;

export const anotherCreateManyArgsSchema: z.ZodType<Prisma.anotherCreateManyArgs> = z.object({
  data: z.union([ anotherCreateManyInputSchema,anotherCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const anotherCreateManyAndReturnArgsSchema: z.ZodType<Prisma.anotherCreateManyAndReturnArgs> = z.object({
  data: z.union([ anotherCreateManyInputSchema,anotherCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const anotherDeleteArgsSchema: z.ZodType<Prisma.anotherDeleteArgs> = z.object({
  select: anotherSelectSchema.optional(),
  where: anotherWhereUniqueInputSchema,
}).strict() ;

export const anotherUpdateArgsSchema: z.ZodType<Prisma.anotherUpdateArgs> = z.object({
  select: anotherSelectSchema.optional(),
  data: z.union([ anotherUpdateInputSchema,anotherUncheckedUpdateInputSchema ]),
  where: anotherWhereUniqueInputSchema,
}).strict() ;

export const anotherUpdateManyArgsSchema: z.ZodType<Prisma.anotherUpdateManyArgs> = z.object({
  data: z.union([ anotherUpdateManyMutationInputSchema,anotherUncheckedUpdateManyInputSchema ]),
  where: anotherWhereInputSchema.optional(),
}).strict() ;

export const anotherDeleteManyArgsSchema: z.ZodType<Prisma.anotherDeleteManyArgs> = z.object({
  where: anotherWhereInputSchema.optional(),
}).strict() ;

export const CategoryCreateArgsSchema: z.ZodType<Prisma.CategoryCreateArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  data: z.union([ CategoryCreateInputSchema,CategoryUncheckedCreateInputSchema ]),
}).strict() ;

export const CategoryUpsertArgsSchema: z.ZodType<Prisma.CategoryUpsertArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  where: CategoryWhereUniqueInputSchema,
  create: z.union([ CategoryCreateInputSchema,CategoryUncheckedCreateInputSchema ]),
  update: z.union([ CategoryUpdateInputSchema,CategoryUncheckedUpdateInputSchema ]),
}).strict() ;

export const CategoryCreateManyArgsSchema: z.ZodType<Prisma.CategoryCreateManyArgs> = z.object({
  data: z.union([ CategoryCreateManyInputSchema,CategoryCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CategoryCreateManyAndReturnArgsSchema: z.ZodType<Prisma.CategoryCreateManyAndReturnArgs> = z.object({
  data: z.union([ CategoryCreateManyInputSchema,CategoryCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CategoryDeleteArgsSchema: z.ZodType<Prisma.CategoryDeleteArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  where: CategoryWhereUniqueInputSchema,
}).strict() ;

export const CategoryUpdateArgsSchema: z.ZodType<Prisma.CategoryUpdateArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  data: z.union([ CategoryUpdateInputSchema,CategoryUncheckedUpdateInputSchema ]),
  where: CategoryWhereUniqueInputSchema,
}).strict() ;

export const CategoryUpdateManyArgsSchema: z.ZodType<Prisma.CategoryUpdateManyArgs> = z.object({
  data: z.union([ CategoryUpdateManyMutationInputSchema,CategoryUncheckedUpdateManyInputSchema ]),
  where: CategoryWhereInputSchema.optional(),
}).strict() ;

export const CategoryDeleteManyArgsSchema: z.ZodType<Prisma.CategoryDeleteManyArgs> = z.object({
  where: CategoryWhereInputSchema.optional(),
}).strict() ;

export const TagCreateArgsSchema: z.ZodType<Prisma.TagCreateArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  data: z.union([ TagCreateInputSchema,TagUncheckedCreateInputSchema ]),
}).strict() ;

export const TagUpsertArgsSchema: z.ZodType<Prisma.TagUpsertArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereUniqueInputSchema,
  create: z.union([ TagCreateInputSchema,TagUncheckedCreateInputSchema ]),
  update: z.union([ TagUpdateInputSchema,TagUncheckedUpdateInputSchema ]),
}).strict() ;

export const TagCreateManyArgsSchema: z.ZodType<Prisma.TagCreateManyArgs> = z.object({
  data: z.union([ TagCreateManyInputSchema,TagCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const TagCreateManyAndReturnArgsSchema: z.ZodType<Prisma.TagCreateManyAndReturnArgs> = z.object({
  data: z.union([ TagCreateManyInputSchema,TagCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const TagDeleteArgsSchema: z.ZodType<Prisma.TagDeleteArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  where: TagWhereUniqueInputSchema,
}).strict() ;

export const TagUpdateArgsSchema: z.ZodType<Prisma.TagUpdateArgs> = z.object({
  select: TagSelectSchema.optional(),
  include: TagIncludeSchema.optional(),
  data: z.union([ TagUpdateInputSchema,TagUncheckedUpdateInputSchema ]),
  where: TagWhereUniqueInputSchema,
}).strict() ;

export const TagUpdateManyArgsSchema: z.ZodType<Prisma.TagUpdateManyArgs> = z.object({
  data: z.union([ TagUpdateManyMutationInputSchema,TagUncheckedUpdateManyInputSchema ]),
  where: TagWhereInputSchema.optional(),
}).strict() ;

export const TagDeleteManyArgsSchema: z.ZodType<Prisma.TagDeleteManyArgs> = z.object({
  where: TagWhereInputSchema.optional(),
}).strict() ;

export const NewsCreateArgsSchema: z.ZodType<Prisma.NewsCreateArgs> = z.object({
  select: NewsSelectSchema.optional(),
  include: NewsIncludeSchema.optional(),
  data: z.union([ NewsCreateInputSchema,NewsUncheckedCreateInputSchema ]),
}).strict() ;

export const NewsUpsertArgsSchema: z.ZodType<Prisma.NewsUpsertArgs> = z.object({
  select: NewsSelectSchema.optional(),
  include: NewsIncludeSchema.optional(),
  where: NewsWhereUniqueInputSchema,
  create: z.union([ NewsCreateInputSchema,NewsUncheckedCreateInputSchema ]),
  update: z.union([ NewsUpdateInputSchema,NewsUncheckedUpdateInputSchema ]),
}).strict() ;

export const NewsCreateManyArgsSchema: z.ZodType<Prisma.NewsCreateManyArgs> = z.object({
  data: z.union([ NewsCreateManyInputSchema,NewsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const NewsCreateManyAndReturnArgsSchema: z.ZodType<Prisma.NewsCreateManyAndReturnArgs> = z.object({
  data: z.union([ NewsCreateManyInputSchema,NewsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const NewsDeleteArgsSchema: z.ZodType<Prisma.NewsDeleteArgs> = z.object({
  select: NewsSelectSchema.optional(),
  include: NewsIncludeSchema.optional(),
  where: NewsWhereUniqueInputSchema,
}).strict() ;

export const NewsUpdateArgsSchema: z.ZodType<Prisma.NewsUpdateArgs> = z.object({
  select: NewsSelectSchema.optional(),
  include: NewsIncludeSchema.optional(),
  data: z.union([ NewsUpdateInputSchema,NewsUncheckedUpdateInputSchema ]),
  where: NewsWhereUniqueInputSchema,
}).strict() ;

export const NewsUpdateManyArgsSchema: z.ZodType<Prisma.NewsUpdateManyArgs> = z.object({
  data: z.union([ NewsUpdateManyMutationInputSchema,NewsUncheckedUpdateManyInputSchema ]),
  where: NewsWhereInputSchema.optional(),
}).strict() ;

export const NewsDeleteManyArgsSchema: z.ZodType<Prisma.NewsDeleteManyArgs> = z.object({
  where: NewsWhereInputSchema.optional(),
}).strict() ;

export const hermesCreateArgsSchema: z.ZodType<Prisma.hermesCreateArgs> = z.object({
  select: hermesSelectSchema.optional(),
  data: z.union([ hermesCreateInputSchema,hermesUncheckedCreateInputSchema ]).optional(),
}).strict() ;

export const hermesUpsertArgsSchema: z.ZodType<Prisma.hermesUpsertArgs> = z.object({
  select: hermesSelectSchema.optional(),
  where: hermesWhereUniqueInputSchema,
  create: z.union([ hermesCreateInputSchema,hermesUncheckedCreateInputSchema ]),
  update: z.union([ hermesUpdateInputSchema,hermesUncheckedUpdateInputSchema ]),
}).strict() ;

export const hermesCreateManyArgsSchema: z.ZodType<Prisma.hermesCreateManyArgs> = z.object({
  data: z.union([ hermesCreateManyInputSchema,hermesCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const hermesCreateManyAndReturnArgsSchema: z.ZodType<Prisma.hermesCreateManyAndReturnArgs> = z.object({
  data: z.union([ hermesCreateManyInputSchema,hermesCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const hermesDeleteArgsSchema: z.ZodType<Prisma.hermesDeleteArgs> = z.object({
  select: hermesSelectSchema.optional(),
  where: hermesWhereUniqueInputSchema,
}).strict() ;

export const hermesUpdateArgsSchema: z.ZodType<Prisma.hermesUpdateArgs> = z.object({
  select: hermesSelectSchema.optional(),
  data: z.union([ hermesUpdateInputSchema,hermesUncheckedUpdateInputSchema ]),
  where: hermesWhereUniqueInputSchema,
}).strict() ;

export const hermesUpdateManyArgsSchema: z.ZodType<Prisma.hermesUpdateManyArgs> = z.object({
  data: z.union([ hermesUpdateManyMutationInputSchema,hermesUncheckedUpdateManyInputSchema ]),
  where: hermesWhereInputSchema.optional(),
}).strict() ;

export const hermesDeleteManyArgsSchema: z.ZodType<Prisma.hermesDeleteManyArgs> = z.object({
  where: hermesWhereInputSchema.optional(),
}).strict() ;

export const back3nd_userCreateArgsSchema: z.ZodType<Prisma.back3nd_userCreateArgs> = z.object({
  select: back3nd_userSelectSchema.optional(),
  include: back3nd_userIncludeSchema.optional(),
  data: z.union([ back3nd_userCreateInputSchema,back3nd_userUncheckedCreateInputSchema ]),
}).strict() ;

export const back3nd_userUpsertArgsSchema: z.ZodType<Prisma.back3nd_userUpsertArgs> = z.object({
  select: back3nd_userSelectSchema.optional(),
  include: back3nd_userIncludeSchema.optional(),
  where: back3nd_userWhereUniqueInputSchema,
  create: z.union([ back3nd_userCreateInputSchema,back3nd_userUncheckedCreateInputSchema ]),
  update: z.union([ back3nd_userUpdateInputSchema,back3nd_userUncheckedUpdateInputSchema ]),
}).strict() ;

export const back3nd_userCreateManyArgsSchema: z.ZodType<Prisma.back3nd_userCreateManyArgs> = z.object({
  data: z.union([ back3nd_userCreateManyInputSchema,back3nd_userCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const back3nd_userCreateManyAndReturnArgsSchema: z.ZodType<Prisma.back3nd_userCreateManyAndReturnArgs> = z.object({
  data: z.union([ back3nd_userCreateManyInputSchema,back3nd_userCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const back3nd_userDeleteArgsSchema: z.ZodType<Prisma.back3nd_userDeleteArgs> = z.object({
  select: back3nd_userSelectSchema.optional(),
  include: back3nd_userIncludeSchema.optional(),
  where: back3nd_userWhereUniqueInputSchema,
}).strict() ;

export const back3nd_userUpdateArgsSchema: z.ZodType<Prisma.back3nd_userUpdateArgs> = z.object({
  select: back3nd_userSelectSchema.optional(),
  include: back3nd_userIncludeSchema.optional(),
  data: z.union([ back3nd_userUpdateInputSchema,back3nd_userUncheckedUpdateInputSchema ]),
  where: back3nd_userWhereUniqueInputSchema,
}).strict() ;

export const back3nd_userUpdateManyArgsSchema: z.ZodType<Prisma.back3nd_userUpdateManyArgs> = z.object({
  data: z.union([ back3nd_userUpdateManyMutationInputSchema,back3nd_userUncheckedUpdateManyInputSchema ]),
  where: back3nd_userWhereInputSchema.optional(),
}).strict() ;

export const back3nd_userDeleteManyArgsSchema: z.ZodType<Prisma.back3nd_userDeleteManyArgs> = z.object({
  where: back3nd_userWhereInputSchema.optional(),
}).strict() ;

export const back3nd_roleCreateArgsSchema: z.ZodType<Prisma.back3nd_roleCreateArgs> = z.object({
  select: back3nd_roleSelectSchema.optional(),
  include: back3nd_roleIncludeSchema.optional(),
  data: z.union([ back3nd_roleCreateInputSchema,back3nd_roleUncheckedCreateInputSchema ]),
}).strict() ;

export const back3nd_roleUpsertArgsSchema: z.ZodType<Prisma.back3nd_roleUpsertArgs> = z.object({
  select: back3nd_roleSelectSchema.optional(),
  include: back3nd_roleIncludeSchema.optional(),
  where: back3nd_roleWhereUniqueInputSchema,
  create: z.union([ back3nd_roleCreateInputSchema,back3nd_roleUncheckedCreateInputSchema ]),
  update: z.union([ back3nd_roleUpdateInputSchema,back3nd_roleUncheckedUpdateInputSchema ]),
}).strict() ;

export const back3nd_roleCreateManyArgsSchema: z.ZodType<Prisma.back3nd_roleCreateManyArgs> = z.object({
  data: z.union([ back3nd_roleCreateManyInputSchema,back3nd_roleCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const back3nd_roleCreateManyAndReturnArgsSchema: z.ZodType<Prisma.back3nd_roleCreateManyAndReturnArgs> = z.object({
  data: z.union([ back3nd_roleCreateManyInputSchema,back3nd_roleCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const back3nd_roleDeleteArgsSchema: z.ZodType<Prisma.back3nd_roleDeleteArgs> = z.object({
  select: back3nd_roleSelectSchema.optional(),
  include: back3nd_roleIncludeSchema.optional(),
  where: back3nd_roleWhereUniqueInputSchema,
}).strict() ;

export const back3nd_roleUpdateArgsSchema: z.ZodType<Prisma.back3nd_roleUpdateArgs> = z.object({
  select: back3nd_roleSelectSchema.optional(),
  include: back3nd_roleIncludeSchema.optional(),
  data: z.union([ back3nd_roleUpdateInputSchema,back3nd_roleUncheckedUpdateInputSchema ]),
  where: back3nd_roleWhereUniqueInputSchema,
}).strict() ;

export const back3nd_roleUpdateManyArgsSchema: z.ZodType<Prisma.back3nd_roleUpdateManyArgs> = z.object({
  data: z.union([ back3nd_roleUpdateManyMutationInputSchema,back3nd_roleUncheckedUpdateManyInputSchema ]),
  where: back3nd_roleWhereInputSchema.optional(),
}).strict() ;

export const back3nd_roleDeleteManyArgsSchema: z.ZodType<Prisma.back3nd_roleDeleteManyArgs> = z.object({
  where: back3nd_roleWhereInputSchema.optional(),
}).strict() ;

export const back3nd_user_roleCreateArgsSchema: z.ZodType<Prisma.back3nd_user_roleCreateArgs> = z.object({
  select: back3nd_user_roleSelectSchema.optional(),
  include: back3nd_user_roleIncludeSchema.optional(),
  data: z.union([ back3nd_user_roleCreateInputSchema,back3nd_user_roleUncheckedCreateInputSchema ]),
}).strict() ;

export const back3nd_user_roleUpsertArgsSchema: z.ZodType<Prisma.back3nd_user_roleUpsertArgs> = z.object({
  select: back3nd_user_roleSelectSchema.optional(),
  include: back3nd_user_roleIncludeSchema.optional(),
  where: back3nd_user_roleWhereUniqueInputSchema,
  create: z.union([ back3nd_user_roleCreateInputSchema,back3nd_user_roleUncheckedCreateInputSchema ]),
  update: z.union([ back3nd_user_roleUpdateInputSchema,back3nd_user_roleUncheckedUpdateInputSchema ]),
}).strict() ;

export const back3nd_user_roleCreateManyArgsSchema: z.ZodType<Prisma.back3nd_user_roleCreateManyArgs> = z.object({
  data: z.union([ back3nd_user_roleCreateManyInputSchema,back3nd_user_roleCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const back3nd_user_roleCreateManyAndReturnArgsSchema: z.ZodType<Prisma.back3nd_user_roleCreateManyAndReturnArgs> = z.object({
  data: z.union([ back3nd_user_roleCreateManyInputSchema,back3nd_user_roleCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const back3nd_user_roleDeleteArgsSchema: z.ZodType<Prisma.back3nd_user_roleDeleteArgs> = z.object({
  select: back3nd_user_roleSelectSchema.optional(),
  include: back3nd_user_roleIncludeSchema.optional(),
  where: back3nd_user_roleWhereUniqueInputSchema,
}).strict() ;

export const back3nd_user_roleUpdateArgsSchema: z.ZodType<Prisma.back3nd_user_roleUpdateArgs> = z.object({
  select: back3nd_user_roleSelectSchema.optional(),
  include: back3nd_user_roleIncludeSchema.optional(),
  data: z.union([ back3nd_user_roleUpdateInputSchema,back3nd_user_roleUncheckedUpdateInputSchema ]),
  where: back3nd_user_roleWhereUniqueInputSchema,
}).strict() ;

export const back3nd_user_roleUpdateManyArgsSchema: z.ZodType<Prisma.back3nd_user_roleUpdateManyArgs> = z.object({
  data: z.union([ back3nd_user_roleUpdateManyMutationInputSchema,back3nd_user_roleUncheckedUpdateManyInputSchema ]),
  where: back3nd_user_roleWhereInputSchema.optional(),
}).strict() ;

export const back3nd_user_roleDeleteManyArgsSchema: z.ZodType<Prisma.back3nd_user_roleDeleteManyArgs> = z.object({
  where: back3nd_user_roleWhereInputSchema.optional(),
}).strict() ;

export const back3nd_permissionCreateArgsSchema: z.ZodType<Prisma.back3nd_permissionCreateArgs> = z.object({
  select: back3nd_permissionSelectSchema.optional(),
  include: back3nd_permissionIncludeSchema.optional(),
  data: z.union([ back3nd_permissionCreateInputSchema,back3nd_permissionUncheckedCreateInputSchema ]),
}).strict() ;

export const back3nd_permissionUpsertArgsSchema: z.ZodType<Prisma.back3nd_permissionUpsertArgs> = z.object({
  select: back3nd_permissionSelectSchema.optional(),
  include: back3nd_permissionIncludeSchema.optional(),
  where: back3nd_permissionWhereUniqueInputSchema,
  create: z.union([ back3nd_permissionCreateInputSchema,back3nd_permissionUncheckedCreateInputSchema ]),
  update: z.union([ back3nd_permissionUpdateInputSchema,back3nd_permissionUncheckedUpdateInputSchema ]),
}).strict() ;

export const back3nd_permissionCreateManyArgsSchema: z.ZodType<Prisma.back3nd_permissionCreateManyArgs> = z.object({
  data: z.union([ back3nd_permissionCreateManyInputSchema,back3nd_permissionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const back3nd_permissionCreateManyAndReturnArgsSchema: z.ZodType<Prisma.back3nd_permissionCreateManyAndReturnArgs> = z.object({
  data: z.union([ back3nd_permissionCreateManyInputSchema,back3nd_permissionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const back3nd_permissionDeleteArgsSchema: z.ZodType<Prisma.back3nd_permissionDeleteArgs> = z.object({
  select: back3nd_permissionSelectSchema.optional(),
  include: back3nd_permissionIncludeSchema.optional(),
  where: back3nd_permissionWhereUniqueInputSchema,
}).strict() ;

export const back3nd_permissionUpdateArgsSchema: z.ZodType<Prisma.back3nd_permissionUpdateArgs> = z.object({
  select: back3nd_permissionSelectSchema.optional(),
  include: back3nd_permissionIncludeSchema.optional(),
  data: z.union([ back3nd_permissionUpdateInputSchema,back3nd_permissionUncheckedUpdateInputSchema ]),
  where: back3nd_permissionWhereUniqueInputSchema,
}).strict() ;

export const back3nd_permissionUpdateManyArgsSchema: z.ZodType<Prisma.back3nd_permissionUpdateManyArgs> = z.object({
  data: z.union([ back3nd_permissionUpdateManyMutationInputSchema,back3nd_permissionUncheckedUpdateManyInputSchema ]),
  where: back3nd_permissionWhereInputSchema.optional(),
}).strict() ;

export const back3nd_permissionDeleteManyArgsSchema: z.ZodType<Prisma.back3nd_permissionDeleteManyArgs> = z.object({
  where: back3nd_permissionWhereInputSchema.optional(),
}).strict() ;

export const back3nd_entityCreateArgsSchema: z.ZodType<Prisma.back3nd_entityCreateArgs> = z.object({
  select: back3nd_entitySelectSchema.optional(),
  include: back3nd_entityIncludeSchema.optional(),
  data: z.union([ back3nd_entityCreateInputSchema,back3nd_entityUncheckedCreateInputSchema ]),
}).strict() ;

export const back3nd_entityUpsertArgsSchema: z.ZodType<Prisma.back3nd_entityUpsertArgs> = z.object({
  select: back3nd_entitySelectSchema.optional(),
  include: back3nd_entityIncludeSchema.optional(),
  where: back3nd_entityWhereUniqueInputSchema,
  create: z.union([ back3nd_entityCreateInputSchema,back3nd_entityUncheckedCreateInputSchema ]),
  update: z.union([ back3nd_entityUpdateInputSchema,back3nd_entityUncheckedUpdateInputSchema ]),
}).strict() ;

export const back3nd_entityCreateManyArgsSchema: z.ZodType<Prisma.back3nd_entityCreateManyArgs> = z.object({
  data: z.union([ back3nd_entityCreateManyInputSchema,back3nd_entityCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const back3nd_entityCreateManyAndReturnArgsSchema: z.ZodType<Prisma.back3nd_entityCreateManyAndReturnArgs> = z.object({
  data: z.union([ back3nd_entityCreateManyInputSchema,back3nd_entityCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const back3nd_entityDeleteArgsSchema: z.ZodType<Prisma.back3nd_entityDeleteArgs> = z.object({
  select: back3nd_entitySelectSchema.optional(),
  include: back3nd_entityIncludeSchema.optional(),
  where: back3nd_entityWhereUniqueInputSchema,
}).strict() ;

export const back3nd_entityUpdateArgsSchema: z.ZodType<Prisma.back3nd_entityUpdateArgs> = z.object({
  select: back3nd_entitySelectSchema.optional(),
  include: back3nd_entityIncludeSchema.optional(),
  data: z.union([ back3nd_entityUpdateInputSchema,back3nd_entityUncheckedUpdateInputSchema ]),
  where: back3nd_entityWhereUniqueInputSchema,
}).strict() ;

export const back3nd_entityUpdateManyArgsSchema: z.ZodType<Prisma.back3nd_entityUpdateManyArgs> = z.object({
  data: z.union([ back3nd_entityUpdateManyMutationInputSchema,back3nd_entityUncheckedUpdateManyInputSchema ]),
  where: back3nd_entityWhereInputSchema.optional(),
}).strict() ;

export const back3nd_entityDeleteManyArgsSchema: z.ZodType<Prisma.back3nd_entityDeleteManyArgs> = z.object({
  where: back3nd_entityWhereInputSchema.optional(),
}).strict() ;

export const back3nd_entity_fieldsCreateArgsSchema: z.ZodType<Prisma.back3nd_entity_fieldsCreateArgs> = z.object({
  select: back3nd_entity_fieldsSelectSchema.optional(),
  include: back3nd_entity_fieldsIncludeSchema.optional(),
  data: z.union([ back3nd_entity_fieldsCreateInputSchema,back3nd_entity_fieldsUncheckedCreateInputSchema ]),
}).strict() ;

export const back3nd_entity_fieldsUpsertArgsSchema: z.ZodType<Prisma.back3nd_entity_fieldsUpsertArgs> = z.object({
  select: back3nd_entity_fieldsSelectSchema.optional(),
  include: back3nd_entity_fieldsIncludeSchema.optional(),
  where: back3nd_entity_fieldsWhereUniqueInputSchema,
  create: z.union([ back3nd_entity_fieldsCreateInputSchema,back3nd_entity_fieldsUncheckedCreateInputSchema ]),
  update: z.union([ back3nd_entity_fieldsUpdateInputSchema,back3nd_entity_fieldsUncheckedUpdateInputSchema ]),
}).strict() ;

export const back3nd_entity_fieldsCreateManyArgsSchema: z.ZodType<Prisma.back3nd_entity_fieldsCreateManyArgs> = z.object({
  data: z.union([ back3nd_entity_fieldsCreateManyInputSchema,back3nd_entity_fieldsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const back3nd_entity_fieldsCreateManyAndReturnArgsSchema: z.ZodType<Prisma.back3nd_entity_fieldsCreateManyAndReturnArgs> = z.object({
  data: z.union([ back3nd_entity_fieldsCreateManyInputSchema,back3nd_entity_fieldsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const back3nd_entity_fieldsDeleteArgsSchema: z.ZodType<Prisma.back3nd_entity_fieldsDeleteArgs> = z.object({
  select: back3nd_entity_fieldsSelectSchema.optional(),
  include: back3nd_entity_fieldsIncludeSchema.optional(),
  where: back3nd_entity_fieldsWhereUniqueInputSchema,
}).strict() ;

export const back3nd_entity_fieldsUpdateArgsSchema: z.ZodType<Prisma.back3nd_entity_fieldsUpdateArgs> = z.object({
  select: back3nd_entity_fieldsSelectSchema.optional(),
  include: back3nd_entity_fieldsIncludeSchema.optional(),
  data: z.union([ back3nd_entity_fieldsUpdateInputSchema,back3nd_entity_fieldsUncheckedUpdateInputSchema ]),
  where: back3nd_entity_fieldsWhereUniqueInputSchema,
}).strict() ;

export const back3nd_entity_fieldsUpdateManyArgsSchema: z.ZodType<Prisma.back3nd_entity_fieldsUpdateManyArgs> = z.object({
  data: z.union([ back3nd_entity_fieldsUpdateManyMutationInputSchema,back3nd_entity_fieldsUncheckedUpdateManyInputSchema ]),
  where: back3nd_entity_fieldsWhereInputSchema.optional(),
}).strict() ;

export const back3nd_entity_fieldsDeleteManyArgsSchema: z.ZodType<Prisma.back3nd_entity_fieldsDeleteManyArgs> = z.object({
  where: back3nd_entity_fieldsWhereInputSchema.optional(),
}).strict() ;

export const back3nd_password_resetCreateArgsSchema: z.ZodType<Prisma.back3nd_password_resetCreateArgs> = z.object({
  select: back3nd_password_resetSelectSchema.optional(),
  include: back3nd_password_resetIncludeSchema.optional(),
  data: z.union([ back3nd_password_resetCreateInputSchema,back3nd_password_resetUncheckedCreateInputSchema ]),
}).strict() ;

export const back3nd_password_resetUpsertArgsSchema: z.ZodType<Prisma.back3nd_password_resetUpsertArgs> = z.object({
  select: back3nd_password_resetSelectSchema.optional(),
  include: back3nd_password_resetIncludeSchema.optional(),
  where: back3nd_password_resetWhereUniqueInputSchema,
  create: z.union([ back3nd_password_resetCreateInputSchema,back3nd_password_resetUncheckedCreateInputSchema ]),
  update: z.union([ back3nd_password_resetUpdateInputSchema,back3nd_password_resetUncheckedUpdateInputSchema ]),
}).strict() ;

export const back3nd_password_resetCreateManyArgsSchema: z.ZodType<Prisma.back3nd_password_resetCreateManyArgs> = z.object({
  data: z.union([ back3nd_password_resetCreateManyInputSchema,back3nd_password_resetCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const back3nd_password_resetCreateManyAndReturnArgsSchema: z.ZodType<Prisma.back3nd_password_resetCreateManyAndReturnArgs> = z.object({
  data: z.union([ back3nd_password_resetCreateManyInputSchema,back3nd_password_resetCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const back3nd_password_resetDeleteArgsSchema: z.ZodType<Prisma.back3nd_password_resetDeleteArgs> = z.object({
  select: back3nd_password_resetSelectSchema.optional(),
  include: back3nd_password_resetIncludeSchema.optional(),
  where: back3nd_password_resetWhereUniqueInputSchema,
}).strict() ;

export const back3nd_password_resetUpdateArgsSchema: z.ZodType<Prisma.back3nd_password_resetUpdateArgs> = z.object({
  select: back3nd_password_resetSelectSchema.optional(),
  include: back3nd_password_resetIncludeSchema.optional(),
  data: z.union([ back3nd_password_resetUpdateInputSchema,back3nd_password_resetUncheckedUpdateInputSchema ]),
  where: back3nd_password_resetWhereUniqueInputSchema,
}).strict() ;

export const back3nd_password_resetUpdateManyArgsSchema: z.ZodType<Prisma.back3nd_password_resetUpdateManyArgs> = z.object({
  data: z.union([ back3nd_password_resetUpdateManyMutationInputSchema,back3nd_password_resetUncheckedUpdateManyInputSchema ]),
  where: back3nd_password_resetWhereInputSchema.optional(),
}).strict() ;

export const back3nd_password_resetDeleteManyArgsSchema: z.ZodType<Prisma.back3nd_password_resetDeleteManyArgs> = z.object({
  where: back3nd_password_resetWhereInputSchema.optional(),
}).strict() ;