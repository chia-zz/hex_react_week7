function ConfirmModal({ isOpen, message, onConfirm, onCancel }) {
  if (!isOpen) return null;
  return (
    <>
      <div
        className='modal-backdrop fade show w-100 h-100'
        style={{ zIndex: 1050 }}
      ></div>

      <div
        className='modal d-block d-flex justify-content-center align-items-center'
        style={{ zIndex: 1055, backgroundColor: 'transparent' }}
        onClick={onCancel}
      >
        <div
          className='header__cartDropdown  rounded-3 p-4 '
          onClick={(e) => e.stopPropagation()} // 防止冒泡
          style={{ width: '350px', zIndex: 1100 }}
        >
          <h6 className='fs-6 mb-6'>{message}</h6>
          <div className='d-flex justify-content-center align-items-center gap-2'>
            <button className='btn btn-sec-700' onClick={onCancel}>
              取消
            </button>
            <button className='btn btn-error' onClick={onConfirm}>
              確定
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default ConfirmModal;
