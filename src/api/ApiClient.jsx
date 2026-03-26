import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;
const apiPath = import.meta.env.VITE_API_PATH;

export { apiUrl, apiPath };

// 取得所有產品
export const getAllProducts = () => {
  return axios.get(`${apiUrl}/api/${apiPath}/products/all`);
};

// 取得包含產品分類、頁面的所有產品
export const getProducts = (page = 1, category = '') => {
  return axios.get(`${apiUrl}/api/${apiPath}/products`, {
    params: {
      page,
      category,
    },
  });
};

// 取得單一產品詳情
export const getProductDetail = (id) => {
  return axios.get(`${apiUrl}/api/${apiPath}/product/${id}`);
};

// 加入購物車
export const addCart = (id = '', qty = 1) => {
  const data = {
    data: {
      product_id: id,
      qty,
    },
  };
  return axios.post(`${apiUrl}/api/${apiPath}/cart`, data);
};

// 取得購物車內容
export const getCart = () => {
  return axios.get(`${apiUrl}/api/${apiPath}/cart`);
};

// 修改購物車內容
export const editCart = (cartId, productId, qty) => {
  const data = {
    data: {
      product_id: productId,
      qty: qty,
    },
  };
  return axios.put(`${apiUrl}/api/${apiPath}/cart/${cartId}`, data);
};

// 刪除購物車內容
export const deleteCart = (cartId) => {
  return axios.delete(`${apiUrl}/api/${apiPath}/cart/${cartId}`);
};

// 刪除全部購物車
export const deleteAllCart = () => {
  return axios.delete(`${apiUrl}/api/${apiPath}/carts`);
};

// 優惠券
export const postCoupon = (coupon) => {
  return axios.post(`${apiUrl}/api/${apiPath}/coupon`, { data: coupon });
};

// 訂單+結帳
// 送出訂單
export const submitOrder = (data) => {
  return axios.post(`${apiUrl}/api/${apiPath}/order`, {
    data,
  });
};

// 取得全部訂單
export const getAllOrder = () => {
  return axios.get(`${apiUrl}/api/${apiPath}/orders`);
};

// 取得單一訂單
export const getOrder = (order_id) => {
  return axios.get(`${apiUrl}/api/${apiPath}/order/${order_id}`);
};

// 付款
export const submitPay = (order_id) => {
  return axios.post(`${apiUrl}/api/${apiPath}/pay/${order_id}`);
};
