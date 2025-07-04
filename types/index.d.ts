export {}

interface User {
  id: number
  name: string
  role: string
}

interface AuthResult {
  name: string
  role: string
  token: string
}

interface ResetPasswordBody {
  name: string
  sa_password: string
  newPassword: string
}