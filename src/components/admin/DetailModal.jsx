function DetailModal({ tempProduct, isOpen, onClose }) {
  // const [imageUrl, setImageUrl]= useState();

  // 如果 isOpen 是 false，直接不渲染任何東西
  if (!isOpen) return null;

  // 點背景也能關
  const handleCloseClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      <div className='modal-backdrop fade show' style={{ zIndex: 1050 }}></div>
      <div
        className='modal d-block'
        style={{ zIndex: 1055, backgroundColor: 'transparent' }}
        onClick={handleCloseClick}
      >
        <div className='modal-dialog modal-lg modal-dialog-centered'>
          <div className='modal-content'>
            <div className='modal-header bg-sec-600 text-sec-100'>
              <h5 className='modal-title'>商品明細</h5>
              <button
                type='button'
                className='btn-close btn-close-white'
                onClick={onClose}
              ></button>
            </div>
            <div className='modal-body p-4'>
              {tempProduct ? (
                <>
                  <div className='d-flex align-items-center text-start gap-3 mt-3'>
                    <h2 className='fw-bold'>{tempProduct.title}</h2>
                    <span className='badge bg-sec-800 fw-medium'>
                      {tempProduct.category}
                    </span>
                  </div>

                  {/* 商品資訊 */}
                  <div className='rounded-3 bg-sec-50 border border-sec-200 overflow-hidden mb-4'>
                    <h6 className='fw-bold p-2 mb-3 bg-sec-500 text-sec-100 d-flex align-items-center gap-2'>
                      <i className='bi bi-info-circle'></i> 商品資訊
                    </h6>
                    <div className='row g-3 mb-3 text-start px-4 py-2'>
                      <div className='col-6'>
                        <p className='text-sec-600 mb-1'>商品內容</p>
                        <p className='mb-0'>{tempProduct.content}</p>
                      </div>
                      <div className='col-6'>
                        <p className='text-sec-600 mb-1'>商品描述</p>
                        <p className='mb-0'>{tempProduct.description}</p>
                      </div>
                      <div className='col-4'>
                        <p className='text-sec-600 mb-1'>人氣指數</p>
                        <p className='fw-bold mb-0'>{tempProduct.star}</p>
                      </div>
                      <div className='col-4'>
                        <p className='text-sec-600 mb-1'>原價</p>
                        <del className='text-sec-500'>
                          {tempProduct.origin_price} 元
                        </del>
                      </div>
                      <div className='col-4'>
                        <p className='text-sec-600 mb-1'>售價</p>
                        <p className='fs-5 fw-bold text-primary mb-0'>
                          {tempProduct.price} 元
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 照顧資訊 */}
                  <div className='rounded-3 bg-sec-50 border border-sec-200 overflow-hidden mb-4'>
                    <h6 className='fw-bold p-2 mb-3 bg-sec-500 text-sec-100 d-flex align-items-center gap-2'>
                      <i className='bi bi-stars'></i> 照顧資訊
                    </h6>
                    <div className='row g-2 text-start px-4 py-2'>
                      <div className='col-6'>
                        <p className='text-sec-600 mb-1'>難度星等</p>
                        <p className='mb-0'>
                          {tempProduct.difficulty?.stars} 顆星
                        </p>
                      </div>
                      <div className='col-6'>
                        <p className='text-sec-600 mb-1'>難度備註</p>
                        <p className='mb-0'>{tempProduct.difficulty?.note}</p>
                      </div>
                    </div>
                  </div>
                  {/* 環境需求 */}
                  <div className='rounded-3 bg-sec-50 border border-sec-200 overflow-hidden'>
                    <h6 className='fw-bold p-2 mb-3 bg-sec-500 text-sec-100 d-flex align-items-center gap-2'>
                      <i className='bi bi-cloud-sun'></i> 環境需求
                    </h6>
                    <div className='row g-2 text-start px-4 py-2'>
                      <div className='col-6'>
                        <p className='text-sec-600 mb-1'>光照需求</p>
                        <p className='mb-0'>{tempProduct.environment?.light}</p>
                      </div>
                      <div className='col-6'>
                        <p className='text-sec-600 mb-1'>水分需求</p>
                        <p className='mb-0'>{tempProduct.environment?.water}</p>
                      </div>
                      <div className='col-6'>
                        <p className='text-sec-600 mb-1'>濕度等級</p>
                        <p className='mb-0'>
                          {tempProduct.environment?.humidity_level}
                        </p>
                      </div>
                      <div className='col-6'>
                        <p className='text-sec-600 mb-1'>濕度範圍</p>
                        <p className='mb-0'>
                          {tempProduct.environment?.humidity_range}
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* 圖片區 */}
                  <div className='rounded-3 bg-sec-50 border border-sec-200 overflow-hidden my-4'>
                    <h6 className='fw-bold p-2 bg-sec-500 text-sec-100 d-flex align-items-center'>
                      <i className='bi bi-camera'></i> 圖片
                    </h6>
                    <div className='row g-2'>
                      <div className='col-3'>
                        {tempProduct.imageUrl ? (
                          <img
                            src={tempProduct.imageUrl}
                            alt={tempProduct.title}
                            className='rounded-3 w-100'
                            style={{ height: '300px', objectFit: 'cover' }}
                          />
                        ) : (
                          <div
                            className='bg-sec-100 rounded-3 d-flex justify-content-center align-items-center'
                            style={{ height: '300px' }}
                          >
                            <span className='text-sec-400'>暫無圖片</span>
                          </div>
                        )}
                      </div>
                      <div className='col-3 d-flex gap-2'>
                        {tempProduct.imagesUrl.map((url, index) => (
                          <img
                            key={index}
                            src={url}
                            alt={`附圖 ${index + 1}`}
                            className='rounded-2 w-100'
                            style={{
                              objectFit: 'cover',
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <p className='text-sec-900'>請選擇一個商品查看細節</p>
              )}
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-sec-900'
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

export default DetailModal;
