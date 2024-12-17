import { useState } from 'react';
import { Particles } from 'components';
import { useRegisterWebsocketListener } from 'hooks/websocketListener';
import { WithClassnameType } from 'types';

import { RocketAnimation } from './RocketAnimation';

export const Chart = ({ className }: WithClassnameType) => {
  const [isOngoing, setIsOngoing] = useState(false);
  const onMessage = (message: any) => {
    if (message === 'ceva' && !isOngoing) {
      setIsOngoing(true);
    }
  };
  useRegisterWebsocketListener(onMessage);

  return (
    <section className='chart d-flex flex-column h-100'>
      <div className='chart-particles'>
        <Particles />
      </div>
      <div className='chart-top'>
        {isOngoing ? (
          <RocketAnimation />
        ) : (
          <h2 className='h1'>
            1.43<span className='symbol'>✖</span>
          </h2>
        )}
      </div>
    </section>
  );
};
