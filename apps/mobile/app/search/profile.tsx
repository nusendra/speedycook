import { YStack, Separator, XStack } from 'tamagui';
import { red1, dark4 } from '../../styles/tamagui';
import RoundedButton from '../../components/RoundedButton';
import { useRouter } from 'expo-router';
import { userSignOut } from '../../apis';

export default function Profile() {
  const router = useRouter();

  const signOut = () => {
    userSignOut();
    router.replace('/auth/login');
  };

  return (
    <>
      <YStack ml={24} mr={24} mb={36}></YStack>
      <YStack f={1} ml={24} mr={24}>
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
    </>
  );
}
