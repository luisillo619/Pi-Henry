
export const pokemonsFrom = (filter, pokemons) => {
  
  const regexUUID =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (filter === "All pokemons") {
    return pokemons;
  } else if (filter === "Pokemons created") {
    const pokemonsDb = pokemons.filter((e) => regexUUID.test(e.id));
    return pokemonsDb;
  } else if (filter === "Pokemons not created") {
    const pokemonsApi = pokemons.filter((e) => !regexUUID.test(e.id));
    return pokemonsApi;
  }
};

export const pokemonsSorted = (filter, pokemons) => {
  // SORT AFECTA AL ARRAY ORIGINAL
  let pokemonCopy = pokemons.slice();
  if (filter === "Alphabetical sort: Z - A") {
    const pokemonsZ_A = pokemonCopy.sort((a, b) =>
      b.name.localeCompare(a.name)
    );
    return pokemonsZ_A;
  } else if (filter === "Alphabetical sort: A - Z") {
    const pokemonsA_Z = pokemonCopy.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    return pokemonsA_Z;
  } else if (filter === "Weight sort: min - max") {
    const pokemonsMin_Max_weight = pokemonCopy.sort(
      (a, b) => parseInt(a.weight) - parseInt(b.weight)
    );
    return pokemonsMin_Max_weight;
  } else if (filter === "Weight sort: max - min") {
    const pokemonsMax_Min_weight = pokemonCopy.sort(
      (a, b) => parseInt(b.weight) - parseInt(a.weight)
    );
    return pokemonsMax_Min_weight;
  } else if (filter === "Attack power: min - max") {
    const pokemonsMin_Max_attack = pokemonCopy.sort(
      (a, b) => parseInt(a.attack) - parseInt(b.attack)
    );
    return pokemonsMin_Max_attack;
  } else if (filter === "Attack power: max - min") {
    const pokemonsMin_Max__attack = pokemonCopy.sort(
      (a, b) => parseInt(b.attack) - parseInt(a.attack)
    );
    return pokemonsMin_Max__attack;
  }
};

export const pokemonsTypes = (filter, pokemons) => {
  const pokemonType = pokemons.filter((e) => e.types.includes(filter));
  return pokemonType;
};

export const pokemonNames = (filter, pokemons) => {
  const expresion = new RegExp(`${filter}.*`, "i");
  const pokemonName = pokemons.filter((e) => expresion.test(e.name));
  return pokemonName;
};
