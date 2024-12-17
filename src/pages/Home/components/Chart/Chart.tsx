import { useState } from 'react';

import BigNumber from 'bignumber.js';
import { Confetti, Loader, Particles } from 'components';
import { useRegisterWebsocketListener } from 'hooks/websocketListener';
import { WithClassnameType } from 'types';

import { RocketAnimation } from './RocketAnimation';

export const Chart = ({ className }: WithClassnameType) => {
  const [isOngoing, setIsOngoing] = useState(false);
  const [crashPoint, setCrashPoint] = useState<string | undefined>();
  const [stage, setStage] = useState('');

  const onMessage = (message: any) => {
    if (
      message?.data?.status &&
      ['Ongoing', 'Ended', 'Awarding'].includes(message.data.status) &&
      message.data.status !== stage
    ) {
      setStage(message.data.status);
    }
    if (message?.data?.status === 'Ongoing') {
      setIsOngoing(true);
      setCrashPoint(undefined);
      return true;
    }

    if (message?.data?.crash_point !== undefined) {
      const displayCrashPoint = new BigNumber(message.crash_point)
        .dividedBy(100)
        .toFormat(2);
      setCrashPoint(displayCrashPoint);
    }

    setIsOngoing(false);
  };
  useRegisterWebsocketListener(onMessage);

  return (
    <section className='chart d-flex flex-column h-100'>
      <div className='chart-particles'>
        <Particles />
      </div>
      <div className='chart-top d-flex flex-column'>
        {stage && <h2 className='h1 mt-3'>{stage}</h2>}
        {isOngoing ? (
          <>
            <RocketAnimation />
          </>
        ) : (
          <>
            {crashPoint ? (
              <>
                <h2 className='h1'>
                  {crashPoint}
                  <span className='symbol'>✖</span>
                </h2>
                <Confetti />
              </>
            ) : (
              <Loader />
            )}
          </>
        )}
      </div>
    </section>
  );
};
