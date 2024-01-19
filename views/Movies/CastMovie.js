import React from 'react'
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native'
import { useSelector } from 'react-redux'
import dot from '../../../styles/pages/dot'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

const CastMovie = ({ route }) => {
  const { title } = route.params
  const navigation = useNavigation()
  const credits = useSelector((state) => state.movieCrew.data)

  const { t } = useTranslation()

  const renderItem = (item) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('DetailsPeople', {
            id: item.id,
            name: item.name,
          })
        }
      >
        <View style={styles.renderItemContainer}>
          {item.profile_path ? (
            <Image
              style={styles.image}
              source={{
                uri: `https://image.tmdb.org/t/p/original/${item.profile_path}`,
              }}
            />
          ) : (
            <Image
              style={styles.image}
              source={require('../../../assets/image/No_Image_Available.jpg')}
            />
          )}
          <View style={styles.renderItemDetails}>
            <Text style={styles.renderItemTitle}>{item.name}</Text>
            <Text style={styles.renderItemOverview}>{item.character}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.seasonTitle}>{t('castOf')} {title}</Text>
      <FlatList
        data={credits?.cast}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => renderItem(item)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: dot.container,
  image: dot.image,
  renderItemContainer: dot.renderItemContainer,
  renderItemTitle: dot.renderItemTitle,
  renderItemOverview: dot.renderItemOverview,
  renderItemDetails: dot.renderItemDetails,
  seasonTitle: dot.seasonTitle,
})

export default CastMovie
