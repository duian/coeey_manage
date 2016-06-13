import React from 'react';
import { Form, Input, Button, Icon, message } from 'antd';
import auth from 'auth';
import url from 'url';
import request from 'superagent-bluebird-promise';
import { handleStatus, getErrorMsg } from 'webApi';
import './_login';

const FormItem = Form.Item;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      owlClassArray: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.loginPromise = this.loginPromise.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  loginPromise(data) {
    return request
    .post(`${url.login}`)
    .withCredentials()
    .send(data);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        console.log('Errors in form!!!');
        return;
      }
      this.loginPromise(values)
      .then(handleStatus)
      .then(() => auth.login({}, this.context.router))
      .catch((err) => message.error(getErrorMsg(err)));
    });
  }

  handleFocus(e) {
    e.preventDefault();
    this.setState({
      owlClassArray: 'password',
    });
  }

  handleBlur(e) {
    e.preventDefault();
    this.setState({
      owlClassArray: '',
    });
  }

  render() {
    // 等价于const getFieldProps = this.props.form.getFieldProps;
    const { getFieldProps } = this.props.form;
    const userProps = getFieldProps('userName', {
      rules: [
        { required: true, message: '请填写帐号' },
      ],
    });

    const passwdProps = getFieldProps('password', {
      rules: [
        { required: true, whitespace: true, message: '请填写密码' },
      ],
    });

    return (
        <div className="login-table">
          <div className="login-header">
            <span>51人品配置后台</span>
          </div>
          <div className="table-content">
            <div className={`owl-login ${this.state.owlClassArray}`}>
              <div className="hand"></div>
              <div className="hand hand-r"></div>
              <div className="arms">
                <div className="arm"></div>
                <div className="arm arm-r"></div>
              </div>
            </div>
            <div className="code-box">
              <Form inline form={this.props.form} onSubmit={this.handleSubmit}>
                <Icon type="user" />
                <FormItem>
                  <Input placeholder="请输入账户名"
                    {...userProps} />
                </FormItem>
                <Icon type="setting" />
                <FormItem>
                  <Input
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    type="password"
                    placeholder="请输入密码"
                    {...passwdProps} />
                </FormItem>
                <Button type="primary" className="submit" htmlType="submit">登录</Button>
              </Form>
            </div>
          </div>
        </div>
      );
  }
}

Login.propTypes = {
  form: React.PropTypes.object,
};

Login.defaultProps = {
};

Login.contextTypes = {
  router: React.PropTypes.object,
};

Login = Form.create()(Login);
export default Login;
