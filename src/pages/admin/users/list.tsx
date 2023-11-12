import React, { FC, useCallback, useEffect, useState } from 'react';
import {
  Row,
  Col,
  Table,
  Typography,
  Space,
  Modal,
  Descriptions,
  Input,
  Form,
  InputNumber,
  Button,
  notification,
} from 'antd';
import './index.less';
import type { ColumnsType } from 'antd/es/table';
import di from '@/di';
import { IUserEntity } from '@/domains/entities/interfaces';
import {
  PayCircleOutlined,
  InfoCircleOutlined,
  CheckCircleOutlined,
  LockOutlined,
  UnlockFilled,
} from '@ant-design/icons';
import { CURRENCY_GAME, SECRET_QUESTIONS } from '@/constants';
import { IAddXuDTO, IUnlockOrLock } from '@/domains/dto';
import { useSearchParams } from 'react-router-dom';

const Columns: ColumnsType<IUserEntity> = [
  {
    title: 'Id',
    dataIndex: 'id',
    align: 'center',
  },
  {
    title: 'Tài khoản',
    dataIndex: 'userName',
    align: 'center',
  },
  {
    title: CURRENCY_GAME,
    dataIndex: 'point1',
    align: 'center',
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'phone',
    align: 'center',
  },
  // {
  //   title: 'Mật khẩu game',
  //   align: 'center',
  //   dataIndex: 'passwordNoEncrypt',
  // },

  {
    align: 'center',
  },
];

