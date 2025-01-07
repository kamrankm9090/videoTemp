import {ReactNode} from 'react';

declare global {
  type ReactChildren = ReactNode;

  type EnvType = 'DEV' | 'QA' | 'STG' | 'PRD';
}
