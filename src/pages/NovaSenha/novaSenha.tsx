import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Cadastro/Cadastro.css'; // certifique-se de criar ou apontar para esse arquivo

const NovaSenha = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (novaSenha !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    // lógica de recuperação aqui
    alert("Senha redefinida com sucesso!");
    navigate('/login');
  };

  return (
    <div className="cadastro-container">
      <form className="cadastro-form" onSubmit={handleSubmit}>
        <h2>Cadastrar<br />Nova Senha</h2>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Nova senha"
          value={novaSenha}
          onChange={(e) => setNovaSenha(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirmar nova senha"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
          required
        />
        <button type="submit">Redefinir Senha</button>
      </form>
    </div>
  );
};

export default NovaSenha;