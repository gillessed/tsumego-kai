import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Async, asyncLoaded, asyncLoading } from "../utils/Async";

export function useUser() {
  const { auth } = useAppContext();
  const [user, setUser] = useState<Async<User | undefined>>(asyncLoading());
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(asyncLoaded(user ?? undefined));
    });
    return unsubscribe;
  }, [auth]);
  return user;
}
