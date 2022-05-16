import React from 'react';
import { ChainId, Currency, currencyEquals, ETHER, Token } from '@uniswap/sdk';
import { Box } from '@material-ui/core';
import { GlobalData } from 'constants/index';
import { CurrencyLogo, QuestionHelper } from 'components';

interface CommonBasesProps {
  chainId?: ChainId;
  selectedCurrency?: Currency | null;
  onSelect: (currency: Currency) => void;
}

const CommonBases: React.FC<CommonBasesProps> = ({
  chainId,
  onSelect,
  selectedCurrency,
}) => {
  return (
    <Box mb={2}>
      <Box display='flex' className='title' my={1.5}>
        <span>Common bases</span>
        <QuestionHelper text='These tokens are commonly paired with other tokens.' />
      </Box>
      <Box display='flex' flexWrap='wrap'>
        <Box
          className='baseWrapper'
          onClick={() => {
            if (!selectedCurrency || !currencyEquals(selectedCurrency, ETHER)) {
              onSelect(ETHER);
            }
          }}
        >
          <CurrencyLogo currency={ETHER} size='24px' />
          <small>MATIC</small>
        </Box>
        {(chainId ? GlobalData.bases.SUGGESTED_BASES[chainId] : []).map(
          (token: Token) => {
            const selected =
              selectedCurrency instanceof Token &&
              selectedCurrency.address === token.address;
            return (
              <Box
                className='baseWrapper'
                key={token.address}
                onClick={() => !selected && onSelect(token)}
              >
                <CurrencyLogo currency={token} size='24px' />
                <small>{token.symbol}</small>
              </Box>
            );
          },
        )}
      </Box>
    </Box>
  );
};

export default CommonBases;
