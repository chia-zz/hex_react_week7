import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

function DetailModal({ tempProduct, isOpen, onClose }) {
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
      <div className="modal-backdrop fade show" style={{ zIndex: 1050 }}></div>

      {/* modal */}
      <div
        className="modal d-block"
        style={{ zIndex: 1055, backgroundColor: "transparent" }}
        onClick={handleCloseClick}
      >
        <div className="modal-dialog modal-xl modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-sec-600 text-sec-100">
              <h5 className="modal-title">商品明細</h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={onClose}
              ></button>
            </div>

            <div className="modal-body">
              {tempProduct ? (
                <>
                  {tempProduct.imageUrl ? (
                    <img
                      src={tempProduct.imageUrl}
                      className="img-fluid mb-3 rounded-3"
                      style={{
                        width: "400px",
                        height: "200px",
                        objectFit: "cover",
                      }}
                      alt={tempProduct.title}
                    />
                  ) : (
                    <div
                      className="bg-sec-50 d-flex justify-content-center align-items-center mb-3"
                      style={{ width: "400px", height: "200px" }}
                    >
                      <span className="text-warning">暫無圖片</span>
                    </div>
                  )}
                  <div className="">
                    <h6 className="fs-2 fw-bold d-flex justify-content-center align-items-center ">
                      {tempProduct.title}
                      <span className="fs-6 badge bg-sec-800 ms-2 fw-medium">
                        {tempProduct.category}
                      </span>
                    </h6>
                    <div className="d-flex flex-column justify-content-start align-items-start px-5 mb-3">
                      <p> 人氣指數：{tempProduct.star}</p>
                      <p>商品內容：{tempProduct.content}</p>
                      <p>商品描述：{tempProduct.description}</p>
                      <p>
                        商品售價：
                        <del className="mx-1 text-sec-800">
                          {tempProduct.origin_price}元
                        </del>
                        /{" "}
                        <span className="fw-bold fs-5 mx-1 text-success">
                          {tempProduct.price}元
                        </span>
                      </p>
                    </div>

                    <div className="imagesUrl">
                      {tempProduct.imagesUrl?.length > 0 ? (
                        <Swiper
                          modules={[Navigation]}
                          spaceBetween={12}
                          slidesPerView={3}
                          navigation
                          style={{ padding: "0 50px 40px" }}
                        >
                          {tempProduct.imagesUrl.map((url, index) => (
                            <SwiperSlide key={index}>
                              <img
                                src={url}
                                className="rounded-3"
                                style={{
                                  width: "100%",
                                  height: "200px",
                                  objectFit: "cover",
                                }}
                                alt={`副圖 ${index + 1}`}
                              />
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      ) : (
                        <p className="text-sec-800">無其他圖片</p>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-secondary">請選擇一個商品查看細節</p>
              )}
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
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
