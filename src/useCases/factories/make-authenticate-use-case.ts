import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repositories'
import { AuthenticateUseCase } from '../authenticate'

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const authenticate = new AuthenticateUseCase(usersRepository)

  return authenticate
}
