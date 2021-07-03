import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const ProductDetailScreen = () => {
  return (
    <View style={styles.screen}>
      <Text>ProductDetailScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default ProductDetailScreen;
