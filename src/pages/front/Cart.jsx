import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useMessage from '../../hooks/useMessage';
import {
  renderRefresh,
  setCartData,
  selectNeedsRefresh,
} from '../../store/slices/cartSlice';

// API
import {
  getCart,
  editCart,
  deleteCart,
  deleteAllCart,
} from '../../api/ApiClient';

// 元件
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ConfirmModal from '../../components/common/ConfirmModal';

function Cart() {
  const [cartItem, setCartItem] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingItemId, setLoadingItemId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [clearAllCart, setClearAllCart] = useState(null);
  const [shippingFee, setShippingFee] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showError, showSuccess } = useMessage();

  const needsRefresh = useSelector(selectNeedsRefresh);

  // 取得購物車內容
  const getAllCart = async () => {
    try {
      const res = await getCart();
      setCartItem(res.data.data.carts);
      setTotal(res.data.data.total);
      dispatch(setCartData(res.data.data));
    } catch (error) {
      showError('購物車內容載入失敗', error);
    }
  };

  // 處理運費
  // 只要 finalTotal 改變，就會觸發重新計算運費
  useEffect(() => {
    // 購物車為空時運費為0
    if (total === 0) {
      setShippingFee(0);
      return;
    }
    if (total >= 1000) {
      setShippingFee(0);
    } else {
      setShippingFee(60);
    }
  }, [total]);

  // 修改購物車內容
  const updateCartItem = async (item, qty) => {
    if (qty === 0) {
      setDeleteId(item.id);
      return;
    }
    setLoadingItemId(item.id);
    try {
      await editCart(item.id, item.product_id, qty);
      showSuccess('數量已更新');
      getAllCart();
      dispatch(renderRefresh());
    } catch (error) {
      console.error('更新失敗', error);
      showError('更新失敗');
    } finally {
      setLoadingItemId(null);
    }
  };

  // 刪除一項
  const removeCartItem = async (cartId) => {
    setDeleteId(cartId);
  };

  const handleRemoveCartItem = async () => {
    try {
      await deleteCart(deleteId);
      showSuccess('已刪除該商品');
      getAllCart();
      dispatch(renderRefresh());
    } catch (error) {
      showError('刪除失敗', error);
    } finally {
      setDeleteId(null);
    }
  };

  // 刪除全部
  const clearCart = async () => {
    setClearAllCart(true);
  };

  const handleClearCart = async () => {
    try {
      await deleteAllCart();
      showSuccess('購物車已清空');
      getAllCart();
      dispatch(renderRefresh());
    } catch (error) {
      console.error('清空失敗', error);
    }
  };

  const handleProductPage = () => {
    navigate('/product');
  };

  useEffect(() => {
    const init = async () => {
      await getAllCart();
      setIsLoading(false);
    };
    init();
  }, [needsRefresh]);

  return (
    <>
      <div className='container my-5'>
        {isLoading ? (
          <div className='d-flex flex-column justify-content-center align-items-center my-5'>
            <LoadingSpinner />
            <p className='text-primary fs-3 mt-2'>資料載入中</p>
          </div>
        ) : cartItem.length === 0 ? (
          <div className='text-error text-center fs-4 my-5'>
            <p>
              <i className='bi bi-cart-x me-2'></i>購物車目前沒有商品
            </p>
            <button
              type='button'
              className='btn btn-primary-400 text-primary-100'
              onClick={handleProductPage}
            >
              <i className='bi bi-arrow-bar-left me-1'></i>去新增商品
            </button>
          </div>
        ) : (
          <>
            <div className='row'>
              <div className='col-12 col-md-8 text-end mb-3'>
                <h2 className='fs-1 text-start text-sec-600 mb-2'>
                  <i className='bi bi-bag me-1'></i>Your Bag
                </h2>
                <button
                  type='button'
                  className='btn btn-error'
                  onClick={() => clearCart()}
                >
                  <i className='bi bi-trash-fill me-1 mb-3'></i>
                  刪除全部
                </button>
              </div>
              <div className='col-md-8'>
                <table className='table table-striped table-hover align-middle'>
                  <thead className='fs-5'>
                    <tr>
                      <th scope='col'>Image</th>
                      <th scope='col'>Products</th>
                      <th scope='col'>Quantity</th>
                      <th scope='col'>Price</th>
                      <th scope='col'>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItem.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <img
                            src={item.product.imageUrl}
                            alt={item.product.title}
                            style={{
                              width: '80px',
                              height: '80px',
                              objectFit: 'cover',
                            }}
                          />
                        </td>
                        <td>{item.product.title}</td>
                        <td>
                          <div className='d-flex justify-content-evenly align-items-center'>
                            <button
                              className='btn btn-outline-primary border-0'
                              type='button'
                              onClick={() => updateCartItem(item, item.qty - 1)}
                              disabled={loadingItemId === item.id}
                            >
                              <i className='bi bi-dash-circle'></i>
                            </button>
                            {loadingItemId === item.id ? (
                              <LoadingSpinner
                                spinner='RotatingLines'
                                width='24px'
                                height='24px'
                              />
                            ) : (
                              <p className='fw-bold fs-3 text-success mx-2 mb-0'>
                                {item.qty}
                              </p>
                            )}
                            <button
                              className='btn btn-outline-primary border-0'
                              type='button'
                              onClick={() => updateCartItem(item, item.qty + 1)}
                              disabled={loadingItemId === item.id}
                            >
                              <i className='bi bi-plus-circle'></i>
                            </button>
                          </div>
                        </td>
                        <td>NT$ {item.total.toLocaleString()}</td>
                        <td>
                          <button
                            type='button'
                            className='btn btn-error btn-sm'
                            onClick={() => removeCartItem(item.id)}
                          >
                            <i className='bi bi-trash'></i> 刪除
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className='col-md-4 text-sec-600'>
                <h3>Order Summary</h3>
                <hr />
                <div className='d-flex flex-column gap-2'>
                  <h5 className='d-flex px-3'>
                    商品小計
                    <span className='ms-auto'>
                      NT$
                      <span className='fw-bold ms-1'>
                        {total.toLocaleString()}
                      </span>
                    </span>
                  </h5>
                  <h5 className='d-flex px-3'>
                    運費
                    <span className='ms-auto'>
                      <span className='text-error fw-bold me-1'>
                        <span className='me-1'>NT$</span>
                        {shippingFee}
                      </span>
                    </span>
                  </h5>
                </div>
                <hr />
                <h3 className='d-flex px-3'>
                  商品總計
                  <span className='ms-auto'>
                    NT$
                    <span className='fw-bold ms-1'>
                      {(total + shippingFee).toLocaleString()}
                    </span>
                  </span>
                </h3>

                <Link
                  className=' btn btn-primary border mt-3 mx-2 w-100 d-inline-block text-primary-50 fw-semibold text-decoration-none'
                  to={'/checkout'}
                >
                  <span className=' fs-5'>下一步</span>
                </Link>
              </div>
            </div>

            <ConfirmModal
              isOpen={deleteId !== null}
              message='確定要移除該商品嗎？'
              onConfirm={handleRemoveCartItem}
              onCancel={() => setDeleteId(null)}
            />

            <ConfirmModal
              isOpen={clearAllCart}
              message='確定要清空購物車嗎？'
              onConfirm={handleClearCart}
              onCancel={() => setClearAllCart(false)}
            />
          </>
        )}
      </div>
    </>
  );
}
export default Cart;
