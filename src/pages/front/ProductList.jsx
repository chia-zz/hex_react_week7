import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useMessage from '../../hooks/useMessage';
import { useDispatch } from 'react-redux';
import { renderRefresh } from '../../store/slices/cartSlice';

// API
import { getProducts, getAllProducts, addCart } from '../../api/ApiClient';
// 元件
import LoadingSpinner from '../../components/LoadingSpinner';
import Pagination from '../../components/Pagination';
import CategoryNav from '../../components/CategoryNav';

function ProductList() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  // loading spinner 設定
  const [isLoading, setIsLoading] = useState(false);
  const [loadingCartId, setLoadingCartId] = useState(null);
  // pagination
  const [pagination, setPagination] = useState({});
  // category
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('');
  const { showError, showSuccess } = useMessage();
  const dispatch = useDispatch();

  // API
  // 取得商品分類分頁資料
  const getData = async (page = 1, category = '') => {
    setIsLoading(true);
    try {
      const res = await getProducts(page, category);
      setProducts(Object.values(res.data.products));
      setPagination(res.data.pagination);
    } catch (error) {
      showError('取得資料失敗', error);
      // navigate("/");
    } finally {
      setIsLoading(false);
    }
  };
  // 取得產品分類
  const getCategories = async () => {
    try {
      const res = await getAllProducts();
      const allProducts = Object.values(res.data.products);
      const categoryList = [
        ...new Set(allProducts.map((item) => item.category)),
      ];
      setCategories(categoryList);
    } catch (error) {
      showError('取得分類失敗', error.message.data);
    }
  };

  useEffect(() => {
    getData();
    getCategories();
  }, []);

  const handleCategoryChange = (category) => {
    setCurrentCategory(category);
    getData(1, category);
  };

  const handleDetailPage = (id) => {
    navigate(`/product/${id}`);
  };

  const handlePageChange = (page) => {
    getData(page, currentCategory);
  };

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
    <div className='container'>
      <div className='d-flex flex-column justify-content-center align-items-center my-5'>
        <h1 className='text-primary-800 mb-4'>植感圖鑑</h1>
        <CategoryNav
          categories={categories}
          activeCategory={currentCategory}
          onChangeCategory={handleCategoryChange}
        />{' '}
        {isLoading ? (
          <div className='d-flex flex-column justify-content-center align-items-center my-5'>
            <LoadingSpinner />
            <p className='text-primary fs-3 mt-2'>資料載入中</p>
          </div>
        ) : (
          <>
            <div className='container'>
              <div className='row g-3'>
                {products.map((item) => (
                  <div className='col-md-6 col-lg-4' key={item.id}>
                    <div className='card list-card'>
                      <img
                        src={item.imageUrl}
                        className='card-img-top'
                        alt={item.title}
                      />
                      <div className='card-body text-start'>
                        <span className='badge bg-tert-700 text-sec-50 px-2 rounded-pill mb-1'>
                          {item.category}
                        </span>
                        <h5 className='card-title fw-bold'>{item.title}</h5>
                        <p className='card-text'>
                          <span className='text-error fw-bold fs-5'>
                            <span className='me-1'>NT$</span>
                            {item.price}
                          </span>
                          /
                          <small>
                            <del className='text-muted'>
                              {' '}
                              <span className='me-1'>NT$</span>
                              {item.origin_price}
                            </del>
                          </small>
                        </p>
                        <div className='d-flex justify-content-around gap-2'>
                          <button
                            type='button'
                            className='w-100 btn btn-outline-primary'
                            onClick={() => handleDetailPage(item.id)}
                          >
                            查看更多
                          </button>
                          <button
                            type='button'
                            className='w-100 btn btn-outline-primary'
                            onClick={() => addCartBtn(item.id, 1)}
                            disabled={loadingCartId === item.id}
                          >
                            {loadingCartId === item.id ? (
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
                ))}
              </div>
              <div className='d-flex justify-content-center mt-4'>
                <Pagination
                  pagination={pagination}
                  onChangePage={handlePageChange}
                />
              </div>
            </div>{' '}
          </>
        )}
      </div>
    </div>
  );
}

export default ProductList;
