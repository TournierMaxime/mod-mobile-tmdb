import React from "react"
import tw from "twrnc"
import { Text, View } from "react-native"
import Accordion from "@mod/mobile-common/lib/components/utils/Accordion"
import useResponsive from "@mod/mobile-common/lib/hooks/utils/useResponsive"
import Utils from "@mod/mobile-common/lib/class/Utils"

interface Provider {
  provider_name: string
}

interface ProviderData {
  flatrate?: Provider[]
  buy?: Provider[]
  rent?: Provider[]
}

interface ProvidersProps {
  providers: ProviderData
  languageKey: string
  t: (key: string) => string
  text: string
}

interface Director {
  job: string
  name: string
}

interface DirectorData {
  created_by?: Director[]
}

interface DirectorProps {
  data: DirectorData
}

interface Genre {
  name: string
}

interface GenreData {
  genres?: Genre[]
}

interface GenreProps {
  data: GenreData
}

class Series {
  static status = (data: string, t: (key: string) => string) => {
    if (!data) return null
    const { accordionContent } = useResponsive()

    const statusSerie = () => {
      switch (data) {
        case "Returning Series":
          return (
            <Text style={accordionContent()}>{t("utils.returningSeries")}</Text>
          )
        case "Ended":
          return <Text style={accordionContent()}>{t("utils.ended")}</Text>
      }
    }

    return (
      <Accordion title={t("utils.status")}>
        <View style={tw`flex flex-col`}>
          <View style={tw`flex-col justify-between`}>{statusSerie()}</View>
        </View>
      </Accordion>
    )
  }

  static networks = (data: [], t: (key: string) => string) => {
    if (!data) return null
    const { accordionContent } = useResponsive()

    return (
      <Accordion title={t("utils.diffusers")}>
        {data?.map((item: { name: string }, index: number) => {
          return (
            <View key={index} style={tw`flex-col justify-between`}>
              <Text style={accordionContent()}>{item.name}</Text>
            </View>
          )
        })}
      </Accordion>
    )
  }

  static productionCompanies = (data: [], t: (key: string) => string) => {
    if (!data) return null
    const { accordionContent } = useResponsive()

    return (
      <Accordion title={t("utils.producers")}>
        {data?.map((item: { name: string }, index: number) => {
          return (
            <View key={index} style={tw`flex-col justify-between`}>
              <Text style={accordionContent()}>{item.name}</Text>
            </View>
          )
        })}
      </Accordion>
    )
  }

  static productionCountries = (data: [], t: (key: string) => string) => {
    if (!data) return null
    const { accordionContent } = useResponsive()

    return (
      <Accordion title={t("utils.country")}>
        {data?.map((item: { name: string }, index: number) => {
          return (
            <View key={index} style={tw`flex-col justify-between`}>
              <Text style={accordionContent()}>{item.name}</Text>
            </View>
          )
        })}
      </Accordion>
    )
  }

  static flatrate = ({
    providers: data,
    languageKey,
    t,
    text,
  }: ProvidersProps) => {
    let language = languageKey

    switch (language) {
      case "EN-GB":
        language = "US"
        break
      case "ZH-CN":
        language = "CN"
        break
      case "JA":
        language = "JP"
        break
      case "KO":
        language = "KR"
        break
    }

    if (!data?.flatrate) {
      return null
    }
    const { accordionContent, fontSize } = useResponsive()
    return (
      <View>
        <Text
          style={[
            fontSize(text),
            {
              marginLeft: Utils.moderateScale(8),
            },
          ]}
        >
          {t("utils.flatrate")}
        </Text>
        {data?.flatrate?.map((provider, index) => {
          return (
            <Text style={accordionContent()} key={index}>
              {provider.provider_name}
            </Text>
          )
        })}
      </View>
    )
  }

  static buy = ({ providers: data, languageKey, t, text }: ProvidersProps) => {
    let language = languageKey

    switch (language) {
      case "EN-GB":
        language = "US"
        break
      case "ZH-CN":
        language = "CN"
        break
      case "JA":
        language = "JP"
        break
      case "KO":
        language = "KR"
        break
    }
    if (!data?.buy) {
      return null
    }
    const { accordionContent, fontSize } = useResponsive()
    return (
      <View>
        <Text
          style={[
            fontSize(text),
            {
              marginLeft: Utils.moderateScale(8),
            },
          ]}
        >
          {t("utils.buy")}
        </Text>
        {data?.buy?.map((provider, index) => {
          return (
            <Text style={accordionContent()} key={index}>
              {provider.provider_name}
            </Text>
          )
        })}
      </View>
    )
  }

  static providersByCountry = ({
    providers: data,
    languageKey: lang,
    t,
    text,
  }: ProvidersProps) => {
    switch (lang) {
      case "EN-GB":
        lang = "US"
        break
      case "ZH-CN":
        lang = "CN"
        break
      case "JA":
        lang = "JP"
        break
      case "KO":
        lang = "KR"
        break
    }

    const { fontSize } = useResponsive()

    return (
      <View>
        {data ? (
          <Text
            style={[
              fontSize(text),
              {
                marginBottom: Utils.moderateScale(15),
                marginLeft: Utils.moderateScale(8),
              },
            ]}
          >
            {t("utils.contentPoweredByJustWatch")}
          </Text>
        ) : null}
        {this.flatrate({ providers: data, languageKey: lang, t, text })}
        {this.buy({ providers: data, languageKey: lang, t, text })}
      </View>
    )
  }

  static creators = ({ data }: DirectorProps) => {
    const { mediaTitle } = useResponsive()
    return data?.created_by
      ?.map((credit, index) => {
        if (!credit.name) return null
        return (
          <Text key={index} style={mediaTitle()}>
            {credit.name}
          </Text>
        )
      })
      .slice(0, 1)
  }

  static genres = ({ data }: GenreProps) => {
    const { mediaTitle } = useResponsive()
    return data?.genres
      ?.map((genre, index) => (
        <Text key={index} style={mediaTitle()}>
          {genre.name + " "}
        </Text>
      ))
      .slice(0, 2)
  }

  static plot = (
    data: string,
    t: (key: string) => string,
    borderColor: string,
    text: string,
  ) => {
    if (!data) return null
    const { plotAndBio } = useResponsive()

    return (
      <View style={[tw`${borderColor}`, { borderTopWidth: 2 }]}>
        <Accordion title={t("utils.plot")}>
          <View style={tw`flex flex-col`}>
            <View style={tw`flex-col justify-between`}>
              <Text style={plotAndBio(text)}>{data}</Text>
            </View>
          </View>
        </Accordion>
      </View>
    )
  }
}

export default Series
