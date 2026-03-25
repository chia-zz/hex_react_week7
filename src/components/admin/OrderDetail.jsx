function OrderDetail({ tempOrder, isOpen, onClose }) {
  // 如果 isOpen 是 false，直接不渲染任何東西
  if (!isOpen) return null;

  const handleCloseClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

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
                  <div className='row'>
                    <div className='col-lg-4'>
                      <div>
                        <h6 className='fw-bold mb-3 d-flex align-items-center gap-2 text-sec-900'>
                          <i className='bi bi-person-lines-fill ps-5 me-1'></i>{' '}
                          訂購人資訊
                        </h6>
                        <div className='text-start text-sec-900 px-5 mb-3'>
                          <label>顧客姓名</label>
                          <p className='fw-medium'>{tempOrder.user.name}</p>
                        </div>
                        <div className='text-start text-sec-900 px-5 mb-3'>
                          <label>聯絡電話</label>
                          <p className='fw-medium'>{tempOrder.user.tel}</p>
                        </div>
                        <div className='text-start text-sec-900 px-5 mb-3'>
                          <label>電子信箱</label>
                          <p className='fw-medium text-break'>
                            {tempOrder.user.email}
                          </p>
                        </div>
                        <div className='text-start text-sec-900 px-5 mb-3'>
                          <label>送貨地址</label>
                          <p className='fw-medium'>{tempOrder.user.address}</p>
                        </div>
                      </div>
                      <hr />
                      <div>
                        <h6 className='fw-bold mb-3 d-flex align-items-center gap-2 text-sec-900'>
                          <i className='bi bi-calendar ps-5 me-1'></i> 訂單狀態
                        </h6>
                        <div className='text-start text-sec-900 px-5 mb-3'>
                          <label>下單日期</label>
                          <p>{formatDate(tempOrder.create_at)}</p>
                        </div>
                        <div className='text-start text-sec-900 d-flex justify-content-between align-items-center px-5'>
                          <label>付款狀態</label>
                          {tempOrder.is_paid ? (
                            <span className='badge bg-success'>已付款</span>
                          ) : (
                            <span className='badge bg-danger'>待付款</span>
                          )}
                        </div>
                      </div>
                      <hr className='d-block d-lg-none' />
                    </div>
                    <div className='col-lg-8  px-5'>
                      <h6 className='fw-boldmb-3 d-flex align-items-center gap-2'>
                        <i className='bi bi-box-seam me-2'></i> 訂購內容
                      </h6>
                      <div className='table-responsive rounded-3'>
                        <table className='table table-hover align-middle mb-0'>
                          <thead className='table-light'>
                            <tr>
                              <th className=''>商品</th>
                              <th className=''>數量</th>
                              <th className=''>小計</th>
                            </tr>
                          </thead>
                          <tbody>
                            {Object.values(tempOrder.products).map((item) => (
                              <tr key={item.id}>
                                <td className='ps-3'>
                                  <div className='d-flex justify-content-center align-items-center py-1'>
                                    <div>
                                      <div className='fw-bold'>
                                        {item.product.title}
                                      </div>
                                      <div className='text-sec-900'>
                                        NT${' '}
                                        {item.product.price.toLocaleString()} /{' '}
                                        {item.product.unit}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className='fw-medium'>x {item.qty}</td>
                                <td className='pe-3 fw-bold'>
                                  NT$ {item.final_total.toLocaleString()}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* 備註與總計區塊 */}
                      <div className='row mt-4 g-3'>
                        <div className='col-lg-7'>
                          <div className='p-3 bg-error bg-opacity-10 border border-error border-opacity-25 rounded-3'>
                            <div className='text-error fw-bold mb-1'>
                              顧客備註
                            </div>
                            <p className='mb-0 '>
                              {tempOrder.user.message || '無'}
                            </p>
                          </div>
                        </div>
                        <div className='col-lg-5'>
                          <div className='p-3 bg-primary bg-opacity-10 border border-primary border-opacity-25 rounded d-flex flex-column justify-content-center'>
                            <div className='text-primary fw-semibold mb-1'>
                              總計金額
                            </div>
                            <div className=' text-primary-800 fw-bold mb-0'>
                              NT$ {tempOrder.total.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </div>
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
export default OrderDetail;
