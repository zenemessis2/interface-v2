import React from 'react';
import { Box, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { GlobalConst } from 'constants/index';
import { DoubleCurrencyLogo } from 'components';
import { formatCompact, getDaysCurrentYear } from 'utils';
import { useCurrency } from 'hooks/Tokens';

const LiquidityPoolRow: React.FC<{
  pair: any;
  key: number;
}> = ({ pair, key }) => {
  const { breakpoints } = useTheme();
  const daysCurrentYear = getDaysCurrentYear();
  const isMobile = useMediaQuery(breakpoints.down('xs'));

  const dayVolumeUSD =
    Number(
      pair.oneDayVolumeUSD ? pair.oneDayVolumeUSD : pair.oneDayVolumeUntracked,
    ) *
    GlobalConst.utils.FEEPERCENT *
    daysCurrentYear *
    100;
  const trackReserveUSD = Number(
    pair.oneDayVolumeUSD ? pair.trackedReserveUSD : pair.reserveUSD,
  );
  const apy =
    isNaN(dayVolumeUSD) || trackReserveUSD === 0
      ? 0
      : dayVolumeUSD / trackReserveUSD;
  const liquidity = pair.trackedReserveUSD
    ? pair.trackedReserveUSD
    : pair.reserveUSD;
  const volume = pair.oneDayVolumeUSD
    ? pair.oneDayVolumeUSD
    : pair.oneDayVolumeUntracked;
  const token0 = useCurrency(pair.token0.id);
  const token1 = useCurrency(pair.token1.id);
  return (
    <Box
      key={key}
      display='flex'
      flexWrap='wrap'
      className='liquidityContent'
      padding={2}
    >
      <Box display='flex' alignItems='center' width={isMobile ? 1 : 0.5}>
        <DoubleCurrencyLogo
          currency0={token0 ?? undefined}
          currency1={token1 ?? undefined}
          size={28}
        />
        <small style={{ marginLeft: 12 }}>
          {pair.token0.symbol.toUpperCase()} /{' '}
          {pair.token1.symbol.toUpperCase()}
        </small>
      </Box>
      <Box
        width={isMobile ? 1 : 0.2}
        mt={isMobile ? 2.5 : 0}
        display='flex'
        justifyContent='space-between'
      >
        {isMobile && <small className='text-secondary'>TVL</small>}
        <small>${formatCompact(liquidity)}</small>
      </Box>
      <Box
        width={isMobile ? 1 : 0.15}
        mt={isMobile ? 1 : 0}
        display='flex'
        justifyContent='space-between'
      >
        {isMobile && <small className='text-secondary'>24H Volume</small>}
        <small>${formatCompact(volume)}</small>
      </Box>
      <Box
        width={isMobile ? 1 : 0.15}
        mt={isMobile ? 1 : 0}
        display='flex'
        justifyContent={isMobile ? 'space-between' : 'flex-end'}
      >
        {isMobile && <small className='text-secondary'>APY</small>}
        <small
          className={`text-right ${apy < 0 ? 'text-error' : 'text-success'}`}
        >
          {apy.toFixed(2)}%
        </small>
      </Box>
    </Box>
  );
};

export default React.memo(LiquidityPoolRow);
