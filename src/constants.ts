const ACCESS_TOKEN_COOKIE = 'fefaAccess'
const ACCESS_TOKEN_EXPIRES_SECONDS = 43200 // 12 hours
const IS_ACTIVE_COOKIE = 'fefaActive'
const IS_ACTIVE_COOKIE_EXPIRES_SECONDS = 3600 // 1 hour
const POST_LOGIN_REDIRECT_QUERY = 'redirect_to'
const PAGINATION_PAGE_SIZE = 4
const NOTIFICATION_EXPIRES_SECONDS = 3

const COOKIE_OPTIONS = {
  sameSite: 'strict',
  httpOnly: true,
  secure: true,
} as const

const MENU_ROUTE_MAPPING = [
  { title: 'Pacientes', path: '/pacient' },
]

export {
  ACCESS_TOKEN_COOKIE,
  ACCESS_TOKEN_EXPIRES_SECONDS,
  IS_ACTIVE_COOKIE,
  IS_ACTIVE_COOKIE_EXPIRES_SECONDS,
  POST_LOGIN_REDIRECT_QUERY,
  PAGINATION_PAGE_SIZE,
  NOTIFICATION_EXPIRES_SECONDS,
  MENU_ROUTE_MAPPING,
  COOKIE_OPTIONS,
}
