import { useState, useEffect } from 'react';
import useMessage from '../../hooks/useMessage';
// API
import {
  getAdminProducts,
  deleteProduct,
  uploadImage,
  addProduct,
  editProduct,
} from '../../api/ApiAdmin';
// 元件
import LoadingSpinner from '../../components/LoadingSpinner';
import Pagination from '../../components/Pagination';
import DetailModal from '../../components/admin/DetailModal';
import ProductModal from '../../components/admin/ProductModal';
import ConfirmModal from '../../components/ConfirmModal';
// redux
import { useDispatch } from 'react-redux';
import { createAsyncMessage } from '../../store/slices/messageSlice';

// data
import { addNewProduct } from '../../Data/AdminData';

function AdmProducts() {
  const [products, setProducts] = useState([]);
  // loading spinner 設定
  const [isLoading, setIsLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  // pagination
  const [pagination, setPagination] = useState({});
  const [tempProduct, setTempProduct] = useState(addNewProduct); // 之前是 null 但現在要存資料的格式
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [confirmId, setConfirmId] = useState(null);
  const { showError, showSuccess } = useMessage();
  const dispatch = useDispatch();

  // detailModal
  const openDetailModal = (product) => {
    setTempProduct(product);
    setIsDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
  };

  // ProductModal
  const openProductModal = (mode, product = addNewProduct) => {
    setModalMode(mode);
    setTempProduct(product); // 判斷編輯 or 新增
    setIsProductModalOpen(true);
  };

  // API
  // 取得商品資料
  const getData = async (page = 1) => {
    setLoadingData(true);
    try {
      const res = await getAdminProducts(page);
      setProducts(Object.values(res.data.products));
      setPagination(res.data.pagination);
    } catch (error) {
      dispatch(createAsyncMessage(error.response.data));
    } finally {
      setLoadingData(null);
    }
  };

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      try {
        await getData();
      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, []);

  const handleDelete = async () => {
    try {
      const res = await deleteProduct(confirmId);
      showSuccess('刪除成功', res.data);
      setConfirmId(null);
      getData();
    } catch (error) {
      showError('刪除失敗', error);
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    // 如果沒有檔案
    if (!file) {
      return;
    }
    // 限制檔案大小
    if (file.size > 3 * 1024 * 1024) {
      showError('檔案不能超過 3MB');
      return;
    }
    try {
      const formData = new FormData();
      formData.append('file-to-upload', file);
      const res = await uploadImage(formData);
      showSuccess('上傳成功');
      setTempProduct((pre) => ({
        ...pre,
        imageUrl: res.data.imageUrl,
      }));
    } catch (error) {
      showError('上傳失敗', error);
    }
  };

  // 多張圖片
  const handleImageChange = (index, value) => {
    setTempProduct((pre) => {
      const newImages = [...pre.imagesUrl]; // 複製新陣列
      newImages[index] = value; // 修改指定位置的值
      return { ...pre, imagesUrl: newImages }; // 更新回去
    });
  };

  // 新增多圖的圖片
  const handleAddImage = () => {
    setTempProduct((pre) => {
      const newImages = [...pre.imagesUrl, '']; // 原始陣列 + 一個空字串
      return { ...pre, imagesUrl: newImages };
    });
  };

  // 刪除多圖的圖片
  const handleRemoveImage = () => {
    setTempProduct((prev) => {
      const newImages = [...prev.imagesUrl];
      newImages.pop();
      return { ...prev, imagesUrl: newImages };
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTempProduct((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? checked
          : name === 'price' || name === 'origin_price' || name === 'star'
            ? Number(value)
            : value,
      is_enabled: name === 'is_enabled' ? Number(value) : prev.is_enabled,
    }));
  };

  // 處理巢狀欄位
  const handleDifficultyChange = (e) => {
    const { name, value, type } = e.target;
    setTempProduct((prev) => ({
      ...prev,
      difficulty: {
        ...prev.difficulty,
        [name]: type === 'number' ? Number(value) : value,
      },
    }));
  };

  const handleEnvironmentChange = (e) => {
    const { name, value } = e.target;
    setTempProduct((prev) => ({
      ...prev,
      environment: {
        ...prev.environment,
        [name]: value,
      },
    }));
  };

  // submit 新增或修改
  const handleEditProduct = async () => {
    setIsLoading(true);
    try {
      if (modalMode === 'create') {
        await addProduct(tempProduct);
      } else {
        await editProduct(tempProduct.id, tempProduct);
      }
      showSuccess(`${modalMode === 'create' ? '新增' : '更新'}成功`);
      setIsProductModalOpen(false);
      getData();
    } catch {
      dispatch(
        createAsyncMessage({
          success: false,
          message: `${modalMode === 'create' ? '新增' : '更新'}失敗`,
        }),
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='container my-5'>
      <h1 className='text-sec-500 mb-5'>產品列表</h1>
      <div className='mb-3 d-flex gap-2'>
        <button
          className='btn btn-tert-500'
          onClick={() => getData()}
          disabled={loadingData}
        >
          {loadingData ? (
            <div className='d-flex justify-content-center align-items-center'>
              <LoadingSpinner
                spinner='RotatingLines'
                color='#272725'
                width='16px'
                height='16px'
              />
              <span className='ms-2'>處理中</span>
            </div>
          ) : (
            <>
              <i className='bi bi-arrow-clockwise'></i>
              <span className='ms-2'>重新整理</span>
            </>
          )}
        </button>

        <button
          className='btn btn-primary'
          onClick={() => openProductModal('create')}
        >
          <i className='bi bi-plus-lg me-1'></i>建立新的商品
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
                  <th>產品名稱</th>
                  <th>原價</th>
                  <th>售價</th>
                  <th>是否啟用</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                {products.map((item) => (
                  <tr key={item.id}>
                    <td>{item.title}</td>
                    <td>{item.origin_price.toLocaleString()}</td>
                    <td>{item.price.toLocaleString()}</td>
                    <td>
                      {item.is_enabled ? (
                        <span className='text-success'>啟用</span>
                      ) : (
                        <span className='text-danger'>未啟用</span>
                      )}
                    </td>
                    <td>
                      <button
                        className='btn btn-sm btn-outline-primary me-2'
                        onClick={() => openDetailModal(item)}
                      >
                        查看內容
                      </button>
                      <button
                        className='btn btn-sm btn-outline-accent me-2'
                        onClick={() => openProductModal('edit', item)}
                      >
                        編輯
                      </button>
                      <button
                        className='btn btn-sm btn-outline-error'
                        onClick={() => setConfirmId(item.id)}
                      >
                        刪除
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination pagination={pagination} onChangePage={getData} />
          </div>
          {/* 詳情 modal */}
          <DetailModal
            isOpen={isDetailModalOpen}
            tempProduct={tempProduct}
            onClose={closeDetailModal}
          />
          {/* 新增 + 編輯 modal */}
          <ProductModal
            isOpen={isProductModalOpen}
            onClose={() => setIsProductModalOpen(false)}
            modalMode={modalMode}
            tempProduct={tempProduct}
            onInputChange={handleInputChange}
            onSubmit={handleEditProduct}
            onImageChange={handleImageChange}
            onAddImage={handleAddImage}
            onRemoveImage={handleRemoveImage}
            onUploadImage={handleUpload}
            onDifficultyChange={handleDifficultyChange}
            onEnvironmentChange={handleEnvironmentChange}
          />
          <ConfirmModal
            isOpen={confirmId !== null}
            message='確定要刪除此商品嗎？'
            onConfirm={handleDelete}
            onCancel={() => setConfirmId(null)}
          />
        </div>
      )}
    </div>
  );
}
export default AdmProducts;
