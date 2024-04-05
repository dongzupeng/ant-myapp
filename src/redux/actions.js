//为了可以后期去更好的维护自己的代码，这边建议可以吧异步的操作放到action中专门来处理
// import { applyMiddleware, createAsyncThunk } from '@reduxjs/toolkit';

// export const myApi = createAsyncThunk('student', async () => {
//   const res = await api; //这边访你需要调取的接口
//   return res;
// });

// 注文：
// 在此单独对createAsyncThunk这个方法进行讲解
// createAsyncThunk这个中间件是用来处理异步操作的（副作用）
// 他有两个参数：
// 1、第一个参数传入的是一个字符串，这个地方类似去个名字
// 2、第二个参数是你要处理的异步，比如调接口的方法（你封装好的api）
// 这边写好相应的操作之后可以在相应的slice文件中去应用封装好的异步处理程序，slice中会监听这个异步
