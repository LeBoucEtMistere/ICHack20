import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  SafeAreaView
} from 'react-native';
import { Button } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

interface Props {}

const Receipt: React.FC<Props> = ({ route }) => {
  const receipt = route.params.data;
  console.log({ receipt });
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <Image
          resizeMode='center'
          source={{ uri: receipt.imageUri }}
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
          <Text style={styles.title}>{receipt.name}</Text>
          <Text style={styles.title}>{receipt.total}</Text>
        </View>
        <View>
          {receipt.items.map((item, i) => (
            <View
              key={i}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                margin: 8
              }}
            >
              <Text>{item.name}</Text>
              <Text>{item.price}</Text>
            </View>
          ))}
          <Button style={{ backgroundColor: 'grey' }} title='Save'></Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Receipt;

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Share Tech',
    fontSize: 36,
    marginLeft: 8,
    marginTop: 8
  },
  image: {
    width: '100%',
    height: '75%'
  }
});
