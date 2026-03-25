import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import useMessage from '../hooks/useMessage';
import { useDispatch } from 'react-redux';
import { getProducts, addCart } from '../api/ApiClient';
import { renderRefresh } from '../store/slices/cartSlice';
import { Link } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

function NewArrival() {
  // const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loadingCartId, setLoadingCartId] = useState(null);
  const { showError, showSuccess } = useMessage();
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async (page = 1, category = '') => {
      try {
        const res = await getProducts(page, category);
        setProducts(Object.values(res.data.products));
      } catch (error) {
        showError('取得資料失敗', error);
      }
    };
    getData();
  }, []);

  // 抓最新上架
  const latestProducts = Object.entries(products)
    .map(([id, data]) => ({
      id,
      ...data,
    }))
    .sort((a, b) => b.create_at - a.create_at)
    .slice(0, 4);

  // 加入購物車(單一數量)
  const addCartBtn = async (id = '', qty = 1) => {
    setLoadingCartId(id);
    try {
      await addCart(id, qty);
      showSuccess('加入購物車！');
      dispatch(renderRefresh());
    } catch (error) {
      showError('加入失敗', error);
    } finally {
      setLoadingCartId(null);
    }
  };

  return (
    <>
      <section className='my-4 my-md-8'>
        {' '}
        <div className='container'>
          <div className='row g-2'>
            <h2 className='text-sec-900 text-start my-4'>New Arrival</h2>
            {latestProducts.map((product) => (
              <div className='col-sm-6 col-md-3' key={product.id}>
                <Link
                  to={`/product/${product.id}`}
                  className='text-decoration-none'
                >
                  <div className='card list-card h-100 rounded-4 overflow-hidden'>
                    <div className='position-relative overflow-hidden'>
                      <span className='badge rounded-pill bg-tert-600 text-primary-50 position-absolute top-0 start-0 mt-3 ms-3 z-3'>
                        最新上架
                      </span>

                      <button
                        type='button'
                        className='btn-addtocart btn btn-primary-600 border-0 position-absolute bottom-0 end-0 mb-2 me-2 z-3'
                        onClick={(e) => {
                          e.preventDefault();
                          addCartBtn(product.id, 1);
                        }}
                        disabled={loadingCartId === product.id}
                        aria-label='加入購物車'
                      >
                        {loadingCartId === product.id ? (
                          <>
                            <div>
                              <LoadingSpinner
                                spinner='RotatingLines'
                                color='#f2f7f3'
                                strokeColor='#2771a5'
                              />
                            </div>
                          </>
                        ) : (
                          <i className='bi bi-bag' aria-hidden='true'></i>
                        )}
                      </button>
                      <img
                        src={product.imageUrl}
                        className='card-img-top object-fit-cover rounded-bottom-0'
                        alt={product.title}
                        style={{ width: '100%', height: '180px' }}
                      />
                    </div>
                    <div className='card-body text-start py-4 px-5'>
                      <div className='d-flex justify-content-between align-items-center text-gray-600 mb-1'>
                        <p
                          className='fs-6 fs-md-5 fw-bold mb-0'
                          title={product.title}
                        >
                          {product.title}
                        </p>
                        <span className='fs-6 fs-md-5 fw-bold'>
                          ${product.price}
                        </span>
                      </div>
                      <div className='d-flex justify-content-between align-items-center text-gray-600 mb-1'>
                        <span className='badge rounded-2 bg-accent text-primary-50 z-3'>
                          {product.category}
                        </span>
                        <p className=' fw-bold mb-0'>
                          照顧難度:
                          {product.difficulty.stars}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
export default NewArrival;
