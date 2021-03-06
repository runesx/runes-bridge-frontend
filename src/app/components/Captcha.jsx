import React, { useEffect, createRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import styled from 'styled-components';
import { change } from 'redux-form';

const Captcha = (props) => {
  const {
    language,
    meta: {
      touched,
      error,
      submitting,
      submitFailed,
      dispatch,
    },
  } = props;
  const captcha = createRef();
  useEffect(() => {
    window.recaptchaOptions = { lang: language };
  }, [language]);

  useEffect(() => {
    captcha.current.reset();
  }, [submitting, submitFailed]);

  const onChange = (value) => {
    dispatch(change('contact', 'captchaResponse', value));
    dispatch(change('signin', 'captchaResponse', value));
    dispatch(change('signup', 'captchaResponse', value));
    dispatch(change('surfComplete', 'captchaResponse', value));
    dispatch(change('claimFaucet', 'captchaResponse', value));
    dispatch(change('resetpassword', 'captchaResponse', value));
    dispatch(change('report', 'captchaResponse', value));
  };

  return (
    <div style={{ display: 'inline-block' }}>
      <ReCAPTCHA
        ref={captcha}
        sitekey={`${process.env.RECAPTCHA_SITE_KEY}`}
        onChange={(response) => onChange(response)}
      />
      <ErrorMessage>{ touched ? error : '' }</ErrorMessage>
    </div>
  );
}

const ErrorMessage = styled.p`
    color: red;
`;

export default Captcha;
