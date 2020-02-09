import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import getGrocerImage from '../store/grocers';
import { Button } from 'react-native-elements';

interface Props {}

const Receipt: React.FC<Props> = ({ route, navigation }) => {
  const receipt = route.params.item;
  const items = receipt[1].details;
  console.log({ items });
  return (
    <>
      <Image
        resizeMode='center'
        source={{ uri: getGrocerImage(receipt[1].emitter) }}
        style={styles.image}
        PlaceholderContent={<ActivityIndicator />}
      ></Image>
      <View
        style={{
          flexDirection: 'row',
          margin: 8,
          justifyContent: 'space-between'
        }}
      >
        <Text style={styles.title}>{receipt[1].emitter}</Text>
        <Text style={styles.title}>£{receipt[1].total}</Text>
      </View>
      <ScrollView>
        <View style={{ marginBottom: 64 }}>
          {items.map((item, i) => (
            <View
              key={i}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                margin: 8
              }}
            >
              <Text>{item.item}</Text>
              <Text>£{item.value}</Text>
            </View>
          ))}
        </View>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            position: 'absolute',
            bottom: 0
          }}
        >
          <Button
            containerStyle={{ width: '90%', margin: 16 }}
            style={{ backgroundColor: 'grey', width: '100%' }}
            title='Go back to receipts'
            onPress={() => {
              if (route.params.navigation) {
                route.params.navigation.navigate('Home');
              } else {
                navigation.navigate('Home');
              }
            }}
          ></Button>
        </View>
      </ScrollView>
    </>
  );
};

export default Receipt;

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Share Tech',
    fontSize: 36,
    marginHorizontal: 8,
    marginTop: 8
  },
  image: {
    width: '100%',
    height: '20%',
    resizeMode: 'cover'
  }
});
