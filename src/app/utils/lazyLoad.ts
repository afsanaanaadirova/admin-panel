import { lazy } from "react";

export const lazyLoad = <T>(path: string, namedExport?: keyof T | undefined) => {
  return lazy(() => {
    const promise = import(path);
    if (namedExport === undefined) {
      return promise;
    }
    return promise.then((module) => ({ default: module[namedExport] }));
  });
};