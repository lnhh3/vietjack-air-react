import { yupResolver } from '@hookform/resolvers/yup';
import md5 from 'md5';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FaGoogle } from 'react-icons/fa';
import { LuEye, LuEyeOff } from 'react-icons/lu';
import { Link } from 'react-router-dom';

import AuthAPI from '@/apis/AuthApi';
import Button from '@/components/Button';
import Input from '@/components/Input';
import firebaseService from '@/configs/firebase';
import yup from '@/libs/yup';
import useAuthStore from '@/store/useAuth';
import useAuthConfig from '@/store/useAuthConfig';

import styles from './login.module.scss';

type FormLogin = {
  username: string;
  password: string;
};

const loginValidate = yup.object({
  username: yup.string().required().email(),
  password: yup.string().required(),
});

const LoginPage = () => {
  const { t } = useTranslation();
  const { setAuthDetail, fetchCurrentUser } = useAuthStore();
  const { userRole, canRegister, onSuccess, onError } = useAuthConfig();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormLogin>({
    resolver: yupResolver(loginValidate),

    mode: 'onBlur',
    reValidateMode: 'onBlur',
    values: {
      password: '',
      username: '',
    },
  });

  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (values: FormLogin) => {
    try {
      setIsLoading(true);
      const res = await AuthAPI.login({
        username: values.username,
        passwordHash: md5(values.password),
        userRole,
      });
      setAuthDetail(res);
      await fetchCurrentUser();
      onSuccess?.();
    } catch (error) {
      onError?.(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const data = await firebaseService.signInWithPopup();
      const res = await AuthAPI.googleLogin({
        // @ts-ignore
        token: data.user?.accessToken ?? '',
        userRole,
      });
      setAuthDetail(res);
      await fetchCurrentUser();
      onSuccess?.(data);
    } catch (error) {
      onError?.(error);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.wrapForm} onSubmit={handleSubmit(handleLogin)}>
        <div className={styles.headingLogo}>
          <img className={styles.logoLeft} src="/assets/vietjack-logo.svg" alt="logo" />
          <div className={styles.logoRight}>
            <h1>Vietjack Air</h1>
          </div>
        </div>
        <h3 className={styles.headingSignIn}>{t`signIn`}</h3>
        <div>
          <Input
            placeholder={t`email`}
            error={!!errors.username?.message}
            {...register('username')}
          />
          <span className={styles.errorMessage}>{errors.username?.message}</span>
        </div>
        <div>
          <Input
            placeholder={t`password`}
            error={!!errors.password?.message}
            type={isShowPassword ? 'text' : 'password'}
            {...register('password')}
            rightComponent={
              <button
                onClick={() => setIsShowPassword((p) => !p)}
                type="button"
                className={styles.buttonIcon}
              >
                {isShowPassword ? <LuEye size={18} /> : <LuEyeOff size={18} />}
              </button>
            }
          />
          <span className={styles.errorMessage}>{errors.password?.message}</span>
        </div>

        <Button type="submit" loading={isLoading} className={styles.btnSubmit}>
          {t`signIn`}
        </Button>
        <div className={styles.separateContainer}>
          <div className={styles.separate}></div>
          <span>{t`or`}</span>
          <div className={styles.separate}></div>
        </div>
        <Button
          onClick={handleGoogleLogin}
          loading={false}
          type="button"
          className={styles.btnGoogle}
        >
          <FaGoogle />
          {t`google`}
        </Button>
      </form>
      {canRegister && (
        <p className={styles.noAccount}>
          {t`noAccount`} <Link to="/auth/sign-up">{t`signUp`}</Link>
        </p>
      )}
    </div>
  );
};

export default LoginPage;
