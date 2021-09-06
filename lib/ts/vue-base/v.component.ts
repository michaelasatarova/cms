import { AsyncComponent, Component } from 'vue';

export type TVueComponent = Component<any, any, any, any> | AsyncComponent<any, any, any, any>;
export type VComponent = [ string, TVueComponent ];