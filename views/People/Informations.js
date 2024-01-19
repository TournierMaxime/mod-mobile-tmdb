import React from 'react'
import { View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native'
import details from '../../../styles/pages/details'
import Accordion from '../../../components/Accordion'
import { AntDesign, FontAwesome5 } from '@expo/vector-icons'
import { moderateScale } from '../../../utils/Responsive'

const Informations = ({ externalIds, t }) => {
  const socialMedia = (data) => {
    const openLink = (url) => {
      Linking.openURL(url)
    }

    return (
      <Accordion title={t('socialMedias')}>
        {data.twitter_id && (
          <TouchableOpacity
            onPress={() => openLink(`https://twitter.com/${data.twitter_id}`)}
          >
            <View style={styles.flatListViewContainer}>
              <Text style={styles.tags}>
                <AntDesign
                  name='twitter'
                  size={moderateScale(24)}
                  color='#00acee'
                />
                &nbsp;
                {data.twitter_id}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        {data.facebook_id && (
          <TouchableOpacity
            onPress={() =>
              openLink(`https://www.facebook.com/${data.facebook_id}`)
            }
          >
            <View style={styles.flatListViewContainer}>
              <Text style={styles.tags}>
                <AntDesign
                  name='facebook-square'
                  size={moderateScale(24)}
                  color='#3b5998'
                />
                &nbsp;
                {data.facebook_id}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        {data.instagram_id && (
          <TouchableOpacity
            onPress={() =>
              openLink(`https://www.instagram.com/${data.instagram_id}`)
            }
          >
            <View style={styles.flatListViewContainer}>
              <Text style={styles.tags}>
                <AntDesign
                  name='instagram'
                  size={moderateScale(24)}
                  color='#3f729b'
                />
                &nbsp;
                {data.instagram_id}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        {data.tiktok_id && (
          <TouchableOpacity
            onPress={() => openLink(`https://www.tiktok.com/@${data.tiktok_id}`)}
          >
            <View style={styles.flatListViewContainer}>
              <Text style={styles.tags}>
                <FontAwesome5
                  name='tiktok'
                  size={moderateScale(24)}
                  color='#ff0050'
                />
                &nbsp;
                {data.tiktok_id}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        {data.youtube_id && (
          <TouchableOpacity
            onPress={() =>
              openLink(`https://www.youtube.com/@${data.youtube_id}`)
            }
          >
            <View style={styles.flatListViewContainer}>
              <Text style={styles.tags}>
                <AntDesign
                  name='youtube'
                  size={moderateScale(24)}
                  color='#c4302b'
                />
                &nbsp;
                {data.youtube_id}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </Accordion>
    )
  }

  return (
    <View style={styles.productionViewContainer}>
      <View style={styles.technicalSheetViewContainer}>
        <Text style={styles.title}>{t('informations')}</Text>
      </View>
      {socialMedia(externalIds)}
    </View>
  )
}

const styles = StyleSheet.create({
  image: details.image,
  title: details.title,
  subTitle: details.subTitle,
  flatListViewContainer: details.flatListViewContainer,
  tags: details.tags,
  technicalSheetViewContainer: details.technicalSheetViewContainer,
  mainContainer: details.mainContainer,
  productionViewContainer: details.productionViewContainer,
})

export default Informations
