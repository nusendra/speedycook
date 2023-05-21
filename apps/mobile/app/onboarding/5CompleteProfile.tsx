import ResponsiveImage from 'react-native-responsive-image';
import { responsiveFontSize } from '../../styles/ResponsiveFontSize';
import { XStack, YStack, ZStack, RadioGroup, Label } from 'tamagui';
import {
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import { useState } from 'react';
import { red1, dark4, dark } from '../../styles/tamagui';
import DateTimePicker from '@react-native-community/datetimepicker';
import Modal from 'react-native-modal';

type Gender = 'Male' | 'Female' | '';

export default function CompleteProfile() {
  const [genderModalOpen, setGenderModalOpen] = useState(false);
  const [gender, setGender] = useState<Gender>('');

  const [date, setDate] = useState(new Date());
  const [showDatepicker, setShowDatepicker] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowDatepicker(false);
    setDate(currentDate);
  };

  const changeGender = (gender: Gender) => {
    setGender(gender);
    setGenderModalOpen(false);
  };

  return (
    <>
      <YStack ml={24} mr={24}>
        <Text style={styles.title}>Complete Your Profile 📋</Text>
        <Text style={styles.subTitle}>
          Don't worry, only you can see your personal data. No one else will be
          able to see it.
        </Text>
      </YStack>
      <ZStack f={1} mr={24} ml={24} mt={24}>
        <YStack f={1} ai="center">
          <ResponsiveImage
            source={require('../../assets/profile-placeholder.png')}
            initWidth="120"
            initHeight="120"
          />
        </YStack>
        <YStack f={1} ai="center" top={90} left={45}>
          <ResponsiveImage
            source={require('../../assets/edit.png')}
            initWidth="30"
            initHeight="30"
          />
        </YStack>
        <YStack f={1} mt={140}>
          <YStack>
            <ScrollView>
              <YStack>
                <Text style={styles.formText}>Full Name</Text>
                <TextInput
                  style={[styles.formInput, styles.formInputContainer]}
                  placeholder="Full Name"
                  placeholderTextColor={dark4}
                />
              </YStack>
              <YStack mt={24}>
                <Text style={styles.formText}>Phone Number</Text>
                <TextInput
                  style={[styles.formInput, styles.formInputContainer]}
                  placeholder="+1 000 000 000"
                  placeholderTextColor={dark4}
                />
              </YStack>
              <YStack mt={24}>
                <Text style={styles.formText}>Gender</Text>
                <XStack>
                  <TouchableOpacity
                    style={styles.formInputContainer}
                    onPress={() => setGenderModalOpen(true)}
                  >
                    <TextInput
                      style={styles.formInput}
                      placeholder="Gender"
                      placeholderTextColor={dark4}
                      editable={false}
                      value={gender}
                    />
                  </TouchableOpacity>
                  <ResponsiveImage
                    source={require('../../assets/arrow-down.png')}
                    initWidth="28"
                    initHeight="28"
                    style={{
                      position: 'absolute',
                      alignSelf: 'center',
                      right: 10,
                    }}
                  />
                </XStack>
              </YStack>
              <YStack mt={24}>
                <Text style={styles.formText}>Date of Birth</Text>
                <XStack>
                  <TouchableOpacity
                    style={styles.formInputContainer}
                    onPress={() => setShowDatepicker(true)}
                  >
                    <TextInput
                      style={styles.formInput}
                      placeholder="MM/DD/YYYY"
                      placeholderTextColor={dark4}
                      editable={false}
                      value={date.toLocaleDateString()}
                    />
                    <ResponsiveImage
                      source={require('../../assets/Calendar.png')}
                      initWidth="28"
                      initHeight="28"
                      style={{
                        position: 'absolute',
                        alignSelf: 'center',
                        right: 10,
                      }}
                    />
                  </TouchableOpacity>
                </XStack>
              </YStack>
            </ScrollView>
          </YStack>
        </YStack>
      </ZStack>
      <Modal isVisible={genderModalOpen}>
        <View style={styles.selectContainer}>
          <XStack flex={1} flexDirection="row" justifyContent="space-between">
            <TouchableOpacity
              style={styles.selectItem}
              onPress={() => changeGender('Male')}
            >
              <Text style={styles.selectText}>MALE</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.selectItem}
              onPress={() => changeGender('Female')}
            >
              <Text style={styles.selectText}>FEMALE</Text>
            </TouchableOpacity>
          </XStack>
        </View>
      </Modal>
      {showDatepicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          display="calendar"
          onChange={onChange}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'UrbanistBold',
    color: 'white',
    fontSize: responsiveFontSize(32),
    marginTop: 42,
  },
  subTitle: {
    fontFamily: 'Urbanist',
    color: 'white',
    fontSize: responsiveFontSize(18),
    marginTop: 12,
  },
  formText: {
    fontFamily: 'UrbanistBold',
    color: 'white',
    fontSize: responsiveFontSize(16),
  },
  formInputContainer: {
    marginTop: 16,
    borderBottomWidth: 1.0,
    borderBottomColor: red1,
    paddingBottom: 8,
    width: '100%',
  },
  formInput: {
    fontFamily: 'UrbanistBold',
    color: 'white',
    fontSize: responsiveFontSize(20),
  },
  dropDown: {
    backgroundColor: 'transparent',
    borderColor: dark,
    borderBottomColor: red1,
    borderBottomWidth: 1.0,
    borderRadius: 0,
  },
  dropDownText: {
    fontFamily: 'UrbanistBold',
    color: 'white',
    fontSize: responsiveFontSize(20),
  },
  dropDownPlaceholder: {
    fontFamily: 'UrbanistBold',
    color: dark4,
    fontSize: responsiveFontSize(20),
  },
  selectContainer: {
    backgroundColor: dark,
    height: 130,
    borderRadius: 10,
    padding: 20,
    justifyContent: 'center',
  },
  selectItem: {
    backgroundColor: dark4,
    height: '100%',
    width: '45%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'UrbanistBold',
  },
});
