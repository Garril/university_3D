import {
  SAVE_CLASS,
  UPDATE_CLASS,
  CHANGE_TABLE_OPEN_STATUS,
  CHANGE_CUR_CLASS_LIST
} from './constants';

const defaultState = {
  class_data: {},
  cur_ondata: '',
  cur_week: '',
  cur_bid: '',
  cur_key: '',
  open: false,
}

let data,key,example;

function reducer(state = defaultState, action) {
  switch (action.type) {
    case SAVE_CLASS:
      data = action.data;
      console.log(data);
      example = data[0];
      if(example) {
        state.cur_ondata = example.ondata; // 保存当前查询日期 eg：2022-x-y
        state.cur_week = example.week.toString(); // 保存当前查询为周几 eg：周一 保存数字1
        state.cur_bid = example.bid.toString(); // 保存当前被查询建筑的bid
        state.cur_key = example.bid + '-' + example.ondata; // 教学楼编号和data进行拼装，作为唯一的属性key
      }
      state.class_data[state.cur_key] = data;
      return { ...state };

    case CHANGE_CUR_CLASS_LIST:
      data = action.item;
      if(data) {
        state.cur_ondata = data.ondata; // 保存当前查询日期 eg：2022-x-y
        state.cur_week = data.week.toString(); // 保存当前查询为周几 eg：周一 保存数字1
        state.cur_bid = data.bid.toString(); // 保存当前被查询建筑的bid
        state.cur_key = data.key;
      }
      return { ...state };

    case CHANGE_TABLE_OPEN_STATUS:
      return { ...state, open: action.status };
    

    case UPDATE_CLASS:
      data = action.data;
      return { ...state };

    default:
      return state;
  }
}

export default reducer;