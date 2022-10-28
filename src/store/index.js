import { createStore } from 'redux';

import reducer from './reducer';

import {
  getToday
} from '../utils/date'

import { 
  getBuildClassData,
  getEmptyData
} from '../service/build'

import {
  saveClass,
  saveEmpty
} from './actionCreators'

const store = createStore(reducer);

let arr = ['1','2','3','4','5','6','7','8','9','10','11'];
let _data = getToday();

arr.forEach( item => {
  getBuildClassData(item,_data).then(res => {
    if(res.length) store.dispatch(saveClass(res))
  })
  getEmptyData(item,_data).then(res => {
    if(res.length) store.dispatch(saveEmpty(res))
  })
})


export default store;