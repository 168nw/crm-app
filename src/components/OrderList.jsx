import React from 'react';
import { Table, Button, Space, Card, Image, Tag, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';


const OrderList = ({ orders, deleteOrderById, updateOrder }) => {

  // Функция для обработки загрузки изображения
  const handleUpload = (file, record) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      updateOrder(record.id, { pay_order: reader.result }); 
    };
    return false; // Останавливаем автоматическую загрузку файла
  };

  // Функция удаления заказа
  const handleDelete = (id) => {
    deleteOrderById(id);
  };

  const columns = [
    {
      title: 'Дата создания',
      dataIndex: 'dateCreated',
      key: 'dateCreated',
    },
    {
      title: 'Наименование',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: 'Ссылка',
      dataIndex: 'link',
      key: 'link',
    },
    {
      title: 'Размер',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: 'Скриншот товара',
      dataIndex: 'picture',
      key: 'picture',
      render: (picture) => (
        picture ? (
          <Image
            width={100}
            src={picture} // Используем URL изображения, сохраненного в `picture`
            preview={{ mask: "Открыть" }} // Добавляем подпись для превью
          />
        ) : (
          <span>Нет изображения</span>
        )
      ),
    },
    {
      title: 'Оплата заказа',
      key: 'pay_order_upload',
      render: (_, record) => (
        <Space size="middle">
          {!record.pay_order && (
          <Upload beforeUpload={(file) => handleUpload(file, record)} showUploadList={false}>
          <Button icon={<UploadOutlined />}></Button>
        </Upload>
          )}
          {record.pay_order && (
            <Image 
              width={100} 
              src={record.pay_order} 
              preview={{ mask: 'Открыть' }} 
              style={{ marginLeft: '10px' }} // Добавляем отступ для лучшего визуального восприятия
            />
          )}
        </Space>
      ),
    },
    {
      title: 'Статус заказа',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <span>
            {record.pay_order ? <Tag color="green">Оплачен</Tag> : <Tag color="red">Не оплачен</Tag>}
          <Button  
            type="primary" 
            danger onClick={() => handleDelete(record.id)}
            style={{ marginTop: '10px' }}
            >
            Delete
          </Button>
          </span>
        </Space>
      ),
    },
  ];

  return (
    <Card title="Список заказов">
      <Table
        dataSource={orders.map((order) => ({ ...order, key: order.id }))}
        columns={columns}
        pagination={false}
      />
    </Card>
  );
};

export default OrderList;