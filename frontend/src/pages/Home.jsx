
import { Link } from "react-router-dom";
import {
  Sprout, CloudSun, TrendingUp, MessageCircle,
  ArrowRight, Leaf, Users
} from "lucide-react";

function Home() {
  const features = [
    {
      icon: <Sprout />,
      title: "Crop Recommendations",
      description: "Discover suitable crops and learn about cultivation methods.",
      link: "/crops"
    },
    {
      icon: <CloudSun />,
      title: "Weather Updates",
      description: "Stay updated with weather conditions and forecasts.",
      link: "/weather"
    },
    {
      icon: <TrendingUp />,
      title: "Market Prices",
      description: "Explore agricultural commodity prices and market trends.",
      link: "/market"
    },
    {
      icon: <MessageCircle />,
      title: "Expert Assistance",
      description: "Connect with agricultural experts and get guidance.",
      link: "/experts"
    }
  ];

  return (
    <div>
      <section className="hero">
        <div className="hero-content">
          <span className="tag">SMART AGRICULTURE PLATFORM</span>

          <h1>Growing a Better Future with <span>AgriConnect</span></h1>

          <p>
            Empowering farmers with smart crop recommendations,
            weather updates, market prices and expert agricultural advice.
          </p>

          <div className="hero-buttons">
            <Link to="/crops" className="primary-btn">
              Explore Crops <ArrowRight size={18} />
            </Link>

            <Link to="/register" className="secondary-btn">
              Get Started
            </Link>
          </div>
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1000"
            alt="Green agricultural field"
          />
        </div>
      </section>

      <section className="stats">
        <div><Sprout /><h2>Smart</h2><p>Crop Guidance</p></div>
        <div><CloudSun /><h2>Live</h2><p>Weather Updates</p></div>
        <div><TrendingUp /><h2>Updated</h2><p>Market Information</p></div>
        <div><Users /><h2>Expert</h2><p>Farmer Support</p></div>
      </section>

      <section className="features-section">
        <div className="section-heading">
          <span>OUR SERVICES</span>
          <h2>Everything Farmers Need</h2>
          <p>Simple digital solutions for smarter agricultural decisions.</p>
        </div>

        <div className="feature-grid">
          {features.map((feature, index) => (
            <div className="feature-card" key={index}>
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <Link to={feature.link}>
                Explore <ArrowRight size={15} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="cta">
        <Leaf size={38} />
        <h2>Let's Grow Together!</h2>
        <p>Join AgriConnect and make smarter farming decisions.</p>
        <Link to="/register" className="primary-btn">Join AgriConnect</Link>
      </section>
    </div>
  );
}

export default Home;
