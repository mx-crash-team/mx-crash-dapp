import React from 'react';
import { DECIMALS } from '@multiversx/sdk-dapp/constants';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
import { BigNumber } from 'bignumber.js';
import { useFormik } from 'formik';
import { object, string } from 'yup';

import { FormatAmount } from 'components';
import { useSendBetTransaction } from 'hooks/useSendBetTransaction';
import { Claim } from './Claim';

export const Interface = () => {
  const ref = React.useRef(null);
  const { account } = useGetAccountInfo();
  const { sendBetTransactionFromAbi } = useSendBetTransaction();

  const onSubmit = async (values: any) => {
    const { amount, cash_out } = values;
    await sendBetTransactionFromAbi({
      amount,
      cash_out
    });
  };

  const initialValues = {
    amount: 0,
    cash_out: 0
  };

  const validationSchema = object().shape({
    amount: string()
      .required('Required')
      .test('minAmount', 'Amount Needed', (value) => {
        if (value) {
          const bnAmount = new BigNumber(value);
          return bnAmount.isGreaterThan(0);
        }
        return true;
      })
      .test('funds', 'Insufficient funds', (value, context) => {
        if (value !== undefined) {
          return new BigNumber(account.balance).isGreaterThan(
            new BigNumber(value)
              .plus(new BigNumber(10000000000000000))
              .toString(10)
          );
        }
        return true;
      }),

    cash_out: string().test('minAmount', 'Invalid Cash Out', (value) => {
      if (value) {
        const bnAmount = new BigNumber(value);
        return bnAmount.isGreaterThan(0);
      }
      return true;
    })
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  });

  const { handleSubmit, handleBlur, handleChange, values, errors, touched } =
    formik;

  const { amount, cash_out } = values;
  //#endregion

  return (
    <form
      onSubmit={handleSubmit}
      noValidate={true}
      ref={ref}
      className='d-flex flex-column text-start gap-3'
    >
      <div className='form-group'>
        <label htmlFor='amount'>Bet Amount</label>
        <input
          type='tel'
          className='form-control'
          id='amount'
          aria-describedby='amountHelp'
          placeholder='Bet Amount'
          defaultValue={amount}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <span id='amountHelp' className=' d-flex align-items-center gap-2'>
          Available Balance{' '}
          <FormatAmount
            value={account?.balance ?? '0'}
            decimals={DECIMALS}
            digits={2}
            showSymbol={false}
            className='fw-bold'
          />
        </span>
      </div>
      <div className='form-group'>
        <label htmlFor='cash_out'>Auto Cashout</label>
        <input
          type='tel'
          className='form-control'
          id='cash_out'
          aria-describedby='cash_outHelp'
          placeholder='Auto Cashout'
          defaultValue={cash_out}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
      {'amount' in errors && touched.amount && errors.amount && (
        <div className='text-danger small mt-1 ' data-testid='invalidAmount'>
          {touched.amount && errors.amount}
        </div>
      )}
      {'cash_out' in errors && touched.cash_out && errors.cash_out && (
        <div className='text-danger small mt-1 ' data-testid='invalidCashOut'>
          {touched.cash_out && errors.cash_out}
        </div>
      )}
      <button type='submit' className='btn btn-primary'>
        Bet
      </button>
      <Claim />
    </form>
  );
};
