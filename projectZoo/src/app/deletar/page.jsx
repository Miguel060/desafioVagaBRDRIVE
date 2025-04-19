'use client'
import { useState, useEffect } from 'react';

export default function Deletar() {
  const [animais, setAnimais] = useState([]);
  const [mensagemErro, setMensagemErro] = useState('');
  useEffect(() => {
    async function fetchAnimais() {
      try {
        const response = await fetch('/api/zoologico');
        const data = await response.json();

        if (Array.isArray(data)) {
          setAnimais(data);
        } else {
          setMensagemErro('Erro ao carregar animais');
        }
      } catch (error) {
        console.error('Erro ao buscar animais:', error);
        setMensagemErro('Erro ao buscar animais');
      }
    }

    fetchAnimais();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/zoologico/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setAnimais(animais.filter(animal => animal.id !== id));
      } else {
        setMensagemErro('Erro ao deletar animal');
      }
    } catch (error) {
      console.error('Erro ao deletar animal:', error);
      setMensagemErro('Erro ao deletar animal');
    }
  };

  return (
    <div>
      <h1>Lista de Animais</h1>
      {mensagemErro && <p style={{ color: 'red' }}>{mensagemErro}</p>}
      
      {animais.length > 0 ? (
        animais.map((animal) => (
          <div key={animal.id}>
            <h2>{animal.nome}</h2>
            <p>{animal.descricao}</p>
            <img src={animal.imagemUrl} alt={animal.nome} style={{ width: '200px' }} />
            <button onClick={() => handleDelete(animal.id)}>Deletar</button>
          </div>
        ))
      ) : (
        <p>Nenhum animal encontrado.</p>
      )}
    </div>
  );
}
