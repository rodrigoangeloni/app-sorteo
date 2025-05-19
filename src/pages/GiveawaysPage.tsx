import React from 'react';
import { GiveawayList } from '../components/giveaway/GiveawayList';

const GiveawaysPage: React.FC = () => {
  return (
    <div className="py-10">
      <GiveawayList />
    </div>
  );
};

export default GiveawaysPage;