function ProductModal({
  isOpen,
  onClose,
  modalMode,
  tempProduct,
  onInputChange,
  onImageChange,
  onAddImage,
  onRemoveImage,
  onSubmit,
  onUploadImage,
  onDifficultyChange,
  onEnvironmentChange,
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
                {modalMode === 'create' ? '➕ 新增產品' : '📝 編輯產品'}
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
                  {/* 商品標題 */}
                  <div className='col-6 mb-4'>
                    <label htmlFor='title' className='form-label'>
                      商品標題
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      id='title'
                      name='title'
                      value={tempProduct.title}
                      onChange={onInputChange}
                      placeholder='請輸入商品標題'
                    />
                  </div>

                  {/* 人氣指數 */}
                  <div className='col-6  mb-4'>
                    <label htmlFor='star' className='form-label'>
                      人氣指數 (1-5)
                    </label>
                    <input
                      type='number'
                      className='form-control'
                      id='star'
                      name='star'
                      value={tempProduct.star}
                      onChange={onInputChange}
                      placeholder='請輸入人氣指數'
                      min='1'
                      max='5'
                    />
                  </div>

                  {/* 照顧難度 */}
                  <div className='col-12 mb-4'>
                    <div className=' row'>
                      <div className='col-md-3  mb-4'>
                        <label htmlFor='stars' className='form-label'>
                          照顧難度星等 (1-5)
                        </label>
                        <input
                          type='number'
                          className='form-control'
                          name='stars'
                          value={tempProduct.difficulty.stars}
                          onChange={onDifficultyChange}
                          min='1'
                          max='5'
                        />
                      </div>
                      <div className='col-md-9  mb-4'>
                        <label htmlFor='note' className='form-label'>
                          難度備註
                        </label>
                        <input
                          type='text'
                          className='form-control'
                          name='note'
                          value={tempProduct.difficulty.note}
                          onChange={onDifficultyChange}
                          placeholder='例如：適合新手、需固定擺放位置'
                        />
                      </div>
                    </div>
                  </div>

                  {/* 環境濕度 */}
                  <div className='col-12 mb-4'>
                    <div className=' row'>
                      <div className='col-md-6 mb-3'>
                        <label htmlFor='light' className='form-label'>
                          光照需求
                        </label>
                        <input
                          type='text'
                          className='form-control'
                          name='light'
                          value={tempProduct.environment.light}
                          onChange={onEnvironmentChange}
                          placeholder='例如：充足散射光'
                        />
                      </div>
                      <div className='col-md-6 mb-3'>
                        <label htmlFor='water' className='form-label'>
                          水分需求
                        </label>
                        <input
                          type='text'
                          className='form-control'
                          name='water'
                          value={tempProduct.environment.water}
                          onChange={onEnvironmentChange}
                          placeholder='例如：土表乾了再澆透'
                        />
                      </div>
                      <div className='col-md-6  mb-4'>
                        <label htmlFor='humidity_level' className='form-label'>
                          濕度等級
                        </label>
                        <select
                          className='form-select'
                          name='humidity_level'
                          value={tempProduct.environment.humidity_level}
                          onChange={onEnvironmentChange}
                        >
                          <option value='極低'>極低</option>
                          <option value='低'>低</option>
                          <option value='中等'>中等</option>
                          <option value='高'>高</option>
                          <option value='極高'>極高</option>
                        </select>
                      </div>
                      <div className='col-md-6  mb-4'>
                        <label htmlFor='humidity_range' className='form-label'>
                          濕度範圍 (%)
                        </label>
                        <input
                          type='text'
                          className='form-control'
                          name='humidity_range'
                          value={tempProduct.environment.humidity_range}
                          onChange={onEnvironmentChange}
                          placeholder='例如：50% - 70%'
                        />
                      </div>
                    </div>
                  </div>

                  {/* 商品描述 */}
                  <div className='col-6 mb-5'>
                    <label htmlFor='content' className='form-label'>
                      商品描述
                    </label>
                    <textarea
                      className='form-control'
                      id='content'
                      name='content'
                      value={tempProduct.content}
                      onChange={onInputChange}
                      placeholder='請輸入商品描述'
                      rows={3}
                    />
                  </div>
                  {/* 商品說明 */}
                  <div className='col-6 mb-3'>
                    <label htmlFor='description' className='form-label'>
                      商品說明
                    </label>
                    <textarea
                      className='form-control'
                      id='description'
                      name='description'
                      value={tempProduct.description}
                      onChange={onInputChange}
                      placeholder='請輸入商品說明'
                      rows={3}
                    />
                  </div>

                  {/* 商品原價 */}
                  <div className='col-3 mb-3'>
                    <label htmlFor='origin_price' className='form-label'>
                      商品原價
                    </label>
                    <input
                      type='number'
                      className='form-control'
                      id='origin_price'
                      name='origin_price'
                      value={tempProduct.origin_price}
                      onChange={onInputChange}
                      placeholder='請輸入商品原價'
                      min='0'
                    />
                  </div>
                  {/* 商品售價 */}
                  <div className='col-3 mb-3'>
                    <label htmlFor='price' className='form-label'>
                      商品售價
                    </label>
                    <input
                      type='number'
                      className='form-control'
                      id='price'
                      name='price'
                      value={tempProduct.price}
                      onChange={onInputChange}
                      placeholder='請輸入商品售價'
                      min='0'
                    />
                  </div>
                  {/* 商品單位 */}
                  <div className='col-3 mb-3'>
                    <label htmlFor='unit' className='form-label'>
                      商品單位
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      id='unit'
                      name='unit'
                      value={tempProduct.unit}
                      onChange={onInputChange}
                      placeholder='例如：塊'
                    />
                  </div>

                  {/* 商品分類 */}
                  <div className='col-3 mb-3'>
                    <label htmlFor='category' className='form-label'>
                      商品分類
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      id='category'
                      name='category'
                      value={tempProduct.category}
                      onChange={onInputChange}
                      placeholder='請輸入商品分類'
                    />
                  </div>

                  {/* 上傳圖片區 */}
                  <div className='col-12 mb-3'>
                    <label htmlFor='fileUpload' className='form-label'>
                      上傳圖片
                    </label>
                    <input
                      className='form-control mb-1'
                      type='file'
                      name='fileUpload'
                      id='fileUpload'
                      accept='.jpg, .jepg, .png'
                      onChange={onUploadImage}
                    />
                  </div>
                  {/* 商品主圖 */}
                  <div className='col-12 mb-3'>
                    <label htmlFor='imageUrl' className='form-label'>
                      商品主圖片網址
                    </label>
                    <input
                      type='url'
                      className='form-control  mb-4'
                      id='imageUrl'
                      name='imageUrl'
                      value={tempProduct.imageUrl}
                      onChange={onInputChange}
                      placeholder='請輸入圖片網址'
                    />
                    {/* 預覽圖片 */}
                    {tempProduct.imageUrl && (
                      <img
                        src={tempProduct.imageUrl}
                        alt='預覽主圖'
                        className='img-fluid mt-2'
                        style={{ height: '100px' }}
                      />
                    )}
                  </div>

                  {/* 商品副圖 */}
                  <div className='col-12 mb-3 border border-accent p-3'>
                    <div className='row'>
                      <p className='col-12'>更多圖片</p>
                    </div>
                    <div className='col-12 d-flex gap-2'>
                      {tempProduct.imagesUrl?.map((url, index) => (
                        <div key={index} className='mb-3'>
                          <label
                            htmlFor={`imageUrl-${index + 1}`}
                            className='form-label'
                          >
                            副圖 {index + 1}
                          </label>
                          <input
                            type='url'
                            id={`imageUrl-${index + 1}`}
                            name={`imageUrl-${index + 1}`}
                            className='form-control mb-1'
                            value={url}
                            onChange={(e) =>
                              onImageChange(index, e.target.value)
                            }
                            placeholder='請輸入副圖網址'
                          />
                          {/* 預覽圖 */}
                          {url && (
                            <img
                              src={url}
                              alt={`副圖${index + 1}`}
                              className='img-fluid'
                              style={{ height: '100px', objectFit: 'cover' }}
                            />
                          )}
                        </div>
                      ))}
                    </div>

                    {/* 多圖新增 + 刪除按鈕 */}
                    <div className='col-12 btn-group '>
                      {/* 如果陣列為空或最後一格有寫東西 -> 才能新增下一張 */}
                      {tempProduct.imagesUrl?.length < 5 &&
                        tempProduct.imagesUrl[
                          tempProduct.imagesUrl.length - 1
                        ] !== '' && (
                          <button
                            type='button'
                            className='btn btn-outline-accent'
                            onClick={onAddImage}
                          >
                            新增圖片
                          </button>
                        )}

                      {/* 如果有圖片才顯示刪除按鈕 */}
                      {tempProduct.imagesUrl?.length > 0 && (
                        <button
                          type='button'
                          className='btn btn-outline-error'
                          onClick={onRemoveImage}
                        >
                          刪除最後一張
                        </button>
                      )}
                    </div>
                  </div>

                  {/* 商品是否啟用 */}
                  <div className='col-12'>
                    <p className=' mb-4'>是否啟用</p>
                    <div className='form-check'>
                      <input
                        className='form-check-input'
                        type='radio'
                        name='is_enabled'
                        id='is_enabled'
                        value='1'
                        checked={tempProduct.is_enabled === 1}
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
                        checked={tempProduct.is_enabled === 0}
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

export default ProductModal;
