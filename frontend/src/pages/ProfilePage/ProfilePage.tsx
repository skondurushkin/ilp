import { Orders } from './Orders';
import { PageNav } from '../../components/AuthUserRouteLayout';
import { PageSection } from '../../components/PageSection';
import { WalletCard } from '../../components/WalletCard';
import { WalletHistory } from './WalletHistory';
import { useScrollToHash } from '../../components/useScrollToHash';
import { useWalletQuery } from '../../modules/loyalty';

export const ProfilePage = () => {
    const walletQuery = useWalletQuery();

    useScrollToHash();

    return (
        <div>
            <PageNav>
                <ul className="flex items-center gap-4">
                    <li>
                        <a href="#balance">Мой баланс</a>
                    </li>
                    <li>
                        <a href="#balance-history">История баланса</a>
                    </li>
                    <li>
                        <a href="#orders">Мои заказы</a>
                    </li>
                </ul>
            </PageNav>
            <PageSection id="balance">
                {walletQuery.status !== 'success' && <WalletCard skeleton />}
                {walletQuery.status === 'success' && <WalletCard wallet={walletQuery.data} />}
            </PageSection>
            <PageSection id="balance-history" className="mt-6 md:mt-10" caption="История баланса">
                <WalletHistory walletQuery={walletQuery} />
            </PageSection>
            <PageSection id="orders" className="mt-6 md:mt-10" caption="Мои заказы">
                <Orders />
            </PageSection>
        </div>
    );
};
