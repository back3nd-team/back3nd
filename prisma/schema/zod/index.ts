import { z } from 'zod';
import { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

// JSON
//------------------------------------------------------

export type NullableJsonInput = Prisma.JsonValue | null | 'JsonNull' | 'DbNull' | Prisma.NullTypes.DbNull | Prisma.NullTypes.JsonNull;

export const transformJsonNull = (v?: NullableJsonInput) => {
  if (!v || v === 'DbNull') return Prisma.DbNull;
  if (v === 'JsonNull') return Prisma.JsonNull;
  return v;
};

export const JsonValueSchema: z.ZodType<Prisma.JsonValue> = z.lazy(() =>
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.literal(null),
    z.record(z.lazy(() => JsonValueSchema.optional())),
    z.array(z.lazy(() => JsonValueSchema)),
  ])
);

export type JsonValueType = z.infer<typeof JsonValueSchema>;

export const NullableJsonValue = z
  .union([JsonValueSchema, z.literal('DbNull'), z.literal('JsonNull')])
  .nullable()
  .transform((v) => transformJsonNull(v));

export type NullableJsonValueType = z.infer<typeof NullableJsonValue>;

export const InputJsonValueSchema: z.ZodType<Prisma.InputJsonValue> = z.lazy(() =>
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.object({ toJSON: z.function(z.tuple([]), z.any()) }),
    z.record(z.lazy(() => z.union([InputJsonValueSchema, z.literal(null)]))),
    z.array(z.lazy(() => z.union([InputJsonValueSchema, z.literal(null)]))),
  ])
);

export type InputJsonValueType = z.infer<typeof InputJsonValueSchema>;


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const InstitutionScalarFieldEnumSchema = z.enum(['id','name','address','city','state','postalcode','phone','email','metadata','user_created','singleton','created_at','updated_at']);

export const Back3nd_userScalarFieldEnumSchema = z.enum(['id','name','email','password','reset_token','created_at','updated_at']);

export const Back3nd_roleScalarFieldEnumSchema = z.enum(['id','name','description','created_at','updated_at']);

export const Back3nd_user_roleScalarFieldEnumSchema = z.enum(['id','user_id','role_id','created_at']);

export const Back3nd_permissionScalarFieldEnumSchema = z.enum(['id','role_id','can_create','can_read','can_update','can_delete','created_at','collection']);

export const Back3nd_password_resetScalarFieldEnumSchema = z.enum(['id','user_id','token','created_at','expires_at']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const NullableJsonNullValueInputSchema = z.enum(['DbNull','JsonNull',]).transform((value) => value === 'JsonNull' ? Prisma.JsonNull : value === 'DbNull' ? Prisma.DbNull : value);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const JsonNullValueFilterSchema = z.enum(['DbNull','JsonNull','AnyNull',]).transform((value) => value === 'JsonNull' ? Prisma.JsonNull : value === 'DbNull' ? Prisma.JsonNull : value === 'AnyNull' ? Prisma.AnyNull : value);

export const NullsOrderSchema = z.enum(['first','last']);

export const institutionOrderByRelevanceFieldEnumSchema = z.enum(['id','name','address','city','state','postalcode','phone','email','user_created']);

export const back3nd_userOrderByRelevanceFieldEnumSchema = z.enum(['id','name','email','password','reset_token']);

export const back3nd_roleOrderByRelevanceFieldEnumSchema = z.enum(['id','name','description']);

export const back3nd_user_roleOrderByRelevanceFieldEnumSchema = z.enum(['id','user_id','role_id']);

export const back3nd_permissionOrderByRelevanceFieldEnumSchema = z.enum(['id','role_id','collection']);

export const back3nd_password_resetOrderByRelevanceFieldEnumSchema = z.enum(['id','user_id','token']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// INSTITUTION SCHEMA
/////////////////////////////////////////

export const institutionSchema = z.object({
  id: z.string(),
  name: z.string(),
  address: z.string().nullable(),
  city: z.string().nullable(),
  state: z.string().nullable(),
  postalcode: z.string().nullable(),
  phone: z.string().nullable(),
  email: z.string().nullable(),
  metadata: JsonValueSchema.nullable(),
  user_created: z.string().nullable(),
  singleton: z.number().int(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date().nullable(),
})

export type institution = z.infer<typeof institutionSchema>

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
  can_create: z.boolean(),
  can_read: z.boolean(),
  can_update: z.boolean(),
  can_delete: z.boolean(),
  created_at: z.coerce.date(),
  collection: z.string(),
})

export type back3nd_permission = z.infer<typeof back3nd_permissionSchema>

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

// INSTITUTION
//------------------------------------------------------

export const institutionSelectSchema: z.ZodType<Prisma.institutionSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  address: z.boolean().optional(),
  city: z.boolean().optional(),
  state: z.boolean().optional(),
  postalcode: z.boolean().optional(),
  phone: z.boolean().optional(),
  email: z.boolean().optional(),
  metadata: z.boolean().optional(),
  user_created: z.boolean().optional(),
  singleton: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
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
}).strict()

