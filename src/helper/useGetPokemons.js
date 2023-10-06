import { useEffect, useState } from "react";

export const useGetPokemons = () => {
  const baseUrl = "https://pokeapi.co/api/v2/pokemon/";
  const speciesUrl = "https://pokeapi.co/api/v2/pokemon-species/";
  const imgUrl =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";

  const [name, setName] = useState("");
  const [pokemon, setPokemon] = useState(null);
  const [description, setDescription] = useState("");
  const [img, setImg] = useState("");

  useEffect(() => {
    const fetchDescriptionAndimg = async () => {
      if (pokemon) {
        try {
          const response = await fetch(`${speciesUrl}${pokemon.id}`);
          const data = await response.json();
          const descriptionEntry = data.flavor_text_entries.find(
            (entry) => entry.language.name === "en"
          );
          setDescription(descriptionEntry.flavor_text);
          const imgeUrl = `${imgUrl}${pokemon.id}.png`;
          setImg(imgeUrl);
        } catch (error) {
          console.error(
            "Error al obtener la descripción o imagen del Pokémon",
            error
          );
        }
      }
    };

    fetchDescriptionAndimg();
  }, [pokemon]);

  const fetchPokemon = async () => {
    try {
      const response = await fetch(`${baseUrl}${name}`);
      const data = await response.json();
      setPokemon(data);
      setDescription("");
      setImg("");
    } catch (error) {
      console.error("Ocurrió un error al buscar el Pokémon", error);
      setPokemon(null);
      setDescription("");
      setImg("");
    }
  };

  const handleInputChange = (e) => {
    setName(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    fetchPokemon();
  };
  
  return {
    pokemon,
    name,
    description,
    img,
    handleInputChange,
    handleOnSubmit,
  };
};
