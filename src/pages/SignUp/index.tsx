import React from 'react';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';
import { Container, Content, Background } from './styles';

import logo from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';

const SignUp: React.FC = () => (
  <Container>
    <Background />
    <Content>
      <img src={logo} alt="GoBarber" />

      <form>
        <h1>Faça seu Cadastro</h1>

        <Input name="name" type="text" placeholder="Nome" icon={FiUser} />
        <Input name="email" type="text" placeholder="E-mail" icon={FiMail} />
        <Input
          name="password"
          type="password"
          placeholder="senha"
          icon={FiLock}
        />
        <Button type="submit">Cadastrar</Button>
      </form>

      <a href="/register">
        <FiArrowLeft />
        Voltar
      </a>
    </Content>
  </Container>
);

export default SignUp;
