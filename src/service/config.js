const devBaseURL = "/api";
const proBaseURL = "https://production.org";/* 开发环境服务器 */
export const BASE_URL = process.env.NODE_ENV === 'development' ? devBaseURL: proBaseURL;

export const TIMEOUT = 5000;
