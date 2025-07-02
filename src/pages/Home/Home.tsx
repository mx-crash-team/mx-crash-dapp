import { Chart, Interface, Table } from './components';

export const Home = () => {
  return (
    <div className='home d-flex justify-content-center flex-fill'>
      <div className='container d-flex flex-column flex-grow-1'>
        <div className='row flex-grow-1 mb-spacer'>
          <div className='col-8 flex-grow-1 d-flex flex-column gap-4'>
            <Chart />
            <Table />
          </div>
          <div className='col-4 flex-grow-1'>
            <Interface />
          </div>
        </div>
      </div>
    </div>
  );
};
