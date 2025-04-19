'use client'
import { useState } from "react";

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
      <h1>Buscar Animal</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Digite o nome ou ID do animal"
      />
      <button onClick={handleSearch}>Buscar</button>

      {mensagemErro && <p style={{ color: "red" }}>{mensagemErro}</p>}

      {animal && (
        <div>
          <h2>{animal.nome}</h2>
          <p>{animal.descricao}</p>
          <img src={animal.imagemUrl} alt={`Imagem de ${animal.nome}`} />
        </div>
      )}
    </div>
  );
}
