import { faRocket } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classNames from 'classnames';

import { ReactComponent as LaunchArrow } from 'assets/images/bg-arrow.svg';
import { Particles } from 'components';
import { WithClassnameType } from 'types';

export const Chart = ({ className }: WithClassnameType) => {
  return (
    <section className='chart d-flex flex-column h-100'>
      <div className='chart-particles'>
        <Particles />
      </div>
      <div className='chart-top'>
        <h2 className='h1'>
          1.43<span className='symbol'>✖</span>
        </h2>
      </div>
      <div className='chart-placeholder'>
        <LaunchArrow className='chart-arrow' />
      </div>
    </section>
  );
};
