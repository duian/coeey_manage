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
    this.handleTableChange = this.handleTableChange.bind(this);
  }

  // 编辑记录
  handleEditRecord(record, e) {
    e.preventDefault();
    const { openModal } = this.props;
    openModal({ method: 'edit', record });
  }

  renderEditRecord(text, record) {
    return (
       <a href="#" onClick={this.handleEditRecord.bind(this, record)}>编辑</a>
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
        title: '验证项',
        dataIndex: 'verifyTypeStr',
      },
      {
        title: '提额/降息',
        dataIndex: 'typeStr',
      },
      {
        title: '是否必填',
        dataIndex: 'mandatoryStr',
      },
      {
        title: '必填项描述',
        dataIndex: 'mandatoryInfo',
      },
      {
        title: '描述',
        dataIndex: 'info',
      },
      {
        title: '有效期',
        dataIndex: 'effectiveDaysStr',
      },
      {
        title: '是否有效',
        dataIndex: 'isValidStr',
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
