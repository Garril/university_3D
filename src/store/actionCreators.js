import {
  SAVE_CLASS,
  UPDATE_CLASS,
  CHANGE_TABLE_OPEN_STATUS,
  CHANGE_CUR_CLASS_LIST,
  SAVE_EMPTY,
  IS_EMPTY_STATUS,
  SAVE_USER_INFO
} from './constants';

export const saveClass = (data) => ({
  type: SAVE_CLASS,
  data
});

export const updateClass = (data) => ({
  type: UPDATE_CLASS,
  data
});

export const saveEmpty = (data) => ({
  type: SAVE_EMPTY,
  data
})

export const changeCurClassList = (item) => ({
  type: CHANGE_CUR_CLASS_LIST,
  item
});
// 排课列表是否打开
export const changeTabelOpenStatus = (status) => ({
  type: CHANGE_TABLE_OPEN_STATUS,
  status
});
// 空闲教室列表是否打开
export const changeEmptyTableStatus = (status) => ({
  type: IS_EMPTY_STATUS,
  status
})
// 保存用户信息
export const saveUserInfo = (user) => ({
  type: SAVE_USER_INFO,
  user
})