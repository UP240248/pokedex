import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import PokemonCard from "../componets/pokemon.tsx";

export default function Index() {
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    getPokemons();
  }, []);

  const getPokemons = async () => {
    const URL = "https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0";
    const response = await fetch(URL, {
      method: "GET",
    });
    const data = await response.json();
    setResults(data.results);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokédex</Text>

      <FlatList
        data={results}
        keyExtractor={(item) => item.name}
        numColumns={5}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <PokemonCard name={item.name} url={item.url} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#190b20",
    paddingTop: 50,
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 20,
  },
  list: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: "space-evenly",
    marginBottom: 12,
  },
});