export const back3nd_permissionArgsSchema: z.ZodType<Prisma.back3nd_permissionDefaultArgs> = z.object({
  select: z.lazy(() => back3nd_permissionSelectSchema).optional(),
  include: z.lazy(() => back3nd_permissionIncludeSchema).optional(),
}).strict();

export const back3nd_permissionSelectSchema: z.ZodType<Prisma.back3nd_permissionSelect> = z.object({
  id: z.boolean().optional(),
  role_id: z.boolean().optional(),
  can_create: z.boolean().optional(),
  can_read: z.boolean().optional(),
  can_update: z.boolean().optional(),
  can_delete: z.boolean().optional(),
  created_at: z.boolean().optional(),
  collection: z.boolean().optional(),
  role: z.union([z.boolean(),z.lazy(() => back3nd_roleArgsSchema)]).optional(),
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

export const institutionWhereInputSchema: z.ZodType<Prisma.institutionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => institutionWhereInputSchema),z.lazy(() => institutionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => institutionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => institutionWhereInputSchema),z.lazy(() => institutionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  address: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  city: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  state: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  postalcode: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  phone: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  metadata: z.lazy(() => JsonNullableFilterSchema).optional(),
  user_created: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  singleton: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const institutionOrderByWithRelationInputSchema: z.ZodType<Prisma.institutionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  address: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  city: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  state: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  postalcode: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  phone: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  email: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  metadata: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_created: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  singleton: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _relevance: z.lazy(() => institutionOrderByRelevanceInputSchema).optional()
}).strict();

export const institutionWhereUniqueInputSchema: z.ZodType<Prisma.institutionWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => institutionWhereInputSchema),z.lazy(() => institutionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => institutionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => institutionWhereInputSchema),z.lazy(() => institutionWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  address: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  city: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  state: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  postalcode: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  phone: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  metadata: z.lazy(() => JsonNullableFilterSchema).optional(),
  user_created: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  singleton: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict());

export const institutionOrderByWithAggregationInputSchema: z.ZodType<Prisma.institutionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  address: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  city: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  state: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  postalcode: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  phone: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  email: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  metadata: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_created: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  singleton: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => institutionCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => institutionAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => institutionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => institutionMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => institutionSumOrderByAggregateInputSchema).optional()
}).strict();

