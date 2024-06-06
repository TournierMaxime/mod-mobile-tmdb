import React, { memo } from "react"
import { View, Text, Linking, TouchableOpacity } from "react-native"
import Accordion from "@mod/mobile-common/lib/components/utils/Accordion"
import { AntDesign, FontAwesome5 } from "@expo/vector-icons"
import Utils from "@mod/mobile-common/lib/class/Utils"
import tw from "twrnc"
import { useDynamicThemeStyles } from "@mod/mobile-common/styles/theme"
import { useSelector } from "react-redux"
import useResponsive from "@mod/mobile-common/lib/hooks/utils/useResponsive"

const Informations = ({ externalIds, t, people }) => {
  const darkMode = useSelector((state) => state.theme.darkMode)
  const { background, text, borderColor } = useDynamicThemeStyles(darkMode)

  const { accordionContent, plotAndBio } = useResponsive()

  const socialMedia = (data) => {
    const openLink = (url) => {
      Linking.openURL(url)
    }

    return (
      <Accordion title={t("utils.socialMedias")}>
        {data?.twitter_id && (
          <TouchableOpacity
            onPress={() => openLink(`https://twitter.com/${data.twitter_id}`)}
          >
            <View style={tw`flex-col justify-between`}>
              <Text style={accordionContent()}>
                <AntDesign
                  name="twitter"
                  size={Utils.moderateScale(24)}
                  color="#00acee"
                />
                &nbsp;
                {data.twitter_id}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        {data?.facebook_id && (
          <TouchableOpacity
            onPress={() =>
              openLink(`https://www.facebook.com/${data.facebook_id}`)
            }
          >
            <View style={tw`flex-col justify-between`}>
              <Text style={accordionContent()}>
                <AntDesign
                  name="facebook-square"
                  size={Utils.moderateScale(24)}
                  color="#3b5998"
                />
                &nbsp;
                {data.facebook_id}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        {data?.instagram_id && (
          <TouchableOpacity
            onPress={() =>
              openLink(`https://www.instagram.com/${data.instagram_id}`)
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
                {data.instagram_id}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        {data?.tiktok_id && (
          <TouchableOpacity
            onPress={() =>
              openLink(`https://www.tiktok.com/@${data.tiktok_id}`)
            }
          >
            <View style={tw`flex-col justify-between`}>
              <Text style={accordionContent()}>
                <FontAwesome5
                  name="tiktok"
                  size={Utils.moderateScale(24)}
                  color="#ff0050"
                />
                &nbsp;
                {data.tiktok_id}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        {data?.youtube_id && (
          <TouchableOpacity
            onPress={() =>
              openLink(`https://www.youtube.com/@${data.youtube_id}`)
            }
          >
            <View style={tw`flex-col justify-between`}>
              <Text style={accordionContent()}>
                <AntDesign
                  name="youtube"
                  size={Utils.moderateScale(24)}
                  color="#c4302b"
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

  const plot = (data) => {
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
