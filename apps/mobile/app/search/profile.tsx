import { YStack, Separator, XStack } from 'tamagui';
import { red1, dark4 } from '../../styles/tamagui';
import RoundedButton from '../../components/RoundedButton';
import { useRouter } from 'expo-router';
import { userSignOut } from '../../apis';
import ResponsiveImage from 'react-native-responsive-image';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { getUserStorage } from '../../utils/Storage';
import { getUserDoc } from '../../services/get-user-doc';

export default function Profile() {
  const router = useRouter();
  const [fullName, setFullName] = useState<string>('');
  const [username, setUsername] = useState<string>('');

  const signOut = () => {
    userSignOut();
    router.replace('/auth/login');
  };

  const userData = async () => {
    const userData = await getUserStorage();

    // @ts-ignore
    const doc = await getUserDoc(userData.uid);
    // @ts-ignore
    setFullName(doc.fullName);
    // @ts-ignore
    setUsername(doc.user.username);
  };

  useEffect(() => {
    userData();
  }, []);

  return (
    <>
      <YStack ml={24} mr={24} mb={28} mt={24}>
        <TouchableOpacity
          style={styles.preferenceButton}
          onPress={() => router.push('/search')}
        >
          <XStack jc="center" ai="center">
            <ResponsiveImage
              source={require('../../assets/edit2.png')}
              initWidth="16"
              initHeight="16"
            ></ResponsiveImage>
            <Text style={{ color: red1 }}>Edit Preferences</Text>
          </XStack>
        </TouchableOpacity>
      </YStack>
      <YStack f={1} ml={24} mr={24}>
        <XStack>
          <ResponsiveImage
            source={require('../../assets/avatar3.png')}
            initWidth="72"
            initHeight="72"
          ></ResponsiveImage>
          <YStack>
            <Text style={styles.fullname}>{fullName}</Text>
            <Text style={styles.username}>@{username}</Text>
          </YStack>
        </XStack>
        <YStack f={1} jc="flex-end">
          <RoundedButton
            title="Logout"
            customStyle={{
              backgroundColor: red1,
              marginTop: 10,
              marginBottom: 10,
            }}
            width="100%"
            onPress={signOut}
          />
        </YStack>
      </YStack>
    </>
  );
}

const styles = StyleSheet.create({
  fullname: {
    color: 'white',
    fontFamily: 'UrbanistBold',
    fontSize: 20,
    marginLeft: 20,
    marginTop: 5,
  },
  username: {
    color: 'white',
    fontFamily: 'Urbanist',
    fontSize: 14,
    marginLeft: 20,
    marginTop: 5,
  },
  preferenceButton: {
    borderColor: red1,
    borderWidth: 2,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 100,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
});
