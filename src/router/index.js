// 导入创建路由的函数
import { createHashRouter } from 'react-router-dom';
import routes from './routes';

// 创建router路由实例对象，并配置路由对应关系（路由数组）
const router = createHashRouter(routes);

export default router;
