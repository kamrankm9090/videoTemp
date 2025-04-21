import {GraphQLClient, gql} from 'graphql-request';
import jwtDecode, {JwtPayload} from 'jwt-decode';
import config from '~/config';
import {userDataStore} from '~/stores';
import {TokenInput} from '~/graphql/generated';

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

  if (isUserLoggedIn && isTokenExpired(token)) {
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
      setHeader(newTokenData.token);
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
  const accessToken = userDataStore.getState()?.authData?.token;

  if (!refreshToken) {
    return null;
  }

  const query = gql`
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

  try {
    const variables: TokenInput = {
      refreshToken,
      accessToken,
    };
    console.log('variables---->', variables);
    const response = await graphQLClient.request(query, {input: variables});
    console.log('rrrr---->', response);
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

export function setHeader(token: string) {
  graphQLClient.setHeader('authorization', 'Bearer ' + token);
}

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
