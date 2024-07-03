//https://polygon.io/docs/crypto/get_v2_aggs_ticker__cryptoticker__prev
export type polygonResponseType = {
  adjusted: boolean;
  queryCount: number;
  request_id: string;
  results: polygonData[];
  resultsCount: number;
  status: string;
  ticker: string;
};

export type polygonData = {
  T: string;
  c: number;
  h: number;
  l: number;
  o: number;
  t: number;
  v: number;
  vw: number;
};
