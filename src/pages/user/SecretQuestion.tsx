import { FC, useCallback, useState } from 'react';
import { Row, Col, Form, Input, Card, Typography, Button, Select, notification, Modal } from 'antd';
import './index.less';
import { IUserChangeSecretQuestion } from '@/domains/dto';
import { SECRET_QUESTIONS } from '@/constants';
import { useSelector } from 'react-redux';
import di from '@/di';
import { FieldsCheck, SmsNotify } from './components';
import { ISmsCreateParams } from '@/domains/dto/sms';
import { Inner } from '../components';
import { AppState } from '@/stores';

const action = 'changesecretquestion';
const ChangeSecretQuestionPage: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { username, newUser } = useSelector((s: AppState) => s.user);
  const [form] = Form.useForm<IUserChangeSecretQuestion>();

  const smsRequest = useCallback(async (params: ISmsCreateParams) => {
    try {
      const message = await di.user.smsRequest(params, 'secretquestionchange');

      setLoading(false);
      Modal.success({
        title: <Typography.Text strong>Thông báo</Typography.Text>,
        content: <SmsNotify message={message} />,
        centered: true,
      });
    } catch (e: unknown) {
      const error = e as Error;

      setLoading(false);
      notification.error({
        message: 'Thông báo',
        description: error.message,
      });
    }
  }, []);

  const onFinish = async (values: IUserChangeSecretQuestion) => {
    setLoading(true);
    if (values.sms) {
      smsRequest({ info1: values.newSecretQuestion || '', info2: values.newAnswer });

      return;
    }

    try {
      await di.user.update<IUserChangeSecretQuestion>(values, action, username);
      setLoading(false);
      notification.success({
        message: 'Thông báo',
        description: 'Đổi câu hỏi bí mật và câu trả lời thành công.',
      });
      form.resetFields();
    } catch (error) {
      const e = error as Error;

      notification.error({
        message: 'Thông báo',
        description: e.message,
      });
      setLoading(false);
    }
  };

  return (
    <Inner>
      {!newUser && (
        <Card title="Đổi câu hỏi bí mật">
          <Form
            form={form}
            security="232323"
            layout="vertical"
            onFinish={onFinish}
            labelAlign="right"
            className="genaral-form"
          >
            <Form.Item
              name="newSecretQuestion"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn câu hỏi bí mật mới',
                },
              ]}
              label={<Typography.Text strong>Câu hỏi bí mật mới</Typography.Text>}
            >
              <Select options={SECRET_QUESTIONS} placeholder="Chọn câu hỏi bí mật mới" />
            </Form.Item>

            <Form.Item
              name="newAnswer"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập câu trả lời mới.',
                },
                {
                  max: 40,
                  message: 'Chỉ nhập tối đa 40 ký tự.',
                },
              ]}
              label={<Typography.Text strong>Câu trả lời mới</Typography.Text>}
            >
              <Input placeholder="Câu trả lời mới" />
            </Form.Item>

            <FieldsCheck />

            <Row justify="center">
              <Col>
                <Button loading={loading} htmlType="submit" type="primary">
                  Cập nhật
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>
      )}
    </Inner>
  );
};

export default ChangeSecretQuestionPage;
