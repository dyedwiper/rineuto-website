import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import mapImage from '../assets/karte.png';
import lightGreyPerlImage from '../assets/perls/lightGreyPerl.png';

export default function ContactPage() {
  useEffect(() => {
    document.title = 'Kontakt | Rineuto Lichtspiele';
  }, []);

  return (
    <ContactPageStyled>
      <div>Mokryhütten e.V.</div>
      <div>Mokrystraße 1</div>
      <div>(neben den alten Rialto Lichtspielen)</div>
      <div>21107 Hamburg</div>
      <LinkStyled href="mailto:rineuto@posteo.de">rineuto(ät)posteo.de</LinkStyled>
      <br />
      <br />
      <LinkStyled href="https://www.facebook.com/rineuto" target="_blank" rel="noopener noreferrer">
        Rineuto on facebook
      </LinkStyled>
      <br />
      <br />
      <br />
      <a
        href="https://www.openstreetmap.de/karte.html?zoom=19&lat=53.51843&lon=9.98398&layers=B000TT"
        target="_blank"
        rel="noopener noreferrer"
      >
        <MapImageStyled src={mapImage} alt="Karte von Hamburg-Wilhelmsburg" />
      </a>
      <br />
      <br />
      <div>Jugendschutzbeauftragter: Fabian Schauren </div>
      <div>(jugendschutz(ät)kommunale-kinos.de)</div>
      <br />
      <br />
      <DSEStyled>
        <h3>Datenschutzerklärung</h3>
        <h4 id="m14">Einleitung</h4>
        <p>
          Mit der folgenden Datenschutzerklärung möchten wir Sie darüber aufklären, welche Arten Ihrer personenbezogenen
          Daten (nachfolgend auch kurz als "Daten“ bezeichnet) wir zu welchen Zwecken und in welchem Umfang verarbeiten.
          Die Datenschutzerklärung gilt für alle von uns durchgeführten Verarbeitungen personenbezogener Daten, sowohl
          im Rahmen der Erbringung unserer Leistungen als auch insbesondere auf unseren Webseiten, in mobilen
          Applikationen sowie innerhalb externer Onlinepräsenzen, wie z.B. unserer Social-Media-Profile (nachfolgend
          zusammenfassend bezeichnet als "Onlineangebot“).
        </p>
        <p>Die verwendeten Begriffe sind nicht geschlechtsspezifisch.</p>
        <p>Stand: 25. Juli 2020</p>
        <h4>Inhaltsübersicht</h4>
        <ul>
          <li>
            <LinkStyled href="#m14">Einleitung</LinkStyled>
          </li>
          <li>
            <LinkStyled href="#m3">Verantwortlicher</LinkStyled>
          </li>
          <li>
            <LinkStyled href="#mOverview">Übersicht der Verarbeitungen</LinkStyled>
          </li>
          <li>
            <LinkStyled href="#m13">Maßgebliche Rechtsgrundlagen</LinkStyled>
          </li>
          <li>
            <LinkStyled href="#m27">Sicherheitsmaßnahmen</LinkStyled>
          </li>
          <li>
            <LinkStyled href="#m225">Bereitstellung des Onlineangebotes und Webhosting</LinkStyled>
          </li>
          <li>
            <LinkStyled href="#m136">Präsenzen in sozialen Netzwerken (Social Media)</LinkStyled>
          </li>
          <li>
            <LinkStyled href="#m12">Löschung von Daten</LinkStyled>
          </li>
          <li>
            <LinkStyled href="#m15">Änderung und Aktualisierung der Datenschutzerklärung</LinkStyled>
          </li>
          <li>
            <LinkStyled href="#m10">Rechte der betroffenen Personen</LinkStyled>
          </li>
          <li>
            <LinkStyled href="#m42">Begriffsdefinitionen</LinkStyled>
          </li>
        </ul>
        <h4 id="m3">Verantwortlicher</h4>
        <p>
          Mokryhütten e.V.
          <br />
          Mokrystraße 1<br />
          21107 Hamburg
        </p>
        <p>
          <strong>E-Mail-Adresse: </strong>
          <LinkStyled href="mailto:kontakt.mokryhuetten@posteo.de">kontakt.mokryhuetten(ät)posteo.de</LinkStyled>
        </p>
        <h4 id="mOverview">Übersicht der Verarbeitungen</h4>
        <p>
          Die nachfolgende Übersicht fasst die Arten der verarbeiteten Daten und die Zwecke ihrer Verarbeitung zusammen
          und verweist auf die betroffenen Personen.
        </p>
        <h5>Arten der verarbeiteten Daten</h5>
        <ul>
          <li>Bestandsdaten (z.B. Namen, Adressen).</li>
          <li>Inhaltsdaten (z.B. Texteingaben, Fotografien, Videos).</li>
          <li>Kontaktdaten (z.B. E-Mail, Telefonnummern).</li>
          <li>Meta-/Kommunikationsdaten (z.B. Geräte-Informationen, IP-Adressen).</li>
          <li>Nutzungsdaten (z.B. besuchte Webseiten, Interesse an Inhalten, Zugriffszeiten).</li>
        </ul>
        <h5>Kategorien betroffener Personen</h5>
        <ul>
          <li>Nutzer (z.B. Webseitenbesucher, Nutzer von Onlinediensten).</li>
        </ul>
        <h5>Zwecke der Verarbeitung</h5>
        <ul>
          <li>Kontaktanfragen und Kommunikation.</li>
          <li>Remarketing.</li>
          <li>Reichweitenmessung (z.B. Zugriffsstatistiken, Erkennung wiederkehrender Besucher).</li>
          <li>Tracking (z.B. interessens-/verhaltensbezogenes Profiling, Nutzung von Cookies).</li>
        </ul>
        <h5 id="m13">Maßgebliche Rechtsgrundlagen</h5>
        <p>
          Im Folgenden teilen wir die Rechtsgrundlagen der Datenschutzgrundverordnung (DSGVO), auf deren Basis wir die
          personenbezogenen Daten verarbeiten, mit. Bitte beachten Sie, dass zusätzlich zu den Regelungen der DSGVO die
          nationalen Datenschutzvorgaben in Ihrem bzw. unserem Wohn- und Sitzland gelten können. Sollten ferner im
          Einzelfall speziellere Rechtsgrundlagen maßgeblich sein, teilen wir Ihnen diese in der Datenschutzerklärung
          mit.
        </p>
        <ul>
          <li>
            <strong>Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f. DSGVO)</strong> - Die Verarbeitung ist zur
            Wahrung der berechtigten Interessen des Verantwortlichen oder eines Dritten erforderlich, sofern nicht die
            Interessen oder Grundrechte und Grundfreiheiten der betroffenen Person, die den Schutz personenbezogener
            Daten erfordern, überwiegen.
          </li>
        </ul>
        <p>
          <strong>Nationale Datenschutzregelungen in Deutschland</strong>: Zusätzlich zu den Datenschutzregelungen der
          Datenschutz-Grundverordnung gelten nationale Regelungen zum Datenschutz in Deutschland. Hierzu gehört
          insbesondere das Gesetz zum Schutz vor Missbrauch personenbezogener Daten bei der Datenverarbeitung
          (Bundesdatenschutzgesetz – BDSG). Das BDSG enthält insbesondere Spezialregelungen zum Recht auf Auskunft, zum
          Recht auf Löschung, zum Widerspruchsrecht, zur Verarbeitung besonderer Kategorien personenbezogener Daten, zur
          Verarbeitung für andere Zwecke und zur Übermittlung sowie automatisierten Entscheidungsfindung im Einzelfall
          einschließlich Profiling. Des Weiteren regelt es die Datenverarbeitung für Zwecke des
          Beschäftigungsverhältnisses (§ 26 BDSG), insbesondere im Hinblick auf die Begründung, Durchführung oder
          Beendigung von Beschäftigungsverhältnissen sowie die Einwilligung von Beschäftigten. Ferner können
          Landesdatenschutzgesetze der einzelnen Bundesländer zur Anwendung gelangen.
        </p>
        <h4 id="m27">Sicherheitsmaßnahmen</h4>
        <p>
          Wir treffen nach Maßgabe der gesetzlichen Vorgaben unter Berücksichtigung des Stands der Technik, der
          Implementierungskosten und der Art, des Umfangs, der Umstände und der Zwecke der Verarbeitung sowie der
          unterschiedlichen Eintrittswahrscheinlichkeiten und des Ausmaßes der Bedrohung der Rechte und Freiheiten
          natürlicher Personen geeignete technische und organisatorische Maßnahmen, um ein dem Risiko angemessenes
          Schutzniveau zu gewährleisten.
        </p>
        <p>
          Zu den Maßnahmen gehören insbesondere die Sicherung der Vertraulichkeit, Integrität und Verfügbarkeit von
          Daten durch Kontrolle des physischen und elektronischen Zugangs zu den Daten als auch des sie betreffenden
          Zugriffs, der Eingabe, der Weitergabe, der Sicherung der Verfügbarkeit und ihrer Trennung. Des Weiteren haben
          wir Verfahren eingerichtet, die eine Wahrnehmung von Betroffenenrechten, die Löschung von Daten und Reaktionen
          auf die Gefährdung der Daten gewährleisten. Ferner berücksichtigen wir den Schutz personenbezogener Daten
          bereits bei der Entwicklung bzw. Auswahl von Hardware, Software sowie Verfahren entsprechend dem Prinzip des
          Datenschutzes, durch Technikgestaltung und durch datenschutzfreundliche Voreinstellungen.
        </p>
        <h4 id="m225">Bereitstellung des Onlineangebotes und Webhosting</h4>
        <p>
          Um unser Onlineangebot sicher und effizient bereitstellen zu können, nehmen wir die Leistungen von einem oder
          mehreren Webhosting-Anbietern in Anspruch, von deren Servern (bzw. von ihnen verwalteten Servern) das
          Onlineangebot abgerufen werden kann. Zu diesen Zwecken können wir Infrastruktur- und
          Plattformdienstleistungen, Rechenkapazität, Speicherplatz und Datenbankdienste sowie Sicherheitsleistungen und
          technische Wartungsleistungen in Anspruch nehmen.
        </p>
        <p>
          Zu den im Rahmen der Bereitstellung des Hostingangebotes verarbeiteten Daten können alle die Nutzer unseres
          Onlineangebotes betreffenden Angaben gehören, die im Rahmen der Nutzung und der Kommunikation anfallen. Hierzu
          gehören regelmäßig die IP-Adresse, die notwendig ist, um die Inhalte von Onlineangeboten an Browser ausliefern
          zu können, und alle innerhalb unseres Onlineangebotes oder von Webseiten getätigten Eingaben.
        </p>
        <ul>
          <li>
            <strong>Verarbeitete Datenarten:</strong> Inhaltsdaten (z.B. Texteingaben, Fotografien, Videos),
            Nutzungsdaten (z.B. besuchte Webseiten, Interesse an Inhalten, Zugriffszeiten), Meta-/Kommunikationsdaten
            (z.B. Geräte-Informationen, IP-Adressen).
          </li>
          <li>
            <strong>Betroffene Personen:</strong> Nutzer (z.B. Webseitenbesucher, Nutzer von Onlinediensten).
          </li>
          <li>
            <strong>Rechtsgrundlagen:</strong> Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f. DSGVO).
          </li>
        </ul>
        <h4 id="m136">Präsenzen in sozialen Netzwerken (Social Media)</h4>
        <p>
          Wir unterhalten Onlinepräsenzen innerhalb sozialer Netzwerke und verarbeiten in diesem Rahmen Daten der
          Nutzer, um mit den dort aktiven Nutzern zu kommunizieren oder um Informationen über uns anzubieten.
        </p>
        <p>
          Wir weisen darauf hin, dass dabei Daten der Nutzer außerhalb des Raumes der Europäischen Union verarbeitet
          werden können. Hierdurch können sich für die Nutzer Risiken ergeben, weil so z.B. die Durchsetzung der Rechte
          der Nutzer erschwert werden könnte.
        </p>
        <p>
          Ferner werden die Daten der Nutzer innerhalb sozialer Netzwerke im Regelfall für Marktforschungs- und
          Werbezwecke verarbeitet. So können z.B. anhand des Nutzungsverhaltens und sich daraus ergebender Interessen
          der Nutzer Nutzungsprofile erstellt werden. Die Nutzungsprofile können wiederum verwendet werden, um z.B.
          Werbeanzeigen innerhalb und außerhalb der Netzwerke zu schalten, die mutmaßlich den Interessen der Nutzer
          entsprechen. Zu diesen Zwecken werden im Regelfall Cookies auf den Rechnern der Nutzer gespeichert, in denen
          das Nutzungsverhalten und die Interessen der Nutzer gespeichert werden. Ferner können in den Nutzungsprofilen
          auch Daten unabhängig der von den Nutzern verwendeten Geräte gespeichert werden (insbesondere, wenn die Nutzer
          Mitglieder der jeweiligen Plattformen sind und bei diesen eingeloggt sind).
        </p>
        <p>
          Für eine detaillierte Darstellung der jeweiligen Verarbeitungsformen und der Widerspruchsmöglichkeiten
          (Opt-Out) verweisen wir auf die Datenschutzerklärungen und Angaben der Betreiber der jeweiligen Netzwerke.
        </p>
        <p>
          Auch im Fall von Auskunftsanfragen und der Geltendmachung von Betroffenenrechten weisen wir darauf hin, dass
          diese am effektivsten bei den Anbietern geltend gemacht werden können. Nur die Anbieter haben jeweils Zugriff
          auf die Daten der Nutzer und können direkt entsprechende Maßnahmen ergreifen und Auskünfte geben. Sollten Sie
          dennoch Hilfe benötigen, dann können Sie sich an uns wenden.
        </p>
        <ul>
          <li>
            <strong>Verarbeitete Datenarten:</strong> Bestandsdaten (z.B. Namen, Adressen), Kontaktdaten (z.B. E-Mail,
            Telefonnummern), Inhaltsdaten (z.B. Texteingaben, Fotografien, Videos), Nutzungsdaten (z.B. besuchte
            Webseiten, Interesse an Inhalten, Zugriffszeiten), Meta-/Kommunikationsdaten (z.B. Geräte-Informationen,
            IP-Adressen).
          </li>
          <li>
            <strong>Betroffene Personen:</strong> Nutzer (z.B. Webseitenbesucher, Nutzer von Onlinediensten).
          </li>
          <li>
            <strong>Zwecke der Verarbeitung:</strong> Kontaktanfragen und Kommunikation, Tracking (z.B.
            interessens-/verhaltensbezogenes Profiling, Nutzung von Cookies), Remarketing, Reichweitenmessung (z.B.
            Zugriffsstatistiken, Erkennung wiederkehrender Besucher).
          </li>
          <li>
            <strong>Rechtsgrundlagen:</strong> Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f. DSGVO).
          </li>
        </ul>
        <p>
          <strong>Eingesetzte Dienste und Diensteanbieter:</strong>
        </p>
        <ul>
          <li>
            <strong>Facebook:</strong> Soziales Netzwerk; Dienstanbieter: Facebook Ireland Ltd., 4 Grand Canal Square,
            Grand Canal Harbour, Dublin 2, Irland, Mutterunternehmen: Facebook, 1 Hacker Way, Menlo Park, CA 94025, USA;
            Website:{' '}
            <LinkStyled href="https://www.facebook.com" target="_blank">
              https://www.facebook.com
            </LinkStyled>
            ; Datenschutzerklärung:{' '}
            <LinkStyled href="https://www.facebook.com/about/privacy" target="_blank">
              https://www.facebook.com/about/privacy
            </LinkStyled>
            ; Widerspruchsmöglichkeit (Opt-Out): Einstellungen für Werbeanzeigen:{' '}
            <LinkStyled href="https://www.facebook.com/settings?tab=ads" target="_blank">
              https://www.facebook.com/settings?tab=ads
            </LinkStyled>
            ; Zusätzliche Hinweise zum Datenschutz: Vereinbarung über gemeinsame Verarbeitung personenbezogener Daten
            auf Facebook-Seiten:{' '}
            <LinkStyled href="https://www.facebook.com/legal/terms/page_controller_addendum" target="_blank">
              https://www.facebook.com/legal/terms/page_controller_addendum
            </LinkStyled>
            , Datenschutzhinweise für Facebook-Seiten:{' '}
            <LinkStyled
              href="https://www.facebook.com/legal/terms/information_about_page_insights_data"
              target="_blank"
            >
              https://www.facebook.com/legal/terms/information_about_page_insights_data
            </LinkStyled>
            .
          </li>
        </ul>
        <h4 id="m12">Löschung von Daten</h4>
        <p>
          Die von uns verarbeiteten Daten werden nach Maßgabe der gesetzlichen Vorgaben gelöscht, sobald deren zur
          Verarbeitung erlaubten Einwilligungen widerrufen werden oder sonstige Erlaubnisse entfallen (z.B., wenn der
          Zweck der Verarbeitung dieser Daten entfallen ist oder sie für den Zweck nicht erforderlich sind).
        </p>
        <p>
          Sofern die Daten nicht gelöscht werden, weil sie für andere und gesetzlich zulässige Zwecke erforderlich sind,
          wird deren Verarbeitung auf diese Zwecke beschränkt. D.h., die Daten werden gesperrt und nicht für andere
          Zwecke verarbeitet. Das gilt z.B. für Daten, die aus handels- oder steuerrechtlichen Gründen aufbewahrt werden
          müssen oder deren Speicherung zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen oder zum
          Schutz der Rechte einer anderen natürlichen oder juristischen Person erforderlich ist.
        </p>
        <p>
          Weitere Hinweise zu der Löschung von personenbezogenen Daten können ferner im Rahmen der einzelnen
          Datenschutzhinweise dieser Datenschutzerklärung erfolgen.
        </p>
        <h4 id="m15">Änderung und Aktualisierung der Datenschutzerklärung</h4>
        <p>
          Wir bitten Sie, sich regelmäßig über den Inhalt unserer Datenschutzerklärung zu informieren. Wir passen die
          Datenschutzerklärung an, sobald die Änderungen der von uns durchgeführten Datenverarbeitungen dies
          erforderlich machen. Wir informieren Sie, sobald durch die Änderungen eine Mitwirkungshandlung Ihrerseits
          (z.B. Einwilligung) oder eine sonstige individuelle Benachrichtigung erforderlich wird.
        </p>
        <p>
          Sofern wir in dieser Datenschutzerklärung Adressen und Kontaktinformationen von Unternehmen und Organisationen
          angeben, bitten wir zu beachten, dass die Adressen sich über die Zeit ändern können und bitten die Angaben vor
          Kontaktaufnahme zu prüfen.
        </p>
        <h4 id="m10">Rechte der betroffenen Personen</h4>
        <p>
          Ihnen stehen als Betroffene nach der DSGVO verschiedene Rechte zu, die sich insbesondere aus Art. 15 bis 21
          DSGVO ergeben:
        </p>
        <ul>
          <li>
            <strong>
              Widerspruchsrecht: Sie haben das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben,
              jederzeit gegen die Verarbeitung der Sie betreffenden personenbezogenen Daten, die aufgrund von Art. 6
              Abs. 1 lit. e oder f DSGVO erfolgt, Widerspruch einzulegen; dies gilt auch für ein auf diese Bestimmungen
              gestütztes Profiling. Werden die Sie betreffenden personenbezogenen Daten verarbeitet, um Direktwerbung zu
              betreiben, haben Sie das Recht, jederzeit Widerspruch gegen die Verarbeitung der Sie betreffenden
              personenbezogenen Daten zum Zwecke derartiger Werbung einzulegen; dies gilt auch für das Profiling, soweit
              es mit solcher Direktwerbung in Verbindung steht.
            </strong>
          </li>
          <li>
            <strong>Widerrufsrecht bei Einwilligungen:</strong> Sie haben das Recht, erteilte Einwilligungen jederzeit
            zu widerrufen.
          </li>
          <li>
            <strong>Auskunftsrecht:</strong> Sie haben das Recht, eine Bestätigung darüber zu verlangen, ob betreffende
            Daten verarbeitet werden und auf Auskunft über diese Daten sowie auf weitere Informationen und Kopie der
            Daten entsprechend den gesetzlichen Vorgaben.
          </li>
          <li>
            <strong>Recht auf Berichtigung:</strong> Sie haben entsprechend den gesetzlichen Vorgaben das Recht, die
            Vervollständigung der Sie betreffenden Daten oder die Berichtigung der Sie betreffenden unrichtigen Daten zu
            verlangen.
          </li>
          <li>
            <strong>Recht auf Löschung und Einschränkung der Verarbeitung:</strong> Sie haben nach Maßgabe der
            gesetzlichen Vorgaben das Recht, zu verlangen, dass Sie betreffende Daten unverzüglich gelöscht werden, bzw.
            alternativ nach Maßgabe der gesetzlichen Vorgaben eine Einschränkung der Verarbeitung der Daten zu
            verlangen.
          </li>
          <li>
            <strong>Recht auf Datenübertragbarkeit:</strong> Sie haben das Recht, Sie betreffende Daten, die Sie uns
            bereitgestellt haben, nach Maßgabe der gesetzlichen Vorgaben in einem strukturierten, gängigen und
            maschinenlesbaren Format zu erhalten oder deren Übermittlung an einen anderen Verantwortlichen zu fordern.
          </li>
          <li>
            <strong>Beschwerde bei Aufsichtsbehörde:</strong> Sie haben ferner nach Maßgabe der gesetzlichen Vorgaben
            das Recht, bei einer Aufsichtsbehörde, insbesondere in dem Mitgliedstaat Ihres gewöhnlichen Aufenthaltsorts,
            Ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes Beschwerde einzulegen, wenn Sie der Ansicht
            sind, dass die Verarbeitung der Sie betreffenden personenbezogenen Daten gegen die DSGVO verstößt.
          </li>
        </ul>
        <h4 id="m42">Begriffsdefinitionen</h4>
        <p>
          In diesem Abschnitt erhalten Sie eine Übersicht über die in dieser Datenschutzerklärung verwendeten
          Begrifflichkeiten. Viele der Begriffe sind dem Gesetz entnommen und vor allem im Art. 4 DSGVO definiert. Die
          gesetzlichen Definitionen sind verbindlich. Die nachfolgenden Erläuterungen sollen dagegen vor allem dem
          Verständnis dienen. Die Begriffe sind alphabetisch sortiert.
        </p>
        <ul>
          <li>
            <strong>Personenbezogene Daten:</strong> "Personenbezogene Daten“ sind alle Informationen, die sich auf eine
            identifizierte oder identifizierbare natürliche Person (im Folgenden "betroffene Person“) beziehen; als
            identifizierbar wird eine natürliche Person angesehen, die direkt oder indirekt, insbesondere mittels
            Zuordnung zu einer Kennung wie einem Namen, zu einer Kennnummer, zu Standortdaten, zu einer Online-Kennung
            (z.B. Cookie) oder zu einem oder mehreren besonderen Merkmalen identifiziert werden kann, die Ausdruck der
            physischen, physiologischen, genetischen, psychischen, wirtschaftlichen, kulturellen oder sozialen Identität
            dieser natürlichen Person sind.{' '}
          </li>
          <li>
            <strong>Reichweitenmessung:</strong> Die Reichweitenmessung (auch als Web Analytics bezeichnet) dient der
            Auswertung der Besucherströme eines Onlineangebotes und kann das Verhalten oder Interessen der Besucher an
            bestimmten Informationen, wie z.B. Inhalten von Webseiten, umfassen. Mit Hilfe der Reichweitenanalyse können
            Webseiteninhaber z.B. erkennen, zu welcher Zeit Besucher ihre Webseite besuchen und für welche Inhalte sie
            sich interessieren. Dadurch können sie z.B. die Inhalte der Webseite besser an die Bedürfnisse ihrer
            Besucher anpassen. Zu Zwecken der Reichweitenanalyse werden häufig pseudonyme Cookies und Web-Beacons
            eingesetzt, um wiederkehrende Besucher zu erkennen und so genauere Analysen zur Nutzung eines
            Onlineangebotes zu erhalten.{' '}
          </li>
          <li>
            <strong>Remarketing:</strong> Vom "Remarketing“ bzw. "Retargeting“ spricht man, wenn z.B. zu Werbezwecken
            vermerkt wird, für welche Produkte sich ein Nutzer auf einer Webseite interessiert hat, um den Nutzer auf
            anderen Webseiten an diese Produkte, z.B. in Werbeanzeigen, zu erinnern.{' '}
          </li>
          <li>
            <strong>Tracking:</strong> Vom "Tracking“ spricht man, wenn das Verhalten von Nutzern über mehrere
            Onlineangebote hinweg nachvollzogen werden kann. Im Regelfall werden im Hinblick auf die genutzten
            Onlineangebote Verhaltens- und Interessensinformationen in Cookies oder auf Servern der Anbieter der
            Trackingtechnologien gespeichert (sogenanntes Profiling). Diese Informationen können anschließend z.B.
            eingesetzt werden, um den Nutzern Werbeanzeigen anzuzeigen, die voraussichtlich deren Interessen
            entsprechen.{' '}
          </li>
          <li>
            <strong>Verantwortlicher:</strong> Als "Verantwortlicher“ wird die natürliche oder juristische Person,
            Behörde, Einrichtung oder andere Stelle, die allein oder gemeinsam mit anderen über die Zwecke und Mittel
            der Verarbeitung von personenbezogenen Daten entscheidet, bezeichnet.{' '}
          </li>
          <li>
            <strong>Verarbeitung:</strong> "Verarbeitung" ist jeder mit oder ohne Hilfe automatisierter Verfahren
            ausgeführte Vorgang oder jede solche Vorgangsreihe im Zusammenhang mit personenbezogenen Daten. Der Begriff
            reicht weit und umfasst praktisch jeden Umgang mit Daten, sei es das Erheben, das Auswerten, das Speichern,
            das Übermitteln oder das Löschen.{' '}
          </li>
        </ul>
        <p>
          <LinkStyled
            href="https://datenschutz-generator.de/?l=de"
            title="Rechtstext von Dr. Schwenke - für weitere Informationen bitte anklicken."
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            Erstellt mit kostenlosem Datenschutz-Generator.de von Dr. Thomas Schwenke
          </LinkStyled>
        </p>
      </DSEStyled>
      <PerlLinkStyled target="_blank" rel="noopener noreferrer" href="https://youtu.be/fMkuQTVlFic">
        <Perl1Styled src={lightGreyPerlImage} />
        <Perl2Styled src={lightGreyPerlImage} />
        <Perl3Styled src={lightGreyPerlImage} />
        <Perl4Styled src={lightGreyPerlImage} />
        <Perl5Styled src={lightGreyPerlImage} />
        <Perl6Styled src={lightGreyPerlImage} />
        <Perl7Styled src={lightGreyPerlImage} />
      </PerlLinkStyled>
    </ContactPageStyled>
  );
}

const ContactPageStyled = styled.div`
  position: relative;
  padding: 20px;
  color: var(--primary-color);
  font-size: 1.2em;

  @media (min-width: 900px) {
    padding: 40px;
    font-size: 1.5em;
  }
`;

const MapImageStyled = styled.img`
  max-width: 600px;
  width: 100%;
`;

const LinkStyled = styled.a`
  color: var(--primary-color);
`;

const PerlLinkStyled = styled.a`
  position: absolute;
  top: 120px;
  left: 240px;
  display: grid;
  grid-template-areas:
    '. one .'
    'two three four'
    'five six seven';

  @media (min-width: 900px) {
    top: 180px;
    left: 400px;
  }
`;

const Perl1Styled = styled.img`
  grid-area: one;
`;
const Perl2Styled = styled.img`
  grid-area: two;
`;
const Perl3Styled = styled.img`
  grid-area: three;
`;
const Perl4Styled = styled.img`
  grid-area: four;
`;
const Perl5Styled = styled.img`
  grid-area: five;
`;
const Perl6Styled = styled.img`
  grid-area: six;
`;
const Perl7Styled = styled.img`
  grid-area: seven;
`;

const DSEStyled = styled.section`
  font-size: 1rem;
`;