export const institutionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.institutionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => institutionScalarWhereWithAggregatesInputSchema),z.lazy(() => institutionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => institutionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => institutionScalarWhereWithAggregatesInputSchema),z.lazy(() => institutionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  address: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  city: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  state: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  postalcode: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  phone: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  metadata: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  user_created: z.union([ z.lazy(() => UuidNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  singleton: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
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
  can_create: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  can_read: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  can_update: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  can_delete: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  collection: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  role: z.union([ z.lazy(() => Back3nd_roleRelationFilterSchema),z.lazy(() => back3nd_roleWhereInputSchema) ]).optional(),
}).strict();

export const back3nd_permissionOrderByWithRelationInputSchema: z.ZodType<Prisma.back3nd_permissionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  role_id: z.lazy(() => SortOrderSchema).optional(),
  can_create: z.lazy(() => SortOrderSchema).optional(),
  can_read: z.lazy(() => SortOrderSchema).optional(),
  can_update: z.lazy(() => SortOrderSchema).optional(),
  can_delete: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  collection: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => back3nd_roleOrderByWithRelationInputSchema).optional(),
  _relevance: z.lazy(() => back3nd_permissionOrderByRelevanceInputSchema).optional()
}).strict();

export const back3nd_permissionWhereUniqueInputSchema: z.ZodType<Prisma.back3nd_permissionWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    role_id_collection: z.lazy(() => back3nd_permissionRole_idCollectionCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    role_id_collection: z.lazy(() => back3nd_permissionRole_idCollectionCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().optional(),
  role_id_collection: z.lazy(() => back3nd_permissionRole_idCollectionCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => back3nd_permissionWhereInputSchema),z.lazy(() => back3nd_permissionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => back3nd_permissionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => back3nd_permissionWhereInputSchema),z.lazy(() => back3nd_permissionWhereInputSchema).array() ]).optional(),
  role_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  can_create: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  can_read: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  can_update: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  can_delete: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  collection: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  role: z.union([ z.lazy(() => Back3nd_roleRelationFilterSchema),z.lazy(() => back3nd_roleWhereInputSchema) ]).optional(),
}).strict());

export const back3nd_permissionOrderByWithAggregationInputSchema: z.ZodType<Prisma.back3nd_permissionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  role_id: z.lazy(() => SortOrderSchema).optional(),
  can_create: z.lazy(() => SortOrderSchema).optional(),
  can_read: z.lazy(() => SortOrderSchema).optional(),
  can_update: z.lazy(() => SortOrderSchema).optional(),
  can_delete: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  collection: z.lazy(() => SortOrderSchema).optional(),
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
  can_create: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  can_read: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  can_update: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  can_delete: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  collection: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
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

export const institutionCreateInputSchema: z.ZodType<Prisma.institutionCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  address: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  state: z.string().optional().nullable(),
  postalcode: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  user_created: z.string().optional().nullable(),
  singleton: z.number().int().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable()
}).strict();

export const institutionUncheckedCreateInputSchema: z.ZodType<Prisma.institutionUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  address: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  state: z.string().optional().nullable(),
  postalcode: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  user_created: z.string().optional().nullable(),
  singleton: z.number().int().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable()
}).strict();

export const institutionUpdateInputSchema: z.ZodType<Prisma.institutionUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  city: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  postalcode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  user_created: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  singleton: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const institutionUncheckedUpdateInputSchema: z.ZodType<Prisma.institutionUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  city: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  postalcode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  user_created: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  singleton: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const institutionCreateManyInputSchema: z.ZodType<Prisma.institutionCreateManyInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  address: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  state: z.string().optional().nullable(),
  postalcode: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  user_created: z.string().optional().nullable(),
  singleton: z.number().int().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable()
}).strict();

export const institutionUpdateManyMutationInputSchema: z.ZodType<Prisma.institutionUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  city: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  postalcode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  user_created: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  singleton: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const institutionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.institutionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  city: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  postalcode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  user_created: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  singleton: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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
  collection: z.string(),
  role: z.lazy(() => back3nd_roleCreateNestedOneWithoutPermissionsInputSchema)
}).strict();

export const back3nd_permissionUncheckedCreateInputSchema: z.ZodType<Prisma.back3nd_permissionUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  role_id: z.string(),
  can_create: z.boolean().optional(),
  can_read: z.boolean().optional(),
  can_update: z.boolean().optional(),
  can_delete: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  collection: z.string()
}).strict();

