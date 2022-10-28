import {
  SAVE_CLASS,
  UPDATE_CLASS,
  CHANGE_TABLE_OPEN_STATUS,
  CHANGE_CUR_CLASS_LIST,
  SAVE_EMPTY,
  IS_EMPTY_STATUS,
  SAVE_USER_INFO
} from './constants';

const defaultState = {
  class_data: {},
  cur_ondata: '',
  cur_week: '',
  cur_bid: '',
  cur_key: '',
  open: false,
  // 空教室相关
  empty_data: {},
  isEmpty: false,
  // 用户相关
  userInfo: {}
}

let data,key,example;

function reducer(state = defaultState, action) {
  switch (action.type) {
    case SAVE_CLASS: // 保存 xx日 的课表信息
      data = action.data;
      example = data[0];
      if(example) {
        state.cur_ondata = example.ondata; // 保存当前查询日期 eg：2022-x-y
        state.cur_week = example.week; // 保存当前查询为周几 eg：周一 保存数字1
        state.cur_bid = parseInt(example.bid).toString(); // 保存当前被查询建筑的bid --- parseInt为了去掉数字前面的0
        state.cur_key = parseInt(example.bid) + '-' + example.ondata; // 教学楼编号和data进行拼装，作为唯一的属性key
      }
      state.class_data[state.cur_key] = data;
      return { ...state };

    case CHANGE_CUR_CLASS_LIST: // 保存当前点击的 建筑 的信息
      data = action.item;
      if(data) {
        state.cur_ondata = data.ondata; // 保存当前查询日期 eg：2022-x-y
        state.cur_week = data.week.toString(); // 保存当前查询为周几 eg：周一 保存数字1
        state.cur_bid = parseInt(data.bid).toString(); // 保存当前被查询建筑的bid
        state.cur_key = data.key;
      }
      // console.log(data)
      return { ...state };

    case CHANGE_TABLE_OPEN_STATUS: // 改变表格显示状态
      return { ...state, open: action.status };

    case IS_EMPTY_STATUS:
      return { ...state, isEmpty: action.status };

    case SAVE_EMPTY: // 保存 空闲教室 的信息
      data = action.data;
      example = data[0];
      if(example) {
        let key = example.bid + '-' + example.ondata
        state.empty_data[key] = data;
        state.cur_key = key;
      }
      return { ...state };

    case SAVE_USER_INFO:
      return { ...state, userInfo: action.user };

    default:
      return state;
  }
}

export default reducer;