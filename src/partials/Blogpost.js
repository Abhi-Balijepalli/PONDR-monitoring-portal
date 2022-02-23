import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import communityImage from '../images/blog-community.jpg';
// import graham from '../images/Graham-official.jpg';

const Blogpost = (props) => {
  return (
    <section>
      <div className='max-w-6xl mx-auto px-4 sm:px-6'>
        <div className='pt-32 pb-12 md:pt-40 md:pb-20'>
          <div className='max-w-3xl mx-auto lg:max-w-none'>

            <article>

              {/* Article header */}
              <header className='max-w-3xl mx-auto mb-20'>
                {/* Title */}
                <h1 className='h1 text-center mb-4'>{props.title}</h1>
              </header>

              {/* Article content */}
              <div className='lg:flex' data-sticky-container>
                <div>
                  {/* Article meta */}
                  <div className='flex items-center mb-6'>
                    <div className='flex flex-shrink-0 mr-3'>
                      <a className='relative' href='#0'>
                        <span className='absolute inset-0 -m-px' aria-hidden='true'><span className='absolute inset-0 -m-px bg-white rounded-full' /></span>
                        {/* <img className='relative rounded-full' src={graham} width='32' height='32' alt='Author 04' /> */}
                      </a>
                    </div>
                    <div>
                      <span className='text-gray-600'>By </span>
                      <a className='font-medium hover:underline' href='#0'>{props.author}</a>
                      <span className='text-gray-600'> · Jan 02, 2021</span>
                    </div>
                  </div>
                  <hr className='w-16 h-px pt-px bg-gray-200 border-0 mb-6' />

                  {/* Article body */}
                  <div className='text-lg text-gray-600'>
                    <p id='introduction' className='mb-8' style={{ scrollMarginTop: '100px' }}>
                      {ReactHtmlParser(props.body)}
                    </p>

                    <figure className='mb-8'>
                      <img className='w-full rounded' src={communityImage} width='768' height='432' alt='Blog single' />
                    </figure>

                  </div>

                </div>

              </div>

              {/* Article footer */}
            </article>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Blogpost;
