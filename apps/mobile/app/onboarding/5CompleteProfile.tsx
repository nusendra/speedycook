import ResponsiveImage from 'react-native-responsive-image';
import { responsiveFontSize } from '../../styles/ResponsiveFontSize';
import { XStack, YStack, ZStack } from 'tamagui';
import {
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  Text,
  View,
  Button,
  Platform,
} from 'react-native';
import { useState, useCallback } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { red1, dark4, dark } from '../../styles/tamagui';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function CompleteProfile() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
  ]);

  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    if (Platform.OS === 'android') {
      setShow(false);
      // for iOS, add a button that closes the picker
    }
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
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
        <YStack top={134}>
          <YStack>
            <Text style={styles.formText}>Full Name</Text>
            <TextInput
              style={styles.formInput}
              placeholder="Full Name"
              placeholderTextColor={dark4}
            />
          </YStack>
          <YStack mt={24}>
            <Text style={styles.formText}>Phone Number</Text>
            <TextInput
              style={styles.formInput}
              placeholder="+1 000 000 000"
              placeholderTextColor={dark4}
            />
          </YStack>
          <YStack mt={24}>
            <Text style={styles.formText}>Gender</Text>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              autoScroll={true}
              placeholder="Gender"
              dropDownContainerStyle={{
                backgroundColor: dark,
              }}
              style={{
                backgroundColor: 'transparent',
                borderColor: dark,
                borderBottomColor: red1,
                borderBottomWidth: 1.0,
                borderRadius: 0,
              }}
              textStyle={{
                fontFamily: 'UrbanistBold',
                color: 'white',
                fontSize: responsiveFontSize(20),
              }}
              placeholderStyle={{
                fontFamily: 'UrbanistBold',
                color: dark4,
                fontSize: responsiveFontSize(20),
              }}
              ArrowDownIconComponent={({ style }) => (
                <ResponsiveImage
                  source={require('../../assets/arrow-down.png')}
                  initWidth="28"
                  initHeight="28"
                />
              )}
            />
          </YStack>
          <YStack>
            <Button onPress={showDatepicker} title="Show date picker!" />
            <Button onPress={showTimepicker} title="Show time picker!" />
            <Text>selected: {date.toLocaleString()}</Text>
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              display="calendar"
              onChange={onChange}
            />
          </YStack>
        </YStack>
      </ZStack>
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
  formInput: {
    fontFamily: 'UrbanistBold',
    color: 'white',
    fontSize: responsiveFontSize(20),
    marginTop: 16,
    borderBottomWidth: 1.0,
    borderBottomColor: red1,
    paddingBottom: 8,
  },
});
