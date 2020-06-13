import React from 'react';
import MainLayout from 'components/Layout/MainLayout';
import styles from "./signup.module.css";

const SignUp = () => {
  return (
    <MainLayout>
        <div className={`col-md-4 offset-md-4 text-center ${styles.login}`}>
          <div className='card'>
            <div className='card-body'>
              <img
                className='card-img'
                src='https://bmpdental.com.au/wp-content/uploads/2018/10/sport.jpg'
                alt="Login Image"
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
                      />
                    </div>
                    <div className='form-group col-md-12'>
                      <input
                        type='password'
                        className='form-control'
                        name='password'
                        placeholder='Password'
                      />
                    </div>
                    <div className='form-group col-md-12'>
                      <input
                        type='password'
                        className='form-control'
                        name='confirmPassword'
                        placeholder='Confirm Password'
                      />
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
                    <button type='button' className='btn btn-info btn-block'>
                      Submit
                    </button>
                  </div>
                </form>
              </div>
              <div className='text-right mt-2'>
                <a href='#'>Reset Password </a>
              </div>
            </div>
          </div>
        </div>
    </MainLayout>
  );
};

export default SignUp;
