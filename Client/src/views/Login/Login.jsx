import React from 'react';
import { Formik } from 'formik';
import { login } from 'api/Users';
import MainLayout from 'components/Layout/MainLayout';
import Button from 'components/Button/Button';
import * as Yup from 'yup';
import { ButtonTypes, SpinnerTypes } from 'constants/enums';

const onLogin = async values => {
  const token = await login(values.email, values.password);
  localStorage.setItem('token', token);
  return true;
};

const Login = () => {
  return (
    <MainLayout>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().required('Email is required'),
          password: Yup.string().required('Password is required'),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], "Passwords don't match!")
            .required('Confirm password is required'),
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
            <div className={`col-md-4 offset-md-4 text-center`}>
              <div className='card'>
                <div className='card-body'>
                  <img
                    className='card-img'
                    src='https://bmpdental.com.au/wp-content/uploads/2018/10/sport.jpg'
                    alt='Login'
                  />
                  <div>
                    <h4>Log In</h4>
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
                      </div>
                      <div className='form-row'>
                        <Button
                          type={ButtonTypes.INFO}
                          loading={isSubmitting}
                          primaryButtonSpinnerType={SpinnerTypes.LIGHT}
                          onClick={handleSubmit}
                          text='Submit'
                          disabled={!isValid}
                        />
                      </div>
                    </form>
                  </div>
                  <div className='text-right mt-2'>
                    <a href='#'>Reset Password </a>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </Formik>
    </MainLayout>
  );
};

export default Login;
