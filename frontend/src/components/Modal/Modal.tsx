import ReactModal from 'react-modal';
import { ReactNode } from 'react';
import styles from './Modal.module.css';
import { twMerge } from 'tailwind-merge';

export interface PublicModalProps {
    isOpen: boolean;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full-screen';
    className?: string;
    classNameBody?: string;
    close: () => void;
}

export interface ModalProps extends PublicModalProps {
    children: ReactNode;
}

export const Modal = (props: ModalProps) => {
    const { children, isOpen, close, className, size = 'lg' } = props;

    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={() => close()}
            shouldCloseOnOverlayClick={false}
            overlayClassName="z-modal bg-black-transparent-70% fixed left-0 top-0 flex h-screen w-screen  items-center justify-center"
            className={twMerge(
                'fixed top-0 overflow-hidden',
                size && [styles[`content-${size}`]],
                size !== 'full-screen' && [styles.content],
                className,
            )}
        >
            {children}
        </ReactModal>
    );
};

export interface ModalBodyProps {
    className?: string;
    children: ReactNode;
}

export const ModalBody = (props: ModalBodyProps) => {
    const { children, className = 'border border-white bg-black px-12 py-8' } = props;
    return <div className={className}>{children}</div>;
};
