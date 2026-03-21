import { useDispatch } from 'react-redux';
import { createAsyncMessage } from '../store/slices/messageSlice';

function useMessage() {
  const dispatcch = useDispatch();

  const showSuccess = (message) => {
    dispatcch(
      createAsyncMessage({
        success: true,
        message,
      }),
    );
  };

  const showError = (message) => {
    dispatcch(
      createAsyncMessage({
        success: false,
        message,
      }),
    );
  };

  return {
    showSuccess,
    showError,
  };
}

export default useMessage;
