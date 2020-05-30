import React, { useCallback, useRef, ChangeEvent } from 'react';
import { FiMail, FiUser, FiLock, FiCamera, FiArrowLeft } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Link, useHistory } from 'react-router-dom';
import { Container, Content, Avatar } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErrors';
import { useAuth } from '../../hooks/AuthContext';
import api from '../../services/api';
import { useToast } from '../../hooks/ToastContext';

interface ProfileFormData {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { user, UpdateUser } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      formRef.current?.setErrors({});
      try {
        const schema = Yup.object().shape({
          name: Yup.string().required('Seu nome é obrigatório'),
          email: Yup.string()
            .email('Informe um email válido')
            .required('Seu email é obrigatório'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: (val) => !!val.length,
            then: Yup.string()
              .required()
              .min(6, 'Sua senha deve ter pelo menos 6 dígitos'),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: (val) => !!val.length,
              then: Yup.string()
                .required()
                .min(6, 'Sua senha deve ter pelo menos 6 dígitos'),
              otherwise: Yup.string(),
            })
            .oneOf(
              [Yup.ref('password'), null],
              'Confirmação de senha diferente da nova senha',
            ),
        });

        // abortEarly = false: return all erros, not only the first one
        await schema.validate(data, {
          abortEarly: false,
        });

        const formData = {
          name: data.name,
          email: data.email,
          ...(data.old_password
            ? {
                old_password: data.old_password,
                password: data.password,
                password_confirmation: data.password_confirmation,
              }
            : {}),
        };

        const response = await api.put('profile', formData);
        UpdateUser(response.data.user);

        history.push('/dashboard');

        addToast({
          type: 'success',
          title: 'Perfil atualizado!',
        });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro ao atualizar seu perfil',
        });
      }
    },
    [addToast, history, UpdateUser],
  );

  const handleAvatarChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        const form = new FormData();

        form.append('avatar', event.target.files[0]);

        api.patch('users/avatar', form).then((response) => {
          UpdateUser(response.data.user);

          addToast({
            type: 'success',
            title: 'Avatar atualizado!',
          });
        });
      }
    },
    [addToast, UpdateUser],
  );

  return (
    <Container>
      <header>
        <div>
          <Link to="/dashboard">
            <FiArrowLeft />
          </Link>
        </div>
      </header>
      <Content>
        <Form
          ref={formRef}
          initialData={{ name: user.name, email: user.email }}
          onSubmit={handleSubmit}
        >
          <Avatar>
            <img src={user.get_avatar} alt={user.name} />
            <label htmlFor="avatar">
              <FiCamera />
              <input type="file" id="avatar" onChange={handleAvatarChange} />
            </label>
          </Avatar>
          <h1>Meu perfil</h1>

          <Input name="name" type="text" placeholder="Nome" icon={FiUser} />
          <Input name="email" type="text" placeholder="E-mail" icon={FiMail} />
          <Input
            containerStyle={{ marginTop: 24 }}
            name="old_password"
            type="password"
            placeholder="Senha atual"
            icon={FiLock}
          />
          <Input
            name="password"
            type="password"
            placeholder="Nova senha"
            icon={FiLock}
          />
          <Input
            name="password_confirmation"
            type="password"
            placeholder="Confirmar senha"
            icon={FiLock}
          />
          <Button type="submit">Confirmar alterações</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default Profile;
