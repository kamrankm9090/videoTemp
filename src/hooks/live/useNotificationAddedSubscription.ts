import {useQueryClient} from '@tanstack/react-query';
import {useEffect} from 'react';
import config from '~/config';
import {NotificationAddedDocument} from '~/graphql/generated';

export const useNotificationAddedSubscription = ({
  userId,
  callback,
}: {
  userId: number | undefined;
  callback?: () => void;
}) => {
  const queryClient = useQueryClient();
  useEffect(() => {
    console.log("hiii");
    
    const ws = new WebSocket(config.apiURL, 'graphql-ws');
    console.log(ws);

    ws.onopen = () => {
      console.log('connected');
      const message = {
        id: '1',
        type: 'start',
        payload: {
          variables: {userId: userId},
          extensions: {},
          operationName: null,
          query: NotificationAddedDocument,
        },
      };
      ws.send(JSON.stringify(message));
    };
    ws.onmessage = event => {
      const res = JSON.parse(event.data);
      console.log("res sub =>", res);
      
      if (
        res?.type !== 'ka' &&
        res.type === 'data' &&
        res?.payload?.data?.messages
      ) {
        queryClient.invalidateQueries(['live_getLiveComments'], {
          exact: false,
        });
      }
    };
    // ws.onmessage = callback;
    return () => {
      // Unsubscribe before exit
      ws.send(JSON.stringify({id: '1', type: 'stop'}));
      ws.close();
    };
  }, []);
};
