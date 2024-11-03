import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import ReactMarkdown from "react-markdown";

const ResponseContent = () => {
  const location = useLocation();
  const { response, error, images } = location.state || null; // Extract images from state

  //input from response page
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [newResponse, setNewResponse] = useState(null);
  const [newImages, setNewImages] = useState([]);
  const [newError, setNewError] = useState("");
  const navigate = useNavigate();

  // const perplexityApiKey = process.env.REACT_APP_PERPLEXITY_API_KEY;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setNewError("");
    setNewImages([]);

    try {
      // Make the POST request using axios
      const PROTOCOL = "http";
      const DOMAIN = "212.64.220.94";//"localhost"
      const PORT = "7111";
      const SERVER_URL = `${PROTOCOL}://${DOMAIN}:${PORT}`
      const res = await axios.post(
        `https://ainews.atlaschat.io:7111/api/chat`, {
        message: message
      }
      );

      console.log(res);

      const data = res.data;

      const responseContent = data.choices?.[0]?.message?.content;
      const responseImages = data.choices?.[0]?.message?.images || [];

      console.log(responseContent);

      if (!responseContent) {
        throw new Error("Failed to fetch response from the API");
      }

      setNewResponse(responseContent);
      setNewImages(responseImages);
      // navigate("/response", {
      //   state: {
      //     response: responseContent,
      //     error: null,
      //     images: responseImages,
      //   },
      // });
    } catch (err) {
      setNewError(err.message);
      navigate("/response", {
        state: { response: null, error: err.message, images: [] },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="site-content" id="content">
      <section className="site-bg ab-hero-pad">
        <div className="container">
          <div className="about-sec-area">
            <div className="about-details">
              <div className="response-page">
                {error && (
                  <p className="mt-4 text-center text-red-500 font-medium">
                    Error: {error}
                  </p>
                )}

                {response && !newResponse && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Response:
                    </h3>
                    <div>
                      <ReactMarkdown>{response}</ReactMarkdown>
                    </div>
                  </div>
                )}
                { newResponse && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Response:
                    </h3>
                    <div>
                      <ReactMarkdown>{newResponse}</ReactMarkdown>
                    </div>
                  </div>
                )}
              </div>

              {/* Input Form for New Submission */}
              <div className="ab-search-area">
                <div className="hero-search-area">
                  <form method="GET" action="" onSubmit={handleSubmit}>
                    <div className="hero-search-wrapper">
                      <input
                        name="episodequery"
                        id="title"
                        className="hero-search"
                        type="text"
                        placeholder="Ask News"
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
                        <button
                          type="submit"
                          className="hero-loading-btn"
                        ></button>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ResponseContent;
