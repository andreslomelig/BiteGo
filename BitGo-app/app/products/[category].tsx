import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { API_URL } from "../../constants/config";

export default function ProductsScreen() {
  const { category } = useLocalSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/products?categoryId=${category}`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .finally(() => setLoading(false));
  }, [category]);

  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{category?.toString().toUpperCase()}</Text>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />

            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>${item.price}</Text>
              <Text style={styles.desc}>{item.description}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#0f172a",
    flex: 1,
  },
  title: {
    color: "white",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 14,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#1e293b",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 160,
  },
  info: {
    padding: 12,
  },
  name: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  price: {
    color: "#22c55e",
    fontSize: 16,
    marginVertical: 4,
  },
  desc: {
    color: "#cbd5e1",
  },
  center: {
    flex: 1,
    backgroundColor: "#0f172a",
    justifyContent: "center",
    alignItems: "center",
  },
});
