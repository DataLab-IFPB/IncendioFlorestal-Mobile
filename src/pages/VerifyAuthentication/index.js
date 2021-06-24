import React, { useEffect, useState } from 'react';
import Login from '../Login';
import Maps from '../Maps';
import { fetchVerifySession } from '../../redux/session/session-action';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../components/Loading';

const VerifyAuthentication = () => {
  const dispatch = useDispatch();
  const [validateToken, setValidateToken] = useState(null);
  const loadingSession = useSelector((state) => state.session.loading);
  const userLogged = useSelector((state) => state.session.data);

  useEffect(() => {
    dispatch(fetchVerifySession());
  }, []);

  useEffect(() => {
    if (userLogged) {
      setValidateToken(true);
    } else {
      setValidateToken(false);
    }
  }, [userLogged, loadingSession]);

  if (!validateToken) {
    return <Loading loading={loadingSession} />;
  }
  return validateToken ? <Maps /> : <Login />;
};

export default VerifyAuthentication;
