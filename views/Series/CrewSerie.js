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

const CrewSerie = ({ route }) => {
  const { title } = route.params
  const navigation = useNavigation()
  const credits = useSelector((state) => state.serieCrew.data)

  const { t } = useTranslation()

  const renderItem = (item, index) => {
    return (
      <TouchableOpacity
        key={index}
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
            <Text style={styles.renderItemTitle}>
              {item.name} | {item.job}
            </Text>
            <Text style={styles.renderItemOverview}>
              {item.department}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.seasonTitle}>{t('crewOf')} {title}</Text>
      <FlatList
        data={credits?.crew}
        keyExtractor={(item) => item.credit_id.toString()}
        renderItem={({ item, index }) => renderItem(item, index)}
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

export default CrewSerie
