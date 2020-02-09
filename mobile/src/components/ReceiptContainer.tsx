import React from 'react';
import { Card, Image, Text } from 'react-native-elements';
import { ActivityIndicator, View, StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native-gesture-handler';
const { width, height } = Dimensions.get('window');

interface Receipt {
  name: String;
  totalPrice: number;
}

interface Props {
  title: String;
  receipts: Receipt[];
}

const ReceiptContainer: React.FC<Props> = ({ title, receipts, navigation }) => {
  const renderReceipt = ({ item, index }) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate('Receipt', { receipt: item })}
      >
        <Card containerStyle={styles.receiptContainer}>
          <Image
            source={{ uri: item.uri }}
            style={styles.image}
            PlaceholderContent={<ActivityIndicator />}
          ></Image>
          <View
            style={{
              backgroundColor: 'white',
              width: '100%',
              position: 'absolute',
              bottom: 0,
              padding: 16
            }}
          >
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text style={styles.receiptTitle}>{item.name}</Text>
              <Text>{item.totalPrice ? item.totalPrice : 'Unknown price'}</Text>
            </View>
          </View>
        </Card>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <>
      <Text style={styles.title}>{title}</Text>
      <View style={{ height: 200, marginVertical: 8 }}>
        <Carousel
          layout={'default'}
          itemHeight={100}
          renderItem={renderReceipt}
          data={receipts}
          sliderWidth={width}
          itemWidth={width * 0.8}
        ></Carousel>
      </View>
    </>
  );
};

export default ReceiptContainer;

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Share Tech',
    fontSize: 24,
    marginLeft: 8,
    marginTop: 8,
    marginBottom: 8
  },
  receiptContainer: {
    padding: 0,
    margin: 0,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    borderRadius: 16
  },
  image: {
    width: '100%',
    height: '100%'
  }
});
