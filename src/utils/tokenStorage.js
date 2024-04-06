/**
 * 设置缓存
 * @param {*} key
 * @param {*} value
 */
export function setCache(key, value) {
  if (value == undefined || value == null) {
    window.sessionStorage.setItem(key, value);
  } else {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  }
}
/**
 * 获取缓存
 * @param {*} key
 * @returns
 */
export function getCache(key) {
  if (
    window.sessionStorage.getItem(key) == 'undefined' ||
    window.sessionStorage.getItem(key) == null
  ) {
    return undefined;
  }
  return JSON.parse(window.sessionStorage.getItem(key));
}
/**
 * 移出
 * @param {*} key
 * @returns
 */
export function removeCache(key) {
  return window.sessionStorage.removeItem(key);
}
