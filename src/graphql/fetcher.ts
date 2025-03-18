import {GraphQLClient} from 'graphql-request';
import jwtDecode, {JwtPayload} from 'jwt-decode';
import config from '~/config';

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
    // console.log('Token: ', token);

    // if (isTokenExpired(token) && token) {
    //   const idToken = await auth().currentUser?.getIdToken(true);
    //   await storeData(TOKEN_KEY, idToken);
    //   setHeaderQuery(idToken);
    // }
    return await graphqlFetcher(query, variables);
  };
}

// export const isTokenExpired = (token: string | null): boolean => {
//   if (!token) return true;
//   const decoded = jwtDecode<JwtPayload>(token);
//   const isExpired = decoded.exp < Date.now() / 1000;

//   return isExpired;
// };
