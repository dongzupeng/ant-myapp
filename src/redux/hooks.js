//此处对redux中的useDispatch, useSelector 进行二次封装方便项目中调用
import { useDispatch, useSelector } from 'react-redux';
// import type { AppDispatch, RootState } from './store'

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
