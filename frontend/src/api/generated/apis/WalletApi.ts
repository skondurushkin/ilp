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
    CreateNewAccrualRequest,
    CreateNewWriteOffRequest,
    PageRequest,
    PaginatedAccrualResponse,
    PaginatedOperationResponse,
    PaginatedWriteOffResponse,
    UpdateWriteOffRequest,
    WalletResponse,
    WriteOffResponse,
    WriteOffUserResponse,
} from '../models';
import {
    AccrualResponseFromJSON,
    AccrualResponseToJSON,
    CreateNewAccrualRequestFromJSON,
    CreateNewAccrualRequestToJSON,
    CreateNewWriteOffRequestFromJSON,
    CreateNewWriteOffRequestToJSON,
    PageRequestFromJSON,
    PageRequestToJSON,
    PaginatedAccrualResponseFromJSON,
    PaginatedAccrualResponseToJSON,
    PaginatedOperationResponseFromJSON,
    PaginatedOperationResponseToJSON,
    PaginatedWriteOffResponseFromJSON,
    PaginatedWriteOffResponseToJSON,
    UpdateWriteOffRequestFromJSON,
    UpdateWriteOffRequestToJSON,
    WalletResponseFromJSON,
    WalletResponseToJSON,
    WriteOffResponseFromJSON,
    WriteOffResponseToJSON,
    WriteOffUserResponseFromJSON,
    WriteOffUserResponseToJSON,
} from '../models';

export interface BrowseAccrualsRequest {
    pageRequest?: PageRequest;
}

export interface BrowseAccrualsForUserIdRequest {
    userId: number;
    pageRequest?: PageRequest;
}

export interface BrowseWriteOffsRequest {
    pageRequest?: PageRequest;
}

export interface BrowseWriteOffsForUserIdRequest {
    userId: number;
    pageRequest?: PageRequest;
}

export interface CreateNewAccrualOperationRequest {
    userId: number;
    createNewAccrualRequest?: CreateNewAccrualRequest;
}

export interface CreateNewWriteOffOperationRequest {
    userId: number;
    createNewWriteOffRequest?: CreateNewWriteOffRequest;
}

export interface GetWalletHistoryRequest {
    pageRequest?: PageRequest;
}

export interface GetWalletHistoryForUserIdRequest {
    userId: number;
    pageRequest?: PageRequest;
}

export interface UpdateWriteOffOperationRequest {
    writeoffId: number;
    updateWriteOffRequest?: UpdateWriteOffRequest;
}

/**
 *
 */
