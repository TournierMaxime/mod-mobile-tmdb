import React, { memo } from "react"
import { View, Text, Linking, TouchableOpacity } from "react-native"
import Accordion from "@mod/mobile-common/lib/components/utils/Accordion"
import { AntDesign, FontAwesome5 } from "@expo/vector-icons"
import Utils from "@mod/mobile-common/lib/class/Utils"
import tw from "twrnc"
import { useDynamicThemeStyles } from "@mod/mobile-common/styles/theme"
import { useSelector } from "react-redux"
import useResponsive from "@mod/mobile-common/lib/hooks/utils/useResponsive"
import { RootState } from "store"

interface ExternalIds {
  twitter_id: string
  facebook_id: string
  instagram_id: string
  tiktok_id: string
  youtube_id: string
}

interface Props {
  externalIds?: ExternalIds
  t: (key: string) => string
  people: {
    biography: string
  }
}

const Informations = ({ externalIds, t, people }: Props) => {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode)
  const { background, text, borderColor } = useDynamicThemeStyles(darkMode)

  if (!externalIds) return null

  const { accordionContent, plotAndBio } = useResponsive()

  const socialMedia = (data: ExternalIds) => {
    if (!data) return null

    const { twitter_id, facebook_id, instagram_id, tiktok_id, youtube_id } =
      data

    let socialMedia = {
      twitter_id,
      facebook_id,
      instagram_id,
      tiktok_id,
      youtube_id,
    }

    const openLink = (url: string) => {
      Linking.openURL(url)
    }

    return Object.values(socialMedia).every(
      (value) => value === null,
    ) ? null : (
      <Accordion title={t("utils.socialMedias")}>
        {twitter_id && (
          <TouchableOpacity
            onPress={() => openLink(`https://twitter.com/${twitter_id}`)}
          >
            <View style={tw`flex-col justify-between`}>
              <Text style={accordionContent()}>
                <AntDesign
                  name="twitter"
                  size={Utils.moderateScale(24)}
                  color="#00acee"
                />
                &nbsp;
                {twitter_id}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        {facebook_id && (
          <TouchableOpacity
            onPress={() => openLink(`https://www.facebook.com/${facebook_id}`)}
          >
            <View style={tw`flex-col justify-between`}>
              <Text style={accordionContent()}>
                <AntDesign
                  name="facebook-square"
                  size={Utils.moderateScale(24)}
                  color="#3b5998"
                />
                &nbsp;
                {facebook_id}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        {instagram_id && (
          <TouchableOpacity
            onPress={() =>
              openLink(`https://www.instagram.com/${instagram_id}`)
            }
          >
            <View style={tw`flex-col justify-between`}>
              <Text style={accordionContent()}>
                <AntDesign
                  name="instagram"
                  size={Utils.moderateScale(24)}
                  color="#3f729b"
                />
                &nbsp;
                {instagram_id}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        {tiktok_id && (
          <TouchableOpacity
            onPress={() => openLink(`https://www.tiktok.com/@${tiktok_id}`)}
          >
            <View style={tw`flex-col justify-between`}>
              <Text style={accordionContent()}>
                <FontAwesome5
                  name="tiktok"
                  size={Utils.moderateScale(24)}
                  color="#ff0050"
                />
                &nbsp;
                {tiktok_id}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        {youtube_id && (
          <TouchableOpacity
            onPress={() => openLink(`https://www.youtube.com/@${youtube_id}`)}
          >
            <View style={tw`flex-col justify-between`}>
              <Text style={accordionContent()}>
                <AntDesign
                  name="youtube"
                  size={Utils.moderateScale(24)}
                  color="#c4302b"
                />
                &nbsp;
                {youtube_id}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </Accordion>
    )
  }

  const plot = (data: string) => {
    if (!data) return null
    return (
      <View style={[tw`${borderColor}`, { borderTopWidth: 2 }]}>
        <Accordion title={t("utils.biography")}>
          <View style={tw`flex flex-col`}>
            <View style={tw`flex-col justify-between`}>
              <Text style={plotAndBio(text)}>{data}</Text>
            </View>
          </View>
        </Accordion>
      </View>
    )
  }

  return (
    <View style={tw`pb-4 h-full ${background}`}>
      {plot(people?.biography)}
      {socialMedia(externalIds)}
    </View>
  )
}

export default memo(Informations)
