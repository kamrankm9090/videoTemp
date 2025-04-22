import {GraphQLClient, gql} from 'graphql-request';
import config from '~/config';
import {
  TokenInput,
  User_RefreshTokenMutation,
  User_RefreshTokenMutationVariables,
} from '~/graphql/generated';
import {userDataStore} from '~/stores';
import {isTokenExpired} from '~/utils/utils';

export const graphQLClient = new GraphQLClient(config.apiURL);

export default graphQLClient;

export async function graphqlFetcher(GQL: string, args?: any) {
  return await graphQLClient.request(GQL, args);
}

export function fetcher<TData, TVariables>(
  query: string,
  variables?: TVariables,
) {
  return async () => {
    await handleToken();
    return await graphqlFetcher(query, variables);
  };
}

export async function handleToken() {
  const token = userDataStore.getState()?.authData?.token;
  const isUserLoggedIn = userDataStore.getState()?.isUserLoggedIn;

  console.log('token--->', token);

  if (isUserLoggedIn && isTokenExpired(token)) {
    console.log('yes is expired');
    try {
      await handleNewToken();
      return true;
    } catch (error) {
      console.log('error-->', error);
    }
  } else {
    console.log('jjjj');
    return true;
  }
}

export async function handleNewToken() {
  const refreshToken = userDataStore.getState()?.authData?.refreshToken;
  const accessToken = userDataStore.getState()?.authData?.token;

  if (!refreshToken) {
    return null;
  }

  try {
    const variables: TokenInput = {
      refreshToken,
      accessToken,
    };
    const response = await graphQLClient.request<
      User_RefreshTokenMutation,
      any,
      User_RefreshTokenMutationVariables,
      any
    >(refreshTokenQuery, {input: variables});
    const result = response?.user_refreshToken?.result;

    if (result?.token && result?.refreshToken) {
      userDataStore.setState({
        authData: {
          token: result?.token,
          refreshToken: result.refreshToken,
          expireDate: result.expireDate,
          refreshTokenExpiryTime: result.refreshTokenExpiryTime,
        },
      });

      return true;
    }
  } catch (err) {
    console.error('Refresh token error:', err);
    return null;
  }
}

const refreshTokenQuery = gql`
  mutation user_refreshToken($input: TokenInput) {
    user_refreshToken(input: $input) {
      result {
        token
        expireDate
        refreshToken
        refreshTokenExpiryTime
      }
      status
    }
  }
`;
