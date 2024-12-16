import { FormikProps } from 'formik';
import {
  ProcessedFormTokenType,
  PartialEsdtType,
  WithClassnameType
} from 'types';

export enum InteractionModalFormikFieldsEnum {
  gasLimit = 'gasLimit',
  tokens = 'tokens'
}

export interface DeployUpgradeModalInitialValuesType {
  [InteractionModalFormikFieldsEnum.gasLimit]: number;
}

export interface MutateModalInitialValuesType {
  [InteractionModalFormikFieldsEnum.gasLimit]: number;
  [InteractionModalFormikFieldsEnum.tokens]: ProcessedFormTokenType[];
}

export interface InteractionModalInitialValuesType {
  [InteractionModalFormikFieldsEnum.gasLimit]: number;
  [InteractionModalFormikFieldsEnum.tokens]: ProcessedFormTokenType[];
}

export interface InteractionModalFormUIType extends WithClassnameType {
  onSubmit: (values: InteractionModalInitialValuesType) => Promise<void>;
  isLoading: boolean;
  generalError?: string;
  buttonText?: React.ReactNode;
  panelDescription?: React.ReactNode;
}

export interface InteractionFormUIType extends InteractionModalFormUIType {
  tokens?: PartialEsdtType[];
}

export interface InteractionFormContentUIType extends InteractionFormUIType {
  formik: FormikProps<InteractionModalInitialValuesType>;
}
