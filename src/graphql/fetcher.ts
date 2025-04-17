import {GraphQLClient, gql} from 'graphql-request';
import jwtDecode, {JwtPayload} from 'jwt-decode';
import config from '~/config';
import {userDataStore} from '~/stores';

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

  if (token && isTokenExpired(token)) {
    const newTokenData = await getNewToken();
    if (newTokenData?.token) {
      userDataStore.setState({
        authData: {
          ...userDataStore.getState()?.authData,
          token: newTokenData.token,
          refreshToken: newTokenData.refreshToken,
          expireDate: newTokenData.expireDate,
          refreshTokenExpiryTime: newTokenData.refreshTokenExpiryTime,
        },
      });
      graphQLClient.setHeader('authorization', 'Bearer ' + newTokenData.token);
      return newTokenData.token;
    } else {
      throw new Error('Unable to refresh token');
    }
  }
}

async function getNewToken(): Promise<{
  token: string;
  refreshToken: string;
  expireDate: string;
  refreshTokenExpiryTime: string;
} | null> {
  const refreshToken = userDataStore.getState()?.authData?.refreshToken;

  if (!refreshToken) return null;

  const query = gql`
    mutation RefreshToken($refreshToken: String!) {
      user_refreshToken(input: {refreshToken: $refreshToken}) {
        result {
          token
          refreshToken
          expireDate
          refreshTokenExpiryTime
        }
        status
      }
    }
  `;

  try {
    const response = await graphQLClient.request(query, {refreshToken});
    const result = response?.user_refreshToken?.result;

    if (result?.token && result?.refreshToken) {
      return {
        token: result.token,
        refreshToken: result.refreshToken,
        expireDate: result.expireDate,
        refreshTokenExpiryTime: result.refreshTokenExpiryTime,
      };
    }

    return null;
  } catch (err) {
    console.error('Refresh token error:', err);
    return null;
  }
}

export const isTokenExpired = (token: string | null): boolean => {
  if (!token) {
    return true;
  }
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    return (decoded.exp ?? 0) < Date.now() / 1000;
  } catch (err) {
    console.error('Invalid token:', err);
    return true;
  }
};

// import {GraphQLClient} from 'graphql-request';
// import jwtDecode, {JwtPayload} from 'jwt-decode';
// import config from '~/config';
// import { userDataStore } from '~/stores';

// export const graphQLClient = new GraphQLClient(config.apiURL);

// export default graphQLClient;

// export async function graphqlFetcher(GQL: string, args?: any) {
//   return await graphQLClient.request(GQL, args);
// }

// export function fetcher<TData, TVariables>(
//   query: string,
//   variables?: TVariables,
// ) {
//   return async () => {
//     // console.log('Token: ', token);
//     await handleToken();
//     return await graphqlFetcher(query, variables);
//   };
// }

// export async function handleToken() {
//   const token = userDataStore.getState()?.authData?.token;
//   if (isTokenExpired(token)) {
//     // const idToken = await auth().currentUser?.getIdToken(true);
//     const newToken = await getNewToken();
//     // authStore.setState({token: idToken});
//     graphQLClient.setHeader('authorization', 'Bearer ' + newToken);
//     return token;
//   } else {
//     return token;
//   }
// }

// async function getNewToken() {
//   const refreshToken = userDataStore.getState()?.authData?.refreshToken;
//   return "";
// }

// export const isTokenExpired = (token: string | null): boolean => {
//   if (!token) return true;
//   const decoded = jwtDecode<JwtPayload>(token);
//   const isExpired = decoded.exp < Date.now() / 1000;

//   return isExpired;
// };
