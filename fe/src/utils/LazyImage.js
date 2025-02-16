import { useState, useEffect, useRef } from "react";

const LazyImage = ({ src, alt, placeholderSrc, ...props }) => {
  const [visible, setVisible] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (imgRef.current) {
      observer.observe(imgRef.current);
    }
    return () => observer.disconnect();
  }, []);
  if (!src) {
    return null; 
  }
  return (
    <img
      ref={imgRef}
      src={visible ? src : placeholderSrc} 
      alt={alt || "Image"}
      loading="lazy"
      style={{
        filter: visible ? "none" : "blur(10px)", 
        transition: "filter 0.3s ease-in-out",
        width: "100px",
        height: "100px",
      }}
      {...props}
    />
  );
};

export default LazyImage;
