'use client';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import MenuLateral from '../components/MenuLateral';
import styles from '../Editar.module.css'

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
      setTimeout(() => setMensagem(''), 3000);
    } else {
      setMensagem('Erro ao atualizar.');
    }
  };

  return (
    <div className={styles.container}>
      <Header/>
      <MenuLateral/>
      
      <main className={styles.mainContent}>
        <h1 className={styles.tituloPagina}>Editar Animais</h1>
        
        {mensagem && (
          <div className={`${styles.mensagem} ${mensagem.includes('sucesso') ? styles.sucesso : styles.erro}`}>
            {mensagem}
          </div>
        )}

        <div className={styles.listaAnimais}>
          {animais.map(animal => (
            <div key={animal.id} className={styles.cardAnimal}>
              <div className={styles.cardContent}>
                {animal.imagemUrl && (
                  <img 
                    src={animal.imagemUrl} 
                    alt={animal.nome} 
                    className={styles.animalImage}
                  />
                )}
                <h2 className={styles.animalNome}>{animal.nome}</h2>
              </div>
              <button 
                onClick={() => setEditando(animal)}
                className={styles.botaoEditar}
              >
                Editar
              </button>
            </div>
          ))}
        </div>

        {editando && (
          <div className={styles.modalOverlay}>
            <form onSubmit={handleSubmit} className={styles.formEdicao}>
              <h2>Editando: {editando.nome}</h2>
              
              <div className={styles.formGroup}>
                <label>Nome:</label>
                <input
                  value={editando.nome}
                  onChange={e => setEditando({ ...editando, nome: e.target.value })}
                  className={styles.formInput}
                  required
                />
              </div>
              
              <div className={styles.formGroup}>
                <label>Descrição:</label>
                <textarea
                  value={editando.descricao}
                  onChange={e => setEditando({ ...editando, descricao: e.target.value })}
                  className={styles.formTextarea}
                  rows="4"
                  required
                />
              </div>
              
              <div className={styles.formGroup}>
                <label>URL da Imagem:</label>
                <input
                  value={editando.imagemUrl}
                  onChange={e => setEditando({ ...editando, imagemUrl: e.target.value })}
                  className={styles.formInput}
                />
              </div>
              
              {editando.imagemUrl && (
                <div className={styles.imagemPreview}>
                  <img 
                    src={editando.imagemUrl} 
                    alt={`Preview de ${editando.nome}`} 
                    className={styles.previewImage}
                  />
                </div>
              )}

              <div className={styles.botoesContainer}>
                <button type="submit" className={styles.botaoSalvar}>
                  Salvar Alterações
                </button>
                <button 
                  type="button" 
                  onClick={() => setEditando(null)}
                  className={styles.botaoCancelar}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}