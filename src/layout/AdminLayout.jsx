import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import AdmSidebar from './AdmSidebar';
import LoadingSpinner from '../components/LoadingSpinner';
import useMessage from '../hooks/useMessage';

// API
import { adminLogout } from '../api/ApiAdmin';

function AdminLayout() {
  const navigate = useNavigate();
  const { showError, showSuccess } = useMessage();

  const handleLogout = () => {
    try {
      const res = adminLogout();
      document.cookie = 'hexToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
      axios.defaults.headers.common['Authorization'] = '';
      showSuccess('成功登出', res.data);
      navigate('/');
    } catch (error) {
      showError('發生錯誤', error);
      navigate('/');
    }
  };
  return (
    <>
      <div className='admin_base position-relative'>
        <header className='d-flex justify-content-between py-3 px-4 text-primary-100 bg-primary-900'>
          <h1 className='mb-0'>後台管理系統</h1>
          <div className='d-flex gap-2'>
            {/* <button className='btn btn-tert-700' onClick={checkLogin}>
            <i className='bi bi-person-check me-1'></i>驗證登入狀態
          </button> */}
            <button className='btn btn-danger ms-auto' onClick={handleLogout}>
              <i className='bi bi-box-arrow-right me-1'></i>登出
            </button>
          </div>
        </header>
        <div className='admin_base d-flex position-relative'>
          <div className='adm__sidebar'>
            <AdmSidebar />
          </div>

          <main className='mt-9 mt-md-0 '>
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}

export default AdminLayout;
