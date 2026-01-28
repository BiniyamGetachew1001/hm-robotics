import React from 'react';
import Spline from '@splinetool/react-spline';

const Hero: React.FC = () => {
  return (
    <section className="relative w-full h-screen bg-void overflow-hidden">
      {/* 
        Interactive Spline Scene.
        Using the React component allows us to load the .splinecode file directly
        and ensures the canvas fits the parent container perfectly.
      */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Spline 
          scene="https://prod.spline.design/Imo7IgkHN5w2pLCu/scene.splinecode" 
          className="w-full h-full"
        />
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