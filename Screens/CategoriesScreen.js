import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableNativeFeedback,
  ActivityIndicator,
  ImageBackground,
  Button,
} from 'react-native';

const CategoriesScreen = props => {
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  // Handling http Requests for categories
  useEffect(() => {
    // every useEffect call will have it's own flag using closures
    let isComponentMounted = true;
    fetch(
      'https://beta.thevendi.com/vending_production/index.php/api_v2_0/machine/get_machine_details?ca_mac=10D07A45B4DE_CA&machinecode=10D07A45B4DE',
    )
      .then(response => {
        // the json method taking JSON as input and parsing it to produce a JavaScript object
        return response.json(); // once reolved passed data in js object to next then
      })
      .then(data => {
        if (isComponentMounted) {
          setData(data.vendi_store_categories);
        }
      })
      .catch(error => console.error(error));

    // cleanup function

    return () => {
      isComponentMounted = false;
    };
  }, []);

  // Handling http Request for products
  useEffect(() => {
    fetch(
      'https://beta.thevendi.com/vending_production/index.php/api_v2_0/inventory/get_items_list/10D07A45B4DE',
    )
      .then(response => {
        // the json method taking JSON as input and parsing it to produce a JavaScript object
        return response.json(); // once reolved passed data in js object to next then
      })
      .then(data => {
        setProducts(data);
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const renderItem = itemData => {
    return (
      <TouchableNativeFeedback
        onPress={() =>
          props.navigation.navigate('ProductScreen', {
            id: itemData.item.cat_code,
            categoryTitle: itemData.item.cat_name,
            products: products,
          })
        }>
        <View style={styles.gridItems}>
          <View style={{}}>
            <Text style={styles.gridItemsText}>{itemData.item.cat_name}</Text>
          </View>
          <ImageBackground
            source={{uri: itemData.item.cat_image}}
            style={{height: 140, width: 140}}></ImageBackground>
        </View>
      </TouchableNativeFeedback>
    );
  };
  return (
    <View style={styles.screen}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#CD113B" />
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.cat_name}
          numColumns={2}
        />
      )}
      <Text>{count}</Text>
      <Button onPress={() => setCount(count + 1)} title="count" />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridItems: {
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 10,
  },
  gridItemsText: {
    backgroundColor: '#CD113B',
    color: 'white',
  },
});
export default CategoriesScreen;
