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

export const Class_sessionScalarFieldEnumSchema = z.enum(['id','school_id','discipline_id','timetable_id','day_of_week','start_time','end_time','metadata','user_created','created_at','deleted_at','updated_at']);

export const TeachertotimetableScalarFieldEnumSchema = z.enum(['a','b']);

export const Academic_yearScalarFieldEnumSchema = z.enum(['id','school_id','template_id','ref_year','metadata','created_at','updated_at','deleted_at','user_created']);

export const Academic_year_templateScalarFieldEnumSchema = z.enum(['id','ref_year','name','stages','stage_count','metadata','created_at','updated_at','deleted_at','user_created']);

export const AttendanceScalarFieldEnumSchema = z.enum(['id','school_id','student_id','date','status','metadata','user_created','created_at','deleted_at','updated_at']);

export const ClassroomScalarFieldEnumSchema = z.enum(['id','school_id','series_id','institution_id','course_id','teacher_id','max_students','start_time','start_time_interval','end_time_interval','end_time','day_of_week','name','period','status','abbreviation','year','metadata','user_created','created_at','deleted_at','updated_at']);

export const CourseScalarFieldEnumSchema = z.enum(['id','name','status','metadata','user_created','created_at','deleted_at','updated_at','teaching_type','regime_type','course_modality','workload','institution_id','course_stage','description','school_id']);

export const DocumentScalarFieldEnumSchema = z.enum(['id','file_name','mime_type','size','is_current_version','file_hash','upload_date','storage_path','version','compression_applied','metadata','is_deleted','created_at','updated_at','deleted_at','user_created']);

export const EnrollmentScalarFieldEnumSchema = z.enum(['id','school_id','student_id','course_id','classroom_id','series_id','name','created_at','deleted_at','updated_at','date_enrollment','observations','status','situation','enrollment_code','institution_id','pre_enrollment_id']);

export const GradeScalarFieldEnumSchema = z.enum(['id','school_id','student_id','discipline_id','value','date','metadata','user_created','created_at','deleted_at','updated_at']);

export const StudentScalarFieldEnumSchema = z.enum(['id','name','birthdate','gender','place_of_birth','postalcode','residence_zone','number_address','cpf','neighborhood','city','complement','father_name','father_email','father_cpf','father_phone','mother_name','mother_email','mother_cpf','mother_phone','rg_number','rg_state','rg_issue_date','rg_issuer','birth_certificate','docs_type','responsible_type','email','phone','address','status','photo','metadata','user_created','created_at','deleted_at','updated_at','ethnicity','deficiency','deficiency_description','city_state','period']);

export const HolidaysScalarFieldEnumSchema = z.enum(['id','name','holiday_date','description','weekday']);

export const InstitutionScalarFieldEnumSchema = z.enum(['id','name','address','city','state','postalcode','phone','email','metadata','user_created','singleton','created_at','deleted_at','updated_at']);

export const Institution_settingsScalarFieldEnumSchema = z.enum(['id','created_at','institution_id','date_opening','date_closing','school_days','date_start','date_end']);

export const Back3nd_userScalarFieldEnumSchema = z.enum(['id','name','email','password','reset_token','created_at','updated_at']);

export const Back3nd_roleScalarFieldEnumSchema = z.enum(['id','name','description','created_at','updated_at']);

export const Back3nd_user_roleScalarFieldEnumSchema = z.enum(['id','user_id','role_id','created_at']);

export const Back3nd_permissionScalarFieldEnumSchema = z.enum(['id','role_id','table_id','can_create','can_read','can_update','can_delete','created_at']);

export const Back3nd_entityScalarFieldEnumSchema = z.enum(['id','name','created_at','updated_at']);

export const Back3nd_entity_fieldsScalarFieldEnumSchema = z.enum(['id','columnName','columnType','size','placeholder','defaultValue','isUnique','entity_id','created_at']);

