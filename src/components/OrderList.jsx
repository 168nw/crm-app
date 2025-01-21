import React from 'react';
import { Table, Button, Space, Card, Image, Tag } from 'antd';

const OrderList = ({ orders, deleteOrder }) => {
  // Проверяем данные, которые поступают в таблицу
  console.log("Список заказов в таблице:", orders);

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
            width={70}
            src={picture} // Используем URL изображения, сохраненного в `picture`
            preview={{ mask: "Открыть изображение" }} // Добавляем подпись для превью
          />
        ) : (
          <span>Нет изображения</span>
        )
      ),
    },
    {
      title: 'Статус заказа',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <span><Tag style={{ marginBottom: '10px' }} color="red">Не оплачен</Tag>
          <Button  type="primary" danger onClick={() => deleteOrder(record.id)}>
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