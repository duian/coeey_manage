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

  render() {
    const columns = [
      {
        title: '贷款类型',
        dataIndex: 'loanTypeStr',
      },
      {
        title: '验证项',
        dataIndex: 'name',
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
        dataIndex: 'effectiveDays',
      },
      {
        title: '是否有效',
        dataIndex: 'isValidStr',
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
        <p>库中存在{records.length}条相似记录，是否覆盖？</p>
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
