import React from 'react';
import { Modal, Table } from 'antd';
import { debounce } from 'helper';

class PromptModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = debounce(this.handleSubmit.bind(this), 800);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleSubmit() {
    const { onSubmit } = this.props;
    onSubmit();
  }

  handleCancel() {
    const { onClose } = this.props;
    onClose();
  }

  renderPromptText() {
    const { status } = this.props;
    if (status === 'delete') {
      return (<p>确定要删除这条记录？</p>);
    } else if (status === 'edit' || status === 'add') {
      return (<p>已有同类型产品开关，请勿重复配置</p>);
    }
    return null;
  }

  render() {
    const columns = [
      {
        title: '贷款类型',
        dataIndex: 'loanTypeStr',
      },
      {
        title: '类型',
        dataIndex: 'type',
      },
      {
        title: '时间',
        dataIndex: 'paramName',
      },
      {
        title: '值',
        dataIndex: 'paramValue',
      },
      {
        title: '描述',
        dataIndex: 'paramDesc',
      },
    ];

    const { visible, records } = this.props;
    return (
      <Modal
        visible={visible}
        title={"提示"}
        onOk={this.handleSubmit}
        onCancel={this.handleCancel}
        width={720}
        wrapClassName="vertical-center-modal"
      >
        { this.renderPromptText()}
        <Table
          columns={columns}
          dataSource={records}
          rowKey={(record, index) => index}
          pagination={false}
          size="small"
        >
        </Table>
      </Modal>
    );
  }
}

export default PromptModal;
