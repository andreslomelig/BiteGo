import { useLocalSearchParams, Stack } from "expo-router";
import { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Animated,
} from "react-native";
import { API_URL } from "../../constants/config";
import { useCart } from "../../context/CartContext";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Palette } from "../../constants/theme";

const Toast = ({ message, visible }: { message: string; visible: boolean }) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.delay(2000),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View style={[styles.toast, { opacity }]}>
      <Text style={styles.toastText}>{message}</Text>
    </Animated.View>
  );
};

export default function ProductsScreen() {
  const { category } = useLocalSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();
  const [toastMessage, setToastMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  const showToast = (message: string) => {
    setToastMessage(message);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2500);
  };

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      // Ensure category is a string
      const categoryStr = Array.isArray(category) ? category[0] : category;
      if (!categoryStr) throw new Error("Invalid category");

      const url = `${API_URL}/products?categoryId=${categoryStr}`;
      console.log("Fetching URL:", url);
      
      // Test connectivity first
      try {
        await fetch('https://www.google.com', { method: 'HEAD' });
        console.log("Internet connectivity check passed");
      } catch (e) {
        console.warn("Internet connectivity check failed:", e);
      }

      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();
      console.log("Products received:", data.length);
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(`Failed to load products: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [category]);

  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={Palette.primary} />
      </View>
    );

  if (error)
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchProducts}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ 
        title: category?.toString().toUpperCase(),
        headerStyle: { backgroundColor: Palette.background },
        headerTintColor: Palette.text,
      }} />
      
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />

            <View style={styles.info}>
              <View style={styles.headerRow}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>${item.price}</Text>
              </View>
              <Text style={styles.desc}>{item.description}</Text>
              
              <TouchableOpacity 
                style={styles.addButton}
                onPress={() => {
                  addToCart(item);
                  showToast(`${item.name} added to cart!`);
                }}
              >
                <Text style={styles.addButtonText}>Add to Cart</Text>
                <IconSymbol name="cart.fill" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <Toast message={toastMessage} visible={toastVisible} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: Palette.background,
    flex: 1,
  },
  card: {
    backgroundColor: Palette.card,
    borderRadius: 16,
    marginBottom: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#333',
  },
  image: {
    width: "100%",
    height: 200,
  },
  info: {
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    color: Palette.text,
    fontSize: 20,
    fontWeight: "700",
    flex: 1,
    marginRight: 8,
  },
  price: {
    color: Palette.accent,
    fontSize: 18,
    fontWeight: "700",
  },
  desc: {
    color: Palette.textSecondary,
    fontSize: 14,
    marginBottom: 16,
    lineHeight: 20,
  },
  addButton: {
    backgroundColor: Palette.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  addButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  center: {
    flex: 1,
    backgroundColor: Palette.background,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    color: Palette.danger,
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  retryButton: {
    backgroundColor: Palette.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  toast: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
    backgroundColor: Palette.success,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  toastText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
