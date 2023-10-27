const USER_ID_HTTP_HEADER = 'fefa-user-id'
const ACCESS_TOKEN_COOKIE = 'fefaAccess'
const IS_ACTIVE_COOKIE = 'fefaActive'
const POST_LOGIN_REDIRECT_QUERY = 'redirect_to'
const DEBOUNCER_TOLERANCE_MILLISECONDS = 600
const PAGINATION_PAGE_SIZE = 4

const COOKIE_OPTIONS = {
  sameSite: 'strict',
  httpOnly: true,
  secure: true,
} as const

const MENU_ROUTE_MAPPING = [
  { title: 'Pacientes', path: '/workspace/pacient' },
  // { title: 'Consultas', path: '/appointment' },
  { title: 'Planos de Saúde', path: '/insurance' },
]

export {
  USER_ID_HTTP_HEADER,
  ACCESS_TOKEN_COOKIE,
  IS_ACTIVE_COOKIE,
  POST_LOGIN_REDIRECT_QUERY,
  DEBOUNCER_TOLERANCE_MILLISECONDS,
  PAGINATION_PAGE_SIZE,
  MENU_ROUTE_MAPPING,
  COOKIE_OPTIONS,
}
