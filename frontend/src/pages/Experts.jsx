import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://agriconnect-backend-l7ak.onrender.com/api/questions";

function Experts() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const token = localStorage.getItem("token");

  const [questions, setQuestions] = useState([]);
  const [farmerName, setFarmerName] = useState(user?.name || "");
  const [question, setQuestion] = useState("");
  const [category, setCategory] = useState("Crop Diseases");
  const [answers, setAnswers] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // Load all farmer questions
  const loadQuestions = async () => {
    try {
      const response = await axios.get(API_URL);
      const data = response.data;

      const questionList = Array.isArray(data)
        ? data
        : Array.isArray(data?.questions)
        ? data.questions
        : Array.isArray(data?.data)
        ? data.data
        : [];

      setQuestions(questionList);
    } catch (error) {
      console.error("Error loading questions:", error);
      setMessage("Could not load questions. Please try again.");
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuestions();
  }, []);

  // Submit a farmer question
  const submitQuestion = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!token || !user) {
      setMessage("Please log in before submitting a question.");
      return;
    }

    try {
      await axios.post(
        API_URL,
        {
          farmerName,
          question,
          category,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setQuestion("");
      setMessage("Your question was submitted successfully!");
      await loadQuestions();
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Could not submit your question."
      );
    }
  };

  // Submit an expert answer
  const submitAnswer = async (id) => {
    if (!user || user.role !== "expert" || !token) {
      setMessage("Please log in with an expert account.");
      return;
    }

    if (!answers[id]?.trim()) {
      setMessage("Please enter an answer.");
      return;
    }

    setMessage("");

    try {
      await axios.put(
        `${API_URL}/${id}/answer`,
        {
          answer: answers[id],
          expertName: user.name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAnswers((previous) => ({
        ...previous,
        [id]: "",
      }));

      setMessage("Answer submitted successfully!");
      await loadQuestions();
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Could not submit your answer."
      );
    }
  };

  return (
    <div className="simple-page">
      <h1>Farmer Expert Assistance</h1>

      <p>
        Connect with agricultural experts and get advice
        for your farming activities.
      </p>

      {message && <p>{message}</p>}

      <h2>Ask an Agricultural Question</h2>

      <form onSubmit={submitQuestion}>
        <input
          type="text"
          placeholder="Farmer Name"
          value={farmerName}
          onChange={(e) => setFarmerName(e.target.value)}
          required
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Crop Diseases</option>
          <option>Soil Management</option>
          <option>Irrigation</option>
          <option>Fertilizers</option>
          <option>Other</option>
        </select>

        <textarea
          placeholder="Type your farming question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />

        <button type="submit">Submit Question</button>
      </form>

      <h2>Farmer Questions</h2>

      {loading && <p>Loading questions...</p>}

      {!loading && questions.length === 0 && (
        <p>No questions available yet.</p>
      )}

      {!loading &&
        questions.map((item) => (
          <div key={item._id}>
            <h3>{item.category}</h3>

            <p>
              <strong>Farmer:</strong> {item.farmerName}
            </p>

            <p>{item.question}</p>

            <p>
              <strong>Status:</strong> {item.status}
            </p>

            {item.status === "Answered" && (
              <div>
                <p>
                  <strong>Expert Answer:</strong> {item.answer}
                </p>

                <p>
                  <strong>Expert:</strong> {item.expertName}
                </p>
              </div>
            )}

            {user?.role === "expert" &&
              item.status !== "Answered" && (
                <div>
                  <textarea
                    placeholder="Write your expert answer..."
                    value={answers[item._id] || ""}
                    onChange={(e) =>
                      setAnswers((previous) => ({
                        ...previous,
                        [item._id]: e.target.value,
                      }))
                    }
                  />

                  <button
                    type="button"
                    onClick={() => submitAnswer(item._id)}
                    disabled={!answers[item._id]?.trim()}
                  >
                    Submit Answer
                  </button>
                </div>
              )}

            <hr />
          </div>
        ))}
    </div>
  );
}

export default Experts;