import React, { useState } from 'react';
import { Form, Input, InputNumber, Button, Card, Upload, Image } from 'antd';
import { PlusOutlined } from '@ant-design/icons';


const OrderForm = ({ addOrder }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const onFinish = (values) => {
    const newOrder = {
      id: Date.now().toString(),
      customer: values.customer,
      link: values.link,
      size: values.size,
      picture: fileList.length > 0 ? fileList[0].thumbUrl : null,
      dateCreated: new Date().toLocaleString(),
    };
    addOrder(newOrder);
    form.resetFields();
    setFileList([]);
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 12 }}>Загрузить</div>
    </div>
  );


  return (
    <Card title="Новый заказ" style={{ marginBottom: '20px' }}>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          name="customer"
          label="Наименование товара"
          rules={[{ required: true, message: 'Пожалуйста введите наименование' }]}
          >
          <Input placeholder="Обувь, пуховик, куртка, кофта, футболка и тд" />
        </Form.Item>
        
        <Form.Item
          name="link"
          label="Ссылка на товар"
          rules={[{ required: true, message: 'Введите ссылку на товар' }]}
          >
          <Input placeholder="Введите ссылку на товар" />
        </Form.Item>
        
        <Form.Item
          name="size"
          label="Размер"
          rules={[{ required: true, message: 'Размер модели' }]}
          >
          <InputNumber min={1} placeholder="Введите размер" style={{ width: '100%' }} />
        </Form.Item>
        
        <Form.Item
          name="picture"
          label="Добавьте скриншот товара"
          >
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={handleChange}
            beforeUpload={() => false}
            >
            {fileList.length >= 1 ? null : uploadButton}
          </Upload>
        </Form.Item>
        
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Оформить заказ
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default OrderForm;
