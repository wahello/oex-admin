
import * as UserAction from '../actions/UserAction';
import * as Authentication from '../core/Authentication';
import Immutable from 'immutable';
import userInfoStorage from '../core/UserInfoStorage';
import { redux } from 'amumu';
const ActionHandler = redux.ActionHandler;

const defaultState = Immutable.Map({
  isFetching: false,
  errMsg: '',
  userList: Immutable.Map({
    list: Immutable.List([
        // Immutable.Map({
        //   id: 1,
        //   userName: '王大锤',
        //   mobile: '1034923482',
        //   passWord: '18072321312',
        //   email: '123@qq.com',
        // }),
        // Immutable.Map({
        //   id: 2,
        //   userName: '王xiao锤',
        //   mobile: '1034923482',
        //   passWord: '18072321312',
        //   email: '123@qq.com',
        // }),
      ]),
      total: 0,
      currentPage: 1,
  }),
  searchData: Immutable.Map({
    id: '',
    user_mobile: '',
    user_email: '',
    pageNum: 1,
    pageSize: 10,
  })
});

const getUserListHandler = new ActionHandler.handleAction(UserAction.GET_C_USERLIST)
  .success((state, action) => {
    return state.setIn(['userList', 'list'], Immutable.fromJS(action.data.list))
      .setIn(['userList', 'total'], Immutable.fromJS(action.data.total))
      .setIn(['searchData', 'pageSize'], Immutable.fromJS(action.data.pageSize))
      .setIn(['searchData', 'pageNum'], Immutable.fromJS(action.data.pageNum))
      .set('isFetching', false).set('errMsg', '');
  });

// const getUserInfoHandler = new ActionHandler.handleAction(UserAction.GET_USERINFO)
//     .success((state, action) => {
//       return state.set('userInfo', Immutable.fromJS(action.data))
//         .set('isFetching', false).set('errMsg', '');
//     });



export default ActionHandler.handleActions(
  [
    getUserListHandler,
    // getUserInfoHandler,
  ],
  defaultState,
  /^UserReducer\//
);
