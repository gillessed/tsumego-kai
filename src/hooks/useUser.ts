import { User } from "firebase/auth";
import { useAppContext } from "../context/AppContext";
import { UserQueryKey } from "../query/UserQueryKey";
import { useSubscription } from "./useSubscription";

export function useUser() {
  const { auth } = useAppContext();
  return useSubscription(
    UserQueryKey,
    (callback: (data: User | null) => void) => auth.onAuthStateChanged((data) => callback(data)),
  );
}
