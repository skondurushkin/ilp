/* tslint:disable */
/* eslint-disable */
/**
 * ILP API
 * Internal Loyalty Program API Specification
 *
 * The version of the OpenAPI document: 1.0.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import * as runtime from '../runtime';

import type {
    AccrualResponse,
    BalancePeriodRequest,
    BalanceStatisticResponseInner,
    BrowseStatisticArticlesRequest,
    CancelAccrualBody,
    CreateNewAccrualRequest,
    ErrorMessage,
    PageRequest,
    PaginatedActivitiesStatisticResponse,
    PaginatedActivityResponse,
    PaginatedArticleResponse,
    PaginatedArticleStatisticResponse,
    PaginatedOperationResponse,
    PaginatedProfileResponse,
    PaginatedWriteOffResponse,
    ProfileResponseForAdmin,
    UpdateWriteOffRequest,
    UsersPeriodRequest,
    UsersStatisticResponse,
    WriteOffResponse,
} from '../models';
import {
    AccrualResponseFromJSON,
    AccrualResponseToJSON,
    BalancePeriodRequestFromJSON,
    BalancePeriodRequestToJSON,
    BalanceStatisticResponseInnerFromJSON,
    BalanceStatisticResponseInnerToJSON,
    BrowseStatisticArticlesRequestFromJSON,
    BrowseStatisticArticlesRequestToJSON,
    CancelAccrualBodyFromJSON,
    CancelAccrualBodyToJSON,
    CreateNewAccrualRequestFromJSON,
    CreateNewAccrualRequestToJSON,
    ErrorMessageFromJSON,
    ErrorMessageToJSON,
    PageRequestFromJSON,
    PageRequestToJSON,
    PaginatedActivitiesStatisticResponseFromJSON,
    PaginatedActivitiesStatisticResponseToJSON,
    PaginatedActivityResponseFromJSON,
    PaginatedActivityResponseToJSON,
    PaginatedArticleResponseFromJSON,
    PaginatedArticleResponseToJSON,
    PaginatedArticleStatisticResponseFromJSON,
    PaginatedArticleStatisticResponseToJSON,
    PaginatedOperationResponseFromJSON,
    PaginatedOperationResponseToJSON,
    PaginatedProfileResponseFromJSON,
    PaginatedProfileResponseToJSON,
    PaginatedWriteOffResponseFromJSON,
    PaginatedWriteOffResponseToJSON,
    ProfileResponseForAdminFromJSON,
    ProfileResponseForAdminToJSON,
    UpdateWriteOffRequestFromJSON,
    UpdateWriteOffRequestToJSON,
    UsersPeriodRequestFromJSON,
    UsersPeriodRequestToJSON,
    UsersStatisticResponseFromJSON,
    UsersStatisticResponseToJSON,
    WriteOffResponseFromJSON,
    WriteOffResponseToJSON,
} from '../models';

export interface BrowseActivitiesAsAdminRequest {
    pageRequest?: PageRequest;
}

export interface BrowseArticlesForAdminRequest {
    pageRequest: PageRequest;
}

export interface BrowseStatisticActivitiesRequest {
    browseStatisticArticlesRequest: BrowseStatisticArticlesRequest;
}

export interface BrowseStatisticArticlesOperationRequest {
    browseStatisticArticlesRequest: BrowseStatisticArticlesRequest;
}

export interface BrowseStatisticBalanceRequest {
    balancePeriodRequest?: BalancePeriodRequest;
}

export interface BrowseStatisticUsersRequest {
    usersPeriodRequest?: UsersPeriodRequest;
}

export interface BrowseWriteOffsAsAdminRequest {
    pageRequest?: PageRequest;
}

export interface BrowseWriteOffsForUserIdAsAdminRequest {
    userId: number;
    pageRequest?: PageRequest;
}

export interface CancelAccrualForUserRequest {
    userId: number;
    cancelAccrualBody: CancelAccrualBody;
}

export interface CreateNewAccrualOperationRequest {
    userId: number;
    createNewAccrualRequest?: CreateNewAccrualRequest;
}

export interface GetProfileByIdAsAdminRequest {
    userId: number;
}

export interface GetWalletHistoryForUserIdRequest {
    userId: number;
    pageRequest?: PageRequest;
}

export interface GetWriteOffRequest {
    writeoffId: number;
}

export interface SearchProfileAsAdminRequest {
    searchKey: string;
    pageSize: number;
    page: number;
}

export interface UpdateWriteOffOperationRequest {
    writeoffId: number;
    updateWriteOffRequest: UpdateWriteOffRequest;
}

/**
 *
 */
