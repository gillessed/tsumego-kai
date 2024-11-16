import { useEffect, useRef } from "react";

export function useExternallyUpdatedRef<T>(propValue: T) {
  const ref = useRef(propValue);
  useEffect(() => {
    ref.current = propValue;
  }, [ref, propValue]);
  return ref;
}