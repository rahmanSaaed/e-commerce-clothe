import {NgModule} from '@angular/core';
import {APOLLO_OPTIONS} from 'apollo-angular';
import {ApolloLink, DefaultOptions, InMemoryCache} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';
import { environment } from '../../../environments/environment';
import { setContext } from '@apollo/client/link/context';

const uri = environment.url;

export function createApollo(httpLink: HttpLink) {


  const basic = setContext((operation, context) => ({
    headers: {
      Accept: 'charset=utf-8'
    }
  }));

  // const auth = setContext((operation, context) => {
  //   console.log("localStorage.get('AUTH_TOKEN')", localStorage.get('AUTH_TOKEN'))
  //   const token = localStorage.get('AUTH_TOKEN') || null;

  //   if (token === null) {
  //     return {};
  //   } else {
  //     return {
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     };
  //   }
  // });


  const defaultOptions: DefaultOptions = {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'none',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'none',
    },
  }

  const link = ApolloLink.from([basic, httpLink.create({ uri })]);
  const cache = new InMemoryCache();


  return {
    link,
    cache,
    defaultOptions: defaultOptions,

  }
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule { }

