import React from "react";
import {
  hashQueryKey,
  QueryKey,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "react-query";

interface Subscription {
  unsubscribe?: () => void;
  observerCount: number;
  sentInitialData: boolean;
}

const subscriptionsByQueryHash: Record<string, Subscription> = {};

type Unsubscribe = () => void;

export interface UseSubscriptionOptions {
  refetchOnMount?: boolean;
}

export function useSubscription<Data>(
  queryKey: QueryKey,
  subscribe: (callback: (data: Data | null) => void) => Unsubscribe,
  options?: UseSubscriptionOptions, 
): UseQueryResult<Data> {
  const queryHash = hashQueryKey(queryKey);
  const queryClient = useQueryClient();

  const query = async (): Promise<Data | null> => {
    const existingSubscription = subscriptionsByQueryHash[queryHash];
    if (existingSubscription == null) {
      const subscription: Subscription = {
        observerCount: 0,
        sentInitialData: false,
      };
      return new Promise((resolve: (data: Data | null) => void) => {
        const unsubscribe = subscribe((data: Data | null) => {
          if (!subscription.sentInitialData) {
            resolve(data);
            subscription.sentInitialData = true;
          } else {
            queryClient.setQueryData(queryKey, data);
          }
        });
        if (subscription.unsubscribe == null) {
          subscription.unsubscribe = unsubscribe;
          subscription.observerCount++;
        }
      });
    } else {
      existingSubscription.observerCount++;
      const currentValue =
        queryClient.getQueryData<Data | null>(queryKey) ?? null;
      return currentValue;
    }
  };

  React.useEffect(() => {
    return () => {
      const existingSubscription = subscriptionsByQueryHash[queryHash];
      if (existingSubscription == null) {
        return;
      }
      if (existingSubscription.observerCount <= 1) {
        existingSubscription.unsubscribe?.();
        delete subscriptionsByQueryHash[queryHash];
      } else {
        existingSubscription.observerCount--;
      }
    };
  });
  return useQuery({
    queryKey,
    queryFn: query,
    refetchOnMount: options?.refetchOnMount ?? false,
  });
}
