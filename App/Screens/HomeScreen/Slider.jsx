import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import GlobalApi from '../../Utils/GlobalApi';
import Heading from '../../Components/Heading';

export default function Slider() {
  const [slider, setSlider] = useState([]);

  useEffect(() => {
    getSliders();
  }, []);

  const getSliders = () => {
    GlobalApi.getSlider().then((resp) => {
      setSlider(resp?.sliders);
    });
  };

  return (
    <FlatList
      data={slider}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={styles.imageContainer}>
          <Image source={{ uri: item?.image?.url }} style={styles.sliderImage} />
        </View>
      )}
      ListHeaderComponent={<Heading text={'Welcome'} />}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    padding: 10,
  },
  imageContainer: {
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
  sliderImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
});