export class AdminApi extends runtime.BaseAPI {
    /**
     * paginated activities view
     */
    async browseActivitiesAsAdminRaw(
        requestParameters: BrowseActivitiesAsAdminRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction,
    ): Promise<runtime.ApiResponse<PaginatedActivityResponse>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token('bearerAuth', []);

            if (tokenString) {
                headerParameters['Authorization'] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request(
            {
                path: `/api/ilp/admin/activities`,
                method: 'POST',
                headers: headerParameters,
                query: queryParameters,
                body: PageRequestToJSON(requestParameters.pageRequest),
            },
            initOverrides,
        );

        return new runtime.JSONApiResponse(response, (jsonValue) => PaginatedActivityResponseFromJSON(jsonValue));
    }

    /**
     * paginated activities view
     */
    async browseActivitiesAsAdmin(
        requestParameters: BrowseActivitiesAsAdminRequest = {},
        initOverrides?: RequestInit | runtime.InitOverrideFunction,
    ): Promise<PaginatedActivityResponse> {
        const response = await this.browseActivitiesAsAdminRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * paginated articles view
     */
    async browseArticlesForAdminRaw(
        requestParameters: BrowseArticlesForAdminRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction,
    ): Promise<runtime.ApiResponse<PaginatedArticleResponse>> {
        if (requestParameters.pageRequest === null || requestParameters.pageRequest === undefined) {
            throw new runtime.RequiredError(
                'pageRequest',
                'Required parameter requestParameters.pageRequest was null or undefined when calling browseArticlesForAdmin.',
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token('bearerAuth', []);

            if (tokenString) {
                headerParameters['Authorization'] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request(
            {
                path: `/api/ilp/admin/articles`,
                method: 'POST',
                headers: headerParameters,
                query: queryParameters,
                body: PageRequestToJSON(requestParameters.pageRequest),
            },
            initOverrides,
        );

        return new runtime.JSONApiResponse(response, (jsonValue) => PaginatedArticleResponseFromJSON(jsonValue));
    }

    /**
     * paginated articles view
     */
    async browseArticlesForAdmin(
        requestParameters: BrowseArticlesForAdminRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction,
    ): Promise<PaginatedArticleResponse> {
        const response = await this.browseArticlesForAdminRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * activities statistics for admin
     */
    async browseStatisticActivitiesRaw(
        requestParameters: BrowseStatisticActivitiesRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction,
    ): Promise<runtime.ApiResponse<PaginatedActivitiesStatisticResponse>> {
        if (
            requestParameters.browseStatisticArticlesRequest === null ||
            requestParameters.browseStatisticArticlesRequest === undefined
        ) {
            throw new runtime.RequiredError(
                'browseStatisticArticlesRequest',
                'Required parameter requestParameters.browseStatisticArticlesRequest was null or undefined when calling browseStatisticActivities.',
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token('bearerAuth', []);

            if (tokenString) {
                headerParameters['Authorization'] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request(
            {
                path: `/api/ilp/admin/statistic/activities`,
                method: 'POST',
                headers: headerParameters,
                query: queryParameters,
                body: BrowseStatisticArticlesRequestToJSON(requestParameters.browseStatisticArticlesRequest),
            },
            initOverrides,
        );

        return new runtime.JSONApiResponse(response, (jsonValue) =>
            PaginatedActivitiesStatisticResponseFromJSON(jsonValue),
        );
    }

    /**
     * activities statistics for admin
     */
    async browseStatisticActivities(
        requestParameters: BrowseStatisticActivitiesRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction,
    ): Promise<PaginatedActivitiesStatisticResponse> {
        const response = await this.browseStatisticActivitiesRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * articles statistics for admin
     */
    async browseStatisticArticlesRaw(
        requestParameters: BrowseStatisticArticlesOperationRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction,
    ): Promise<runtime.ApiResponse<PaginatedArticleStatisticResponse>> {
        if (
            requestParameters.browseStatisticArticlesRequest === null ||
            requestParameters.browseStatisticArticlesRequest === undefined
        ) {
            throw new runtime.RequiredError(
                'browseStatisticArticlesRequest',
                'Required parameter requestParameters.browseStatisticArticlesRequest was null or undefined when calling browseStatisticArticles.',
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token('bearerAuth', []);

            if (tokenString) {
                headerParameters['Authorization'] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request(
            {
                path: `/api/ilp/admin/statistic/articles`,
                method: 'POST',
                headers: headerParameters,
                query: queryParameters,
                body: BrowseStatisticArticlesRequestToJSON(requestParameters.browseStatisticArticlesRequest),
            },
            initOverrides,
        );

        return new runtime.JSONApiResponse(response, (jsonValue) =>
            PaginatedArticleStatisticResponseFromJSON(jsonValue),
        );
    }

    /**
     * articles statistics for admin
     */
    async browseStatisticArticles(
        requestParameters: BrowseStatisticArticlesOperationRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction,
    ): Promise<PaginatedArticleStatisticResponse> {
        const response = await this.browseStatisticArticlesRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * balance accrual and write-off statistics for admin
     */
    async browseStatisticBalanceRaw(
        requestParameters: BrowseStatisticBalanceRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction,
    ): Promise<runtime.ApiResponse<Array<BalanceStatisticResponseInner>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token('bearerAuth', []);

            if (tokenString) {
                headerParameters['Authorization'] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request(
            {
                path: `/api/ilp/admin/statistic/balance`,
                method: 'POST',
                headers: headerParameters,
                query: queryParameters,
                body: BalancePeriodRequestToJSON(requestParameters.balancePeriodRequest),
            },
            initOverrides,
        );

        return new runtime.JSONApiResponse(response, (jsonValue) =>
            jsonValue.map(BalanceStatisticResponseInnerFromJSON),
        );
    }

    /**
     * balance accrual and write-off statistics for admin
     */
    async browseStatisticBalance(
        requestParameters: BrowseStatisticBalanceRequest = {},
        initOverrides?: RequestInit | runtime.InitOverrideFunction,
    ): Promise<Array<BalanceStatisticResponseInner>> {
        const response = await this.browseStatisticBalanceRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * users log-in statistics for admin
     */
    async browseStatisticUsersRaw(
        requestParameters: BrowseStatisticUsersRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction,
    ): Promise<runtime.ApiResponse<UsersStatisticResponse>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token('bearerAuth', []);

            if (tokenString) {
                headerParameters['Authorization'] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request(
            {
                path: `/api/ilp/admin/statistic/users`,
                method: 'POST',
                headers: headerParameters,
                query: queryParameters,
                body: UsersPeriodRequestToJSON(requestParameters.usersPeriodRequest),
            },
            initOverrides,
        );

        return new runtime.JSONApiResponse(response, (jsonValue) => UsersStatisticResponseFromJSON(jsonValue));
    }

    /**
     * users log-in statistics for admin
     */
    async browseStatisticUsers(
        requestParameters: BrowseStatisticUsersRequest = {},
        initOverrides?: RequestInit | runtime.InitOverrideFunction,
    ): Promise<UsersStatisticResponse> {
        const response = await this.browseStatisticUsersRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * paginated view of write-offs for admin
     */
    async browseWriteOffsAsAdminRaw(
        requestParameters: BrowseWriteOffsAsAdminRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction,
    ): Promise<runtime.ApiResponse<PaginatedWriteOffResponse>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token('bearerAuth', []);

            if (tokenString) {
                headerParameters['Authorization'] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request(
            {
                path: `/api/ilp/admin/wallet/write-offs`,
                method: 'POST',
                headers: headerParameters,
                query: queryParameters,
                body: PageRequestToJSON(requestParameters.pageRequest),
            },
            initOverrides,
        );

        return new runtime.JSONApiResponse(response, (jsonValue) => PaginatedWriteOffResponseFromJSON(jsonValue));
    }

    /**
     * paginated view of write-offs for admin
     */
    async browseWriteOffsAsAdmin(
        requestParameters: BrowseWriteOffsAsAdminRequest = {},
        initOverrides?: RequestInit | runtime.InitOverrideFunction,
    ): Promise<PaginatedWriteOffResponse> {
        const response = await this.browseWriteOffsAsAdminRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * paginated view of write-offs of the user identified by user_id
     */
    async browseWriteOffsForUserIdAsAdminRaw(
        requestParameters: BrowseWriteOffsForUserIdAsAdminRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction,
    ): Promise<runtime.ApiResponse<PaginatedWriteOffResponse>> {
        if (requestParameters.userId === null || requestParameters.userId === undefined) {
            throw new runtime.RequiredError(
                'userId',
                'Required parameter requestParameters.userId was null or undefined when calling browseWriteOffsForUserIdAsAdmin.',
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token('bearerAuth', []);

            if (tokenString) {
                headerParameters['Authorization'] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request(
            {
                path: `/api/ilp/admin/wallet/write-offs/{user_id}`.replace(
                    `{${'user_id'}}`,
                    encodeURIComponent(String(requestParameters.userId)),
                ),
                method: 'POST',
                headers: headerParameters,
                query: queryParameters,
                body: PageRequestToJSON(requestParameters.pageRequest),
            },
            initOverrides,
        );

        return new runtime.JSONApiResponse(response, (jsonValue) => PaginatedWriteOffResponseFromJSON(jsonValue));
    }

    /**
     * paginated view of write-offs of the user identified by user_id
     */
    async browseWriteOffsForUserIdAsAdmin(
        requestParameters: BrowseWriteOffsForUserIdAsAdminRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction,
    ): Promise<PaginatedWriteOffResponse> {
        const response = await this.browseWriteOffsForUserIdAsAdminRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * cancel accrual for user identified by user_id
     */
    async cancelAccrualForUserRaw(
        requestParameters: CancelAccrualForUserRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction,
    ): Promise<runtime.ApiResponse<AccrualResponse>> {
        if (requestParameters.userId === null || requestParameters.userId === undefined) {
            throw new runtime.RequiredError(
                'userId',
                'Required parameter requestParameters.userId was null or undefined when calling cancelAccrualForUser.',
            );
        }

        if (requestParameters.cancelAccrualBody === null || requestParameters.cancelAccrualBody === undefined) {
            throw new runtime.RequiredError(
                'cancelAccrualBody',
                'Required parameter requestParameters.cancelAccrualBody was null or undefined when calling cancelAccrualForUser.',
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token('bearerAuth', []);

            if (tokenString) {
                headerParameters['Authorization'] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request(
            {
                path: `/api/ilp/admin/wallet/accrual/{user_id}/cancel`.replace(
                    `{${'user_id'}}`,
                    encodeURIComponent(String(requestParameters.userId)),
                ),
                method: 'POST',
                headers: headerParameters,
                query: queryParameters,
                body: CancelAccrualBodyToJSON(requestParameters.cancelAccrualBody),
            },
            initOverrides,
        );

        return new runtime.JSONApiResponse(response, (jsonValue) => AccrualResponseFromJSON(jsonValue));
    }

    /**
     * cancel accrual for user identified by user_id
     */
    async cancelAccrualForUser(
        requestParameters: CancelAccrualForUserRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction,
    ): Promise<AccrualResponse> {
        const response = await this.cancelAccrualForUserRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * create new accrual for user identified by user_id
     */
    async createNewAccrualRaw(
        requestParameters: CreateNewAccrualOperationRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction,
    ): Promise<runtime.ApiResponse<AccrualResponse>> {
        if (requestParameters.userId === null || requestParameters.userId === undefined) {
            throw new runtime.RequiredError(
                'userId',
                'Required parameter requestParameters.userId was null or undefined when calling createNewAccrual.',
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token('bearerAuth', []);

            if (tokenString) {
                headerParameters['Authorization'] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request(
            {
                path: `/api/ilp/admin/wallet/accrual/{user_id}`.replace(
                    `{${'user_id'}}`,
                    encodeURIComponent(String(requestParameters.userId)),
                ),
                method: 'POST',
                headers: headerParameters,
                query: queryParameters,
                body: CreateNewAccrualRequestToJSON(requestParameters.createNewAccrualRequest),
            },
            initOverrides,
        );

        return new runtime.JSONApiResponse(response, (jsonValue) => AccrualResponseFromJSON(jsonValue));
    }

    /**
     * create new accrual for user identified by user_id
     */
    async createNewAccrual(
        requestParameters: CreateNewAccrualOperationRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction,
    ): Promise<AccrualResponse> {
        const response = await this.createNewAccrualRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Выгрузить движение вольт в CSV
     */
    async downloadBalanceCsvRaw(
        initOverrides?: RequestInit | runtime.InitOverrideFunction,
    ): Promise<runtime.ApiResponse<string>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token('bearerAuth', []);

            if (tokenString) {
                headerParameters['Authorization'] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request(
            {
                path: `/api/ilp/admin/statistic/balance/csv`,
                method: 'GET',
                headers: headerParameters,
                query: queryParameters,
            },
            initOverrides,
        );

        return new runtime.TextApiResponse(response) as any;
    }

    /**
     * Выгрузить движение вольт в CSV
     */
    async downloadBalanceCsv(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        const response = await this.downloadBalanceCsvRaw(initOverrides);
        return await response.value();
    }

    /**
     * Выгрузить заказы в CSV
     */
    async downloadWriteOffsCsvRaw(
        initOverrides?: RequestInit | runtime.InitOverrideFunction,
    ): Promise<runtime.ApiResponse<string>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token('bearerAuth', []);

            if (tokenString) {
                headerParameters['Authorization'] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request(
            {
                path: `/api/ilp/admin/wallet/write-offs/csv`,
                method: 'GET',
                headers: headerParameters,
                query: queryParameters,
            },
            initOverrides,
        );

        return new runtime.TextApiResponse(response) as any;
    }

    /**
     * Выгрузить заказы в CSV
     */
    async downloadWriteOffsCsv(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        const response = await this.downloadWriteOffsCsvRaw(initOverrides);
        return await response.value();
    }

    /**
     * get user profile by user id
     */
    async getProfileByIdAsAdminRaw(
        requestParameters: GetProfileByIdAsAdminRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction,
    ): Promise<runtime.ApiResponse<ProfileResponseForAdmin>> {
        if (requestParameters.userId === null || requestParameters.userId === undefined) {
            throw new runtime.RequiredError(
                'userId',
                'Required parameter requestParameters.userId was null or undefined when calling getProfileByIdAsAdmin.',
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token('bearerAuth', []);

            if (tokenString) {
                headerParameters['Authorization'] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request(
            {
                path: `/api/ilp/admin/profile/{user_id}`.replace(
                    `{${'user_id'}}`,
                    encodeURIComponent(String(requestParameters.userId)),
                ),
                method: 'GET',
                headers: headerParameters,
                query: queryParameters,
            },
            initOverrides,
        );

        return new runtime.JSONApiResponse(response, (jsonValue) => ProfileResponseForAdminFromJSON(jsonValue));
    }

    /**
     * get user profile by user id
     */
    async getProfileByIdAsAdmin(
        requestParameters: GetProfileByIdAsAdminRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction,
    ): Promise<ProfileResponseForAdmin> {
        const response = await this.getProfileByIdAsAdminRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * get history of operations of the user identified by user_id
     */
    async getWalletHistoryForUserIdRaw(
        requestParameters: GetWalletHistoryForUserIdRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction,
    ): Promise<runtime.ApiResponse<PaginatedOperationResponse>> {
        if (requestParameters.userId === null || requestParameters.userId === undefined) {
            throw new runtime.RequiredError(
                'userId',
                'Required parameter requestParameters.userId was null or undefined when calling getWalletHistoryForUserId.',
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token('bearerAuth', []);

            if (tokenString) {
                headerParameters['Authorization'] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request(
            {
                path: `/api/ilp/admin/wallet/history/{user_id}`.replace(
                    `{${'user_id'}}`,
                    encodeURIComponent(String(requestParameters.userId)),
                ),
                method: 'POST',
                headers: headerParameters,
                query: queryParameters,
                body: PageRequestToJSON(requestParameters.pageRequest),
            },
            initOverrides,
        );

        return new runtime.JSONApiResponse(response, (jsonValue) => PaginatedOperationResponseFromJSON(jsonValue));
    }

    /**
     * get history of operations of the user identified by user_id
     */
    async getWalletHistoryForUserId(
        requestParameters: GetWalletHistoryForUserIdRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction,
    ): Promise<PaginatedOperationResponse> {
        const response = await this.getWalletHistoryForUserIdRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * get the write-off record identified by writeoff_id
     */
    async getWriteOffRaw(
        requestParameters: GetWriteOffRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction,
    ): Promise<runtime.ApiResponse<WriteOffResponse>> {
        if (requestParameters.writeoffId === null || requestParameters.writeoffId === undefined) {
            throw new runtime.RequiredError(
                'writeoffId',
                'Required parameter requestParameters.writeoffId was null or undefined when calling getWriteOff.',
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token('bearerAuth', []);

            if (tokenString) {
                headerParameters['Authorization'] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request(
            {
                path: `/api/ilp/admin/wallet/write-off/{writeoff_id}`.replace(
                    `{${'writeoff_id'}}`,
                    encodeURIComponent(String(requestParameters.writeoffId)),
                ),
                method: 'GET',
                headers: headerParameters,
                query: queryParameters,
            },
            initOverrides,
        );

        return new runtime.JSONApiResponse(response, (jsonValue) => WriteOffResponseFromJSON(jsonValue));
    }

    /**
     * get the write-off record identified by writeoff_id
     */
    async getWriteOff(
        requestParameters: GetWriteOffRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction,
    ): Promise<WriteOffResponse> {
        const response = await this.getWriteOffRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * search for profile
     */
    async searchProfileAsAdminRaw(
        requestParameters: SearchProfileAsAdminRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction,
    ): Promise<runtime.ApiResponse<PaginatedProfileResponse>> {
        if (requestParameters.searchKey === null || requestParameters.searchKey === undefined) {
            throw new runtime.RequiredError(
                'searchKey',
                'Required parameter requestParameters.searchKey was null or undefined when calling searchProfileAsAdmin.',
            );
        }

        if (requestParameters.pageSize === null || requestParameters.pageSize === undefined) {
            throw new runtime.RequiredError(
                'pageSize',
                'Required parameter requestParameters.pageSize was null or undefined when calling searchProfileAsAdmin.',
            );
        }

        if (requestParameters.page === null || requestParameters.page === undefined) {
            throw new runtime.RequiredError(
                'page',
                'Required parameter requestParameters.page was null or undefined when calling searchProfileAsAdmin.',
            );
        }

        const queryParameters: any = {};

        if (requestParameters.searchKey !== undefined) {
            queryParameters['search_key'] = requestParameters.searchKey;
        }

        if (requestParameters.pageSize !== undefined) {
            queryParameters['pageSize'] = requestParameters.pageSize;
        }

        if (requestParameters.page !== undefined) {
            queryParameters['page'] = requestParameters.page;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token('bearerAuth', []);

            if (tokenString) {
                headerParameters['Authorization'] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request(
            {
                path: `/api/ilp/admin/profile/search`,
                method: 'GET',
                headers: headerParameters,
                query: queryParameters,
            },
            initOverrides,
        );

        return new runtime.JSONApiResponse(response, (jsonValue) => PaginatedProfileResponseFromJSON(jsonValue));
    }

    /**
     * search for profile
     */
    async searchProfileAsAdmin(
        requestParameters: SearchProfileAsAdminRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction,
    ): Promise<PaginatedProfileResponse> {
        const response = await this.searchProfileAsAdminRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * change status of the write-off identified by writeoff_id
     */
    async updateWriteOffRaw(
        requestParameters: UpdateWriteOffOperationRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction,
    ): Promise<runtime.ApiResponse<WriteOffResponse>> {
        if (requestParameters.writeoffId === null || requestParameters.writeoffId === undefined) {
            throw new runtime.RequiredError(
                'writeoffId',
                'Required parameter requestParameters.writeoffId was null or undefined when calling updateWriteOff.',
            );
        }

        if (requestParameters.updateWriteOffRequest === null || requestParameters.updateWriteOffRequest === undefined) {
            throw new runtime.RequiredError(
                'updateWriteOffRequest',
                'Required parameter requestParameters.updateWriteOffRequest was null or undefined when calling updateWriteOff.',
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token('bearerAuth', []);

            if (tokenString) {
                headerParameters['Authorization'] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request(
            {
                path: `/api/ilp/admin/wallet/write-off/{writeoff_id}`.replace(
                    `{${'writeoff_id'}}`,
                    encodeURIComponent(String(requestParameters.writeoffId)),
                ),
                method: 'PATCH',
                headers: headerParameters,
                query: queryParameters,
                body: UpdateWriteOffRequestToJSON(requestParameters.updateWriteOffRequest),
            },
            initOverrides,
        );

        return new runtime.JSONApiResponse(response, (jsonValue) => WriteOffResponseFromJSON(jsonValue));
    }

    /**
     * change status of the write-off identified by writeoff_id
     */
    async updateWriteOff(
        requestParameters: UpdateWriteOffOperationRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction,
    ): Promise<WriteOffResponse> {
        const response = await this.updateWriteOffRaw(requestParameters, initOverrides);
        return await response.value();
    }
}
