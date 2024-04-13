import LoadWorkspaceDetails from 'domain/usecases/LoadWorkspaceDetails';
import { badRequest, notFound, ok } from 'presentation/helpers/httpCodes';
import { Controller } from 'presentation/protocols/Controller';
import { IHttpRequest, IHttpResponse } from 'presentation/protocols/Http';
import { z } from 'zod';

const requestParamsSchema = z.object({
  workspaceId: z.string().min(1),
});

export default class GetWorkspaceDetailsController implements Controller {
  private loadWorkspaceDetails: LoadWorkspaceDetails;

  constructor(loadWorkspaceDetails: LoadWorkspaceDetails) {
    this.loadWorkspaceDetails = loadWorkspaceDetails;
  }

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const validatedRequestParams = requestParamsSchema.safeParse(
      request.params,
    );
    if (!validatedRequestParams.success)
      return badRequest(validatedRequestParams.error.issues);

    const { accountId } = request as { accountId: string };

    const workspaceDetails =
      await this.loadWorkspaceDetails.loadWorkspaceDetails(
        accountId,
        validatedRequestParams.data.workspaceId,
      );
    if (!workspaceDetails) return notFound();
    return ok(workspaceDetails);
  }
}
