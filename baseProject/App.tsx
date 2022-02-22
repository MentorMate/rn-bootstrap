import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, {{#unless hasStyledComponents}}StyleSheet, {{/unless}}Text, useColorScheme, View } from 'react-native';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions
} from 'react-native/Libraries/NewAppScreen';
{{#if hasStyledComponents}}
import styled from 'styled-components/native';
{{/if}}
{{#if hasReduxToolkit}}
import { store } from './app/store';
import { Provider } from 'react-redux';
{{/if}}

const Section: React.FC<{
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

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter
  };

  return (
    {{#if hasReduxToolkit}}<Provider store={store}>{{/if}}
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
        <Header />
        <View>
          <Section title="Step One">
            Edit {{#if hasStyledComponents}}<HighlightedText>App.tsx</HighlightedText>{{else}}<Text style={styles.highlight}>App.tsx</Text>{{/if}} to change this screen and then come back to see your
            edits.
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
      </ScrollView>
    </SafeAreaView>
    {{#if hasReduxToolkit}}</Provider>{{/if}}
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

export default App;
