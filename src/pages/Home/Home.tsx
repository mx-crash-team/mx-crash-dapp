import { Chart, History, Interface, Table } from './components';

export const Home = () => {
  return (
    <div className='home d-flex justify-content-center flex-fill'>
      <div className='container d-flex flex-column'>
        <div className='row mb-spacer3'>
          <div className='col-12'>
            <Chart />
          </div>
          <div className='col-12 mt-3'>
            <Interface />
          </div>
          <div className='col-12 mt-3'>
            <div className='row g-3'>
              <div className='col-6'>
                <Table />
              </div>
              <div className='col-6'>
                <History />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
