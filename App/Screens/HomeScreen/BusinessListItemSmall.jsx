import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Colors from '../../Utils/Colors';
import { useNavigation } from '@react-navigation/native';

export default function BusinessListItemSmall({ business }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.push('business-detail', {
          business: business,
        })
      }
    >
      <Image
        source={{ uri: business?.images[0]?.url }}
        style={styles.image}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.businessName}>
          {business?.name}
        </Text>
        <Text style={styles.contactPerson}>{business?.contactPerson}</Text>
        <Text style={styles.categoryText}>
          {business?.category?.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
  },
  infoContainer: {
    padding: 7,
    display: 'flex',
    gap: 3,
  },
  image: {
    width: 220,
    height: 120,
    borderRadius: 5,
    marginBottom:5,
  },
  businessName: {
    fontSize: 17,
    fontFamily: 'outfit-medium',
    flexWrap: 'wrap',
    flexShrink: 1,
    lineHeight: 16,
  },
  contactPerson: {
    fontSize: 13,
    fontFamily: 'outfit',
    color: Colors.GRAY,
  },
  categoryText: {
    fontSize: 12,
    fontFamily: 'outfit',
    padding: 3,
    color: Colors.PRIMARY,
    backgroundColor: Colors.PRIMARY_LIGHT,
    borderRadius: 3,
    alignSelf: 'flex-start',
    paddingHorizontal: 7,
  },
});
