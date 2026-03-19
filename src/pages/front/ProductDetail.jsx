import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// API
import { getProductDetail, addCart } from '../../api/ApiClient';
// 元件
import LoadingSpinner from '../../components/LoadingSpinner';

function ProductDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  // loading spinner 設定
  const [isLoading, setIsLoading] = useState(false);
  const [loadingCartId, setLoadingCartId] = useState(null);
  // 購物車數量設定
  const [count, setCount] = useState(1);

  useEffect(() => {
    const getProductIdDetail = async (id) => {
      try {
        setIsLoading(true);
        const res = await getProductDetail(id);
        // console.log('API 回傳ID資料:', res.data);
        setProduct(res.data.product);
      } catch (error) {
        console.log('取得ID失敗', error);
      } finally {
        setIsLoading(false);
      }
    };
    getProductIdDetail(id);
  }, [id]);

  // 購物車數量
  const handleAdd = () => {
    setCount((prevCount) => prevCount + 1);
  };
  const handleReduce = () => {
    // 不能小於 1
    setCount((prevCount) => (prevCount === 1 ? 1 : prevCount - 1));
  };
  // 回上一頁
  const handlePrevPage = () => {
    navigate(-1);
  };

  // 加入購物車
  const addCartBtn = async (id, qty) => {
    setLoadingCartId(id);
    try {
      await addCart(id, qty);
      toast.success('成功加入購物車！');
      setCount(1); // 重置數量
    } catch (error) {
      toast.error('加入失敗', error);
    } finally {
      setLoadingCartId(null);
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
        ) : (
          <div className='container my-3'>
            <div className='text-start my-3'>
              <button
                type='button'
                className='btn btn-primary-400 text-primary-100'
                onClick={handlePrevPage}
              >
                <i className='bi bi-chevron-left me-1'></i>回上一頁
              </button>
            </div>
            <div className='row g-5' key={product.id}>
              <div className='col-md-6'>
                <img
                  src={product.imageUrl}
                  className='card-img-top productDetail-img'
                  alt={product.title}
                />
              </div>
              <div className='col-md-6'>
                <div className='productDetail-card'>
                  <div className='mb-3'>
                    <span className='bg-tert-700 text-sec-50 p-2 rounded-2'>
                      {product.category}
                    </span>
                  </div>
                  <h1 className='card-title fw-bold'>{product.title}</h1>
                  <div className='fs-6'>{product.description}</div>
                  <p className='mb-0'>
                    <span className='text-error fw-bold fs-3 me-1'>
                      <span className='me-1'>NT$</span>
                      {product.price}
                    </span>
                    /
                    <small className='ms-1'>
                      <del className='text-muted'>
                        <span className='me-1'>NT$</span>
                        {product.origin_price}
                      </del>
                    </small>
                  </p>
                  <hr />
                  <div className='fs-5'>{product.content}</div>
                  {/* 數量 + 加入購物車 */}
                  <div className='d-flex align-items-center gap-2 mt-3'>
                    <div className='d-flex justify-content-between align-items-center gap-2'>
                      <span className='fs-4'>數量</span>
                      <button
                        type='button'
                        className='btn btn-outline-primary border-0'
                        onClick={handleReduce}
                      >
                        <i className='bi bi-dash-circle'></i>
                      </button>
                      <span>
                        <strong className='fs-3 text-error mx-2'>
                          {count}
                        </strong>
                      </span>
                      <button
                        type='button'
                        className='btn btn-outline-primary border-0'
                        onClick={handleAdd}
                      >
                        <i className='bi bi-plus-circle'></i>
                      </button>
                    </div>
                    <div>
                      <button
                        type='button'
                        className='w-100 btn btn-outline-primary'
                        onClick={() => addCartBtn(product.id, count)}
                        disabled={loadingCartId === product.id}
                      >
                        {loadingCartId === product.id ? (
                          <>
                            <div className='d-flex justify-content-center'>
                              <LoadingSpinner />
                            </div>
                          </>
                        ) : (
                          '加入購物車'
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='d-flex justify-content-center mt-4'></div>
          </div>
        )}
      </div>
    </>
  );
}
export default ProductDetail;