export const back3nd_permissionUpdateInputSchema: z.ZodType<Prisma.back3nd_permissionUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  can_create: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_read: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_update: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_delete: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  collection: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.lazy(() => back3nd_roleUpdateOneRequiredWithoutPermissionsNestedInputSchema).optional()
}).strict();

export const back3nd_permissionUncheckedUpdateInputSchema: z.ZodType<Prisma.back3nd_permissionUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  can_create: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_read: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_update: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_delete: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  collection: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const back3nd_permissionCreateManyInputSchema: z.ZodType<Prisma.back3nd_permissionCreateManyInput> = z.object({
  id: z.string().optional(),
  role_id: z.string(),
  can_create: z.boolean().optional(),
  can_read: z.boolean().optional(),
  can_update: z.boolean().optional(),
  can_delete: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  collection: z.string()
}).strict();

export const back3nd_permissionUpdateManyMutationInputSchema: z.ZodType<Prisma.back3nd_permissionUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  can_create: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_read: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_update: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_delete: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  collection: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const back3nd_permissionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.back3nd_permissionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  can_create: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_read: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_update: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_delete: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  collection: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
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

export const JsonNullableFilterSchema: z.ZodType<Prisma.JsonNullableFilter> = z.object({
  equals: InputJsonValueSchema.optional(),
  path: z.string().array().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValueSchema.optional().nullable(),
  array_starts_with: InputJsonValueSchema.optional().nullable(),
  array_ends_with: InputJsonValueSchema.optional().nullable(),
  lt: InputJsonValueSchema.optional(),
  lte: InputJsonValueSchema.optional(),
  gt: InputJsonValueSchema.optional(),
  gte: InputJsonValueSchema.optional(),
  not: InputJsonValueSchema.optional()
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

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
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

export const institutionOrderByRelevanceInputSchema: z.ZodType<Prisma.institutionOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => institutionOrderByRelevanceFieldEnumSchema),z.lazy(() => institutionOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const institutionCountOrderByAggregateInputSchema: z.ZodType<Prisma.institutionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  city: z.lazy(() => SortOrderSchema).optional(),
  state: z.lazy(() => SortOrderSchema).optional(),
  postalcode: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  metadata: z.lazy(() => SortOrderSchema).optional(),
  user_created: z.lazy(() => SortOrderSchema).optional(),
  singleton: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const institutionAvgOrderByAggregateInputSchema: z.ZodType<Prisma.institutionAvgOrderByAggregateInput> = z.object({
  singleton: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const institutionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.institutionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  city: z.lazy(() => SortOrderSchema).optional(),
  state: z.lazy(() => SortOrderSchema).optional(),
  postalcode: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  user_created: z.lazy(() => SortOrderSchema).optional(),
  singleton: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const institutionMinOrderByAggregateInputSchema: z.ZodType<Prisma.institutionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  city: z.lazy(() => SortOrderSchema).optional(),
  state: z.lazy(() => SortOrderSchema).optional(),
  postalcode: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  user_created: z.lazy(() => SortOrderSchema).optional(),
  singleton: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const institutionSumOrderByAggregateInputSchema: z.ZodType<Prisma.institutionSumOrderByAggregateInput> = z.object({
  singleton: z.lazy(() => SortOrderSchema).optional()
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

export const JsonNullableWithAggregatesFilterSchema: z.ZodType<Prisma.JsonNullableWithAggregatesFilter> = z.object({
  equals: InputJsonValueSchema.optional(),
  path: z.string().array().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValueSchema.optional().nullable(),
  array_starts_with: InputJsonValueSchema.optional().nullable(),
  array_ends_with: InputJsonValueSchema.optional().nullable(),
  lt: InputJsonValueSchema.optional(),
  lte: InputJsonValueSchema.optional(),
  gt: InputJsonValueSchema.optional(),
  gte: InputJsonValueSchema.optional(),
  not: InputJsonValueSchema.optional(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedJsonNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedJsonNullableFilterSchema).optional()
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

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
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

export const back3nd_permissionOrderByRelevanceInputSchema: z.ZodType<Prisma.back3nd_permissionOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => back3nd_permissionOrderByRelevanceFieldEnumSchema),z.lazy(() => back3nd_permissionOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const back3nd_permissionRole_idCollectionCompoundUniqueInputSchema: z.ZodType<Prisma.back3nd_permissionRole_idCollectionCompoundUniqueInput> = z.object({
  role_id: z.string(),
  collection: z.string()
}).strict();

export const back3nd_permissionCountOrderByAggregateInputSchema: z.ZodType<Prisma.back3nd_permissionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  role_id: z.lazy(() => SortOrderSchema).optional(),
  can_create: z.lazy(() => SortOrderSchema).optional(),
  can_read: z.lazy(() => SortOrderSchema).optional(),
  can_update: z.lazy(() => SortOrderSchema).optional(),
  can_delete: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  collection: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const back3nd_permissionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.back3nd_permissionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  role_id: z.lazy(() => SortOrderSchema).optional(),
  can_create: z.lazy(() => SortOrderSchema).optional(),
  can_read: z.lazy(() => SortOrderSchema).optional(),
  can_update: z.lazy(() => SortOrderSchema).optional(),
  can_delete: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  collection: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const back3nd_permissionMinOrderByAggregateInputSchema: z.ZodType<Prisma.back3nd_permissionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  role_id: z.lazy(() => SortOrderSchema).optional(),
  can_create: z.lazy(() => SortOrderSchema).optional(),
  can_read: z.lazy(() => SortOrderSchema).optional(),
  can_update: z.lazy(() => SortOrderSchema).optional(),
  can_delete: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  collection: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
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

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable()
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

export const NestedJsonNullableFilterSchema: z.ZodType<Prisma.NestedJsonNullableFilter> = z.object({
  equals: InputJsonValueSchema.optional(),
  path: z.string().array().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValueSchema.optional().nullable(),
  array_starts_with: InputJsonValueSchema.optional().nullable(),
  array_ends_with: InputJsonValueSchema.optional().nullable(),
  lt: InputJsonValueSchema.optional(),
  lte: InputJsonValueSchema.optional(),
  gt: InputJsonValueSchema.optional(),
  gte: InputJsonValueSchema.optional(),
  not: InputJsonValueSchema.optional()
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

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
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
  collection: z.string()
}).strict();

export const back3nd_permissionUncheckedCreateWithoutRoleInputSchema: z.ZodType<Prisma.back3nd_permissionUncheckedCreateWithoutRoleInput> = z.object({
  id: z.string().optional(),
  can_create: z.boolean().optional(),
  can_read: z.boolean().optional(),
  can_update: z.boolean().optional(),
  can_delete: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  collection: z.string()
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
  can_create: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  can_read: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  can_update: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  can_delete: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  collection: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
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
  can_create: z.boolean().optional(),
  can_read: z.boolean().optional(),
  can_update: z.boolean().optional(),
  can_delete: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  collection: z.string()
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
  collection: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const back3nd_permissionUncheckedUpdateWithoutRoleInputSchema: z.ZodType<Prisma.back3nd_permissionUncheckedUpdateWithoutRoleInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  can_create: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_read: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_update: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_delete: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  collection: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const back3nd_permissionUncheckedUpdateManyWithoutRoleInputSchema: z.ZodType<Prisma.back3nd_permissionUncheckedUpdateManyWithoutRoleInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  can_create: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_read: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_update: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  can_delete: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  collection: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
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

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const institutionFindFirstArgsSchema: z.ZodType<Prisma.institutionFindFirstArgs> = z.object({
  select: institutionSelectSchema.optional(),
  where: institutionWhereInputSchema.optional(),
  orderBy: z.union([ institutionOrderByWithRelationInputSchema.array(),institutionOrderByWithRelationInputSchema ]).optional(),
  cursor: institutionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ InstitutionScalarFieldEnumSchema,InstitutionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const institutionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.institutionFindFirstOrThrowArgs> = z.object({
  select: institutionSelectSchema.optional(),
  where: institutionWhereInputSchema.optional(),
  orderBy: z.union([ institutionOrderByWithRelationInputSchema.array(),institutionOrderByWithRelationInputSchema ]).optional(),
  cursor: institutionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ InstitutionScalarFieldEnumSchema,InstitutionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const institutionFindManyArgsSchema: z.ZodType<Prisma.institutionFindManyArgs> = z.object({
  select: institutionSelectSchema.optional(),
  where: institutionWhereInputSchema.optional(),
  orderBy: z.union([ institutionOrderByWithRelationInputSchema.array(),institutionOrderByWithRelationInputSchema ]).optional(),
  cursor: institutionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ InstitutionScalarFieldEnumSchema,InstitutionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const institutionAggregateArgsSchema: z.ZodType<Prisma.institutionAggregateArgs> = z.object({
  where: institutionWhereInputSchema.optional(),
  orderBy: z.union([ institutionOrderByWithRelationInputSchema.array(),institutionOrderByWithRelationInputSchema ]).optional(),
  cursor: institutionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const institutionGroupByArgsSchema: z.ZodType<Prisma.institutionGroupByArgs> = z.object({
  where: institutionWhereInputSchema.optional(),
  orderBy: z.union([ institutionOrderByWithAggregationInputSchema.array(),institutionOrderByWithAggregationInputSchema ]).optional(),
  by: InstitutionScalarFieldEnumSchema.array(),
  having: institutionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const institutionFindUniqueArgsSchema: z.ZodType<Prisma.institutionFindUniqueArgs> = z.object({
  select: institutionSelectSchema.optional(),
  where: institutionWhereUniqueInputSchema,
}).strict() ;

export const institutionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.institutionFindUniqueOrThrowArgs> = z.object({
  select: institutionSelectSchema.optional(),
  where: institutionWhereUniqueInputSchema,
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

export const institutionCreateArgsSchema: z.ZodType<Prisma.institutionCreateArgs> = z.object({
  select: institutionSelectSchema.optional(),
  data: z.union([ institutionCreateInputSchema,institutionUncheckedCreateInputSchema ]),
}).strict() ;

export const institutionUpsertArgsSchema: z.ZodType<Prisma.institutionUpsertArgs> = z.object({
  select: institutionSelectSchema.optional(),
  where: institutionWhereUniqueInputSchema,
  create: z.union([ institutionCreateInputSchema,institutionUncheckedCreateInputSchema ]),
  update: z.union([ institutionUpdateInputSchema,institutionUncheckedUpdateInputSchema ]),
}).strict() ;

export const institutionCreateManyArgsSchema: z.ZodType<Prisma.institutionCreateManyArgs> = z.object({
  data: z.union([ institutionCreateManyInputSchema,institutionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const institutionCreateManyAndReturnArgsSchema: z.ZodType<Prisma.institutionCreateManyAndReturnArgs> = z.object({
  data: z.union([ institutionCreateManyInputSchema,institutionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const institutionDeleteArgsSchema: z.ZodType<Prisma.institutionDeleteArgs> = z.object({
  select: institutionSelectSchema.optional(),
  where: institutionWhereUniqueInputSchema,
}).strict() ;

export const institutionUpdateArgsSchema: z.ZodType<Prisma.institutionUpdateArgs> = z.object({
  select: institutionSelectSchema.optional(),
  data: z.union([ institutionUpdateInputSchema,institutionUncheckedUpdateInputSchema ]),
  where: institutionWhereUniqueInputSchema,
}).strict() ;

export const institutionUpdateManyArgsSchema: z.ZodType<Prisma.institutionUpdateManyArgs> = z.object({
  data: z.union([ institutionUpdateManyMutationInputSchema,institutionUncheckedUpdateManyInputSchema ]),
  where: institutionWhereInputSchema.optional(),
}).strict() ;

export const institutionDeleteManyArgsSchema: z.ZodType<Prisma.institutionDeleteManyArgs> = z.object({
  where: institutionWhereInputSchema.optional(),
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