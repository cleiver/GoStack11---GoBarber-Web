import React from 'react';
import { Container } from './styles';

// styled components will send the classname
interface ToolTipProps {
  title: string;
  className?: string;
}

const Tooltip: React.FC<ToolTipProps> = ({ title, className, children }) => {
  return (
    <Container className={className}>
      <span>{title}</span>
      {children}
    </Container>
  );
};

export default Tooltip;
