import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, InputField } from '../components';
import { useLogin, useSignup } from '../hooks';
import { useCallback } from 'react';

const validationSchema = Yup.object({
  email: Yup.string().email('Must be a valid email address').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters long')
    .required('Password is required')
});

export function Signup() {
  const {
    onSignUp,
    loading: signupLoading,
    errorMsg: signupError,
    reset: signupReset
  } = useSignup();
  const { onLogin, loading: loginLoading, errorMsg: loginError, reset: loginReset } = useLogin();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema,
    onSubmit: console.log
  });

  const handleSubmit = useCallback(
    async (type: 'signup' | 'login') => {
      try {
        await formik.submitForm();
        if (!formik.isValid) return;

        if (type === 'signup') {
          loginReset();
          onSignUp(formik.values.email, formik.values.password);
        } else {
          signupReset();
          onLogin(formik.values.email, formik.values.password);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [loginReset, onSignUp, formik, signupReset, onLogin]
  );

  return (
    <div className="px-4">
      <h1 className="font-bold mb-2">Signup or Log In</h1>
      <p className="mb-2 text-red-600">{signupError}</p>
      <p className="mb-2 text-red-600">{loginError}</p>
      <form onSubmit={(e) => e.preventDefault()}>
        <InputField
          name="email"
          type="email"
          placeholder="E-Mail"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email ? formik.errors.email : null}
        />
        <InputField
          name="password"
          type="password"
          placeholder="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password ? formik.errors.password : null}
        />

        <div className="flex flex-row items-center justify-end">
          <Button
            title="Log in"
            className="bg-white"
            onClick={() => handleSubmit('login')}
            disabled={signupLoading || loginLoading}
          />
          <Button
            title="Sign up"
            className=" bg-pink-600 text-white ml-4"
            onClick={() => handleSubmit('signup')}
            disabled={signupLoading || loginLoading}
          />
        </div>
      </form>
    </div>
  );
}
