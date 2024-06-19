import { useNavigate } from 'react-router-dom';
import { logout } from '../services/authService';
import { useEffect } from 'react';

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    async function logoutUser() {
      const res = await logout();
      if (res.status === 200) {
        navigate('/');
      } else {
        const resData = await res.json();
        alert(resData.error);
      }
    }
    logoutUser();
  }, [navigate]);
  return null;
}