import { UsersRepository } from '@/repositories/users-repository'
import { InvalidCredentialsError } from './errors/user-credentials-error'
import { compare } from 'bcryptjs'
import { User } from '@prisma/client'

interface AuthenticateuseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  user: User
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateuseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    //
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordmatches = await compare(password, user.password_hash)
    if (!doesPasswordmatches) {
      throw new InvalidCredentialsError()
    }
    return {
      user,
    }
  }
}
