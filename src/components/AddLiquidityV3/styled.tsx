import styled from 'styled-components/macro';

import Input from 'components/NumericalInput';

import { AutoColumn } from 'components/v3/Column';
import CurrencyInputPanel from 'components/v3/CurrencyInputPanel';

// export const PageWrapper = styled(BodyWrapper)<{ wide: boolean }>`
//   max-width: ${({ wide }) => (wide ? '880px' : '480px')};
//   width: 100%;
//   background-color: ${({ theme }) => theme.winterBackground};

//   padding: ${({ wide }) => (wide ? '30px 40px' : '0')};

//   ${({ theme }) => theme.mediaWidth.upToMedium`
//     max-width: 480px;
//   `};
//   ${({ theme }) => theme.mediaWidth.upToExtraSmall`
//     max-width: 100%!important;

//   `};
// `

export const Dots = styled.span`
  &::after {
    display: inline-block;
    animation: ellipsis 1.25s infinite;
    content: '.';
    width: 1em;
    text-align: left;
  }

  @keyframes ellipsis {
    0% {
      content: '.';
    }
    33% {
      content: '..';
    }
    66% {
      content: '...';
    }
  }
`;

export const Wrapper = styled.div`
  position: relative;
  padding: 26px 16px;
  min-width: 480px;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    min-width: 400px;
  `};

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
  min-width: 340px;
`};
`;
export const ScrollablePage = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    max-width: 480px;
    margin: 0 auto;
  `};
`;
export const DynamicSection = styled(AutoColumn)<{ disabled?: boolean }>`
  opacity: ${({ disabled }) => (disabled ? '0.2' : '1')};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'initial')};
`;
export const CurrencyDropdown = styled(CurrencyInputPanel)<{
  style?: any;
  pool?: string;
}>`
  width: ${({ centered }) => (centered ? '100%' : '50%')};
  ${({ theme }) => theme.mediaWidth.upToMedium`
    width: 100%;
  `}
`;
export const StyledInput = styled(Input)`
  background-color: ${({ theme }) => theme.bg0};
  text-align: left;
  font-size: 18px;
  width: 100%;
`;

/* two-column layout where DepositAmount is moved at the very end on mobile. */
export const ResponsiveTwoColumns = styled.div<{ wide: boolean }>`
  display: grid;
  grid-column-gap: 50px;
  grid-row-gap: 15px;
  grid-template-columns: ${({ wide }) => (wide ? '1fr 1fr' : '1fr')};
  grid-template-rows: max-content;
  grid-auto-flow: row;

  padding-top: 20px;

  border-top: 1px solid #2a7ed2;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    grid-template-columns: 1fr;

    margin-top: 0;
  `};
`;
export const RightContainer = styled(AutoColumn)`
  grid-row: 1 / 3;
  grid-column: 2;
  height: fit-content;

  ${({ theme }) => theme.mediaWidth.upToMedium`
  grid-row: 2 / 3;
  grid-column: 1;
  `};
`;
export const StackedContainer = styled.div`
  display: grid;
`;
export const StackedItem = styled.div<{ zIndex?: number }>`
  grid-column: 1;
  grid-row: 1;
  height: 100%;
  z-index: ${({ zIndex }) => zIndex};
`;
export const MediumOnly = styled.div`
  ${({ theme }) => theme.mediaWidth.upToMedium`
    display: none;
  `};
`;
export const HideMedium = styled.div`
  display: none;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    display: block;
  `};
`;

//Review
export const ReviewWrapper = styled.div`
  padding-top: 12px;
`;
