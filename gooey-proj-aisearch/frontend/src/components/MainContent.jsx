import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import arrowImg from "/assets/img/arro.svg";
import logoNews from "/assets/img/robot.png";
import axios from "axios";

const MainContent = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState(null);
  const [images, setImages] = useState([]); // State for storing images
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const suggestionList = [
    "USA Top 3 News",
    "Asia Top 3 News",
    "Africa Top 3 News",
    "MiddleEast Top 3 News",
    "Economy Top 3 News",
    "World Top 3 News",
  ];
  const navigate = useNavigate();
  
  const handleSubmit = async (e, data = null) => {
    e && e.preventDefault && e.preventDefault();
    setLoading(true);
    setError("");
    setImages([]); // Clear images on new request
    const content = data ?? message;
    try {
      // Make the POST request using axios
      // const PROTOCOL = "http";
      // const DOMAIN = "212.64.220.94"; //"localhost"
      // const PORT = "7111";
      // const SERVER_URL = `${PROTOCOL}://${DOMAIN}:${PORT}`;
      const res = await axios.post(`https://aisearch.atlaschat.io:7113/api/chat`, {
        message: `${content} Provide websites links with description about the topic.`,
      });

      // Handle the response and navigate if successful
      const data = res.data;
      const responseContent = data.choices?.[0]?.message?.content;
      const responseImages = data.choices?.[0]?.message?.images || [];

      if (!responseContent) {
        throw new Error("Unexpected response structure");
      }

      // Navigating to response page with content and images
      navigate("/response", {
        state: {
          response: responseContent,
          error: null,
          images: responseImages,
        },
      });
    } catch (err) {
      // Handle errors by navigating to the response page with an error message
      navigate("/response", {
        state: { response: null, error: err.message, images: [] },
      });
    } finally {
      setLoading(false);
    }
  };
  const loadSuggestion = (suggestion) => {
    setMessage(suggestion);
    handleSubmit(null, suggestion);
  };
  return (
    <main className="site-content" id="content">
      <section className="site-bg hero-pad bubble-circle home-hero-section">
        <div className="container">
          <div className="text-center">
            {/* Robot Image Area */}
            <div className="robot-area wow zoomIn">
              <img className="robot-img" src={logoNews} alt="Robot" />
            </div>

            {/* Main Hero Title */}
            {/* <h1 className="wow fadeInUp" data-wow-delay=".3s">
              Chat with Atlaschat
            </h1> */}
            {/* <h1 className="home-hero-title wow fadeInUp mb-20" data-wow-delay=".3s"> Search Like Never Before</h1>*/}

            
            {/* Search Area */}
            <div className="hero-search-area">
              <form method="GET" action="" onSubmit={handleSubmit}>
                <div className="hero-search-wrapper">
                  <input
                    name="episodequery"
                    id="title"
                    className="hero-search"
                    type="text"
                    placeholder="Ask anything"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                 

                  {!loading && (
                    <button
                      type="submit"
                      className="hero-search-btn"
                      disabled={loading}
                    ></button>
                  )}

                  {loading && (
                    <button type="submit" className="hero-loading-btn"></button>
                  )}
                </div>
              </form>
            </div>
            {/* Suggestions Title */}
            {/* <h5 className="mb-6 -mt-20">Some suggestions below :</h5> */}

            {/* Hero Tags Area */}
            <div className="hero-tags-area">
              {/* {suggestionList.map((suggestion, index) => (
                <span
                  onClick={loadSuggestion.bind(this, suggestion)}
                  key={index}
                  className="hero-tag wow fadeInUp"
                  data-wow-delay=".4s"
                >
                  <img src={arrowImg} alt="Arrow" />
                  {suggestion}
                </span>
              ))} */}
              {/* <span className="hero-tag wow fadeInUp" data-wow-delay=".3s">
                <img src={arrowImg} alt="Arrow" />
                There are many variations of passages of Lorem Ipsum available.
              </span>
              <span className="hero-tag wow fadeInUp" data-wow-delay=".4s">
                <img src={arrowImg} alt="Arrow" />
                There are many variations available.
              </span>
              <span className="hero-tag wow fadeInUp" data-wow-delay=".5s">
                <img src={arrowImg} alt="Arrow" />
                There are many variations of passages of Lorem Ipsum available.
              </span>
              <span className="hero-tag wow fadeInUp" data-wow-delay=".6s">
                <img src={arrowImg} alt="Arrow" />
                There are many variations available.
              </span>
              <span className="hero-tag wow fadeInUp" data-wow-delay=".7s">
                <img src={arrowImg} alt="Arrow" />
                There are many variations of passages of Lorem Ipsum available.
              </span> */}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MainContent;
