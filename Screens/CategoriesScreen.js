import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableNativeFeedback,
} from 'react-native';

const productCategories = [
  {
    categorieId: 1,
    categorieTitle: 'Snacks',
  },
  {
    categorieId: 2,
    categorieTitle: 'Beverages',
  },
  {
    categorieId: 3,
    categorieTitle: 'Fruits & Veg',
  },
  {
    categorieId: 4,
    categorieTitle: 'Groceries',
  },
  {
    categorieId: 5,
    categorieTitle: 'Meat & Poultry',
  },
  {
    categorieId: 6,
    categorieTitle: 'Bakery',
  },
  {
    categorieId: 7,
    categorieTitle: 'Health & Beauty',
  },
  {
    categorieId: 8,
    categorieTitle: 'Books',
  },
  {
    categorieId: 9,
    categorieTitle: 'Mobile Phones',
  },
  {
    categorieId: 10,
    categorieTitle: 'Computers',
  },
];

const CategoriesScreen = props => {
  const renderItem = itemData => {
    return (
      <TouchableNativeFeedback
        onPress={() =>
          props.navigation.navigate('ProductScreen', {
            id: itemData.item.categorieId,
            categoryTitle: itemData.item.categorieTitle,
          })
        }>
        <View style={styles.listItem}>
          <Text style={{marginTop: 10}}>{itemData.item.categorieTitle}</Text>
        </View>
      </TouchableNativeFeedback>
    );
  };
  return (
    <View>
      <Text> Advertisment </Text>
      <FlatList
        data={productCategories}
        renderItem={renderItem}
        keyExtractor={item => item.categorieId}
        numColumns={2}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    width: '40%',
    alignItems: 'center',
    height: 100,
    margin: 20,
    elevation: 5,
  },
  list: {
    alignItems: 'center',
  },
});
export default CategoriesScreen;
