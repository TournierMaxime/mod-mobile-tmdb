import React, { Fragment } from "react"
import { View, Text } from "react-native"
import Utils from "@mod/mobile-common/lib/class/Utils"
import Accordion from "@mod/mobile-common/lib/components/utils/Accordion"
import tw from "twrnc"
import moment from "moment"
import useResponsive from "@mod/mobile-common/lib/hooks/utils/useResponsive"

interface ReleaseDate {
  certification: string
  descriptors: any[]
  iso_639_1: string
  note: string
  release_date: string
  type: number
}

interface CountryRelease {
  iso_3166_1: string
  release_dates: ReleaseDate[]
}

interface ReleaseByCountryProps {
  data: CountryRelease[]
  language: string
  t: (key: string) => string
}

interface Provider {
  provider_name: string
}

interface ProviderData {
  flatrate?: Provider[]
  buy?: Provider[]
  rent?: Provider[]
}

interface ProvidersProps {
  providers: Providers
  languageKey: string
  t: (key: string) => string
  text: string
}

interface Providers {
  [key: string]: ProviderData
}

interface Director {
  job: string
  name: string
}

interface DirectorData {
  crew?: Director[]
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

interface Plot {
  data: string
  t: (key: string) => string
  borderColor: string
  text: string
}

class Movies {
  static productionCompanies = (
    data: Array<{ name: string }>,
    t: (key: string) => string,
  ) => {
    const { accordionContent } = useResponsive()
    if (!data) return null
    return (
      <Accordion title={t("utils.producers")}>
        <View style={tw`flex flex-col`}>
          {data?.map((item, index: number) => {
            return (
              <View key={index} style={tw`flex-col justify-between`}>
                <Text style={accordionContent()}>{item.name}</Text>
              </View>
            )
          })}
        </View>
      </Accordion>
    )
  }

  static productionCountries = (
    data: Array<{ name: string }>,
    t: (key: string) => string,
  ) => {
    const { accordionContent } = useResponsive()
    if (!data) return null
    return (
      <Accordion title={t("utils.country")}>
        <View style={tw`flex flex-col`}>
          {data?.map((item, index) => {
            return (
              <View key={index} style={tw`flex-col justify-between`}>
                <Text style={accordionContent()}>{item.name}</Text>
              </View>
            )
          })}
        </View>
      </Accordion>
    )
  }

  static releaseByCountry = ({ data, language, t }: ReleaseByCountryProps) => {
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
    return (
      <Accordion title={t("utils.release")}>
        <View style={tw`flex flex-col`}>
          {data?.map((releaseDate, index) => {
            const { accordionContent } = useResponsive()
            if (releaseDate.iso_3166_1 !== language) return null
            return (
              <View key={index}>
                {releaseDate.release_dates.map((releaseDate, index) => {
                  return (
                    <View style={tw`flex-col justify-between`} key={index}>
                      <Text style={accordionContent()}>
                        {moment(releaseDate.release_date).format("L")}{" "}
                        {releaseDate.note
                          ? `- ${releaseDate.note}`
                          : `- ${t("utils.nationalRelease")}`}
                      </Text>
                    </View>
                  )
                })}
              </View>
            )
          })}
        </View>
      </Accordion>
    )
  }

  static budget = (data: number, t: (key: string) => string) => {
    const { accordionContent } = useResponsive()
    if (!data) return null
    return (
      <Accordion title={t("utils.budget")}>
        <View style={tw`flex flex-col`}>
          <View style={tw`flex-col justify-between`}>
            <Text style={accordionContent()}>
              {Utils.numberWithCommas(data)}$
            </Text>
          </View>
        </View>
      </Accordion>
    )
  }

  static revenue = (data: number, t: (key: string) => string) => {
    const { accordionContent } = useResponsive()
    if (!data) return null
    return (
      <Accordion title={t("utils.boxOffice")}>
        <View style={tw`flex flex-col`}>
          <View style={tw`flex-col justify-between`}>
            <Text style={accordionContent()}>
              {Utils.numberWithCommas(data)}$
            </Text>
          </View>
        </View>
      </Accordion>
    )
  }

  static flatrate = ({ providers, languageKey, t, text }: ProvidersProps) => {
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

    if (!providers?.[language]?.flatrate) {
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
        {providers?.[language]?.flatrate?.map((provider, index) => {
          return (
            <View key={index} style={tw`flex-col justify-between`}>
              <Text style={accordionContent()}>{provider.provider_name}</Text>
            </View>
          )
        })}
      </View>
    )
  }

  static buy = ({ providers, languageKey, t, text }: ProvidersProps) => {
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
    if (!providers?.[language]?.buy) {
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
        {providers?.[language]?.buy?.map((provider, index) => {
          return (
            <View key={index} style={tw`flex-col justify-between`}>
              <Text style={accordionContent()}>{provider.provider_name}</Text>
            </View>
          )
        })}
      </View>
    )
  }

  static rent = ({ providers, languageKey, t, text }: ProvidersProps) => {
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
    if (!providers?.[language]?.rent) {
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
          {t("utils.rent")}
        </Text>
        {providers?.[language]?.rent?.map(
          (provider: { provider_name: string }, index: number) => {
            return (
              <View key={index} style={tw`flex-col justify-between`}>
                <Text style={accordionContent()}>{provider.provider_name}</Text>
              </View>
            )
          },
        )}
      </View>
    )
  }

  static providersByCountry = ({
    providers,
    languageKey,
    t,
    text,
  }: ProvidersProps) => {
    if (!providers) {
      return null
    }

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

    const { fontSize } = useResponsive()

    return Object.keys(providers).length === 0 ? null : (
      <Accordion title={t("utils.available")}>
        <View style={tw`flex flex-col`}>
          <Text
            style={[
              fontSize(text),
              {
                marginLeft: Utils.moderateScale(15),
                marginBottom: Utils.moderateScale(15),
              },
            ]}
          >
            {t("utils.contentPoweredByJustWatch")}
          </Text>
          {this.flatrate({ providers, languageKey: language, t, text })}
          {this.buy({ providers, languageKey: language, t, text })}
          {this.rent({ providers, languageKey: language, t, text })}
        </View>
      </Accordion>
    )
  }

  static directors = ({ data }: DirectorProps) => {
    const { mediaTitle } = useResponsive()
    return (
      <Fragment>
        {" • "}
        {data?.crew?.map((credit: Director, index: number) => {
          if (credit.job === "Director") {
            return (
              <Text key={index} style={mediaTitle()}>
                {credit.name}
              </Text>
            )
          } else {
            return null
          }
        })}
      </Fragment>
    )
  }

  static genres = ({ data }: GenreProps) => {
    const { mediaTitle } = useResponsive()
    return (
      <Fragment>
        {" • "}
        {data?.genres?.map((genre, index, array) => (
          <Text key={index} style={mediaTitle()}>
            {genre.name + (index < array.length - 1 ? ", " : "")}
          </Text>
        ))}
      </Fragment>
    )
  }

  static plot = ({ data, t, borderColor, text }: Plot) => {
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

export default Movies
