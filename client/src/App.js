import React, { useState } from "react";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(false);

  const extractMedia = async () => {
    if (!url.trim()) return;

    try {
      setLoading(true);

      const res = await fetch("/extract", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ url })
      });

      const data = await res.json();
      setMedia(data.media || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="page">

      <main className="hero">

        <h1 className="hero-title">
          Free Online Video & Image
          <br />
          Downloader for 10,000+ Sites
        </h1>

        <p className="hero-description">
          Just paste the video link to get HD video,
          and image download links
        </p>

        <div className="download-area">

          <div className="download-form">

            <div className="input-container">

              <span className="link-icon">
                🔗
              </span>

              <input
                type="text"
                placeholder="Please paste the website link here"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    extractMedia();
                  }
                }}
              />

              <button
                className="paste-button"
                onClick={handlePaste}
                type="button"
              >
                📋
              </button>

            </div>

            <button
              className="download-button"
              onClick={extractMedia}
              disabled={loading}
            >
              {loading ? "Extracting..." : "Fetch Media"}
            </button>

          </div>

          <p className="supported-text">
            Supports YouTube, TikTok, X (Twitter),
            Instagram, Facebook and other popular sites worldwide.
          </p>

        </div>

        {/* Existing extracted media */}
        {media.length > 0 && (
          <div className="media-results">

            <h2>Extracted Media</h2>

            {media.map((item, i) => (
              <div className="media-item" key={i}>

                {item.type === "image" && (
                  <div className="media-card">

                    <img
                      src={item.src}
                      alt="Extracted media"
                    />

                    <a
                      href={item.src}
                      download
                      target="_blank"
                      rel="noreferrer"
                      className="download-media-button"
                    >
                      Download Image
                    </a>

                  </div>
                )}

                {item.type === "video" && (
                  <div className="media-card">

                    <video
                      src={item.src}
                      controls
                    />

                    <a
                      href={item.src}
                      download
                      target="_blank"
                      rel="noreferrer"
                      className="download-media-button"
                    >
                      Download Video
                    </a>

                  </div>
                )}

              </div>
            ))}

          </div>
        )}

      </main>

    </div>
  );
}

export default App;
