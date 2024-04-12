import { WorkspaceRoles } from '@/domain/models/WorkspaceRoles';
import { User } from '@prisma/client';
import ChangeUserRoleInWorkspace from 'domain/usecases/ChangeUserRoleInWorkspace';
import { badRequest, forbidden, ok } from 'presentation/helpers/httpCodes';
import { Controller } from 'presentation/protocols/Controller';
import { IHttpRequest, IHttpResponse } from 'presentation/protocols/Http';
import { z } from 'zod';

const requestParamsSchema = z.object({
  workspaceId: z.string().min(1),
});

const requestBodySchema = z.object({
  userEmail: z.string().min(1),
  role: z.nativeEnum(WorkspaceRoles).default(WorkspaceRoles.DEFAULT),
});

export default class PutUserRoleInWorkspaceController implements Controller {
  private changeUserRoleInWorkspace: ChangeUserRoleInWorkspace;

  constructor(changeUserRoleInWorkspace: ChangeUserRoleInWorkspace) {
    this.changeUserRoleInWorkspace = changeUserRoleInWorkspace;
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

    const { account } = request as { account: User };

    const response = await this.changeUserRoleInWorkspace.changeRole(
      account,
      validatedRequestParams.data.workspaceId,
      {
        email: validatedRequestBody.data.userEmail,
        role: validatedRequestBody.data.role,
      },
    );

    if (!response) return forbidden();
    return ok();
  }
}
