import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { InvalidCredentialsError } from '@/useCases/errors/user-credentials-error'
import { makeAuthenticateUseCase } from '@/useCases/factories/make-authenticate-use-case'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const autehnticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })
  const { email, password } = autehnticateBodySchema.parse(request.body)
  try {
    const authenticateuserCase = makeAuthenticateUseCase()
    await authenticateuserCase.execute({
      email,
      password,
    })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message })
    }
    throw err
  }
  return reply.status(200).send()
}
