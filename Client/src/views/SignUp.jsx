import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Button from 'components/Button';
import Alert from 'components/Alert';
import { createNewUser } from 'api/Users';
import { Formik } from 'formik';
import { ButtonTypes, SpinnerTypes, HttpStatusCodes } from 'constants/enums';
import * as Yup from 'yup';

const SignUp = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const onCreateUser = async (user, { setSubmitting, resetForm }) => {
    try {
      setSubmitting(true);
      const response = await createNewUser(user);
      if (response.status === HttpStatusCodes.CREATED) {
        setSuccess(true);
      }
      resetForm();
    } catch (ex) {
      setError(ex.data.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <Redirect
        to={{
          pathname: '/user/created',
          state: { success: true },
        }}
      />
    );
  }
  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={Yup.object().shape({
        firstName: Yup.string()
          .required('FirstName is required'),
        lastName: Yup.string()
          .required('LastName is required'),
        email: Yup.string()
          .email('Email address should be valid')
          .required('Email is required'),
        password: Yup.string()
          .required('Please Enter your password')
          .matches(
            /^(?=.*[a-z])(?=.*[0-9])(?=.{8,})/,
            'Must contain 8 characters and a number'
          ),
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
          <div className='login-card-wrapper row'>
            <div className={`col-md-4 text-center`}>
              <div className='card'>
                <div className='card-body'>
                  <img
                    className='card-img'
                    src='https://bmpdental.com.au/wp-content/uploads/2018/10/sport.jpg'
                    alt='Sign Up'
                  />
                  <div>
                    <h4>Sign Up</h4>
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
                            name='firstName'
                            placeholder='Firstname'
                            className='form-control'
                            type='text'
                            value={values.firstname}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.firstname && touched.firstname && (
                            <span className='text-danger'>
                              {errors.firstname}
                            </span>
                          )}
                        </div>
                        <div className='form-group col-md-12'>
                          <input
                            name='lastName'
                            placeholder='Lastname'
                            className='form-control'
                            type='text'
                            value={values.lastname}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.lastname && touched.lastname && (
                            <span className='text-danger'>
                              {errors.lastname}
                            </span>
                          )}
                        </div>
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
                            <span className='text-danger'>{errors.email}</span>
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
                            <span className='text-danger'>
                              {errors.password}
                            </span>
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
                              <span className='text-danger'>
                                {errors.confirmPassword}
                              </span>
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
                                <a href='/terms'>terms and conditions </a>{' '}
                              </small>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className='form-row'>
                        <Button
                          className={ButtonTypes.INFO}
                          loading={isSubmitting}
                          primaryButtonSpinnerType={SpinnerTypes.LIGHT}
                          onClick={handleSubmit}
                          text='Submit'
                          disabled={!isValid}
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default SignUp;
