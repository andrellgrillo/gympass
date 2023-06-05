import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeValidateCheckinuseCase } from '@/use-cases/factories/make-validate-chek-in-use-case'

export async function validate(req: FastifyRequest, rep: FastifyReply) {
  const validateCheckInParamsSchema = z.object({
    checkInId: z.string().uuid(),
  })

  const { checkInId } = validateCheckInParamsSchema.parse(req.params)
  const validateCheckinuseCase = makeValidateCheckinuseCase()

  await validateCheckinuseCase.execute({
    checkInId,
  })
  return rep.status(204).send()
}
