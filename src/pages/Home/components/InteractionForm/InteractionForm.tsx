import { DECIMALS } from '@multiversx/sdk-dapp/constants/index';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { getEgldLabel } from '@multiversx/sdk-dapp/utils/network/getEgldLabel';
import { parseAmount } from '@multiversx/sdk-dapp/utils/operations/parseAmount';
import { stringIsFloat } from '@multiversx/sdk-dapp/utils/validation/stringIsFloat';

import BigNumber from 'bignumber.js';
import { Formik } from 'formik';
import { array, object, string } from 'yup';

import { SC_GAS_LIMIT } from 'config';
import { getSelectOptions } from 'helpers';
import { useIsAuthenticated } from 'hooks';

import { InteractionFormContent } from './InteractionFormContent';

export const InteractionForm = (props: any) => {
  const { onSubmit, tokens } = props;
  const {
    account: { balance }
  } = useGetAccountInfo();
  const isAuthenticated = useIsAuthenticated();

  const defaultGasLimit = SC_GAS_LIMIT;

  const initialValues = {
    gasLimit: defaultGasLimit,
    tokens: [
      {
        tokenAmount: '',
        tokenIdentifier: '',
        tokenDecimals: DECIMALS,
        tokenType: '',
        tokenNonce: 0
      }
    ]
  };

  const tokenList = getSelectOptions({
    tokens,
    includeEgld: true,
    egldBalance: balance
  });
  const egldLabel = getEgldLabel();

  const validationSchema = object({
    gasLimit: string()
      .required('Required')
      .test('isValidNumber', 'Invalid Number', (value) =>
        Boolean(value && stringIsFloat(value))
      ),
    tokens: array().of(
      object().shape({
        tokenAmount: string()
          .required('Amount Required')
          .test('isValidNumber', 'Invalid Number', (value) =>
            Boolean(value && stringIsFloat(value))
          )
          .test(
            'hasFunds',
            'Insufficient funds',
            function checkHasFunds(value) {
              if (
                value &&
                tokenList.length > 0 &&
                this?.parent?.tokenIdentifier
              ) {
                const selectedToken = tokenList.find(
                  (option) =>
                    option?.token?.identifier === this?.parent?.tokenIdentifier
                );
                if (selectedToken) {
                  const parsedAmount = parseAmount(
                    value.toString(),
                    selectedToken.token.decimals
                  );
                  const bnAmount = new BigNumber(parsedAmount);
                  const bnBalance = new BigNumber(
                    selectedToken.token.balance ?? '0'
                  );
                  return bnBalance.comparedTo(bnAmount) >= 0;
                }
              }

              return true;
            }
          )
          .test(
            'hasValidValue',
            'ESDToken amount cannot be 0',
            function checkESDTTokenAmount(value) {
              if (
                value &&
                this?.parent?.tokenIdentifier &&
                this.parent.tokenIdentifier !== egldLabel
              ) {
                return new BigNumber(value.toString()).isGreaterThan(0);
              }

              return true;
            }
          ),

        tokenIdentifier: string()
          .required('Token Required')
          .test('tokenIdentifier', 'Invalid Token', (value) => {
            if (tokenList.length > 0) {
              return tokenList.some((token) => token.value === value);
            }
            return true;
          })
      })
    )
  });

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, { resetForm }) => {
        await onSubmit(values);
        resetForm();
      }}
      validationSchema={validationSchema}
      validateOnChange={true}
      validateOnBlur={true}
      enableReinitialize
    >
      {(formik) => <InteractionFormContent {...props} formik={formik} />}
    </Formik>
  );
};
