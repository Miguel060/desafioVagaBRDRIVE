'use client'

import { useState } from 'react';

export default function InsertAnimalForm() {
  const [nome, setNome] = useState('');
  const [especie, setEspecie] = useState('');
  const [descricao, setDescricao] = useState('');
  const [imagemUrl, setImagemUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const novoAnimal = { nome, especie, descricao, imagemUrl };

    try {
      const response = await fetch('/api/zoologico', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoAnimal),
      });

      if (response.ok) {
        alert('Animal cadastrado com sucesso!');
        setNome('');
        setEspecie('');
        setDescricao('');
        setImagemUrl('');
      } else {
        alert('Erro ao cadastrar animal.');
      }
    } catch (error) {
      console.error('Erro de requisição:', error);
      alert('Erro ao cadastrar animal.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Formulário</h2>
      <div>
        <label htmlFor="nome">Nome:</label>
        <input
          type="text"
          id="nome"
          name="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)} 
          required
        />
      </div>

      <div>
        <label htmlFor="especie">Espécie:</label>
        <input
          type="text"
          id="especie"
          name="especie"
          value={especie}
          onChange={(e) => setEspecie(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="descricao">Descrição:</label>
        <textarea
          id="descricao"
          name="descricao"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)} 
        />
      </div>

      <div>
        <label htmlFor="imagemUrl">URL da Imagem:</label>
        <input
          type="url"
          id="imagemUrl"
          name="imagemUrl"
          value={imagemUrl}
          onChange={(e) => setImagemUrl(e.target.value)}
        />
      </div>

      <button type="submit">Cadastrar</button>
    </form>
  );
}
