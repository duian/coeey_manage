import React, { PropTypes } from 'react';
import { Modal, Form, Select, Input, DatePicker } from 'antd';
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

    this.resetParamValue = this.resetParamValue.bind(this);
  }

  // 提交信息
  handleSubmit() {
    const { form, onValidate } = this.props;
    form.validateFields((errors, values) => {
      if (!!errors) {
        console.log('Errors in form!!!');
        return;
      }
      console.log(values);
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
    const { paramName, isValid } = data;
    newData.paramName = time.ymdWithDash(paramName);
    newData.isValid = isValid ? 1 : 0;
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

  resetParamValue() {
    const { form } = this.props;
    // form.resetFields(['paramValue']);
    form.setFieldsValue({ paramValue: undefined });
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

    // 表单项布局
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 16, offset: 1 },
    };
    // title
    const title = status === 'edit' ? '修改记录' : '新增记录';
    // 校验
    // 贷款类型
    let loanTypeProps;
    // 描述
    let paramDescProps;
    if (status === 'edit') {
      loanTypeProps = getFieldProps('loanType', {
        initialValue: record ? record.loanType : undefined,
      });

      paramDescProps = getFieldProps('paramDesc', {
        initialValue: record ? record.paramDescId : undefined,
      });
    } else {
      loanTypeProps = getFieldProps('loanType', {
        rules: [
          { required: true, message: '该项为必填项', type: 'number' },
        ],
        initialValue: record ? record.loanType : undefined,
      });

      paramDescProps = getFieldProps('paramDesc', {
        rules: [
          { required: true, message: '该项为必填项', type: 'number' },
        ],
        initialValue: record ? record.paramDescId : undefined,
        onChange: this.resetParamValue,
      });
    }

    // 时间
    const paramNameProps = getFieldProps('paramName', {
      rules: [
        { required: true, message: '该项为必填项', type: 'date' },
      ],
      initialValue: record ? new Date(record.paramName) : undefined,
    });

    // 值
    const paramValueProps = getFieldProps('paramValue', {
      rules: [
        { required: true, message: '该项为必填项' },
      ],
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
            className={`system-param-add-modal ${status}`}
          >
            <FormItem
              {...formItemLayout}
              label="贷款类型"
            >
              <Select
                {...loanTypeProps}
                placeholder="请选择贷款类型"
                disabled={status === 'edit'}
              >
                {options(params.getItem('loanType', { filter: '全部' }))}
              </Select>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="类型"
            >
              <Select
                {...paramDescProps}
                placeholder="请选择类型"
                disabled={status === 'edit'}
              >
                {options(params.getItem('paramDesc', { filter: '全部' }))}
              </Select>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="时间"
            >
              <DatePicker
                {...paramNameProps}
                format="yyyy-MM-dd"
                placeholder="请选择一个时间"
              />
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="值"
            >
              <Input
                {...paramValueProps}
                type="number"
                placeholder="如: 500"
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
