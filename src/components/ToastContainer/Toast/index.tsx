import React, { useEffect } from 'react';
import {
  FiAlertCircle,
  FiXCircle,
  FiInfo,
  FiCheckCircle,
} from 'react-icons/fi';
import { ToastMessage, useToast } from '../../../hooks/ToastContext';
import { Container } from './styles';

interface ToastMessageProps {
  message: ToastMessage;
  style: object;
}

const Toast: React.FC<ToastMessageProps> = ({ message, style }) => {
  const icons = {
    info: <FiInfo size={24} />,
    error: <FiAlertCircle size={24} />,
    success: <FiCheckCircle size={24} />,
  };

  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id);
    }, 3000);

    // If we return a function inside `useEffect`, it will be executed if the component is destroyed
    return () => {
      clearTimeout(timer);
    };
  }, [removeToast, message.id]);

  return (
    <Container
      type={message.type}
      hasDescription={!!message.description}
      style={style}
    >
      {icons[message.type || 'info']}
      <div>
        <strong>{message.title}</strong>
        {message.description && <p>{message.description}</p>}
      </div>
      <button
        type="button"
        onClick={() => {
          removeToast(message.id);
        }}
      >
        <FiXCircle size={18} />
      </button>
    </Container>
  );
};

export default Toast;
