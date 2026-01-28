import React from 'react';
import Hero from './Hero';
import Services from './Services';
import {
  ProjectMatrix,
  MetricsBridge,
  NeuralLayers,
  GlobalMap
} from './LandingSections';

const Home: React.FC = () => {
  return (
    <div className="relative bg-void">
      {/* 0. HERO (Existing) */}
      <Hero />

      {/* 2. INFINITY PROJECT MATRIX ("The Data Stream") */}
      <ProjectMatrix />

      {/* 3. CORE METRICS BRIDGE ("Live System Stats") */}
      <MetricsBridge />

      {/* 4. ACTIVE MODULES (Existing Services Section) */}
      <Services />

      {/* 5. NEURAL LAYERS ("Deep System Architecture") */}
      <NeuralLayers />

      {/* 6. GLOBAL DEPLOYMENT MAP ("Scale") */}
      <GlobalMap />

      {/* FOOTER is handled in App.tsx layout */}
    </div>
  );
};

export default Home;