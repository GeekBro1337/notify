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

interface Notification {
  id: number
  forUser: string
  titel: string
  discription: string
  regular: boolean
  regularData: string
  createAt: string
  data: string
}
