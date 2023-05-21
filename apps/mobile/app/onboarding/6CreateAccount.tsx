import ResponsiveImage from 'react-native-responsive-image';
import { responsiveFontSize } from '../../styles/ResponsiveFontSize';
import { XStack, YStack, ZStack } from 'tamagui';
import { StyleSheet, ScrollView, TextInput, Text } from 'react-native';
import { useState } from 'react';
import { red1, dark4, dark } from '../../styles/tamagui';

export default function CreateAccount() {
  return (
    <>
      <YStack ml={24} mr={24}>
        <Text style={styles.title}>Create an Account 🔐</Text>
        <Text style={styles.subTitle}>
          Enter your username, email & password. If you forget it, then you have
          to do forgot password.
        </Text>
      </YStack>
      <ZStack f={1} mr={24} ml={24} mt={24}>
        <YStack f={1}>
          <YStack>
            <ScrollView>
              <YStack>
                <Text style={styles.formText}>Username</Text>
                <TextInput
                  style={[styles.formInput, styles.formInputContainer]}
                  placeholder="Username"
                  placeholderTextColor={dark4}
                />
              </YStack>
              <YStack mt={24}>
                <Text style={styles.formText}>Email</Text>
                <TextInput
                  style={[styles.formInput, styles.formInputContainer]}
                  placeholder="Email"
                  placeholderTextColor={dark4}
                />
              </YStack>
              <YStack mt={24}>
                <Text style={styles.formText}>Password</Text>
                <XStack>
                  <TextInput
                    style={[styles.formInput, styles.formInputContainer]}
                    placeholder="Password"
                    placeholderTextColor={dark4}
                  />
                  <ResponsiveImage
                    source={require('../../assets/closed-eye.png')}
                    initWidth="23.5"
                    initHeight="19.8"
                    style={{
                      position: 'absolute',
                      alignSelf: 'center',
                      right: 10,
                    }}
                  />
                </XStack>
              </YStack>
              <YStack mt={24}>
                <Text style={styles.formText}>Confirm Password</Text>
                <XStack>
                  <TextInput
                    style={[styles.formInput, styles.formInputContainer]}
                    placeholder="Confirm Password"
                    placeholderTextColor={dark4}
                  />
                  <ResponsiveImage
                    source={require('../../assets/closed-eye.png')}
                    initWidth="23.5"
                    initHeight="19.8"
                    style={{
                      position: 'absolute',
                      alignSelf: 'center',
                      right: 10,
                    }}
                  />
                </XStack>
              </YStack>
            </ScrollView>
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
});
