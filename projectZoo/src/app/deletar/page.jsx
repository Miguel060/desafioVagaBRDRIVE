'use client';
import { useState, useEffect } from 'react';
import MenuLateral from '../components/MenuLateral';
import Header from '../components/Header';
import styles from '../Editar.module.css';

export default function Deletar() {
  const [animais, setAnimais] = useState([]);
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    async function fetchAnimais() {
      try {
        const response = await fetch('/api/zoologico');
        const data = await response.json();

        if (Array.isArray(data)) {
          setAnimais(data);
        } else {
          setMensagem('Erro ao carregar animais');
        }
      } catch (error) {
        console.error('Erro ao buscar animais:', error);
        setMensagem('Erro ao buscar animais');
      }
    }

    fetchAnimais();
  }, []);

  const handleDelete = async (id, nome) => {
    const confirmacao = confirm(`Tem certeza que deseja deletar o animal "${nome}"?`);
    if (!confirmacao) return;

    try {
      const response = await fetch(`/api/zoologico/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setAnimais(animais.filter(animal => animal.id !== id));
        setMensagem(`Animal "${nome}" deletado com sucesso!`);
        setTimeout(() => setMensagem(''), 3000);
      } else {
        setMensagem('Erro ao deletar animal');
      }
    } catch (error) {
      console.error('Erro ao deletar animal:', error);
      setMensagem('Erro ao deletar animal');
    }
  };

  return (
    <div className={styles.container}>
      <Header />
      <MenuLateral />

      <main className={styles.mainContent}>
        <h1 className={styles.tituloPagina}>Deletar Animais</h1>

        {mensagem && (
          <div className={`${styles.mensagem} ${mensagem.includes('sucesso') ? styles.sucesso : styles.erro}`}>
            {mensagem}
          </div>
        )}

        <div className={styles.listaAnimais}>
          {animais.length > 0 ? (
            animais.map((animal) => (
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
                  onClick={() => handleDelete(animal.id, animal.nome)}
                  className={styles.botaoCancelar}
                >
                  Deletar
                </button>
              </div>
            ))
          ) : (
            <p className={styles.erro}>Nenhum animal encontrado.</p>
          )}
        </div>
      </main>
    </div>
  );
}