export const Back3nd_password_resetScalarFieldEnumSchema = z.enum(['id','user_id','token','created_at','expires_at']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const NullableJsonNullValueInputSchema = z.enum(['DbNull','JsonNull',]).transform((value) => value === 'JsonNull' ? Prisma.JsonNull : value === 'DbNull' ? Prisma.DbNull : value);

export const JsonNullValueInputSchema = z.enum(['JsonNull',]).transform((value) => (value === 'JsonNull' ? Prisma.JsonNull : value));

export const QueryModeSchema = z.enum(['default','insensitive']);

export const JsonNullValueFilterSchema = z.enum(['DbNull','JsonNull','AnyNull',]).transform((value) => value === 'JsonNull' ? Prisma.JsonNull : value === 'DbNull' ? Prisma.JsonNull : value === 'AnyNull' ? Prisma.AnyNull : value);

export const NullsOrderSchema = z.enum(['first','last']);

export const class_sessionOrderByRelevanceFieldEnumSchema = z.enum(['id','school_id','discipline_id','timetable_id','user_created']);

export const teachertotimetableOrderByRelevanceFieldEnumSchema = z.enum(['a','b']);

export const academic_yearOrderByRelevanceFieldEnumSchema = z.enum(['id','school_id','template_id','user_created']);

export const academic_year_templateOrderByRelevanceFieldEnumSchema = z.enum(['id','name','user_created']);

export const attendanceOrderByRelevanceFieldEnumSchema = z.enum(['id','school_id','student_id','user_created']);

export const classroomOrderByRelevanceFieldEnumSchema = z.enum(['id','school_id','series_id','institution_id','course_id','teacher_id','name','abbreviation','user_created']);

export const courseOrderByRelevanceFieldEnumSchema = z.enum(['id','name','user_created','workload','institution_id','course_stage','description','school_id']);

export const documentOrderByRelevanceFieldEnumSchema = z.enum(['id','file_name','mime_type','file_hash','storage_path','user_created']);

export const enrollmentOrderByRelevanceFieldEnumSchema = z.enum(['id','school_id','student_id','course_id','classroom_id','series_id','name','observations','enrollment_code','institution_id','pre_enrollment_id']);

export const gradeOrderByRelevanceFieldEnumSchema = z.enum(['id','school_id','student_id','discipline_id','user_created']);

export const studentOrderByRelevanceFieldEnumSchema = z.enum(['id','name','place_of_birth','postalcode','number_address','cpf','neighborhood','city','complement','father_name','father_email','father_cpf','father_phone','mother_name','mother_email','mother_cpf','mother_phone','rg_number','rg_state','rg_issuer','birth_certificate','docs_type','email','phone','address','user_created','deficiency_description','city_state']);

export const holidaysOrderByRelevanceFieldEnumSchema = z.enum(['id','name','description','weekday']);

export const institutionOrderByRelevanceFieldEnumSchema = z.enum(['id','name','address','city','state','postalcode','phone','email','user_created']);

export const institution_settingsOrderByRelevanceFieldEnumSchema = z.enum(['institution_id']);

export const back3nd_userOrderByRelevanceFieldEnumSchema = z.enum(['id','name','email','password','reset_token']);

export const back3nd_roleOrderByRelevanceFieldEnumSchema = z.enum(['id','name','description']);

export const back3nd_user_roleOrderByRelevanceFieldEnumSchema = z.enum(['id','user_id','role_id']);

export const back3nd_permissionOrderByRelevanceFieldEnumSchema = z.enum(['id','role_id','table_id']);

export const back3nd_entityOrderByRelevanceFieldEnumSchema = z.enum(['id','name']);

export const back3nd_entity_fieldsOrderByRelevanceFieldEnumSchema = z.enum(['id','columnName','columnType','placeholder','defaultValue','entity_id']);

export const back3nd_password_resetOrderByRelevanceFieldEnumSchema = z.enum(['id','user_id','token']);

export const attendance_statusSchema = z.enum(['PRESENT','ABSENT','EXCUSED']);

export type attendance_statusType = `${z.infer<typeof attendance_statusSchema>}`

export const day_of_weekSchema = z.enum(['MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY','SUNDAY']);

export type day_of_weekType = `${z.infer<typeof day_of_weekSchema>}`

export const periodSchema = z.enum(['MANHA','TARDE','NOITE']);

export type periodType = `${z.infer<typeof periodSchema>}`

export const statusSchema = z.enum(['ATIVO','INATIVO','GRADUADO','SUSPENSO','TRANSFERIDO']);

export type statusType = `${z.infer<typeof statusSchema>}`

export const situation_typeSchema = z.enum(['PENDENTE','CURSANDO','APROVADO','APROVADO_PELO_CONSELHO','APROVADO_COM_DEPENDENCIA','REPROVADO','TRANSFERIDO','ABANDONO','FALECIDO']);

export type situation_typeType = `${z.infer<typeof situation_typeSchema>}`

export const gender_typeSchema = z.enum(['MASCULINO','FEMININO']);

export type gender_typeType = `${z.infer<typeof gender_typeSchema>}`

export const residence_zone_typeSchema = z.enum(['URBANA','RURAL']);

export type residence_zone_typeType = `${z.infer<typeof residence_zone_typeSchema>}`

export const responsibletypeSchema = z.enum(['PAI','MAE','AMBOS']);

export type responsibletypeType = `${z.infer<typeof responsibletypeSchema>}`

export const ethnicity_typeSchema = z.enum(['BRANCA','PRETA','PARDA','AMARELA','INDIGENA','NAO_DECLARADA']);

export type ethnicity_typeType = `${z.infer<typeof ethnicity_typeSchema>}`

export const deficiency_typeSchema = z.enum(['VISUAL','AUDITIVA','FISICA','INTELECTUAL','MENTAL','MULTIPLA','OUTROS','NAO_POSSUI']);

export type deficiency_typeType = `${z.infer<typeof deficiency_typeSchema>}`

export const teaching_typeSchema = z.enum(['COMPLEMENTAR','PADRAO']);

export type teaching_typeType = `${z.infer<typeof teaching_typeSchema>}`

export const regime_typeSchema = z.enum(['PRESENCIAL','EAD','SEMI_PRESENCIAL']);

export type regime_typeType = `${z.infer<typeof regime_typeSchema>}`

export const course_modalitySchema = z.enum(['ENSINO_REGULAR','EJA','EDUCACAO_PROFISSIONAL','EDUCACAO_ESPECIAL']);

export type course_modalityType = `${z.infer<typeof course_modalitySchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// CLASS SESSION SCHEMA
/////////////////////////////////////////

export const class_sessionSchema = z.object({
  day_of_week: day_of_weekSchema,
  id: z.string(),
  school_id: z.string(),
  discipline_id: z.string(),
  timetable_id: z.string(),
  start_time: z.coerce.date(),
  end_time: z.coerce.date(),
  metadata: JsonValueSchema.nullable(),
  user_created: z.string().nullable(),
  created_at: z.coerce.date(),
  deleted_at: z.coerce.date().nullable(),
  updated_at: z.coerce.date().nullable(),
})

export type class_session = z.infer<typeof class_sessionSchema>

/////////////////////////////////////////
// TEACHERTOTIMETABLE SCHEMA
/////////////////////////////////////////

export const teachertotimetableSchema = z.object({
  a: z.string(),
  b: z.string(),
})

export type teachertotimetable = z.infer<typeof teachertotimetableSchema>

/////////////////////////////////////////
// ACADEMIC YEAR SCHEMA
/////////////////////////////////////////

export const academic_yearSchema = z.object({
  id: z.string(),
  school_id: z.string(),
  template_id: z.string(),
  ref_year: z.number().int(),
  metadata: JsonValueSchema.nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date().nullable(),
  deleted_at: z.coerce.date().nullable(),
  user_created: z.string().nullable(),
})

export type academic_year = z.infer<typeof academic_yearSchema>

/////////////////////////////////////////
// ACADEMIC YEAR TEMPLATE SCHEMA
/////////////////////////////////////////

export const academic_year_templateSchema = z.object({
  id: z.string(),
  ref_year: z.number().int(),
  name: z.string(),
  stages: JsonValueSchema,
  stage_count: z.number().int(),
  metadata: JsonValueSchema.nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date().nullable(),
  deleted_at: z.coerce.date().nullable(),
  user_created: z.string().nullable(),
})

export type academic_year_template = z.infer<typeof academic_year_templateSchema>

/////////////////////////////////////////
// ATTENDANCE SCHEMA
/////////////////////////////////////////

export const attendanceSchema = z.object({
  status: attendance_statusSchema,
  id: z.string(),
  school_id: z.string(),
  student_id: z.string(),
  date: z.coerce.date(),
  metadata: JsonValueSchema.nullable(),
  user_created: z.string().nullable(),
  created_at: z.coerce.date(),
  deleted_at: z.coerce.date().nullable(),
  updated_at: z.coerce.date().nullable(),
})

export type attendance = z.infer<typeof attendanceSchema>

/////////////////////////////////////////
// CLASSROOM SCHEMA
/////////////////////////////////////////

export const classroomSchema = z.object({
  day_of_week: day_of_weekSchema.nullable(),
  period: periodSchema,
  status: statusSchema,
  id: z.string(),
  school_id: z.string(),
  series_id: z.string(),
  institution_id: z.string(),
  course_id: z.string(),
  teacher_id: z.string(),
  max_students: z.number().int(),
  start_time: z.coerce.date().nullable(),
  start_time_interval: z.coerce.date().nullable(),
  end_time_interval: z.coerce.date().nullable(),
  end_time: z.coerce.date().nullable(),
  name: z.string(),
  abbreviation: z.string().nullable(),
  year: z.number().int(),
  metadata: JsonValueSchema.nullable(),
  user_created: z.string().nullable(),
  created_at: z.coerce.date(),
  deleted_at: z.coerce.date().nullable(),
  updated_at: z.coerce.date().nullable(),
})

export type classroom = z.infer<typeof classroomSchema>

/////////////////////////////////////////
// COURSE SCHEMA
/////////////////////////////////////////

export const courseSchema = z.object({
  status: statusSchema,
  teaching_type: teaching_typeSchema.nullable(),
  regime_type: regime_typeSchema.nullable(),
  course_modality: course_modalitySchema.nullable(),
  id: z.string(),
  name: z.string(),
  metadata: JsonValueSchema.nullable(),
  user_created: z.string().nullable(),
  created_at: z.coerce.date(),
  deleted_at: z.coerce.date().nullable(),
  updated_at: z.coerce.date().nullable(),
  workload: z.string().nullable(),
  institution_id: z.string().nullable(),
  course_stage: z.string().nullable(),
  description: z.string().nullable(),
  school_id: z.string().nullable(),
})

export type course = z.infer<typeof courseSchema>

/////////////////////////////////////////
// DOCUMENT SCHEMA
/////////////////////////////////////////

export const documentSchema = z.object({
  id: z.string(),
  file_name: z.string(),
  mime_type: z.string(),
  size: z.bigint(),
  is_current_version: z.boolean(),
  file_hash: z.string().nullable(),
  upload_date: z.coerce.date(),
  storage_path: z.string(),
  version: z.number().int(),
  compression_applied: z.boolean(),
  metadata: JsonValueSchema.nullable(),
  is_deleted: z.boolean(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date().nullable(),
  deleted_at: z.coerce.date().nullable(),
  user_created: z.string().nullable(),
})

export type document = z.infer<typeof documentSchema>

/////////////////////////////////////////
// ENROLLMENT SCHEMA
/////////////////////////////////////////

export const enrollmentSchema = z.object({
  status: statusSchema,
  situation: situation_typeSchema.nullable(),
  id: z.string(),
  school_id: z.string(),
  student_id: z.string(),
  course_id: z.string(),
  classroom_id: z.string(),
  series_id: z.string(),
  name: z.string(),
  created_at: z.coerce.date(),
  deleted_at: z.coerce.date().nullable(),
  updated_at: z.coerce.date().nullable(),
  date_enrollment: z.coerce.date(),
  observations: z.string().nullable(),
  enrollment_code: z.string().nullable(),
  institution_id: z.string().nullable(),
  pre_enrollment_id: z.string().nullable(),
})

export type enrollment = z.infer<typeof enrollmentSchema>

/////////////////////////////////////////
// GRADE SCHEMA
/////////////////////////////////////////

export const gradeSchema = z.object({
  id: z.string(),
  school_id: z.string(),
  student_id: z.string(),
  discipline_id: z.string(),
  value: z.number(),
  date: z.coerce.date(),
  metadata: JsonValueSchema.nullable(),
  user_created: z.string().nullable(),
  created_at: z.coerce.date(),
  deleted_at: z.coerce.date().nullable(),
  updated_at: z.coerce.date().nullable(),
})

export type grade = z.infer<typeof gradeSchema>

/////////////////////////////////////////
// STUDENT SCHEMA
/////////////////////////////////////////

export const studentSchema = z.object({
  gender: gender_typeSchema,
  residence_zone: residence_zone_typeSchema,
  responsible_type: responsibletypeSchema,
  status: statusSchema,
  ethnicity: ethnicity_typeSchema.nullable(),
  deficiency: deficiency_typeSchema.nullable(),
  period: periodSchema.nullable(),
  id: z.string(),
  name: z.string(),
  birthdate: z.coerce.date(),
  place_of_birth: z.string().nullable(),
  postalcode: z.string().nullable(),
  number_address: z.string().nullable(),
  cpf: z.string().nullable(),
  neighborhood: z.string().nullable(),
  city: z.string().nullable(),
  complement: z.string().nullable(),
  father_name: z.string().nullable(),
  father_email: z.string().nullable(),
  father_cpf: z.string().nullable(),
  father_phone: z.string().nullable(),
  mother_name: z.string().nullable(),
  mother_email: z.string().nullable(),
  mother_cpf: z.string().nullable(),
  mother_phone: z.string().nullable(),
  rg_number: z.string().nullable(),
  rg_state: z.string().nullable(),
  rg_issue_date: z.coerce.date().nullable(),
  rg_issuer: z.string().nullable(),
  birth_certificate: z.string().nullable(),
  docs_type: z.string().nullable(),
  email: z.string().nullable(),
  phone: z.string(),
  address: z.string().nullable(),
  photo: z.instanceof(Buffer).nullable(),
  metadata: JsonValueSchema.nullable(),
  user_created: z.string().nullable(),
  created_at: z.coerce.date(),
  deleted_at: z.coerce.date().nullable(),
  updated_at: z.coerce.date().nullable(),
  deficiency_description: z.string().nullable(),
  city_state: z.string().nullable(),
})

export type student = z.infer<typeof studentSchema>

/////////////////////////////////////////
// HOLIDAYS SCHEMA
/////////////////////////////////////////

export const holidaysSchema = z.object({
  id: z.string(),
  name: z.string(),
  holiday_date: z.coerce.date(),
  description: z.string().nullable(),
  weekday: z.string().nullable(),
})

export type holidays = z.infer<typeof holidaysSchema>

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
  deleted_at: z.coerce.date().nullable(),
  updated_at: z.coerce.date().nullable(),
})

export type institution = z.infer<typeof institutionSchema>

/////////////////////////////////////////
// INSTITUTION SETTINGS SCHEMA
/////////////////////////////////////////

export const institution_settingsSchema = z.object({
  id: z.bigint(),
  created_at: z.coerce.date(),
  institution_id: z.string().nullable(),
  date_opening: z.coerce.date().nullable(),
  date_closing: z.coerce.date().nullable(),
  school_days: z.number().nullable(),
  date_start: z.coerce.date().nullable(),
  date_end: z.coerce.date().nullable(),
})

export type institution_settings = z.infer<typeof institution_settingsSchema>

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

// CLASS SESSION
//------------------------------------------------------

export const class_sessionSelectSchema: z.ZodType<Prisma.class_sessionSelect> = z.object({
  id: z.boolean().optional(),
  school_id: z.boolean().optional(),
  discipline_id: z.boolean().optional(),
  timetable_id: z.boolean().optional(),
  day_of_week: z.boolean().optional(),
  start_time: z.boolean().optional(),
  end_time: z.boolean().optional(),
  metadata: z.boolean().optional(),
  user_created: z.boolean().optional(),
  created_at: z.boolean().optional(),
  deleted_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
}).strict()

// TEACHERTOTIMETABLE
//------------------------------------------------------

export const teachertotimetableSelectSchema: z.ZodType<Prisma.teachertotimetableSelect> = z.object({
  a: z.boolean().optional(),
  b: z.boolean().optional(),
}).strict()

// ACADEMIC YEAR
//------------------------------------------------------

export const academic_yearSelectSchema: z.ZodType<Prisma.academic_yearSelect> = z.object({
  id: z.boolean().optional(),
  school_id: z.boolean().optional(),
  template_id: z.boolean().optional(),
  ref_year: z.boolean().optional(),
  metadata: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  deleted_at: z.boolean().optional(),
  user_created: z.boolean().optional(),
}).strict()

// ACADEMIC YEAR TEMPLATE
//------------------------------------------------------

export const academic_year_templateSelectSchema: z.ZodType<Prisma.academic_year_templateSelect> = z.object({
  id: z.boolean().optional(),
  ref_year: z.boolean().optional(),
  name: z.boolean().optional(),
  stages: z.boolean().optional(),
  stage_count: z.boolean().optional(),
  metadata: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  deleted_at: z.boolean().optional(),
  user_created: z.boolean().optional(),
}).strict()

// ATTENDANCE
//------------------------------------------------------

export const attendanceSelectSchema: z.ZodType<Prisma.attendanceSelect> = z.object({
  id: z.boolean().optional(),
  school_id: z.boolean().optional(),
  student_id: z.boolean().optional(),
  date: z.boolean().optional(),
  status: z.boolean().optional(),
  metadata: z.boolean().optional(),
  user_created: z.boolean().optional(),
  created_at: z.boolean().optional(),
  deleted_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
}).strict()

// CLASSROOM
//------------------------------------------------------

export const classroomSelectSchema: z.ZodType<Prisma.classroomSelect> = z.object({
  id: z.boolean().optional(),
  school_id: z.boolean().optional(),
  series_id: z.boolean().optional(),
  institution_id: z.boolean().optional(),
  course_id: z.boolean().optional(),
  teacher_id: z.boolean().optional(),
  max_students: z.boolean().optional(),
  start_time: z.boolean().optional(),
  start_time_interval: z.boolean().optional(),
  end_time_interval: z.boolean().optional(),
  end_time: z.boolean().optional(),
  day_of_week: z.boolean().optional(),
  name: z.boolean().optional(),
  period: z.boolean().optional(),
  status: z.boolean().optional(),
  abbreviation: z.boolean().optional(),
  year: z.boolean().optional(),
  metadata: z.boolean().optional(),
  user_created: z.boolean().optional(),
  created_at: z.boolean().optional(),
  deleted_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
}).strict()

// COURSE
//------------------------------------------------------

export const courseSelectSchema: z.ZodType<Prisma.courseSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  status: z.boolean().optional(),
  metadata: z.boolean().optional(),
  user_created: z.boolean().optional(),
  created_at: z.boolean().optional(),
  deleted_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  teaching_type: z.boolean().optional(),
  regime_type: z.boolean().optional(),
  course_modality: z.boolean().optional(),
  workload: z.boolean().optional(),
  institution_id: z.boolean().optional(),
  course_stage: z.boolean().optional(),
  description: z.boolean().optional(),
  school_id: z.boolean().optional(),
}).strict()

// DOCUMENT
//------------------------------------------------------

export const documentSelectSchema: z.ZodType<Prisma.documentSelect> = z.object({
  id: z.boolean().optional(),
  file_name: z.boolean().optional(),
  mime_type: z.boolean().optional(),
  size: z.boolean().optional(),
  is_current_version: z.boolean().optional(),
  file_hash: z.boolean().optional(),
  upload_date: z.boolean().optional(),
  storage_path: z.boolean().optional(),
  version: z.boolean().optional(),
  compression_applied: z.boolean().optional(),
  metadata: z.boolean().optional(),
  is_deleted: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  deleted_at: z.boolean().optional(),
  user_created: z.boolean().optional(),
}).strict()

// ENROLLMENT
//------------------------------------------------------

export const enrollmentSelectSchema: z.ZodType<Prisma.enrollmentSelect> = z.object({
  id: z.boolean().optional(),
  school_id: z.boolean().optional(),
  student_id: z.boolean().optional(),
  course_id: z.boolean().optional(),
  classroom_id: z.boolean().optional(),
  series_id: z.boolean().optional(),
  name: z.boolean().optional(),
  created_at: z.boolean().optional(),
  deleted_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  date_enrollment: z.boolean().optional(),
  observations: z.boolean().optional(),
  status: z.boolean().optional(),
  situation: z.boolean().optional(),
  enrollment_code: z.boolean().optional(),
  institution_id: z.boolean().optional(),
  pre_enrollment_id: z.boolean().optional(),
}).strict()

// GRADE
//------------------------------------------------------

export const gradeSelectSchema: z.ZodType<Prisma.gradeSelect> = z.object({
  id: z.boolean().optional(),
  school_id: z.boolean().optional(),
  student_id: z.boolean().optional(),
  discipline_id: z.boolean().optional(),
  value: z.boolean().optional(),
  date: z.boolean().optional(),
  metadata: z.boolean().optional(),
  user_created: z.boolean().optional(),
  created_at: z.boolean().optional(),
  deleted_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
}).strict()

// STUDENT
//------------------------------------------------------

export const studentSelectSchema: z.ZodType<Prisma.studentSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  birthdate: z.boolean().optional(),
  gender: z.boolean().optional(),
  place_of_birth: z.boolean().optional(),
  postalcode: z.boolean().optional(),
  residence_zone: z.boolean().optional(),
  number_address: z.boolean().optional(),
  cpf: z.boolean().optional(),
  neighborhood: z.boolean().optional(),
  city: z.boolean().optional(),
  complement: z.boolean().optional(),
  father_name: z.boolean().optional(),
  father_email: z.boolean().optional(),
  father_cpf: z.boolean().optional(),
  father_phone: z.boolean().optional(),
  mother_name: z.boolean().optional(),
  mother_email: z.boolean().optional(),
  mother_cpf: z.boolean().optional(),
  mother_phone: z.boolean().optional(),
  rg_number: z.boolean().optional(),
  rg_state: z.boolean().optional(),
  rg_issue_date: z.boolean().optional(),
  rg_issuer: z.boolean().optional(),
  birth_certificate: z.boolean().optional(),
  docs_type: z.boolean().optional(),
  responsible_type: z.boolean().optional(),
  email: z.boolean().optional(),
  phone: z.boolean().optional(),
  address: z.boolean().optional(),
  status: z.boolean().optional(),
  photo: z.boolean().optional(),
  metadata: z.boolean().optional(),
  user_created: z.boolean().optional(),
  created_at: z.boolean().optional(),
  deleted_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  ethnicity: z.boolean().optional(),
  deficiency: z.boolean().optional(),
  deficiency_description: z.boolean().optional(),
  city_state: z.boolean().optional(),
  period: z.boolean().optional(),
}).strict()

// HOLIDAYS
//------------------------------------------------------

export const holidaysSelectSchema: z.ZodType<Prisma.holidaysSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  holiday_date: z.boolean().optional(),
  description: z.boolean().optional(),
  weekday: z.boolean().optional(),
}).strict()

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
  deleted_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
}).strict()

// INSTITUTION SETTINGS
//------------------------------------------------------

export const institution_settingsSelectSchema: z.ZodType<Prisma.institution_settingsSelect> = z.object({
  id: z.boolean().optional(),
  created_at: z.boolean().optional(),
  institution_id: z.boolean().optional(),
  date_opening: z.boolean().optional(),
  date_closing: z.boolean().optional(),
  school_days: z.boolean().optional(),
  date_start: z.boolean().optional(),
  date_end: z.boolean().optional(),
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

export const class_sessionWhereInputSchema: z.ZodType<Prisma.class_sessionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => class_sessionWhereInputSchema),z.lazy(() => class_sessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => class_sessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => class_sessionWhereInputSchema),z.lazy(() => class_sessionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  school_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  discipline_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  timetable_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  day_of_week: z.union([ z.lazy(() => Enumday_of_weekFilterSchema),z.lazy(() => day_of_weekSchema) ]).optional(),
  start_time: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  end_time: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  metadata: z.lazy(() => JsonNullableFilterSchema).optional(),
  user_created: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const class_sessionOrderByWithRelationInputSchema: z.ZodType<Prisma.class_sessionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  school_id: z.lazy(() => SortOrderSchema).optional(),
  discipline_id: z.lazy(() => SortOrderSchema).optional(),
  timetable_id: z.lazy(() => SortOrderSchema).optional(),
  day_of_week: z.lazy(() => SortOrderSchema).optional(),
  start_time: z.lazy(() => SortOrderSchema).optional(),
  end_time: z.lazy(() => SortOrderSchema).optional(),
  metadata: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_created: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updated_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _relevance: z.lazy(() => class_sessionOrderByRelevanceInputSchema).optional()
}).strict();

export const class_sessionWhereUniqueInputSchema: z.ZodType<Prisma.class_sessionWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => class_sessionWhereInputSchema),z.lazy(() => class_sessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => class_sessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => class_sessionWhereInputSchema),z.lazy(() => class_sessionWhereInputSchema).array() ]).optional(),
  school_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  discipline_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  timetable_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  day_of_week: z.union([ z.lazy(() => Enumday_of_weekFilterSchema),z.lazy(() => day_of_weekSchema) ]).optional(),
  start_time: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  end_time: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  metadata: z.lazy(() => JsonNullableFilterSchema).optional(),
  user_created: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict());

export const class_sessionOrderByWithAggregationInputSchema: z.ZodType<Prisma.class_sessionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  school_id: z.lazy(() => SortOrderSchema).optional(),
  discipline_id: z.lazy(() => SortOrderSchema).optional(),
  timetable_id: z.lazy(() => SortOrderSchema).optional(),
  day_of_week: z.lazy(() => SortOrderSchema).optional(),
  start_time: z.lazy(() => SortOrderSchema).optional(),
  end_time: z.lazy(() => SortOrderSchema).optional(),
  metadata: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_created: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updated_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => class_sessionCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => class_sessionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => class_sessionMinOrderByAggregateInputSchema).optional()
}).strict();

export const class_sessionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.class_sessionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => class_sessionScalarWhereWithAggregatesInputSchema),z.lazy(() => class_sessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => class_sessionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => class_sessionScalarWhereWithAggregatesInputSchema),z.lazy(() => class_sessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  school_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  discipline_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  timetable_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  day_of_week: z.union([ z.lazy(() => Enumday_of_weekWithAggregatesFilterSchema),z.lazy(() => day_of_weekSchema) ]).optional(),
  start_time: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  end_time: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  metadata: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  user_created: z.union([ z.lazy(() => UuidNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const teachertotimetableWhereInputSchema: z.ZodType<Prisma.teachertotimetableWhereInput> = z.object({
  AND: z.union([ z.lazy(() => teachertotimetableWhereInputSchema),z.lazy(() => teachertotimetableWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => teachertotimetableWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => teachertotimetableWhereInputSchema),z.lazy(() => teachertotimetableWhereInputSchema).array() ]).optional(),
  a: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  b: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
}).strict();

export const teachertotimetableOrderByWithRelationInputSchema: z.ZodType<Prisma.teachertotimetableOrderByWithRelationInput> = z.object({
  a: z.lazy(() => SortOrderSchema).optional(),
  b: z.lazy(() => SortOrderSchema).optional(),
  _relevance: z.lazy(() => teachertotimetableOrderByRelevanceInputSchema).optional()
}).strict();

export const teachertotimetableWhereUniqueInputSchema: z.ZodType<Prisma.teachertotimetableWhereUniqueInput> = z.object({
  a: z.string()
})
.and(z.object({
  a: z.string().optional(),
  AND: z.union([ z.lazy(() => teachertotimetableWhereInputSchema),z.lazy(() => teachertotimetableWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => teachertotimetableWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => teachertotimetableWhereInputSchema),z.lazy(() => teachertotimetableWhereInputSchema).array() ]).optional(),
  b: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
}).strict());

export const teachertotimetableOrderByWithAggregationInputSchema: z.ZodType<Prisma.teachertotimetableOrderByWithAggregationInput> = z.object({
  a: z.lazy(() => SortOrderSchema).optional(),
  b: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => teachertotimetableCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => teachertotimetableMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => teachertotimetableMinOrderByAggregateInputSchema).optional()
}).strict();

export const teachertotimetableScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.teachertotimetableScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => teachertotimetableScalarWhereWithAggregatesInputSchema),z.lazy(() => teachertotimetableScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => teachertotimetableScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => teachertotimetableScalarWhereWithAggregatesInputSchema),z.lazy(() => teachertotimetableScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  a: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  b: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const academic_yearWhereInputSchema: z.ZodType<Prisma.academic_yearWhereInput> = z.object({
  AND: z.union([ z.lazy(() => academic_yearWhereInputSchema),z.lazy(() => academic_yearWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => academic_yearWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => academic_yearWhereInputSchema),z.lazy(() => academic_yearWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  school_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  template_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  ref_year: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  metadata: z.lazy(() => JsonNullableFilterSchema).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  user_created: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const academic_yearOrderByWithRelationInputSchema: z.ZodType<Prisma.academic_yearOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  school_id: z.lazy(() => SortOrderSchema).optional(),
  template_id: z.lazy(() => SortOrderSchema).optional(),
  ref_year: z.lazy(() => SortOrderSchema).optional(),
  metadata: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  deleted_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_created: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _relevance: z.lazy(() => academic_yearOrderByRelevanceInputSchema).optional()
}).strict();

export const academic_yearWhereUniqueInputSchema: z.ZodType<Prisma.academic_yearWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => academic_yearWhereInputSchema),z.lazy(() => academic_yearWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => academic_yearWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => academic_yearWhereInputSchema),z.lazy(() => academic_yearWhereInputSchema).array() ]).optional(),
  school_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  template_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  ref_year: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  metadata: z.lazy(() => JsonNullableFilterSchema).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  user_created: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict());

export const academic_yearOrderByWithAggregationInputSchema: z.ZodType<Prisma.academic_yearOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  school_id: z.lazy(() => SortOrderSchema).optional(),
  template_id: z.lazy(() => SortOrderSchema).optional(),
  ref_year: z.lazy(() => SortOrderSchema).optional(),
  metadata: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  deleted_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_created: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => academic_yearCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => academic_yearAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => academic_yearMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => academic_yearMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => academic_yearSumOrderByAggregateInputSchema).optional()
}).strict();

export const academic_yearScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.academic_yearScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => academic_yearScalarWhereWithAggregatesInputSchema),z.lazy(() => academic_yearScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => academic_yearScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => academic_yearScalarWhereWithAggregatesInputSchema),z.lazy(() => academic_yearScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  school_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  template_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  ref_year: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  metadata: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  user_created: z.union([ z.lazy(() => UuidNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const academic_year_templateWhereInputSchema: z.ZodType<Prisma.academic_year_templateWhereInput> = z.object({
  AND: z.union([ z.lazy(() => academic_year_templateWhereInputSchema),z.lazy(() => academic_year_templateWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => academic_year_templateWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => academic_year_templateWhereInputSchema),z.lazy(() => academic_year_templateWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  ref_year: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  stages: z.lazy(() => JsonFilterSchema).optional(),
  stage_count: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  metadata: z.lazy(() => JsonNullableFilterSchema).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  user_created: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const academic_year_templateOrderByWithRelationInputSchema: z.ZodType<Prisma.academic_year_templateOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  ref_year: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  stages: z.lazy(() => SortOrderSchema).optional(),
  stage_count: z.lazy(() => SortOrderSchema).optional(),
  metadata: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  deleted_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_created: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _relevance: z.lazy(() => academic_year_templateOrderByRelevanceInputSchema).optional()
}).strict();

export const academic_year_templateWhereUniqueInputSchema: z.ZodType<Prisma.academic_year_templateWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => academic_year_templateWhereInputSchema),z.lazy(() => academic_year_templateWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => academic_year_templateWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => academic_year_templateWhereInputSchema),z.lazy(() => academic_year_templateWhereInputSchema).array() ]).optional(),
  ref_year: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  stages: z.lazy(() => JsonFilterSchema).optional(),
  stage_count: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  metadata: z.lazy(() => JsonNullableFilterSchema).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  user_created: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict());

export const academic_year_templateOrderByWithAggregationInputSchema: z.ZodType<Prisma.academic_year_templateOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  ref_year: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  stages: z.lazy(() => SortOrderSchema).optional(),
  stage_count: z.lazy(() => SortOrderSchema).optional(),
  metadata: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  deleted_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_created: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => academic_year_templateCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => academic_year_templateAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => academic_year_templateMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => academic_year_templateMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => academic_year_templateSumOrderByAggregateInputSchema).optional()
}).strict();

export const academic_year_templateScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.academic_year_templateScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => academic_year_templateScalarWhereWithAggregatesInputSchema),z.lazy(() => academic_year_templateScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => academic_year_templateScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => academic_year_templateScalarWhereWithAggregatesInputSchema),z.lazy(() => academic_year_templateScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  ref_year: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  stages: z.lazy(() => JsonWithAggregatesFilterSchema).optional(),
  stage_count: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  metadata: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  user_created: z.union([ z.lazy(() => UuidNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const attendanceWhereInputSchema: z.ZodType<Prisma.attendanceWhereInput> = z.object({
  AND: z.union([ z.lazy(() => attendanceWhereInputSchema),z.lazy(() => attendanceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => attendanceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => attendanceWhereInputSchema),z.lazy(() => attendanceWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  school_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  student_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  status: z.union([ z.lazy(() => Enumattendance_statusFilterSchema),z.lazy(() => attendance_statusSchema) ]).optional(),
  metadata: z.lazy(() => JsonNullableFilterSchema).optional(),
  user_created: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const attendanceOrderByWithRelationInputSchema: z.ZodType<Prisma.attendanceOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  school_id: z.lazy(() => SortOrderSchema).optional(),
  student_id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  metadata: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_created: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updated_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _relevance: z.lazy(() => attendanceOrderByRelevanceInputSchema).optional()
}).strict();

export const attendanceWhereUniqueInputSchema: z.ZodType<Prisma.attendanceWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => attendanceWhereInputSchema),z.lazy(() => attendanceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => attendanceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => attendanceWhereInputSchema),z.lazy(() => attendanceWhereInputSchema).array() ]).optional(),
  school_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  student_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  status: z.union([ z.lazy(() => Enumattendance_statusFilterSchema),z.lazy(() => attendance_statusSchema) ]).optional(),
  metadata: z.lazy(() => JsonNullableFilterSchema).optional(),
  user_created: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict());

export const attendanceOrderByWithAggregationInputSchema: z.ZodType<Prisma.attendanceOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  school_id: z.lazy(() => SortOrderSchema).optional(),
  student_id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  metadata: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_created: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updated_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => attendanceCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => attendanceMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => attendanceMinOrderByAggregateInputSchema).optional()
}).strict();

export const attendanceScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.attendanceScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => attendanceScalarWhereWithAggregatesInputSchema),z.lazy(() => attendanceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => attendanceScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => attendanceScalarWhereWithAggregatesInputSchema),z.lazy(() => attendanceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  school_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  student_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  status: z.union([ z.lazy(() => Enumattendance_statusWithAggregatesFilterSchema),z.lazy(() => attendance_statusSchema) ]).optional(),
  metadata: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  user_created: z.union([ z.lazy(() => UuidNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const classroomWhereInputSchema: z.ZodType<Prisma.classroomWhereInput> = z.object({
  AND: z.union([ z.lazy(() => classroomWhereInputSchema),z.lazy(() => classroomWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => classroomWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => classroomWhereInputSchema),z.lazy(() => classroomWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  school_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  series_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  institution_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  course_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  teacher_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  max_students: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  start_time: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  start_time_interval: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  end_time_interval: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  end_time: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  day_of_week: z.union([ z.lazy(() => Enumday_of_weekNullableFilterSchema),z.lazy(() => day_of_weekSchema) ]).optional().nullable(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  period: z.union([ z.lazy(() => EnumperiodFilterSchema),z.lazy(() => periodSchema) ]).optional(),
  status: z.union([ z.lazy(() => EnumstatusFilterSchema),z.lazy(() => statusSchema) ]).optional(),
  abbreviation: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  year: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  metadata: z.lazy(() => JsonNullableFilterSchema).optional(),
  user_created: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const classroomOrderByWithRelationInputSchema: z.ZodType<Prisma.classroomOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  school_id: z.lazy(() => SortOrderSchema).optional(),
  series_id: z.lazy(() => SortOrderSchema).optional(),
  institution_id: z.lazy(() => SortOrderSchema).optional(),
  course_id: z.lazy(() => SortOrderSchema).optional(),
  teacher_id: z.lazy(() => SortOrderSchema).optional(),
  max_students: z.lazy(() => SortOrderSchema).optional(),
  start_time: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  start_time_interval: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  end_time_interval: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  end_time: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  day_of_week: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  period: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  abbreviation: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  year: z.lazy(() => SortOrderSchema).optional(),
  metadata: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_created: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updated_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _relevance: z.lazy(() => classroomOrderByRelevanceInputSchema).optional()
}).strict();

export const classroomWhereUniqueInputSchema: z.ZodType<Prisma.classroomWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => classroomWhereInputSchema),z.lazy(() => classroomWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => classroomWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => classroomWhereInputSchema),z.lazy(() => classroomWhereInputSchema).array() ]).optional(),
  school_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  series_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  institution_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  course_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  teacher_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  max_students: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  start_time: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  start_time_interval: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  end_time_interval: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  end_time: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  day_of_week: z.union([ z.lazy(() => Enumday_of_weekNullableFilterSchema),z.lazy(() => day_of_weekSchema) ]).optional().nullable(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  period: z.union([ z.lazy(() => EnumperiodFilterSchema),z.lazy(() => periodSchema) ]).optional(),
  status: z.union([ z.lazy(() => EnumstatusFilterSchema),z.lazy(() => statusSchema) ]).optional(),
  abbreviation: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  year: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  metadata: z.lazy(() => JsonNullableFilterSchema).optional(),
  user_created: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict());

export const classroomOrderByWithAggregationInputSchema: z.ZodType<Prisma.classroomOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  school_id: z.lazy(() => SortOrderSchema).optional(),
  series_id: z.lazy(() => SortOrderSchema).optional(),
  institution_id: z.lazy(() => SortOrderSchema).optional(),
  course_id: z.lazy(() => SortOrderSchema).optional(),
  teacher_id: z.lazy(() => SortOrderSchema).optional(),
  max_students: z.lazy(() => SortOrderSchema).optional(),
  start_time: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  start_time_interval: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  end_time_interval: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  end_time: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  day_of_week: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  period: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  abbreviation: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  year: z.lazy(() => SortOrderSchema).optional(),
  metadata: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_created: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updated_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => classroomCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => classroomAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => classroomMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => classroomMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => classroomSumOrderByAggregateInputSchema).optional()
}).strict();

export const classroomScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.classroomScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => classroomScalarWhereWithAggregatesInputSchema),z.lazy(() => classroomScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => classroomScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => classroomScalarWhereWithAggregatesInputSchema),z.lazy(() => classroomScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  school_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  series_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  institution_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  course_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  teacher_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  max_students: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  start_time: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  start_time_interval: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  end_time_interval: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  end_time: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  day_of_week: z.union([ z.lazy(() => Enumday_of_weekNullableWithAggregatesFilterSchema),z.lazy(() => day_of_weekSchema) ]).optional().nullable(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  period: z.union([ z.lazy(() => EnumperiodWithAggregatesFilterSchema),z.lazy(() => periodSchema) ]).optional(),
  status: z.union([ z.lazy(() => EnumstatusWithAggregatesFilterSchema),z.lazy(() => statusSchema) ]).optional(),
  abbreviation: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  year: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  metadata: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  user_created: z.union([ z.lazy(() => UuidNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const courseWhereInputSchema: z.ZodType<Prisma.courseWhereInput> = z.object({
  AND: z.union([ z.lazy(() => courseWhereInputSchema),z.lazy(() => courseWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => courseWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => courseWhereInputSchema),z.lazy(() => courseWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumstatusFilterSchema),z.lazy(() => statusSchema) ]).optional(),
  metadata: z.lazy(() => JsonNullableFilterSchema).optional(),
  user_created: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  teaching_type: z.union([ z.lazy(() => Enumteaching_typeNullableFilterSchema),z.lazy(() => teaching_typeSchema) ]).optional().nullable(),
  regime_type: z.union([ z.lazy(() => Enumregime_typeNullableFilterSchema),z.lazy(() => regime_typeSchema) ]).optional().nullable(),
  course_modality: z.union([ z.lazy(() => Enumcourse_modalityNullableFilterSchema),z.lazy(() => course_modalitySchema) ]).optional().nullable(),
  workload: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  institution_id: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  course_stage: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  school_id: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const courseOrderByWithRelationInputSchema: z.ZodType<Prisma.courseOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  metadata: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_created: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updated_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  teaching_type: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  regime_type: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  course_modality: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  workload: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  institution_id: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  course_stage: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  school_id: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _relevance: z.lazy(() => courseOrderByRelevanceInputSchema).optional()
}).strict();

export const courseWhereUniqueInputSchema: z.ZodType<Prisma.courseWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => courseWhereInputSchema),z.lazy(() => courseWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => courseWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => courseWhereInputSchema),z.lazy(() => courseWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumstatusFilterSchema),z.lazy(() => statusSchema) ]).optional(),
  metadata: z.lazy(() => JsonNullableFilterSchema).optional(),
  user_created: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  teaching_type: z.union([ z.lazy(() => Enumteaching_typeNullableFilterSchema),z.lazy(() => teaching_typeSchema) ]).optional().nullable(),
  regime_type: z.union([ z.lazy(() => Enumregime_typeNullableFilterSchema),z.lazy(() => regime_typeSchema) ]).optional().nullable(),
  course_modality: z.union([ z.lazy(() => Enumcourse_modalityNullableFilterSchema),z.lazy(() => course_modalitySchema) ]).optional().nullable(),
  workload: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  institution_id: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  course_stage: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  school_id: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict());

export const courseOrderByWithAggregationInputSchema: z.ZodType<Prisma.courseOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  metadata: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_created: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updated_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  teaching_type: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  regime_type: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  course_modality: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  workload: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  institution_id: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  course_stage: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  school_id: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => courseCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => courseMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => courseMinOrderByAggregateInputSchema).optional()
}).strict();

export const courseScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.courseScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => courseScalarWhereWithAggregatesInputSchema),z.lazy(() => courseScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => courseScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => courseScalarWhereWithAggregatesInputSchema),z.lazy(() => courseScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => EnumstatusWithAggregatesFilterSchema),z.lazy(() => statusSchema) ]).optional(),
  metadata: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  user_created: z.union([ z.lazy(() => UuidNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  teaching_type: z.union([ z.lazy(() => Enumteaching_typeNullableWithAggregatesFilterSchema),z.lazy(() => teaching_typeSchema) ]).optional().nullable(),
  regime_type: z.union([ z.lazy(() => Enumregime_typeNullableWithAggregatesFilterSchema),z.lazy(() => regime_typeSchema) ]).optional().nullable(),
  course_modality: z.union([ z.lazy(() => Enumcourse_modalityNullableWithAggregatesFilterSchema),z.lazy(() => course_modalitySchema) ]).optional().nullable(),
  workload: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  institution_id: z.union([ z.lazy(() => UuidNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  course_stage: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  school_id: z.union([ z.lazy(() => UuidNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const documentWhereInputSchema: z.ZodType<Prisma.documentWhereInput> = z.object({
  AND: z.union([ z.lazy(() => documentWhereInputSchema),z.lazy(() => documentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => documentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => documentWhereInputSchema),z.lazy(() => documentWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  file_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  mime_type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  size: z.union([ z.lazy(() => BigIntFilterSchema),z.bigint() ]).optional(),
  is_current_version: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  file_hash: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  upload_date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  storage_path: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  version: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  compression_applied: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  metadata: z.lazy(() => JsonNullableFilterSchema).optional(),
  is_deleted: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  user_created: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const documentOrderByWithRelationInputSchema: z.ZodType<Prisma.documentOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  file_name: z.lazy(() => SortOrderSchema).optional(),
  mime_type: z.lazy(() => SortOrderSchema).optional(),
  size: z.lazy(() => SortOrderSchema).optional(),
  is_current_version: z.lazy(() => SortOrderSchema).optional(),
  file_hash: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  upload_date: z.lazy(() => SortOrderSchema).optional(),
  storage_path: z.lazy(() => SortOrderSchema).optional(),
  version: z.lazy(() => SortOrderSchema).optional(),
  compression_applied: z.lazy(() => SortOrderSchema).optional(),
  metadata: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  is_deleted: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  deleted_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_created: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _relevance: z.lazy(() => documentOrderByRelevanceInputSchema).optional()
}).strict();

export const documentWhereUniqueInputSchema: z.ZodType<Prisma.documentWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => documentWhereInputSchema),z.lazy(() => documentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => documentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => documentWhereInputSchema),z.lazy(() => documentWhereInputSchema).array() ]).optional(),
  file_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  mime_type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  size: z.union([ z.lazy(() => BigIntFilterSchema),z.bigint() ]).optional(),
  is_current_version: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  file_hash: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  upload_date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  storage_path: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  version: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  compression_applied: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  metadata: z.lazy(() => JsonNullableFilterSchema).optional(),
  is_deleted: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  user_created: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict());

export const documentOrderByWithAggregationInputSchema: z.ZodType<Prisma.documentOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  file_name: z.lazy(() => SortOrderSchema).optional(),
  mime_type: z.lazy(() => SortOrderSchema).optional(),
  size: z.lazy(() => SortOrderSchema).optional(),
  is_current_version: z.lazy(() => SortOrderSchema).optional(),
  file_hash: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  upload_date: z.lazy(() => SortOrderSchema).optional(),
  storage_path: z.lazy(() => SortOrderSchema).optional(),
  version: z.lazy(() => SortOrderSchema).optional(),
  compression_applied: z.lazy(() => SortOrderSchema).optional(),
  metadata: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  is_deleted: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  deleted_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_created: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => documentCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => documentAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => documentMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => documentMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => documentSumOrderByAggregateInputSchema).optional()
}).strict();

export const documentScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.documentScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => documentScalarWhereWithAggregatesInputSchema),z.lazy(() => documentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => documentScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => documentScalarWhereWithAggregatesInputSchema),z.lazy(() => documentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  file_name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  mime_type: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  size: z.union([ z.lazy(() => BigIntWithAggregatesFilterSchema),z.bigint() ]).optional(),
  is_current_version: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  file_hash: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  upload_date: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  storage_path: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  version: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  compression_applied: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  metadata: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  is_deleted: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  user_created: z.union([ z.lazy(() => UuidNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const enrollmentWhereInputSchema: z.ZodType<Prisma.enrollmentWhereInput> = z.object({
  AND: z.union([ z.lazy(() => enrollmentWhereInputSchema),z.lazy(() => enrollmentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => enrollmentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => enrollmentWhereInputSchema),z.lazy(() => enrollmentWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  school_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  student_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  course_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  classroom_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  series_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  date_enrollment: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  observations: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumstatusFilterSchema),z.lazy(() => statusSchema) ]).optional(),
  situation: z.union([ z.lazy(() => Enumsituation_typeNullableFilterSchema),z.lazy(() => situation_typeSchema) ]).optional().nullable(),
  enrollment_code: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  institution_id: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  pre_enrollment_id: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const enrollmentOrderByWithRelationInputSchema: z.ZodType<Prisma.enrollmentOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  school_id: z.lazy(() => SortOrderSchema).optional(),
  student_id: z.lazy(() => SortOrderSchema).optional(),
  course_id: z.lazy(() => SortOrderSchema).optional(),
  classroom_id: z.lazy(() => SortOrderSchema).optional(),
  series_id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updated_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  date_enrollment: z.lazy(() => SortOrderSchema).optional(),
  observations: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  situation: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  enrollment_code: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  institution_id: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  pre_enrollment_id: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _relevance: z.lazy(() => enrollmentOrderByRelevanceInputSchema).optional()
}).strict();

export const enrollmentWhereUniqueInputSchema: z.ZodType<Prisma.enrollmentWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => enrollmentWhereInputSchema),z.lazy(() => enrollmentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => enrollmentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => enrollmentWhereInputSchema),z.lazy(() => enrollmentWhereInputSchema).array() ]).optional(),
  school_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  student_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  course_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  classroom_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  series_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  date_enrollment: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  observations: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumstatusFilterSchema),z.lazy(() => statusSchema) ]).optional(),
  situation: z.union([ z.lazy(() => Enumsituation_typeNullableFilterSchema),z.lazy(() => situation_typeSchema) ]).optional().nullable(),
  enrollment_code: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  institution_id: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  pre_enrollment_id: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict());

export const enrollmentOrderByWithAggregationInputSchema: z.ZodType<Prisma.enrollmentOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  school_id: z.lazy(() => SortOrderSchema).optional(),
  student_id: z.lazy(() => SortOrderSchema).optional(),
  course_id: z.lazy(() => SortOrderSchema).optional(),
  classroom_id: z.lazy(() => SortOrderSchema).optional(),
  series_id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updated_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  date_enrollment: z.lazy(() => SortOrderSchema).optional(),
  observations: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  situation: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  enrollment_code: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  institution_id: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  pre_enrollment_id: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => enrollmentCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => enrollmentMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => enrollmentMinOrderByAggregateInputSchema).optional()
}).strict();

export const enrollmentScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.enrollmentScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => enrollmentScalarWhereWithAggregatesInputSchema),z.lazy(() => enrollmentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => enrollmentScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => enrollmentScalarWhereWithAggregatesInputSchema),z.lazy(() => enrollmentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  school_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  student_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  course_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  classroom_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  series_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  date_enrollment: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  observations: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumstatusWithAggregatesFilterSchema),z.lazy(() => statusSchema) ]).optional(),
  situation: z.union([ z.lazy(() => Enumsituation_typeNullableWithAggregatesFilterSchema),z.lazy(() => situation_typeSchema) ]).optional().nullable(),
  enrollment_code: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  institution_id: z.union([ z.lazy(() => UuidNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  pre_enrollment_id: z.union([ z.lazy(() => UuidNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const gradeWhereInputSchema: z.ZodType<Prisma.gradeWhereInput> = z.object({
  AND: z.union([ z.lazy(() => gradeWhereInputSchema),z.lazy(() => gradeWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => gradeWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => gradeWhereInputSchema),z.lazy(() => gradeWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  school_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  student_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  discipline_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  metadata: z.lazy(() => JsonNullableFilterSchema).optional(),
  user_created: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const gradeOrderByWithRelationInputSchema: z.ZodType<Prisma.gradeOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  school_id: z.lazy(() => SortOrderSchema).optional(),
  student_id: z.lazy(() => SortOrderSchema).optional(),
  discipline_id: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  metadata: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_created: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updated_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _relevance: z.lazy(() => gradeOrderByRelevanceInputSchema).optional()
}).strict();

export const gradeWhereUniqueInputSchema: z.ZodType<Prisma.gradeWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => gradeWhereInputSchema),z.lazy(() => gradeWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => gradeWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => gradeWhereInputSchema),z.lazy(() => gradeWhereInputSchema).array() ]).optional(),
  school_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  student_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  discipline_id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  metadata: z.lazy(() => JsonNullableFilterSchema).optional(),
  user_created: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict());

export const gradeOrderByWithAggregationInputSchema: z.ZodType<Prisma.gradeOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  school_id: z.lazy(() => SortOrderSchema).optional(),
  student_id: z.lazy(() => SortOrderSchema).optional(),
  discipline_id: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  metadata: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_created: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updated_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => gradeCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => gradeAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => gradeMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => gradeMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => gradeSumOrderByAggregateInputSchema).optional()
}).strict();

export const gradeScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.gradeScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => gradeScalarWhereWithAggregatesInputSchema),z.lazy(() => gradeScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => gradeScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => gradeScalarWhereWithAggregatesInputSchema),z.lazy(() => gradeScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  school_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  student_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  discipline_id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  metadata: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  user_created: z.union([ z.lazy(() => UuidNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const studentWhereInputSchema: z.ZodType<Prisma.studentWhereInput> = z.object({
  AND: z.union([ z.lazy(() => studentWhereInputSchema),z.lazy(() => studentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => studentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => studentWhereInputSchema),z.lazy(() => studentWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  birthdate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  gender: z.union([ z.lazy(() => Enumgender_typeFilterSchema),z.lazy(() => gender_typeSchema) ]).optional(),
  place_of_birth: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  postalcode: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  residence_zone: z.union([ z.lazy(() => Enumresidence_zone_typeFilterSchema),z.lazy(() => residence_zone_typeSchema) ]).optional(),
  number_address: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  cpf: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  neighborhood: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  city: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  complement: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  father_name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  father_email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  father_cpf: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  father_phone: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  mother_name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  mother_email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  mother_cpf: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  mother_phone: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  rg_number: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  rg_state: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  rg_issue_date: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  rg_issuer: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  birth_certificate: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  docs_type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  responsible_type: z.union([ z.lazy(() => EnumresponsibletypeFilterSchema),z.lazy(() => responsibletypeSchema) ]).optional(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  phone: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  address: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumstatusFilterSchema),z.lazy(() => statusSchema) ]).optional(),
  photo: z.union([ z.lazy(() => BytesNullableFilterSchema),z.instanceof(Buffer) ]).optional().nullable(),
  metadata: z.lazy(() => JsonNullableFilterSchema).optional(),
  user_created: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  ethnicity: z.union([ z.lazy(() => Enumethnicity_typeNullableFilterSchema),z.lazy(() => ethnicity_typeSchema) ]).optional().nullable(),
  deficiency: z.union([ z.lazy(() => Enumdeficiency_typeNullableFilterSchema),z.lazy(() => deficiency_typeSchema) ]).optional().nullable(),
  deficiency_description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  city_state: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  period: z.union([ z.lazy(() => EnumperiodNullableFilterSchema),z.lazy(() => periodSchema) ]).optional().nullable(),
}).strict();

export const studentOrderByWithRelationInputSchema: z.ZodType<Prisma.studentOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  birthdate: z.lazy(() => SortOrderSchema).optional(),
  gender: z.lazy(() => SortOrderSchema).optional(),
  place_of_birth: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  postalcode: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  residence_zone: z.lazy(() => SortOrderSchema).optional(),
  number_address: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  cpf: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  neighborhood: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  city: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  complement: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  father_name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  father_email: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  father_cpf: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  father_phone: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  mother_name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  mother_email: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  mother_cpf: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  mother_phone: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  rg_number: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  rg_state: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  rg_issue_date: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  rg_issuer: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  birth_certificate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  docs_type: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  responsible_type: z.lazy(() => SortOrderSchema).optional(),
  email: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  address: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  photo: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  metadata: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_created: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updated_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  ethnicity: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  deficiency: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  deficiency_description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  city_state: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  period: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _relevance: z.lazy(() => studentOrderByRelevanceInputSchema).optional()
}).strict();

export const studentWhereUniqueInputSchema: z.ZodType<Prisma.studentWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => studentWhereInputSchema),z.lazy(() => studentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => studentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => studentWhereInputSchema),z.lazy(() => studentWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  birthdate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  gender: z.union([ z.lazy(() => Enumgender_typeFilterSchema),z.lazy(() => gender_typeSchema) ]).optional(),
  place_of_birth: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  postalcode: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  residence_zone: z.union([ z.lazy(() => Enumresidence_zone_typeFilterSchema),z.lazy(() => residence_zone_typeSchema) ]).optional(),
  number_address: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  cpf: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  neighborhood: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  city: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  complement: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  father_name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  father_email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  father_cpf: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  father_phone: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  mother_name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  mother_email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  mother_cpf: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  mother_phone: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  rg_number: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  rg_state: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  rg_issue_date: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  rg_issuer: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  birth_certificate: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  docs_type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  responsible_type: z.union([ z.lazy(() => EnumresponsibletypeFilterSchema),z.lazy(() => responsibletypeSchema) ]).optional(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  phone: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  address: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumstatusFilterSchema),z.lazy(() => statusSchema) ]).optional(),
  photo: z.union([ z.lazy(() => BytesNullableFilterSchema),z.instanceof(Buffer) ]).optional().nullable(),
  metadata: z.lazy(() => JsonNullableFilterSchema).optional(),
  user_created: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  ethnicity: z.union([ z.lazy(() => Enumethnicity_typeNullableFilterSchema),z.lazy(() => ethnicity_typeSchema) ]).optional().nullable(),
  deficiency: z.union([ z.lazy(() => Enumdeficiency_typeNullableFilterSchema),z.lazy(() => deficiency_typeSchema) ]).optional().nullable(),
  deficiency_description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  city_state: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  period: z.union([ z.lazy(() => EnumperiodNullableFilterSchema),z.lazy(() => periodSchema) ]).optional().nullable(),
}).strict());

export const studentOrderByWithAggregationInputSchema: z.ZodType<Prisma.studentOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  birthdate: z.lazy(() => SortOrderSchema).optional(),
  gender: z.lazy(() => SortOrderSchema).optional(),
  place_of_birth: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  postalcode: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  residence_zone: z.lazy(() => SortOrderSchema).optional(),
  number_address: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  cpf: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  neighborhood: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  city: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  complement: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  father_name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  father_email: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  father_cpf: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  father_phone: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  mother_name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  mother_email: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  mother_cpf: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  mother_phone: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  rg_number: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  rg_state: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  rg_issue_date: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  rg_issuer: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  birth_certificate: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  docs_type: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  responsible_type: z.lazy(() => SortOrderSchema).optional(),
  email: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  address: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  photo: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  metadata: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_created: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updated_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  ethnicity: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  deficiency: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  deficiency_description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  city_state: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  period: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => studentCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => studentMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => studentMinOrderByAggregateInputSchema).optional()
}).strict();

export const studentScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.studentScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => studentScalarWhereWithAggregatesInputSchema),z.lazy(() => studentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => studentScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => studentScalarWhereWithAggregatesInputSchema),z.lazy(() => studentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  birthdate: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  gender: z.union([ z.lazy(() => Enumgender_typeWithAggregatesFilterSchema),z.lazy(() => gender_typeSchema) ]).optional(),
  place_of_birth: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  postalcode: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  residence_zone: z.union([ z.lazy(() => Enumresidence_zone_typeWithAggregatesFilterSchema),z.lazy(() => residence_zone_typeSchema) ]).optional(),
  number_address: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  cpf: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  neighborhood: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  city: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  complement: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  father_name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  father_email: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  father_cpf: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  father_phone: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  mother_name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  mother_email: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  mother_cpf: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  mother_phone: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  rg_number: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  rg_state: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  rg_issue_date: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  rg_issuer: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  birth_certificate: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  docs_type: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  responsible_type: z.union([ z.lazy(() => EnumresponsibletypeWithAggregatesFilterSchema),z.lazy(() => responsibletypeSchema) ]).optional(),
  email: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  phone: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  address: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumstatusWithAggregatesFilterSchema),z.lazy(() => statusSchema) ]).optional(),
  photo: z.union([ z.lazy(() => BytesNullableWithAggregatesFilterSchema),z.instanceof(Buffer) ]).optional().nullable(),
  metadata: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  user_created: z.union([ z.lazy(() => UuidNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  deleted_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  ethnicity: z.union([ z.lazy(() => Enumethnicity_typeNullableWithAggregatesFilterSchema),z.lazy(() => ethnicity_typeSchema) ]).optional().nullable(),
  deficiency: z.union([ z.lazy(() => Enumdeficiency_typeNullableWithAggregatesFilterSchema),z.lazy(() => deficiency_typeSchema) ]).optional().nullable(),
  deficiency_description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  city_state: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  period: z.union([ z.lazy(() => EnumperiodNullableWithAggregatesFilterSchema),z.lazy(() => periodSchema) ]).optional().nullable(),
}).strict();

export const holidaysWhereInputSchema: z.ZodType<Prisma.holidaysWhereInput> = z.object({
  AND: z.union([ z.lazy(() => holidaysWhereInputSchema),z.lazy(() => holidaysWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => holidaysWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => holidaysWhereInputSchema),z.lazy(() => holidaysWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  holiday_date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  weekday: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const holidaysOrderByWithRelationInputSchema: z.ZodType<Prisma.holidaysOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  holiday_date: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  weekday: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _relevance: z.lazy(() => holidaysOrderByRelevanceInputSchema).optional()
}).strict();

export const holidaysWhereUniqueInputSchema: z.ZodType<Prisma.holidaysWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => holidaysWhereInputSchema),z.lazy(() => holidaysWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => holidaysWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => holidaysWhereInputSchema),z.lazy(() => holidaysWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  holiday_date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  weekday: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict());

export const holidaysOrderByWithAggregationInputSchema: z.ZodType<Prisma.holidaysOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  holiday_date: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  weekday: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => holidaysCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => holidaysMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => holidaysMinOrderByAggregateInputSchema).optional()
}).strict();

export const holidaysScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.holidaysScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => holidaysScalarWhereWithAggregatesInputSchema),z.lazy(() => holidaysScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => holidaysScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => holidaysScalarWhereWithAggregatesInputSchema),z.lazy(() => holidaysScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  holiday_date: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  weekday: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

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
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
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
  deleted_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
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
  deleted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
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
  deleted_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
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
  deleted_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const institution_settingsWhereInputSchema: z.ZodType<Prisma.institution_settingsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => institution_settingsWhereInputSchema),z.lazy(() => institution_settingsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => institution_settingsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => institution_settingsWhereInputSchema),z.lazy(() => institution_settingsWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => BigIntFilterSchema),z.bigint() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  institution_id: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  date_opening: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  date_closing: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  school_days: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  date_start: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  date_end: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const institution_settingsOrderByWithRelationInputSchema: z.ZodType<Prisma.institution_settingsOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  institution_id: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  date_opening: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  date_closing: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  school_days: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  date_start: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  date_end: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _relevance: z.lazy(() => institution_settingsOrderByRelevanceInputSchema).optional()
}).strict();

export const institution_settingsWhereUniqueInputSchema: z.ZodType<Prisma.institution_settingsWhereUniqueInput> = z.object({
  id: z.bigint()
})
.and(z.object({
  id: z.bigint().optional(),
  AND: z.union([ z.lazy(() => institution_settingsWhereInputSchema),z.lazy(() => institution_settingsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => institution_settingsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => institution_settingsWhereInputSchema),z.lazy(() => institution_settingsWhereInputSchema).array() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  institution_id: z.union([ z.lazy(() => UuidNullableFilterSchema),z.string() ]).optional().nullable(),
  date_opening: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  date_closing: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  school_days: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  date_start: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  date_end: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict());

export const institution_settingsOrderByWithAggregationInputSchema: z.ZodType<Prisma.institution_settingsOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  institution_id: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  date_opening: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  date_closing: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  school_days: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  date_start: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  date_end: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => institution_settingsCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => institution_settingsAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => institution_settingsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => institution_settingsMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => institution_settingsSumOrderByAggregateInputSchema).optional()
}).strict();

export const institution_settingsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.institution_settingsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => institution_settingsScalarWhereWithAggregatesInputSchema),z.lazy(() => institution_settingsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => institution_settingsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => institution_settingsScalarWhereWithAggregatesInputSchema),z.lazy(() => institution_settingsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => BigIntWithAggregatesFilterSchema),z.bigint() ]).optional(),
  created_at: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  institution_id: z.union([ z.lazy(() => UuidNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  date_opening: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  date_closing: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  school_days: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  date_start: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  date_end: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
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

export const class_sessionCreateInputSchema: z.ZodType<Prisma.class_sessionCreateInput> = z.object({
  id: z.string().optional(),
  school_id: z.string(),
  discipline_id: z.string(),
  timetable_id: z.string(),
  day_of_week: z.lazy(() => day_of_weekSchema),
  start_time: z.coerce.date(),
  end_time: z.coerce.date(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  user_created: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable()
}).strict();

export const class_sessionUncheckedCreateInputSchema: z.ZodType<Prisma.class_sessionUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  school_id: z.string(),
  discipline_id: z.string(),
  timetable_id: z.string(),
  day_of_week: z.lazy(() => day_of_weekSchema),
  start_time: z.coerce.date(),
  end_time: z.coerce.date(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  user_created: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable()
}).strict();

export const class_sessionUpdateInputSchema: z.ZodType<Prisma.class_sessionUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  school_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  discipline_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timetable_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  day_of_week: z.union([ z.lazy(() => day_of_weekSchema),z.lazy(() => Enumday_of_weekFieldUpdateOperationsInputSchema) ]).optional(),
  start_time: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  end_time: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  user_created: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const class_sessionUncheckedUpdateInputSchema: z.ZodType<Prisma.class_sessionUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  school_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  discipline_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timetable_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  day_of_week: z.union([ z.lazy(() => day_of_weekSchema),z.lazy(() => Enumday_of_weekFieldUpdateOperationsInputSchema) ]).optional(),
  start_time: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  end_time: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  user_created: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const class_sessionCreateManyInputSchema: z.ZodType<Prisma.class_sessionCreateManyInput> = z.object({
  id: z.string().optional(),
  school_id: z.string(),
  discipline_id: z.string(),
  timetable_id: z.string(),
  day_of_week: z.lazy(() => day_of_weekSchema),
  start_time: z.coerce.date(),
  end_time: z.coerce.date(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  user_created: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable()
}).strict();

export const class_sessionUpdateManyMutationInputSchema: z.ZodType<Prisma.class_sessionUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  school_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  discipline_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timetable_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  day_of_week: z.union([ z.lazy(() => day_of_weekSchema),z.lazy(() => Enumday_of_weekFieldUpdateOperationsInputSchema) ]).optional(),
  start_time: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  end_time: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  user_created: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const class_sessionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.class_sessionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  school_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  discipline_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  timetable_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  day_of_week: z.union([ z.lazy(() => day_of_weekSchema),z.lazy(() => Enumday_of_weekFieldUpdateOperationsInputSchema) ]).optional(),
  start_time: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  end_time: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  user_created: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const teachertotimetableCreateInputSchema: z.ZodType<Prisma.teachertotimetableCreateInput> = z.object({
  a: z.string().optional(),
  b: z.string()
}).strict();

export const teachertotimetableUncheckedCreateInputSchema: z.ZodType<Prisma.teachertotimetableUncheckedCreateInput> = z.object({
  a: z.string().optional(),
  b: z.string()
}).strict();

export const teachertotimetableUpdateInputSchema: z.ZodType<Prisma.teachertotimetableUpdateInput> = z.object({
  a: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  b: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const teachertotimetableUncheckedUpdateInputSchema: z.ZodType<Prisma.teachertotimetableUncheckedUpdateInput> = z.object({
  a: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  b: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const teachertotimetableCreateManyInputSchema: z.ZodType<Prisma.teachertotimetableCreateManyInput> = z.object({
  a: z.string().optional(),
  b: z.string()
}).strict();

export const teachertotimetableUpdateManyMutationInputSchema: z.ZodType<Prisma.teachertotimetableUpdateManyMutationInput> = z.object({
  a: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  b: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const teachertotimetableUncheckedUpdateManyInputSchema: z.ZodType<Prisma.teachertotimetableUncheckedUpdateManyInput> = z.object({
  a: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  b: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const academic_yearCreateInputSchema: z.ZodType<Prisma.academic_yearCreateInput> = z.object({
  id: z.string().optional(),
  school_id: z.string(),
  template_id: z.string(),
  ref_year: z.number().int(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  deleted_at: z.coerce.date().optional().nullable(),
  user_created: z.string().optional().nullable()
}).strict();

export const academic_yearUncheckedCreateInputSchema: z.ZodType<Prisma.academic_yearUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  school_id: z.string(),
  template_id: z.string(),
  ref_year: z.number().int(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  deleted_at: z.coerce.date().optional().nullable(),
  user_created: z.string().optional().nullable()
}).strict();

export const academic_yearUpdateInputSchema: z.ZodType<Prisma.academic_yearUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  school_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  template_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ref_year: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_created: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const academic_yearUncheckedUpdateInputSchema: z.ZodType<Prisma.academic_yearUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  school_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  template_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ref_year: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_created: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const academic_yearCreateManyInputSchema: z.ZodType<Prisma.academic_yearCreateManyInput> = z.object({
  id: z.string().optional(),
  school_id: z.string(),
  template_id: z.string(),
  ref_year: z.number().int(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  deleted_at: z.coerce.date().optional().nullable(),
  user_created: z.string().optional().nullable()
}).strict();

export const academic_yearUpdateManyMutationInputSchema: z.ZodType<Prisma.academic_yearUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  school_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  template_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ref_year: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_created: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const academic_yearUncheckedUpdateManyInputSchema: z.ZodType<Prisma.academic_yearUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  school_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  template_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ref_year: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_created: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const academic_year_templateCreateInputSchema: z.ZodType<Prisma.academic_year_templateCreateInput> = z.object({
  id: z.string().optional(),
  ref_year: z.number().int(),
  name: z.string(),
  stages: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  stage_count: z.number().int(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  deleted_at: z.coerce.date().optional().nullable(),
  user_created: z.string().optional().nullable()
}).strict();

export const academic_year_templateUncheckedCreateInputSchema: z.ZodType<Prisma.academic_year_templateUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  ref_year: z.number().int(),
  name: z.string(),
  stages: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  stage_count: z.number().int(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  deleted_at: z.coerce.date().optional().nullable(),
  user_created: z.string().optional().nullable()
}).strict();

export const academic_year_templateUpdateInputSchema: z.ZodType<Prisma.academic_year_templateUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ref_year: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  stages: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  stage_count: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_created: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const academic_year_templateUncheckedUpdateInputSchema: z.ZodType<Prisma.academic_year_templateUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ref_year: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  stages: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  stage_count: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_created: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const academic_year_templateCreateManyInputSchema: z.ZodType<Prisma.academic_year_templateCreateManyInput> = z.object({
  id: z.string().optional(),
  ref_year: z.number().int(),
  name: z.string(),
  stages: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]),
  stage_count: z.number().int(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  deleted_at: z.coerce.date().optional().nullable(),
  user_created: z.string().optional().nullable()
}).strict();

export const academic_year_templateUpdateManyMutationInputSchema: z.ZodType<Prisma.academic_year_templateUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ref_year: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  stages: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  stage_count: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_created: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const academic_year_templateUncheckedUpdateManyInputSchema: z.ZodType<Prisma.academic_year_templateUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ref_year: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  stages: z.union([ z.lazy(() => JsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  stage_count: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_created: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const attendanceCreateInputSchema: z.ZodType<Prisma.attendanceCreateInput> = z.object({
  id: z.string().optional(),
  school_id: z.string(),
  student_id: z.string(),
  date: z.coerce.date(),
  status: z.lazy(() => attendance_statusSchema),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  user_created: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable()
}).strict();

export const attendanceUncheckedCreateInputSchema: z.ZodType<Prisma.attendanceUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  school_id: z.string(),
  student_id: z.string(),
  date: z.coerce.date(),
  status: z.lazy(() => attendance_statusSchema),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  user_created: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable()
}).strict();

export const attendanceUpdateInputSchema: z.ZodType<Prisma.attendanceUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  school_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  student_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => attendance_statusSchema),z.lazy(() => Enumattendance_statusFieldUpdateOperationsInputSchema) ]).optional(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  user_created: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const attendanceUncheckedUpdateInputSchema: z.ZodType<Prisma.attendanceUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  school_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  student_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => attendance_statusSchema),z.lazy(() => Enumattendance_statusFieldUpdateOperationsInputSchema) ]).optional(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  user_created: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const attendanceCreateManyInputSchema: z.ZodType<Prisma.attendanceCreateManyInput> = z.object({
  id: z.string().optional(),
  school_id: z.string(),
  student_id: z.string(),
  date: z.coerce.date(),
  status: z.lazy(() => attendance_statusSchema),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  user_created: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable()
}).strict();

export const attendanceUpdateManyMutationInputSchema: z.ZodType<Prisma.attendanceUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  school_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  student_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => attendance_statusSchema),z.lazy(() => Enumattendance_statusFieldUpdateOperationsInputSchema) ]).optional(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  user_created: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const attendanceUncheckedUpdateManyInputSchema: z.ZodType<Prisma.attendanceUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  school_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  student_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => attendance_statusSchema),z.lazy(() => Enumattendance_statusFieldUpdateOperationsInputSchema) ]).optional(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  user_created: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const classroomCreateInputSchema: z.ZodType<Prisma.classroomCreateInput> = z.object({
  id: z.string().optional(),
  school_id: z.string(),
  series_id: z.string(),
  institution_id: z.string(),
  course_id: z.string(),
  teacher_id: z.string(),
  max_students: z.number().int(),
  start_time: z.coerce.date().optional().nullable(),
  start_time_interval: z.coerce.date().optional().nullable(),
  end_time_interval: z.coerce.date().optional().nullable(),
  end_time: z.coerce.date().optional().nullable(),
  day_of_week: z.lazy(() => day_of_weekSchema).optional().nullable(),
  name: z.string(),
  period: z.lazy(() => periodSchema).optional(),
  status: z.lazy(() => statusSchema).optional(),
  abbreviation: z.string().optional().nullable(),
  year: z.number().int(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  user_created: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable()
}).strict();

export const classroomUncheckedCreateInputSchema: z.ZodType<Prisma.classroomUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  school_id: z.string(),
  series_id: z.string(),
  institution_id: z.string(),
  course_id: z.string(),
  teacher_id: z.string(),
  max_students: z.number().int(),
  start_time: z.coerce.date().optional().nullable(),
  start_time_interval: z.coerce.date().optional().nullable(),
  end_time_interval: z.coerce.date().optional().nullable(),
  end_time: z.coerce.date().optional().nullable(),
  day_of_week: z.lazy(() => day_of_weekSchema).optional().nullable(),
  name: z.string(),
  period: z.lazy(() => periodSchema).optional(),
  status: z.lazy(() => statusSchema).optional(),
  abbreviation: z.string().optional().nullable(),
  year: z.number().int(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  user_created: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable()
}).strict();

export const classroomUpdateInputSchema: z.ZodType<Prisma.classroomUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  school_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  series_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  institution_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  course_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  teacher_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  max_students: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  start_time: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  start_time_interval: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  end_time_interval: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  end_time: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  day_of_week: z.union([ z.lazy(() => day_of_weekSchema),z.lazy(() => NullableEnumday_of_weekFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  period: z.union([ z.lazy(() => periodSchema),z.lazy(() => EnumperiodFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => statusSchema),z.lazy(() => EnumstatusFieldUpdateOperationsInputSchema) ]).optional(),
  abbreviation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  year: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  user_created: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const classroomUncheckedUpdateInputSchema: z.ZodType<Prisma.classroomUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  school_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  series_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  institution_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  course_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  teacher_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  max_students: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  start_time: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  start_time_interval: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  end_time_interval: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  end_time: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  day_of_week: z.union([ z.lazy(() => day_of_weekSchema),z.lazy(() => NullableEnumday_of_weekFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  period: z.union([ z.lazy(() => periodSchema),z.lazy(() => EnumperiodFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => statusSchema),z.lazy(() => EnumstatusFieldUpdateOperationsInputSchema) ]).optional(),
  abbreviation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  year: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  user_created: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const classroomCreateManyInputSchema: z.ZodType<Prisma.classroomCreateManyInput> = z.object({
  id: z.string().optional(),
  school_id: z.string(),
  series_id: z.string(),
  institution_id: z.string(),
  course_id: z.string(),
  teacher_id: z.string(),
  max_students: z.number().int(),
  start_time: z.coerce.date().optional().nullable(),
  start_time_interval: z.coerce.date().optional().nullable(),
  end_time_interval: z.coerce.date().optional().nullable(),
  end_time: z.coerce.date().optional().nullable(),
  day_of_week: z.lazy(() => day_of_weekSchema).optional().nullable(),
  name: z.string(),
  period: z.lazy(() => periodSchema).optional(),
  status: z.lazy(() => statusSchema).optional(),
  abbreviation: z.string().optional().nullable(),
  year: z.number().int(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  user_created: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable()
}).strict();

export const classroomUpdateManyMutationInputSchema: z.ZodType<Prisma.classroomUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  school_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  series_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  institution_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  course_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  teacher_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  max_students: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  start_time: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  start_time_interval: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  end_time_interval: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  end_time: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  day_of_week: z.union([ z.lazy(() => day_of_weekSchema),z.lazy(() => NullableEnumday_of_weekFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  period: z.union([ z.lazy(() => periodSchema),z.lazy(() => EnumperiodFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => statusSchema),z.lazy(() => EnumstatusFieldUpdateOperationsInputSchema) ]).optional(),
  abbreviation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  year: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  user_created: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const classroomUncheckedUpdateManyInputSchema: z.ZodType<Prisma.classroomUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  school_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  series_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  institution_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  course_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  teacher_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  max_students: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  start_time: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  start_time_interval: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  end_time_interval: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  end_time: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  day_of_week: z.union([ z.lazy(() => day_of_weekSchema),z.lazy(() => NullableEnumday_of_weekFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  period: z.union([ z.lazy(() => periodSchema),z.lazy(() => EnumperiodFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => statusSchema),z.lazy(() => EnumstatusFieldUpdateOperationsInputSchema) ]).optional(),
  abbreviation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  year: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  user_created: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const courseCreateInputSchema: z.ZodType<Prisma.courseCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  status: z.lazy(() => statusSchema).optional(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  user_created: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  teaching_type: z.lazy(() => teaching_typeSchema).optional().nullable(),
  regime_type: z.lazy(() => regime_typeSchema).optional().nullable(),
  course_modality: z.lazy(() => course_modalitySchema).optional().nullable(),
  workload: z.string().optional().nullable(),
  institution_id: z.string().optional().nullable(),
  course_stage: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  school_id: z.string().optional().nullable()
}).strict();

export const courseUncheckedCreateInputSchema: z.ZodType<Prisma.courseUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  status: z.lazy(() => statusSchema).optional(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  user_created: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  teaching_type: z.lazy(() => teaching_typeSchema).optional().nullable(),
  regime_type: z.lazy(() => regime_typeSchema).optional().nullable(),
  course_modality: z.lazy(() => course_modalitySchema).optional().nullable(),
  workload: z.string().optional().nullable(),
  institution_id: z.string().optional().nullable(),
  course_stage: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  school_id: z.string().optional().nullable()
}).strict();

export const courseUpdateInputSchema: z.ZodType<Prisma.courseUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => statusSchema),z.lazy(() => EnumstatusFieldUpdateOperationsInputSchema) ]).optional(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  user_created: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  teaching_type: z.union([ z.lazy(() => teaching_typeSchema),z.lazy(() => NullableEnumteaching_typeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  regime_type: z.union([ z.lazy(() => regime_typeSchema),z.lazy(() => NullableEnumregime_typeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  course_modality: z.union([ z.lazy(() => course_modalitySchema),z.lazy(() => NullableEnumcourse_modalityFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  workload: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  institution_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  course_stage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  school_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const courseUncheckedUpdateInputSchema: z.ZodType<Prisma.courseUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => statusSchema),z.lazy(() => EnumstatusFieldUpdateOperationsInputSchema) ]).optional(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  user_created: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  teaching_type: z.union([ z.lazy(() => teaching_typeSchema),z.lazy(() => NullableEnumteaching_typeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  regime_type: z.union([ z.lazy(() => regime_typeSchema),z.lazy(() => NullableEnumregime_typeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  course_modality: z.union([ z.lazy(() => course_modalitySchema),z.lazy(() => NullableEnumcourse_modalityFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  workload: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  institution_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  course_stage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  school_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const courseCreateManyInputSchema: z.ZodType<Prisma.courseCreateManyInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  status: z.lazy(() => statusSchema).optional(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  user_created: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  teaching_type: z.lazy(() => teaching_typeSchema).optional().nullable(),
  regime_type: z.lazy(() => regime_typeSchema).optional().nullable(),
  course_modality: z.lazy(() => course_modalitySchema).optional().nullable(),
  workload: z.string().optional().nullable(),
  institution_id: z.string().optional().nullable(),
  course_stage: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  school_id: z.string().optional().nullable()
}).strict();

export const courseUpdateManyMutationInputSchema: z.ZodType<Prisma.courseUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => statusSchema),z.lazy(() => EnumstatusFieldUpdateOperationsInputSchema) ]).optional(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  user_created: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  teaching_type: z.union([ z.lazy(() => teaching_typeSchema),z.lazy(() => NullableEnumteaching_typeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  regime_type: z.union([ z.lazy(() => regime_typeSchema),z.lazy(() => NullableEnumregime_typeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  course_modality: z.union([ z.lazy(() => course_modalitySchema),z.lazy(() => NullableEnumcourse_modalityFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  workload: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  institution_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  course_stage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  school_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const courseUncheckedUpdateManyInputSchema: z.ZodType<Prisma.courseUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => statusSchema),z.lazy(() => EnumstatusFieldUpdateOperationsInputSchema) ]).optional(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  user_created: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  teaching_type: z.union([ z.lazy(() => teaching_typeSchema),z.lazy(() => NullableEnumteaching_typeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  regime_type: z.union([ z.lazy(() => regime_typeSchema),z.lazy(() => NullableEnumregime_typeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  course_modality: z.union([ z.lazy(() => course_modalitySchema),z.lazy(() => NullableEnumcourse_modalityFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  workload: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  institution_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  course_stage: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  school_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const documentCreateInputSchema: z.ZodType<Prisma.documentCreateInput> = z.object({
  id: z.string().optional(),
  file_name: z.string(),
  mime_type: z.string(),
  size: z.bigint(),
  is_current_version: z.boolean().optional(),
  file_hash: z.string().optional().nullable(),
  upload_date: z.coerce.date().optional(),
  storage_path: z.string(),
  version: z.number().int().optional(),
  compression_applied: z.boolean().optional(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  is_deleted: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  deleted_at: z.coerce.date().optional().nullable(),
  user_created: z.string().optional().nullable()
}).strict();

export const documentUncheckedCreateInputSchema: z.ZodType<Prisma.documentUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  file_name: z.string(),
  mime_type: z.string(),
  size: z.bigint(),
  is_current_version: z.boolean().optional(),
  file_hash: z.string().optional().nullable(),
  upload_date: z.coerce.date().optional(),
  storage_path: z.string(),
  version: z.number().int().optional(),
  compression_applied: z.boolean().optional(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  is_deleted: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  deleted_at: z.coerce.date().optional().nullable(),
  user_created: z.string().optional().nullable()
}).strict();

export const documentUpdateInputSchema: z.ZodType<Prisma.documentUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  file_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mime_type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  is_current_version: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  file_hash: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  upload_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  storage_path: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  version: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  compression_applied: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  is_deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_created: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const documentUncheckedUpdateInputSchema: z.ZodType<Prisma.documentUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  file_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mime_type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  is_current_version: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  file_hash: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  upload_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  storage_path: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  version: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  compression_applied: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  is_deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_created: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const documentCreateManyInputSchema: z.ZodType<Prisma.documentCreateManyInput> = z.object({
  id: z.string().optional(),
  file_name: z.string(),
  mime_type: z.string(),
  size: z.bigint(),
  is_current_version: z.boolean().optional(),
  file_hash: z.string().optional().nullable(),
  upload_date: z.coerce.date().optional(),
  storage_path: z.string(),
  version: z.number().int().optional(),
  compression_applied: z.boolean().optional(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  is_deleted: z.boolean().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional().nullable(),
  deleted_at: z.coerce.date().optional().nullable(),
  user_created: z.string().optional().nullable()
}).strict();

export const documentUpdateManyMutationInputSchema: z.ZodType<Prisma.documentUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  file_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mime_type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  is_current_version: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  file_hash: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  upload_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  storage_path: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  version: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  compression_applied: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  is_deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_created: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const documentUncheckedUpdateManyInputSchema: z.ZodType<Prisma.documentUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  file_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  mime_type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  size: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  is_current_version: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  file_hash: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  upload_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  storage_path: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  version: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  compression_applied: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  is_deleted: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_created: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const enrollmentCreateInputSchema: z.ZodType<Prisma.enrollmentCreateInput> = z.object({
  id: z.string().optional(),
  school_id: z.string(),
  student_id: z.string(),
  course_id: z.string(),
  classroom_id: z.string(),
  series_id: z.string(),
  name: z.string(),
  created_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  date_enrollment: z.coerce.date(),
  observations: z.string().optional().nullable(),
  status: z.lazy(() => statusSchema).optional(),
  situation: z.lazy(() => situation_typeSchema).optional().nullable(),
  enrollment_code: z.string().optional().nullable(),
  institution_id: z.string().optional().nullable(),
  pre_enrollment_id: z.string().optional().nullable()
}).strict();

export const enrollmentUncheckedCreateInputSchema: z.ZodType<Prisma.enrollmentUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  school_id: z.string(),
  student_id: z.string(),
  course_id: z.string(),
  classroom_id: z.string(),
  series_id: z.string(),
  name: z.string(),
  created_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  date_enrollment: z.coerce.date(),
  observations: z.string().optional().nullable(),
  status: z.lazy(() => statusSchema).optional(),
  situation: z.lazy(() => situation_typeSchema).optional().nullable(),
  enrollment_code: z.string().optional().nullable(),
  institution_id: z.string().optional().nullable(),
  pre_enrollment_id: z.string().optional().nullable()
}).strict();

export const enrollmentUpdateInputSchema: z.ZodType<Prisma.enrollmentUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  school_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  student_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  course_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  classroom_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  series_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  date_enrollment: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  observations: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => statusSchema),z.lazy(() => EnumstatusFieldUpdateOperationsInputSchema) ]).optional(),
  situation: z.union([ z.lazy(() => situation_typeSchema),z.lazy(() => NullableEnumsituation_typeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  enrollment_code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  institution_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pre_enrollment_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const enrollmentUncheckedUpdateInputSchema: z.ZodType<Prisma.enrollmentUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  school_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  student_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  course_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  classroom_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  series_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  date_enrollment: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  observations: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => statusSchema),z.lazy(() => EnumstatusFieldUpdateOperationsInputSchema) ]).optional(),
  situation: z.union([ z.lazy(() => situation_typeSchema),z.lazy(() => NullableEnumsituation_typeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  enrollment_code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  institution_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pre_enrollment_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const enrollmentCreateManyInputSchema: z.ZodType<Prisma.enrollmentCreateManyInput> = z.object({
  id: z.string().optional(),
  school_id: z.string(),
  student_id: z.string(),
  course_id: z.string(),
  classroom_id: z.string(),
  series_id: z.string(),
  name: z.string(),
  created_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  date_enrollment: z.coerce.date(),
  observations: z.string().optional().nullable(),
  status: z.lazy(() => statusSchema).optional(),
  situation: z.lazy(() => situation_typeSchema).optional().nullable(),
  enrollment_code: z.string().optional().nullable(),
  institution_id: z.string().optional().nullable(),
  pre_enrollment_id: z.string().optional().nullable()
}).strict();

export const enrollmentUpdateManyMutationInputSchema: z.ZodType<Prisma.enrollmentUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  school_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  student_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  course_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  classroom_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  series_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  date_enrollment: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  observations: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => statusSchema),z.lazy(() => EnumstatusFieldUpdateOperationsInputSchema) ]).optional(),
  situation: z.union([ z.lazy(() => situation_typeSchema),z.lazy(() => NullableEnumsituation_typeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  enrollment_code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  institution_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pre_enrollment_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const enrollmentUncheckedUpdateManyInputSchema: z.ZodType<Prisma.enrollmentUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  school_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  student_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  course_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  classroom_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  series_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  date_enrollment: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  observations: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => statusSchema),z.lazy(() => EnumstatusFieldUpdateOperationsInputSchema) ]).optional(),
  situation: z.union([ z.lazy(() => situation_typeSchema),z.lazy(() => NullableEnumsituation_typeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  enrollment_code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  institution_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pre_enrollment_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const gradeCreateInputSchema: z.ZodType<Prisma.gradeCreateInput> = z.object({
  id: z.string().optional(),
  school_id: z.string(),
  student_id: z.string(),
  discipline_id: z.string(),
  value: z.number(),
  date: z.coerce.date(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  user_created: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable()
}).strict();

export const gradeUncheckedCreateInputSchema: z.ZodType<Prisma.gradeUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  school_id: z.string(),
  student_id: z.string(),
  discipline_id: z.string(),
  value: z.number(),
  date: z.coerce.date(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  user_created: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable()
}).strict();

export const gradeUpdateInputSchema: z.ZodType<Prisma.gradeUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  school_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  student_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  discipline_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  user_created: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const gradeUncheckedUpdateInputSchema: z.ZodType<Prisma.gradeUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  school_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  student_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  discipline_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  user_created: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const gradeCreateManyInputSchema: z.ZodType<Prisma.gradeCreateManyInput> = z.object({
  id: z.string().optional(),
  school_id: z.string(),
  student_id: z.string(),
  discipline_id: z.string(),
  value: z.number(),
  date: z.coerce.date(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  user_created: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable()
}).strict();

export const gradeUpdateManyMutationInputSchema: z.ZodType<Prisma.gradeUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  school_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  student_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  discipline_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  user_created: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const gradeUncheckedUpdateManyInputSchema: z.ZodType<Prisma.gradeUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  school_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  student_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  discipline_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  user_created: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const studentCreateInputSchema: z.ZodType<Prisma.studentCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  birthdate: z.coerce.date(),
  gender: z.lazy(() => gender_typeSchema).optional(),
  place_of_birth: z.string().optional().nullable(),
  postalcode: z.string().optional().nullable(),
  residence_zone: z.lazy(() => residence_zone_typeSchema).optional(),
  number_address: z.string().optional().nullable(),
  cpf: z.string().optional().nullable(),
  neighborhood: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  complement: z.string().optional().nullable(),
  father_name: z.string().optional().nullable(),
  father_email: z.string().optional().nullable(),
  father_cpf: z.string().optional().nullable(),
  father_phone: z.string().optional().nullable(),
  mother_name: z.string().optional().nullable(),
  mother_email: z.string().optional().nullable(),
  mother_cpf: z.string().optional().nullable(),
  mother_phone: z.string().optional().nullable(),
  rg_number: z.string().optional().nullable(),
  rg_state: z.string().optional().nullable(),
  rg_issue_date: z.coerce.date().optional().nullable(),
  rg_issuer: z.string().optional().nullable(),
  birth_certificate: z.string().optional().nullable(),
  docs_type: z.string().optional().nullable(),
  responsible_type: z.lazy(() => responsibletypeSchema).optional(),
  email: z.string().optional().nullable(),
  phone: z.string(),
  address: z.string().optional().nullable(),
  status: z.lazy(() => statusSchema).optional(),
  photo: z.instanceof(Buffer).optional().nullable(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  user_created: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  ethnicity: z.lazy(() => ethnicity_typeSchema).optional().nullable(),
  deficiency: z.lazy(() => deficiency_typeSchema).optional().nullable(),
  deficiency_description: z.string().optional().nullable(),
  city_state: z.string().optional().nullable(),
  period: z.lazy(() => periodSchema).optional().nullable()
}).strict();

export const studentUncheckedCreateInputSchema: z.ZodType<Prisma.studentUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  birthdate: z.coerce.date(),
  gender: z.lazy(() => gender_typeSchema).optional(),
  place_of_birth: z.string().optional().nullable(),
  postalcode: z.string().optional().nullable(),
  residence_zone: z.lazy(() => residence_zone_typeSchema).optional(),
  number_address: z.string().optional().nullable(),
  cpf: z.string().optional().nullable(),
  neighborhood: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  complement: z.string().optional().nullable(),
  father_name: z.string().optional().nullable(),
  father_email: z.string().optional().nullable(),
  father_cpf: z.string().optional().nullable(),
  father_phone: z.string().optional().nullable(),
  mother_name: z.string().optional().nullable(),
  mother_email: z.string().optional().nullable(),
  mother_cpf: z.string().optional().nullable(),
  mother_phone: z.string().optional().nullable(),
  rg_number: z.string().optional().nullable(),
  rg_state: z.string().optional().nullable(),
  rg_issue_date: z.coerce.date().optional().nullable(),
  rg_issuer: z.string().optional().nullable(),
  birth_certificate: z.string().optional().nullable(),
  docs_type: z.string().optional().nullable(),
  responsible_type: z.lazy(() => responsibletypeSchema).optional(),
  email: z.string().optional().nullable(),
  phone: z.string(),
  address: z.string().optional().nullable(),
  status: z.lazy(() => statusSchema).optional(),
  photo: z.instanceof(Buffer).optional().nullable(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  user_created: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  ethnicity: z.lazy(() => ethnicity_typeSchema).optional().nullable(),
  deficiency: z.lazy(() => deficiency_typeSchema).optional().nullable(),
  deficiency_description: z.string().optional().nullable(),
  city_state: z.string().optional().nullable(),
  period: z.lazy(() => periodSchema).optional().nullable()
}).strict();

export const studentUpdateInputSchema: z.ZodType<Prisma.studentUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthdate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  gender: z.union([ z.lazy(() => gender_typeSchema),z.lazy(() => Enumgender_typeFieldUpdateOperationsInputSchema) ]).optional(),
  place_of_birth: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  postalcode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  residence_zone: z.union([ z.lazy(() => residence_zone_typeSchema),z.lazy(() => Enumresidence_zone_typeFieldUpdateOperationsInputSchema) ]).optional(),
  number_address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cpf: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  neighborhood: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  city: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  complement: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  father_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  father_email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  father_cpf: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  father_phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mother_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mother_email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mother_cpf: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mother_phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rg_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rg_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rg_issue_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rg_issuer: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birth_certificate: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  docs_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  responsible_type: z.union([ z.lazy(() => responsibletypeSchema),z.lazy(() => EnumresponsibletypeFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => statusSchema),z.lazy(() => EnumstatusFieldUpdateOperationsInputSchema) ]).optional(),
  photo: z.union([ z.instanceof(Buffer),z.lazy(() => NullableBytesFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  user_created: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ethnicity: z.union([ z.lazy(() => ethnicity_typeSchema),z.lazy(() => NullableEnumethnicity_typeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deficiency: z.union([ z.lazy(() => deficiency_typeSchema),z.lazy(() => NullableEnumdeficiency_typeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deficiency_description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  city_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  period: z.union([ z.lazy(() => periodSchema),z.lazy(() => NullableEnumperiodFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const studentUncheckedUpdateInputSchema: z.ZodType<Prisma.studentUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthdate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  gender: z.union([ z.lazy(() => gender_typeSchema),z.lazy(() => Enumgender_typeFieldUpdateOperationsInputSchema) ]).optional(),
  place_of_birth: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  postalcode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  residence_zone: z.union([ z.lazy(() => residence_zone_typeSchema),z.lazy(() => Enumresidence_zone_typeFieldUpdateOperationsInputSchema) ]).optional(),
  number_address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cpf: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  neighborhood: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  city: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  complement: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  father_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  father_email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  father_cpf: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  father_phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mother_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mother_email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mother_cpf: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mother_phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rg_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rg_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rg_issue_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rg_issuer: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birth_certificate: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  docs_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  responsible_type: z.union([ z.lazy(() => responsibletypeSchema),z.lazy(() => EnumresponsibletypeFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => statusSchema),z.lazy(() => EnumstatusFieldUpdateOperationsInputSchema) ]).optional(),
  photo: z.union([ z.instanceof(Buffer),z.lazy(() => NullableBytesFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  user_created: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ethnicity: z.union([ z.lazy(() => ethnicity_typeSchema),z.lazy(() => NullableEnumethnicity_typeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deficiency: z.union([ z.lazy(() => deficiency_typeSchema),z.lazy(() => NullableEnumdeficiency_typeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deficiency_description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  city_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  period: z.union([ z.lazy(() => periodSchema),z.lazy(() => NullableEnumperiodFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const studentCreateManyInputSchema: z.ZodType<Prisma.studentCreateManyInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  birthdate: z.coerce.date(),
  gender: z.lazy(() => gender_typeSchema).optional(),
  place_of_birth: z.string().optional().nullable(),
  postalcode: z.string().optional().nullable(),
  residence_zone: z.lazy(() => residence_zone_typeSchema).optional(),
  number_address: z.string().optional().nullable(),
  cpf: z.string().optional().nullable(),
  neighborhood: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  complement: z.string().optional().nullable(),
  father_name: z.string().optional().nullable(),
  father_email: z.string().optional().nullable(),
  father_cpf: z.string().optional().nullable(),
  father_phone: z.string().optional().nullable(),
  mother_name: z.string().optional().nullable(),
  mother_email: z.string().optional().nullable(),
  mother_cpf: z.string().optional().nullable(),
  mother_phone: z.string().optional().nullable(),
  rg_number: z.string().optional().nullable(),
  rg_state: z.string().optional().nullable(),
  rg_issue_date: z.coerce.date().optional().nullable(),
  rg_issuer: z.string().optional().nullable(),
  birth_certificate: z.string().optional().nullable(),
  docs_type: z.string().optional().nullable(),
  responsible_type: z.lazy(() => responsibletypeSchema).optional(),
  email: z.string().optional().nullable(),
  phone: z.string(),
  address: z.string().optional().nullable(),
  status: z.lazy(() => statusSchema).optional(),
  photo: z.instanceof(Buffer).optional().nullable(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  user_created: z.string().optional().nullable(),
  created_at: z.coerce.date().optional(),
  deleted_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  ethnicity: z.lazy(() => ethnicity_typeSchema).optional().nullable(),
  deficiency: z.lazy(() => deficiency_typeSchema).optional().nullable(),
  deficiency_description: z.string().optional().nullable(),
  city_state: z.string().optional().nullable(),
  period: z.lazy(() => periodSchema).optional().nullable()
}).strict();

export const studentUpdateManyMutationInputSchema: z.ZodType<Prisma.studentUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthdate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  gender: z.union([ z.lazy(() => gender_typeSchema),z.lazy(() => Enumgender_typeFieldUpdateOperationsInputSchema) ]).optional(),
  place_of_birth: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  postalcode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  residence_zone: z.union([ z.lazy(() => residence_zone_typeSchema),z.lazy(() => Enumresidence_zone_typeFieldUpdateOperationsInputSchema) ]).optional(),
  number_address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cpf: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  neighborhood: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  city: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  complement: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  father_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  father_email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  father_cpf: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  father_phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mother_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mother_email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mother_cpf: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mother_phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rg_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rg_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rg_issue_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rg_issuer: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birth_certificate: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  docs_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  responsible_type: z.union([ z.lazy(() => responsibletypeSchema),z.lazy(() => EnumresponsibletypeFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => statusSchema),z.lazy(() => EnumstatusFieldUpdateOperationsInputSchema) ]).optional(),
  photo: z.union([ z.instanceof(Buffer),z.lazy(() => NullableBytesFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  user_created: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ethnicity: z.union([ z.lazy(() => ethnicity_typeSchema),z.lazy(() => NullableEnumethnicity_typeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deficiency: z.union([ z.lazy(() => deficiency_typeSchema),z.lazy(() => NullableEnumdeficiency_typeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deficiency_description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  city_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  period: z.union([ z.lazy(() => periodSchema),z.lazy(() => NullableEnumperiodFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const studentUncheckedUpdateManyInputSchema: z.ZodType<Prisma.studentUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birthdate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  gender: z.union([ z.lazy(() => gender_typeSchema),z.lazy(() => Enumgender_typeFieldUpdateOperationsInputSchema) ]).optional(),
  place_of_birth: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  postalcode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  residence_zone: z.union([ z.lazy(() => residence_zone_typeSchema),z.lazy(() => Enumresidence_zone_typeFieldUpdateOperationsInputSchema) ]).optional(),
  number_address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cpf: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  neighborhood: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  city: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  complement: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  father_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  father_email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  father_cpf: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  father_phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mother_name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mother_email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mother_cpf: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mother_phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rg_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rg_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rg_issue_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rg_issuer: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  birth_certificate: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  docs_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  responsible_type: z.union([ z.lazy(() => responsibletypeSchema),z.lazy(() => EnumresponsibletypeFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => statusSchema),z.lazy(() => EnumstatusFieldUpdateOperationsInputSchema) ]).optional(),
  photo: z.union([ z.instanceof(Buffer),z.lazy(() => NullableBytesFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  metadata: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  user_created: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ethnicity: z.union([ z.lazy(() => ethnicity_typeSchema),z.lazy(() => NullableEnumethnicity_typeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deficiency: z.union([ z.lazy(() => deficiency_typeSchema),z.lazy(() => NullableEnumdeficiency_typeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  deficiency_description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  city_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  period: z.union([ z.lazy(() => periodSchema),z.lazy(() => NullableEnumperiodFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const holidaysCreateInputSchema: z.ZodType<Prisma.holidaysCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  holiday_date: z.coerce.date(),
  description: z.string().optional().nullable(),
  weekday: z.string().optional().nullable()
}).strict();

export const holidaysUncheckedCreateInputSchema: z.ZodType<Prisma.holidaysUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  holiday_date: z.coerce.date(),
  description: z.string().optional().nullable(),
  weekday: z.string().optional().nullable()
}).strict();

export const holidaysUpdateInputSchema: z.ZodType<Prisma.holidaysUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  holiday_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  weekday: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const holidaysUncheckedUpdateInputSchema: z.ZodType<Prisma.holidaysUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  holiday_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  weekday: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const holidaysCreateManyInputSchema: z.ZodType<Prisma.holidaysCreateManyInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  holiday_date: z.coerce.date(),
  description: z.string().optional().nullable(),
  weekday: z.string().optional().nullable()
}).strict();

export const holidaysUpdateManyMutationInputSchema: z.ZodType<Prisma.holidaysUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  holiday_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  weekday: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const holidaysUncheckedUpdateManyInputSchema: z.ZodType<Prisma.holidaysUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  holiday_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  weekday: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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
  deleted_at: z.coerce.date().optional().nullable(),
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
  deleted_at: z.coerce.date().optional().nullable(),
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
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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
  deleted_at: z.coerce.date().optional().nullable(),
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
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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
  deleted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const institution_settingsCreateInputSchema: z.ZodType<Prisma.institution_settingsCreateInput> = z.object({
  id: z.bigint().optional(),
  created_at: z.coerce.date().optional(),
  institution_id: z.string().optional().nullable(),
  date_opening: z.coerce.date().optional().nullable(),
  date_closing: z.coerce.date().optional().nullable(),
  school_days: z.number().optional().nullable(),
  date_start: z.coerce.date().optional().nullable(),
  date_end: z.coerce.date().optional().nullable()
}).strict();

export const institution_settingsUncheckedCreateInputSchema: z.ZodType<Prisma.institution_settingsUncheckedCreateInput> = z.object({
  id: z.bigint().optional(),
  created_at: z.coerce.date().optional(),
  institution_id: z.string().optional().nullable(),
  date_opening: z.coerce.date().optional().nullable(),
  date_closing: z.coerce.date().optional().nullable(),
  school_days: z.number().optional().nullable(),
  date_start: z.coerce.date().optional().nullable(),
  date_end: z.coerce.date().optional().nullable()
}).strict();

export const institution_settingsUpdateInputSchema: z.ZodType<Prisma.institution_settingsUpdateInput> = z.object({
  id: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  institution_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  date_opening: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  date_closing: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  school_days: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  date_start: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  date_end: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const institution_settingsUncheckedUpdateInputSchema: z.ZodType<Prisma.institution_settingsUncheckedUpdateInput> = z.object({
  id: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  institution_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  date_opening: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  date_closing: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  school_days: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  date_start: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  date_end: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const institution_settingsCreateManyInputSchema: z.ZodType<Prisma.institution_settingsCreateManyInput> = z.object({
  id: z.bigint().optional(),
  created_at: z.coerce.date().optional(),
  institution_id: z.string().optional().nullable(),
  date_opening: z.coerce.date().optional().nullable(),
  date_closing: z.coerce.date().optional().nullable(),
  school_days: z.number().optional().nullable(),
  date_start: z.coerce.date().optional().nullable(),
  date_end: z.coerce.date().optional().nullable()
}).strict();

export const institution_settingsUpdateManyMutationInputSchema: z.ZodType<Prisma.institution_settingsUpdateManyMutationInput> = z.object({
  id: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  institution_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  date_opening: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  date_closing: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  school_days: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  date_start: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  date_end: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const institution_settingsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.institution_settingsUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  institution_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  date_opening: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  date_closing: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  school_days: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  date_start: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  date_end: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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

export const Enumday_of_weekFilterSchema: z.ZodType<Prisma.Enumday_of_weekFilter> = z.object({
  equals: z.lazy(() => day_of_weekSchema).optional(),
  in: z.lazy(() => day_of_weekSchema).array().optional(),
  notIn: z.lazy(() => day_of_weekSchema).array().optional(),
  not: z.union([ z.lazy(() => day_of_weekSchema),z.lazy(() => NestedEnumday_of_weekFilterSchema) ]).optional(),
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

export const class_sessionOrderByRelevanceInputSchema: z.ZodType<Prisma.class_sessionOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => class_sessionOrderByRelevanceFieldEnumSchema),z.lazy(() => class_sessionOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const class_sessionCountOrderByAggregateInputSchema: z.ZodType<Prisma.class_sessionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  school_id: z.lazy(() => SortOrderSchema).optional(),
  discipline_id: z.lazy(() => SortOrderSchema).optional(),
  timetable_id: z.lazy(() => SortOrderSchema).optional(),
  day_of_week: z.lazy(() => SortOrderSchema).optional(),
  start_time: z.lazy(() => SortOrderSchema).optional(),
  end_time: z.lazy(() => SortOrderSchema).optional(),
  metadata: z.lazy(() => SortOrderSchema).optional(),
  user_created: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const class_sessionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.class_sessionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  school_id: z.lazy(() => SortOrderSchema).optional(),
  discipline_id: z.lazy(() => SortOrderSchema).optional(),
  timetable_id: z.lazy(() => SortOrderSchema).optional(),
  day_of_week: z.lazy(() => SortOrderSchema).optional(),
  start_time: z.lazy(() => SortOrderSchema).optional(),
  end_time: z.lazy(() => SortOrderSchema).optional(),
  user_created: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const class_sessionMinOrderByAggregateInputSchema: z.ZodType<Prisma.class_sessionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  school_id: z.lazy(() => SortOrderSchema).optional(),
  discipline_id: z.lazy(() => SortOrderSchema).optional(),
  timetable_id: z.lazy(() => SortOrderSchema).optional(),
  day_of_week: z.lazy(() => SortOrderSchema).optional(),
  start_time: z.lazy(() => SortOrderSchema).optional(),
  end_time: z.lazy(() => SortOrderSchema).optional(),
  user_created: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
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

export const Enumday_of_weekWithAggregatesFilterSchema: z.ZodType<Prisma.Enumday_of_weekWithAggregatesFilter> = z.object({
  equals: z.lazy(() => day_of_weekSchema).optional(),
  in: z.lazy(() => day_of_weekSchema).array().optional(),
  notIn: z.lazy(() => day_of_weekSchema).array().optional(),
  not: z.union([ z.lazy(() => day_of_weekSchema),z.lazy(() => NestedEnumday_of_weekWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumday_of_weekFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumday_of_weekFilterSchema).optional()
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

export const teachertotimetableOrderByRelevanceInputSchema: z.ZodType<Prisma.teachertotimetableOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => teachertotimetableOrderByRelevanceFieldEnumSchema),z.lazy(() => teachertotimetableOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const teachertotimetableCountOrderByAggregateInputSchema: z.ZodType<Prisma.teachertotimetableCountOrderByAggregateInput> = z.object({
  a: z.lazy(() => SortOrderSchema).optional(),
  b: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const teachertotimetableMaxOrderByAggregateInputSchema: z.ZodType<Prisma.teachertotimetableMaxOrderByAggregateInput> = z.object({
  a: z.lazy(() => SortOrderSchema).optional(),
  b: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const teachertotimetableMinOrderByAggregateInputSchema: z.ZodType<Prisma.teachertotimetableMinOrderByAggregateInput> = z.object({
  a: z.lazy(() => SortOrderSchema).optional(),
  b: z.lazy(() => SortOrderSchema).optional()
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

export const academic_yearOrderByRelevanceInputSchema: z.ZodType<Prisma.academic_yearOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => academic_yearOrderByRelevanceFieldEnumSchema),z.lazy(() => academic_yearOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const academic_yearCountOrderByAggregateInputSchema: z.ZodType<Prisma.academic_yearCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  school_id: z.lazy(() => SortOrderSchema).optional(),
  template_id: z.lazy(() => SortOrderSchema).optional(),
  ref_year: z.lazy(() => SortOrderSchema).optional(),
  metadata: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional(),
  user_created: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const academic_yearAvgOrderByAggregateInputSchema: z.ZodType<Prisma.academic_yearAvgOrderByAggregateInput> = z.object({
  ref_year: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const academic_yearMaxOrderByAggregateInputSchema: z.ZodType<Prisma.academic_yearMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  school_id: z.lazy(() => SortOrderSchema).optional(),
  template_id: z.lazy(() => SortOrderSchema).optional(),
  ref_year: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional(),
  user_created: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const academic_yearMinOrderByAggregateInputSchema: z.ZodType<Prisma.academic_yearMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  school_id: z.lazy(() => SortOrderSchema).optional(),
  template_id: z.lazy(() => SortOrderSchema).optional(),
  ref_year: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional(),
  user_created: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const academic_yearSumOrderByAggregateInputSchema: z.ZodType<Prisma.academic_yearSumOrderByAggregateInput> = z.object({
  ref_year: z.lazy(() => SortOrderSchema).optional()
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

export const JsonFilterSchema: z.ZodType<Prisma.JsonFilter> = z.object({
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

export const academic_year_templateOrderByRelevanceInputSchema: z.ZodType<Prisma.academic_year_templateOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => academic_year_templateOrderByRelevanceFieldEnumSchema),z.lazy(() => academic_year_templateOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const academic_year_templateCountOrderByAggregateInputSchema: z.ZodType<Prisma.academic_year_templateCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  ref_year: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  stages: z.lazy(() => SortOrderSchema).optional(),
  stage_count: z.lazy(() => SortOrderSchema).optional(),
  metadata: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional(),
  user_created: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const academic_year_templateAvgOrderByAggregateInputSchema: z.ZodType<Prisma.academic_year_templateAvgOrderByAggregateInput> = z.object({
  ref_year: z.lazy(() => SortOrderSchema).optional(),
  stage_count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const academic_year_templateMaxOrderByAggregateInputSchema: z.ZodType<Prisma.academic_year_templateMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  ref_year: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  stage_count: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional(),
  user_created: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const academic_year_templateMinOrderByAggregateInputSchema: z.ZodType<Prisma.academic_year_templateMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  ref_year: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  stage_count: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional(),
  user_created: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const academic_year_templateSumOrderByAggregateInputSchema: z.ZodType<Prisma.academic_year_templateSumOrderByAggregateInput> = z.object({
  ref_year: z.lazy(() => SortOrderSchema).optional(),
  stage_count: z.lazy(() => SortOrderSchema).optional()
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

export const JsonWithAggregatesFilterSchema: z.ZodType<Prisma.JsonWithAggregatesFilter> = z.object({
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
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedJsonFilterSchema).optional(),
  _max: z.lazy(() => NestedJsonFilterSchema).optional()
}).strict();

export const Enumattendance_statusFilterSchema: z.ZodType<Prisma.Enumattendance_statusFilter> = z.object({
  equals: z.lazy(() => attendance_statusSchema).optional(),
  in: z.lazy(() => attendance_statusSchema).array().optional(),
  notIn: z.lazy(() => attendance_statusSchema).array().optional(),
  not: z.union([ z.lazy(() => attendance_statusSchema),z.lazy(() => NestedEnumattendance_statusFilterSchema) ]).optional(),
}).strict();

export const attendanceOrderByRelevanceInputSchema: z.ZodType<Prisma.attendanceOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => attendanceOrderByRelevanceFieldEnumSchema),z.lazy(() => attendanceOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const attendanceCountOrderByAggregateInputSchema: z.ZodType<Prisma.attendanceCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  school_id: z.lazy(() => SortOrderSchema).optional(),
  student_id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  metadata: z.lazy(() => SortOrderSchema).optional(),
  user_created: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const attendanceMaxOrderByAggregateInputSchema: z.ZodType<Prisma.attendanceMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  school_id: z.lazy(() => SortOrderSchema).optional(),
  student_id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  user_created: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const attendanceMinOrderByAggregateInputSchema: z.ZodType<Prisma.attendanceMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  school_id: z.lazy(() => SortOrderSchema).optional(),
  student_id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  user_created: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Enumattendance_statusWithAggregatesFilterSchema: z.ZodType<Prisma.Enumattendance_statusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => attendance_statusSchema).optional(),
  in: z.lazy(() => attendance_statusSchema).array().optional(),
  notIn: z.lazy(() => attendance_statusSchema).array().optional(),
  not: z.union([ z.lazy(() => attendance_statusSchema),z.lazy(() => NestedEnumattendance_statusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumattendance_statusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumattendance_statusFilterSchema).optional()
}).strict();

export const Enumday_of_weekNullableFilterSchema: z.ZodType<Prisma.Enumday_of_weekNullableFilter> = z.object({
  equals: z.lazy(() => day_of_weekSchema).optional().nullable(),
  in: z.lazy(() => day_of_weekSchema).array().optional().nullable(),
  notIn: z.lazy(() => day_of_weekSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => day_of_weekSchema),z.lazy(() => NestedEnumday_of_weekNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const EnumperiodFilterSchema: z.ZodType<Prisma.EnumperiodFilter> = z.object({
  equals: z.lazy(() => periodSchema).optional(),
  in: z.lazy(() => periodSchema).array().optional(),
  notIn: z.lazy(() => periodSchema).array().optional(),
  not: z.union([ z.lazy(() => periodSchema),z.lazy(() => NestedEnumperiodFilterSchema) ]).optional(),
}).strict();

export const EnumstatusFilterSchema: z.ZodType<Prisma.EnumstatusFilter> = z.object({
  equals: z.lazy(() => statusSchema).optional(),
  in: z.lazy(() => statusSchema).array().optional(),
  notIn: z.lazy(() => statusSchema).array().optional(),
  not: z.union([ z.lazy(() => statusSchema),z.lazy(() => NestedEnumstatusFilterSchema) ]).optional(),
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

export const classroomOrderByRelevanceInputSchema: z.ZodType<Prisma.classroomOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => classroomOrderByRelevanceFieldEnumSchema),z.lazy(() => classroomOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const classroomCountOrderByAggregateInputSchema: z.ZodType<Prisma.classroomCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  school_id: z.lazy(() => SortOrderSchema).optional(),
  series_id: z.lazy(() => SortOrderSchema).optional(),
  institution_id: z.lazy(() => SortOrderSchema).optional(),
  course_id: z.lazy(() => SortOrderSchema).optional(),
  teacher_id: z.lazy(() => SortOrderSchema).optional(),
  max_students: z.lazy(() => SortOrderSchema).optional(),
  start_time: z.lazy(() => SortOrderSchema).optional(),
  start_time_interval: z.lazy(() => SortOrderSchema).optional(),
  end_time_interval: z.lazy(() => SortOrderSchema).optional(),
  end_time: z.lazy(() => SortOrderSchema).optional(),
  day_of_week: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  period: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  abbreviation: z.lazy(() => SortOrderSchema).optional(),
  year: z.lazy(() => SortOrderSchema).optional(),
  metadata: z.lazy(() => SortOrderSchema).optional(),
  user_created: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const classroomAvgOrderByAggregateInputSchema: z.ZodType<Prisma.classroomAvgOrderByAggregateInput> = z.object({
  max_students: z.lazy(() => SortOrderSchema).optional(),
  year: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const classroomMaxOrderByAggregateInputSchema: z.ZodType<Prisma.classroomMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  school_id: z.lazy(() => SortOrderSchema).optional(),
  series_id: z.lazy(() => SortOrderSchema).optional(),
  institution_id: z.lazy(() => SortOrderSchema).optional(),
  course_id: z.lazy(() => SortOrderSchema).optional(),
  teacher_id: z.lazy(() => SortOrderSchema).optional(),
  max_students: z.lazy(() => SortOrderSchema).optional(),
  start_time: z.lazy(() => SortOrderSchema).optional(),
  start_time_interval: z.lazy(() => SortOrderSchema).optional(),
  end_time_interval: z.lazy(() => SortOrderSchema).optional(),
  end_time: z.lazy(() => SortOrderSchema).optional(),
  day_of_week: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  period: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  abbreviation: z.lazy(() => SortOrderSchema).optional(),
  year: z.lazy(() => SortOrderSchema).optional(),
  user_created: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const classroomMinOrderByAggregateInputSchema: z.ZodType<Prisma.classroomMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  school_id: z.lazy(() => SortOrderSchema).optional(),
  series_id: z.lazy(() => SortOrderSchema).optional(),
  institution_id: z.lazy(() => SortOrderSchema).optional(),
  course_id: z.lazy(() => SortOrderSchema).optional(),
  teacher_id: z.lazy(() => SortOrderSchema).optional(),
  max_students: z.lazy(() => SortOrderSchema).optional(),
  start_time: z.lazy(() => SortOrderSchema).optional(),
  start_time_interval: z.lazy(() => SortOrderSchema).optional(),
  end_time_interval: z.lazy(() => SortOrderSchema).optional(),
  end_time: z.lazy(() => SortOrderSchema).optional(),
  day_of_week: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  period: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  abbreviation: z.lazy(() => SortOrderSchema).optional(),
  year: z.lazy(() => SortOrderSchema).optional(),
  user_created: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const classroomSumOrderByAggregateInputSchema: z.ZodType<Prisma.classroomSumOrderByAggregateInput> = z.object({
  max_students: z.lazy(() => SortOrderSchema).optional(),
  year: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Enumday_of_weekNullableWithAggregatesFilterSchema: z.ZodType<Prisma.Enumday_of_weekNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => day_of_weekSchema).optional().nullable(),
  in: z.lazy(() => day_of_weekSchema).array().optional().nullable(),
  notIn: z.lazy(() => day_of_weekSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => day_of_weekSchema),z.lazy(() => NestedEnumday_of_weekNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumday_of_weekNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumday_of_weekNullableFilterSchema).optional()
}).strict();

export const EnumperiodWithAggregatesFilterSchema: z.ZodType<Prisma.EnumperiodWithAggregatesFilter> = z.object({
  equals: z.lazy(() => periodSchema).optional(),
  in: z.lazy(() => periodSchema).array().optional(),
  notIn: z.lazy(() => periodSchema).array().optional(),
  not: z.union([ z.lazy(() => periodSchema),z.lazy(() => NestedEnumperiodWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumperiodFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumperiodFilterSchema).optional()
}).strict();

export const EnumstatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumstatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => statusSchema).optional(),
  in: z.lazy(() => statusSchema).array().optional(),
  notIn: z.lazy(() => statusSchema).array().optional(),
  not: z.union([ z.lazy(() => statusSchema),z.lazy(() => NestedEnumstatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumstatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumstatusFilterSchema).optional()
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

export const Enumteaching_typeNullableFilterSchema: z.ZodType<Prisma.Enumteaching_typeNullableFilter> = z.object({
  equals: z.lazy(() => teaching_typeSchema).optional().nullable(),
  in: z.lazy(() => teaching_typeSchema).array().optional().nullable(),
  notIn: z.lazy(() => teaching_typeSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => teaching_typeSchema),z.lazy(() => NestedEnumteaching_typeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const Enumregime_typeNullableFilterSchema: z.ZodType<Prisma.Enumregime_typeNullableFilter> = z.object({
  equals: z.lazy(() => regime_typeSchema).optional().nullable(),
  in: z.lazy(() => regime_typeSchema).array().optional().nullable(),
  notIn: z.lazy(() => regime_typeSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => regime_typeSchema),z.lazy(() => NestedEnumregime_typeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const Enumcourse_modalityNullableFilterSchema: z.ZodType<Prisma.Enumcourse_modalityNullableFilter> = z.object({
  equals: z.lazy(() => course_modalitySchema).optional().nullable(),
  in: z.lazy(() => course_modalitySchema).array().optional().nullable(),
  notIn: z.lazy(() => course_modalitySchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => course_modalitySchema),z.lazy(() => NestedEnumcourse_modalityNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const courseOrderByRelevanceInputSchema: z.ZodType<Prisma.courseOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => courseOrderByRelevanceFieldEnumSchema),z.lazy(() => courseOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const courseCountOrderByAggregateInputSchema: z.ZodType<Prisma.courseCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  metadata: z.lazy(() => SortOrderSchema).optional(),
  user_created: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  teaching_type: z.lazy(() => SortOrderSchema).optional(),
  regime_type: z.lazy(() => SortOrderSchema).optional(),
  course_modality: z.lazy(() => SortOrderSchema).optional(),
  workload: z.lazy(() => SortOrderSchema).optional(),
  institution_id: z.lazy(() => SortOrderSchema).optional(),
  course_stage: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  school_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const courseMaxOrderByAggregateInputSchema: z.ZodType<Prisma.courseMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  user_created: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  teaching_type: z.lazy(() => SortOrderSchema).optional(),
  regime_type: z.lazy(() => SortOrderSchema).optional(),
  course_modality: z.lazy(() => SortOrderSchema).optional(),
  workload: z.lazy(() => SortOrderSchema).optional(),
  institution_id: z.lazy(() => SortOrderSchema).optional(),
  course_stage: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  school_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const courseMinOrderByAggregateInputSchema: z.ZodType<Prisma.courseMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  user_created: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  teaching_type: z.lazy(() => SortOrderSchema).optional(),
  regime_type: z.lazy(() => SortOrderSchema).optional(),
  course_modality: z.lazy(() => SortOrderSchema).optional(),
  workload: z.lazy(() => SortOrderSchema).optional(),
  institution_id: z.lazy(() => SortOrderSchema).optional(),
  course_stage: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  school_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Enumteaching_typeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.Enumteaching_typeNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => teaching_typeSchema).optional().nullable(),
  in: z.lazy(() => teaching_typeSchema).array().optional().nullable(),
  notIn: z.lazy(() => teaching_typeSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => teaching_typeSchema),z.lazy(() => NestedEnumteaching_typeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumteaching_typeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumteaching_typeNullableFilterSchema).optional()
}).strict();

export const Enumregime_typeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.Enumregime_typeNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => regime_typeSchema).optional().nullable(),
  in: z.lazy(() => regime_typeSchema).array().optional().nullable(),
  notIn: z.lazy(() => regime_typeSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => regime_typeSchema),z.lazy(() => NestedEnumregime_typeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumregime_typeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumregime_typeNullableFilterSchema).optional()
}).strict();

export const Enumcourse_modalityNullableWithAggregatesFilterSchema: z.ZodType<Prisma.Enumcourse_modalityNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => course_modalitySchema).optional().nullable(),
  in: z.lazy(() => course_modalitySchema).array().optional().nullable(),
  notIn: z.lazy(() => course_modalitySchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => course_modalitySchema),z.lazy(() => NestedEnumcourse_modalityNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumcourse_modalityNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumcourse_modalityNullableFilterSchema).optional()
}).strict();

export const BigIntFilterSchema: z.ZodType<Prisma.BigIntFilter> = z.object({
  equals: z.bigint().optional(),
  in: z.bigint().array().optional(),
  notIn: z.bigint().array().optional(),
  lt: z.bigint().optional(),
  lte: z.bigint().optional(),
  gt: z.bigint().optional(),
  gte: z.bigint().optional(),
  not: z.union([ z.bigint(),z.lazy(() => NestedBigIntFilterSchema) ]).optional(),
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const documentOrderByRelevanceInputSchema: z.ZodType<Prisma.documentOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => documentOrderByRelevanceFieldEnumSchema),z.lazy(() => documentOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const documentCountOrderByAggregateInputSchema: z.ZodType<Prisma.documentCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  file_name: z.lazy(() => SortOrderSchema).optional(),
  mime_type: z.lazy(() => SortOrderSchema).optional(),
  size: z.lazy(() => SortOrderSchema).optional(),
  is_current_version: z.lazy(() => SortOrderSchema).optional(),
  file_hash: z.lazy(() => SortOrderSchema).optional(),
  upload_date: z.lazy(() => SortOrderSchema).optional(),
  storage_path: z.lazy(() => SortOrderSchema).optional(),
  version: z.lazy(() => SortOrderSchema).optional(),
  compression_applied: z.lazy(() => SortOrderSchema).optional(),
  metadata: z.lazy(() => SortOrderSchema).optional(),
  is_deleted: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional(),
  user_created: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const documentAvgOrderByAggregateInputSchema: z.ZodType<Prisma.documentAvgOrderByAggregateInput> = z.object({
  size: z.lazy(() => SortOrderSchema).optional(),
  version: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const documentMaxOrderByAggregateInputSchema: z.ZodType<Prisma.documentMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  file_name: z.lazy(() => SortOrderSchema).optional(),
  mime_type: z.lazy(() => SortOrderSchema).optional(),
  size: z.lazy(() => SortOrderSchema).optional(),
  is_current_version: z.lazy(() => SortOrderSchema).optional(),
  file_hash: z.lazy(() => SortOrderSchema).optional(),
  upload_date: z.lazy(() => SortOrderSchema).optional(),
  storage_path: z.lazy(() => SortOrderSchema).optional(),
  version: z.lazy(() => SortOrderSchema).optional(),
  compression_applied: z.lazy(() => SortOrderSchema).optional(),
  is_deleted: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional(),
  user_created: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const documentMinOrderByAggregateInputSchema: z.ZodType<Prisma.documentMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  file_name: z.lazy(() => SortOrderSchema).optional(),
  mime_type: z.lazy(() => SortOrderSchema).optional(),
  size: z.lazy(() => SortOrderSchema).optional(),
  is_current_version: z.lazy(() => SortOrderSchema).optional(),
  file_hash: z.lazy(() => SortOrderSchema).optional(),
  upload_date: z.lazy(() => SortOrderSchema).optional(),
  storage_path: z.lazy(() => SortOrderSchema).optional(),
  version: z.lazy(() => SortOrderSchema).optional(),
  compression_applied: z.lazy(() => SortOrderSchema).optional(),
  is_deleted: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional(),
  user_created: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const documentSumOrderByAggregateInputSchema: z.ZodType<Prisma.documentSumOrderByAggregateInput> = z.object({
  size: z.lazy(() => SortOrderSchema).optional(),
  version: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BigIntWithAggregatesFilterSchema: z.ZodType<Prisma.BigIntWithAggregatesFilter> = z.object({
  equals: z.bigint().optional(),
  in: z.bigint().array().optional(),
  notIn: z.bigint().array().optional(),
  lt: z.bigint().optional(),
  lte: z.bigint().optional(),
  gt: z.bigint().optional(),
  gte: z.bigint().optional(),
  not: z.union([ z.bigint(),z.lazy(() => NestedBigIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedBigIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBigIntFilterSchema).optional(),
  _max: z.lazy(() => NestedBigIntFilterSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const Enumsituation_typeNullableFilterSchema: z.ZodType<Prisma.Enumsituation_typeNullableFilter> = z.object({
  equals: z.lazy(() => situation_typeSchema).optional().nullable(),
  in: z.lazy(() => situation_typeSchema).array().optional().nullable(),
  notIn: z.lazy(() => situation_typeSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => situation_typeSchema),z.lazy(() => NestedEnumsituation_typeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const enrollmentOrderByRelevanceInputSchema: z.ZodType<Prisma.enrollmentOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => enrollmentOrderByRelevanceFieldEnumSchema),z.lazy(() => enrollmentOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const enrollmentCountOrderByAggregateInputSchema: z.ZodType<Prisma.enrollmentCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  school_id: z.lazy(() => SortOrderSchema).optional(),
  student_id: z.lazy(() => SortOrderSchema).optional(),
  course_id: z.lazy(() => SortOrderSchema).optional(),
  classroom_id: z.lazy(() => SortOrderSchema).optional(),
  series_id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  date_enrollment: z.lazy(() => SortOrderSchema).optional(),
  observations: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  situation: z.lazy(() => SortOrderSchema).optional(),
  enrollment_code: z.lazy(() => SortOrderSchema).optional(),
  institution_id: z.lazy(() => SortOrderSchema).optional(),
  pre_enrollment_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const enrollmentMaxOrderByAggregateInputSchema: z.ZodType<Prisma.enrollmentMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  school_id: z.lazy(() => SortOrderSchema).optional(),
  student_id: z.lazy(() => SortOrderSchema).optional(),
  course_id: z.lazy(() => SortOrderSchema).optional(),
  classroom_id: z.lazy(() => SortOrderSchema).optional(),
  series_id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  date_enrollment: z.lazy(() => SortOrderSchema).optional(),
  observations: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  situation: z.lazy(() => SortOrderSchema).optional(),
  enrollment_code: z.lazy(() => SortOrderSchema).optional(),
  institution_id: z.lazy(() => SortOrderSchema).optional(),
  pre_enrollment_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const enrollmentMinOrderByAggregateInputSchema: z.ZodType<Prisma.enrollmentMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  school_id: z.lazy(() => SortOrderSchema).optional(),
  student_id: z.lazy(() => SortOrderSchema).optional(),
  course_id: z.lazy(() => SortOrderSchema).optional(),
  classroom_id: z.lazy(() => SortOrderSchema).optional(),
  series_id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  date_enrollment: z.lazy(() => SortOrderSchema).optional(),
  observations: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  situation: z.lazy(() => SortOrderSchema).optional(),
  enrollment_code: z.lazy(() => SortOrderSchema).optional(),
  institution_id: z.lazy(() => SortOrderSchema).optional(),
  pre_enrollment_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Enumsituation_typeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.Enumsituation_typeNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => situation_typeSchema).optional().nullable(),
  in: z.lazy(() => situation_typeSchema).array().optional().nullable(),
  notIn: z.lazy(() => situation_typeSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => situation_typeSchema),z.lazy(() => NestedEnumsituation_typeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumsituation_typeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumsituation_typeNullableFilterSchema).optional()
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

export const gradeOrderByRelevanceInputSchema: z.ZodType<Prisma.gradeOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => gradeOrderByRelevanceFieldEnumSchema),z.lazy(() => gradeOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const gradeCountOrderByAggregateInputSchema: z.ZodType<Prisma.gradeCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  school_id: z.lazy(() => SortOrderSchema).optional(),
  student_id: z.lazy(() => SortOrderSchema).optional(),
  discipline_id: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  metadata: z.lazy(() => SortOrderSchema).optional(),
  user_created: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const gradeAvgOrderByAggregateInputSchema: z.ZodType<Prisma.gradeAvgOrderByAggregateInput> = z.object({
  value: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const gradeMaxOrderByAggregateInputSchema: z.ZodType<Prisma.gradeMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  school_id: z.lazy(() => SortOrderSchema).optional(),
  student_id: z.lazy(() => SortOrderSchema).optional(),
  discipline_id: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  user_created: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const gradeMinOrderByAggregateInputSchema: z.ZodType<Prisma.gradeMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  school_id: z.lazy(() => SortOrderSchema).optional(),
  student_id: z.lazy(() => SortOrderSchema).optional(),
  discipline_id: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  user_created: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const gradeSumOrderByAggregateInputSchema: z.ZodType<Prisma.gradeSumOrderByAggregateInput> = z.object({
  value: z.lazy(() => SortOrderSchema).optional()
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

export const Enumgender_typeFilterSchema: z.ZodType<Prisma.Enumgender_typeFilter> = z.object({
  equals: z.lazy(() => gender_typeSchema).optional(),
  in: z.lazy(() => gender_typeSchema).array().optional(),
  notIn: z.lazy(() => gender_typeSchema).array().optional(),
  not: z.union([ z.lazy(() => gender_typeSchema),z.lazy(() => NestedEnumgender_typeFilterSchema) ]).optional(),
}).strict();

export const Enumresidence_zone_typeFilterSchema: z.ZodType<Prisma.Enumresidence_zone_typeFilter> = z.object({
  equals: z.lazy(() => residence_zone_typeSchema).optional(),
  in: z.lazy(() => residence_zone_typeSchema).array().optional(),
  notIn: z.lazy(() => residence_zone_typeSchema).array().optional(),
  not: z.union([ z.lazy(() => residence_zone_typeSchema),z.lazy(() => NestedEnumresidence_zone_typeFilterSchema) ]).optional(),
}).strict();

export const EnumresponsibletypeFilterSchema: z.ZodType<Prisma.EnumresponsibletypeFilter> = z.object({
  equals: z.lazy(() => responsibletypeSchema).optional(),
  in: z.lazy(() => responsibletypeSchema).array().optional(),
  notIn: z.lazy(() => responsibletypeSchema).array().optional(),
  not: z.union([ z.lazy(() => responsibletypeSchema),z.lazy(() => NestedEnumresponsibletypeFilterSchema) ]).optional(),
}).strict();

export const BytesNullableFilterSchema: z.ZodType<Prisma.BytesNullableFilter> = z.object({
  equals: z.instanceof(Buffer).optional().nullable(),
  in: z.instanceof(Buffer).array().optional().nullable(),
  notIn: z.instanceof(Buffer).array().optional().nullable(),
  not: z.union([ z.instanceof(Buffer),z.lazy(() => NestedBytesNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const Enumethnicity_typeNullableFilterSchema: z.ZodType<Prisma.Enumethnicity_typeNullableFilter> = z.object({
  equals: z.lazy(() => ethnicity_typeSchema).optional().nullable(),
  in: z.lazy(() => ethnicity_typeSchema).array().optional().nullable(),
  notIn: z.lazy(() => ethnicity_typeSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => ethnicity_typeSchema),z.lazy(() => NestedEnumethnicity_typeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const Enumdeficiency_typeNullableFilterSchema: z.ZodType<Prisma.Enumdeficiency_typeNullableFilter> = z.object({
  equals: z.lazy(() => deficiency_typeSchema).optional().nullable(),
  in: z.lazy(() => deficiency_typeSchema).array().optional().nullable(),
  notIn: z.lazy(() => deficiency_typeSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => deficiency_typeSchema),z.lazy(() => NestedEnumdeficiency_typeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const EnumperiodNullableFilterSchema: z.ZodType<Prisma.EnumperiodNullableFilter> = z.object({
  equals: z.lazy(() => periodSchema).optional().nullable(),
  in: z.lazy(() => periodSchema).array().optional().nullable(),
  notIn: z.lazy(() => periodSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => periodSchema),z.lazy(() => NestedEnumperiodNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const studentOrderByRelevanceInputSchema: z.ZodType<Prisma.studentOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => studentOrderByRelevanceFieldEnumSchema),z.lazy(() => studentOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const studentCountOrderByAggregateInputSchema: z.ZodType<Prisma.studentCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  birthdate: z.lazy(() => SortOrderSchema).optional(),
  gender: z.lazy(() => SortOrderSchema).optional(),
  place_of_birth: z.lazy(() => SortOrderSchema).optional(),
  postalcode: z.lazy(() => SortOrderSchema).optional(),
  residence_zone: z.lazy(() => SortOrderSchema).optional(),
  number_address: z.lazy(() => SortOrderSchema).optional(),
  cpf: z.lazy(() => SortOrderSchema).optional(),
  neighborhood: z.lazy(() => SortOrderSchema).optional(),
  city: z.lazy(() => SortOrderSchema).optional(),
  complement: z.lazy(() => SortOrderSchema).optional(),
  father_name: z.lazy(() => SortOrderSchema).optional(),
  father_email: z.lazy(() => SortOrderSchema).optional(),
  father_cpf: z.lazy(() => SortOrderSchema).optional(),
  father_phone: z.lazy(() => SortOrderSchema).optional(),
  mother_name: z.lazy(() => SortOrderSchema).optional(),
  mother_email: z.lazy(() => SortOrderSchema).optional(),
  mother_cpf: z.lazy(() => SortOrderSchema).optional(),
  mother_phone: z.lazy(() => SortOrderSchema).optional(),
  rg_number: z.lazy(() => SortOrderSchema).optional(),
  rg_state: z.lazy(() => SortOrderSchema).optional(),
  rg_issue_date: z.lazy(() => SortOrderSchema).optional(),
  rg_issuer: z.lazy(() => SortOrderSchema).optional(),
  birth_certificate: z.lazy(() => SortOrderSchema).optional(),
  docs_type: z.lazy(() => SortOrderSchema).optional(),
  responsible_type: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  photo: z.lazy(() => SortOrderSchema).optional(),
  metadata: z.lazy(() => SortOrderSchema).optional(),
  user_created: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  ethnicity: z.lazy(() => SortOrderSchema).optional(),
  deficiency: z.lazy(() => SortOrderSchema).optional(),
  deficiency_description: z.lazy(() => SortOrderSchema).optional(),
  city_state: z.lazy(() => SortOrderSchema).optional(),
  period: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const studentMaxOrderByAggregateInputSchema: z.ZodType<Prisma.studentMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  birthdate: z.lazy(() => SortOrderSchema).optional(),
  gender: z.lazy(() => SortOrderSchema).optional(),
  place_of_birth: z.lazy(() => SortOrderSchema).optional(),
  postalcode: z.lazy(() => SortOrderSchema).optional(),
  residence_zone: z.lazy(() => SortOrderSchema).optional(),
  number_address: z.lazy(() => SortOrderSchema).optional(),
  cpf: z.lazy(() => SortOrderSchema).optional(),
  neighborhood: z.lazy(() => SortOrderSchema).optional(),
  city: z.lazy(() => SortOrderSchema).optional(),
  complement: z.lazy(() => SortOrderSchema).optional(),
  father_name: z.lazy(() => SortOrderSchema).optional(),
  father_email: z.lazy(() => SortOrderSchema).optional(),
  father_cpf: z.lazy(() => SortOrderSchema).optional(),
  father_phone: z.lazy(() => SortOrderSchema).optional(),
  mother_name: z.lazy(() => SortOrderSchema).optional(),
  mother_email: z.lazy(() => SortOrderSchema).optional(),
  mother_cpf: z.lazy(() => SortOrderSchema).optional(),
  mother_phone: z.lazy(() => SortOrderSchema).optional(),
  rg_number: z.lazy(() => SortOrderSchema).optional(),
  rg_state: z.lazy(() => SortOrderSchema).optional(),
  rg_issue_date: z.lazy(() => SortOrderSchema).optional(),
  rg_issuer: z.lazy(() => SortOrderSchema).optional(),
  birth_certificate: z.lazy(() => SortOrderSchema).optional(),
  docs_type: z.lazy(() => SortOrderSchema).optional(),
  responsible_type: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  photo: z.lazy(() => SortOrderSchema).optional(),
  user_created: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  ethnicity: z.lazy(() => SortOrderSchema).optional(),
  deficiency: z.lazy(() => SortOrderSchema).optional(),
  deficiency_description: z.lazy(() => SortOrderSchema).optional(),
  city_state: z.lazy(() => SortOrderSchema).optional(),
  period: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const studentMinOrderByAggregateInputSchema: z.ZodType<Prisma.studentMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  birthdate: z.lazy(() => SortOrderSchema).optional(),
  gender: z.lazy(() => SortOrderSchema).optional(),
  place_of_birth: z.lazy(() => SortOrderSchema).optional(),
  postalcode: z.lazy(() => SortOrderSchema).optional(),
  residence_zone: z.lazy(() => SortOrderSchema).optional(),
  number_address: z.lazy(() => SortOrderSchema).optional(),
  cpf: z.lazy(() => SortOrderSchema).optional(),
  neighborhood: z.lazy(() => SortOrderSchema).optional(),
  city: z.lazy(() => SortOrderSchema).optional(),
  complement: z.lazy(() => SortOrderSchema).optional(),
  father_name: z.lazy(() => SortOrderSchema).optional(),
  father_email: z.lazy(() => SortOrderSchema).optional(),
  father_cpf: z.lazy(() => SortOrderSchema).optional(),
  father_phone: z.lazy(() => SortOrderSchema).optional(),
  mother_name: z.lazy(() => SortOrderSchema).optional(),
  mother_email: z.lazy(() => SortOrderSchema).optional(),
  mother_cpf: z.lazy(() => SortOrderSchema).optional(),
  mother_phone: z.lazy(() => SortOrderSchema).optional(),
  rg_number: z.lazy(() => SortOrderSchema).optional(),
  rg_state: z.lazy(() => SortOrderSchema).optional(),
  rg_issue_date: z.lazy(() => SortOrderSchema).optional(),
  rg_issuer: z.lazy(() => SortOrderSchema).optional(),
  birth_certificate: z.lazy(() => SortOrderSchema).optional(),
  docs_type: z.lazy(() => SortOrderSchema).optional(),
  responsible_type: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  photo: z.lazy(() => SortOrderSchema).optional(),
  user_created: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  deleted_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  ethnicity: z.lazy(() => SortOrderSchema).optional(),
  deficiency: z.lazy(() => SortOrderSchema).optional(),
  deficiency_description: z.lazy(() => SortOrderSchema).optional(),
  city_state: z.lazy(() => SortOrderSchema).optional(),
  period: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Enumgender_typeWithAggregatesFilterSchema: z.ZodType<Prisma.Enumgender_typeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => gender_typeSchema).optional(),
  in: z.lazy(() => gender_typeSchema).array().optional(),
  notIn: z.lazy(() => gender_typeSchema).array().optional(),
  not: z.union([ z.lazy(() => gender_typeSchema),z.lazy(() => NestedEnumgender_typeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumgender_typeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumgender_typeFilterSchema).optional()
}).strict();

export const Enumresidence_zone_typeWithAggregatesFilterSchema: z.ZodType<Prisma.Enumresidence_zone_typeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => residence_zone_typeSchema).optional(),
  in: z.lazy(() => residence_zone_typeSchema).array().optional(),
  notIn: z.lazy(() => residence_zone_typeSchema).array().optional(),
  not: z.union([ z.lazy(() => residence_zone_typeSchema),z.lazy(() => NestedEnumresidence_zone_typeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumresidence_zone_typeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumresidence_zone_typeFilterSchema).optional()
}).strict();

export const EnumresponsibletypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumresponsibletypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => responsibletypeSchema).optional(),
  in: z.lazy(() => responsibletypeSchema).array().optional(),
  notIn: z.lazy(() => responsibletypeSchema).array().optional(),
  not: z.union([ z.lazy(() => responsibletypeSchema),z.lazy(() => NestedEnumresponsibletypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumresponsibletypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumresponsibletypeFilterSchema).optional()
}).strict();

export const BytesNullableWithAggregatesFilterSchema: z.ZodType<Prisma.BytesNullableWithAggregatesFilter> = z.object({
  equals: z.instanceof(Buffer).optional().nullable(),
  in: z.instanceof(Buffer).array().optional().nullable(),
  notIn: z.instanceof(Buffer).array().optional().nullable(),
  not: z.union([ z.instanceof(Buffer),z.lazy(() => NestedBytesNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedBytesNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedBytesNullableFilterSchema).optional()
}).strict();

export const Enumethnicity_typeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.Enumethnicity_typeNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ethnicity_typeSchema).optional().nullable(),
  in: z.lazy(() => ethnicity_typeSchema).array().optional().nullable(),
  notIn: z.lazy(() => ethnicity_typeSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => ethnicity_typeSchema),z.lazy(() => NestedEnumethnicity_typeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumethnicity_typeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumethnicity_typeNullableFilterSchema).optional()
}).strict();

export const Enumdeficiency_typeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.Enumdeficiency_typeNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => deficiency_typeSchema).optional().nullable(),
  in: z.lazy(() => deficiency_typeSchema).array().optional().nullable(),
  notIn: z.lazy(() => deficiency_typeSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => deficiency_typeSchema),z.lazy(() => NestedEnumdeficiency_typeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumdeficiency_typeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumdeficiency_typeNullableFilterSchema).optional()
}).strict();

export const EnumperiodNullableWithAggregatesFilterSchema: z.ZodType<Prisma.EnumperiodNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => periodSchema).optional().nullable(),
  in: z.lazy(() => periodSchema).array().optional().nullable(),
  notIn: z.lazy(() => periodSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => periodSchema),z.lazy(() => NestedEnumperiodNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumperiodNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumperiodNullableFilterSchema).optional()
}).strict();

export const holidaysOrderByRelevanceInputSchema: z.ZodType<Prisma.holidaysOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => holidaysOrderByRelevanceFieldEnumSchema),z.lazy(() => holidaysOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const holidaysCountOrderByAggregateInputSchema: z.ZodType<Prisma.holidaysCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  holiday_date: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  weekday: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const holidaysMaxOrderByAggregateInputSchema: z.ZodType<Prisma.holidaysMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  holiday_date: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  weekday: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const holidaysMinOrderByAggregateInputSchema: z.ZodType<Prisma.holidaysMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  holiday_date: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  weekday: z.lazy(() => SortOrderSchema).optional()
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
  deleted_at: z.lazy(() => SortOrderSchema).optional(),
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
  deleted_at: z.lazy(() => SortOrderSchema).optional(),
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
  deleted_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const institutionSumOrderByAggregateInputSchema: z.ZodType<Prisma.institutionSumOrderByAggregateInput> = z.object({
  singleton: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FloatNullableFilterSchema: z.ZodType<Prisma.FloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const institution_settingsOrderByRelevanceInputSchema: z.ZodType<Prisma.institution_settingsOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => institution_settingsOrderByRelevanceFieldEnumSchema),z.lazy(() => institution_settingsOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const institution_settingsCountOrderByAggregateInputSchema: z.ZodType<Prisma.institution_settingsCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  institution_id: z.lazy(() => SortOrderSchema).optional(),
  date_opening: z.lazy(() => SortOrderSchema).optional(),
  date_closing: z.lazy(() => SortOrderSchema).optional(),
  school_days: z.lazy(() => SortOrderSchema).optional(),
  date_start: z.lazy(() => SortOrderSchema).optional(),
  date_end: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const institution_settingsAvgOrderByAggregateInputSchema: z.ZodType<Prisma.institution_settingsAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  school_days: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const institution_settingsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.institution_settingsMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  institution_id: z.lazy(() => SortOrderSchema).optional(),
  date_opening: z.lazy(() => SortOrderSchema).optional(),
  date_closing: z.lazy(() => SortOrderSchema).optional(),
  school_days: z.lazy(() => SortOrderSchema).optional(),
  date_start: z.lazy(() => SortOrderSchema).optional(),
  date_end: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const institution_settingsMinOrderByAggregateInputSchema: z.ZodType<Prisma.institution_settingsMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  institution_id: z.lazy(() => SortOrderSchema).optional(),
  date_opening: z.lazy(() => SortOrderSchema).optional(),
  date_closing: z.lazy(() => SortOrderSchema).optional(),
  school_days: z.lazy(() => SortOrderSchema).optional(),
  date_start: z.lazy(() => SortOrderSchema).optional(),
  date_end: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const institution_settingsSumOrderByAggregateInputSchema: z.ZodType<Prisma.institution_settingsSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  school_days: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FloatNullableWithAggregatesFilterSchema: z.ZodType<Prisma.FloatNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatNullableFilterSchema).optional()
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

export const Enumday_of_weekFieldUpdateOperationsInputSchema: z.ZodType<Prisma.Enumday_of_weekFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => day_of_weekSchema).optional()
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

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const Enumattendance_statusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.Enumattendance_statusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => attendance_statusSchema).optional()
}).strict();

export const NullableEnumday_of_weekFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableEnumday_of_weekFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => day_of_weekSchema).optional().nullable()
}).strict();

export const EnumperiodFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumperiodFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => periodSchema).optional()
}).strict();

export const EnumstatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumstatusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => statusSchema).optional()
}).strict();

export const NullableEnumteaching_typeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableEnumteaching_typeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => teaching_typeSchema).optional().nullable()
}).strict();

export const NullableEnumregime_typeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableEnumregime_typeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => regime_typeSchema).optional().nullable()
}).strict();

export const NullableEnumcourse_modalityFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableEnumcourse_modalityFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => course_modalitySchema).optional().nullable()
}).strict();

export const BigIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BigIntFieldUpdateOperationsInput> = z.object({
  set: z.bigint().optional(),
  increment: z.bigint().optional(),
  decrement: z.bigint().optional(),
  multiply: z.bigint().optional(),
  divide: z.bigint().optional()
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const NullableEnumsituation_typeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableEnumsituation_typeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => situation_typeSchema).optional().nullable()
}).strict();

export const FloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.FloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const Enumgender_typeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.Enumgender_typeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => gender_typeSchema).optional()
}).strict();

export const Enumresidence_zone_typeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.Enumresidence_zone_typeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => residence_zone_typeSchema).optional()
}).strict();

export const EnumresponsibletypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumresponsibletypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => responsibletypeSchema).optional()
}).strict();

export const NullableBytesFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableBytesFieldUpdateOperationsInput> = z.object({
  set: z.instanceof(Buffer).optional().nullable()
}).strict();

export const NullableEnumethnicity_typeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableEnumethnicity_typeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => ethnicity_typeSchema).optional().nullable()
}).strict();

export const NullableEnumdeficiency_typeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableEnumdeficiency_typeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => deficiency_typeSchema).optional().nullable()
}).strict();

export const NullableEnumperiodFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableEnumperiodFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => periodSchema).optional().nullable()
}).strict();

export const NullableFloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableFloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
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

export const NestedEnumday_of_weekFilterSchema: z.ZodType<Prisma.NestedEnumday_of_weekFilter> = z.object({
  equals: z.lazy(() => day_of_weekSchema).optional(),
  in: z.lazy(() => day_of_weekSchema).array().optional(),
  notIn: z.lazy(() => day_of_weekSchema).array().optional(),
  not: z.union([ z.lazy(() => day_of_weekSchema),z.lazy(() => NestedEnumday_of_weekFilterSchema) ]).optional(),
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

export const NestedEnumday_of_weekWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumday_of_weekWithAggregatesFilter> = z.object({
  equals: z.lazy(() => day_of_weekSchema).optional(),
  in: z.lazy(() => day_of_weekSchema).array().optional(),
  notIn: z.lazy(() => day_of_weekSchema).array().optional(),
  not: z.union([ z.lazy(() => day_of_weekSchema),z.lazy(() => NestedEnumday_of_weekWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumday_of_weekFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumday_of_weekFilterSchema).optional()
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

export const NestedJsonFilterSchema: z.ZodType<Prisma.NestedJsonFilter> = z.object({
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

export const NestedEnumattendance_statusFilterSchema: z.ZodType<Prisma.NestedEnumattendance_statusFilter> = z.object({
  equals: z.lazy(() => attendance_statusSchema).optional(),
  in: z.lazy(() => attendance_statusSchema).array().optional(),
  notIn: z.lazy(() => attendance_statusSchema).array().optional(),
  not: z.union([ z.lazy(() => attendance_statusSchema),z.lazy(() => NestedEnumattendance_statusFilterSchema) ]).optional(),
}).strict();

export const NestedEnumattendance_statusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumattendance_statusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => attendance_statusSchema).optional(),
  in: z.lazy(() => attendance_statusSchema).array().optional(),
  notIn: z.lazy(() => attendance_statusSchema).array().optional(),
  not: z.union([ z.lazy(() => attendance_statusSchema),z.lazy(() => NestedEnumattendance_statusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumattendance_statusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumattendance_statusFilterSchema).optional()
}).strict();

export const NestedEnumday_of_weekNullableFilterSchema: z.ZodType<Prisma.NestedEnumday_of_weekNullableFilter> = z.object({
  equals: z.lazy(() => day_of_weekSchema).optional().nullable(),
  in: z.lazy(() => day_of_weekSchema).array().optional().nullable(),
  notIn: z.lazy(() => day_of_weekSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => day_of_weekSchema),z.lazy(() => NestedEnumday_of_weekNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumperiodFilterSchema: z.ZodType<Prisma.NestedEnumperiodFilter> = z.object({
  equals: z.lazy(() => periodSchema).optional(),
  in: z.lazy(() => periodSchema).array().optional(),
  notIn: z.lazy(() => periodSchema).array().optional(),
  not: z.union([ z.lazy(() => periodSchema),z.lazy(() => NestedEnumperiodFilterSchema) ]).optional(),
}).strict();

export const NestedEnumstatusFilterSchema: z.ZodType<Prisma.NestedEnumstatusFilter> = z.object({
  equals: z.lazy(() => statusSchema).optional(),
  in: z.lazy(() => statusSchema).array().optional(),
  notIn: z.lazy(() => statusSchema).array().optional(),
  not: z.union([ z.lazy(() => statusSchema),z.lazy(() => NestedEnumstatusFilterSchema) ]).optional(),
}).strict();

export const NestedEnumday_of_weekNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumday_of_weekNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => day_of_weekSchema).optional().nullable(),
  in: z.lazy(() => day_of_weekSchema).array().optional().nullable(),
  notIn: z.lazy(() => day_of_weekSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => day_of_weekSchema),z.lazy(() => NestedEnumday_of_weekNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumday_of_weekNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumday_of_weekNullableFilterSchema).optional()
}).strict();

export const NestedEnumperiodWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumperiodWithAggregatesFilter> = z.object({
  equals: z.lazy(() => periodSchema).optional(),
  in: z.lazy(() => periodSchema).array().optional(),
  notIn: z.lazy(() => periodSchema).array().optional(),
  not: z.union([ z.lazy(() => periodSchema),z.lazy(() => NestedEnumperiodWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumperiodFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumperiodFilterSchema).optional()
}).strict();

export const NestedEnumstatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumstatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => statusSchema).optional(),
  in: z.lazy(() => statusSchema).array().optional(),
  notIn: z.lazy(() => statusSchema).array().optional(),
  not: z.union([ z.lazy(() => statusSchema),z.lazy(() => NestedEnumstatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumstatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumstatusFilterSchema).optional()
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

export const NestedEnumteaching_typeNullableFilterSchema: z.ZodType<Prisma.NestedEnumteaching_typeNullableFilter> = z.object({
  equals: z.lazy(() => teaching_typeSchema).optional().nullable(),
  in: z.lazy(() => teaching_typeSchema).array().optional().nullable(),
  notIn: z.lazy(() => teaching_typeSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => teaching_typeSchema),z.lazy(() => NestedEnumteaching_typeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumregime_typeNullableFilterSchema: z.ZodType<Prisma.NestedEnumregime_typeNullableFilter> = z.object({
  equals: z.lazy(() => regime_typeSchema).optional().nullable(),
  in: z.lazy(() => regime_typeSchema).array().optional().nullable(),
  notIn: z.lazy(() => regime_typeSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => regime_typeSchema),z.lazy(() => NestedEnumregime_typeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumcourse_modalityNullableFilterSchema: z.ZodType<Prisma.NestedEnumcourse_modalityNullableFilter> = z.object({
  equals: z.lazy(() => course_modalitySchema).optional().nullable(),
  in: z.lazy(() => course_modalitySchema).array().optional().nullable(),
  notIn: z.lazy(() => course_modalitySchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => course_modalitySchema),z.lazy(() => NestedEnumcourse_modalityNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumteaching_typeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumteaching_typeNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => teaching_typeSchema).optional().nullable(),
  in: z.lazy(() => teaching_typeSchema).array().optional().nullable(),
  notIn: z.lazy(() => teaching_typeSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => teaching_typeSchema),z.lazy(() => NestedEnumteaching_typeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumteaching_typeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumteaching_typeNullableFilterSchema).optional()
}).strict();

export const NestedEnumregime_typeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumregime_typeNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => regime_typeSchema).optional().nullable(),
  in: z.lazy(() => regime_typeSchema).array().optional().nullable(),
  notIn: z.lazy(() => regime_typeSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => regime_typeSchema),z.lazy(() => NestedEnumregime_typeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumregime_typeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumregime_typeNullableFilterSchema).optional()
}).strict();

export const NestedEnumcourse_modalityNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumcourse_modalityNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => course_modalitySchema).optional().nullable(),
  in: z.lazy(() => course_modalitySchema).array().optional().nullable(),
  notIn: z.lazy(() => course_modalitySchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => course_modalitySchema),z.lazy(() => NestedEnumcourse_modalityNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumcourse_modalityNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumcourse_modalityNullableFilterSchema).optional()
}).strict();

export const NestedBigIntFilterSchema: z.ZodType<Prisma.NestedBigIntFilter> = z.object({
  equals: z.bigint().optional(),
  in: z.bigint().array().optional(),
  notIn: z.bigint().array().optional(),
  lt: z.bigint().optional(),
  lte: z.bigint().optional(),
  gt: z.bigint().optional(),
  gte: z.bigint().optional(),
  not: z.union([ z.bigint(),z.lazy(() => NestedBigIntFilterSchema) ]).optional(),
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedBigIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBigIntWithAggregatesFilter> = z.object({
  equals: z.bigint().optional(),
  in: z.bigint().array().optional(),
  notIn: z.bigint().array().optional(),
  lt: z.bigint().optional(),
  lte: z.bigint().optional(),
  gt: z.bigint().optional(),
  gte: z.bigint().optional(),
  not: z.union([ z.bigint(),z.lazy(() => NestedBigIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedBigIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBigIntFilterSchema).optional(),
  _max: z.lazy(() => NestedBigIntFilterSchema).optional()
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const NestedEnumsituation_typeNullableFilterSchema: z.ZodType<Prisma.NestedEnumsituation_typeNullableFilter> = z.object({
  equals: z.lazy(() => situation_typeSchema).optional().nullable(),
  in: z.lazy(() => situation_typeSchema).array().optional().nullable(),
  notIn: z.lazy(() => situation_typeSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => situation_typeSchema),z.lazy(() => NestedEnumsituation_typeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumsituation_typeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumsituation_typeNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => situation_typeSchema).optional().nullable(),
  in: z.lazy(() => situation_typeSchema).array().optional().nullable(),
  notIn: z.lazy(() => situation_typeSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => situation_typeSchema),z.lazy(() => NestedEnumsituation_typeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumsituation_typeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumsituation_typeNullableFilterSchema).optional()
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

export const NestedEnumgender_typeFilterSchema: z.ZodType<Prisma.NestedEnumgender_typeFilter> = z.object({
  equals: z.lazy(() => gender_typeSchema).optional(),
  in: z.lazy(() => gender_typeSchema).array().optional(),
  notIn: z.lazy(() => gender_typeSchema).array().optional(),
  not: z.union([ z.lazy(() => gender_typeSchema),z.lazy(() => NestedEnumgender_typeFilterSchema) ]).optional(),
}).strict();

export const NestedEnumresidence_zone_typeFilterSchema: z.ZodType<Prisma.NestedEnumresidence_zone_typeFilter> = z.object({
  equals: z.lazy(() => residence_zone_typeSchema).optional(),
  in: z.lazy(() => residence_zone_typeSchema).array().optional(),
  notIn: z.lazy(() => residence_zone_typeSchema).array().optional(),
  not: z.union([ z.lazy(() => residence_zone_typeSchema),z.lazy(() => NestedEnumresidence_zone_typeFilterSchema) ]).optional(),
}).strict();

export const NestedEnumresponsibletypeFilterSchema: z.ZodType<Prisma.NestedEnumresponsibletypeFilter> = z.object({
  equals: z.lazy(() => responsibletypeSchema).optional(),
  in: z.lazy(() => responsibletypeSchema).array().optional(),
  notIn: z.lazy(() => responsibletypeSchema).array().optional(),
  not: z.union([ z.lazy(() => responsibletypeSchema),z.lazy(() => NestedEnumresponsibletypeFilterSchema) ]).optional(),
}).strict();

export const NestedBytesNullableFilterSchema: z.ZodType<Prisma.NestedBytesNullableFilter> = z.object({
  equals: z.instanceof(Buffer).optional().nullable(),
  in: z.instanceof(Buffer).array().optional().nullable(),
  notIn: z.instanceof(Buffer).array().optional().nullable(),
  not: z.union([ z.instanceof(Buffer),z.lazy(() => NestedBytesNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumethnicity_typeNullableFilterSchema: z.ZodType<Prisma.NestedEnumethnicity_typeNullableFilter> = z.object({
  equals: z.lazy(() => ethnicity_typeSchema).optional().nullable(),
  in: z.lazy(() => ethnicity_typeSchema).array().optional().nullable(),
  notIn: z.lazy(() => ethnicity_typeSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => ethnicity_typeSchema),z.lazy(() => NestedEnumethnicity_typeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumdeficiency_typeNullableFilterSchema: z.ZodType<Prisma.NestedEnumdeficiency_typeNullableFilter> = z.object({
  equals: z.lazy(() => deficiency_typeSchema).optional().nullable(),
  in: z.lazy(() => deficiency_typeSchema).array().optional().nullable(),
  notIn: z.lazy(() => deficiency_typeSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => deficiency_typeSchema),z.lazy(() => NestedEnumdeficiency_typeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumperiodNullableFilterSchema: z.ZodType<Prisma.NestedEnumperiodNullableFilter> = z.object({
  equals: z.lazy(() => periodSchema).optional().nullable(),
  in: z.lazy(() => periodSchema).array().optional().nullable(),
  notIn: z.lazy(() => periodSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => periodSchema),z.lazy(() => NestedEnumperiodNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumgender_typeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumgender_typeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => gender_typeSchema).optional(),
  in: z.lazy(() => gender_typeSchema).array().optional(),
  notIn: z.lazy(() => gender_typeSchema).array().optional(),
  not: z.union([ z.lazy(() => gender_typeSchema),z.lazy(() => NestedEnumgender_typeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumgender_typeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumgender_typeFilterSchema).optional()
}).strict();

export const NestedEnumresidence_zone_typeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumresidence_zone_typeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => residence_zone_typeSchema).optional(),
  in: z.lazy(() => residence_zone_typeSchema).array().optional(),
  notIn: z.lazy(() => residence_zone_typeSchema).array().optional(),
  not: z.union([ z.lazy(() => residence_zone_typeSchema),z.lazy(() => NestedEnumresidence_zone_typeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumresidence_zone_typeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumresidence_zone_typeFilterSchema).optional()
}).strict();

export const NestedEnumresponsibletypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumresponsibletypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => responsibletypeSchema).optional(),
  in: z.lazy(() => responsibletypeSchema).array().optional(),
  notIn: z.lazy(() => responsibletypeSchema).array().optional(),
  not: z.union([ z.lazy(() => responsibletypeSchema),z.lazy(() => NestedEnumresponsibletypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumresponsibletypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumresponsibletypeFilterSchema).optional()
}).strict();

export const NestedBytesNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBytesNullableWithAggregatesFilter> = z.object({
  equals: z.instanceof(Buffer).optional().nullable(),
  in: z.instanceof(Buffer).array().optional().nullable(),
  notIn: z.instanceof(Buffer).array().optional().nullable(),
  not: z.union([ z.instanceof(Buffer),z.lazy(() => NestedBytesNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedBytesNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedBytesNullableFilterSchema).optional()
}).strict();

export const NestedEnumethnicity_typeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumethnicity_typeNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ethnicity_typeSchema).optional().nullable(),
  in: z.lazy(() => ethnicity_typeSchema).array().optional().nullable(),
  notIn: z.lazy(() => ethnicity_typeSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => ethnicity_typeSchema),z.lazy(() => NestedEnumethnicity_typeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumethnicity_typeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumethnicity_typeNullableFilterSchema).optional()
}).strict();

export const NestedEnumdeficiency_typeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumdeficiency_typeNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => deficiency_typeSchema).optional().nullable(),
  in: z.lazy(() => deficiency_typeSchema).array().optional().nullable(),
  notIn: z.lazy(() => deficiency_typeSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => deficiency_typeSchema),z.lazy(() => NestedEnumdeficiency_typeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumdeficiency_typeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumdeficiency_typeNullableFilterSchema).optional()
}).strict();

export const NestedEnumperiodNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumperiodNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => periodSchema).optional().nullable(),
  in: z.lazy(() => periodSchema).array().optional().nullable(),
  notIn: z.lazy(() => periodSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => periodSchema),z.lazy(() => NestedEnumperiodNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumperiodNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumperiodNullableFilterSchema).optional()
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

export const NestedFloatNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatNullableFilterSchema).optional()
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

export const class_sessionFindFirstArgsSchema: z.ZodType<Prisma.class_sessionFindFirstArgs> = z.object({
  select: class_sessionSelectSchema.optional(),
  where: class_sessionWhereInputSchema.optional(),
  orderBy: z.union([ class_sessionOrderByWithRelationInputSchema.array(),class_sessionOrderByWithRelationInputSchema ]).optional(),
  cursor: class_sessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Class_sessionScalarFieldEnumSchema,Class_sessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const class_sessionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.class_sessionFindFirstOrThrowArgs> = z.object({
  select: class_sessionSelectSchema.optional(),
  where: class_sessionWhereInputSchema.optional(),
  orderBy: z.union([ class_sessionOrderByWithRelationInputSchema.array(),class_sessionOrderByWithRelationInputSchema ]).optional(),
  cursor: class_sessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Class_sessionScalarFieldEnumSchema,Class_sessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const class_sessionFindManyArgsSchema: z.ZodType<Prisma.class_sessionFindManyArgs> = z.object({
  select: class_sessionSelectSchema.optional(),
  where: class_sessionWhereInputSchema.optional(),
  orderBy: z.union([ class_sessionOrderByWithRelationInputSchema.array(),class_sessionOrderByWithRelationInputSchema ]).optional(),
  cursor: class_sessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Class_sessionScalarFieldEnumSchema,Class_sessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const class_sessionAggregateArgsSchema: z.ZodType<Prisma.class_sessionAggregateArgs> = z.object({
  where: class_sessionWhereInputSchema.optional(),
  orderBy: z.union([ class_sessionOrderByWithRelationInputSchema.array(),class_sessionOrderByWithRelationInputSchema ]).optional(),
  cursor: class_sessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const class_sessionGroupByArgsSchema: z.ZodType<Prisma.class_sessionGroupByArgs> = z.object({
  where: class_sessionWhereInputSchema.optional(),
  orderBy: z.union([ class_sessionOrderByWithAggregationInputSchema.array(),class_sessionOrderByWithAggregationInputSchema ]).optional(),
  by: Class_sessionScalarFieldEnumSchema.array(),
  having: class_sessionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const class_sessionFindUniqueArgsSchema: z.ZodType<Prisma.class_sessionFindUniqueArgs> = z.object({
  select: class_sessionSelectSchema.optional(),
  where: class_sessionWhereUniqueInputSchema,
}).strict() ;

export const class_sessionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.class_sessionFindUniqueOrThrowArgs> = z.object({
  select: class_sessionSelectSchema.optional(),
  where: class_sessionWhereUniqueInputSchema,
}).strict() ;

export const teachertotimetableFindFirstArgsSchema: z.ZodType<Prisma.teachertotimetableFindFirstArgs> = z.object({
  select: teachertotimetableSelectSchema.optional(),
  where: teachertotimetableWhereInputSchema.optional(),
  orderBy: z.union([ teachertotimetableOrderByWithRelationInputSchema.array(),teachertotimetableOrderByWithRelationInputSchema ]).optional(),
  cursor: teachertotimetableWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TeachertotimetableScalarFieldEnumSchema,TeachertotimetableScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const teachertotimetableFindFirstOrThrowArgsSchema: z.ZodType<Prisma.teachertotimetableFindFirstOrThrowArgs> = z.object({
  select: teachertotimetableSelectSchema.optional(),
  where: teachertotimetableWhereInputSchema.optional(),
  orderBy: z.union([ teachertotimetableOrderByWithRelationInputSchema.array(),teachertotimetableOrderByWithRelationInputSchema ]).optional(),
  cursor: teachertotimetableWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TeachertotimetableScalarFieldEnumSchema,TeachertotimetableScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const teachertotimetableFindManyArgsSchema: z.ZodType<Prisma.teachertotimetableFindManyArgs> = z.object({
  select: teachertotimetableSelectSchema.optional(),
  where: teachertotimetableWhereInputSchema.optional(),
  orderBy: z.union([ teachertotimetableOrderByWithRelationInputSchema.array(),teachertotimetableOrderByWithRelationInputSchema ]).optional(),
  cursor: teachertotimetableWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TeachertotimetableScalarFieldEnumSchema,TeachertotimetableScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const teachertotimetableAggregateArgsSchema: z.ZodType<Prisma.teachertotimetableAggregateArgs> = z.object({
  where: teachertotimetableWhereInputSchema.optional(),
  orderBy: z.union([ teachertotimetableOrderByWithRelationInputSchema.array(),teachertotimetableOrderByWithRelationInputSchema ]).optional(),
  cursor: teachertotimetableWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const teachertotimetableGroupByArgsSchema: z.ZodType<Prisma.teachertotimetableGroupByArgs> = z.object({
  where: teachertotimetableWhereInputSchema.optional(),
  orderBy: z.union([ teachertotimetableOrderByWithAggregationInputSchema.array(),teachertotimetableOrderByWithAggregationInputSchema ]).optional(),
  by: TeachertotimetableScalarFieldEnumSchema.array(),
  having: teachertotimetableScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const teachertotimetableFindUniqueArgsSchema: z.ZodType<Prisma.teachertotimetableFindUniqueArgs> = z.object({
  select: teachertotimetableSelectSchema.optional(),
  where: teachertotimetableWhereUniqueInputSchema,
}).strict() ;

export const teachertotimetableFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.teachertotimetableFindUniqueOrThrowArgs> = z.object({
  select: teachertotimetableSelectSchema.optional(),
  where: teachertotimetableWhereUniqueInputSchema,
}).strict() ;

export const academic_yearFindFirstArgsSchema: z.ZodType<Prisma.academic_yearFindFirstArgs> = z.object({
  select: academic_yearSelectSchema.optional(),
  where: academic_yearWhereInputSchema.optional(),
  orderBy: z.union([ academic_yearOrderByWithRelationInputSchema.array(),academic_yearOrderByWithRelationInputSchema ]).optional(),
  cursor: academic_yearWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Academic_yearScalarFieldEnumSchema,Academic_yearScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const academic_yearFindFirstOrThrowArgsSchema: z.ZodType<Prisma.academic_yearFindFirstOrThrowArgs> = z.object({
  select: academic_yearSelectSchema.optional(),
  where: academic_yearWhereInputSchema.optional(),
  orderBy: z.union([ academic_yearOrderByWithRelationInputSchema.array(),academic_yearOrderByWithRelationInputSchema ]).optional(),
  cursor: academic_yearWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Academic_yearScalarFieldEnumSchema,Academic_yearScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const academic_yearFindManyArgsSchema: z.ZodType<Prisma.academic_yearFindManyArgs> = z.object({
  select: academic_yearSelectSchema.optional(),
  where: academic_yearWhereInputSchema.optional(),
  orderBy: z.union([ academic_yearOrderByWithRelationInputSchema.array(),academic_yearOrderByWithRelationInputSchema ]).optional(),
  cursor: academic_yearWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Academic_yearScalarFieldEnumSchema,Academic_yearScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const academic_yearAggregateArgsSchema: z.ZodType<Prisma.academic_yearAggregateArgs> = z.object({
  where: academic_yearWhereInputSchema.optional(),
  orderBy: z.union([ academic_yearOrderByWithRelationInputSchema.array(),academic_yearOrderByWithRelationInputSchema ]).optional(),
  cursor: academic_yearWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const academic_yearGroupByArgsSchema: z.ZodType<Prisma.academic_yearGroupByArgs> = z.object({
  where: academic_yearWhereInputSchema.optional(),
  orderBy: z.union([ academic_yearOrderByWithAggregationInputSchema.array(),academic_yearOrderByWithAggregationInputSchema ]).optional(),
  by: Academic_yearScalarFieldEnumSchema.array(),
  having: academic_yearScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const academic_yearFindUniqueArgsSchema: z.ZodType<Prisma.academic_yearFindUniqueArgs> = z.object({
  select: academic_yearSelectSchema.optional(),
  where: academic_yearWhereUniqueInputSchema,
}).strict() ;

export const academic_yearFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.academic_yearFindUniqueOrThrowArgs> = z.object({
  select: academic_yearSelectSchema.optional(),
  where: academic_yearWhereUniqueInputSchema,
}).strict() ;

export const academic_year_templateFindFirstArgsSchema: z.ZodType<Prisma.academic_year_templateFindFirstArgs> = z.object({
  select: academic_year_templateSelectSchema.optional(),
  where: academic_year_templateWhereInputSchema.optional(),
  orderBy: z.union([ academic_year_templateOrderByWithRelationInputSchema.array(),academic_year_templateOrderByWithRelationInputSchema ]).optional(),
  cursor: academic_year_templateWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Academic_year_templateScalarFieldEnumSchema,Academic_year_templateScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const academic_year_templateFindFirstOrThrowArgsSchema: z.ZodType<Prisma.academic_year_templateFindFirstOrThrowArgs> = z.object({
  select: academic_year_templateSelectSchema.optional(),
  where: academic_year_templateWhereInputSchema.optional(),
  orderBy: z.union([ academic_year_templateOrderByWithRelationInputSchema.array(),academic_year_templateOrderByWithRelationInputSchema ]).optional(),
  cursor: academic_year_templateWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Academic_year_templateScalarFieldEnumSchema,Academic_year_templateScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const academic_year_templateFindManyArgsSchema: z.ZodType<Prisma.academic_year_templateFindManyArgs> = z.object({
  select: academic_year_templateSelectSchema.optional(),
  where: academic_year_templateWhereInputSchema.optional(),
  orderBy: z.union([ academic_year_templateOrderByWithRelationInputSchema.array(),academic_year_templateOrderByWithRelationInputSchema ]).optional(),
  cursor: academic_year_templateWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Academic_year_templateScalarFieldEnumSchema,Academic_year_templateScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const academic_year_templateAggregateArgsSchema: z.ZodType<Prisma.academic_year_templateAggregateArgs> = z.object({
  where: academic_year_templateWhereInputSchema.optional(),
  orderBy: z.union([ academic_year_templateOrderByWithRelationInputSchema.array(),academic_year_templateOrderByWithRelationInputSchema ]).optional(),
  cursor: academic_year_templateWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const academic_year_templateGroupByArgsSchema: z.ZodType<Prisma.academic_year_templateGroupByArgs> = z.object({
  where: academic_year_templateWhereInputSchema.optional(),
  orderBy: z.union([ academic_year_templateOrderByWithAggregationInputSchema.array(),academic_year_templateOrderByWithAggregationInputSchema ]).optional(),
  by: Academic_year_templateScalarFieldEnumSchema.array(),
  having: academic_year_templateScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const academic_year_templateFindUniqueArgsSchema: z.ZodType<Prisma.academic_year_templateFindUniqueArgs> = z.object({
  select: academic_year_templateSelectSchema.optional(),
  where: academic_year_templateWhereUniqueInputSchema,
}).strict() ;

export const academic_year_templateFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.academic_year_templateFindUniqueOrThrowArgs> = z.object({
  select: academic_year_templateSelectSchema.optional(),
  where: academic_year_templateWhereUniqueInputSchema,
}).strict() ;

export const attendanceFindFirstArgsSchema: z.ZodType<Prisma.attendanceFindFirstArgs> = z.object({
  select: attendanceSelectSchema.optional(),
  where: attendanceWhereInputSchema.optional(),
  orderBy: z.union([ attendanceOrderByWithRelationInputSchema.array(),attendanceOrderByWithRelationInputSchema ]).optional(),
  cursor: attendanceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AttendanceScalarFieldEnumSchema,AttendanceScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const attendanceFindFirstOrThrowArgsSchema: z.ZodType<Prisma.attendanceFindFirstOrThrowArgs> = z.object({
  select: attendanceSelectSchema.optional(),
  where: attendanceWhereInputSchema.optional(),
  orderBy: z.union([ attendanceOrderByWithRelationInputSchema.array(),attendanceOrderByWithRelationInputSchema ]).optional(),
  cursor: attendanceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AttendanceScalarFieldEnumSchema,AttendanceScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const attendanceFindManyArgsSchema: z.ZodType<Prisma.attendanceFindManyArgs> = z.object({
  select: attendanceSelectSchema.optional(),
  where: attendanceWhereInputSchema.optional(),
  orderBy: z.union([ attendanceOrderByWithRelationInputSchema.array(),attendanceOrderByWithRelationInputSchema ]).optional(),
  cursor: attendanceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AttendanceScalarFieldEnumSchema,AttendanceScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const attendanceAggregateArgsSchema: z.ZodType<Prisma.attendanceAggregateArgs> = z.object({
  where: attendanceWhereInputSchema.optional(),
  orderBy: z.union([ attendanceOrderByWithRelationInputSchema.array(),attendanceOrderByWithRelationInputSchema ]).optional(),
  cursor: attendanceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const attendanceGroupByArgsSchema: z.ZodType<Prisma.attendanceGroupByArgs> = z.object({
  where: attendanceWhereInputSchema.optional(),
  orderBy: z.union([ attendanceOrderByWithAggregationInputSchema.array(),attendanceOrderByWithAggregationInputSchema ]).optional(),
  by: AttendanceScalarFieldEnumSchema.array(),
  having: attendanceScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const attendanceFindUniqueArgsSchema: z.ZodType<Prisma.attendanceFindUniqueArgs> = z.object({
  select: attendanceSelectSchema.optional(),
  where: attendanceWhereUniqueInputSchema,
}).strict() ;

export const attendanceFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.attendanceFindUniqueOrThrowArgs> = z.object({
  select: attendanceSelectSchema.optional(),
  where: attendanceWhereUniqueInputSchema,
}).strict() ;

export const classroomFindFirstArgsSchema: z.ZodType<Prisma.classroomFindFirstArgs> = z.object({
  select: classroomSelectSchema.optional(),
  where: classroomWhereInputSchema.optional(),
  orderBy: z.union([ classroomOrderByWithRelationInputSchema.array(),classroomOrderByWithRelationInputSchema ]).optional(),
  cursor: classroomWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ClassroomScalarFieldEnumSchema,ClassroomScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const classroomFindFirstOrThrowArgsSchema: z.ZodType<Prisma.classroomFindFirstOrThrowArgs> = z.object({
  select: classroomSelectSchema.optional(),
  where: classroomWhereInputSchema.optional(),
  orderBy: z.union([ classroomOrderByWithRelationInputSchema.array(),classroomOrderByWithRelationInputSchema ]).optional(),
  cursor: classroomWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ClassroomScalarFieldEnumSchema,ClassroomScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const classroomFindManyArgsSchema: z.ZodType<Prisma.classroomFindManyArgs> = z.object({
  select: classroomSelectSchema.optional(),
  where: classroomWhereInputSchema.optional(),
  orderBy: z.union([ classroomOrderByWithRelationInputSchema.array(),classroomOrderByWithRelationInputSchema ]).optional(),
  cursor: classroomWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ClassroomScalarFieldEnumSchema,ClassroomScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const classroomAggregateArgsSchema: z.ZodType<Prisma.classroomAggregateArgs> = z.object({
  where: classroomWhereInputSchema.optional(),
  orderBy: z.union([ classroomOrderByWithRelationInputSchema.array(),classroomOrderByWithRelationInputSchema ]).optional(),
  cursor: classroomWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const classroomGroupByArgsSchema: z.ZodType<Prisma.classroomGroupByArgs> = z.object({
  where: classroomWhereInputSchema.optional(),
  orderBy: z.union([ classroomOrderByWithAggregationInputSchema.array(),classroomOrderByWithAggregationInputSchema ]).optional(),
  by: ClassroomScalarFieldEnumSchema.array(),
  having: classroomScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const classroomFindUniqueArgsSchema: z.ZodType<Prisma.classroomFindUniqueArgs> = z.object({
  select: classroomSelectSchema.optional(),
  where: classroomWhereUniqueInputSchema,
}).strict() ;

export const classroomFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.classroomFindUniqueOrThrowArgs> = z.object({
  select: classroomSelectSchema.optional(),
  where: classroomWhereUniqueInputSchema,
}).strict() ;

export const courseFindFirstArgsSchema: z.ZodType<Prisma.courseFindFirstArgs> = z.object({
  select: courseSelectSchema.optional(),
  where: courseWhereInputSchema.optional(),
  orderBy: z.union([ courseOrderByWithRelationInputSchema.array(),courseOrderByWithRelationInputSchema ]).optional(),
  cursor: courseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CourseScalarFieldEnumSchema,CourseScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const courseFindFirstOrThrowArgsSchema: z.ZodType<Prisma.courseFindFirstOrThrowArgs> = z.object({
  select: courseSelectSchema.optional(),
  where: courseWhereInputSchema.optional(),
  orderBy: z.union([ courseOrderByWithRelationInputSchema.array(),courseOrderByWithRelationInputSchema ]).optional(),
  cursor: courseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CourseScalarFieldEnumSchema,CourseScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const courseFindManyArgsSchema: z.ZodType<Prisma.courseFindManyArgs> = z.object({
  select: courseSelectSchema.optional(),
  where: courseWhereInputSchema.optional(),
  orderBy: z.union([ courseOrderByWithRelationInputSchema.array(),courseOrderByWithRelationInputSchema ]).optional(),
  cursor: courseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CourseScalarFieldEnumSchema,CourseScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const courseAggregateArgsSchema: z.ZodType<Prisma.courseAggregateArgs> = z.object({
  where: courseWhereInputSchema.optional(),
  orderBy: z.union([ courseOrderByWithRelationInputSchema.array(),courseOrderByWithRelationInputSchema ]).optional(),
  cursor: courseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const courseGroupByArgsSchema: z.ZodType<Prisma.courseGroupByArgs> = z.object({
  where: courseWhereInputSchema.optional(),
  orderBy: z.union([ courseOrderByWithAggregationInputSchema.array(),courseOrderByWithAggregationInputSchema ]).optional(),
  by: CourseScalarFieldEnumSchema.array(),
  having: courseScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const courseFindUniqueArgsSchema: z.ZodType<Prisma.courseFindUniqueArgs> = z.object({
  select: courseSelectSchema.optional(),
  where: courseWhereUniqueInputSchema,
}).strict() ;

export const courseFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.courseFindUniqueOrThrowArgs> = z.object({
  select: courseSelectSchema.optional(),
  where: courseWhereUniqueInputSchema,
}).strict() ;

export const documentFindFirstArgsSchema: z.ZodType<Prisma.documentFindFirstArgs> = z.object({
  select: documentSelectSchema.optional(),
  where: documentWhereInputSchema.optional(),
  orderBy: z.union([ documentOrderByWithRelationInputSchema.array(),documentOrderByWithRelationInputSchema ]).optional(),
  cursor: documentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DocumentScalarFieldEnumSchema,DocumentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const documentFindFirstOrThrowArgsSchema: z.ZodType<Prisma.documentFindFirstOrThrowArgs> = z.object({
  select: documentSelectSchema.optional(),
  where: documentWhereInputSchema.optional(),
  orderBy: z.union([ documentOrderByWithRelationInputSchema.array(),documentOrderByWithRelationInputSchema ]).optional(),
  cursor: documentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DocumentScalarFieldEnumSchema,DocumentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const documentFindManyArgsSchema: z.ZodType<Prisma.documentFindManyArgs> = z.object({
  select: documentSelectSchema.optional(),
  where: documentWhereInputSchema.optional(),
  orderBy: z.union([ documentOrderByWithRelationInputSchema.array(),documentOrderByWithRelationInputSchema ]).optional(),
  cursor: documentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DocumentScalarFieldEnumSchema,DocumentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const documentAggregateArgsSchema: z.ZodType<Prisma.documentAggregateArgs> = z.object({
  where: documentWhereInputSchema.optional(),
  orderBy: z.union([ documentOrderByWithRelationInputSchema.array(),documentOrderByWithRelationInputSchema ]).optional(),
  cursor: documentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const documentGroupByArgsSchema: z.ZodType<Prisma.documentGroupByArgs> = z.object({
  where: documentWhereInputSchema.optional(),
  orderBy: z.union([ documentOrderByWithAggregationInputSchema.array(),documentOrderByWithAggregationInputSchema ]).optional(),
  by: DocumentScalarFieldEnumSchema.array(),
  having: documentScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const documentFindUniqueArgsSchema: z.ZodType<Prisma.documentFindUniqueArgs> = z.object({
  select: documentSelectSchema.optional(),
  where: documentWhereUniqueInputSchema,
}).strict() ;

export const documentFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.documentFindUniqueOrThrowArgs> = z.object({
  select: documentSelectSchema.optional(),
  where: documentWhereUniqueInputSchema,
}).strict() ;

export const enrollmentFindFirstArgsSchema: z.ZodType<Prisma.enrollmentFindFirstArgs> = z.object({
  select: enrollmentSelectSchema.optional(),
  where: enrollmentWhereInputSchema.optional(),
  orderBy: z.union([ enrollmentOrderByWithRelationInputSchema.array(),enrollmentOrderByWithRelationInputSchema ]).optional(),
  cursor: enrollmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EnrollmentScalarFieldEnumSchema,EnrollmentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const enrollmentFindFirstOrThrowArgsSchema: z.ZodType<Prisma.enrollmentFindFirstOrThrowArgs> = z.object({
  select: enrollmentSelectSchema.optional(),
  where: enrollmentWhereInputSchema.optional(),
  orderBy: z.union([ enrollmentOrderByWithRelationInputSchema.array(),enrollmentOrderByWithRelationInputSchema ]).optional(),
  cursor: enrollmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EnrollmentScalarFieldEnumSchema,EnrollmentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const enrollmentFindManyArgsSchema: z.ZodType<Prisma.enrollmentFindManyArgs> = z.object({
  select: enrollmentSelectSchema.optional(),
  where: enrollmentWhereInputSchema.optional(),
  orderBy: z.union([ enrollmentOrderByWithRelationInputSchema.array(),enrollmentOrderByWithRelationInputSchema ]).optional(),
  cursor: enrollmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EnrollmentScalarFieldEnumSchema,EnrollmentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const enrollmentAggregateArgsSchema: z.ZodType<Prisma.enrollmentAggregateArgs> = z.object({
  where: enrollmentWhereInputSchema.optional(),
  orderBy: z.union([ enrollmentOrderByWithRelationInputSchema.array(),enrollmentOrderByWithRelationInputSchema ]).optional(),
  cursor: enrollmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const enrollmentGroupByArgsSchema: z.ZodType<Prisma.enrollmentGroupByArgs> = z.object({
  where: enrollmentWhereInputSchema.optional(),
  orderBy: z.union([ enrollmentOrderByWithAggregationInputSchema.array(),enrollmentOrderByWithAggregationInputSchema ]).optional(),
  by: EnrollmentScalarFieldEnumSchema.array(),
  having: enrollmentScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const enrollmentFindUniqueArgsSchema: z.ZodType<Prisma.enrollmentFindUniqueArgs> = z.object({
  select: enrollmentSelectSchema.optional(),
  where: enrollmentWhereUniqueInputSchema,
}).strict() ;

export const enrollmentFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.enrollmentFindUniqueOrThrowArgs> = z.object({
  select: enrollmentSelectSchema.optional(),
  where: enrollmentWhereUniqueInputSchema,
}).strict() ;

export const gradeFindFirstArgsSchema: z.ZodType<Prisma.gradeFindFirstArgs> = z.object({
  select: gradeSelectSchema.optional(),
  where: gradeWhereInputSchema.optional(),
  orderBy: z.union([ gradeOrderByWithRelationInputSchema.array(),gradeOrderByWithRelationInputSchema ]).optional(),
  cursor: gradeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ GradeScalarFieldEnumSchema,GradeScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const gradeFindFirstOrThrowArgsSchema: z.ZodType<Prisma.gradeFindFirstOrThrowArgs> = z.object({
  select: gradeSelectSchema.optional(),
  where: gradeWhereInputSchema.optional(),
  orderBy: z.union([ gradeOrderByWithRelationInputSchema.array(),gradeOrderByWithRelationInputSchema ]).optional(),
  cursor: gradeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ GradeScalarFieldEnumSchema,GradeScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const gradeFindManyArgsSchema: z.ZodType<Prisma.gradeFindManyArgs> = z.object({
  select: gradeSelectSchema.optional(),
  where: gradeWhereInputSchema.optional(),
  orderBy: z.union([ gradeOrderByWithRelationInputSchema.array(),gradeOrderByWithRelationInputSchema ]).optional(),
  cursor: gradeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ GradeScalarFieldEnumSchema,GradeScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const gradeAggregateArgsSchema: z.ZodType<Prisma.gradeAggregateArgs> = z.object({
  where: gradeWhereInputSchema.optional(),
  orderBy: z.union([ gradeOrderByWithRelationInputSchema.array(),gradeOrderByWithRelationInputSchema ]).optional(),
  cursor: gradeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const gradeGroupByArgsSchema: z.ZodType<Prisma.gradeGroupByArgs> = z.object({
  where: gradeWhereInputSchema.optional(),
  orderBy: z.union([ gradeOrderByWithAggregationInputSchema.array(),gradeOrderByWithAggregationInputSchema ]).optional(),
  by: GradeScalarFieldEnumSchema.array(),
  having: gradeScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const gradeFindUniqueArgsSchema: z.ZodType<Prisma.gradeFindUniqueArgs> = z.object({
  select: gradeSelectSchema.optional(),
  where: gradeWhereUniqueInputSchema,
}).strict() ;

export const gradeFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.gradeFindUniqueOrThrowArgs> = z.object({
  select: gradeSelectSchema.optional(),
  where: gradeWhereUniqueInputSchema,
}).strict() ;

export const studentFindFirstArgsSchema: z.ZodType<Prisma.studentFindFirstArgs> = z.object({
  select: studentSelectSchema.optional(),
  where: studentWhereInputSchema.optional(),
  orderBy: z.union([ studentOrderByWithRelationInputSchema.array(),studentOrderByWithRelationInputSchema ]).optional(),
  cursor: studentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StudentScalarFieldEnumSchema,StudentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const studentFindFirstOrThrowArgsSchema: z.ZodType<Prisma.studentFindFirstOrThrowArgs> = z.object({
  select: studentSelectSchema.optional(),
  where: studentWhereInputSchema.optional(),
  orderBy: z.union([ studentOrderByWithRelationInputSchema.array(),studentOrderByWithRelationInputSchema ]).optional(),
  cursor: studentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StudentScalarFieldEnumSchema,StudentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const studentFindManyArgsSchema: z.ZodType<Prisma.studentFindManyArgs> = z.object({
  select: studentSelectSchema.optional(),
  where: studentWhereInputSchema.optional(),
  orderBy: z.union([ studentOrderByWithRelationInputSchema.array(),studentOrderByWithRelationInputSchema ]).optional(),
  cursor: studentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StudentScalarFieldEnumSchema,StudentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const studentAggregateArgsSchema: z.ZodType<Prisma.studentAggregateArgs> = z.object({
  where: studentWhereInputSchema.optional(),
  orderBy: z.union([ studentOrderByWithRelationInputSchema.array(),studentOrderByWithRelationInputSchema ]).optional(),
  cursor: studentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const studentGroupByArgsSchema: z.ZodType<Prisma.studentGroupByArgs> = z.object({
  where: studentWhereInputSchema.optional(),
  orderBy: z.union([ studentOrderByWithAggregationInputSchema.array(),studentOrderByWithAggregationInputSchema ]).optional(),
  by: StudentScalarFieldEnumSchema.array(),
  having: studentScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const studentFindUniqueArgsSchema: z.ZodType<Prisma.studentFindUniqueArgs> = z.object({
  select: studentSelectSchema.optional(),
  where: studentWhereUniqueInputSchema,
}).strict() ;

export const studentFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.studentFindUniqueOrThrowArgs> = z.object({
  select: studentSelectSchema.optional(),
  where: studentWhereUniqueInputSchema,
}).strict() ;

export const holidaysFindFirstArgsSchema: z.ZodType<Prisma.holidaysFindFirstArgs> = z.object({
  select: holidaysSelectSchema.optional(),
  where: holidaysWhereInputSchema.optional(),
  orderBy: z.union([ holidaysOrderByWithRelationInputSchema.array(),holidaysOrderByWithRelationInputSchema ]).optional(),
  cursor: holidaysWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ HolidaysScalarFieldEnumSchema,HolidaysScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const holidaysFindFirstOrThrowArgsSchema: z.ZodType<Prisma.holidaysFindFirstOrThrowArgs> = z.object({
  select: holidaysSelectSchema.optional(),
  where: holidaysWhereInputSchema.optional(),
  orderBy: z.union([ holidaysOrderByWithRelationInputSchema.array(),holidaysOrderByWithRelationInputSchema ]).optional(),
  cursor: holidaysWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ HolidaysScalarFieldEnumSchema,HolidaysScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const holidaysFindManyArgsSchema: z.ZodType<Prisma.holidaysFindManyArgs> = z.object({
  select: holidaysSelectSchema.optional(),
  where: holidaysWhereInputSchema.optional(),
  orderBy: z.union([ holidaysOrderByWithRelationInputSchema.array(),holidaysOrderByWithRelationInputSchema ]).optional(),
  cursor: holidaysWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ HolidaysScalarFieldEnumSchema,HolidaysScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const holidaysAggregateArgsSchema: z.ZodType<Prisma.holidaysAggregateArgs> = z.object({
  where: holidaysWhereInputSchema.optional(),
  orderBy: z.union([ holidaysOrderByWithRelationInputSchema.array(),holidaysOrderByWithRelationInputSchema ]).optional(),
  cursor: holidaysWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const holidaysGroupByArgsSchema: z.ZodType<Prisma.holidaysGroupByArgs> = z.object({
  where: holidaysWhereInputSchema.optional(),
  orderBy: z.union([ holidaysOrderByWithAggregationInputSchema.array(),holidaysOrderByWithAggregationInputSchema ]).optional(),
  by: HolidaysScalarFieldEnumSchema.array(),
  having: holidaysScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const holidaysFindUniqueArgsSchema: z.ZodType<Prisma.holidaysFindUniqueArgs> = z.object({
  select: holidaysSelectSchema.optional(),
  where: holidaysWhereUniqueInputSchema,
}).strict() ;

export const holidaysFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.holidaysFindUniqueOrThrowArgs> = z.object({
  select: holidaysSelectSchema.optional(),
  where: holidaysWhereUniqueInputSchema,
}).strict() ;

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

export const institution_settingsFindFirstArgsSchema: z.ZodType<Prisma.institution_settingsFindFirstArgs> = z.object({
  select: institution_settingsSelectSchema.optional(),
  where: institution_settingsWhereInputSchema.optional(),
  orderBy: z.union([ institution_settingsOrderByWithRelationInputSchema.array(),institution_settingsOrderByWithRelationInputSchema ]).optional(),
  cursor: institution_settingsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Institution_settingsScalarFieldEnumSchema,Institution_settingsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const institution_settingsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.institution_settingsFindFirstOrThrowArgs> = z.object({
  select: institution_settingsSelectSchema.optional(),
  where: institution_settingsWhereInputSchema.optional(),
  orderBy: z.union([ institution_settingsOrderByWithRelationInputSchema.array(),institution_settingsOrderByWithRelationInputSchema ]).optional(),
  cursor: institution_settingsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Institution_settingsScalarFieldEnumSchema,Institution_settingsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const institution_settingsFindManyArgsSchema: z.ZodType<Prisma.institution_settingsFindManyArgs> = z.object({
  select: institution_settingsSelectSchema.optional(),
  where: institution_settingsWhereInputSchema.optional(),
  orderBy: z.union([ institution_settingsOrderByWithRelationInputSchema.array(),institution_settingsOrderByWithRelationInputSchema ]).optional(),
  cursor: institution_settingsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Institution_settingsScalarFieldEnumSchema,Institution_settingsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const institution_settingsAggregateArgsSchema: z.ZodType<Prisma.institution_settingsAggregateArgs> = z.object({
  where: institution_settingsWhereInputSchema.optional(),
  orderBy: z.union([ institution_settingsOrderByWithRelationInputSchema.array(),institution_settingsOrderByWithRelationInputSchema ]).optional(),
  cursor: institution_settingsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const institution_settingsGroupByArgsSchema: z.ZodType<Prisma.institution_settingsGroupByArgs> = z.object({
  where: institution_settingsWhereInputSchema.optional(),
  orderBy: z.union([ institution_settingsOrderByWithAggregationInputSchema.array(),institution_settingsOrderByWithAggregationInputSchema ]).optional(),
  by: Institution_settingsScalarFieldEnumSchema.array(),
  having: institution_settingsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const institution_settingsFindUniqueArgsSchema: z.ZodType<Prisma.institution_settingsFindUniqueArgs> = z.object({
  select: institution_settingsSelectSchema.optional(),
  where: institution_settingsWhereUniqueInputSchema,
}).strict() ;

export const institution_settingsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.institution_settingsFindUniqueOrThrowArgs> = z.object({
  select: institution_settingsSelectSchema.optional(),
  where: institution_settingsWhereUniqueInputSchema,
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

export const class_sessionCreateArgsSchema: z.ZodType<Prisma.class_sessionCreateArgs> = z.object({
  select: class_sessionSelectSchema.optional(),
  data: z.union([ class_sessionCreateInputSchema,class_sessionUncheckedCreateInputSchema ]),
}).strict() ;

export const class_sessionUpsertArgsSchema: z.ZodType<Prisma.class_sessionUpsertArgs> = z.object({
  select: class_sessionSelectSchema.optional(),
  where: class_sessionWhereUniqueInputSchema,
  create: z.union([ class_sessionCreateInputSchema,class_sessionUncheckedCreateInputSchema ]),
  update: z.union([ class_sessionUpdateInputSchema,class_sessionUncheckedUpdateInputSchema ]),
}).strict() ;

export const class_sessionCreateManyArgsSchema: z.ZodType<Prisma.class_sessionCreateManyArgs> = z.object({
  data: z.union([ class_sessionCreateManyInputSchema,class_sessionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const class_sessionCreateManyAndReturnArgsSchema: z.ZodType<Prisma.class_sessionCreateManyAndReturnArgs> = z.object({
  data: z.union([ class_sessionCreateManyInputSchema,class_sessionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const class_sessionDeleteArgsSchema: z.ZodType<Prisma.class_sessionDeleteArgs> = z.object({
  select: class_sessionSelectSchema.optional(),
  where: class_sessionWhereUniqueInputSchema,
}).strict() ;

export const class_sessionUpdateArgsSchema: z.ZodType<Prisma.class_sessionUpdateArgs> = z.object({
  select: class_sessionSelectSchema.optional(),
  data: z.union([ class_sessionUpdateInputSchema,class_sessionUncheckedUpdateInputSchema ]),
  where: class_sessionWhereUniqueInputSchema,
}).strict() ;

export const class_sessionUpdateManyArgsSchema: z.ZodType<Prisma.class_sessionUpdateManyArgs> = z.object({
  data: z.union([ class_sessionUpdateManyMutationInputSchema,class_sessionUncheckedUpdateManyInputSchema ]),
  where: class_sessionWhereInputSchema.optional(),
}).strict() ;

export const class_sessionDeleteManyArgsSchema: z.ZodType<Prisma.class_sessionDeleteManyArgs> = z.object({
  where: class_sessionWhereInputSchema.optional(),
}).strict() ;

export const teachertotimetableCreateArgsSchema: z.ZodType<Prisma.teachertotimetableCreateArgs> = z.object({
  select: teachertotimetableSelectSchema.optional(),
  data: z.union([ teachertotimetableCreateInputSchema,teachertotimetableUncheckedCreateInputSchema ]),
}).strict() ;

export const teachertotimetableUpsertArgsSchema: z.ZodType<Prisma.teachertotimetableUpsertArgs> = z.object({
  select: teachertotimetableSelectSchema.optional(),
  where: teachertotimetableWhereUniqueInputSchema,
  create: z.union([ teachertotimetableCreateInputSchema,teachertotimetableUncheckedCreateInputSchema ]),
  update: z.union([ teachertotimetableUpdateInputSchema,teachertotimetableUncheckedUpdateInputSchema ]),
}).strict() ;

export const teachertotimetableCreateManyArgsSchema: z.ZodType<Prisma.teachertotimetableCreateManyArgs> = z.object({
  data: z.union([ teachertotimetableCreateManyInputSchema,teachertotimetableCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const teachertotimetableCreateManyAndReturnArgsSchema: z.ZodType<Prisma.teachertotimetableCreateManyAndReturnArgs> = z.object({
  data: z.union([ teachertotimetableCreateManyInputSchema,teachertotimetableCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const teachertotimetableDeleteArgsSchema: z.ZodType<Prisma.teachertotimetableDeleteArgs> = z.object({
  select: teachertotimetableSelectSchema.optional(),
  where: teachertotimetableWhereUniqueInputSchema,
}).strict() ;

export const teachertotimetableUpdateArgsSchema: z.ZodType<Prisma.teachertotimetableUpdateArgs> = z.object({
  select: teachertotimetableSelectSchema.optional(),
  data: z.union([ teachertotimetableUpdateInputSchema,teachertotimetableUncheckedUpdateInputSchema ]),
  where: teachertotimetableWhereUniqueInputSchema,
}).strict() ;

export const teachertotimetableUpdateManyArgsSchema: z.ZodType<Prisma.teachertotimetableUpdateManyArgs> = z.object({
  data: z.union([ teachertotimetableUpdateManyMutationInputSchema,teachertotimetableUncheckedUpdateManyInputSchema ]),
  where: teachertotimetableWhereInputSchema.optional(),
}).strict() ;

export const teachertotimetableDeleteManyArgsSchema: z.ZodType<Prisma.teachertotimetableDeleteManyArgs> = z.object({
  where: teachertotimetableWhereInputSchema.optional(),
}).strict() ;

export const academic_yearCreateArgsSchema: z.ZodType<Prisma.academic_yearCreateArgs> = z.object({
  select: academic_yearSelectSchema.optional(),
  data: z.union([ academic_yearCreateInputSchema,academic_yearUncheckedCreateInputSchema ]),
}).strict() ;

export const academic_yearUpsertArgsSchema: z.ZodType<Prisma.academic_yearUpsertArgs> = z.object({
  select: academic_yearSelectSchema.optional(),
  where: academic_yearWhereUniqueInputSchema,
  create: z.union([ academic_yearCreateInputSchema,academic_yearUncheckedCreateInputSchema ]),
  update: z.union([ academic_yearUpdateInputSchema,academic_yearUncheckedUpdateInputSchema ]),
}).strict() ;

export const academic_yearCreateManyArgsSchema: z.ZodType<Prisma.academic_yearCreateManyArgs> = z.object({
  data: z.union([ academic_yearCreateManyInputSchema,academic_yearCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const academic_yearCreateManyAndReturnArgsSchema: z.ZodType<Prisma.academic_yearCreateManyAndReturnArgs> = z.object({
  data: z.union([ academic_yearCreateManyInputSchema,academic_yearCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const academic_yearDeleteArgsSchema: z.ZodType<Prisma.academic_yearDeleteArgs> = z.object({
  select: academic_yearSelectSchema.optional(),
  where: academic_yearWhereUniqueInputSchema,
}).strict() ;

export const academic_yearUpdateArgsSchema: z.ZodType<Prisma.academic_yearUpdateArgs> = z.object({
  select: academic_yearSelectSchema.optional(),
  data: z.union([ academic_yearUpdateInputSchema,academic_yearUncheckedUpdateInputSchema ]),
  where: academic_yearWhereUniqueInputSchema,
}).strict() ;

export const academic_yearUpdateManyArgsSchema: z.ZodType<Prisma.academic_yearUpdateManyArgs> = z.object({
  data: z.union([ academic_yearUpdateManyMutationInputSchema,academic_yearUncheckedUpdateManyInputSchema ]),
  where: academic_yearWhereInputSchema.optional(),
}).strict() ;

export const academic_yearDeleteManyArgsSchema: z.ZodType<Prisma.academic_yearDeleteManyArgs> = z.object({
  where: academic_yearWhereInputSchema.optional(),
}).strict() ;

export const academic_year_templateCreateArgsSchema: z.ZodType<Prisma.academic_year_templateCreateArgs> = z.object({
  select: academic_year_templateSelectSchema.optional(),
  data: z.union([ academic_year_templateCreateInputSchema,academic_year_templateUncheckedCreateInputSchema ]),
}).strict() ;

export const academic_year_templateUpsertArgsSchema: z.ZodType<Prisma.academic_year_templateUpsertArgs> = z.object({
  select: academic_year_templateSelectSchema.optional(),
  where: academic_year_templateWhereUniqueInputSchema,
  create: z.union([ academic_year_templateCreateInputSchema,academic_year_templateUncheckedCreateInputSchema ]),
  update: z.union([ academic_year_templateUpdateInputSchema,academic_year_templateUncheckedUpdateInputSchema ]),
}).strict() ;

export const academic_year_templateCreateManyArgsSchema: z.ZodType<Prisma.academic_year_templateCreateManyArgs> = z.object({
  data: z.union([ academic_year_templateCreateManyInputSchema,academic_year_templateCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const academic_year_templateCreateManyAndReturnArgsSchema: z.ZodType<Prisma.academic_year_templateCreateManyAndReturnArgs> = z.object({
  data: z.union([ academic_year_templateCreateManyInputSchema,academic_year_templateCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const academic_year_templateDeleteArgsSchema: z.ZodType<Prisma.academic_year_templateDeleteArgs> = z.object({
  select: academic_year_templateSelectSchema.optional(),
  where: academic_year_templateWhereUniqueInputSchema,
}).strict() ;

export const academic_year_templateUpdateArgsSchema: z.ZodType<Prisma.academic_year_templateUpdateArgs> = z.object({
  select: academic_year_templateSelectSchema.optional(),
  data: z.union([ academic_year_templateUpdateInputSchema,academic_year_templateUncheckedUpdateInputSchema ]),
  where: academic_year_templateWhereUniqueInputSchema,
}).strict() ;

export const academic_year_templateUpdateManyArgsSchema: z.ZodType<Prisma.academic_year_templateUpdateManyArgs> = z.object({
  data: z.union([ academic_year_templateUpdateManyMutationInputSchema,academic_year_templateUncheckedUpdateManyInputSchema ]),
  where: academic_year_templateWhereInputSchema.optional(),
}).strict() ;

export const academic_year_templateDeleteManyArgsSchema: z.ZodType<Prisma.academic_year_templateDeleteManyArgs> = z.object({
  where: academic_year_templateWhereInputSchema.optional(),
}).strict() ;

export const attendanceCreateArgsSchema: z.ZodType<Prisma.attendanceCreateArgs> = z.object({
  select: attendanceSelectSchema.optional(),
  data: z.union([ attendanceCreateInputSchema,attendanceUncheckedCreateInputSchema ]),
}).strict() ;

export const attendanceUpsertArgsSchema: z.ZodType<Prisma.attendanceUpsertArgs> = z.object({
  select: attendanceSelectSchema.optional(),
  where: attendanceWhereUniqueInputSchema,
  create: z.union([ attendanceCreateInputSchema,attendanceUncheckedCreateInputSchema ]),
  update: z.union([ attendanceUpdateInputSchema,attendanceUncheckedUpdateInputSchema ]),
}).strict() ;

export const attendanceCreateManyArgsSchema: z.ZodType<Prisma.attendanceCreateManyArgs> = z.object({
  data: z.union([ attendanceCreateManyInputSchema,attendanceCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const attendanceCreateManyAndReturnArgsSchema: z.ZodType<Prisma.attendanceCreateManyAndReturnArgs> = z.object({
  data: z.union([ attendanceCreateManyInputSchema,attendanceCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const attendanceDeleteArgsSchema: z.ZodType<Prisma.attendanceDeleteArgs> = z.object({
  select: attendanceSelectSchema.optional(),
  where: attendanceWhereUniqueInputSchema,
}).strict() ;

export const attendanceUpdateArgsSchema: z.ZodType<Prisma.attendanceUpdateArgs> = z.object({
  select: attendanceSelectSchema.optional(),
  data: z.union([ attendanceUpdateInputSchema,attendanceUncheckedUpdateInputSchema ]),
  where: attendanceWhereUniqueInputSchema,
}).strict() ;

export const attendanceUpdateManyArgsSchema: z.ZodType<Prisma.attendanceUpdateManyArgs> = z.object({
  data: z.union([ attendanceUpdateManyMutationInputSchema,attendanceUncheckedUpdateManyInputSchema ]),
  where: attendanceWhereInputSchema.optional(),
}).strict() ;

export const attendanceDeleteManyArgsSchema: z.ZodType<Prisma.attendanceDeleteManyArgs> = z.object({
  where: attendanceWhereInputSchema.optional(),
}).strict() ;

export const classroomCreateArgsSchema: z.ZodType<Prisma.classroomCreateArgs> = z.object({
  select: classroomSelectSchema.optional(),
  data: z.union([ classroomCreateInputSchema,classroomUncheckedCreateInputSchema ]),
}).strict() ;

export const classroomUpsertArgsSchema: z.ZodType<Prisma.classroomUpsertArgs> = z.object({
  select: classroomSelectSchema.optional(),
  where: classroomWhereUniqueInputSchema,
  create: z.union([ classroomCreateInputSchema,classroomUncheckedCreateInputSchema ]),
  update: z.union([ classroomUpdateInputSchema,classroomUncheckedUpdateInputSchema ]),
}).strict() ;

export const classroomCreateManyArgsSchema: z.ZodType<Prisma.classroomCreateManyArgs> = z.object({
  data: z.union([ classroomCreateManyInputSchema,classroomCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const classroomCreateManyAndReturnArgsSchema: z.ZodType<Prisma.classroomCreateManyAndReturnArgs> = z.object({
  data: z.union([ classroomCreateManyInputSchema,classroomCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const classroomDeleteArgsSchema: z.ZodType<Prisma.classroomDeleteArgs> = z.object({
  select: classroomSelectSchema.optional(),
  where: classroomWhereUniqueInputSchema,
}).strict() ;

export const classroomUpdateArgsSchema: z.ZodType<Prisma.classroomUpdateArgs> = z.object({
  select: classroomSelectSchema.optional(),
  data: z.union([ classroomUpdateInputSchema,classroomUncheckedUpdateInputSchema ]),
  where: classroomWhereUniqueInputSchema,
}).strict() ;

export const classroomUpdateManyArgsSchema: z.ZodType<Prisma.classroomUpdateManyArgs> = z.object({
  data: z.union([ classroomUpdateManyMutationInputSchema,classroomUncheckedUpdateManyInputSchema ]),
  where: classroomWhereInputSchema.optional(),
}).strict() ;

export const classroomDeleteManyArgsSchema: z.ZodType<Prisma.classroomDeleteManyArgs> = z.object({
  where: classroomWhereInputSchema.optional(),
}).strict() ;

export const courseCreateArgsSchema: z.ZodType<Prisma.courseCreateArgs> = z.object({
  select: courseSelectSchema.optional(),
  data: z.union([ courseCreateInputSchema,courseUncheckedCreateInputSchema ]),
}).strict() ;

export const courseUpsertArgsSchema: z.ZodType<Prisma.courseUpsertArgs> = z.object({
  select: courseSelectSchema.optional(),
  where: courseWhereUniqueInputSchema,
  create: z.union([ courseCreateInputSchema,courseUncheckedCreateInputSchema ]),
  update: z.union([ courseUpdateInputSchema,courseUncheckedUpdateInputSchema ]),
}).strict() ;

export const courseCreateManyArgsSchema: z.ZodType<Prisma.courseCreateManyArgs> = z.object({
  data: z.union([ courseCreateManyInputSchema,courseCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const courseCreateManyAndReturnArgsSchema: z.ZodType<Prisma.courseCreateManyAndReturnArgs> = z.object({
  data: z.union([ courseCreateManyInputSchema,courseCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const courseDeleteArgsSchema: z.ZodType<Prisma.courseDeleteArgs> = z.object({
  select: courseSelectSchema.optional(),
  where: courseWhereUniqueInputSchema,
}).strict() ;

export const courseUpdateArgsSchema: z.ZodType<Prisma.courseUpdateArgs> = z.object({
  select: courseSelectSchema.optional(),
  data: z.union([ courseUpdateInputSchema,courseUncheckedUpdateInputSchema ]),
  where: courseWhereUniqueInputSchema,
}).strict() ;

export const courseUpdateManyArgsSchema: z.ZodType<Prisma.courseUpdateManyArgs> = z.object({
  data: z.union([ courseUpdateManyMutationInputSchema,courseUncheckedUpdateManyInputSchema ]),
  where: courseWhereInputSchema.optional(),
}).strict() ;

export const courseDeleteManyArgsSchema: z.ZodType<Prisma.courseDeleteManyArgs> = z.object({
  where: courseWhereInputSchema.optional(),
}).strict() ;

export const documentCreateArgsSchema: z.ZodType<Prisma.documentCreateArgs> = z.object({
  select: documentSelectSchema.optional(),
  data: z.union([ documentCreateInputSchema,documentUncheckedCreateInputSchema ]),
}).strict() ;

export const documentUpsertArgsSchema: z.ZodType<Prisma.documentUpsertArgs> = z.object({
  select: documentSelectSchema.optional(),
  where: documentWhereUniqueInputSchema,
  create: z.union([ documentCreateInputSchema,documentUncheckedCreateInputSchema ]),
  update: z.union([ documentUpdateInputSchema,documentUncheckedUpdateInputSchema ]),
}).strict() ;

export const documentCreateManyArgsSchema: z.ZodType<Prisma.documentCreateManyArgs> = z.object({
  data: z.union([ documentCreateManyInputSchema,documentCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const documentCreateManyAndReturnArgsSchema: z.ZodType<Prisma.documentCreateManyAndReturnArgs> = z.object({
  data: z.union([ documentCreateManyInputSchema,documentCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const documentDeleteArgsSchema: z.ZodType<Prisma.documentDeleteArgs> = z.object({
  select: documentSelectSchema.optional(),
  where: documentWhereUniqueInputSchema,
}).strict() ;

export const documentUpdateArgsSchema: z.ZodType<Prisma.documentUpdateArgs> = z.object({
  select: documentSelectSchema.optional(),
  data: z.union([ documentUpdateInputSchema,documentUncheckedUpdateInputSchema ]),
  where: documentWhereUniqueInputSchema,
}).strict() ;

export const documentUpdateManyArgsSchema: z.ZodType<Prisma.documentUpdateManyArgs> = z.object({
  data: z.union([ documentUpdateManyMutationInputSchema,documentUncheckedUpdateManyInputSchema ]),
  where: documentWhereInputSchema.optional(),
}).strict() ;

export const documentDeleteManyArgsSchema: z.ZodType<Prisma.documentDeleteManyArgs> = z.object({
  where: documentWhereInputSchema.optional(),
}).strict() ;

export const enrollmentCreateArgsSchema: z.ZodType<Prisma.enrollmentCreateArgs> = z.object({
  select: enrollmentSelectSchema.optional(),
  data: z.union([ enrollmentCreateInputSchema,enrollmentUncheckedCreateInputSchema ]),
}).strict() ;

export const enrollmentUpsertArgsSchema: z.ZodType<Prisma.enrollmentUpsertArgs> = z.object({
  select: enrollmentSelectSchema.optional(),
  where: enrollmentWhereUniqueInputSchema,
  create: z.union([ enrollmentCreateInputSchema,enrollmentUncheckedCreateInputSchema ]),
  update: z.union([ enrollmentUpdateInputSchema,enrollmentUncheckedUpdateInputSchema ]),
}).strict() ;

export const enrollmentCreateManyArgsSchema: z.ZodType<Prisma.enrollmentCreateManyArgs> = z.object({
  data: z.union([ enrollmentCreateManyInputSchema,enrollmentCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const enrollmentCreateManyAndReturnArgsSchema: z.ZodType<Prisma.enrollmentCreateManyAndReturnArgs> = z.object({
  data: z.union([ enrollmentCreateManyInputSchema,enrollmentCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const enrollmentDeleteArgsSchema: z.ZodType<Prisma.enrollmentDeleteArgs> = z.object({
  select: enrollmentSelectSchema.optional(),
  where: enrollmentWhereUniqueInputSchema,
}).strict() ;

export const enrollmentUpdateArgsSchema: z.ZodType<Prisma.enrollmentUpdateArgs> = z.object({
  select: enrollmentSelectSchema.optional(),
  data: z.union([ enrollmentUpdateInputSchema,enrollmentUncheckedUpdateInputSchema ]),
  where: enrollmentWhereUniqueInputSchema,
}).strict() ;

export const enrollmentUpdateManyArgsSchema: z.ZodType<Prisma.enrollmentUpdateManyArgs> = z.object({
  data: z.union([ enrollmentUpdateManyMutationInputSchema,enrollmentUncheckedUpdateManyInputSchema ]),
  where: enrollmentWhereInputSchema.optional(),
}).strict() ;

export const enrollmentDeleteManyArgsSchema: z.ZodType<Prisma.enrollmentDeleteManyArgs> = z.object({
  where: enrollmentWhereInputSchema.optional(),
}).strict() ;

export const gradeCreateArgsSchema: z.ZodType<Prisma.gradeCreateArgs> = z.object({
  select: gradeSelectSchema.optional(),
  data: z.union([ gradeCreateInputSchema,gradeUncheckedCreateInputSchema ]),
}).strict() ;

export const gradeUpsertArgsSchema: z.ZodType<Prisma.gradeUpsertArgs> = z.object({
  select: gradeSelectSchema.optional(),
  where: gradeWhereUniqueInputSchema,
  create: z.union([ gradeCreateInputSchema,gradeUncheckedCreateInputSchema ]),
  update: z.union([ gradeUpdateInputSchema,gradeUncheckedUpdateInputSchema ]),
}).strict() ;

export const gradeCreateManyArgsSchema: z.ZodType<Prisma.gradeCreateManyArgs> = z.object({
  data: z.union([ gradeCreateManyInputSchema,gradeCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const gradeCreateManyAndReturnArgsSchema: z.ZodType<Prisma.gradeCreateManyAndReturnArgs> = z.object({
  data: z.union([ gradeCreateManyInputSchema,gradeCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const gradeDeleteArgsSchema: z.ZodType<Prisma.gradeDeleteArgs> = z.object({
  select: gradeSelectSchema.optional(),
  where: gradeWhereUniqueInputSchema,
}).strict() ;

export const gradeUpdateArgsSchema: z.ZodType<Prisma.gradeUpdateArgs> = z.object({
  select: gradeSelectSchema.optional(),
  data: z.union([ gradeUpdateInputSchema,gradeUncheckedUpdateInputSchema ]),
  where: gradeWhereUniqueInputSchema,
}).strict() ;

export const gradeUpdateManyArgsSchema: z.ZodType<Prisma.gradeUpdateManyArgs> = z.object({
  data: z.union([ gradeUpdateManyMutationInputSchema,gradeUncheckedUpdateManyInputSchema ]),
  where: gradeWhereInputSchema.optional(),
}).strict() ;

export const gradeDeleteManyArgsSchema: z.ZodType<Prisma.gradeDeleteManyArgs> = z.object({
  where: gradeWhereInputSchema.optional(),
}).strict() ;

export const studentCreateArgsSchema: z.ZodType<Prisma.studentCreateArgs> = z.object({
  select: studentSelectSchema.optional(),
  data: z.union([ studentCreateInputSchema,studentUncheckedCreateInputSchema ]),
}).strict() ;

export const studentUpsertArgsSchema: z.ZodType<Prisma.studentUpsertArgs> = z.object({
  select: studentSelectSchema.optional(),
  where: studentWhereUniqueInputSchema,
  create: z.union([ studentCreateInputSchema,studentUncheckedCreateInputSchema ]),
  update: z.union([ studentUpdateInputSchema,studentUncheckedUpdateInputSchema ]),
}).strict() ;

export const studentCreateManyArgsSchema: z.ZodType<Prisma.studentCreateManyArgs> = z.object({
  data: z.union([ studentCreateManyInputSchema,studentCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const studentCreateManyAndReturnArgsSchema: z.ZodType<Prisma.studentCreateManyAndReturnArgs> = z.object({
  data: z.union([ studentCreateManyInputSchema,studentCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const studentDeleteArgsSchema: z.ZodType<Prisma.studentDeleteArgs> = z.object({
  select: studentSelectSchema.optional(),
  where: studentWhereUniqueInputSchema,
}).strict() ;

export const studentUpdateArgsSchema: z.ZodType<Prisma.studentUpdateArgs> = z.object({
  select: studentSelectSchema.optional(),
  data: z.union([ studentUpdateInputSchema,studentUncheckedUpdateInputSchema ]),
  where: studentWhereUniqueInputSchema,
}).strict() ;

export const studentUpdateManyArgsSchema: z.ZodType<Prisma.studentUpdateManyArgs> = z.object({
  data: z.union([ studentUpdateManyMutationInputSchema,studentUncheckedUpdateManyInputSchema ]),
  where: studentWhereInputSchema.optional(),
}).strict() ;

export const studentDeleteManyArgsSchema: z.ZodType<Prisma.studentDeleteManyArgs> = z.object({
  where: studentWhereInputSchema.optional(),
}).strict() ;

export const holidaysCreateArgsSchema: z.ZodType<Prisma.holidaysCreateArgs> = z.object({
  select: holidaysSelectSchema.optional(),
  data: z.union([ holidaysCreateInputSchema,holidaysUncheckedCreateInputSchema ]),
}).strict() ;

export const holidaysUpsertArgsSchema: z.ZodType<Prisma.holidaysUpsertArgs> = z.object({
  select: holidaysSelectSchema.optional(),
  where: holidaysWhereUniqueInputSchema,
  create: z.union([ holidaysCreateInputSchema,holidaysUncheckedCreateInputSchema ]),
  update: z.union([ holidaysUpdateInputSchema,holidaysUncheckedUpdateInputSchema ]),
}).strict() ;

export const holidaysCreateManyArgsSchema: z.ZodType<Prisma.holidaysCreateManyArgs> = z.object({
  data: z.union([ holidaysCreateManyInputSchema,holidaysCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const holidaysCreateManyAndReturnArgsSchema: z.ZodType<Prisma.holidaysCreateManyAndReturnArgs> = z.object({
  data: z.union([ holidaysCreateManyInputSchema,holidaysCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const holidaysDeleteArgsSchema: z.ZodType<Prisma.holidaysDeleteArgs> = z.object({
  select: holidaysSelectSchema.optional(),
  where: holidaysWhereUniqueInputSchema,
}).strict() ;

export const holidaysUpdateArgsSchema: z.ZodType<Prisma.holidaysUpdateArgs> = z.object({
  select: holidaysSelectSchema.optional(),
  data: z.union([ holidaysUpdateInputSchema,holidaysUncheckedUpdateInputSchema ]),
  where: holidaysWhereUniqueInputSchema,
}).strict() ;

export const holidaysUpdateManyArgsSchema: z.ZodType<Prisma.holidaysUpdateManyArgs> = z.object({
  data: z.union([ holidaysUpdateManyMutationInputSchema,holidaysUncheckedUpdateManyInputSchema ]),
  where: holidaysWhereInputSchema.optional(),
}).strict() ;

export const holidaysDeleteManyArgsSchema: z.ZodType<Prisma.holidaysDeleteManyArgs> = z.object({
  where: holidaysWhereInputSchema.optional(),
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

export const institution_settingsCreateArgsSchema: z.ZodType<Prisma.institution_settingsCreateArgs> = z.object({
  select: institution_settingsSelectSchema.optional(),
  data: z.union([ institution_settingsCreateInputSchema,institution_settingsUncheckedCreateInputSchema ]).optional(),
}).strict() ;

export const institution_settingsUpsertArgsSchema: z.ZodType<Prisma.institution_settingsUpsertArgs> = z.object({
  select: institution_settingsSelectSchema.optional(),
  where: institution_settingsWhereUniqueInputSchema,
  create: z.union([ institution_settingsCreateInputSchema,institution_settingsUncheckedCreateInputSchema ]),
  update: z.union([ institution_settingsUpdateInputSchema,institution_settingsUncheckedUpdateInputSchema ]),
}).strict() ;

export const institution_settingsCreateManyArgsSchema: z.ZodType<Prisma.institution_settingsCreateManyArgs> = z.object({
  data: z.union([ institution_settingsCreateManyInputSchema,institution_settingsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const institution_settingsCreateManyAndReturnArgsSchema: z.ZodType<Prisma.institution_settingsCreateManyAndReturnArgs> = z.object({
  data: z.union([ institution_settingsCreateManyInputSchema,institution_settingsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const institution_settingsDeleteArgsSchema: z.ZodType<Prisma.institution_settingsDeleteArgs> = z.object({
  select: institution_settingsSelectSchema.optional(),
  where: institution_settingsWhereUniqueInputSchema,
}).strict() ;

export const institution_settingsUpdateArgsSchema: z.ZodType<Prisma.institution_settingsUpdateArgs> = z.object({
  select: institution_settingsSelectSchema.optional(),
  data: z.union([ institution_settingsUpdateInputSchema,institution_settingsUncheckedUpdateInputSchema ]),
  where: institution_settingsWhereUniqueInputSchema,
}).strict() ;

export const institution_settingsUpdateManyArgsSchema: z.ZodType<Prisma.institution_settingsUpdateManyArgs> = z.object({
  data: z.union([ institution_settingsUpdateManyMutationInputSchema,institution_settingsUncheckedUpdateManyInputSchema ]),
  where: institution_settingsWhereInputSchema.optional(),
}).strict() ;

export const institution_settingsDeleteManyArgsSchema: z.ZodType<Prisma.institution_settingsDeleteManyArgs> = z.object({
  where: institution_settingsWhereInputSchema.optional(),
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