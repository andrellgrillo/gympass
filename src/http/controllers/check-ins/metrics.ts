import { FastifyRequest, FastifyReply } from 'fastify'
import { makeCreateUserMetricaUseCase } from '@/use-cases/factories/make-create-user-metrics-use-case'

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  const createUserMetricaUseCase = makeCreateUserMetricaUseCase()

  const { checkInsCount } = await createUserMetricaUseCase.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send({ checkInsCount })
}
