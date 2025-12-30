const DEFAULT_TABLE_PREFIX = 'asharvi';

const TABLE_MODELS = [
  'parent',
  'child',
  'child_education',
  'child_nutrition',
  'instructor',
  'course',
  'course_progress',
  'question',
  'otp'
];

const MODEL_ENV_VARS = {
  parent: 'DYNAMODB_PARENT_TABLE',
  child: 'DYNAMODB_CHILD_TABLE',
  child_education: 'DYNAMODB_CHILD_EDUCATION_TABLE',
  child_nutrition: 'DYNAMODB_CHILD_NUTRITION_TABLE',
  instructor: 'DYNAMODB_INSTRUCTOR_TABLE',
  course: 'DYNAMODB_COURSE_TABLE',
  course_progress: 'DYNAMODB_COURSE_PROGRESS_TABLE',
  question: 'DYNAMODB_QUESTION_TABLE',
  otp: 'DYNAMODB_OTP_TABLE'
};

const normalizeEnvironment = (value) => {
  const raw = (value || '').toString().trim().toLowerCase();
  if (!raw) return 'development';
  if (raw === 'prod') return 'production';
  if (raw === 'stage') return 'staging';
  return raw;
};

const getEnvironment = () =>
  normalizeEnvironment(process.env.APP_ENV || process.env.ENVIRONMENT || process.env.NODE_ENV);

const getTableName = (model) => {
  if (process.env.DYNAMO_TABLE_NAME) {
    return process.env.DYNAMO_TABLE_NAME;
  }
  const envVar = MODEL_ENV_VARS[model];
  const override = envVar ? process.env[envVar] : null;
  if (override) return override;

  const prefix = process.env.DYNAMODB_TABLE_PREFIX || DEFAULT_TABLE_PREFIX;
  const environment = getEnvironment();
  return `${prefix}-${model}-${environment}`;
};

module.exports = {
  TABLE_MODELS,
  MODEL_ENV_VARS,
  getEnvironment,
  getTableName
};
