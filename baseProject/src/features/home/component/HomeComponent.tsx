import React, { FunctionComponent, ReactNode } from 'react';
import { ScrollView, 
{{#unless hasStyledComponents}}StyleSheet, {{/unless}}Text, useColorScheme, View } from 'react-native';
{{#if hasI18n}}
import { useTranslation } from 'react-i18next';
{{#unless hasReactNavigationExample}}
import ChangeLanguage from 'i18n/ChangeLanguageButton/ChangeLanguage';
{{/unless}}
{{/if}}
import {
  Colors,
  Header,
  LearnMoreLinks,
  {{#unless hasI18n}}
  DebugInstructions, 
  ReloadInstructions
  {{/unless}}
} from 'react-native/Libraries/NewAppScreen';
{{#if hasStyledComponents}}
import styled from 'styled-components/native';
{{/if}}

const Section: FunctionComponent<{
  children: ReactNode;
  title: string;
}> = ({ children, title }) => {
  return (
    {{#if hasStyledComponents}}
    <StyledSectionContainer>
      <Text>{title}</Text>
      <Text>{children}</Text>
    </StyledSectionContainer>
    {{else}}
    <View style={styles.sectionContainer}>
      <Text>{title}</Text>
      <Text>{children}</Text>
    </View>
    {{/if}}
  );
};

const Body: FunctionComponent = () => {
  {{#if hasI18n}}
  const { t } = useTranslation();
  {{/if}}
  
  return (
    {{#if hasI18n}}
      <View>
        <Section title={t('Step One')}>
          {t('Edit')} {<Text style={styles.highlight}>App.tsx</Text>} {t('Screen Change')}
        </Section>
        <Section title={t('See Your Changes')}>
          {t('Press')} {<Text style={styles.highlight}>Cmd + R</Text>} {t('Simulator')} {t('Reload')}
        </Section>
        <Section title={t('Debug')}>
          {t('Press')} {<Text style={styles.highlight}>Cmd + D</Text>} {t('Simulator')} {t('Or')}{' '}
          {<Text style={styles.highlight}>{t('Shake')}</Text>} {t('Dev Menu')}
        </Section>
        <Section title={t('Learn More')}>{t('Read Docs')}</Section>
        <LearnMoreLinks />
      </View>
    {{else}}
    <View>
        <Section title="Step One">
          Edit {{#if hasStyledComponents}}<HighlightedText>App.tsx</HighlightedText>{{else}}<Text style={styles.highlight}>App.tsx</Text>{{/if}} to change this screen and then come back to see your edits.
        </Section>
        <Section title="See Your Changes">
          <ReloadInstructions />
        </Section>
        <Section title="Debug">
          <DebugInstructions />
        </Section>
        <Section title="Learn More">Read the docs to discover what to do next:</Section>
        <LearnMoreLinks />
      </View>
  {{/if}}
  )
}

export const HomeComponent = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter
  };

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}> 
      {{#unless hasReactNavigationExample}} 
      <ChangeLanguage />
      {{/unless}}     
      <Header />
      <Body />
    </ScrollView>
  );
};

{{#if hasStyledComponents}}
const StyledSectionContainer = styled.View`
  margin-top: 32px;
  padding-horizontal: 24px;
`;

const HighlightedText = styled.Text`
  font-weight: 700;
`;
{{else}}
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24
  },
  highlight: {
    fontWeight: '700'
  }
});
{{/if}}
