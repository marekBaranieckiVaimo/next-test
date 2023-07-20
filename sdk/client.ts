import {
  ClientBuilder,
  Client
} from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ApiRoot } from '@commercetools/platform-sdk';

type ByProjectKeyRequestBuilder = ReturnType<ApiRoot['withProjectKey']>;

let apiRootCache: null | ByProjectKeyRequestBuilder  = null;

export const client = () => {
    if(apiRootCache) {
        return apiRootCache;
    }

    const scopes = process.env.CTP_SCOPES as string;
    const clientId = process.env.CTP_CLIENT_ID as string;
    const clientSecret = process.env.CTP_CLIENT_SECRET as string;
    const authHost = process.env.CTP_AUTH_URL as string;
    const apiHost = process.env.CTP_API_URL as string;
    const projectKey = process.env.CTP_PROJECT_KEY as string;
  
    apiRootCache = createApiBuilderFromCtpClient(new ClientBuilder()
      .withClientCredentialsFlow({
        projectKey,
        host: authHost,
        credentials: {
          clientId,
          clientSecret
        },
        scopes: scopes.split(' ')
      })
      .withHttpMiddleware({host: apiHost})
      .build())
      .withProjectKey({ projectKey });

    return apiRootCache;
}