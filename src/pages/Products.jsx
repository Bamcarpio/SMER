import { useEffect, useState } from "react";
import "./Products.css"; // Import CSS file for styling

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [productForm, setProductForm] = useState({
    sku: "",
    size: "",
    code: "",
    productName: "",
    smer: "",
    smerUpdatedPrice: "",
    kgaPrice: "",
    pictureUrl: "", // Picture URL instead of the file
    shopLink: "",
    lazadaLink: "",
    tiktokLink: "",
    platform: "", // Store the selected platform
  });

  // Fetch products when the component is mounted
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://server-ib0v.onrender.com/data?sheet=PRODUCT&range=A3:D" // Adjusted range to A3 to fetch all data from columns A to D
        );
        const data = await response.json();
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error("Unexpected data format:", data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    // Simulate the picture URL (in real life, upload the image and store the URL)
    const pictureUrl = URL.createObjectURL(file);
    setProductForm((prevState) => ({
      ...prevState,
      pictureUrl,
    }));
  };

  const handleSave = async () => {
    try {
      // Send data to backend (Google Sheets API)
      const response = await fetch("https://server-ib0v.onrender.com/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sheet: "PRODUCT", // Save data to the "PRODUCT" sheet
          sku: productForm.sku,
          size: productForm.size,
          code: productForm.code,
          productName: productForm.productName,
          smer: productForm.smer,
          smerUpdatedPrice: productForm.smerUpdatedPrice,
          kgaPrice: productForm.kgaPrice,
          pictureUrl: productForm.pictureUrl, // Send the URL to the backend
          shopLink: productForm.shopLink,
          lazadaLink: productForm.lazadaLink,
          tiktokLink: productForm.tiktokLink,
        }),
      });

      const data = await response.json();
      if (data.message === "Added successfully!") {
        alert("Product added successfully!");
        setShowModal(false); // Close modal after saving
        setProductForm({
          sku: "",
          size: "",
          code: "",
          productName: "",
          smer: "",
          smerUpdatedPrice: "",
          kgaPrice: "",
          pictureUrl: "",
          shopLink: "",
          lazadaLink: "",
          tiktokLink: "",
          platform: "",
        });
        
        // Directly append the new product to the products array
        setProducts((prevProducts) => [
          ...prevProducts,
          [
            productForm.sku,
            productForm.size,
            productForm.code,
            productForm.productName,
            productForm.smer,
            productForm.smerUpdatedPrice,
            productForm.kgaPrice,
            productForm.size, // Second Size
            productForm.pictureUrl,
            productForm.shopLink,
            productForm.lazadaLink,
            productForm.tiktokLink,
          ]
        ]);
      }
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  return (
    <div className="products-section">
      <h2>Products</h2>

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div>
          {products.length > 0 ? (
            <table className="products-table">
              <thead>
                <tr>
                  <th>VARATION SKU's</th>
                  <th>Size</th>
                  <th>Code</th>
                  <th>Product Name</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={index}>
                    <td>{product[0]}</td>
                    <td>{product[1]}</td>
                    <td>{product[2]}</td>
                    <td>{product[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No products found.</p>
          )}
        </div>
      )}

      {/* Sticky Add Button */}
      <button
        className="add-btn"
        onClick={() => setShowModal(true)}
      >
        +
      </button>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Add Product</h2>
            <div className="modal-form">
              {/* Product Form */}
              <label>SKU</label>
              <input
                type="text"
                name="sku"
                value={productForm.sku}
                onChange={handleInputChange}
              />
              <label>Size</label>
              <input
                type="text"
                name="size"
                value={productForm.size}
                onChange={handleInputChange}
              />
              <label>Code</label>
              <input
                type="text"
                name="code"
                value={productForm.code}
                onChange={handleInputChange}
              />
              <label>Product Name</label>
              <input
                type="text"
                name="productName"
                value={productForm.productName}
                onChange={handleInputChange}
              />

              {/* Price Form */}
              <label>SMER</label>
              <input
                type="text"
                name="smer"
                value={productForm.smer}
                onChange={handleInputChange}
              />
              <label>SMER Updated Price</label>
              <input
                type="text"
                name="smerUpdatedPrice"
                value={productForm.smerUpdatedPrice}
                onChange={handleInputChange}
              />
              <label>KGA Price</label>
              <input
                type="text"
                name="kgaPrice"
                value={productForm.kgaPrice}
                onChange={handleInputChange}
              />
              <label>Picture</label>
              <input type="file" onChange={handleFileChange} />

              {/* Account Link Form */}
              <label>Shoppee</label>
              <input
                type="text"
                name="shopLink"
                value={productForm.shopLink}
                onChange={handleInputChange}
              />
              <label>Lazada</label>
              <input
                type="text"
                name="lazadaLink"
                value={productForm.lazadaLink}
                onChange={handleInputChange}
              />
              <label>TikTok</label>
              <input
                type="text"
                name="tiktokLink"
                value={productForm.tiktokLink}
                onChange={handleInputChange}
              />

              <div className="modal-buttons">
                <button onClick={handleSave}>Save</button>
                <button onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
