import axios from 'axios';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { checkUserLogin } from '../../api/ApiAdmin';
import LoadingSpinner from '../LoadingSpinner';
import useMessage from '../../hooks/useMessage';

function ProtectedRouter({ children }) {
  const [isAuth, setIsAuth] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { showError } = useMessage();

  useEffect(() => {
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('hexToken='))
      ?.split('=')[1];

    if (token) {
      axios.defaults.headers.common.Authorization = token;
    }
    const checkAdmin = async () => {
      try {
        await checkUserLogin();
        setIsAuth(true);
      } catch (err) {
        showError('權限檢查失敗：', err.response?.data?.message);
        setIsAuth(false);
      } finally {
        setIsLoading(false); // 無論成功或失敗都結束載入
      }
    };
    checkAdmin();
  }, []);

  if (isLoading)
    return (
      <>
        <div className='d-flex justify-content-center text-center my-5 mx-auto'>
          <LoadingSpinner
            spinner='RotatingLines'
            width='120px'
            height='120px'
          />
        </div>
      </>
    );
  if (!isAuth) return <Navigate to='/admin/login' replace />;

  return children;
}
export default ProtectedRouter;
