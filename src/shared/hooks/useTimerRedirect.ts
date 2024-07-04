import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useTimerRedirect = (redirect: string, seconds: number) => {
  const navigate = useNavigate();
  const [redirectSeconds, setRedirectSeconds] = useState(seconds);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(redirect);
    }, redirectSeconds * 1000);

    const interval = setInterval(() => {
      setRedirectSeconds((prevSeconds) => {
        if (prevSeconds === 1) {
          clearInterval(interval);
        }
        return prevSeconds - 1;
      });
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return redirectSeconds;
};
