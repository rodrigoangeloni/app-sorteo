import React from 'react';
import { Hero } from '../components/home/Hero';
import { Features } from '../components/home/Features';

const HomePage: React.FC = () => {
  return (
    <div>
      <Hero />
      <Features />
    </div>
  );
};

export default HomePage;