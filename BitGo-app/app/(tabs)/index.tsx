import { useEffect, useState } from "react";
import { Link } from "expo-router";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  StyleSheet,
} from "react-native";
import { API_URL } from "../../constants/config";

export default function CategoriesScreen() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Category</Text>

      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) => (
          <Link
            href={`/products/${item.id}`}
            asChild
          >
            <TouchableOpacity style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.overlay} />
              <Text style={styles.cardText}>{item.name}</Text>
            </TouchableOpacity>
          </Link>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
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
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    width: "48%",
    height: 150,
    borderRadius: 14,
    overflow: "hidden",
    marginBottom: 12,
    backgroundColor: "#1e293b",
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  cardText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    position: "absolute",
    bottom: 12,
    left: 12,
  },
  center: {
    flex: 1,
    backgroundColor: "#0f172a",
    justifyContent: "center",
    alignItems: "center",
  },
});
