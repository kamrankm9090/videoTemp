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
    const ws = new WebSocket(config.apiURL, 'graphql-ws');

    ws.onopen = () => {
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

      if (
        res?.type !== 'ka' &&
        res.type === 'data' &&
        res?.payload?.data?.messages
      ) {
        queryClient.invalidateQueries(['live_getLiveComments'], {
          exact: false,
        });
        queryClient.refetchQueries(["community_getCommunityMessages.infinite"])
        
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
