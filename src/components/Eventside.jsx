import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

export default function EventImageCarousel({ images, interval = 3000 }) {
  const [[page, direction], setPage] = useState([0, 0]);

  // We only have 1 image, we don't need a carousel
  if (!images || images.length === 0) {
    return <div className="w-full h-48 bg-gray-200 rounded-xl flex items-center justify-center text-gray-500">No Image</div>;
  }
  if (images.length === 1) {
    return <img src={images[0]} alt="Event" className="w-full h-48 object-cover rounded-xl" />;
  }

  const imageIndex = page % images.length;

  useEffect(() => {
    const timer = setInterval(() => {
      // Advance to the next image
      setPage(([currentPage, currentDirection]) => {
        const nextPage = (currentPage + 1) % images.length;
        return [nextPage, 1]; // Direction 1 for forward
      });
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className="relative w-full h-48 overflow-hidden rounded-xl bg-gray-100">
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={page} // Key changes to trigger re-animation
          src={images[imageIndex]}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>
    </div>
  );
}