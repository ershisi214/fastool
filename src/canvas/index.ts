/**
 * 判断浏览器是否支持webP格式图片
 * @export {function} isSupportWebP
 * @returns {boolean} 是否支持
 */
export function isSupportWebP() {
  return !![].map && document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') == 0;
}

/**
 * 获取图片base64Url
 * @description 获取图片的base64 url
 * @export {function} getImageBase64Url
 * @param {HTMLImageElement} image
 * @returns {string} base64 url
 */
export function getImageBase64Url(image: HTMLImageElement): string {
  const canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;
  const ctx = canvas.getContext('2d');
  ctx?.drawImage(image, 0, 0, image.width, image.height);
  const suffix = image.src.substring(image.src.lastIndexOf('.') + 1).toLowerCase();
  return canvas.toDataURL(`image/${suffix || 'png'}`, 1);
}

/**
 * 将颜色转rgba
 * @description 将颜色色值转rgba
 * @export {function} changeColorToRGBA
 * @param {string} color - 颜色色值
 * @returns {object} - rgba值
 */
export function changeColorToRGBA(color: string) {
  let canvas = (window as any).canvas;
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    (window as any).canvas = canvas;
  }
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 1, 1);
  const colorData = ctx.getImageData(0, 0, 1, 1).data;
  return {
    r: colorData[0],
    g: colorData[1],
    b: colorData[2],
    a: colorData[3],
  };
}