import { ScrollView } from 'react-native';
import ResponsiveImage from 'react-native-responsive-image';
import { XStack, YStack } from 'tamagui';
import DishCard from '../../components/DishCard';

export default function Result() {
  return (
    <>
      <YStack ml={24} mr={24} ai="center">
        <ResponsiveImage
          source={require('../../assets/recipe-result-header.png')}
          initWidth="379"
          initHeight="118"
          style={{ marginTop: 29 }}
        />
      </YStack>
      <YStack f={1} mt={40}>
        <ScrollView>
          <XStack mt={20} jc="space-between" mr={24} ml={24}>
            <YStack width="48%" height={260}>
              <DishCard
                imageSource={require('../../assets/results/food1.png')}
                title="Vegetable Lettuce Salad with Simpl..."
                avatar={require('../../assets/avatar.png')}
                profileName="Clinton Mcclure"
              />
            </YStack>
            <YStack width="48%" height={260}>
              <DishCard
                imageSource={require('../../assets/results/food2.png')}
                title="Fresh Seasoned Vegetable Salad"
                avatar={require('../../assets/avatar2.png')}
                profileName="Phyllis Godley"
              />
            </YStack>
          </XStack>
          <XStack mt={20} jc="space-between" mr={24} ml={24}>
            <YStack width="48%" height={260}>
              <DishCard
                imageSource={require('../../assets/results/food3.png')}
                title="Vegetable & Fruit Salad with Balsa..."
                avatar={require('../../assets/avatar.png')}
                profileName="Jane Cooper"
              />
            </YStack>
            <YStack width="48%" height={260}>
              <DishCard
                imageSource={require('../../assets/results/food4.png')}
                title="Vegetable and Fruit Green Salad"
                avatar={require('../../assets/avatar2.png')}
                profileName="Willard Purnell"
              />
            </YStack>
          </XStack>
          <XStack mt={20} jc="space-between" mr={24} ml={24}>
            <YStack width="48%" height={260}>
              <DishCard
                imageSource={require('../../assets/results/food5.png')}
                title="Spiced Vegetable Salad"
                avatar={require('../../assets/avatar.png')}
                profileName="Florencio Dorrance"
              />
            </YStack>
            <YStack width="48%" height={260}>
              <DishCard
                imageSource={require('../../assets/results/food6.png')}
                title="Vegetable and Seafood Salad"
                avatar={require('../../assets/avatar2.png')}
                profileName="Jane Cooper"
              />
            </YStack>
          </XStack>
        </ScrollView>
      </YStack>
    </>
  );
}
