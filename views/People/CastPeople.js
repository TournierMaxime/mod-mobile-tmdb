import React, { useEffect } from 'react'
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native'
import dot from '../../../styles/pages/dot'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { useTranslation } from 'react-i18next'
import { peopleCareer, resetPeopleCareer } from '../../../redux/actions/tmdb/people'

const CastPeople = ({ route }) => {
  const { id, name } = route.params
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const career = useSelector((state) => state.peopleCareer.data)

  const { i18n, t } = useTranslation()
  const language = i18n.language
  moment.locale(language)

  const sortedCareer = career?.cast?.sort((a, b) => {
    const dateA = moment(a.release_date || a.first_air_date)
    const dateB = moment(b.release_date || b.first_air_date)
    return dateB.diff(dateA)
  })

  const renderItem = (item) => {
    return item.original_title ? (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('DetailsMovie', {
            id: item.id,
            title: item.title,
          })
        }
      >
        <View style={styles.renderItemContainer}>
          {item.poster_path ? (
            <Image
              style={styles.image}
              source={{
                uri: `https://image.tmdb.org/t/p/original/${item.poster_path}`,
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
              {item.title} | {moment(item.release_date).format('YYYY')}{' '}
            </Text>
            <Text style={styles.renderItemOverview}>{item.character}</Text>
          </View>
        </View>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('DetailsSerie', {
            id: item.id,
            title: item.name,
          })
        }
      >
        <View style={styles.renderItemContainer}>
          {item.poster_path ? (
            <Image
              style={styles.image}
              source={{
                uri: `https://image.tmdb.org/t/p/original/${item.poster_path}`,
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

  useEffect(() => {
    dispatch(peopleCareer(id, language))
  }, [id])

    useEffect(() => {
    return () => {
      dispatch(resetPeopleCareer())
    }
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.seasonTitle}>{t('filmographyOf')} {name}</Text>
      <FlatList
        data={sortedCareer}
        keyExtractor={(item) => item.credit_id.toString()}
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

export default CastPeople
