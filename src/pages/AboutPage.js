import React from 'react'
import styled from 'styled-components/macro'

export default function AboutPage() {
  const aboutText =
    'Wir veranstalten etwa alle zwei Wochen einen Filmabend in der Mokrystr. 1. \n In unseren Filmreihen widmen wir uns über je zwei Monate einem Thema oder einer Person. \n Nach den Filmen diskutieren wir häufig noch ein Weilchen über die Eindrücke und manchmal gibt es ein kurzes filmhistorisches Referat. \n Der Eintritt ist frei. Kühle Getränke gibt es an der Bar. Für beides nehmen wir gerne Spenden entgegen.'

  const aboutQuotes =
    'Den Anspruch an unsere Filmauswahl formulieren wir in drei Zitaten: \n "Ein guter Film hat kein Genre, genausowenig wie das echte Leben. In einem Moment ist es eine Komödie, im nächsten eine Tragödie." - Paul Verhoeven \n "Was mich an Filmen oder an jeder Form von Kunst berührt, ist dieser unauslöschliche Rest von Geheimnis und von Dingen, die sich unserer Wahrnehmung entziehen." - Mia Hansen-Løve \n "Ich habe noch nie einen explodierenden Hubschrauber gesehen. Ich habe noch nie jemanden gesehen, der jemand anderem eine Kugel in den Kopf jagt. Warum sollte ich also Filme darüber machen? Aber ich habe Leute gesehen, die sich selbst zerstört haben, ich habe Leute aufgeben sehen, ich habe Leute gesehen, die sich hinter politischen Ideen, hinter Drogen, hinter der sexuellen Revolution, hinter Faschismus, hinter Heuchelei versteckt haben, und ich habe alle diese Dinge selber gemacht. Darum kann ich sie verstehen. Was wir sagen, ist behutsam gemeint. Es ist Behutsamkeit. Wir haben Probleme, schlimme Probleme, aber unsere Probleme sind menschliche Probleme." - John Cassavetes'

  return (
    <AboutPageStyled>
      <SubHeadlineStyled>Über uns</SubHeadlineStyled>
      <AboutTextStyled>
        {aboutText.split('\n').map((part, index) => (
          <span key={index}>
            {part}
            <br />
            <br />
          </span>
        ))}
      </AboutTextStyled>
      <AboutQuotesStyled>
        {aboutQuotes.split('\n').map((part, index) => (
          <span key={index}>
            {part}
            <br />
            <br />
          </span>
        ))}
      </AboutQuotesStyled>
    </AboutPageStyled>
  )
}

const AboutPageStyled = styled.main`
  padding: 10px;
`

const SubHeadlineStyled = styled.h2`
  margin: 10px 0;
  color: white;
`

const AboutTextStyled = styled.p`
  margin: 0;
  padding: 10px;
  background-color: white;
`

const AboutQuotesStyled = styled.p`
  margin: 0;
  padding: 10px;
  background-color: black;
  color: white;
`
