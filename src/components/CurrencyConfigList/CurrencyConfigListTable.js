
import React, { PropTypes } from 'react';
import { Table, Popconfirm } from 'antd';
import { View } from 'isomorphic';
import Immutable from 'immutable';
import styles from '../../assets/stylesheets/Common.css';
import { push } from 'react-router-redux';
import * as RoutingURL from '../../core/RoutingURL/RoutingURL';

const propTypes = {
  dataSource: PropTypes.instanceOf(Immutable.List).isRequired,
  dispatch: PropTypes.func,
  deleteAction: PropTypes.func,
};

class CurrencyConfigListTable extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.columns = [{
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      width: 100,
    }, {
      title: '配置ID',
      dataIndex: 'id',
      key: 'id',
      width: 70,
    }, {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      width: 150,
    }];
  }
  _renderDataSource(datas) {
    const dataSource = [];
    if(datas) {
    const typeText = { 1: '热门问题', 2: '最新资讯', 3: '高分经验', 4: '报考指南', 5: '考试大纲', 6: '备考攻略'};
    datas.forEach((data, index) => {
      const sex = data.get('sex');
      dataSource.push({
        key: index,
        id: data.get('id'),
        type: typeText[data.get('type')],
        title: data.get('title'),
        updateTime: data.get('updateTime'),
        operation: (
          <View>
            <a
              onClick={(e) => {
                e.preventDefault();
                this.props.dispatch(push(RoutingURL.ExperienceDoctor(data.get('id'), true)));
              }}
            >
              编辑
            </a>&nbsp;&nbsp;&nbsp;
            <Popconfirm title="确认要删除该经验？"
              onConfirm={() => this.props.deleteAction({deleteId: data.get('id')})}
              okText="确认"
              cancelText="取消"
            >
              <a
                style={{color: '#f60'}}
              >
                删除
              </a>
            </Popconfirm>

          </View>
        ),
      });
    });
    }
    return dataSource;
  }
  showImg(img) {
    const views = [];
    if(img) {
      views.push(
        <img src={img} style={{ height: '40px', width: '40px' }} />
      );
    }
    return views;
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
CurrencyConfigListTable.propTypes = propTypes;

export default CurrencyConfigListTable;