import React, { useEffect, useState } from 'react';
import Card4 from '../pages/components/Card4';
import ReactLoading from 'react-loading';

import {
  FaCodeBranch,
  FaDollarSign,
  FaRegThumbsDown,
  FaRegThumbsUp, FaSmile, FaQuestionCircle, FaFlagCheckered
} from 'react-icons/fa';
import { RiShareBoxFill } from 'react-icons/ri';
import { GiCancel } from 'react-icons/gi';

import { BsFillGridFill, BsFillChatSquareQuoteFill, BsStarFill } from 'react-icons/bs';
import { getMetrics } from '../api/thanos_api';

const MetricsCards = (props) => {
  const [metrics, setMetrics] = useState();

  useEffect(() => {
    const getAndSetMetrics = async () => {
      const metricsFetch = await getMetrics();
      setMetrics(metricsFetch.data.metrics.basic_metrics);
    };

    if (!metrics) getAndSetMetrics();
  }, []);

  return (
    <div
      className='flex flex-wrap justify-center w-full mx-auto text-white'
      data-aos='fade-up'
    >
      {metrics
        ? ([
            {
              icon: <FaSmile className='mb-3' size='20px' />,
              title: '# Companies',
              text: metrics.companies_num
            },
            {
              icon: <BsFillChatSquareQuoteFill className='mb-3' size='20px' />,
              title: '# Enterprise AI Questions',
              text: metrics.enterprise_ai_questions_num
            },
            {
              icon: <BsStarFill className='mb-3' size='20px' />,
              title: '# Products',
              text: metrics.products_num
            },
            {
              icon: <BsFillGridFill className='mb-3 font-bold' size='20px' />,
              title: '# Scraped products',
              text: metrics.scraped_products_num
            }
          ].map((eachCard, index) => (
          <Card4
            className={
              index - (2 % 4) !== 4 ? 'w-22.5% mr-1/30 mb-5' : 'w-22.5% mb-5'
            }
            key={index}
          >
            <div className='w-full p font-medium text-gray-400 justify-left pb-3 '>
              {' '}
              {eachCard.icon}
              {eachCard.title}{' '}
            </div>
            <div className='w-min h4 text-blue-pondr'> {eachCard.text}</div>
          </Card4>
          ))
          )
        : (
          <div className='w-full flex justify-center items-center'>
            <ReactLoading type='spin' color='#7779FC' height='5%' width='5%' />
          </div>
          )}
    </div>
  );
};

export default MetricsCards;
