import React, { useEffect, useState } from 'react';
import {
  faCircleCheck,
  faCircleNotch,
  faTriangleExclamation,
  faPlay
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DECIMALS } from '@multiversx/sdk-dapp/constants/index';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { Form, Field, getIn } from 'formik';

import { SC_GAS_LIMIT, ZERO } from 'config';
import { getSelectOptions } from 'helpers';
import { useIsAuthenticated } from 'hooks';
import { ProcessedFormTokenType } from 'types';

import { MutateModalInitialValuesType } from './types';
import { AmountSelectInput } from '../AmountSelectInput';

export const InteractionFormContent = (props: any) => {
  const { isLoading, generalError, panelDescription, tokens, formik } = props;

  const {
    account: { balance }
  } = useGetAccountInfo();
  const isAuthenticated = useIsAuthenticated();
  const [isTxCostLoading, setIsTxCostLoading] = useState(false);
  const [hasVerifiedGasLimit, setHasVerifiedTxGasLimit] = useState<
    boolean | undefined
  >();

  const defaultGasLimit = SC_GAS_LIMIT;

  const tokenList = getSelectOptions({
    tokens,
    includeEgld: true,
    egldBalance: balance
  });

  const { errors, touched, values, setFieldValue, handleChange, handleBlur } =
    formik;
  const inputError = getIn(errors, 'gasLimit');
  const isGasValueTouched = getIn(touched, 'gasLimit');

  const isButtonDisabled = Boolean(
    isLoading || !formik.isValid || generalError
  );

  useEffect(() => {
    const tokens = getIn(values, 'tokens');

    const validTokens =
      tokens && tokens.length > 0
        ? tokens.every((token: ProcessedFormTokenType) =>
            Boolean(token.tokenIdentifier && token.tokenAmount !== '')
          )
        : true;

    const fetchData = async () => {
      setIsTxCostLoading(true);
      const transactionGasLimit = { gasLimit: SC_GAS_LIMIT, isVerified: true };
      if (transactionGasLimit) {
        const { gasLimit, isVerified } = transactionGasLimit;
        setFieldValue('gasLimit', gasLimit);
        setHasVerifiedTxGasLimit(isVerified);
      } else {
        setFieldValue('gasLimit', defaultGasLimit);
        setHasVerifiedTxGasLimit(false);
      }
      setIsTxCostLoading(false);
    };

    if (
      validTokens &&
      !isGasValueTouched &&
      hasVerifiedGasLimit === undefined
    ) {
      fetchData().catch(console.error);
    }
  }, [values, hasVerifiedGasLimit]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Form onSubmit={formik.handleSubmit} className='interaction-form'>
      {panelDescription && (
        <div className='form-panel'>
          <FontAwesomeIcon
            icon={faTriangleExclamation}
            size='2x'
            className='form-panel-icon form-panel-icon-warn'
          />
          <div className='form-panel-text'>{panelDescription}</div>
        </div>
      )}
      <div className='interaction-form-fields'>
        <label htmlFor='gasLimit' className='label'>
          Deposit Gas Limit
        </label>
        <div className=''>
          <Field
            id='gasLimit'
            name='gasLimit'
            autoComplete='off'
            type='text'
            onChange={handleChange}
            onBlur={handleBlur}
            inputMode='numeric'
            placeholder='Gas Limit'
            className='form-control'
          />
          {inputError && typeof inputError === 'string' && (
            <div className='input-invalid-feedback'>{inputError}</div>
          )}
        </div>
        <div className='amount-select-input-group'>
          {(values as MutateModalInitialValuesType).tokens.map(
            (token, index) => {
              const prefix = `tokens.${index}`;
              const tokenAmount = `${prefix}.tokenAmount`;
              const tokenIdentifier = `${prefix}.tokenIdentifier`;
              const tokenDecimals = `${prefix}.tokenDecimals`;
              const tokenType = `${prefix}.tokenType`;
              const tokenNonce = `${prefix}.tokenNonce`;
              const activeToken = tokenList.find(
                (token) => token.value === getIn(values, tokenIdentifier)
              );

              return (
                <AmountSelectInput
                  key={index}
                  errorMessage={
                    getIn(errors, tokenIdentifier) || getIn(errors, tokenAmount)
                  }
                  handleBlurSelect={handleBlur}
                  handleChangeInput={(event) => {
                    if (event?.currentTarget?.value !== undefined) {
                      setFieldValue(tokenAmount, event.currentTarget.value);
                    }
                  }}
                  hasErrors={Boolean(
                    (getIn(errors, tokenAmount) &&
                      getIn(touched, tokenAmount)) ||
                      getIn(errors, tokenIdentifier)
                  )}
                  inputName={tokenAmount}
                  inputPlaceholder='Amount'
                  isInputDisabled={false}
                  isSelectLoading={false}
                  onBlurInput={handleBlur}
                  onChangeSelect={(option) => {
                    if (option?.value !== undefined) {
                      setFieldValue(tokenAmount, '');
                      setFieldValue(tokenIdentifier, option?.value);
                      setFieldValue(
                        tokenDecimals,
                        option?.token?.decimals ?? DECIMALS
                      );
                      setFieldValue(tokenType, option?.token?.type ?? '');
                      if (option?.token?.nonce) {
                        setFieldValue(tokenNonce, option.token.nonce);
                      }
                    }
                  }}
                  onMaxBtnClick={(value) => {
                    setFieldValue(tokenAmount, value);
                  }}
                  optionsSelect={tokenList}
                  selectName={`${prefix}.selectAmount`}
                  showMaxButton
                  title='You send'
                  token={activeToken}
                  tokenAmount={getIn(values, tokenAmount)}
                  tokenUsdPrice={activeToken?.token?.price ?? ZERO}
                  className='amount-select-input-group'
                />
              );
            }
          )}
        </div>
      </div>
      {generalError && (
        <div className='general-error'>
          <p>{String(generalError)}</p>
        </div>
      )}

      <button
        className='btn btn-primary btn-action mt-spacer interaction-form-button'
        type='submit'
        {...(isButtonDisabled ? { disabled: true } : {})}
      >
        Deposit Funds{' '}
        {isLoading ? (
          <FontAwesomeIcon icon={faCircleNotch} className='fa-spin fast-spin' />
        ) : (
          <FontAwesomeIcon icon={faPlay} />
        )}
      </button>
    </Form>
  );
};
