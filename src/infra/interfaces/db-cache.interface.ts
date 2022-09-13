export interface IDbCache {
  getDataByKey: (key: string) => Promise<any>;
  setData: (
    key: string,
    data: any,
    expirationSeconds: number,
  ) => Promise<void | Error>;
  clearCacheByKey: (key: string) => Promise<void | Error>;
}
