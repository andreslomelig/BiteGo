import { StyleSheet, FlatList, TouchableOpacity, View, Text, Alert } from 'react-native';
import { Image } from 'expo-image';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useCart } from '../../context/CartContext';
import { Palette } from '../../constants/theme';

export default function CartScreen() {
  const { items, removeFromCart, updateQuantity, clearCart, total } = useCart();

  const handleCheckout = () => {
    Alert.alert(
      "Confirm Checkout",
      "Are you sure you want to place this order?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Confirm",
          onPress: () => {
            Alert.alert("Order Placed!", "Your food is on the way.", [
              { text: "OK", onPress: clearCart }
            ]);
          }
        }
      ]
    );
  };

  const handleRemoveItem = (id: string, name: string) => {
    Alert.alert(
      "Remove Item",
      `Are you sure you want to remove ${name} from your cart?`,
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Remove", 
          style: "destructive",
          onPress: () => removeFromCart(id) 
        }
      ]
    );
  };

  return (
    <ThemedView style={[styles.container, { backgroundColor: Palette.background }]}>
      <View style={styles.header}>
        <ThemedText type="title" style={{ color: Palette.primary }}>Your Cart</ThemedText>
        {items.length > 0 && (
          <TouchableOpacity onPress={clearCart}>
            <ThemedText style={styles.clearText}>Clear</ThemedText>
          </TouchableOpacity>
        )}
      </View>

      {items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <IconSymbol name="cart" size={80} color={Palette.textSecondary} />
          <ThemedText style={[styles.emptyText, { color: Palette.text }]}>Your cart is empty</ThemedText>
          <ThemedText style={[styles.emptySubText, { color: Palette.textSecondary }]}>Go explore some delicious food!</ThemedText>
        </View>
      ) : (
        <>
          <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <Image source={{ uri: item.image }} style={styles.itemImage} />
                <View style={styles.itemInfo}>
                  <ThemedText type="defaultSemiBold" style={{ color: Palette.text }}>{item.name}</ThemedText>
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity 
                      onPress={() => {
                        if (item.quantity > 1) updateQuantity(item.id, -1);
                        else handleRemoveItem(item.id, item.name);
                      }}
                      style={styles.quantityButton}
                    >
                      <Text style={styles.quantityButtonText}>-</Text>
                    </TouchableOpacity>
                    <ThemedText style={styles.quantityText}>{item.quantity}</ThemedText>
                    <TouchableOpacity 
                      onPress={() => updateQuantity(item.id, 1)}
                      style={styles.quantityButton}
                    >
                      <Text style={styles.quantityButtonText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.actions}>
                  <ThemedText style={styles.totalItemPrice}>${item.price * item.quantity}</ThemedText>
                  <TouchableOpacity onPress={() => handleRemoveItem(item.id, item.name)} style={styles.removeButton}>
                    <IconSymbol name="trash" size={20} color={Palette.danger} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
          
          <View style={styles.footer}>
            <View style={styles.totalRow}>
              <ThemedText type="subtitle" style={{ color: Palette.text }}>Total:</ThemedText>
              <ThemedText type="subtitle" style={styles.totalAmount}>${total.toFixed(2)}</ThemedText>
            </View>
            <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
              <Text style={styles.checkoutText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  clearText: {
    color: Palette.danger,
    fontSize: 16,
    fontWeight: '600',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: Palette.card,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemPrice: {
    color: Palette.textSecondary,
    marginTop: 4,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 12,
  },
  quantityButton: {
    backgroundColor: '#333',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 20,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    color: Palette.text,
  },
  actions: {
    alignItems: 'flex-end',
    gap: 8,
  },
  totalItemPrice: {
    fontWeight: 'bold',
    color: Palette.accent,
    fontSize: 16,
  },
  removeButton: {
    padding: 4,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Palette.background,
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  totalAmount: {
    color: Palette.success,
    fontSize: 24,
  },
  checkoutButton: {
    backgroundColor: Palette.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  checkoutText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.7,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
  },
  emptySubText: {
    marginTop: 8,
  },
});
