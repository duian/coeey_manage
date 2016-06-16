import React, { PropTypes } from 'react';
import { Form, Select, Row, Col, Button } from 'antd';
import params from 'params';
import { mergeObj } from 'helper';
import Block from 'Block';
import options from 'Options';
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
    const initPaginationSettings = { pageNo: 1 };
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
                label="验证项"
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 14 }}
              >
                <Select
                  {...getFieldProps('verifyType', {
                    initialValue: -1,
                    id: 'verifyType',
                  })}
                >
                  {options(params.getItem('verifyType'))}
                </Select>
              </FormItem>
            </Col>
            <Col span="5">
              <FormItem
                label="贷款类型"
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 14 }}
              >
                <Select
                  {...getFieldProps('loanType', {
                    initialValue: -1,
                    id: 'loanType',
                  })}
                >
                  {options(params.getItem('loanType'))}
                </Select>
              </FormItem>
            </Col>
            <Col span="7" offset="7">
              <Button type="primary" htmlType="submit" loading={loading}>搜索</Button>
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
