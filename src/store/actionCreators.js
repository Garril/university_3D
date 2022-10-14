import {
  SAVE_CLASS,
  UPDATE_CLASS,
  CHANGE_TABLE_OPEN_STATUS,
  CHANGE_CUR_CLASS_LIST
} from './constants';

export const saveClass = (data) => ({
  type: SAVE_CLASS,
  data
});

export const updateClass = (data) => ({
  type: UPDATE_CLASS,
  data
});

export const changeCurClassList = (item) => ({
  type: CHANGE_CUR_CLASS_LIST,
  item
});

export const changeTabelOpenStatus = (status) => ({
  type: CHANGE_TABLE_OPEN_STATUS,
  status
});
