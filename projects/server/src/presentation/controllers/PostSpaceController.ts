import SpaceAvailability from '@/domain/models/SpaceAvailability';
import { User } from '@/domain/models/User';
import IAddSpace from '@/domain/protocols/usecases/IAddSpace';
import {
  badRequest,
  created,
  forbidden,
} from '@/presentation/helpers/httpCodes';
import timeToDateConverter from '@/presentation/helpers/timeToDateConverter';
import { Controller } from '@/presentation/protocols/Controller';
import { IHttpRequest, IHttpResponse } from '@/presentation/protocols/Http';
import { z } from 'zod';

const requestParamsSchema = z.object({
  workspaceId: z.string().min(1),
});

const requestBodySchema = z.object({
  name: z.string().min(2),
  description: z.string().min(2),
  maxAmountOfPeople: z.number().positive().optional(),
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

export default class PostSpaceController implements Controller {
  private addSpace: IAddSpace;

  constructor(addSpace: IAddSpace) {
    this.addSpace = addSpace;
  }

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const validatedRequestParams = requestParamsSchema.safeParse(
      request.params,
    );
    if (!validatedRequestParams.success)
      return badRequest(validatedRequestParams.error.issues);

    const validatedRequestBody = requestBodySchema.safeParse(request.body);
    if (!validatedRequestBody.success)
      return badRequest(validatedRequestBody.error.issues);

    const ranges = new Array<SpaceAvailability>(
      validatedRequestBody.data.availabilityRange
        ? validatedRequestBody.data.availabilityRange.length
        : 0,
    );

    if (validatedRequestBody.data.availabilityRange) {
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

    const { account } = request as { account: User };

    const response = await this.addSpace.add(
      account,
      validatedRequestParams.data.workspaceId,
      {
        name: validatedRequestBody.data.name,
        description: validatedRequestBody.data.description,
        maxAmountOfPeople: validatedRequestBody.data.maxAmountOfPeople,
        availabilityRange: ranges,
      },
      validatedRequestBody.data.resources,
    );

    if (!response) return forbidden();
    return created(response);
  }
}
