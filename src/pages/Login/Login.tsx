import React, { useState } from 'react';
import { Loader2 } from "lucide-react"
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom'; // Importa o useNavigate para redirecionar
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Hook para navegação após login

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // E-mail e senha de teste
    const emailTeste = 'teste@teste.com';
    const senhaTeste = '123456';

    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Verificação de login
    if (email === emailTeste && senha === senhaTeste) {
      // Se os dados estiverem corretos, redireciona para o dashboard
      navigate('/dashboard', { state: { loginSuccess: true } });
    } else {
      // Caso contrário, exibe uma mensagem de erro
      alert('E-mail ou senha inválidos');
    }
    setIsLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleLogin}>
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <div className="senha-container">
  <input
    type={mostrarSenha ? "text" : "password"}
    placeholder="Senha"
    value={senha}
    onChange={(e) => setSenha(e.target.value)}
  />
  <span
    className="olho-senha"
    onClick={() => setMostrarSenha(!mostrarSenha)}
  >
    {mostrarSenha ? <EyeOff size={15} /> : <Eye size={15} />}
  </span>
</div>

<button type="submit" className="login-button">
  <span className="button-content">
    {isLoading && <Loader2 className="loader-icon" />}
    Entrar
  </span>
</button>
        </form>

        <p className="register-message">
          <span className="register-label">Não tem cadastro?</span>{' '}
          <Link to="/cadastro" className="register-link">Clique aqui.</Link>
        </p>
        <p>
          <Link to="/nova-senha" className="recover-link">Esqueci minha senha.</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;