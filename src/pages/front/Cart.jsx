import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import useMessage from '../../hooks/useMessage';
import { useDispatch } from 'react-redux';
import { renderRefresh } from '../../store/slices/cartSlice';
// API
import {
  getCart,
  editCart,
  deleteCart,
  deleteAllCart,
} from '../../api/ApiClient';
// 元件
import LoadingSpinner from '../../components/LoadingSpinner';

function Cart() {
  const navigate = useNavigate();
  const [cartItem, setCartItem] = useState([]);
  // 金額
  const [total, setTotal] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { showError, showSuccess } = useMessage();
  const dispatch = useDispatch();

  // 取得購物車內容
  const getAllCart = async () => {
    try {
      const res = await getCart();
      setCartItem(res.data.data.carts);
      setTotal(res.data.data.total);
      setFinalTotal(res.data.data.final_total);
    } catch (error) {
      showError('購物車內容載入失敗', error);
    }
  };

  // 修改購物車內容
  const updateCartItem = async (item, qty) => {
    if (qty === 0) {
      const isConfirm = window.confirm('確定要移除該商品嗎？');
      if (isConfirm) {
        removeCartItem(item.id);
      }
      return;
    }
    try {
      await editCart(item.id, item.product_id, qty);
      showSuccess('數量已更新');
      getAllCart();
      dispatch(renderRefresh());
    } catch (error) {
      console.error('更新失敗', error);
      showError('更新失敗');
    }
  };

  // 刪除一項
  const removeCartItem = async (cartId) => {
    try {
      const isConfirm = window.confirm('確定要移除該商品嗎？');
      if (isConfirm) {
        await deleteCart(cartId);
        showSuccess('已刪除該商品');
        getAllCart();
        dispatch(renderRefresh());
      }
    } catch (error) {
      console.log('刪除失敗', error);
    }
  };

  // 刪除全部
  const clearCart = async () => {
    try {
      const isConfirm = window.confirm('確定要清空購物車嗎？');
      if (isConfirm) {
        await deleteAllCart();
        showSuccess('購物車已清空');
        getAllCart();
        dispatch(renderRefresh());
      }
    } catch (error) {
      console.error('清空失敗', error);
    }
  };

  // 回到產品頁
  const handleProductPage = () => {
    navigate('/product');
  };

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      await getAllCart(); // 用 await 等 API 抓完資料再關 loading
      setIsLoading(false);
    };
    init();
  }, []);

  return (
    <>
      <div className='container my-5'>
        {isLoading ? (
          <div className='d-flex flex-column justify-content-center align-items-center my-5'>
            <LoadingSpinner />
            <p className='text-primary fs-3 mt-2'>資料載入中</p>
          </div>
        ) : cartItem.length === 0 ? (
          // 先判斷購物車裡有沒有東西
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
                          >
                            <i className='bi bi-dash-circle'></i>
                          </button>
                          <span>
                            <strong className='fs-3 text-success mx-2'>
                              {item.qty}
                            </strong>
                          </span>
                          <button
                            className='btn btn-outline-primary border-0'
                            type='button'
                            onClick={() => updateCartItem(item, item.qty + 1)}
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
                      <span className='me-1'>NT$</span>0
                    </span>
                    /
                    <span className='fs-sm ms-1'>
                      <del className='text-sec-700'>NT$&nbsp;60</del>
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
                    {finalTotal.toLocaleString()}
                  </span>
                </span>
              </h3>

              <Link
                className=' btn btn-primary border mt-3 mx-2 w-100 d-inline-block text-primary-50 fw-semibold text-decoration-none'
                to={'/checkout'}
              >
                <span className=' fs-5'>前往結帳</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default Cart;
