import { useState } from 'react';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export default function App() {
  // Auth state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Task Tracker state
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'qa123') {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Invalid credentials');
    }
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const pendingCount = tasks.filter((t) => !t.completed).length;

  // Render Login screen if user is not authenticated
  if (!isLoggedIn) {
    return (
      <main style={{ maxWidth: '360px', margin: '4rem auto', fontFamily: 'system-ui, sans-serif' }}>
        <h1>QA Portal Login</h1>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input
            type="text"
            placeholder="Username"
            aria-label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ padding: '8px' }}
          />
          <input
            type="password"
            placeholder="Password"
            aria-label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: '8px' }}
          />
          <button type="submit" style={{ padding: '8px', cursor: 'pointer' }}>
            Login
          </button>
        </form>
        {loginError && (
          <p data-testid="login-error" style={{ color: '#d32f2f', marginTop: '10px' }}>
            {loginError}
          </p>
        )}
      </main>
    );
  }

  // Render Task Tracker when authenticated
  return (
    <main style={{ maxWidth: '480px', margin: '3rem auto', fontFamily: 'system-ui, sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
        <h1>Task Tracker</h1>
        <button type="button" onClick={() => setIsLoggedIn(false)} data-testid="logout-btn">
          Logout
        </button>
      </header>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!input.trim()) {
            setError('Task title cannot be empty');
            return;
          }
          setError('');
          setTasks([...tasks, { id: Date.now(), title: input.trim(), completed: false }]);
          setInput('');
        }}
        style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          aria-label="Task title"
          style={{ flex: 1, padding: '8px' }}
        />
        <button type="submit">Add task</button>
      </form>

      {error && (
        <p data-testid="error-msg" style={{ color: '#d32f2f', margin: '4px 0 12px' }}>
          {error}
        </p>
      )}

      <p data-testid="pending-counter" style={{ fontWeight: 'bold' }}>
        Pending tasks: {pendingCount}
      </p>

      <ul data-testid="task-list" style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map((task) => (
          <li
            key={task.id}
            data-testid="task-item"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '8px 0',
              borderBottom: '1px solid #eee',
            }}
          >
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                data-testid="task-checkbox"
              />
              <span
                data-testid="task-title"
                style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
              >
                {task.title}
              </span>
            </label>
            <button
              type="button"
              onClick={() => deleteTask(task.id)}
              data-testid="delete-task-btn"
              style={{ color: '#d32f2f', cursor: 'pointer' }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}