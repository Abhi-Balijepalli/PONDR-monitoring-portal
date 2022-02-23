import React from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorMessage } from '@hookform/error-message';
import Button from './components/Button';
import Input from './components/Input';
import { uploadBlogpost } from '../api/thanos_api';

import firebase from 'firebase/app';
import 'firebase/storage';
import Blogpost from '../partials/Blogpost';

const AddProductFormSchema = Yup.object({
  author: Yup.string().required('Author is required'),
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  body: Yup.string().required('Body content is required'),
  imgLink: Yup.string().required('Cover Image is required')
});

const Blogposts = (props) => {
  const { register, handleSubmit, errors, watch } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: yupResolver(AddProductFormSchema),
    defaultValues: {
      author: '',
      title: '',
      description: '',
      body: '',
      imgLink: ''
    }
  });

  const blogFormState = watch();

  const onSubmit = async (data) => {
    // console.log(data);
    // if (data.img[0]) {
    //   const imgRes = await firebase.storage().ref('blog-posts-images/' + data.img[0].name).put(data.img[0]);
    //   const imgLink = await imgRes.ref.getDownloadURL();
    //   await uploadBlogpost({ ...data, imgLink: imgLink });
    // } else {
    await uploadBlogpost(data);
    // }
  };

  const onError = (errors) => {
    console.log(errors);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className='flex justify-center w-4/5 mx-auto'
      >
        <div className='flex flex-wrap -mx-3 mb-12'>
          <div className='w-full px-3 mb-4'>
            <p className='w-full h4'>Upload A Blog Post</p>
          </div>
          <div className='w-full mx-3 mb-8'>
            <label
              className='form-label block text-gray-800 text-sm font-medium mb-1'
              htmlFor='category'
            >
              Author<span className='text-red-600'>*</span>
            </label>
            <select
              ref={register}
              name='author'
              className='form-select w-full'
            >
              <option value='' disabled defaultValue>Select the author</option>
              <option>Graham Sabin</option>
              <option>Akshay Murthy</option>

            </select>
            <p className='block text-sm font-medium text-red-600'>
              <ErrorMessage errors={errors} name='category' />
            </p>
          </div>

          <Input
            className='w-full mb-8'
            name='title'
            label='Title'
            placeholder='Enter the title'
            type='text'
            required
            ref={register}
            errors={errors}
          />
          <Input
            className='w-full mb-8'
            name='description'
            label='Description'
            placeholder='Enter the description'
            type='text'
            required
            ref={register}
            errors={errors}
          />
          <div className='w-full mx-3 mb-8'>

            <label
              className='form-label block text-gray-800 text-sm font-medium mb-1'
              htmlFor='description'
            >
              Body
              <span className='text-red-600'>*</span>
            </label>
            <textarea
              className='form-textarea w-full'
              style={{ height: '200px' }}
              name='body'
              placeholder='Enter the body text in html'
              ref={register}
              errors={errors}
            />
            <p className='block text-sm font-medium text-red-600'>
              <ErrorMessage errors={errors} name='body' />
            </p>
          </div>

          {/* <Input
            className='w-full mb-8'
            name='img'
            label='Image Link'
            type='file'
            accept='image/*'
            required
            ref={register}
            errors={errors}
          /> */}

          <Input
            className='w-full mb-8'
            name='imgLink'
            label=' Image Link'
            placeholder='Enter the ImgLink'
            type='text'
            required
            ref={register}
            errors={errors}
          />

          <div className='w-full px-3'>
            <Button
              className='w-full bg-blue-pondr hover:bg-blue-pondrdark'
              type='submit'
            >
              Submit
            </Button>
          </div>
        </div>
      </form>
      <p className='h3 text-center w-full'>Preview</p>
      <hr />
      <Blogpost {...blogFormState} />
    </>
  );
};

export default Blogposts;
