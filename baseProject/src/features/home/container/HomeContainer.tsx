import React from 'react';
import { HomeComponent } from '../component/HomeComponent';
{{#if hasRTKQuery}}
import { useGetPostsQuery } from 'common/services/api/api';
{{/if}}

export const HomeContainer = () => {
  {{#if hasRTKQuery}}
  const useGetPostsQueryResult = useGetPostsQuery();
  console.log(useGetPostsQueryResult);
  {{/if}}
  return <HomeComponent />;
};
