import { Particles } from 'components';
import { WithClassnameType } from 'types';
import { RocketAnimation } from './RocketAnimation';

export const Chart = ({ className }: WithClassnameType) => {
  const isLoading = true;
  return (
    <section className='chart d-flex flex-column h-100'>
      <div className='chart-particles'>
        <Particles />
      </div>
      <div className='chart-top'>
        {isLoading ? (
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
