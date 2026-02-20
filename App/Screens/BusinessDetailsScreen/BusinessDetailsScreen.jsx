import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  Linking,
  SafeAreaView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../Utils/Colors';
import Heading from '../../Components/Heading';
import BusinessPhotos from './BusinessPhotos';
import BusinessAboutMe from './BusinessAboutMe';
import BookingModal from './BookingModal';

export default function BusinessDetailsScreen() {
  const param = useRoute().params;
  const [business, setBusiness] = useState(param.business);
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
  }, []);

  const onMessageBtnClick = () => {
    Linking.openURL(
      `mailto:${business?.email}?subject=Regarding Task posted in Homies&body=Hi There,`
    );
  };

  return (
    business && (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <TouchableOpacity
            style={styles.backBtnContainer}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back-outline" size={30} color="white" />
          </TouchableOpacity>
          <Image
            source={{ uri: business?.images[0]?.url }}
            style={{ width: '100%', height: 300 }}
          />
          <View style={styles.infoContainer}>
            <Text style={styles.businessName}>{business?.name}</Text>
            <View style={styles.subContainer}>
              <Text style={styles.contactPerson}>
                {business?.contactPerson}
              </Text>
              <Text style={styles.categoryText}>
                {business?.category?.name}
              </Text>
            </View>
            <Text style={styles.address}>{business?.address}</Text>

            {/* Horizontal Line */}
            <View style={styles.horizontalLine} />

            {/* About Me Section */}
            <BusinessAboutMe business={business} />

            {/* Horizontal Line */}
            <View style={styles.horizontalLine} />

            <BusinessPhotos business={business} />
          </View>
        </ScrollView>

        <View style={styles.bottomButtonsContainer}>
          <TouchableOpacity style={styles.messageBtn} onPress={onMessageBtnClick}>
            <Text style={styles.messageBtnText}>e-mail</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bookingBtn}
            onPress={() => setShowModal(true)}
          >
            <Text style={styles.bookingBtnText}>Confirm</Text>
          </TouchableOpacity>
        </View>

        {/* Booking Modal */}
        <Modal animationType="slide" visible={showModal}>
          <BookingModal
            businessId={business.id}
            hideModal={() => setShowModal(false)}
          />
        </Modal>
      </SafeAreaView>
    )
  );
}

const styles = StyleSheet.create({
  backBtnContainer: {
    position: 'absolute',
    zIndex: 10,
    padding: 20,
  },
  infoContainer: {
    padding: 20,
    display: 'flex',
    gap: 7,
  },
  subContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  businessName: {
    fontFamily: 'outfit-bold',
    fontSize: 25,
  },
  contactPerson: {
    fontFamily: 'outfit-medium',
    color: Colors.PRIMARY,
    fontSize: 20,
  },
  categoryText: {
    color: Colors.PRIMARY,
    backgroundColor: Colors.PRIMARY_LIGHT,
    padding: 5,
    borderRadius: 5,
    fontSize: 14,
  },
  address: {
    fontSize: 17,
    fontFamily: 'outfit',
    color: Colors.GRAY,
  },
  horizontalLine: {
    borderWidth: 0.4,
    borderColor: Colors.GRAY,
    marginTop: 20,
    marginBottom: 20,
  },
  bottomButtonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    margin: 8,
    gap: 8,
    paddingBottom: 16,
  },
  messageBtn: {
    padding: 15,
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: 99,
    flex: 1,
  },
  bookingBtn: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: 99,
    flex: 1,
  },
  messageBtnText: {
    textAlign: 'center',
    fontFamily: 'outfit-medium',
    color: Colors.PRIMARY,
    fontSize: 18,
  },
  bookingBtnText: {
    textAlign: 'center',
    fontFamily: 'outfit-medium',
    color: Colors.WHITE,
    fontSize: 18,
  },
});
