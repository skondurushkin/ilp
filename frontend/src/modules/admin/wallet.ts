export const WRITE_OFFS_ADMIN_PAGE_QUERY_KEY = 'admin.browseWriteOffsAsAdmin';

export const GET_WALLET_HISTORY_FOR_USER_ID_QUERY_KEY_FN = (userId: number) => [
    'admin.getWalletHistoryForUserId',
    userId.toString(),
];