export class WalletApi extends runtime.BaseAPI {
    /**
     * paginated view of accruals of currently logged in user
     */
    async browseAccrualsRaw(
        requestParameters: BrowseAccrualsRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction,
    ): Promise<runtime.ApiResponse<PaginatedAccrualResponse>> {
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
                path: `/api/ilp/wallet/accruals`,
                method: 'POST',
                headers: headerParameters,
                query: queryParameters,
                body: PageRequestToJSON(requestParameters.pageRequest),
            },
            initOverrides,
        );

        return new runtime.JSONApiResponse(response, (jsonValue) => PaginatedAccrualResponseFromJSON(jsonValue));
    }

    /**
     * paginated view of accruals of currently logged in user
     */
    async browseAccruals(
        requestParameters: BrowseAccrualsRequest = {},
        initOverrides?: RequestInit | runtime.InitOverrideFunction,
    ): Promise<PaginatedAccrualResponse> {
        const response = await this.browseAccrualsRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * paginated view of accruals of the user identified by user_id
     */
    async browseAccrualsForUserIdRaw(
        requestParameters: BrowseAccrualsForUserIdRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction,
    ): Promise<runtime.ApiResponse<PaginatedAccrualResponse>> {
        if (requestParameters.userId === null || requestParameters.userId === undefined) {
            throw new runtime.RequiredError(
                'userId',
                'Required parameter requestParameters.userId was null or undefined when calling browseAccrualsForUserId.',
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
                path: `/api/ilp/wallet/accruals/{user_id}`.replace(
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

        return new runtime.JSONApiResponse(response, (jsonValue) => PaginatedAccrualResponseFromJSON(jsonValue));
    }

    /**
     * paginated view of accruals of the user identified by user_id
     */
    async browseAccrualsForUserId(
        requestParameters: BrowseAccrualsForUserIdRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction,
    ): Promise<PaginatedAccrualResponse> {
        const response = await this.browseAccrualsForUserIdRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * paginated view of write-offs of currently logged in user
     */
    async browseWriteOffsRaw(
        requestParameters: BrowseWriteOffsRequest,
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
                path: `/api/ilp/wallet/write-offs`,
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
     * paginated view of write-offs of currently logged in user
     */
    async browseWriteOffs(
        requestParameters: BrowseWriteOffsRequest = {},
        initOverrides?: RequestInit | runtime.InitOverrideFunction,
    ): Promise<PaginatedWriteOffResponse> {
        const response = await this.browseWriteOffsRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * paginated view of write-offs of the user identified by user_id
     */
    async browseWriteOffsForUserIdRaw(
        requestParameters: BrowseWriteOffsForUserIdRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction,
    ): Promise<runtime.ApiResponse<PaginatedWriteOffResponse>> {
        if (requestParameters.userId === null || requestParameters.userId === undefined) {
            throw new runtime.RequiredError(
                'userId',
                'Required parameter requestParameters.userId was null or undefined when calling browseWriteOffsForUserId.',
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
                path: `/api/ilp/wallet/write-offs/{user_id}`.replace(
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
    async browseWriteOffsForUserId(
        requestParameters: BrowseWriteOffsForUserIdRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction,
    ): Promise<PaginatedWriteOffResponse> {
        const response = await this.browseWriteOffsForUserIdRaw(requestParameters, initOverrides);
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
                path: `/api/ilp/wallet/accrual/{user_id}`.replace(
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
     * create new write-off for user identified by user_id
     */
    async createNewWriteOffRaw(
        requestParameters: CreateNewWriteOffOperationRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction,
    ): Promise<runtime.ApiResponse<WriteOffUserResponse>> {
        if (requestParameters.userId === null || requestParameters.userId === undefined) {
            throw new runtime.RequiredError(
                'userId',
                'Required parameter requestParameters.userId was null or undefined when calling createNewWriteOff.',
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
                path: `/api/ilp/wallet/write-off/{user_id}`.replace(
                    `{${'user_id'}}`,
                    encodeURIComponent(String(requestParameters.userId)),
                ),
                method: 'POST',
                headers: headerParameters,
                query: queryParameters,
                body: CreateNewWriteOffRequestToJSON(requestParameters.createNewWriteOffRequest),
            },
            initOverrides,
        );

        return new runtime.JSONApiResponse(response, (jsonValue) => WriteOffUserResponseFromJSON(jsonValue));
    }

    /**
     * create new write-off for user identified by user_id
     */
    async createNewWriteOff(
        requestParameters: CreateNewWriteOffOperationRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction,
    ): Promise<WriteOffUserResponse> {
        const response = await this.createNewWriteOffRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * get history of operations of the currently logged in user
     */
    async getWalletHistoryRaw(
        requestParameters: GetWalletHistoryRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction,
    ): Promise<runtime.ApiResponse<PaginatedOperationResponse>> {
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
                path: `/api/ilp/wallet/history`,
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
     * get history of operations of the currently logged in user
     */
    async getWalletHistory(
        requestParameters: GetWalletHistoryRequest = {},
        initOverrides?: RequestInit | runtime.InitOverrideFunction,
    ): Promise<PaginatedOperationResponse> {
        const response = await this.getWalletHistoryRaw(requestParameters, initOverrides);
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
                path: `/api/ilp/wallet/history/{user_id}`.replace(
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
     * get overview of the wallet state of currently logged in user
     */
    async getWalletOverviewRaw(
        initOverrides?: RequestInit | runtime.InitOverrideFunction,
    ): Promise<runtime.ApiResponse<WalletResponse>> {
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
                path: `/api/ilp/wallet/overview`,
                method: 'GET',
                headers: headerParameters,
                query: queryParameters,
            },
            initOverrides,
        );

        return new runtime.JSONApiResponse(response, (jsonValue) => WalletResponseFromJSON(jsonValue));
    }

    /**
     * get overview of the wallet state of currently logged in user
     */
    async getWalletOverview(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<WalletResponse> {
        const response = await this.getWalletOverviewRaw(initOverrides);
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
                path: `/api/ilp/wallet/write-off/{writeoff_id}`.replace(
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
