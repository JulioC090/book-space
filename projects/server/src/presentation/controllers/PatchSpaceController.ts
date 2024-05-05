import SpaceAvailability from '@/domain/models/SpaceAvailability';
import { User } from '@/domain/models/User';
import IUpdateSpace from '@/domain/protocols/usecases/IUpdateSpace';
import { badRequest, forbidden, ok } from '@/presentation/helpers/httpCodes';
import timeToDateConverter from '@/presentation/helpers/timeToDateConverter';
import { Controller } from '@/presentation/protocols/Controller';
import { IHttpRequest, IHttpResponse } from '@/presentation/protocols/Http';
import { z } from 'zod';

const requestParamsSchema = z.object({
  workspaceId: z.string().min(1),
  spaceId: z.string().min(1),
});

const requestBodySchema = z.object({
  name: z.string().min(2),
  description: z.string().min(2),
  maxAmountOfPeople: z.number().positive().nullable().optional(),
  resources: z.array(z.string()).optional(),
  availabilityRange: z
    .array(
      z.object({
        weekday: z.number().min(0).max(6),
        startTime: z.string().time(),
        endTime: z.string().time(),
      }),
    )
    .optional(),
});

export default class PatchSpaceController implements Controller {
  private updateSpace: IUpdateSpace;

  constructor(updateSpace: IUpdateSpace) {
    this.updateSpace = updateSpace;
  }

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const validatedRequestParams = requestParamsSchema.safeParse(
      request.params,
    );
    if (!validatedRequestParams.success)
      return badRequest(validatedRequestParams.error.issues);

    const validatedRequestBody = requestBodySchema
      .partial()
      .safeParse(request.body);
    if (!validatedRequestBody.success)
      return badRequest(validatedRequestBody.error.issues);

    if (Object.keys(validatedRequestBody.data).length === 0)
      return badRequest({ error: 'Invalid body' });

    const { account } = request as { account: User };

    let ranges;

    if (validatedRequestBody.data.availabilityRange) {
      ranges = new Array<SpaceAvailability>(
        validatedRequestBody.data.availabilityRange.length,
      );

      for (
        let i = 0;
        i < validatedRequestBody.data.availabilityRange?.length;
        i++
      ) {
        const startTime = timeToDateConverter(
          validatedRequestBody.data.availabilityRange[i].startTime,
        );

        const endTime = timeToDateConverter(
          validatedRequestBody.data.availabilityRange[i].endTime,
        );

        if (startTime.getTime() > endTime.getTime()) {
          return badRequest({ error: 'Invalid time range' });
        }

        ranges[i] = {
          weekday: validatedRequestBody.data.availabilityRange[i].weekday,
          startTime,
          endTime,
        };
      }
    }

    const response = await this.updateSpace.update(
      account.id,
      validatedRequestParams.data.workspaceId,
      validatedRequestParams.data.spaceId,
      {
        name: validatedRequestBody.data.name,
        description: validatedRequestBody.data.description,
        maxAmountOfPeople: validatedRequestBody.data.maxAmountOfPeople,
        availabilityRange: ranges,
      },
      validatedRequestBody.data.resources,
    );

    if (!response) return forbidden();
    return ok();
  }
}
