import React, { useState, useEffect } from 'react';
import 'antd/dist/reset.css';
import { Layout, Typography } from 'antd';
import OrderForm from './components/OrderForm';
import OrderList from './components/OrderList';
import { getOrders, addOrder as saveOrder, deleteOrderById, updateOrder } from './data';

const { Header, Content } = Layout;
const { Title } = Typography;

const App = () => {
  const [orders, setOrders] = useState([]);

  // Загрузка данных из data.js при монтировании компонента
  useEffect(() => {
    const loadedOrders = getOrders();
    setOrders(loadedOrders); // Устанавливаем состояние
  }, []); // Загружаем данные только один раз

  const addOrder = (order) => {
    saveOrder(order); // Сохраняем новый заказ
    setOrders((prevOrders) => [...prevOrders, order]); // Обновляем состояние
  };

  const handleUpdateOrder = (id, updatedFields) => {
    updateOrder(id, updatedFields);
    setOrders(getOrders()); // Обновляем список заказов
  };

  const deleteOrder = (id) => {
    deleteOrderById(id); // Удаляем заказ из локального хранилища
    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id)); // Обновляем состояние
  };

  return (
    <Layout>
      <Header style={{ background: '#001529', color: '#fff', textAlign: 'center' }}>
        <Title level={2} style={{ color: '#fff', marginTop: 10 }}>Simple CRM</Title>
      </Header>
      <Content style={{ padding: '20px 50px' }}>
        <OrderForm addOrder={addOrder} />
        <OrderList orders={orders} updateOrder={handleUpdateOrder} deleteOrderById={deleteOrder} />
      </Content>
    </Layout>
  );
};

export default App;