import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { updateRefetch } from 'redux/slices';
import { WithClassnameType } from 'types';

export interface CountdownUIType extends WithClassnameType {
  utcDate: string;
  title?: React.ReactNode;
}

export const Countdown = ({
  utcDate,
  className = 'homepage-countdown',
  title
}: CountdownUIType) => {
  const now = moment.utc();
  const genesis = moment.utc(utcDate, 'ddd MMM DD YYYY HH:mm:ss');

  const diffDays = moment.duration(genesis.diff(now));
  const [days, setDays] = useState(Math.floor(diffDays.asDays()));
  const [hours, setHours] = useState(diffDays.hours());
  const [minutes, setMinutes] = useState(diffDays.minutes());
  const [seconds, setSeconds] = useState(diffDays.seconds());
  const dispatch = useDispatch();

  useEffect(() => {
    const myInterval = setInterval(() => {
      const currentTime = moment.utc();
      const currentDiffDays = moment.duration(genesis.diff(currentTime));

      if (currentDiffDays.isValid() && currentDiffDays.asSeconds() > 0) {
        setDays(Math.floor(currentDiffDays.asDays()));
        setHours(currentDiffDays.hours());
        setMinutes(currentDiffDays.minutes());
        setSeconds(currentDiffDays.seconds());
      } else {
        dispatch(updateRefetch());
        clearInterval(myInterval);
      }
    }, 1000);
    if (myInterval)
      return () => {
        clearInterval(myInterval);
      };
  });

  return (
    <div className={`${className} d-flex flex-column`}>
      {title}
      <div className='time-holder d-flex'>
        <div className='time-block d-flex align-items-center justify-content-center'>
          <div className='digits'>{isNaN(days) ? '' : days < 0 ? 0 : days}</div>
          <div className='legend'>days</div>
        </div>
        <span className='delimiter'>:</span>
        <div className='time-block d-flex align-items-center justify-content-center'>
          <div className='digits'>
            {isNaN(hours) ? '' : hours < 0 ? 0 : hours}
          </div>
          <div className='legend'>hours</div>
        </div>
        <span className='delimiter'>:</span>
        <div className='time-block d-flex align-items-center justify-content-center'>
          <div className='digits'>
            {isNaN(minutes) ? '' : minutes < 0 ? 0 : minutes}
          </div>
          <div className='legend'>minutes</div>
        </div>
        <span className='delimiter'>:</span>
        <div className='time-block d-flex align-items-center justify-content-center'>
          <div className='digits'>
            {isNaN(seconds) ? '' : seconds < 0 ? 0 : seconds}
          </div>
          <div className='legend'>seconds</div>
        </div>
      </div>
    </div>
  );
};
