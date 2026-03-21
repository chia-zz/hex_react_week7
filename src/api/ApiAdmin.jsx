import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;
const apiPath = import.meta.env.VITE_API_PATH;

// 存 token
const getHeaders = () => {
  const token = document.cookie
    .split('; ')
    .find((row) => row.startsWith('hexToken='))
    ?.split('=')[1];

  return {
    headers: {
      Authorization: token,
    },
  };
};

export { apiUrl, apiPath };

// 登入
export const adminSignin = (data) => {
  // data { username: "", password: "" }
  return axios.post(`${apiUrl}/admin/signin`, data);
};

// 檢查登入
export const checkUserLogin = () => {
  return axios.post(`${apiUrl}/api/user/check`, {}, getHeaders());
};

// 登出
export const adminLogout = () => {
  return axios.post(`${apiUrl}/logout`, {}, getHeaders());
};

// 取得全部商品資料
export const getAdminProducts = (page = 1) => {
  return axios.get(
    `${apiUrl}/api/${apiPath}/admin/products?page=${page}`,
    getHeaders(),
  );
};

// 新增單一商品
export const addProduct = (data) => {
  return axios.post(
    `${apiUrl}/api/${apiPath}/admin/product`,
    { data },
    getHeaders(),
  );
};

// 編輯單一商品
export const updateProduct = (id, data) => {
  return axios.put(
    `${apiUrl}/api/${apiPath}/admin/product/${id}`,
    { data },
    getHeaders(),
  );
};

// 刪除單一商品
export const deleteProduct = (id) => {
  return axios.delete(
    `${apiUrl}/api/${apiPath}/admin/product/${id}`,
    getHeaders(),
  );
};

// 上傳圖片
export const uploadImage = (formData) => {
  return axios.post(
    `${apiUrl}/api/${apiPath}/admin/upload`,
    formData,
    getHeaders(),
  );
};

// 取得全部訂單資料
export const getAdminOrders = (page = 1) => {
  return axios.get(`${apiUrl}/api/${apiPath}/admin/orders`, {
    params: { page },
  });
};

// 編輯單一訂單
export const updateAdminOrder = (id, content) => {
  return axios.put(
    `${apiUrl}/api/${apiPath}/admin/order/${id}`,
    { data: content },
    getHeaders(),
  );
};

// 刪除單一訂單
export const deleteAdminOrder = (id) => {
  return axios.delete(`${apiUrl}/api/${apiPath}/admin/order/${id}`);
};

// 刪除全部訂單
export const deleteAdminAllOrders = () => {
  return axios.delete(`${apiUrl}/api/${apiPath}/admin/orders/all`);
};
