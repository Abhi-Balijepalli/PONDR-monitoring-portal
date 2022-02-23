import React, { useState } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useHistory, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { useCookies } from 'react-cookie';
import { signIn } from '../store/actions/authActions';
import Wrapper from '../utils/Wrapper';
import Button from './components/Button';
import ReactLoading from 'react-loading';
import Input from './components/Input';

const signInFormSchema = Yup.object({
  email: Yup.string().email('Invalid Email').required('Email is required'),
  password: Yup.string().required('Password is required')
});

const SignIn = (props) => {
  const history = useHistory();
  const [cookies, setCookie, removeCookie] = useCookies(['authToken']);

  // Sets a loading state
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, errors } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: yupResolver(signInFormSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    await props.signIn(data, setCookie);
    setIsLoading(false);
  };

  return (
    <Wrapper>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex justify-center md:w-3/6 w-4/5 mx-auto'
      >
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <div className='flex flex-wrap -mx-3 mb-12'>
          <div className='w-full px-3 mb-4'>
            <p className='w-full h3 text-4xl text-blue-pondr'>
              Thanos{' '}
            </p>
            <div className='pb-10' />
          </div>

          {props.user.authError
            ? (
              <div className='w-full p-6 mx-3 mb-4 bg-red-200 border-2 border-red-600 text-red-600 rounded '>
                {props.user.authError}
              </div>
              )
            : null}

          <Input
            className='w-full mb-8'
            name='email'
            label='Email'
            placeholder='Enter your email'
            type='text'
            required
            ref={register}
            errors={errors}
          />

          <Input
            className='w-full'
            name='password'
            label='Password'
            placeholder='Enter your password'
            type='password'
            required
            ref={register}
            errors={errors}
          />
          <Link
            to='/reset-password'
            className='mt-2 mb-8 px-3 w-full text-sm text-bold text-blue-pondr'
          >
            Forgot password?
          </Link>
          {isLoading
            ? (
              <div className='flex w-full px-3 justify-center pb-5'>
                <ReactLoading
                  type='spin'
                  color='#7779FC'
                  height='10%'
                  width='10%'
                />
              </div>
              )
            : (
              <div className='w-full px-3'>
                <Button
                  className='w-full bg-blue-pondr border-blue-pondr hover:bg-blue-pondrdark outline-none'
                  type='submit'
                >
                  <strong>Access</strong>
                </Button>
                <div className='pb-5' />
              </div>
              )}
        </div>
      </form>
    </Wrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: async (creds, setCookie) => {
      const returnSignIn = await signIn(creds, setCookie);
      dispatch(returnSignIn);
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignIn));
