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
                  {/* 圖片 */}
                  <div className='row g-2 mb-4'>
                    <div className='col-8'>
                      {tempProduct.imageUrl ? (
                        <img
                          src={tempProduct.imageUrl}
                          alt={tempProduct.title}
                          className='rounded-3'
                          style={{
                            width: '280px',
                            height: '280px',
                            objectFit: 'cover',
                          }}
                        />
                      ) : (
                        <div
                          className='bg-sec-50 rounded-3 d-flex justify-content-center align-items-center'
                          style={{ height: '280px' }}
                        >
                          <span className='text-sec-400'>暫無圖片</span>
                        </div>
                      )}
                    </div>
                    <div className='col-4 d-flex flex-column gap-2'>
                      {tempProduct.imagesUrl?.length > 0 ? (
                        tempProduct.imagesUrl.slice(0, 3).map((url, index) => (
                          <img
                            key={index}
                            src={url}
                            alt={`附圖 ${index + 1}`}
                            className='rounded-2'
                            style={{
                              width: '100px',
                              height: '100px',
                              objectFit: 'cover',
                              flex: 1,
                            }}
                          />
                        ))
                      ) : (
                        <div className='text-sec-400 d-flex align-items-center justify-content-center h-100'>
                          無副圖
                        </div>
                      )}
                    </div>
                  </div>

                  <span className='badge bg-sec-800 fw-medium mb-2'>
                    {tempProduct.category}
                  </span>
                  <h4 className='fw-bold mb-3'>{tempProduct.title}</h4>
                  <div className='row g-3 mb-3'>
                    <div className='col-6'>
                      <p className='text-sec-600 mb-1'>商品內容</p>
                      <p className='mb-0'>{tempProduct.content}</p>
                    </div>
                    <div className='col-6'>
                      <p className='text-sec-600 mb-1'>商品描述</p>
                      <p className='mb-0'>{tempProduct.description}</p>
                    </div>
                  </div>
                  <div className='d-flex justify-content-around gap-4 pt-3'>
                    <div>
                      <p className='text-sec-600 mb-1'>人氣指數</p>
                      <p className='fw-bold mb-0'>{tempProduct.star}</p>
                    </div>
                    <div>
                      <p className='text-sec-600 mb-1'>原價</p>
                      <del className='text-sec-500'>
                        {tempProduct.origin_price} 元
                      </del>
                    </div>
                    <div>
                      <p className='text-sec-600 mb-1'>售價</p>
                      <p className='fs-5 fw-bold text-primary-800 mb-0'>
                        {tempProduct.price} 元
                      </p>
                    </div>
                  </div>

                  {/* 照顧難度 + 環境資訊 */}
                  <div className='row g-3 pt-3 mt-1'>
                    <div className='col-6'>
                      <p className='text-sec-600 mb-1'>照顧難度星等</p>
                      <p className='mb-0'>
                        {tempProduct.difficulty?.stars} 顆星
                      </p>
                    </div>
                    <div className='col-6'>
                      <p className='text-sec-600 mb-1'>難度備註</p>
                      <p className='mb-0'>{tempProduct.difficulty?.note}</p>
                    </div>
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
