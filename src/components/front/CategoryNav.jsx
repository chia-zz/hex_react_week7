function CategoryNav({ categories, activeCategory, onChangeCategory }) {
  const handleChange = (e, category) => {
    if (e) e.preventDefault();
    onChangeCategory(category);
  };

  return (
    <div className="mb-4">
      <ul className="nav nav-pills justify-content-center">
        {/* 全部 */}
        <li className="nav-item">
          <a
            className={`nav-link ${activeCategory === "" ? "active" : ""}`}
            href="#"
            onClick={(e) => {
              handleChange(e, ""); // 代表全部
            }}
          >
            全部
          </a>
        </li>

        {/* 其他分類 */}
        {categories.map((category) => (
          <li className="nav-item" key={category}>
            <a
              className={`nav-link ${activeCategory === category ? "active" : ""}`}
              href="#"
              onClick={(e) => {
                handleChange(e, category); // 代表該分類
              }}
            >
              {category}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default CategoryNav;
