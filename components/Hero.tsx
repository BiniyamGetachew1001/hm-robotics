import React, { Suspense, useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// Dynamically import Spline to prevent it from blocking the main bundle
const Spline = React.lazy(() => import('@splinetool/react-spline'));

// Custom Skeleton perfectly matching the 'Void' and 'Bronze' aesthetic
const SkeletonLoader = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-void w-full h-full z-0">
    <div className="flex flex-col items-center gap-6">
      <motion.div
        className="w-20 h-20 border-4 border-card border-t-bronze rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
      />
      <div className="text-bronze font-orbitron text-sm tracking-[0.3em] uppercase animate-pulse">
        Initializing 3D Module...
      </div>
    </div>
  </div>
);

const Hero: React.FC = () => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // If it intersects, trigger the load and disconnect observer
        if (entries[0].isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      // rootMargin fires the observer slightly before scrolling into view to feel seamless
      { rootMargin: '300px' } 
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-screen bg-void overflow-hidden">
      {/* 
        Interactive Spline Scene Container
      */}
      <div className="absolute inset-0 w-full h-full z-0 bg-void">
        {shouldLoad ? (
          <Suspense fallback={<SkeletonLoader />}>
            <Spline 
              scene="https://prod.spline.design/Imo7IgkHN5w2pLCu/scene.splinecode" 
              className="w-full h-full opacity-0 animate-[fadeIn_1s_ease-in-out_forwards]"
            />
          </Suspense>
        ) : (
          <SkeletonLoader />
        )}
      </div>

      {/* 
        Gradient overlay at the bottom to blend smoothly into the next section.
        pointer-events-none ensures users can still interact with the robot through the gradient.
      */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-void via-void/50 to-transparent pointer-events-none z-10" />
    </section>
  );
};

export default Hero;