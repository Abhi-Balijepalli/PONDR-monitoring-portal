import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactLoading from 'react-loading';
import Card from './components/Card';
import StatusLabel from './components/StatusLabel';
import CustomDataTable from './components/CustomDataTable';
import { getAllCompanies } from '../api/thanos_api';
import MetricsCards from '../partials/MetricsCards';

const companyColumns = [
  {
    selector: 'company_id',
    omit: true
  },
  {
    name: 'Company Name',
    selector: 'company_name',
    sortable: true,
    grow: 2,
    cell: (row) => (
      <div
        data-tag='allowRowEvents'
        className='font-semibold text-blue-pondr'
      >
        {row.company_name}
      </div>
    )
  },
  {
    name: 'P.O.C First Name',
    selector: 'person_of_contact_first',
    cell: (row) => <div data-tag='allowRowEvents'>{row.person_of_contact_first}</div>
  },
  {
    name: 'P.O.C Last Name',
    selector: 'person_of_contact_last',
    cell: (row) => <div data-tag='allowRowEvents'>{row.person_of_contact_last}</div>
  },
  {
    name: 'Email',
    selector: 'email',
    grow: 2,
    sortable: true,
    cell: (row) => <div data-tag='allowRowEvents'>{row.email}</div>
  },
  {
    name: 'Phone Number',
    selector: 'phone_number',
    cell: (row) => <div data-tag='allowRowEvents'>{row.phone_number}</div>
  },
  {
    name: 'Date',
    selector: 'date',
    sortable: true,
    cell: (row) => {
      const millisecs = parseInt(row.date * 1000);
      const date = new Date(millisecs);
      return (
        <div data-tag='allowRowEvents'>
          {date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()}
        </div>
      );
    }
  },
  {
    name: 'Category',
    selector: 'category',
    sortable: true,
    cell: (row) => <div data-tag='allowRowEvents'>{row.category}</div>
  },
  {
    name: 'Outreach Type',
    selector: 'outreach_type',
    sortable: true,
    cell: (row) => <div data-tag='allowRowEvents'>{row.outreach_type}</div>
  }
];

const Companies = (props) => {
  // History hook
  const history = useHistory();

  useEffect(() => {
    const getAndSetCompanies = async () => {
      const companiesFetched = await getAllCompanies();
      props.setCompanies(companiesFetched.data.companies);
    };

    if (!props.companies) getAndSetCompanies();
  }, []);

  return (
    <div
      className='block justify-center w-full mx-auto'
      style={{ minHeight: '75vh' }}
    >
      <MetricsCards />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      {props.companies
        ? (
          <div className='w-full flex items-center justify-center'>
            <Card className='flex-1 pl-10 pr-10 overflow-hidder'>
              <p className='h3 mt-10 ml-7 text-blue-pondr'>Companies</p>
              <CustomDataTable
                columns={companyColumns}
                data={props.companies}
                onRowClicked={(row) => { history.push('/enterprise/' + row.company_id); }}
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

const mapStateToProps = (state) => {
  return {
    companies: state.app.companies
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCompanies: (companies) => dispatch({ type: 'SET_COMPANIES', companies: companies })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Companies);
