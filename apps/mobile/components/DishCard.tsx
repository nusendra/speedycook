import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ResponsiveImage from 'react-native-responsive-image';
import { XStack } from 'tamagui';
import { dark } from '../styles/tamagui/colors';

type Props = {
  imageSource: any;
  title: string;
  avatar: any;
  profileName: string;
};

export default function DishCard({
  imageSource,
  title,
  avatar,
  profileName,
}: Props) {
  return (
    <>
      <ImageBackground
        source={imageSource}
        resizeMode="cover"
        style={{ flex: 1 }}
        imageStyle={{ borderRadius: 20 }}
      >
        <LinearGradient
          colors={['transparent', dark]}
          style={styles.linearGradient}
        />
        <View style={styles.descriptionContainer}>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
          <XStack mt={4} ai="center">
            <ResponsiveImage source={avatar} initWidth="16" initHeight="16" />
            <Text style={styles.profileName}>{profileName}</Text>
          </XStack>
        </View>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  descriptionContainer: {
    bottom: 10,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    flex: 1,
    marginLeft: 12,
    marginRight: 12,
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'UrbanistBold',
    flexWrap: 'wrap',
    lineHeight: 28.8,
  },
  profileName: {
    color: 'white',
    fontSize: 10,
    fontFamily: 'Urbanist',
    marginLeft: 6,
  },
});
