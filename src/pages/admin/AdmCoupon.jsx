import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useMessage from '../../hooks/useMessage';

// API
import {
  addNewCoupon,
  getAllCoupon,
  editCoupon,
  deleteCoupon,
} from '../../api/ApiAdmin';

// 元件
import LoadingSpinner from '../../components/LoadingSpinner';
import Pagination from '../../components/Pagination';
import CouponModal from '../../components/admin/CouponModal';
import CouponDetail from '../../components/admin/CouponDetail';

// data
import { addCoupon } from '../../Data/AdminData';

function AdmCoupon() {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [pagination, setPagination] = useState({});
  const [modalMode, setModalMode] = useState('create');
  const [coupon, setCoupon] = useState([]);
  const [tempCoupon, setTempCoupon] = useState(addCoupon);
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [isCouponDetailOpen, setIsCouponDetailOpen] = useState(false);

  const { showError, showSuccess } = useMessage();

  // CouponDetail
  const openCouponDetail = (Coupon) => {
    setTempCoupon(Coupon);
    setIsCouponDetailOpen(true);
  };
  const closeDetailModal = () => {
    setIsCouponDetailOpen(false);
  };

  // CouponModal
  const openCouponModal = (mode, couponData = addCoupon) => {
    setModalMode(mode);
    const reformData = couponData.due_date
      ? {
          ...couponData,
          due_date: new Date(couponData.due_date * 1000)
            .toISOString()
            .slice(0, 16),
        }
      : couponData;
    setTempCoupon(reformData); // 判斷編輯 or 新增
    setIsCouponModalOpen(true);
  };

  // API
  // 取得訂單資料
  const getCouponData = async (page = 1) => {
    setLoadingData(true);
    try {
      const res = await getAllCoupon(page);
      console.log(res.data);
      console.log('優惠券資料：', res.data.coupons);
      setCoupon(res.data.coupons);
      setPagination(res.data.pagination);
    } catch (error) {
      showError('取得資料失敗', error.messages);
      console.log(error.messages);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      try {
        await getCouponData();
      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, []);

  // delete coupon
  const handleDelete = async (id) => {
    try {
      const isConfirm = window.confirm('確定要移除該商品嗎？');
      if (isConfirm) {
        const res = await deleteCoupon(id);
        showSuccess('刪除成功', res.data);
        getCouponData();
      }
    } catch (error) {
      showError('刪除失敗', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setTempCoupon((prev) => ({
      ...prev,
      [name]: type === 'radio' || type === 'number' ? Number(value) : value,
    }));
  };

  // edit coupon
  const handleEditCoupon = async () => {
    setIsLoading(true);
    try {
      const reformData = {
        ...tempCoupon,
        num: Number(tempCoupon.num),
        percent: Number(tempCoupon.percent),
        due_date: Math.floor(new Date(tempCoupon.due_date).getTime() / 1000), // 👈
      };
      if (modalMode === 'create') {
        await addNewCoupon(reformData);
      } else {
        await editCoupon(tempCoupon.id, reformData);
      }
      showSuccess(`${modalMode === 'create' ? '新增' : '更新'}成功`);
      setIsCouponModalOpen(false);
      getCouponData();
    } catch {
      showError(`${modalMode === 'create' ? '新增' : '更新'}失敗`);
    } finally {
      setIsLoading(false);
    }
  };

  // 時間轉換
  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString();
  };

  return (
    <>
      <div className='container my-5'>
        <h1 className='text-sec-500 mb-5'>優惠券列表</h1>
        <div className='mb-3 d-flex gap-2'>
          <button
            className='btn btn-tert-500'
            onClick={() => getCouponData()}
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
            onClick={() => openCouponModal('create')}
          >
            <i className='bi bi-plus-lg me-1'></i>建立新優惠券
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
                    <th>優惠券名稱</th>
                    <th>優惠代碼</th>
                    <th>折扣額度</th>
                    <th>到期日</th>
                    <th>是否啟用</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  {coupon?.map((item) => (
                    <tr
                      key={item.id}
                      onClick={() => openCouponDetail(item)}
                      style={{ cursor: 'pointer' }}
                    >
                      <td>{item.title}</td>
                      <td>{item.code}</td>
                      <td>{item.percent}</td>
                      <td>{formatDate(item.due_date)}</td>
                      <td>
                        {item.is_enabled ? (
                          <span className='text-success'>已啟用</span>
                        ) : (
                          <span className='text-danger'>未啟用</span>
                        )}
                      </td>
                      <td>
                        <button
                          className='btn btn-sm btn-outline-accent me-2'
                          onClick={(e) => {
                            e.stopPropagation();
                            openCouponModal('edit', item);
                          }}
                        >
                          編輯
                        </button>
                        <button
                          type='button'
                          className='btn btn-sm btn-outline-error'
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(item.id);
                          }}
                        >
                          刪除
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                pagination={pagination}
                onChangePage={getCouponData}
              />
            </div>
            <CouponDetail
              isOpen={isCouponDetailOpen}
              tempCoupon={tempCoupon}
              onClose={closeDetailModal}
            />
            <CouponModal
              isOpen={isCouponModalOpen}
              onClose={() => setIsCouponModalOpen(false)}
              modalMode={modalMode}
              tempCoupon={tempCoupon}
              onInputChange={handleInputChange}
              onSubmit={handleEditCoupon}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default AdmCoupon;
