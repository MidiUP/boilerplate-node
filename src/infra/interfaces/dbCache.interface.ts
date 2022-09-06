export interface IDbCache {
  getDataByKey: (key: string) => Promise<any>;
  setData: (key: string, data: any) => Promise<void>;
  clearCacheByKey: (key: string) => Promise<void>;
}
