
import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://agriconnect-backend-l7ak.onrender.com/api/crops";

function Crops() {
  const [crops, setCrops] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    season: "",
    soilType: "",
    waterRequirement: "",
    description: ""
  });

  // Get JWT token from localStorage
  const getAuthConfig = () => ({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });

  const fetchCrops = async () => {
    try {
      const response = await axios.get(API_URL);
      setCrops(response.data.crops);
    } catch (error) {
      console.error("Error fetching crops:", error);
    }
  };

  useEffect(() => {
    fetchCrops();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await axios.put(
          `${API_URL}/${editingId}`,
          form,
          getAuthConfig()
        );
        alert("Crop updated successfully!");
      } else {
        await axios.post(
          API_URL,
          form,
          getAuthConfig()
        );
        alert("Crop added successfully!");
      }

      setForm({
        name: "",
        season: "",
        soilType: "",
        waterRequirement: "",
        description: ""
      });

      setEditingId(null);
      fetchCrops();
    } catch (error) {
      console.error("Error saving crop:", error);
      alert(error.response?.data?.message || "Something went wrong!");
    }
  };

  const handleEdit = (crop) => {
    setEditingId(crop._id);

    setForm({
      name: crop.name,
      season: crop.season,
      soilType: crop.soilType,
      waterRequirement: crop.waterRequirement,
      description: crop.description
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this crop?"
    );

    if (!confirmed) return;

    try {
      await axios.delete(
        `${API_URL}/${id}`,
        getAuthConfig()
      );

      alert("Crop deleted successfully!");
      fetchCrops();
    } catch (error) {
      console.error("Error deleting crop:", error);
      alert(error.response?.data?.message || "Unable to delete crop");
    }
  };

  return (
    <div className="crop-page">
      <div className="crop-header">
        <span>SMART AGRICULTURE</span>
        <h1>Crop Information</h1>
        <p>
          Manage crop information and provide farmers with useful
          cultivation guidance.
        </p>
      </div>

      <div className="crop-container">
        <div className="crop-form-card">
          <h2>
            {editingId ? "✏️ Edit Crop" : "🌱 Add New Crop"}
          </h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Crop Name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="season"
              placeholder="Season (e.g. Kharif)"
              value={form.season}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="soilType"
              placeholder="Soil Type"
              value={form.soilType}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="waterRequirement"
              placeholder="Water Requirement"
              value={form.waterRequirement}
              onChange={handleChange}
              required
            />

            <textarea
              name="description"
              placeholder="Crop Description"
              value={form.description}
              onChange={handleChange}
              required
              rows="4"
            />

            <button type="submit" className="save-btn">
              {editingId ? "Update Crop" : "Add Crop"}
            </button>

            {editingId && (
              <button
                type="button"
                className="cancel-btn"
                onClick={() => {
                  setEditingId(null);
                  setForm({
                    name: "",
                    season: "",
                    soilType: "",
                    waterRequirement: "",
                    description: ""
                  });
                }}
              >
                Cancel
              </button>
            )}
          </form>
        </div>

        <div className="crop-list">
          <h2>Available Crops</h2>

          {crops.length === 0 ? (
            <div className="empty-crops">
              <h3>No crops available</h3>
              <p>Add your first crop using the form.</p>
            </div>
          ) : (
            <div className="crop-grid">
              {crops.map((crop) => (
                <div className="crop-card" key={crop._id}>
                  <div className="crop-icon">🌱</div>

                  <h3>{crop.name}</h3>

                  <p>
                    <strong>Season:</strong> {crop.season}
                  </p>

                  <p>
                    <strong>Soil:</strong> {crop.soilType}
                  </p>

                  <p>
                    <strong>Water:</strong> {crop.waterRequirement}
                  </p>

                  <p className="crop-description">
                    {crop.description}
                  </p>

                  <div className="crop-actions">
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(crop)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(crop._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Crops;
