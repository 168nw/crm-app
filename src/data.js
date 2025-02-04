let orders = []; // Локальное хранилище заказов

/**
 * Получение всех заказов.
 * @returns {Array} Массив заказов.
 */
export const getOrders = () => {
  return [...orders]; // Возвращаем копию массива для предотвращения мутаций
};

/**
 * Добавление нового заказа.
 * @param {Object} order - Новый заказ.
 */
export const addOrder = (order) => {
  orders.push(order);
};

/**
 * Удаление заказа по ID.
 * @param {string} id - Идентификатор заказа.
 */
export const deleteOrderById = (id) => {
  orders = orders.filter((order) => order.id !== id);
};

/**
 * Обновление заказа (например, добавление скриншота).
 * @param {string} id - Идентификатор заказа.
 * @param {Object} updatedFields - Обновленные данные.
 */
export const updateOrder = (id, updatedFields) => {
  orders = orders.map(order => 
    order.id === id ? { ...order, ...updatedFields } : order
  );
};