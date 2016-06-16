import React, { PropTypes } from 'react';
import { Table } from 'antd';
import Block from 'Block';

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
    this.renderEditRecord = this.renderEditRecord.bind(this);
    this.handleDeleteRecord = this.handleDeleteRecord.bind(this);
    this.handleTableChange = this.handleTableChange.bind(this);
  }

  // 编辑记录
  handleEditRecord(record, e) {
    e.preventDefault();
    const { openModal } = this.props;
    openModal({ method: 'edit', record });
  }

  // 删除记录
  handleDeleteRecord(record, e) {
    e.preventDefault();
    const { openModal } = this.props;
    openModal({ method: 'delete', record });
  }

  renderEditRecord(text, record) {
    return (
      <span>
       <a href="#" onClick={this.handleEditRecord.bind(this, record)}>编辑</a>
       <span className="ant-divider"></span>
       <a href="#" onClick={this.handleDeleteRecord.bind(this, record)}>删除</a>
      </span>
    );
  }

  // 分页或者切换每页显示数量
  handleTableChange(pagination) {
    this.setState({ loading: true });

    const { query, onPagination } = this.props;
    const { pageSize, current } = pagination;
    query.pageSize = pageSize;
    query.pageNo = current;
    onPagination(query)
    .then(() => this.setState({ loading: false }));
  }

  render() {
    const {
      loading,
    } = this.state;
    const {
      records,
      query,
    } = this.props;
    const pagination = {
      total: query.total,
      current: query.pageNo,
      pageSize: query.pageSize,
      pageSizeOptions: ['50', '100', '150'],
      showSizeChanger: true,
    };
    const columns = [
      {
        title: '编号',
        dataIndex: 'number',
        width: 30,
      },
      {
        title: '贷款类型',
        dataIndex: 'loanTypeStr',
      },
      {
        title: '所属渠道',
        dataIndex: 'channelIdStr',
      },
      {
        title: '银行名称',
        dataIndex: 'bankIdStr',
      },
      {
        title: '银行卡类型',
        dataIndex: 'bankCardTypeStr',
      },
      {
        title: '维护类型',
        dataIndex: 'fixTypeStr',
      },
      {
        title: '备注',
        dataIndex: 'comment',
      },
      {
        title: '是否短信推送',
        dataIndex: 'msgSendStr',
      },
      {
        title: '操作人',
        dataIndex: 'operator',
      },
      {
        title: '操作时间',
        dataIndex: 'operateTime',
      },
      {
        title: '操作',
        render: this.renderEditRecord,
      },
    ];
    return (
      <Block>
        <Table
          columns={columns}
          dataSource={records}
          rowKey={(record, index) => index}
          pagination={pagination}
          loading={loading}
          onChange={this.handleTableChange}
        >
        </Table>
      </Block>
    );
  }
}

Content.defaultProps = {
  records: [],
  query: {},
  loading: false,
  onPagination: () => null,
  openModal: () => null,
};

Content.propTypes = {
  records: PropTypes.array,
  query: PropTypes.object,
  loading: PropTypes.bool,
  onPagination: PropTypes.func,
  openModal: PropTypes.func,
};

export default Content;
