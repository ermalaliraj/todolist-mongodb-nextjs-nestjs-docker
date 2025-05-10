//Deprecated
export const addParamToQuery = (queryParams, paramName, paramValue) => {
  if (paramValue) {
    queryParams += `&${paramName}=${encodeURIComponent(paramValue)}`
  }
  return queryParams
}

export const addSingleQueryParam = (paramName, paramValue) => {
  if (paramName && paramValue) {
    return `${encodeURIComponent(paramName)}=${encodeURIComponent(paramValue)}`;
  }
  return null;
};

export const buildQueryParams = (paramsArray) => {
  const paramCouples = paramsArray
    .map(({paramName, paramValue}) => addSingleQueryParam(paramName, paramValue))
    .filter(Boolean); // remove nulls

  return paramCouples.length ? paramCouples.join('&') : ''
}
