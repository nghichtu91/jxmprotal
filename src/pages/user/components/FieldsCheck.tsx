import { PHONE_PATTERN, SECRET_QUESTIONS } from '@/constants';
import { Divider, Form, Input, Select, Typography, Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import React, { useState } from 'react';

export const FieldsCheck = () => {
  const [isSms, setIsSms] = useState<boolean>(false);

  const onChange = (e: CheckboxChangeEvent) => {
    setIsSms(e.target.checked);
  };

  return (
    <React.Fragment>
      <Form.Item valuePropName="checked" name="sms">
        <Checkbox onChange={onChange}>
          <Typography.Text strong style={{ fontSize: 18 }}>
            Sử dụng sms
          </Typography.Text>
        </Checkbox>
      </Form.Item>
      {!isSms ? (
        <>
          <Divider>Thông tin kiểm tra</Divider>
          <Form.Item
            name="passWordSecond"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập mật khẩu cấp 2.',
              },
              {
                max: 32,
                message: 'Chỉ nhập tối đa 32 ký tự.',
              },
              {
                min: 8,
                message: 'Chỉ nhập tối thiểu 8 ký tự.',
              },
            ]}
            label={<Typography.Text strong>Mật khẩu cấp 2</Typography.Text>}
          >
            <Input.Password placeholder="Mật khẩu cấp 2" />
          </Form.Item>
          <Form.Item
            label={<Typography.Text strong>Số điện thoại</Typography.Text>}
            name="phone"
            rules={[
              { required: true, message: 'Vui lòng nhập số điện thoại.' },
              {
                pattern: PHONE_PATTERN,
                message: 'Vui lòng nhập số điện di động.',
              },
            ]}
          >
            <Input placeholder="Nhập số điện thoại" />
          </Form.Item>
          <Form.Item
            name="question"
            label={<Typography.Text strong>Câu hỏi bí mật</Typography.Text>}
            rules={[
              {
                required: true,
                message: 'Vui chọn 1 câu hỏi bí mật.',
              },
            ]}
          >
            <Select placeholder="Chọn câu hỏi bí mật" options={SECRET_QUESTIONS} />
          </Form.Item>
          <Form.Item
            name="answer"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập câu trả lời.',
              },
            ]}
            label={<Typography.Text strong>Câu trả lời</Typography.Text>}
          >
            <Input placeholder="Câu trả lời" />
          </Form.Item>
        </>
      ) : null}
    </React.Fragment>
  );
};
