import { User } from 'domain/models/User';
import LeaveWorkspace from 'domain/usecases/LeaveWorkspace';
import { badRequest, forbidden, ok } from 'presentation/helpers/httpCodes';
import { Controller } from 'presentation/protocols/Controller';
import { IHttpRequest, IHttpResponse } from 'presentation/protocols/Http';
import { z } from 'zod';

const requestParamsSchema = z.object({
  workspaceId: z.string().min(1),
});

export default class DeleteLeaveWorkspaceController implements Controller {
  private leaveWorkspace: LeaveWorkspace;

  constructor(leaveWorkspace: LeaveWorkspace) {
    this.leaveWorkspace = leaveWorkspace;
  }

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const validatedRequestParams = requestParamsSchema.safeParse(
      request.params,
    );
    if (!validatedRequestParams.success)
      return badRequest(validatedRequestParams.error.issues);

    const { account } = request as { account: User };

    const response = await this.leaveWorkspace.leave(
      account.id,
      validatedRequestParams.data.workspaceId,
    );

    if (!response) return forbidden();
    return ok();
  }
}
