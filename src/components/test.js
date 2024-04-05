import React from 'react';
//引入hooks文件中封装好的方法
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
// 拿到两个动作
import { changeId, changeName } from '@/redux/slice/stuSlice';

const Test = () => {
  const dispatch = useAppDispatch();
  const stu = useAppSelector((state) => state.stu);
  return (
    <div>
      <h1>{stu.name}</h1>
      <h1>{stu.id}</h1>
      <h1>{Object.values(stu)}</h1>
      <hr />
      <button onClick={() => dispatch(changeName('hello word'))}>
        修改名称
      </button>
      <button onClick={() => dispatch(changeId('123123'))}>修改ID</button>
    </div>
  );
};

export default Test;
