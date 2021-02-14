import React, { useState } from 'react';
import { Formik } from 'formik';
import { login } from 'api/Users';
import Button from 'components/Button';
import Alert from 'components/Alert';
import { Link, Redirect } from 'react-router-dom';
import * as Yup from 'yup';
import classNames from 'classnames/bind';
import { ButtonTypes, SpinnerTypes } from 'constants/enums';
import { isAuthenticated } from 'common/auth';
import jwtDecode from 'jwt-decode';

const Login = props => {
  const [error, setError] = useState(null);

  const onLogin = async values => {
    try {
      const response = await login(values.email, values.password);
      if (response.success) {
        localStorage.setItem('access_token', response.token);
        localStorage.setItem('expiresIn', response.expiresIn);
        const decodedToken = jwtDecode(response.token);
        const userId = decodedToken.id;
        localStorage.setItem('userId', userId);
        // eslint-disable-next-line react/prop-types
        props.history.push('/events');
      }
    } catch (ex) {
      setError(ex.data.message);
    }
  };

  return (
    <>
      {isAuthenticated() && <Redirect to='/events' />}
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().required('Email is required'),
          password: Yup.string().required('Password is required'),
        })}
        onSubmit={onLogin}
      >
        {formikProps => {
          const {
            values,
            errors,
            touched,
            handleSubmit,
            handleChange,
            handleBlur,
            isSubmitting,
            isValid,
          } = formikProps;
          return (
            <div className='login-card-wrapper row'>
              <div className='card col-md-4 text-center'>
                <div className='card-body'>
                  <img
                    className='card-img'
                    src='https://bmpdental.com.au/wp-content/uploads/2018/10/sport.jpg'
                    alt='Login'
                  />
                  <div>
                    <h4>Log In</h4>
                    <Alert
                      display={error}
                      alertType='alert-danger'
                      onClose={() => setError(null)}
                      text={error}
                    />
                  </div>
                  <div className='mt-4'>
                    <form>
                      <div className='form-row'>
                        <div className='form-group col-md-12'>
                          <input
                            name='email'
                            placeholder='Email Address'
                            className='form-control'
                            type='text'
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.email && touched.email && (
                            <p className='text-danger'>{errors.email}</p>
                          )}
                        </div>
                        <div className='form-group col-md-12'>
                          <input
                            type='password'
                            className='form-control'
                            name='password'
                            placeholder='Password'
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.password && touched.password && (
                            <p className='text-danger'>{errors.password}</p>
                          )}
                        </div>
                        <div className='form-group col-md-12'>
                          <Button
                            className={classNames(ButtonTypes.INFO, 'w-100')}
                            loading={isSubmitting}
                            primaryButtonSpinnerType={SpinnerTypes.LIGHT}
                            onClick={handleSubmit}
                            text='Submit'
                            disabled={!isValid}
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className='form-row mt-2'>
                    <Link className='col-md-6' to='/signup'>
                      Create an account
                    </Link>
                    <Link className='col-md-6' to='/password_reset'>
                      Reset Password
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </Formik>
    </>
  );
};

export default Login;