const AdminUsersPage: FC = () => {
  const [dataSource, setDataSource] = useState<IUserEntity[]>([]);
  const [paged, setPaged] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [addXuForm] = Form.useForm<IAddXuDTO>();
  const [isOpenAddXuModal, setIsOpenAddXuModal] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [userUnlockOrLock, setUserUnlockOrLock] = useState<IUserEntity>();
  const [isUnlockOrLockModal, setIsUnlockOrLockModal] = useState<boolean>();

  const fetchUsers = useCallback(async (pageSelectd: number, keyword?: string) => {
    try {
      setLoading(true);
      const { data, total } = await di.user.list({ paged: pageSelectd, limit: 12, keyword });

      setPaged(pageSelectd);
      setDataSource(data);
      setLoading(false);
      setTotal(total);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  }, []);

  const openInfoAcction = (item: IUserEntity) => {
    const question = SECRET_QUESTIONS.find(s => s.value === item.question);

    Modal.info({
      icon: null,
      title: `Tài khoản ${item.userName}`,
      centered: true,
      content: (
        <Descriptions colon={true} column={1} layout="horizontal">
          <Descriptions.Item label={<Typography.Text>Đầy đủ thông tin:</Typography.Text>}>
            <Typography.Text strong type={!item.isNew ? 'success' : 'danger'}>
              <CheckCircleOutlined />
            </Typography.Text>
          </Descriptions.Item>
          <Descriptions.Item label={<Typography.Text>Số điện thoại</Typography.Text>}>
            <Typography.Text strong>{item.phone || 'Chưa có thông tin'}</Typography.Text>
          </Descriptions.Item>
          <Descriptions.Item label={<Typography.Text>Mật khẩu cấp 1</Typography.Text>}>
            <Typography.Text strong>{item.passwordNoEncrypt || 'Chưa có thông tin'}</Typography.Text>
          </Descriptions.Item>
          <Descriptions.Item label={<Typography.Text>Mật khẩu cấp 2</Typography.Text>}>
            <Typography.Text strong>{item.secPasswordNoEncrypt || 'Chưa có thông tin'}</Typography.Text>
          </Descriptions.Item>
          <Descriptions.Item label={<Typography.Text>Câu hỏi bí mật</Typography.Text>}>
            <Typography.Text strong>{(item?.question && question?.label) || 'Chưa có thông tin'}</Typography.Text>
          </Descriptions.Item>
          <Descriptions.Item label={<Typography.Text>Câu trả lời</Typography.Text>}>
            <Typography.Text strong>{item.answer || 'Chưa có thông tin'}</Typography.Text>
          </Descriptions.Item>
        </Descriptions>
      ),
    });
  };

  const onModalCancel = () => {
    setIsLoading(false);
    addXuForm.resetFields();
    setUserName(undefined);
    setIsOpenAddXuModal(false);
  };

  const onFinishAddXu = async (value: IAddXuDTO) => {
    setIsLoading(true);
    value.userName = userName || '';

    try {
      await di.user.addCoin<IAddXuDTO>(value);
      onModalCancel();
      notification.success({
        message: 'Thông báo',
        description: (
          <Typography.Text>
            Thêm thành công{' '}
            <Typography.Text type="danger" strong>
              {value.point1} {CURRENCY_GAME}
            </Typography.Text>{' '}
            vào tài khoản{' '}
            <Typography.Text type="danger" strong>
              {value.userName}
            </Typography.Text>
            .
          </Typography.Text>
        ),
      });
    } catch (e: unknown) {
      onModalCancel();
      notification.error({
        message: 'Thông báo',
        description: (
          <Typography.Text>
            Thêm thất bại{' '}
            <Typography.Text type="danger" strong>
              {value.point1} {CURRENCY_GAME}
            </Typography.Text>{' '}
            vào tài khoản{' '}
            <Typography.Text type="danger" strong>
              {value.userName}
            </Typography.Text>
            .
          </Typography.Text>
        ),
      });
    }
  };

  const AddXuForm = () => {
    return (
      <Row style={{ width: '100%' }}>
        <Col span={24}>
          <Form form={addXuForm} onFinish={onFinishAddXu} layout="vertical">
            <Form.Item
              name="point1"
              label={<Typography.Text strong>Số {CURRENCY_GAME}</Typography.Text>}
              rules={[
                {
                  required: true,
                  message: `Vui lòng nhập số ${CURRENCY_GAME}`,
                },
              ]}
            >
              <InputNumber
                placeholder={`Tối đa 32.000 ${CURRENCY_GAME}`}
                style={{
                  width: 200,
                }}
                min={1}
                max={32000}
              />
            </Form.Item>
            <Form.Item noStyle>
              <Row justify="center">
                <Col>
                  <Button loading={isLoading} htmlType="submit" type="primary">
                    Thêm
                  </Button>
                </Col>
              </Row>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    );
  };

  const openAddXuForm = (username: string) => {
    setIsOpenAddXuModal(true);
    setUserName(username);
  };

  const handelerUnlockAndLock = async (username: string, value: number) => {
    try {
      setLoading(true);
      await di.user.unlockOrLock<IUnlockOrLock>(username, { point: value });
      setIsUnlockOrLockModal(false);
      const keyword = searchParams.get('keyword') as string;

      fetchUsers(paged, keyword);
      // setLoading(false);
      notification.success({
        message: 'Thông báo',
        description: value ? (
          <Typography.Text>
            Mở khoá <Typography.Text type="danger">{username}</Typography.Text> thành công.
          </Typography.Text>
        ) : (
          <Typography.Text>
            Khoá <Typography.Text type="danger">{username}</Typography.Text> thành công.
          </Typography.Text>
        ),
      });
    } catch (e) {
      setLoading(false);
      setIsUnlockOrLockModal(false);
      notification.error({
        message: 'Thông báo',
        description: <Typography.Text>Có lỗi trong quá trình xử lý.</Typography.Text>,
      });
    }

    return false;
  };

  const confirmLockOrUnlockAcount = (item: IUserEntity) => {
    setUserUnlockOrLock(item);
    setIsUnlockOrLockModal(true);
  };

  Columns[4] = {
    width: 50,
    render: (item: IUserEntity) => (
      <Space>
        <Typography.Link title="Xem thông tin tài khoản" onClick={() => openInfoAcction(item)}>
          <InfoCircleOutlined style={{ fontSize: 20 }} />
        </Typography.Link>
        <Typography.Link
          type="warning"
          disabled={item.point1 >= 32000}
          title={item.point1 >= 32000 ? 'Số xu quá nhiều rồi' : 'Thêm xu'}
          onClick={() => openAddXuForm(item.userName)}
        >
          <PayCircleOutlined style={{ fontSize: 20 }} />
        </Typography.Link>
        <Typography.Link
          onClick={() => confirmLockOrUnlockAcount(item)}
          style={{ fontSize: 20 }}
          title={!item.locked ? 'khoá tài khoản' : 'Mở khoá tài khoản'}
          type={!item.locked ? 'success' : 'danger'}
        >
          {item.locked ? <LockOutlined /> : <UnlockFilled />}
        </Typography.Link>
      </Space>
    ),
  };

  useEffect(() => {
    const keyword = searchParams.get('keyword') as string;

    fetchUsers(1, keyword);
  }, [fetchUsers]);

  const tableOnChange = (page: number) => {
    const keyword = searchParams.get('keyword') as string;

    fetchUsers(page, keyword);
  };

  const onSearch = (value: string) => {
    setSearchParams({ keyword: value.trim() });
    fetchUsers(1, value);
  };

  return (
    <React.Fragment>
      <Row justify="center" className="mt">
        <Col md={20} className="mt">
          <Table
            title={() => (
              <Row>
                <Col sm={24} xs={24} md={12} lg={10} xxl={6}>
                  <Input.Search
                    allowClear={true}
                    defaultValue={searchParams.get('keyword') as string}
                    onSearch={onSearch}
                    size="large"
                    placeholder="Tìm kiếm tài khoản"
                  />
                </Col>
              </Row>
            )}
            tableLayout="auto"
            size="large"
            locale={{ emptyText: 'Không có tài khoản nào' }}
            loading={loading}
            pagination={{
              position: ['bottomCenter'],
              pageSize: 12,
              total: total,
              size: 'default',
              current: paged,
              onChange: tableOnChange,
              showSizeChanger: false,
            }}
            rowClassName={(record: IUserEntity) =>
              `${!record.isNew ? 'user-valid' : 'user-validation'} ${record.locked ? 'user-locked' : ''}`
            }
            rowKey="id"
            dataSource={dataSource}
            columns={Columns}
            bordered
          />
        </Col>
      </Row>
      <Modal
        maskClosable={false}
        centered
        title={
          <Typography.Text strong style={{ fontSize: 20, textAlign: 'center', display: 'block' }} type="secondary">
            Thêm xu - {userName}
          </Typography.Text>
        }
        destroyOnClose
        onCancel={onModalCancel}
        width={300}
        footer={null}
        open={isOpenAddXuModal}
      >
        {AddXuForm()}
      </Modal>
      <Modal
        cancelText="Huỷ"
        destroyOnClose
        onCancel={() => setIsUnlockOrLockModal(false)}
        onOk={() =>
          handelerUnlockAndLock(
            (userUnlockOrLock && userUnlockOrLock.userName) || '',
            userUnlockOrLock && userUnlockOrLock.locked ? 1 : 0,
          )
        }
        okText={userUnlockOrLock && userUnlockOrLock.locked ? 'Mở khoá' : 'Khoá'}
        centered
        confirmLoading={loading}
        title={userUnlockOrLock && userUnlockOrLock.locked ? 'Mở khoá tài khoản' : 'Khoá tài khoản'}
        open={isUnlockOrLockModal}
      >
        {userUnlockOrLock && userUnlockOrLock.locked ? (
          <Typography.Text strong type="danger">
            Bạn có chắc là muốn mở khoá tài khoản {userUnlockOrLock.userName}?
          </Typography.Text>
        ) : (
          <Typography.Text strong type="danger">
            Bạn có chắc là muốn đóng khoá tài khoản {userUnlockOrLock && userUnlockOrLock.userName}?
          </Typography.Text>
        )}
      </Modal>
    </React.Fragment>
  );
};

export default AdminUsersPage;
