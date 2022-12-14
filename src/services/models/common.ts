
export interface IReqHeader {
  ctxSn: string;
}

export interface IBaseReq<T> {
  header: IReqHeader;
  body: T;
};

export interface IResHeader {
  returnCode: string;
  returnMsg?: string;
}

export interface IBaseRes<T> {
  header: IResHeader;
  body: T;
};
