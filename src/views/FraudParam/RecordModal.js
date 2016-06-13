import React, { PropTypes } from 'react';
import { Modal, Form, Select, Input } from 'antd';
import options from 'Options';
import params from 'params';
import time from 'time';
import { mergeObj, debounce } from 'helper';

const FormItem = Form.Item;
class RecordModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'system',
    };

    this.getFormItemValue = this.getFormItemValue.bind(this);
    this.handleSubmit = debounce(this.handleSubmit.bind(this), 800);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleParams = this.handleParams.bind(this);

    this.checkParamValue = this.checkParamValue.bind(this);
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
    const { fixType, startAt, endAt } = data;
    if (fixType === 1) {
      newData.startAt = time.ymdhms(startAt);
      newData.endAt = time.ymdhms(endAt);
    }
    newData = mergeObj(data, newData);
    return newData;
  }

  getFormItemValue(name) {
    // input or record
    const { form, record } = this.props;
    // 初始化时会报错，使用try跳过
    try {
      const item = form.getFieldValue(name);
      if (item) {
        return item;
      }
      return record[name];
    } catch (e) {
      return null;
    }
  }

  checkParamValue(rule, value, callback) {
    const isValid = /^[\d*,]*$/.test(value);
    if (value && !isValid) {
      callback(new Error('多个值请以英文逗号分隔，如1,2,3'));
    } else {
      callback();
    }
  }

  componentDidMount() {
    const { record } = this.props;
    if (record) {
      this.setState({ type: (record.fixType === 1 ? 'system' : 'limitQuota') });
    }
  }

  render() {
    const { visible, title, form, record, status } = this.props;
    const { getFieldProps } = form;
    // const { type } = this.state;

    // 表单项布局
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 16, offset: 1 },
    };
    // 校验
    // 贷款类型
    let loanTypeProps;
    // 需求名称
    let paramNameProps;
    // 需求描述
    let paramDescProps;
    if (status === 'edit') {
      loanTypeProps = getFieldProps('loanType', {
        initialValue: record ? record.loanType : undefined,
      });

      paramNameProps = getFieldProps('paramName', {
        initialValue: record ? record.paramName : undefined,
      });

      paramDescProps = getFieldProps('paramDesc', {
        initialValue: record ? record.paramDesc : undefined,
      });
    } else {
      loanTypeProps = getFieldProps('loanType', {
        rules: [
          { required: true, message: '该项为必填项', type: 'number' },
        ],
        initialValue: record ? record.loanType : undefined,
      });

      paramNameProps = getFieldProps('paramName', {
        rules: [
          { required: true, message: '该项为必填项' },
        ],
        initialValue: record ? record.paramName : undefined,
      });

      paramDescProps = getFieldProps('paramDesc', {
        rules: [
          { required: true, message: '该项为必填项' },
        ],
        initialValue: record ? record.paramDesc : undefined,
      });
    }

    // 值
    const paramValueProps = getFieldProps('paramValue', {
      validate: [{
        rules: [
          { required: true, message: '该项为必填项' },
        ],
        trigger: 'onBlur',
      }, {
        rules: [
          { message: '' },
          { validator: this.checkParamValue },
        ],
        trigger: ['onBlur', 'onChange'],
      }],
      initialValue: record ? record.paramValue : undefined,
    });
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
            className={`fraud-system-add-modal ${status}`}
          >
            <FormItem
              {...formItemLayout}
              label="贷款类型"
            >
              <Select
                {...loanTypeProps}
                placeholder="请选择贷款类型"
              >
                {options(params.getItem('loanType', { filter: '全部' }))}
              </Select>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="需求名称"
            >
              <Input
                {...paramNameProps}
                placeholder="请输入需求名称"
                type="text"
                disabled={(status === 'edit')}
              />
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="需求描述"
            >
              <Input
                {...paramDescProps}
                placeholder="请输入需求描述"
                type="text"
                disabled={(status === 'edit')}
                />
            </FormItem>
            <FormItem
                label="值"
                {...formItemLayout}
              >
              <Input
                {...paramValueProps}
                placeholder="请输入值"
                type="text"
              />
              <Input
                {...getFieldProps('uid', {
                  initialValue: record ? record.uid : undefined,
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
