import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useMessage from '../../hooks/useMessage';

// API
import {
  getAdminOrders,
  // updateAdminOrder,
  // deleteAdminOrder,
  // deleteAdminAllOrders,
} from '../../api/ApiAdmin';
// 元件
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Pagination from '../../components/common/Pagination';
import OrderDetail from '../../components/admin/OrderDetail';

function AdmOrder() {
  // const navigate = useNavigate();
  // 元件設定
  const [isLoading, setIsLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [pagination, setPagination] = useState({});
  // redux
  const { showError } = useMessage();

  const [Order, setOrder] = useState([]);
  const [tempOrder, setTempOrder] = useState([]);
  const [isOrderDetailOpen, setIsOrderDetailOpen] = useState(false);

  // API
  // 取得訂單資料
  const getOrder = async (page = 1) => {
    setLoadingData(true);
    try {
      const res = await getAdminOrders(page);
      setOrder(res.data.orders);
      setPagination(res.data.pagination);
    } catch (error) {
      showError('取得資料失敗', error);
    } finally {
      setLoadingData(null);
    }
  };

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      try {
        await getOrder();
      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, []);

  // 處理訂單欄位
  // detailModal
  const openOrderDetail = (order) => {
    setTempOrder(order);
    setIsOrderDetailOpen(true);
  };

  const closeOrderDetail = () => {
    setIsOrderDetailOpen(false);
    // setTempProduct(null);
  };
  // 時間轉換
  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString();
  };
  // 訂單時間排序
  // const sortedOrders = [...orders].sort((a, b) => a.create_at - b.create_at);
  // 訂單編號
  const orderId = (id) => {
    return new Object(id).slice(-5);
  };

  return (
    <>
      <div className='container my-5'>
        <h1 className='text-sec-500 mb-5'>訂單列表</h1>
        <div className='mb-3 d-flex gap-2'>
          <button
            className='btn btn-tert-500'
            onClick={getOrder}
            disabled={loadingData}
          >
            {loadingData ? (
              <>
                <div className='d-flex justify-content-center align-items-center'>
                  <LoadingSpinner
                    spinner='RotatingLines'
                    color='#272725'
                    width='16px'
                    height='16px'
                  />
                  <span className='ms-2'>處理中</span>
                </div>
              </>
            ) : (
              <>
                {' '}
                <i className='bi bi-arrow-clockwise'></i>
                <span className='ms-2'>重新整理</span>
              </>
            )}
          </button>
        </div>
        {isLoading ? (
          <div className='d-flex flex-column justify-content-center align-items-center my-5'>
            <LoadingSpinner />
            <p className='text-primary fs-3 mt-2'>資料載入中</p>
          </div>
        ) : (
          <div className='container'>
            <div className='table-responsive-lg'>
              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th>訂單日期</th>
                    <th>訂單編號（後 5 碼）</th>
                    <th>總金額</th>
                    <th>是否付款</th>
                    <th>訂購人姓名</th>
                  </tr>
                </thead>
                <tbody>
                  {Order.map((item) => (
                    <tr
                      key={item.id}
                      onClick={() => openOrderDetail(item)}
                      style={{ cursor: 'pointer' }}
                    >
                      <td>{formatDate(item.create_at)}</td>
                      <td>{orderId(item.id)}</td>
                      <td>{item.total.toLocaleString()}</td>
                      <td>
                        {item.is_paid ? (
                          <span className='text-success'>已付款</span>
                        ) : (
                          <span className='text-danger'>未付款</span>
                        )}
                      </td>
                      <td>{item.user.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination pagination={pagination} onChangePage={getOrder} />
              <OrderDetail
                isOpen={isOrderDetailOpen}
                tempOrder={tempOrder}
                onClose={closeOrderDetail}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default AdmOrder;
