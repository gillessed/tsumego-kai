export type AsyncEmpty = { type: "__empty__" };
export type AsyncLoading = { type: "__loading__" };
export type AsyncLoaded<T> = { type: "__loaded__"; value: T };
export type AsyncError = { type: "__error__"; error: string };
export type Async<T> = AsyncEmpty | AsyncLoading | AsyncLoaded<T> | AsyncError;

export const asyncEmpty: () => AsyncEmpty = () => ({ type: "__empty__" });
export const asyncLoading: () => AsyncLoading = () => ({ type: "__loading__" });
export const asyncError: (error: string) => AsyncError = (error: string) => ({
  type: "__error__",
  error,
});
export const asyncLoaded: <T>(value: T) => AsyncLoaded<T> = <T>(value: T) => ({
  type: "__loaded__",
  value,
});

export const isAsyncEmpty = <T>(async: Async<T>): async is AsyncEmpty =>
  async.type === "__empty__";
export const isAsyncLoading = <T>(async: Async<T>): async is AsyncLoading =>
  async.type === "__loading__";
export const isAsyncError = <T>(async: Async<T>): async is AsyncError =>
  async.type === "__error__";
export const isAsyncLoaded = <T>(async: Async<T>): async is AsyncLoaded<T> =>
  async.type === "__loaded__";

export const asyncHandler = <T>(
  setState: (state: Async<T>) => void,
  load: () => Promise<T>,
  updateStateOnCompletion?: boolean
) => {
  return () => {
    const asyncHandler = async () => {
      try {
        setState(asyncLoading());
        const result = await load();
        if (updateStateOnCompletion) {
          setState(asyncLoaded(result));
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error(error);
        setState(asyncError(error.message));
      }
    };
    asyncHandler();
  };
};
