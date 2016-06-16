import React, { PropTypes } from 'react';
import { Modal, Form, Input } from 'antd';
import { mergeObj } from 'helper';

const FormItem = Form.Item;
class RecordModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'system',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleParams = this.handleParams.bind(this);
  }

  // 提交信息
  handleSubmit() {
    const { form, onValidate } = this.props;
    form.validateFields((errors, values) => {
      if (!!errors) {
        console.log('Errors in form!!!');
        return;
      }
      // console.log(values);
      const data = this.handleParams(values);
      onValidate(data);
      // console.log(data);
    });
  }

  // 关闭弹出层
  // 重置表单数据， 初始化Type设置false
  handleCancel() {
    const { form, onClose } = this.props;
    form.resetFields();
    onClose();
  }

  // 格式化参数
  handleParams(data) {
    let newData = {};
    newData = mergeObj(data, newData);
    return newData;
  }

  componentDidMount() {
    const { record } = this.props;
    if (record) {
      this.setState({ type: (record.fixType === 1 ? 'system' : 'limitQuota') });
    }
  }

  render() {
    const { visible, form, record, status } = this.props;
    const { getFieldProps } = form;
    const title = status === 'edit' ? '修改记录' : '新增记录';
    // 表单项布局
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 16, offset: 1 },
    };
    // 校验
    // 系列
    let labelProps;
    // 名称
    let nameProps;
    // 规格
    let formatProps;
    // 编码
    let codeProps;
    // 成本
    let costProps;
    // 库存
    let countProps;

    if (status === 'edit') {
      labelProps = getFieldProps('label', {
        initialValue: record ? record.label : undefined,
      });

      nameProps = getFieldProps('name', {
        initialValue: record ? record.name : undefined,
      });

      formatProps = getFieldProps('format', {
        initialValue: record ? record.format : undefined,
      });

      codeProps = getFieldProps('code', {
        initialValue: record ? record.code : undefined,
      });

      costProps = getFieldProps('cost', {
        initialValue: record ? record.cost : undefined,
      });

      countProps = getFieldProps('count', {
        initialValue: record ? record.count : undefined,
      });
    } else {
      labelProps = getFieldProps('label', {
        rules: [
          { required: true, message: '该项为必填项' },
        ],
        initialValue: record ? record.label : undefined,
      });

      nameProps = getFieldProps('name', {
        rules: [
          { required: true, message: '该项为必填项' },
        ],
        initialValue: record ? record.name : undefined,
      });

      formatProps = getFieldProps('format', {
        rules: [
          { required: true, message: '该项为必填项' },
        ],
        initialValue: record ? record.format : undefined,
      });

      codeProps = getFieldProps('code', {
        rules: [
          { required: true, message: '该项为必填项' },
        ],
        initialValue: record ? record.code : undefined,
      });

      costProps = getFieldProps('cost', {
        rules: [
          { required: true, message: '该项为必填项' },
        ],
        initialValue: record ? record.cost : undefined,
      });

      countProps = getFieldProps('count', {
        rules: [
            { required: true, message: '该项为必填项' },
        ],
        initialValue: record ? record.count : undefined,
      });
    }

    return (
      <div>
        <Modal
          title={title}
          visible={visible}
          onOk={this.handleSubmit}
          onCancel={this.handleCancel}
        >
          <Form
            horizontal
            form={this.props.form}
            onSubmit={this.handleSubmit}
            className={`bank-channel-add-modal ${status}`}
          >
            <FormItem
              {...formItemLayout}
              label="系列"
            >
              <Input
                {...labelProps}
                type="text"
                placeholder="请输入系列名，比如神仙水"
              />
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="名称"
            >
              <Input
                {...nameProps}
                type="text"
                placeholder="请输入名称，比如希芸肌初美容液"
              />
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="规格"
            >
              <Input
                {...formatProps}
                type="text"
                placeholder="请输入产品规格，如100ml"
              />
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="编码"
            >
              <Input
                {...codeProps}
                type="text"
                placeholder="请输入编码，比如SX20008"
              />
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="成本"
            >
              <Input
                {...costProps}
                type="number"
                placeholder="请输入成本，比如100"
              />
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="库存"
            >
              <Input
                {...countProps}
                type="text"
                placeholder="请输入数量，比如10"
              />
              <Input
                {...getFieldProps('_id', {
                  initialValue: record ? record._id : undefined,
                })}
                type="hidden"
              />
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

RecordModal.defaultProps = {
  visible: false,
  title: '新增记录',
  status: 'add',
  record: null,
  onClose: () => null,
};

RecordModal.propTypes = {
  visible: PropTypes.bool,
  title: PropTypes.string,
  status: PropTypes.string,
  record: PropTypes.object,
  onClose: PropTypes.func,
};

RecordModal = Form.create({})(RecordModal);

export default RecordModal;
