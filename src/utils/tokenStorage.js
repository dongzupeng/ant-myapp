/**
 * 设置缓存
 * @param {*} key
 * @param {*} value
 */
export function setCache(key, value) {
  if (value == undefined || value == null) {
    window.localStorage.setItem(key, value);
  } else {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
}
/**
 * 获取缓存
 * @param {*} key
 * @returns
 */
export function getCache(key) {
  if (
    window.localStorage.getItem(key) == 'undefined' ||
    window.localStorage.getItem(key) == null
  ) {
    return undefined;
  }
  return JSON.parse(window.localStorage.getItem(key));
}
/**
 * 移出
 * @param {*} key
 * @returns
 */
export function removeCache(key) {
  return window.localStorage.removeItem(key);
}
