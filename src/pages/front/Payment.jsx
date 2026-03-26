import { useState, useEffect } from 'react';
import useMessage from '../../hooks/useMessage';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { renderRefresh } from '../../store/slices/cartSlice';
// API
import { submitPay, getOrder } from '../../api/ApiClient';
// 元件
import LoadingSpinner from '../../components/common/LoadingSpinner';

function Payment() {
  const { orderId } = useParams();
  const [orderData, setOrderData] = useState({});
  const [orderProducts, setProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showError, showSuccess } = useMessage();

  useEffect(() => {
    const getPayOrder = async (orderId) => {
      setIsLoading(true);
      try {
        const res = await getOrder(orderId);
        setOrderData(res.data.order);

        console.log(res.data.order);
        setProducts(Object.values(res.data.order.products));
        console.log(res.data.order.products);
      } catch (error) {
        showError(`取得失敗:${error.res.data.message}`);
      } finally {
        setIsLoading(false);
      }
    };
    if (orderId) {
      getPayOrder(orderId);
    }
  }, [orderId]);

  const handlePay = async () => {
    setIsLoading(true);
    try {
      await submitPay(orderId);
      showSuccess(`結帳成功！`);
      dispatch(renderRefresh());
      navigate(`/`);
    } catch (error) {
      showError(`取得失敗:${error.response.data.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // 回到送單頁
  const handleCheckoutPage = () => {
    navigate('/checkout');
  };
  // 時間轉換
  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString();
  };
  const userOrderData = [
    { label: '收件人', key: 'name' },
    { label: '聯絡電話', key: 'tel' },
    { label: 'Email', key: 'email' },
    { label: '收件地址', key: 'address' },
    { label: '付款方式', key: 'payment_method', isPayment: true },
    { label: '備註', key: 'message' },
  ];
  // 處理支付方式格式
  const paymentMap = {
    cash: '現金',
    credit_card: '信用卡',
    e_payment: '電子支付',
  };

  return (
    <>
      <div className='container'>
        {isLoading ? (
          <div className='d-flex flex-column justify-content-center align-items-center my-5'>
            <LoadingSpinner />
            <p className='text-primary fs-3 mt-2'>資料載入中</p>
          </div>
        ) : (
          <>
            <div className='row'>
              {/* 結帳表單 */}
              <div className=' my-4'>
                {/* 回結帳按鈕 */}
                <div className='col-12 col-md-8 d-flex align-items-center'>
                  <button
                    type='button'
                    className='btn btn-outline-primary-800 fw-bold border-0'
                    onClick={handleCheckoutPage}
                  >
                    <i className='bi bi-arrow-bar-left me-1'></i>回到購物車
                  </button>
                </div>
                {/* 結帳頁面 */}
                <div className='row m-3 mb-8'>
                  <div className='col-md-8'>
                    <h3>Order Information</h3>
                    <hr />
                    {orderData ? (
                      <>
                        <div className='row'>
                          <div className='col-6'>
                            <h4>訂單編號</h4>
                            <p>{orderData.id}</p>
                          </div>
                          <div className='col-6'>
                            <h4>訂單成立時間</h4>
                            <p>{formatDate(orderData.create_at)}</p>
                          </div>
                          <hr />

                          <div className='row px-5'>
                            {userOrderData.map((user) => (
                              <div className='col-6 mb-2' key={user.key}>
                                <h5 className='mb-0'>{user.label}</h5>
                                <p className='fw-medium mb-0'>
                                  {user.isPayment
                                    ? paymentMap[orderData.user?.[user.key]] ||
                                      '載入失敗，請稍候再試'
                                    : orderData.user?.[user.key] || '無'}
                                </p>
                              </div>
                            ))}
                          </div>
                          <hr />
                          <div className='col-12 px-5'>
                            <h4>訂購內容</h4>
                            <div className='table-responsive rounded-3'>
                              <table className='table table-hover align-middle'>
                                <thead className='table-primary'>
                                  <tr>
                                    <th>商品</th>
                                    <th>數量</th>
                                    <th>小計</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {orderProducts?.map((item) => (
                                    <tr key={item.id}>
                                      <td>
                                        <p className='fw-bold mb-0'>
                                          {item.product.title}
                                        </p>
                                        <p className='text-sec-800 mb-0'>
                                          NT${' '}
                                          {item.product.price.toLocaleString()}
                                        </p>
                                      </td>
                                      <td>x {item.qty}</td>
                                      <td className='fw-bold'>
                                        NT$ {item.final_total.toLocaleString()}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <p className='text-error'>載入失敗，請稍候再試</p>
                    )}
                  </div>
                  <div className='col-md-4'>
                    <h3 className='text-center'>Confirm Payment</h3>
                    <hr />
                    <div className='d-flex justify-content-between align-items-center px-5 mb-5'>
                      <p className='fs-4 mb-0'>總計金額</p>
                      <p className='fs-4 text-primary mb-0'>
                        NT$ {orderData.total?.toLocaleString()}
                      </p>
                    </div>
                    <p className='mb-5'>
                      確認訂單資訊無誤後，請點擊按鈕完成付款
                    </p>
                    <button
                      type='button'
                      className='btn btn-primary w-100 fs-5'
                      onClick={handlePay}
                      disabled={orderData.is_paid}
                    >
                      {orderData.is_paid ? '已完成付款' : '確認付款'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
export default Payment;
