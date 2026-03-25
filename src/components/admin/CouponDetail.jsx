function CouponDetail({ tempCoupon, isOpen, onClose }) {
  // 如果 isOpen 是 false，直接不渲染任何東西
  if (!isOpen) return null;

  const handleCloseClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  const couponDetail = [
    { label: '優惠券名稱', key: 'title' },
    { label: '優惠代碼', key: 'code' },
    { label: '折扣額度', key: 'percent' },
    { label: '到期日', key: 'due_date', isDate: true },
    { label: '優惠券狀態', key: 'is_enabled', isStatus: true },
    { label: '優惠券數量', key: 'num' },
  ];

  // 時間轉換
  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString();
  };
  return (
    <>
      <div className='modal-backdrop fade show' style={{ zIndex: 1050 }}></div>

      {/* modal */}
      <div
        className='modal d-block'
        style={{ zIndex: 1055, backgroundColor: 'transparent' }}
        onClick={handleCloseClick}
      >
        <div className='modal-dialog modal-md modal-dialog-centered'>
          <div className='modal-content'>
            <div className='modal-header bg-sec-600 text-sec-100'>
              <h5 className='modal-title'>優惠券明細</h5>
              <button
                type='button'
                className='btn-close btn-close-white'
                onClick={onClose}
              ></button>
            </div>

            <div className='modal-body'>
              {tempCoupon ? (
                <>
                  <div className='container'>
                    <div>
                      <h6 className='fw-bold mb-3 d-flex align-items-center gap-2 text-sec-900'>
                        <i className='bi bi-ticket-perforated ps-5 me-1'></i>{' '}
                        優惠券詳情
                      </h6>
                      {couponDetail.map((item) => (
                        <div
                          key={item.key}
                          className='text-start text-sec-900 px-5 mb-3'
                        >
                          <label>{item.label}</label>
                          <div className={`fw-medium ${item.className}`}>
                            {/* 如果是日期 */}
                            {item.isDate && (
                              <p>{formatDate(tempCoupon[item.key])}</p>
                            )}
                            {/* 如果是狀態 */}
                            {item.isStatus && (
                              <p>
                                {tempCoupon[item.key] ? (
                                  <span className='text-success'>已啟用</span>
                                ) : (
                                  <span className='text-danger'>未啟用</span>
                                )}
                              </p>
                            )}
                            {/* 其他欄位 */}
                            {!item.isDate && !item.isStatus && (
                              <p>{tempCoupon[item.key]}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <p className='text-secondary'>載入失敗，請稍候再試！</p>
              )}
            </div>

            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-sec-800'
                onClick={onClose}
              >
                關閉
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default CouponDetail;
