import React, { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import Card from './components/Card';
import { GetProductsInQueue } from '../api/thanos_api';
import { useHistory } from 'react-router';
import CustomDataTable from './components/CustomDataTable';
import StatusLabel from './components/StatusLabel';

const productsColumns = [
  {
    name: 'Product Name',
    selector: 'product_name',
    sortable: true,
    grow: 2,
    cell: (row) => (
      <div
        data-tag='allowRowEvents'
        className={`font-semibold ${row.processed && !row.rescrape ? 'text-blue-pondr' : 'text-gray-500'
          }`}
      >
        {row.Product_name}
      </div>
    )
  },
  {
    name: 'Category',
    selector: 'Category',
    sortable: true,
    cell: (row) => <div data-tag='allowRowEvents'>{row.Category}</div>
  },
  {
    name: 'Analytics Status',
    grow: 1,
    center: true,
    cell: (row) => (
      <div data-tag='allowRowEvents'>
        <StatusLabel
          status={row.processed && !row.rescrape ? 'ready' : 'processing'}
        />
      </div>
    )
  },
  {
    name: 'Competitor Product',
    grow: 1,
    center: true,
    cell: (row) => (
      <div
        className='flex item-center justify-between'
        data-tag='allowRowEvents'
      >
        <div>
          <StatusLabel
            status={row.competitor_product ? 'delay' : 'none'}
            text={row.competitor_product ? 'Yes' : 'No'}
          />
        </div>
      </div>
    )
  },
  {
    name: '',
    center: true,
    width: '10px',
    cell: (row) =>
      row.processed && !row.rescrape
        ? (
          <div className='flex item-center'>
            <svg
              viewBox='0 0 32 32'
              class='icon icon-chevron-right'
              aria-hidden='true'
              data-tag='allowRowEvents'
            >
              <path d='M18.629 15.997l-7.083-7.081L13.462 7l8.997 8.997L13.457 25l-1.916-1.916z' />
            </svg>
          </div>
          )
        : null
  }
];

const ProductsQueue = (props) => {
  const history = useHistory();
  const [queueProducts, setQueueProducts] = useState();

  useEffect(() => {
    const getAndSetQueueProducts = async () => {
      const queueProductsFetch = await GetProductsInQueue();
      setQueueProducts(queueProductsFetch.data['Products to be analyized']);
    };

    if (!queueProducts) getAndSetQueueProducts();
  }, []);

  return (
    <div
      className='block flex justify-center w-full mx-auto'
      style={{ minHeight: '75vh' }}
    >
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      {queueProducts
        ? (
          <div className='w-full flex items-center justify-center'>
            <Card className='flex-1 pl-10 pr-10 overflow-hidder'>
              <p className='h3 mt-10 ml-7 text-blue-pondr'>Products In Queue</p>
              <CustomDataTable
                columns={productsColumns}
                data={queueProducts}
                onRowClicked={(row) => { history.push('/enterprise/' + row.company_id + '/product/' + row.Product_id); }}
                showSearchBar
                filterFields={[
                  'company_id',
                  'company_name',
                  'person_of_contact_first',
                  'person_of_contact_last',
                  'email']}
              />
            </Card>
          </div>
          )
        : (
          <div
            className='w-full h-screen flex justify-center items-center pb-24'
          >
            <ReactLoading
              type='spin'
              color='#7779FC'
              height='5%'
              width='5%'
            />
          </div>
          )}
    </div>
  );
};

export default ProductsQueue;
