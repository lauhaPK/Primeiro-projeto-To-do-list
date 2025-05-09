import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Cadastro.css';

const Cadastro = () => {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className="cadastro-container">
      <div className="cadastro-form">
        <h2>Cadastro</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="nome"
            placeholder="Nome"
            value={form.nome}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="senha"
            placeholder="Senha"
            value={form.senha}
            onChange={handleChange}
          />
          <input
            type="password"
            name="confirmarSenha"
            placeholder="Confirmar Senha"
            value={form.confirmarSenha}
            onChange={handleChange}
          />
          <button type="submit">Cadastrar</button>
        </form>

        <div className="login-message">
          Já tem uma conta? <Link to="/" className="link-scale">Clique aqui para fazer login</Link>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;