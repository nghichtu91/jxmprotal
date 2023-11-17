import { GiftCodeEntity } from '@/domains/entities/giftcode.entity';
import { Row, Col, Table, Typography, Space, Button, Modal, Form, InputNumber, Input, notification } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useState, useCallback, useEffect } from 'react';
import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DeleteOutlined } from '@ant-design/icons';
import di from '@/di';
import { IGiftCreateDto } from '@/domains/dto/giftcode/create.dto';

const Columns: ColumnsType<GiftCodeEntity> = [
  {
    title: 'Mã Giftcode',
    dataIndex: 'Code',
    align: 'center',
    width: '170px',
  },
  {
    title: 'Vật phẩm',
    dataIndex: 'ItemList',
    align: 'center',
  },
  {
    title: 'Trạng thái',
    dataIndex: 'Status',
    align: 'center',
  },
];

const GiftCode: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [dataSource, setDataSource] = useState<GiftCodeEntity[]>([]);
  const defaultPaged = (searchParams.get('paged') as unknown as string) || '1';
  const [paged, setPaged] = useState<number>(parseInt(defaultPaged));
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [addGiftForm] = Form.useForm<IGiftCreateDto>();
  const [isOpenCreateForm, setIsOpenCreateForm] = useState<boolean>(false);
  const [isCreating, setIsCreating] = useState<boolean>(false);

  const apiCreateGift = useCallback(
    (params: IGiftCreateDto) => di.user.adminCreateGiftCode<IGiftCreateDto, GiftCodeEntity>(params),
    [],
  );

  const fetchGiftcodes = useCallback(async (params: object = {}) => {
    setLoading(true);
    const { data, pageNum, total } = await di.user.adminGiftcodes<object>(params);

    setTotal(total);
    setPaged(pageNum);
    setDataSource(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchGiftcodes();
  }, []);

  const tableOnChange = async (_page: number) => {
    setSearchParams({
      paged: _page.toString() || '1',
      keyword: searchParams.get('keyword') || '',
    });
    fetchGiftcodes({ paged: _page });
  };

  Columns[3] = {
    width: '100px',
    align: 'center',
    render: (item: GiftCodeEntity) => (
      <Space>
        <Typography.Link type="danger" title="Xóa giftcode" onClick={() => deleteGiftcode(item)}>
          <DeleteOutlined style={{ fontSize: 20 }} />
        </Typography.Link>
      </Space>
    ),
  };

  const openDialogCreateGift = () => {
    setIsOpenCreateForm(true);
  };

  const closeDialogCreateGift = () => {
    setIsOpenCreateForm(false);
    addGiftForm.resetFields();
  };

  const createGiftForm = () => {
    return (
      <Row style={{ width: '100%' }}>
        <Col span={24}>
          <Form form={addGiftForm} layout="vertical">
            <Form.Item
              name="Code"
              label={<Typography.Text strong>Gift code</Typography.Text>}
              rules={[
                {
                  required: true,
                  message: `Vui lòng nhập gift code`,
                },
              ]}
            >
              <Input placeholder="Nhập mã gift code" />
            </Form.Item>
            <Form.Item
              name="ItemList"
              label={<Typography.Text strong>Vật phẩm</Typography.Text>}
              rules={[
                {
                  required: true,
                  message: `Vui lòng nhập vật phẩm`,
                },
              ]}
            >
              <Input placeholder="Danh sách: 8483|1#8541|1#584|1#350|10#353|10#8464|1#9679|1" />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: `Vui lòng nhập server id`,
                },
              ]}
              name="ServerID"
              label={<Typography.Text strong>Máy chủ</Typography.Text>}
            >
              <InputNumber
                style={{
                  width: '100%',
                }}
                placeholder="Nhập server id"
              />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    );
  };

  const onCreateGift = () => {
    addGiftForm
      .validateFields()
      .then(async (values: IGiftCreateDto) => {
        setIsCreating(true);

        try {
          await apiCreateGift(values);
          closeDialogCreateGift();
          setIsCreating(false);
          fetchGiftcodes();
        } catch (ex: unknown) {
          setIsCreating(false);
          const error = ex as Error;

          notification.error({ message: 'Thông báo', description: error?.message || 'Lỗi chưa xác định' });
        }
      })
      .catch(errorInfo => {
        console.log(errorInfo);
      });
  };

  const deleteGiftcode = (item: GiftCodeEntity) => {
    Modal.confirm({
      centered: true,
      title: 'Thông báo',
      content: (
        <Typography.Text strong>
          Bạn có chắc là xóa gift code <Typography.Text type="danger">{item.Code}</Typography.Text>?
        </Typography.Text>
      ),
      okText: 'Đồng ý',
      cancelText: 'Hủy',
      okButtonProps: {
        danger: true,
      },
      onOk: async () => {
        try {
          await di.user.adminDeleteGiftcodes(item.ID);
          notification.success({ message: 'Thông báo', description: 'Xóa gift code thành công!' });
          fetchGiftcodes();
        } catch (ex: unknown) {
          const error = ex as Error;

          notification.error({ message: 'Thông báo', description: error?.message || 'Lỗi chưa xác định' });
        }
      },
    });
    console.log(item);
  };

  return (
    <React.Fragment>
      <Row justify="center" className="mt">
        <Col md={23} className="mt">
          <Table
            title={() => (
              <>
                <Button onClick={openDialogCreateGift}>
                  <Typography.Text strong>Thêm Giftcode</Typography.Text>
                </Button>
              </>
            )}
            columns={Columns}
            dataSource={dataSource}
            tableLayout="auto"
            size="small"
            locale={{ emptyText: 'Không có tài khoản nào' }}
            loading={loading}
            rowKey="ID"
            pagination={{
              position: ['bottomCenter'],
              pageSize: 12,
              total: total,
              current: paged,
              onChange: tableOnChange,
              showSizeChanger: false,
            }}
          />
        </Col>
      </Row>
      <Modal
        destroyOnClose
        onCancel={closeDialogCreateGift}
        open={isOpenCreateForm}
        maskClosable={false}
        centered
        title="Thêm giftcode"
        cancelText="Hủy"
        okText="Thêm"
        onOk={onCreateGift}
        okButtonProps={{
          danger: true,
          loading: isCreating,
        }}
      >
        {createGiftForm()}
      </Modal>
    </React.Fragment>
  );
};

export default GiftCode;
