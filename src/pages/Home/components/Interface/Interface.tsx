import classNames from 'classnames';

export const Interface = () => {
  const hasError = false;
  const handleSubmit = () => {
    return;
  };
  return (
    <div className='interface card d-flex h-100'>
      <div className='card-body d-flex flex-column text-start gap-3'>
        <h4 className='mb-0'>Place Your Bets</h4>
        <form className='d-flex flex-column text-start gap-3'>
          <div className='form-group'>
            <label htmlFor='betAmount'>Bet Amount</label>
            <input
              type='tel'
              className='form-control'
              id='betAmount'
              aria-describedby='betAmountHelp'
              placeholder='Bet Amount'
            />
            <small id='betAmountHelp' className='form-text text-muted'>
              Text
            </small>
          </div>
          <div className='form-group'>
            <label htmlFor='autoCashout'>Auto Cashout</label>
            <input
              type='tel'
              className='form-control'
              id='autoCashout'
              aria-describedby='autoCashoutHelp'
              placeholder='Auto Cashout'
            />
          </div>
          <button type='submit' className='btn btn-primary'>
            Bet
          </button>
        </form>
      </div>
    </div>
  );
};
