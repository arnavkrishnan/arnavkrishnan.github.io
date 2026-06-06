import { useState } from "react";

export default function ImageCarousel({ images }) {
  const [current, setCurrent] = useState(0);

  const prev = () =>
    setCurrent((current - 1 + images.length) % images.length);

  const next = () =>
    setCurrent((current + 1) % images.length);

  return (
    <div style={{ margin: "2rem 0" }}>
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button
          onClick={prev}
          style={{
            position: "absolute",
            left: 0,
            zIndex: 2,
            padding: "0.5rem 1rem",
            cursor: "pointer",
          }}
        >
          ←
        </button>

        <img
          src={images[current]}
          alt={`Minibot image ${current + 1}`}
          style={{
            width: "100%",
            maxHeight: "650px",
            objectFit: "contain",
            borderRadius: "8px",
          }}
        />

        <button
          onClick={next}
          style={{
            position: "absolute",
            right: 0,
            zIndex: 2,
            padding: "0.5rem 1rem",
            cursor: "pointer",
          }}
        >
          →
        </button>
      </div>

      <div
        style={{
          display: "flex",
          overflowX: "auto",
          gap: "0.5rem",
          marginTop: "1rem",
          justifyContent: "center",
        }}
      >
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Thumbnail ${idx + 1}`}
            onClick={() => setCurrent(idx)}
            style={{
              width: "80px",
              height: "60px",
              objectFit: "cover",
              cursor: "pointer",
              border:
                idx === current
                  ? "3px solid #333"
                  : "1px solid #ccc",
            }}
          />
        ))}
      </div>
    </div>
  );
}