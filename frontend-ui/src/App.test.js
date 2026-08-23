import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

// N'simuliw l'comportement mta3 l'API l'zouz
beforeEach(() => {
  global.fetch = jest.fn((url) => {
    // Ken l'React y'kallem /api/hello
    if (url.includes('/api/hello')) {
      return Promise.resolve({
        json: () => Promise.resolve({ message: "Hello Test Mock" })
      });
    }
    // Ken l'React y'kallem /api/tasks
    if (url.includes('/api/tasks')) {
      return Promise.resolve({
        json: () => Promise.resolve([
          { id: 1, title: 'Tâche Test 1' },
          { id: 2, title: 'Tâche Test 2' }
        ])
      });
    }
    return Promise.reject("URL non reconnue");
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('Affiche le message hello et la liste des tâches', async () => {
  render(<App />);
  
  // Nestanew l'données l'zouz taban fil ecran
  await waitFor(() => {
    expect(screen.getByText(/Hello Test Mock/i)).toBeInTheDocument();
    expect(screen.getByText(/Tâche Test 1/i)).toBeInTheDocument();
  });
});