import React from 'react';
import MainLayout from 'components/Layout/MainLayout';
import Button from 'components/Button/Button';
import { createNewUser } from 'api/Users';
import { Formik } from 'formik';
import { ButtonTypes, SpinnerTypes, HttpStatusCodes } from 'constants/enums';
import * as Yup from 'yup';
import styles from './signup.module.css';

const onCreateUser = async (event, { setSubmitting, resetForm }) => {
  setSubmitting(true);
  const response = await createNewUser(event);
  if (response.status === HttpStatusCodes.CREATED) {
    console.log('Response:', response); //Modify to render a component or modal
  }
  setSubmitting(false);
  resetForm();
};

const SignUp = () => {
  return (
    <MainLayout>
      <Formik
        initialValues={{
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().required('Email is required'),
          password: Yup.string().required('Password is required'),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], "Passwords don't match!")
            .required('Confirm password is required'),
        })}
        onSubmit={onCreateUser}
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
            <div className={`col-md-4 offset-md-4 text-center ${styles.login}`}>
              <div className='card'>
                <div className='card-body'>
                  <img
                    className='card-img'
                    src='https://bmpdental.com.au/wp-content/uploads/2018/10/sport.jpg'
                    alt='Login Image'
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
                        <div className='form-group col-md-12'>
                          <input
                            type='password'
                            className='form-control'
                            name='confirmPassword'
                            placeholder='Confirm Password'
                            value={values.confirmPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.confirmPassword &&
                            touched.confirmPassword && (
                              <p className='text-danger'>
                                {errors.confirmPassword}
                              </p>
                            )}
                        </div>
                      </div>
                      <div className='form-row'>
                        <div className='form-group'>
                          <div className='form-check'>
                            <input
                              className='form-check-input'
                              type='checkbox'
                              id='agreeTerms'
                              name='agreeTerms'
                            />
                            <label
                              className='form-check-label'
                              htmlFor='agreeTerms'
                            >
                              <small>
                                By submitting this form you agree to our{' '}
                                <a href='#'>terms and conditions </a>{' '}
                              </small>
                            </label>
                          </div>
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

export default SignUp;
