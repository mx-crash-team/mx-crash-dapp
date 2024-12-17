import { DECIMALS } from '@multiversx/sdk-dapp/constants';
import { Trim } from '@multiversx/sdk-dapp/UI';
import { FormatAmount } from 'components';
import { useRegisterWebsocketListener } from 'hooks/websocketListener';
import { WSBidType } from 'types';

export const Table = () => {
  const bids = [] as WSBidType[];
  // const onMessage = (message: any) => {
  //   console.log('---TableMessage', message);
  //   bids.push({
  //     address: 'erd1',
  //     value: '33',
  //     crash_point: 2
  //   });
  // };
  // useRegisterWebsocketListener(onMessage);

  return (
    <section className='border shadow-sm rounded overflow-hidden '>
      <div className='table-responsive'>
        <table className='table table-striped table-component'>
          <thead className='thead-light'>
            <tr>
              <th>Player</th>
              <th>Amount</th>
              <th>Crash Point</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {bids.map(({ address, value, crash_point }, index) => {
                return (
                  <tr key={`${address}-${index}`}>
                    <td>
                      <Trim
                        text={address}
                        className='header-user-address-trim'
                      />
                    </td>
                    <td>
                      <FormatAmount
                        value={value}
                        decimals={DECIMALS}
                        digits={2}
                      />
                    </td>
                    <td>{crash_point}</td>
                  </tr>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};
