import { InteractionForm } from './InteractionForm';

export const Deposit = () => {
  return (
    <div className='deposit'>
      <div className='card'>
        <div className='card-body p-3 p-md-spacer'>
          <div className='d-flex flex-column gap-3'>
            <InteractionForm tokens={[]} />
          </div>
        </div>
      </div>
    </div>
  );
};
