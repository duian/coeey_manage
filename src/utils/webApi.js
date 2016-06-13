import { message } from 'antd';

export function handleStatus(res) {
  const { status } = res;
  return Promise[['reject', 'resolve'][+(status >= 200 && status <= 400)]](res.body);
}

export function handleSuccess(res, msg) {
  const { status } = res;
  if (status) {
    message.success(msg);
  }
}
export function getErrorMsg(err) {
  const { body } = err;
  return body.message;
}
