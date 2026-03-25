function CouponModal({
  isOpen,
  onClose,
  modalMode,
  tempCoupon,
  onInputChange,
  onSubmit,
}) {
  if (!isOpen) return null; // 如果沒開啟，直接不渲染

  // 點背景也能關
  const handleCloseClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      {/* 遮罩層 */}
      <div className='modal-backdrop fade show' style={{ zIndex: 1050 }}></div>

      {/* Modal 容器 */}
      <div
        className='modal d-block'
        style={{ zIndex: 1055, backgroundColor: 'transparent' }}
        onClick={handleCloseClick}
      >
        <div
          className='modal-dialog modal-xl modal-dialog-centered'
          onClick={(e) => e.stopPropagation()}
        >
          <div className='modal-content'>
            <div className='modal-header bg-accent text-sec-100'>
              <h5 className='modal-title'>
                {modalMode === 'create' ? '➕ 新增優惠券' : '📝 編輯優惠券'}
              </h5>
              <button
                type='button'
                className='btn-close'
                onClick={onClose}
              ></button>
            </div>

            <div className='modal-body px-6'>
              <form>
                <div className='row text-start'>
                  {/* 優惠券標題 */}
                  <div className='col-6 mb-4'>
                    <label htmlFor='title' className='form-label'>
                      優惠券標題
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      id='title'
                      name='title'
                      value={tempCoupon.title}
                      onChange={onInputChange}
                      placeholder='請輸入優惠券標題'
                    />
                  </div>

                  {/* 優惠券描述 */}
                  <div className='col-6 mb-5'>
                    <label htmlFor='code' className='form-label'>
                      優惠券代碼
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      id='code'
                      name='code'
                      value={tempCoupon.code}
                      onChange={onInputChange}
                      placeholder='請輸入優惠券代碼'
                    />
                  </div>
                  {/* 優惠券效期 */}
                  <div className='col-6 mb-3'>
                    <label htmlFor='due_date' className='form-label'>
                      優惠券效期
                    </label>
                    <input
                      type='datetime-local'
                      className='form-control'
                      id='due_date'
                      name='due_date'
                      value={tempCoupon.due_date}
                      onChange={onInputChange}
                      placeholder='請輸入優惠券效期'
                    />
                  </div>
                  {/* 折扣額度 */}
                  <div className='col-6 mb-4'>
                    <label htmlFor='percent' className='form-label'>
                      折扣額度
                    </label>
                    <input
                      type='number'
                      className='form-control'
                      id='percent'
                      name='percent'
                      value={tempCoupon.percent}
                      onChange={onInputChange}
                      placeholder='請輸入折扣額度'
                    />
                  </div>

                  {/* 數量 */}
                  <div className='col-6 mb-4'>
                    <label htmlFor='num' className='form-label'>
                      數量
                    </label>
                    <input
                      type='number'
                      className='form-control'
                      id='num'
                      name='num'
                      value={tempCoupon.num}
                      onChange={onInputChange}
                      placeholder='請輸入數量'
                    />
                  </div>

                  {/* 優惠券是否啟用 */}
                  <div className='col-12'>
                    <p className=' mb-4'>是否啟用</p>
                    <div className='form-check'>
                      <input
                        className='form-check-input'
                        type='radio'
                        name='is_enabled'
                        id='is_enabled'
                        value='1'
                        checked={tempCoupon.is_enabled === 1}
                        onChange={onInputChange}
                      />
                      <label className='form-check-label' htmlFor='is_enabled'>
                        啟用
                      </label>
                    </div>
                    <div className='form-check'>
                      <input
                        className='form-check-input'
                        type='radio'
                        name='is_enabled'
                        id='is_unabled'
                        value='0'
                        checked={tempCoupon.is_enabled === 0}
                        onChange={onInputChange}
                      />
                      <label className='form-check-label' htmlFor='is_unabled'>
                        未啟用
                      </label>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                onClick={onClose}
              >
                取消
              </button>
              <button
                type='button'
                className='btn btn-accent'
                onClick={onSubmit}
              >
                {modalMode === 'create' ? '確認新增' : '確認修改'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CouponModal;
