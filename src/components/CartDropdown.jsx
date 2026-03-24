import { useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useMessage from '../hooks/useMessage';
import Swal from 'sweetalert2';

// API
import { getCart, deleteCart } from '../api/ApiClient';
// component
import LoadingSpinner from './LoadingSpinner';
// cartSilce 區
import {
  openCart,
  closeCart,
  toggleCart,
  selectCartItems,
  selectTotalItems,
  selectTotalPrice,
  selectIsDropdownOpen,
  selectIsLoading,
  selectNeedsRefresh,
  setCartData,
  setLoading,
  setError,
  renderRefresh,
} from '../store/slices/cartSlice';

const CartDropdown = () => {
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const cartItems = useSelector(selectCartItems);
  const totalItems = useSelector(selectTotalItems);
  const totalPrice = useSelector(selectTotalPrice);
  const isOpen = useSelector(selectIsDropdownOpen);
  const isLoading = useSelector(selectIsLoading);
  const needsRefresh = useSelector(selectNeedsRefresh);
  // 處理 hover 狀態
  const closeTimer = useRef(null);

  const { showError, showSuccess } = useMessage();

  // 取得購物車商品
  const getAllCart = useCallback(async () => {
    dispatch(setLoading(true));
    try {
      const res = await getCart();
      dispatch(setCartData(res.data.data));
      console.log(res.data.data);
    } catch (error) {
      dispatch(setError('取得購物車失敗'));
      showError('取得購物車失敗，請稍後再試', error);
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  const handleRemove = async (id) => {
    try {
      const confirmBtn = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-primary-700 me-2',
          cancelButton: 'btn btn-error',
        },
        buttonsStyling: false,
      });
      const result = await confirmBtn.fire({
        title: '確定要移除該商品嗎？',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '確定移除',
        cancelButtonText: '再想想',
      });

      if (result.isConfirmed) {
        dispatch(setLoading(true));
        const res = await deleteCart(id);
        showSuccess('刪除成功', res.data);
        getCart();
        dispatch(renderRefresh());
      }
    } catch (error) {
      showError('刪除失敗', error);
    } finally {
      dispatch(setLoading(false));
    }
  };
  useEffect(() => {
    getAllCart();
  }, [getAllCart, needsRefresh]);

  // 處理 dropdown 狀態
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        dispatch(closeCart());
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, dispatch]);

  // 避免滑鼠離開 icon dropdown 就消失
  const handleMouseEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    dispatch(openCart());
  };
  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => {
      dispatch(closeCart());
    }, 500);
  };
  // timer cleanup
  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  return (
    <div
      className='position-relative '
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 購物車 */}
      <button
        type='button'
        className='home-btn bg-primary-200 border-0 position-relative text-decoration-none'
        onClick={() => dispatch(toggleCart())}
        aria-label='查看購物車'
      >
        <i className='bi bi-cart fs-5' aria-hidden='true'></i>
        {/* badge */}
        {totalItems > 0 && (
          <span className='badge bg-error rounded-pill position-absolute top-0 start-100 translate-middle'>
            {totalItems}
          </span>
        )}
      </button>
      {/* dropdown 區 */}
      {isOpen && (
        <div
          className='header__cartDropdown position-absolute end-0 mt-2 rounded-3 shadow bg-success-light'
          style={{ width: '300px', zIndex: 1050 }}
        >
          <div className='py-3 px-4'>
            <h6 className='fs-5 fw-bold mb-3'>購物車</h6>
            {isLoading ? (
              <div className='d-flex justify-content-center py-4 mx-auto'>
                <LoadingSpinner spinner='RotatingLines' />
              </div>
            ) : cartItems.length === 0 ? (
              // 購物車為空
              <div className='text-center py-4'>
                <i
                  className='bi bi-cart-x fs-1 text-sec-900 mb-2 d-block'
                  aria-hidden='true'
                ></i>
                <p className='text-sec-900 mb-0'>購物車空空如也喔！</p>
              </div>
            ) : (
              // 購物車有商品
              <>
                <ul
                  className='list-unstyled mb-0'
                  style={{ maxHeight: '300px', overflowY: 'auto' }}
                >
                  {cartItems.map((item) => (
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
                            {item.product.price.toLocaleString()} x {item.qty}
                          </span>
                          <button
                            type='button'
                            className='btn btn-outline-error btn-sm'
                            onClick={() => handleRemove(item.id)}
                            aria-label='刪除商品'
                          >
                            <i className='bi bi-trash' aria-hidden='true'></i>
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* 總計 */}
                <div className='d-flex justify-content-between align-items-center mt-2 mb-1'>
                  <span className='fs-6 text-sec-900'>總計</span>
                  <h5 className='text-primary mb-0'>
                    NT${totalPrice.toLocaleString()}
                  </h5>
                </div>
                {/* 前往購物車頁面 */}
                <Link
                  to='/cart'
                  className='btn btn-primary w-100 rounded-pill mt-3'
                  onClick={() => dispatch(closeCart())}
                >
                  前往結帳
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default CartDropdown;
