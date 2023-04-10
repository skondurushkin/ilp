import { ButtonSkeleton, SkeletonContainer } from './Skeleton';
import { ReactElement, useState } from 'react';

import { ArticleResponse } from '../api';
import { Button } from './Button';
import Modal from './Modal';
import { plural } from '../utils/plural';
import { useCreateOrderMutation } from '../modules/loyalty';

export interface CreateOrderButtonProps {
    product: ArticleResponse;
    availability: ProductAvailability;
}

export type ProductAvailability = 'not-available' | 'no-tokens' | 'available' | 'processing';

export function CreateOrderButton(props: CreateOrderButtonProps): ReactElement {
    const { product, availability } = props;

    const [modalVisible, setModalVisible] = useState(false);
    const mutation = useCreateOrderMutation();

    if (availability === 'processing') {
        return (
            <SkeletonContainer>
                <ButtonSkeleton />
            </SkeletonContainer>
        );
    }

    if (availability === 'not-available') {
        return <Button disabled>Нет в наличии</Button>;
    }

    if (availability === 'no-tokens') {
        return <Button disabled>Недостаточно вольт</Button>;
    }

    return (
        <>
            <Button primary onClick={() => setModalVisible(true)}>
                Заказать
            </Button>
            <Modal id="CreateOrderModal" isOpen={modalVisible} closeModal={() => setModalVisible(false)} size="sm">
                {modalVisible && (
                    <Modal.Body>
                        <OrderConfirmation
                            product={product}
                            onConfirm={() => {
                                setModalVisible(false);
                                mutation.mutate(product);
                            }}
                            onCancel={() => setModalVisible(false)}
                        />
                    </Modal.Body>
                )}
            </Modal>
        </>
    );
}

interface OrderConfirmationProps {
    product: ArticleResponse;
    onConfirm: () => void;
    onCancel: () => void;
}

function OrderConfirmation(props: OrderConfirmationProps): ReactElement {
    const { product, onConfirm, onCancel } = props;
    return (
        <div className="flex flex-col sm:items-center sm:text-center">
            <div className="text-h2">Подтверждаете приобретение?</div>
            <div className="text mt-6 md:mt-8">
                С вашего баланса будет {plural(product.price, ['списан', 'списано', 'списано'])} {product.price}{' '}
                {plural(product.price, ['вольт', 'вольта', 'вольт'])}.
            </div>
            <div className="mt-6 flex flex-col gap-4 sm:w-1/2 sm:flex-row md:mt-8 md:w-full md:gap-6 md:px-12">
                <Button className="sm:grow" primary onClick={onConfirm}>
                    Да, заказать
                </Button>
                <Button className="sm:grow" onClick={onCancel}>
                    Нет, отменить
                </Button>
            </div>
        </div>
    );
}
