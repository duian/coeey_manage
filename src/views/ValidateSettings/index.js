import React from 'react';
import { message } from 'antd';
import request from 'superagent-bluebird-promise';
import url from 'url';
import { handleStatus, handleSuccess, getErrorMsg } from 'webApi';
import params from 'params';
import { mergeObj } from 'helper';
import Container from 'Container';
import SearchBar from './SearchBar';
import Content from './Content';
import RecordModal from './RecordModal';
import PromptModal from './PromptModal';
import './_validateSettings';

class ValidateSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: {
        loanType: -1,
        verifyType: -1,
        // 分页参数
        pageNo: 1,
        pageSize: 50,
        total: 0,
      },
      records: [],
      recordModalVisible: false,
      recordModalTitle: '',
      status: '',
      promptModalVisible: false,
    };

    // Ajax
    this.getRecordsPromise = this.getRecordsPromise.bind(this);
    this.validatePromise = this.validatePromise.bind(this);
    this.putRecordPromise = this.putRecordPromise.bind(this);
    this.postRecordPromise = this.postRecordPromise.bind(this);

    this.formatRecords = this.formatRecords.bind(this);
    this.setRecords = this.setRecords.bind(this);
    this.setQuery = this.setQuery.bind(this);
    this.setPagination = this.setPagination.bind(this);
    this.resetPageNo = this.resetPageNo.bind(this);

    // 新增/修改/验证重复/分页
    this.handleSearch = this.handleSearch.bind(this);
    this.handlePagination = this.handlePagination.bind(this);
    this.handleValidate = this.handleValidate.bind(this);
    this.handleTransmit = this.handleTransmit.bind(this);
    this.handlePutRecord = this.handlePutRecord.bind(this);
    this.handlePostRecord = this.handlePostRecord.bind(this);
    this.handleSubmitRecord = this.handleSubmitRecord.bind(this);

    // 弹出层
    this.renderRecordModal = this.renderRecordModal.bind(this);
    this.openRecordMoal = this.openRecordMoal.bind(this);
    this.closeRecordModal = this.closeRecordModal.bind(this);
    this.renderPromptModal = this.renderPromptModal.bind(this);
    this.openPromptModal = this.openPromptModal.bind(this);
    this.closePromptModal = this.closePromptModal.bind(this);
  }

  // 请求列表
  getRecordsPromise(query) {
    return request
    .get(url.verifyItems)
    .withCredentials()
    // .withCredentials()
    .query(query);
  }

  // 验证是否重复
  validatePromise(query) {
    return request
    .get(`${url.verifyItems}/validator`)
    .withCredentials()
    .query(query);
  }

  // 修改记录
  putRecordPromise(data) {
    return request
    .put(url.verifyItems)
    .withCredentials()
    .send(data);
  }

  // 新增记录
  postRecordPromise(data) {
    return request
    .post(url.verifyItems)
    .withCredentials()
    .send(data);
  }

  // 格式化数据, 将对应的字段转化为相应的文字
  formatRecords(res) {
    const { records } = res;
    if (records && records.length) {
      records.map((record) => {
        record.loanType = 3;
        [
          'loanType',
          'isValid',
          'mandatory',
        ].map(type => {
          record[`${type}Str`] = params.getName(type, record[type]);
          return null;
        });
        record.typeStr = record.type === 1 ? '提额' : '降息';
        record.effectiveDays += '';
        record.effectiveDaysStr = `${record.effectiveDays}天`;
        record.verifyTypeStr = params.getName('verifyType', record.number);
        return res;
      });
    }
    return res;
  }

  // 设置records
  setRecords(res) {
    const { records } = res;
    this.setState({ records });
    return Promise.resolve(res);
  }

  // 设置参数
  setQuery(query) {
    this.setState({ query });
    return Promise.resolve();
  }

  // 设置分页长度
  setPagination(res, _q) {
    const { query } = this.state;
    const { length } = res;
    query.total = length;
    if (_q) {
      _q.total = length;
      const q = mergeObj(query, _q);
      return Promise.resolve(q);
    }
    return Promise.resolve(query);
  }

  // 重置页码
  resetPageNo(query) {
    query.pageNo = 1;
    return Promise.resolve(query);
  }

  // 搜索
  handleSearch(query) {
    return this.getRecordsPromise(query)
    .then(handleStatus)
    .then(this.formatRecords)
    .then(this.setRecords)
    .then((res) => this.setPagination(res, query))
    .then(this.resetPageNo)
    .then(this.setQuery)
    .catch((err) => message.error(getErrorMsg(err)));
  }

  // 分页
  handlePagination(query) {
    return this.getRecordsPromise(query)
    .then(handleStatus)
    .then(this.formatRecords)
    .then(this.setRecords)
    .then(this.setPagination)
    .then(this.setQuery)
    .catch((err) => message.error(getErrorMsg(err)));
  }

  // 验证记录是否有相似
  handleValidate(data) {
    return this.validatePromise(data)
    .then(handleStatus)
    .then((res) => this.handleTransmit(res, data))
    .catch((err) => message.error(getErrorMsg(err)));
  }

  // 验证过后根据返回状态进行提示/put/post
  handleTransmit(res, data) {
    const { status } = this.state;
    const { existed } = res;
    if (existed) {
      const { records } = this.formatRecords(res);
      this.setState({ repeatRecords: records, newParam: data });
      return this.openPromptModal();
    }

    if (status === 'edit') {
      return this.handlePutRecord(data);
    }

    return this.handlePostRecord(data);
  }

  handlePutRecord(data) {
    const { query } = this.state;
    return this.putRecordPromise(data)
    .then(handleStatus)
    .then((res) => handleSuccess(res, '修改记录成功'))
    .then(() => this.handleSearch(query))
    .then(() => this.closePromptModal())
    .catch((err) => message.error(getErrorMsg(err)));
  }

  handlePostRecord(data) {
    const { query } = this.state;
    query.loanType = -1;
    query.verifyType = -1;
    return this.postRecordPromise(data)
    .then(handleStatus)
    .then((res) => handleSuccess(res, '新增记录成功'))
    .then(() => this.handleSearch(query))
    .then(() => this.closePromptModal())
    .catch((err) => message.error(getErrorMsg(err)));
  }

  // 重复记录时，点击确定逻辑
  handleSubmitRecord() {
    const { status, newParam } = this.state;
    if (status === 'edit') {
      return this.handlePutRecord(newParam);
    }
    return this.handlePostRecord(newParam);
  }

  renderRecordModal() {
    const {
      recordModalVisible,
      recordModalTitle,
      selectedRecord,
      status,
    } = this.state;
    return (
      <RecordModal
        visible={recordModalVisible}
        title={recordModalTitle}
        status={status}
        record={selectedRecord}
        onClose={this.closeRecordModal}
        onValidate={this.handleValidate}
      >
      </RecordModal>
    );
  }

  // 打开modal, 新增&编辑记录
  // option.method: 'add' or 'edit'
  openRecordMoal(options) {
    const { method, record } = options;
    let title;
    if (method === 'add') {
      title = '新增记录';
    } else if (method === 'edit') {
      title = '修改记录';
    }
    if (record) {
      this.setState({
        recordModalVisible: true,
        recordModalTitle: title,
        selectedRecord: record,
        status: method,
      });
    } else {
      this.setState({
        recordModalVisible: true,
        recordModalTitle: title,
        status: method,
      });
    }
  }

  // 关闭
  closeRecordModal() {
    this.setState({ recordModalVisible: false, selectedRecord: null, status: '' });
  }

  renderPromptModal() {
    const { promptModalVisible, repeatRecords } = this.state;
    return (
      <PromptModal
        visible={promptModalVisible}
        onSubmit={this.handleSubmitRecord}
        onClose={this.closePromptModal}
        records={repeatRecords}
      >
      </PromptModal>
    );
  }

  openPromptModal() {
    this.setState({ recordModalVisible: false, promptModalVisible: true });
  }

  closePromptModal() {
    this.setState({
      promptModalVisible: false,
      selectedRecord: null,
      status: '',
      newParam: null,
    });
  }

  componentDidMount() {
    const { query } = this.state;
    this.getRecordsPromise(query)
    .then(handleStatus)
    .then(this.formatRecords)
    .then(this.setRecords)
    .then(this.setPagination)
    .then(this.setQuery)
    .catch((err) => message.error(getErrorMsg(err)));
  }

  render() {
    const {
      records,
      query,
      tableLoading,
      status,
      repeatRecords,
    } = this.state;
    return (
      <Container className="validate-settings">
        <SearchBar
          query={query}
          onSearch={this.handleSearch}
          openModal={this.openRecordMoal}
        >
        </SearchBar>
        <Content
          records={records}
          query={query}
          loading={tableLoading}
          onPagination={this.handlePagination}
          openModal={this.openRecordMoal}
        >
        </Content>
        {
          status ? this.renderRecordModal() : null
        }
        {
          repeatRecords ? this.renderPromptModal() : null
        }

      </Container>
    );
  }
}

export default ValidateSettings;
