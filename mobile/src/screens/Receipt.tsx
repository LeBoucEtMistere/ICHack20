import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import getGrocerImage from '../store/grocers';

interface Props {}

const Receipt: React.FC<Props> = ({ route }) => {
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
      <ScrollView>
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
        <View>
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
