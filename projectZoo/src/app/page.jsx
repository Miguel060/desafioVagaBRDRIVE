'use client'
import { useState } from "react";
import styles from "../app/PageStyles.module.css"
import Header from "../app/components/Header";
import Link from "next/link"; 
import MenuLateral from "./components/MenuLateral";
export default function Buscar() {
  const [query, setQuery] = useState("");
  const [animal, setAnimal] = useState(null);
  const [mensagemErro, setMensagemErro] = useState("");

  const handleSearch = async () => {
    setMensagemErro("");
    setAnimal(null);

    try {
      const response = await fetch(`/api/zoologico?query=${query}`);
      const data = await response.json();

      if (!response.ok) {
        setMensagemErro(data.message);
      } else {
        setAnimal(data);
      }
    } catch (error) {
      setMensagemErro("Erro inesperado na busca");
      console.error("Erro ao buscar animal", error);
    }
  };

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <div className={styles.mainDivBusca}>
          <h1 className={styles.font_}>Busca</h1>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Digite o nome ou ID do animal"
            className={styles.input}
          />
          <button onClick={handleSearch} className={styles.botao}>
            Buscar
          </button>
        </div>

        {mensagemErro && <p className={styles.erro}>{mensagemErro}</p>}

        <div className={styles.mainDivAnimal}>
          {animal && (
            <div className={styles.resultado}>
              <h2>{animal.nome}</h2>
              <p>{animal.descricao}</p>
              <img src={animal.imagemUrl} alt={`Imagem de ${animal.nome}`} />
            </div>
          )}
        </div>
      </div>
      <MenuLateral/>

    </div>
  );
}
