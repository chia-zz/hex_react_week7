import { useState, useEffect } from 'react';
import useMessage from '../../hooks/useMessage';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  renderRefresh,
  setCartData,
  selectNeedsRefresh,
} from '../../store/slices/cartSlice';
// API
import { getCart, submitOrder, postCoupon } from '../../api/ApiClient';
// 元件
import LoadingSpinner from '../../components/common/LoadingSpinner';

function Checkout() {
  const navigate = useNavigate();
  const [cartItem, setCartItem] = useState([]);
  // 金額
  const [total, setTotal] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { showError, showSuccess } = useMessage();
  const needsRefresh = useSelector(selectNeedsRefresh);
  const [couponCode, setCouponCode] = useState('');
  const [discountPrice, setDiscountPrice] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);

  // 取得購物車內容
  const getAllCart = async () => {
    setIsLoading(true);
    try {
      const res = await getCart();
      setCartItem(res.data.data.carts);
      setTotal(res.data.data.total);
      setFinalTotal(res.data.data.total);
      setDiscountPrice(0);
      setCouponCode('');
      dispatch(setCartData(res.data.data));
    } catch (error) {
      showError('購物車內容載入失敗', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 處理優惠券
  const applyCoupon = async () => {
    if (!couponCode.trim()) {
      showError('請輸入優惠碼');
      return;
    }
    try {
      const res = await postCoupon({
        code: couponCode.toUpperCase(),
      });
      const discountPrice = Math.round(total - res.data.data.final_total);
      const discountFinalPrice = Math.round(res.data.data.final_total);
      setDiscountPrice(discountPrice);
      setFinalTotal(discountFinalPrice);
      showSuccess(`優惠券套用成功！折扣後金額 NT$ ${discountFinalPrice}`);
    } catch (error) {
      showError('優惠碼無效或已過期', error);
    }
  };
  // 處理運費， finalTotal 改變就重新算運費
  useEffect(() => {
    // 購物車為空時運費為0
    if (finalTotal === 0) {
      setShippingFee(0);
      return;
    }
    if (finalTotal >= 1000) {
      setShippingFee(0);
    } else {
      setShippingFee(60);
    }
  }, [finalTotal]);

  // 表單驗證設定
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm(
    {
      defaultValues: {
        name: '',
        email: '',
        tel: '',
        payment_method: '',
      },
    },
    { mode: 'onChange' },
  );

  // 回到購物車頁
  const handleCartPage = () => {
    navigate('/cart');
  };
  // 回到產品頁
  const handleProductPage = () => {
    navigate('/product');
  };

  useEffect(() => {
    getAllCart();
  }, [needsRefresh]);

  // 表單 submit
  const onSubmit = async (formData) => {
    setIsLoading(true);
    try {
      const data = {
        user: formData,
        message: formData.message,
      };
      const res = await submitOrder(data);
      const orderId = res.data.orderId;
      showSuccess('訂單送出成功！');
      reset();
      getAllCart();
      setCouponCode('');
      setFinalTotal(0);
      dispatch(renderRefresh());
      navigate(`/payment/${orderId}`);
    } catch (error) {
      showError('送出訂單發生錯誤：', error);
    } finally {
      setCouponCode('');
      setFinalTotal(0);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className='container'>
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
            {/* 結帳表單 */}
            <div className=' my-4'>
              {/* 回購物車按鈕 */}
              <div className='col-12 col-md-8 d-flex align-items-center'>
                <button
                  type='button'
                  className='btn btn-outline-primary-800 fw-bold border-0'
                  onClick={handleCartPage}
                >
                  <i className='bi bi-arrow-bar-left me-1'></i>回到購物車
                </button>
              </div>
              {/* 結帳頁面 */}
              <div className='m-3'>
                <form
                  className='row text-start '
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className='col-12 col-md-8'>
                    <div className='card bg-sec-50 p-6'>
                      <h2 className='fs-2 text-start text-sec-900'>CHECKOUT</h2>
                      <hr />
                      {/* Email */}
                      <div className='mb-3'>
                        <label
                          htmlFor='email'
                          className='form-label fs-6 text-sec-600 ps-2'
                        >
                          Email
                        </label>
                        <input
                          id='email'
                          name='email'
                          type='email'
                          className='form-control'
                          placeholder='請輸入 Email'
                          {...register('email', {
                            required: '請輸入 Email',
                            pattern: {
                              value: /^\S+@\S+$/i,
                              setValueAs: (v) => v.trim(), // 去掉空白格
                              message: '請輸入正確的 Email 格式',
                            },
                          })}
                        />
                        {errors.email && (
                          <p className='text-error mt-1'>
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                      {/* 訂購人姓名 */}
                      <div className='mb-3'>
                        <label
                          htmlFor='name'
                          className='form-label fs-6 text-sec-600 ps-2'
                        >
                          訂購人姓名
                        </label>
                        <input
                          id='name'
                          name='name'
                          type='text'
                          className='form-control'
                          placeholder='請輸入訂購人姓名'
                          {...register('name', {
                            required: '請輸入訂購人姓名',
                            minLength: { value: 2, message: '名字至少 2 個字' },
                          })}
                        />
                        {errors.name && (
                          <p className='text-error mt-1'>
                            {errors.name.message}
                          </p>
                        )}
                      </div>
                      {/* 連絡電話 */}
                      <div className='mb-3'>
                        <label
                          htmlFor='tel'
                          className='form-label fs-6 text-sec-600 ps-2'
                        >
                          聯絡電話
                        </label>
                        <input
                          id='tel'
                          name='tel'
                          type='tel'
                          className='form-control'
                          placeholder='請輸入手機號碼'
                          {...register('tel', {
                            required: '請輸入手機號碼',
                            minLength: { value: 10, message: '手機至少 10 碼' },
                            pattern: {
                              value: /^09\d{8}$/,
                              setValueAs: (v) => v.trim(),
                              message: '請輸入正確的手機號碼（09xxxxxxxx）',
                            },
                          })}
                        />
                        {errors.tel && (
                          <p className='text-error mt-1'>
                            {errors.tel.message}
                          </p>
                        )}
                      </div>
                      {/* 收件地址 */}
                      <div className='mb-3'>
                        <label
                          htmlFor='address'
                          className='form-label fs-6 text-sec-600 ps-2'
                        >
                          收件地址
                        </label>
                        <input
                          id='address'
                          name='address'
                          type='text'
                          className='form-control'
                          placeholder='請輸入收件地址'
                          {...register('address', {
                            required: '請輸入收件地址',
                          })}
                        />
                      </div>
                      {/* 付款方式 */}
                      <div className='mb-3'>
                        <label
                          htmlFor='payment_method'
                          className='form-label fs-6 text-sec-600 ps-2'
                        >
                          付款方式
                        </label>
                        <select
                          id='payment_method'
                          name='payment_method'
                          className='form-control'
                          {...register('payment_method', {
                            required: '請選擇付款方式',
                            pattern: {
                              message: '請選擇付款方式',
                            },
                          })}
                        >
                          <option value=''>請選擇付款方式</option>
                          <option value='cash'>現金</option>
                          <option value='credit_card'>信用卡</option>
                          <option value='e_payment'>電子支付</option>
                        </select>
                        {errors.payment_method && (
                          <p className='text-error mt-1'>
                            {errors.payment_method.message}
                          </p>
                        )}
                      </div>
                      {/* 留言 */}
                      <div className='mb-3'>
                        <label
                          htmlFor='message'
                          className='form-label fs-6 text-sec-600 ps-2'
                        >
                          留言
                        </label>
                        <textarea
                          id='message'
                          className='form-control'
                          cols='3'
                          rows='10'
                          {...register('message')}
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  {/* 確認結帳金額區 */}
                  <div className='col-md-4 text-sec-900'>
                    <h3 className='text-center mt-3'>Your Bag</h3>
                    <hr />
                    <ul
                      className='list-unstyled mb-0 px-6'
                      style={{ maxHeight: '300px', overflowY: 'auto' }}
                    >
                      {cartItem.map((item) => (
                        <li
                          key={item.id}
                          className='d-flex gap-2 mb-3 pb-3 border-bottom'
                        >
                          <img
                            src={item.product.imageUrl}
                            alt={item.product.title}
                            className='rounded-1 flex-shrink-0'
                            style={{
                              width: '60px',
                              height: '60px',
                              objectFit: 'cover',
                            }}
                          />
                          <div className='flex-grow-1 overflow-hidden'>
                            <div className='text-start fw-semibold text-sec-900 text-truncate'>
                              {item.product.title}
                            </div>
                            <div className='d-flex justify-content-between align-items-center mt-1'>
                              <span className='text-sec-900'>
                                NT$
                                {item.product.price.toLocaleString()} x{' '}
                                {item.qty}
                              </span>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>

                    <h3 className='text-center mt-5'>Coupon</h3>
                    <hr />
                    <div className='d-flex gap-2 px-3 mb-3'>
                      <input
                        type='text'
                        className='form-control'
                        placeholder='請輸入優惠碼'
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            applyCoupon();
                          }
                        }}
                        disabled={isLoading}
                      />
                      {/* <LoadingSpinner spinner='RotatingLines'/> */}
                      <button
                        className='btn btn-accent text-nowrap'
                        type='button'
                        onClick={applyCoupon}
                      >
                        套用
                      </button>
                    </div>

                    <h3 className='text-center mt-5'>Order Summary</h3>
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
                      <h6 className='d-flex px-3'>
                        -&nbsp;折扣金額
                        <span className='ms-auto'>
                          <span className='me-1'>NT$&nbsp;{discountPrice}</span>
                        </span>
                      </h6>
                    </div>
                    <hr />
                    <h3 className='d-flex px-3'>
                      商品總計
                      <span className='ms-auto'>
                        NT$
                        <span className='fw-bold ms-1'>
                          {(finalTotal + shippingFee).toLocaleString()}
                        </span>
                      </span>
                    </h3>
                    <button
                      type='submit'
                      className='mt-3 mx-2 w-100 fs-5 btn btn-primary'
                    >
                      送出訂單
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default Checkout;
