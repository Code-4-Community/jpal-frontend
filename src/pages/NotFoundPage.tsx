import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import NotFound from '../components/NotFound';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  const onClick = () => navigate('/');
  return <NotFound goBack={onClick} />;
};

export default NotFoundPage;
