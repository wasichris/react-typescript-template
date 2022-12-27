
export interface IBaseReq<T> {
  header: {
    ctxSn: string;
  };
  body: T;
};

export interface IBaseRes<T> {
  header: {
    returnCode: string;
    returnMsg?: string;
  };
  body: T;
};
