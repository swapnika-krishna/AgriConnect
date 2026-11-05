
import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://agriconnect-backend-l7ak.onrender.com/api/market-prices";

function Market() {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    cropName: "",
    marketName: "",
    location: "",
    pricePerQuintal: ""
  });

  // Attach JWT token to protected requests
  const getAuthConfig = () => ({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });

  const fetchPrices = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(API_URL);
      setPrices(response.data.prices || []);
    } catch (err) {
      setError("Unable to load market prices. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setMessage("");
      setError("");

      await axios.post(
        API_URL,
        {
          ...formData,
          pricePerQuintal: Number(formData.pricePerQuintal)
        },
        getAuthConfig()
      );

      setMessage("Market price added successfully!");

      setFormData({
        cropName: "",
        marketName: "",
        location: "",
        pricePerQuintal: ""
      });

      fetchPrices();
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to add market price."
      );
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this price?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${API_URL}/${id}`,
        getAuthConfig()
      );

      setMessage("Market price deleted successfully!");
      fetchPrices();
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to delete market price."
      );
    }
  };

  return (
    <div className="market-page">
      <div className="market-header">
        <h1>Market Price Tracking</h1>
        <p>
          Check crop prices and stay informed about agricultural markets.
        </p>
      </div>

      <div className="demo-warning">
        ⚠️ These prices are SAMPLE DEMO DATA.
        They are not live or officially verified market prices.
      </div>

      <div className="market-form-section">
        <h2>Add Market Price</h2>

        <form onSubmit={handleSubmit} className="market-form">
          <input
            type="text"
            name="cropName"
            placeholder="Crop Name (e.g. Tomato)"
            value={formData.cropName}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="marketName"
            placeholder="Market Name"
            value={formData.marketName}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Location (e.g. Kuppam)"
            value={formData.location}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="pricePerQuintal"
            placeholder="Price per Quintal (₹)"
            value={formData.pricePerQuintal}
            onChange={handleChange}
            min="0"
            step="0.01"
            required
          />

          <button type="submit">
            Add Market Price
          </button>
        </form>
      </div>

      {message && (
        <p className="success-message">{message}</p>
      )}

      {error && (
        <p className="error-message">{error}</p>
      )}

      <div className="market-list-section">
        <h2>Available Crop Prices</h2>

        {loading ? (
          <p>Loading market prices...</p>
        ) : prices.length === 0 ? (
          <p>No market prices available. Add your first price above!</p>
        ) : (
          <div className="market-grid">
            {prices.map((item) => (
              <div className="market-card" key={item._id}>
                <span className="demo-label">DEMO PRICE</span>

                <h3>{item.cropName}</h3>

                <p>
                  <strong>Market:</strong> {item.marketName}
                </p>

                <p>
                  <strong>Location:</strong> {item.location}
                </p>

                <h2>
                  ₹{Number(item.pricePerQuintal).toLocaleString("en-IN")}
                </h2>

                <p className="price-unit">Per Quintal</p>

                <p className="price-date">
                  Date: {new Date(item.priceDate).toLocaleDateString("en-IN")}
                </p>

                <button
                  className="delete-price-btn"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Market;
