import { ChainId } from '@uniswap/sdk';
import React from 'react';
import { Box, Button, CircularProgress } from '@material-ui/core';
import { CustomModal } from 'components';
import { ReactComponent as CloseIcon } from 'assets/images/CloseIcon.svg';
import { ReactComponent as TransactionFailed } from 'assets/images/TransactionFailed.svg';
import { ReactComponent as TransactionSuccess } from 'assets/images/TransactionSuccess.svg';
import { getEtherscanLink } from 'utils';
import { useActiveWeb3React } from 'hooks';
import ModalBg from 'assets/images/ModalBG.svg';
import 'components/styles/TransactionConfirmationModal.scss';

interface ConfirmationPendingContentProps {
  onDismiss: () => void;
  pendingText: string;
}

export const ConfirmationPendingContent: React.FC<ConfirmationPendingContentProps> = ({
  onDismiss,
  pendingText,
}) => {
  return (
    <Box padding={4}>
      <Box className='txModalHeader'>
        <CloseIcon onClick={onDismiss} />
      </Box>
      <Box className='txModalContent'>
        <Box my={4} display='flex' justifyContent='center'>
          <CircularProgress size={80} />
        </Box>
        <h5>Waiting For Confirmation</h5>
        <p>{pendingText}</p>
        <span>Please confirm this transaction in your wallet.</span>
      </Box>
    </Box>
  );
};

interface TransactionSubmittedContentProps {
  onDismiss: () => void;
  hash: string | undefined;
  chainId: ChainId;
  txPending?: boolean;
  modalContent: string;
}

export const TransactionSubmittedContent: React.FC<TransactionSubmittedContentProps> = ({
  onDismiss,
  chainId,
  hash,
  txPending,
  modalContent,
}) => {
  return (
    <Box padding={4}>
      <Box className='txModalHeader'>
        <h5>Transaction {txPending ? 'Submitted' : 'Completed'}</h5>
        <CloseIcon onClick={onDismiss} />
      </Box>
      {!txPending && (
        <Box mt={8} display='flex' justifyContent='center'>
          <TransactionSuccess />
        </Box>
      )}
      <Box className='txModalContent'>
        <p>{modalContent}</p>
      </Box>
      <Box display='flex' justifyContent='space-between' mt={2}>
        {chainId && hash && (
          <a
            href={getEtherscanLink(chainId, hash, 'transaction')}
            target='_blank'
            rel='noopener noreferrer'
            style={{ width: '48%', textDecoration: 'none' }}
          >
            <Button className='txSubmitButton'>View on Block Explorer</Button>
          </a>
        )}
        <Button
          className='txSubmitButton'
          style={{ width: '48%' }}
          onClick={onDismiss}
        >
          Close
        </Button>
      </Box>
    </Box>
  );
};

interface ConfirmationModalContentProps {
  title: string;
  onDismiss: () => void;
  content: () => React.ReactNode;
}

export const ConfirmationModalContent: React.FC<ConfirmationModalContentProps> = ({
  title,
  onDismiss,
  content,
}) => {
  return (
    <Box padding={4}>
      <Box className='txModalHeader'>
        <h5>{title}</h5>
        <CloseIcon onClick={onDismiss} />
      </Box>
      {content()}
    </Box>
  );
};

interface TransactionErrorContentProps {
  message: string;
  onDismiss: () => void;
}

export const TransactionErrorContent: React.FC<TransactionErrorContentProps> = ({
  message,
  onDismiss,
}) => {
  return (
    <Box padding={4}>
      <Box>
        <Box className='txModalHeader'>
          <h5 className='text-error'>Error!</h5>
          <CloseIcon onClick={onDismiss} />
        </Box>
        <Box className='txModalContent'>
          <TransactionFailed />
          <p>{message}</p>
        </Box>
      </Box>
      <Button className='txSubmitButton' onClick={onDismiss}>
        Dismiss
      </Button>
    </Box>
  );
};

interface ConfirmationModalProps {
  isOpen: boolean;
  onDismiss: () => void;
  hash: string | undefined;
  content: () => React.ReactNode;
  attemptingTxn: boolean;
  pendingText: string;
  modalContent: string;
  txPending?: boolean;
}

const TransactionConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onDismiss,
  attemptingTxn,
  txPending,
  hash,
  pendingText,
  content,
  modalContent,
}) => {
  const { chainId } = useActiveWeb3React();

  if (!chainId) return null;

  // confirmation screen
  return (
    <CustomModal open={isOpen} onClose={onDismiss}>
      <img src={ModalBg} alt='Modal Back' className='txModalBG' />
      <Box position='relative' zIndex={2}>
        {attemptingTxn ? (
          <ConfirmationPendingContent
            onDismiss={onDismiss}
            pendingText={pendingText}
          />
        ) : hash ? (
          <TransactionSubmittedContent
            chainId={chainId}
            txPending={txPending}
            hash={hash}
            onDismiss={onDismiss}
            modalContent={modalContent}
          />
        ) : (
          content()
        )}
      </Box>
    </CustomModal>
  );
};

export default TransactionConfirmationModal;
