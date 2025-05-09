import { useState, useEffect } from 'react';
import './Dashboard.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Modal from 'react-modal';

interface Task {
  id: number;
  text: string;
  category: string;
  completed: boolean;
}

const Dashboard = () => {
  
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem("tarefas");
    return saved ? JSON.parse(saved) : [];
  });

  const [categories, setCategories] = useState<string[]>(() => {
    const saved = localStorage.getItem("categorias");
    return saved ? JSON.parse(saved).map((c: string) => c.toLowerCase()) : ['estudo', 'trabalho', 'pessoal'];
  });

  const [newTaskText, setNewTaskText] = useState<string>('');
  const [newTaskCategory, setNewTaskCategory] = useState<string>('estudo');
  const [customCategory, setCustomCategory] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [showCategoryManager, setShowCategoryManager] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);
  

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.loginSuccess) {
      toast.success("Login realizado com sucesso!", {
        position: "top-right",
        autoClose: 3000,
      });
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [location.state?.loginSuccess]);

  useEffect(() => {
    localStorage.setItem("tarefas", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("categorias", JSON.stringify(categories));
  }, [categories]);

  const handleLogout = () => {
    navigate("/login");
  };

  const addCategory = () => {
    const newCategory = customCategory.trim().toLowerCase();
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewTaskCategory(newCategory);
      setCustomCategory('');
    }
  };

  // Função para abrir o modal de confirmação
  const confirmDeleteCategory = (category: string) => {
    setCategoryToDelete(category);
    setModalIsOpen(true);
  };

  // Função que de fato deleta a categoria
  const deleteCategory = () => {
    if (!categoryToDelete) return;
    if (categories.length === 1) {
      toast.warning("Você precisa ter pelo menos uma categoria.", {
        position: "top-right",
        autoClose: 3000,
      });
      setModalIsOpen(false);
      return;
    }
    setCategories(prev => prev.filter(cat => cat !== categoryToDelete));
    setTasks(prev => prev.filter(task => task.category !== categoryToDelete));
    toast.success("Categoria excluída com sucesso!", {
      position: "top-right",
      autoClose: 3000,
    });
    setModalIsOpen(false);
    setCategoryToDelete(null);
  };

  const addTask = () => {
    const categoryToUse = newTaskCategory === 'outro' && customCategory.trim()
      ? customCategory.trim().toLowerCase()
      : newTaskCategory.toLowerCase();

    if (newTaskText.trim() && categoryToUse) {
      const newTask: Task = {
        id: tasks.length + 1,
        text: newTaskText,
        category: categoryToUse,
        completed: false,
      };

      setTasks([...tasks, newTask]);
      setNewTaskText('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  const toggleTaskCompletion = (taskId: number) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (taskId: number) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.text.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || task.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <button className="logout-btn" onClick={handleLogout}>Sair</button>
        <h1 className="title">Bem-vindo à sua Lista de Tarefas</h1>
      </div>

      <section className="tasks-section">
        <div className="task-input">
          <input
            type="text"
            className="task-input-field"
            placeholder="Digite uma nova tarefa..."
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <select
            value={newTaskCategory}
            onChange={(e) => setNewTaskCategory(e.target.value)}
            className="task-category"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
            <option value="outro">Outra...</option>
          </select>

          {newTaskCategory === 'outro' && (
            <>
              <input
                type="text"
                className="custom-category-input"
                placeholder="Nova categoria"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
              />
              <button onClick={addCategory} className="add-category-btn">
                Adicionar Categoria
              </button>
            </>
          )}

          {/* Ordem corrigida dos botões */}
          <button className="add-task-btn" onClick={addTask}>
            Adicionar Tarefa
          </button>

          <button
            className="manage-category-btn"
            onClick={() => setShowCategoryManager(prev => !prev)}
          >
            {showCategoryManager ? "Ocultar Categorias" : "Gerenciar Categorias"}
          </button>

          {showCategoryManager && (
            <div className="category-manager">
              <h3>Categorias Cadastradas:</h3>
              <ul>
                {categories.map((cat) => (
                  <li key={cat} className="category-item">
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    <button
                      className="delete-category-btn"
                      onClick={() => confirmDeleteCategory(cat)}
                    >
                      Excluir
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="task-filters">
          <input
            type="text"
            className="search-bar"
            placeholder="Buscar tarefa..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="category-filter"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">Todas</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="task-lists">
          <div className="task-list pending">
            <h2>Tarefas Pendentes</h2>
            <ul>
              {filteredTasks.filter(task => !task.completed).map((task) => (
                <li key={task.id} className="task-item">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTaskCompletion(task.id)}
                  />
                  <span className="task-text">{task.text}</span>
                  <button className="delete-btn" onClick={() => deleteTask(task.id)}>Excluir</button>
                </li>
              ))}
            </ul>
          </div>

          <div className="task-list completed">
            <h2 style={{ marginLeft: '9.4rem' }}>Tarefas Concluídas</h2>
            <ul>
              {filteredTasks.filter(task => task.completed).map((task) => (
                <li key={task.id} className="task-item">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTaskCompletion(task.id)}
                  />
                  <span className="task-text">{task.text}</span>
                  <button className="delete-btn" onClick={() => deleteTask(task.id)}>Excluir</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Modal de confirmação de exclusão */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Confirmar exclusão"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Confirmar Exclusão</h2>
        <p className = "modal-message">Tem certeza que deseja excluir a categoria <strong>{categoryToDelete}</strong>?</p>
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <button onClick={deleteCategory} className="confirm-btn">Confirmar</button>
          <button onClick={() => setModalIsOpen(false)} className="cancel-btn">Cancelar</button>
        </div>
      </Modal>
    </div>
  );
};

export default Dashboard;