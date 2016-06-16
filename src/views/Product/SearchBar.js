import React, { PropTypes } from 'react';
import { Form, Input, Row, Col, Button } from 'antd';
import { mergeObj } from 'helper';
import Block from 'Block';
const FormItem = Form.Item;

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddRecord = this.handleAddRecord.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ loading: true });
    const { form, query, onSearch } = this.props;
    const initPaginationSettings = { page: 1 };
    let fields = form.getFieldsValue();
    fields = mergeObj(initPaginationSettings, fields);
    const _query = mergeObj(query, fields);
    onSearch(_query)
    .then(() => this.setState({ loading: false }));
  }

  handleAddRecord() {
    const { openModal } = this.props;
    openModal({ method: 'add' });
  }

  render() {
    const { getFieldProps } = this.props.form;
    const { loading } = this.state;

    return (
      <Block>
        <Form
          horizontal
          onSubmit={this.handleSubmit}
        >
          <Row>
            <Col span="5">
              <FormItem
                label="系列"
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 14 }}
              >
                <Input
                  {...getFieldProps('label', {
                    initialValue: '',
                  })}
                  placeholder="请输入系列名称"
                />
              </FormItem>
            </Col>
            <Col span="5">
              <FormItem
                label="名称"
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 14 }}
              >
                <Input
                  {...getFieldProps('name', {
                    initialValue: '',
                  })}
                  placeholder="请输入产品名称"
                />
              </FormItem>
            </Col>
            <Col span="5">
              <FormItem
                label="编码"
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 14 }}
              >
                <Input
                  {...getFieldProps('code', {
                    initialValue: '',
                  })}
                  placeholder="请输入编码"
                />
              </FormItem>
            </Col>
            <Col span="7" offset="2">
              <Button type="primary" htmlType="submit" loading={loading}>搜索</Button>
              <Button type="primary" onClick={this.handleAddRecord}>新增</Button>
            </Col>
          </Row>
        </Form>
      </Block>
    );
  }
}

SearchBar.defaultProps = {
  query: {},
  onSearch: () => null,
  openModal: () => null,
};

SearchBar.PropsType = {
  query: PropTypes.object,
  onSearch: PropTypes.func,
  openModal: PropTypes.func,
};

SearchBar = Form.create({})(SearchBar);
export default SearchBar;
