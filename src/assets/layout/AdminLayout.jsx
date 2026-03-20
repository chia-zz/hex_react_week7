import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import AdmSidebar from '../../layout/AdmSidebar';
import { ToastContainer, toast } from 'react-toastify';
import LoadingSpinner from '../../components/LoadingSpinner';

// API
import { checkUserLogin, adminLogout } from '../../api/ApiAdmin';

function AdminLayout() {
  const navigate = useNavigate();
  // const [isLoading, setIsLoading] = useState(false);
  // 檢查登入狀態
  const checkLogin = async () => {
    // setIsLoading(true);
    try {
      await checkUserLogin();
      // toast.success("登入成功", res.data);
      return true;
    } catch (error) {
      toast.error('檢查失敗，請確認是否登入', error);
      navigate('/');
      return false;
    }
  };
  useEffect(() => {
    const token = document.cookie.replace(
      // eslint-disable-next-line
      /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
      '$1',
    );
    if (!token) {
      toast.error('您尚未登入');
      navigate('/');
      return;
    }
    axios.defaults.headers.common['Authorization'] = token;
    const init = async () => {
      // setIsLoading(true);
      try {
        await checkLogin();
      } finally {
        // setIsLoading(false);
      }
    };
    init();
  }, []);

  const handleLogout = () => {
    try {
      const res = adminLogout();
      document.cookie = 'hexToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
      axios.defaults.headers.common['Authorization'] = '';
      toast.success('成功登出', res.data);
      navigate('/');
    } catch (error) {
      toast.error('發生錯誤', error);
      navigate('/');
    }
  };
  return (
    <>
      <header className='admin_base d-flex justify-content-between py-3 px-4 text-primary-100 bg-primary-900'>
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
      <div className='admin_base d-flex'>
        <div className='adm__siderbar'>
          <AdmSidebar />
        </div>

        <main className='w-100'>
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default AdminLayout;
