import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminSignin } from '../../api/ApiAdmin';
import { useForm } from 'react-hook-form';
import useMessage from '../../hooks/useMessage';

function LoginPage() {
  const navigate = useNavigate(); // 建立 navigate router
  const [isAuth, setIsAuth] = useState(false);
  // redux
  const { showError, showSuccess } = useMessage();

  // 登入驗證設定
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (formData) => {
    // if (e) e.preventDefault();
    try {
      const res = await adminSignin(formData);
      const { token, expired } = res.data;
      // cookie & token setting
      document.cookie = `hexToken=${token};expires=${new Date(expired)};`;
      // axios.defaults.headers.common["Authorization"] = token;
      showSuccess('登入成功');
      navigate('/admin');
    } catch (error) {
      showError(`登入失敗: ${error.response?.data.message}`);
      setIsAuth(false);
    }
  };

  return (
    <>
      <div className='container login'>
        <h2 className='text-sec-500'>請先登入</h2>
        <form className='form-floating' onSubmit={handleSubmit(onSubmit)}>
          <div className='form-floating mb-3'>
            <input
              type='email'
              className='form-control'
              name='username'
              id='username'
              autoComplete='username'
              placeholder='name@gmail.com'
              {...register('username', {
                required: '請輸入 Email',
                pattern: {
                  value: /^\S+@\S+$/i,
                  setValueAs: (v) => v.trim(), // 去掉空白格
                  message: '請輸入正確的 Email 格式',
                },
              })}
              // value={formData.username}
              // onChange={(e) => handleInputChange(e)}
              required
            />
            {errors.username && (
              <p className='text-error mt-1'>{errors.username.message}</p>
            )}
            <label htmlFor='username'>Email Address</label>
          </div>
          <div className='form-floating mb-3'>
            <input
              type='password'
              className='form-control'
              name='password'
              id='password'
              autoComplete='current-password'
              placeholder='12345678'
              {...register('password', {
                required: '請輸入密碼',
                minLength: {
                  value: 8,
                  message: '密碼長度至少需 8 碼',
                },
              })}
              // value={formData.password}
              // onChange={(e) => handleInputChange(e)}
              required
            />
            {errors.password && (
              <p className='text-error mt-1'>{errors.password.message}</p>
            )}
            <label htmlFor='password'>Password</label>
          </div>
          <button
            type='submit'
            className='btn btn-primary w-100 mt-2'
            disabled={!isValid}
          >
            登入
          </button>
        </form>
      </div>
    </>
  );
}

export default LoginPage;
