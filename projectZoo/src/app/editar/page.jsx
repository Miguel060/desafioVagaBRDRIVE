'use client';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import MenuLateral from '../components/MenuLateral';

export default function Editar() {
  const [animais, setAnimais] = useState([]);
  const [editando, setEditando] = useState(null);
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    async function fetchAnimais() {
      const res = await fetch('/api/zoologico');
      const data = await res.json();
      setAnimais(data);
    }
    fetchAnimais();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { id, nome, descricao, imagemUrl } = editando;

    const res = await fetch(`/api/zoologico/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, descricao, imagemUrl }),
    });

    if (res.ok) {
      setMensagem('Animal atualizado com sucesso!');
      setEditando(null);
      const atualizados = await fetch('/api/zoologico').then(res => res.json());
      setAnimais(atualizados);
    } else {
      setMensagem('Erro ao atualizar.');
    }
  };

  return (
    <div>
      <Header/>
      <MenuLateral/>
      <h1>Editar Animais</h1>
      {mensagem && <p>{mensagem}</p>}
      {animais.map(animal => (
        <div key={animal.id}>
          <h2>{animal.nome}</h2>
          <button onClick={() => setEditando(animal)}>Editar</button>
        </div>
      ))}

      {editando && (
        <form onSubmit={handleSubmit}>
          <input
            value={editando.nome}
            onChange={e => setEditando({ ...editando, nome: e.target.value })}
          />
          <input
            value={editando.descricao}
            onChange={e => setEditando({ ...editando, descricao: e.target.value })}
          />
          <input
            value={editando.imagemUrl}
            onChange={e => setEditando({ ...editando, imagemUrl: e.target.value })}
          />
          <button type="submit">Salvar</button>
          <button type="button" onClick={() => setEditando(null)}>Cancelar</button>
        </form>
      )}
    </div>
  );
}
