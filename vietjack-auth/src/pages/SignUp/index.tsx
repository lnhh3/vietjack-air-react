import md5 from 'md5';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import AuthAPI from '@/apis/AuthApi';
import Button from '@/components/Button';
import Input from '@/components/Input';
import useAuthStore from '@/store/useAuth';
import useAuthConfig from '@/store/useAuthConfig';
import { SignUpRequest } from '@/types/auth';

import styleLogin from '../Login/login.module.scss';
import styles from './signup.module.scss';

const SignUpPage = () => {
  const { canRegister } = useAuthConfig();

  const { t } = useTranslation();
  const { setAuthDetail, fetchCurrentUser } = useAuthStore();
  const { handleSubmit, register } = useForm<SignUpRequest>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });
  const navigate = useNavigate();

  const [otp, setotp] = useState('');
  const token = useRef('');

  if (!canRegister) {
    return <Navigate to={'/auth'} />;
  }

  const handleSignUp = async () => {
    try {
      const res = await AuthAPI.signUpFinal({
        token: token.current,
        passcode: otp,
      });
      setAuthDetail(res);
      fetchCurrentUser();
      navigate('');
      console.log(`handleSignUp ~ res:`, res);
    } catch (error) {
      console.log(`handleSignUp ~ error:`, error);
    }
  };

  const handleSendOTP = async (values: SignUpRequest) => {
    try {
      const res = await AuthAPI.signUpStepOne({
        ...values,
        passwordHash: md5(values.passwordHash),
      });
      token.current = res.token;
      console.log(`handleSignUp ~ res:`, res);
    } catch (error) {
      console.log(`handleSignUp ~ error:`, error);
    }
  };

  return (
    <div className={styleLogin.container}>
      <form className={styleLogin.wrapForm} onSubmit={handleSubmit(handleSendOTP)}>
        <div className={styleLogin.headingLogo}>
          <img className={styleLogin.logoLeft} src="/assets/vietjack-logo.svg" alt="logo" />
          <div className={styleLogin.logoRight}>
            <h1>Vietjack Air</h1>
          </div>
        </div>
        <h3 className={styleLogin.headingSignIn}>{t`signUp`}</h3>
        <div>
          <Input type="text" placeholder={t`firstName`} {...register('firstName')} />
        </div>
        <div>
          <Input type="text" placeholder={t`lastName`} {...register('lastName')} />
        </div>
        <div>
          <Input type="text" placeholder={t`email`} {...register('email')} />
        </div>
        <div>
          <Input type="text" placeholder={t`password`} {...register('passwordHash')} />
        </div>
        <div className={styles.wrapOTP}>
          <Input
            type="text"
            placeholder={t`enterTheOTP`}
            value={otp}
            onChange={(e) => setotp(e.target.value)}
          />
          <button type="submit" className={styles.btnSendOTP}>
            {t`sendOTP`}
          </button>
        </div>
        <Button onClick={handleSignUp} className={styleLogin.btnSubmit} type="button">
          {t`signUp`}
        </Button>
      </form>
      <p className={styleLogin.noAccount}>
        {t`doYouAlreadyHaveAnAccount`} <Link to="/auth/login">{t`signIn`}</Link>
      </p>
    </div>
  );
};

export default SignUpPage;
