

export  interface QueryBase {
  func: String;
  return: String;
}

export interface QueryFull {
  func: String,
  return: any,
  variable?: string,
  type?: String,
  paginatioin?: any,
  paginatioinType?: String,
  variables?: any,
  data?: any;
}


