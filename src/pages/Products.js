import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import ReactLoading from 'react-loading';
import Card from './components/Card';
import { yupResolver } from '@hookform/resolvers/yup';
import { getFilteredProducts } from '../api/thanos_api';
import { useHistory } from 'react-router';
import CustomDataTable from './components/CustomDataTable';
import StatusLabel from './components/StatusLabel';
import Input from './components/Input';
import { useForm } from 'react-hook-form';
import Button from './components/Button';

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

const productsFormSchema = Yup.object({ queryStr: Yup.string().required('queryStr is required') });

const Products = (props) => {
  const history = useHistory();
  const [filteredProds, setFilteredProds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [queryStr, setQueryStr] = useState('');

  const { register, handleSubmit, errors } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: yupResolver(productsFormSchema),
    defaultValues: {
      queryStr: ''
    }
  });

  const setFilteredProducts = async () => {
    console.log('here');
    setLoading(true);
    const filteredProds = await getFilteredProducts(queryStr);
    setFilteredProds(filteredProds.data.products);
    setLoading(false);
  };

  return (
    <div
      className='block justify-center w-full mx-auto'
      style={{ minHeight: '75vh' }}
    >
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <div
        className='w-full flex justify-center mx-auto items-center mb-4'
      >
        {/* <input
          className='form-input w-full text-gray-800 outline-none'
          onChange={(event) => setQueryStr(event.target.value)}
        /> */}

        <Input
          className='w-2/3'
          placeholder='Query all products by any string'
          type='text'
          onChangeText={setQueryStr}
        />

        <Button
          className=' bg-blue-pondr border-blue-pondr hover:bg-blue-pondrdark outline-none'
          onClick={() => { setFilteredProducts(queryStr); }}
          type='submit'
        >
          <strong>Thanos Snap</strong>
        </Button>
      </div>
      {!loading
        ? (
          <div className='w-full flex items-center justify-center'>
            <Card className='flex-1 pl-10 pr-10 overflow-hidder'>
              <p className='h3 mt-10 ml-7 text-blue-pondr'>Products</p>
              <CustomDataTable
                columns={productsColumns}
                data={filteredProds}
                onRowClicked={(row) => { history.push('/enterprise/' + row.Company_id + '/product/' + row.Product_id); }}
                showSearchBar
                filterFields={['Product_name', 'Category']}
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

export default Products;
