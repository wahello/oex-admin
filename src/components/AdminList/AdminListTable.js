
import React, { PropTypes } from 'react';
import { Table, Popconfirm } from 'antd';
import { View } from 'isomorphic';
import Immutable from 'immutable';
import styles from '../../assets/stylesheets/Common.css';
import { push } from 'react-router-redux';
import * as RoutingURL from '../../core/RoutingURL/RoutingURL';
import amumu from 'amumu';

const propTypes = {
  dataSource: PropTypes.instanceOf(Immutable.List).isRequired,
  dispatch: PropTypes.func,
  changeAction: PropTypes.func,
};
@amumu.redux.ConnectStore
class AdminListTable extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.columns = [{
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      width: 100,
    }, {
      title: '用户ID',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    }, {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
    }];
  }
  _renderDataSource(datas) {
    const dataSource = [];
    if(datas) {
    datas.forEach((data, index) => {
      const roleType = { 1: '超级用户', 2: '普通用户' };
      dataSource.push({
        key: index,
        id: data.get('id'),
        username: data.get('userName'),
        role: roleType[data.get('role')],
        operation: (
          <View>
            {data.get('role') === 2 ?
              <a
                style={{color: '#f60'}}
                onClick={(e) => {
                  e.preventDefault();
                  this.props.deleteUserAction({deleteId: data.get('id')});
                }}
              >
                删除
              </a> : ''
            }
          </View>
        ),
      });
    });
    }
    return dataSource;
  }
  render() {
    return (
      <View>
        <Table
          size="middle"
          columns={this.columns}
          dataSource={this._renderDataSource(this.props.dataSource)}
          pagination={false}
          bordered
          rowClassName={(record, index) => {
            if (index % 2 === 0) {
              return styles.rowColor;
            }
          }}
        />
      </View>
    );
  }
}
AdminListTable.propTypes = propTypes;

export default AdminListTable;
