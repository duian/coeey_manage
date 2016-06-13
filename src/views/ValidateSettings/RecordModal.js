import React, { PropTypes } from 'react';
import { Modal, Form, Select, Switch, Input } from 'antd';
import options from 'Options';
import params from 'params';
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
    const { mandatory, isValid } = data;
    newData.isValid = isValid ? 1 : 0;
    // 数据库0是必填， 坑！
    newData.mandatory = mandatory ? 0 : 1;
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

  componentDidMount() {
    const { record } = this.props;
    if (record) {
      this.setState({ type: (record.fixType === 1 ? 'system' : 'limitQuota') });
    }
  }

  render() {
    const { visible, title, form, record, status } = this.props;
    const { getFieldProps } = form;

    // 表单项布局
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 16, offset: 1 },
    };
    // 校验
    // 贷款类型
    let loanTypeProps;
    // 验证项
    let nameProps;
    if (status === 'edit') {
      loanTypeProps = getFieldProps('loanType', {
        initialValue: record ? record.loanType : undefined,
      });

      nameProps = getFieldProps('name', {
        initialValue: record ? record.number : undefined,
      });
    } else {
      loanTypeProps = getFieldProps('loanType', {
        rules: [
          { required: true, message: '该项为必填项', type: 'number' },
        ],
        initialValue: record ? record.loanType : undefined,
      });

      nameProps = getFieldProps('name', {
        rules: [
          { required: true, message: '该项为必填项', type: 'number' },
        ],
        initialValue: record ? record.number : undefined,
      });
    }

    // 提额/降息
    const typeProps = getFieldProps('type', {
      rules: [
        { required: true, message: '该项为必填项', type: 'number' },
      ],
      initialValue: record ? record.type : undefined,
    });

    // 是否必填
    const mandatoryProps = getFieldProps('mandatory', {
      rules: [
        { required: true, message: '该项为必填项', type: 'boolean' },
      ],
      initialValue: record ? Boolean(!record.mandatory) : true,
      valuePropName: 'checked',
    });

    // 必填项描述
    const mandatoryInfoProps = getFieldProps('mandatoryInfo', {
      validate: [{
        rules: [
          { message: '描述长度不能超过10!', max: 10 },
        ],
        trigger: ['onBlur', 'onChange'],
      }, {
        rules: [
          { required: true, message: '该项为必填' },
        ],
        trigger: ['onBlur'],
      }],

      initialValue: record ? record.mandatoryInfo : undefined,
    });

    // 描述
    const infoProps = getFieldProps('info', {
      validate: [{
        rules: [
          { message: '描述长度不能超过25!', max: 25 },
        ],
        trigger: ['onBlur', 'onChange'],
      }],

      initialValue: record ? record.info : undefined,
    });

    // 有效期
    const effectiveDaysProps = getFieldProps('effectiveDays', {
      rules: [
        { required: true, message: '该项为必填项' },
      ],
      initialValue: record ? record.effectiveDays : undefined,
    });

    // 是否有效
    const isValidProps = getFieldProps('isValid', {
      rules: [
        { required: true, message: '该项为必填项', type: 'boolean' },
      ],
      initialValue: record ? Boolean(record.isValid) : true,
      valuePropName: 'checked',
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
            className={`validate-settings-add-modal ${status}`}
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
              label="验证项"
            >
              <Select
                {...nameProps}
                placeholder="请选择验证项"
                disabled={status === 'edit'}
              >
                {options(params.getItem('verifyType', { filter: '全部' }))}
              </Select>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="提额/降息"
            >
              <Select
                {...typeProps}
                placeholder="请选择提额或者降息"
              >
                {options(params.getItem('quotaStatus', { filter: '全部' }))}
              </Select>
            </FormItem>
            <FormItem
              label="是否必填"
              {...formItemLayout}
            >
              <Switch
                {...mandatoryProps}
              />
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="必填项描述"
            >
              <Input
                {...mandatoryInfoProps}
                type="text"
                placeholder="最多输入10个字符"
              />
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="描述"
            >
              <Input
                {...infoProps}
                type="text"
                placeholder="最多输入25个字符"
              />
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="有效期"
            >
              <Input
                {...effectiveDaysProps}
                type="number"
                placeholder="请输入有效期"
                style={{ width: 100, marginRight: 8 }}
              />
              <span className="ant-form-text">天</span>
            </FormItem>
            <FormItem
              label="是否有效"
              {...formItemLayout}
            >
              <Switch
                {...isValidProps}
              />
              <Input
                {...getFieldProps('number', {
                  initialValue: record ? record.number : undefined,
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
