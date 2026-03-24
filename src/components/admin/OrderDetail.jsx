function OrderDetail({ tempOrder, isOpen, onClose }) {
  // 如果 isOpen 是 false，直接不渲染任何東西
  if (!isOpen) return null;

  const handleCloseClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
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
        <div className='modal-dialog modal-xl modal-dialog-centered'>
          <div className='modal-content'>
            <div className='modal-header bg-sec-600 text-sec-100'>
              <h5 className='modal-title'>訂單明細</h5>
              <button
                type='button'
                className='btn-close btn-close-white'
                onClick={onClose}
              ></button>
            </div>

            <div className='modal-body'>
              {tempOrder ? (
                <>
                  <div className=''>
                    <span className='fs-6 badge bg-sec-800 ms-2 fw-medium'>
                      {tempOrder.category}
                    </span>
                    <h6 className='fs-2 fw-bold d-flex justify-content-center align-items-center '>
                      {tempOrder.title}
                    </h6>
                    <div className='d-flex flex-column justify-content-start align-items-start px-5 mb-3'>
                      <p>人氣指數：{tempOrder.user.tel}</p>
                      <p>商品內容：{tempOrder.content}</p>
                      <p>商品描述：{tempOrder.description}</p>
                      <p>
                        商品售價：
                        <del className='mx-1 text-sec-800'>
                          {tempOrder.origin_price}元
                        </del>
                        /{' '}
                        <span className='fw-bold fs-5 mx-1 text-success'>
                          {tempOrder.price}元
                        </span>
                      </p>
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
                className='btn btn-secondary'
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
export default OrderDetail;
