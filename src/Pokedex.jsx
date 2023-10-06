import "./styles/styles.css";
import { useGetPokemons } from "./helper/useGetPokemons";

export const Pokedex = () => {
  const { pokemon, name, description, img, handleInputChange, handleOnSubmit } =
    useGetPokemons();

  return (
    <div className="container">
      <h1>Pokedex</h1>
      <form onSubmit={handleOnSubmit}>
        <input
          type="text"
          placeholder="Busca un Pokémon"
          value={name}
          onChange={handleInputChange}
        />
        <button type="submit" className="search-button">
          Buscar
        </button>
      </form>

      {pokemon && (
        <div className="container-pokemon" key={pokemon.id}>
          <h2>{pokemon.name}</h2>
          <img src={img} alt={pokemon.name} />
          <div className="container-info">
            <h3>
              Abilities:{" "}
              {pokemon.abilities
                .map((ability) => ability.ability.name)
                .join(", ")}
            </h3>
            <p>{description}</p>
          </div>
        </div>
      )}
    </div>
  );
};
