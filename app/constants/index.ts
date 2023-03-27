export const ROUTES = {
  ROOT: '/',
  PROFILE: '/profile',
  LOGIN: '/login',
  REGISTER: '/register',
  LOGOUT: '/logout',
  CONFIRM_EMAIL: '/confirm-email',
  RESEND_CONFIRM_EMAIL: '/resend-confirm-email',
  CHANGE_ORGANIZATION: '/change-organization',
  USERS: '/users',
  SUBSCRIPTION_SERVICE: '/subscription-service',
  ORGANIZATIONS: '/organizations',
  CREATE_ORGANIZATION: '/organizations/create',
  TRANSACTIONS: '/transactions',
  CREATE_TRANSACTION: '/transactions/create',
  DELETE_TRANSACTION: '/transactions/delete',
  TONTINES: '/tontines',
  CREATE_TONTINE: '/tontines/create',
  DELETE_TONTINE: '/tontines/delete',
  PROJECTS: '/projects',
  CREATE_PROJECT: '/projects/create',
  DELETE_PROJECT: '/projects/delete',
  EXTEND_PROJECTS_SUBSCRIPTION: '/projects/extend-subscription',
  EXTEND_PROJECTS_SUBSCRIPTION_SUCCESS: '/projects/extend-subscription/success',
  SKILLS: '/skills',
  CREATE_SKILL: '/skills/create',
  DELETE_SKILL: '/skills/delete',
  PAY_NOW: '/pay-now',
}

export const FORM_STRATEGY = {
  LOGIN: 'login',
  REGISTER: 'register',
  CONFIRM_EMAIL: 'confirm-email',
  CHANGE_ORGANIZATION: 'change-organization',
}

export const SESSION_KEY = 'SESSION_KEY'
export const SESSION_ERROR_KEY = 'SESSION_ERROR_KEY'

export const DISPLAY_DATE_FORMAT = 'DD/MM/YYYY'

export const QUERY_KEY = {
  SEARCH: 'search',
  SKIP: 'skip',
  TAKE: 'take',
}

export const PAGINATION = {
  SKIP: 0,
  TAKE: 20,
  GAP: 2,
}
