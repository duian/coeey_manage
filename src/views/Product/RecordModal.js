import React, { PropTypes } from 'react';
import { Modal, Form, Select, Radio, Switch, Input, DatePicker } from 'antd';
import options from 'Options';
import params from 'params';
import time from 'time';
import { mergeObj, debounce } from 'helper';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
class RecordModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'system',
    };

    this.setType = this.setType.bind(this);
    this.getFormItemValue = this.getFormItemValue.bind(this);
    this.handlePushText = this.handlePushText.bind(this);
    this.handleSubmit = debounce(this.handleSubmit.bind(this), 800);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleParams = this.handleParams.bind(this);
  }

  // 设置维护类型
  setType(e) {
    if (e.target.value === 1) {
      return this.setState({ type: 'system' });
    }
    return this.setState({ type: 'limitQuota' });
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

  // 短信推送文案
  handlePushText() {
    const { type } = this.state;
    let placeholder;

    let bankId = this.getFormItemValue('bankId');
    if (!bankId) {
      bankId = 'xx银行';
    } else {
      bankId = params.getName('bankId', bankId);
    }
    let startAt = this.getFormItemValue('startAt');
    if (!startAt) {
      startAt = 'xx日';
    } else {
      startAt = time.ymdhm(startAt);
    }
    let endAt = this.getFormItemValue('endAt');
    if (!endAt) {
      endAt = 'xx日';
    } else {
      endAt = time.ymdhm(endAt);
    }
    let quotaOfDeduct = this.getFormItemValue('quotaOfDeduct');
    if (!quotaOfDeduct) {
      quotaOfDeduct = 'xx元';
    }

    if (type === 'system' || undefined) {
      placeholder = `${bankId}将于${startAt} - ${endAt}进行系统维护，期间将会影响您正常还款，建议您及时进行换卡。`;
    } else {
      placeholder = `${bankId}即日起单笔限额调整至${quotaOfDeduct}元/笔，为不影响您正常还款，建议您更换还款卡。`;
    }
    return placeholder;
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
    const { type } = this.state;
    const placeholder = this.handlePushText();
    const title = status === 'edit' ? '修改记录' : '新增记录';
    // 表单项布局
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 16, offset: 1 },
    };
    // 校验
    // 贷款类型
    let loanTypeProps;
    // 所属渠道
    let channelIdProps;
    // 银行名称
    let bankIdProps;
    // 银行卡类型
    let bankCardTypeProps;
    // 维护类型
    let fixTypeProps;

    if (status === 'edit') {
      loanTypeProps = getFieldProps('loanType', {
        initialValue: record ? record.loanType : undefined,
      });

      channelIdProps = getFieldProps('channelId', {
        initialValue: record ? record.channelId : undefined,
      });

      bankIdProps = getFieldProps('bankId', {
        initialValue: record ? record.bankId : undefined,
      });

      bankCardTypeProps = getFieldProps('bankCardType', {
        initialValue: record ? record.bankCardType : undefined,
      });

      fixTypeProps = getFieldProps('fixType', {
        initialValue: record ? record.fixType : 1,
        onChange: this.setType,
      });
    } else {
      loanTypeProps = getFieldProps('loanType', {
        rules: [
          { required: true, message: '该项为必填项', type: 'number' },
        ],
        initialValue: record ? record.loanType : undefined,
      });

      channelIdProps = getFieldProps('channelId', {
        rules: [
          { required: true, message: '该项为必填项', type: 'number' },
        ],
        initialValue: record ? record.channelId : undefined,
      });

      bankIdProps = getFieldProps('bankId', {
        rules: [
          { required: true, message: '该项为必填项', type: 'number' },
        ],
        initialValue: record ? record.bankId : undefined,
      });

      bankCardTypeProps = getFieldProps('bankCardType', {
        rules: [
          { required: true, message: '该项为必填项', type: 'number' },
        ],
        initialValue: record ? record.bankCardType : undefined,
      });

      fixTypeProps = getFieldProps('fixType', {
        rules: [
          { required: true, message: '该项为必填项', type: 'number' },
        ],
        initialValue: record ? record.fixType : 1,
        onChange: this.setType,
      });
    }


    // 每笔限额
    let quotaOfDeductProps = getFieldProps('quotaOfDeduct', {
      validate: [{
        rules: [
          { required: true, message: '该项为必填项' },
        ],
        trigger: 'onBlur',
      }],
      initialValue: record && record.quotaOfDeduct ? record.quotaOfDeduct : undefined,
    });

    // 每日限额
    let quotaDeductPerdayProps = getFieldProps('quotaDeductPerday', {
      initialValue: record && record.quotaDeductPerDay ? record.quotaDeductPerDay : undefined,
    });

    // 维护起始时间
    let startAtProps = getFieldProps('startAt', {
      rules: [
        { required: true, message: '该项为必填项', type: 'date' },
      ],
      initialValue: record && record.startAt ? new Date(record.startAt) : undefined,
    });

    // 维护结束时间
    let endAtProps = getFieldProps('endAt', {
      rules: [
        { required: true, message: '该项为必填项', type: 'date' },
      ],
      initialValue: record && record.endAt ? new Date(record.endAt) : undefined,
    });

    // 是否短信推送
    const msgSendProps = getFieldProps('msgSend', {
      rules: [
        { required: true, message: '该项为必填项', type: 'boolean' },
      ],
      initialValue: record ? record.msgSend : true,
      valuePropName: 'checked',
    });

    const startAtItem = () => (
      <FormItem
        {...formItemLayout}
        label="维护起始时间"
        key="startAt"
      >
        <DatePicker
          {...startAtProps}
          showTime
          format="yyyy-MM-dd HH:mm:ss"
          placeholder="请选择维护起始时间"
        />
      </FormItem>
    );

    const endAtItem = () => (
      <FormItem
        {...formItemLayout}
        label="维护结束时间"
        placeholder="请选择维护结束时间"
        key="endAt"
      >
        <DatePicker
          {...endAtProps}
          showTime
          format="yyyy-MM-dd HH:mm:ss"
        />
      </FormItem>
    );

    const quotaOfDeductItem = () => (
      <FormItem
        {...formItemLayout}
        label="每笔限额"
        key="quotaOfDeduct"
      >
        <Input
          {...quotaOfDeductProps}
          placeholder="请输入每笔限额"
          type="number"/>
      </FormItem>
    );

    const quotaDeductPerdayItem = () => (
      <FormItem
        {...formItemLayout}
        label=" 每日限额"
        key="quotaDeductPerday"
      >
        <Input
          {...quotaDeductPerdayProps}
          placeholder="请输入每日限额"
          type="number"
        />
      </FormItem>
    );

    // 根据type, 来显示系统或者限额维护
    let uniqItem;
    if (type === 'system' || type === undefined) {
      quotaOfDeductProps = getFieldProps('quotaOfDeduct', {
        validate: [{
          rules: [
            { required: false },
          ],
          initialValue: undefined,
        }],
      });
      quotaDeductPerdayProps = getFieldProps('quotaDeductPerday', {
        initialValue: record && record.quotaDeductPerDay ? record.quotaDeductPerDay : undefined,
      });
      uniqItem = [startAtItem(), endAtItem()];
    } else {
      startAtProps = getFieldProps('startAt', {
        rules: [
          { required: false },
        ],
        initialValue: undefined,
      });

      // 维护结束时间
      endAtProps = getFieldProps('endAt', {
        rules: [
          { required: false },
        ],
        initialValue: undefined,
      });
      uniqItem = [quotaOfDeductItem(), quotaDeductPerdayItem()];
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
              label="所属渠道"
            >
              <Select
                {...channelIdProps}
                placeholder="请选择所属渠道"
                disabled={(status === 'edit')}
              >
                {options(params.getItem('channelId', { filter: '全部' }))}
              </Select>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="银行名称"
            >
              <Select
                {...bankIdProps}
                placeholder="请选择银行名称"
                disabled={(status === 'edit')}
              >
                  {options(params.getItem('bankId', { filter: '全部' }))}
              </Select>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="银行卡类型"
            >
              <Select
                {...bankCardTypeProps}
                placeholder="请选择银行卡类型"
                disabled={(status === 'edit')}
              >
                {options(params.getItem('bankCardType', { filter: '全部' }))}
              </Select>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="维护类型"
            >
              <RadioGroup
                {...fixTypeProps}
                disabled={(status === 'edit')}
                placeholder="请选择维护类型"
              >
                <Radio value={1}>系统维护</Radio>
                <Radio value={2}>限额维护</Radio>
              </RadioGroup>
            </FormItem>
            {uniqItem}
            <FormItem
              label="是否短信推送"
              {...formItemLayout}
            >
              <Switch
                {...msgSendProps}
              />
            </FormItem>
            <FormItem
              label="短信推送文案"
              {...formItemLayout}
            >
              <Input
                type="textarea"
                name="textarea"
                id="textarea"
                placeholder={placeholder}
                disabled
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
