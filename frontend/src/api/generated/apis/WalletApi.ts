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
    BrowseWriteOffsRequest,
    PageRequest,
    PaginatedAccrualResponse,
    PaginatedOperationResponse,
    PaginatedWriteOffResponse,
    WalletResponse,
    WriteOffRequest,
    WriteOffResponse,
} from '../models';
import {
    AccrualResponseFromJSON,
    AccrualResponseToJSON,
    BrowseWriteOffsRequestFromJSON,
    BrowseWriteOffsRequestToJSON,
    PageRequestFromJSON,
    PageRequestToJSON,
    PaginatedAccrualResponseFromJSON,
    PaginatedAccrualResponseToJSON,
    PaginatedOperationResponseFromJSON,
    PaginatedOperationResponseToJSON,
    PaginatedWriteOffResponseFromJSON,
    PaginatedWriteOffResponseToJSON,
    WalletResponseFromJSON,
    WalletResponseToJSON,
    WriteOffRequestFromJSON,
    WriteOffRequestToJSON,
    WriteOffResponseFromJSON,
    WriteOffResponseToJSON,
} from '../models';

export interface BrowseAccrualsRequest {
    pageRequest?: PageRequest;
}

export interface BrowseAccrualsForUserIdRequest {
    userId: number;
    pageRequest?: PageRequest;
}

export interface BrowseWriteOffsOperationRequest {
    browseWriteOffsRequest?: BrowseWriteOffsRequest;
}

export interface GetAccrualRequest {
    accrualId: number;
}

export interface GetOwnWriteOffRequest {
    writeoffId: number;
}

export interface GetWalletHistoryRequest {
    pageRequest?: PageRequest;
}

export interface WriteOffOperationRequest {
    writeOffRequest?: WriteOffRequest;
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
        requestParameters: BrowseWriteOffsOperationRequest,
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
                body: BrowseWriteOffsRequestToJSON(requestParameters.browseWriteOffsRequest),
            },
            initOverrides,
        );

        return new runtime.JSONApiResponse(response, (jsonValue) => PaginatedWriteOffResponseFromJSON(jsonValue));
    }

    /**
     * paginated view of write-offs of currently logged in user
     */
    async browseWriteOffs(
        requestParameters: BrowseWriteOffsOperationRequest = {},
        initOverrides?: RequestInit | runtime.InitOverrideFunction,
    ): Promise<PaginatedWriteOffResponse> {
        const response = await this.browseWriteOffsRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * get accrual record by its identifier
     */
    async getAccrualRaw(
        requestParameters: GetAccrualRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction,
    ): Promise<runtime.ApiResponse<AccrualResponse>> {
        if (requestParameters.accrualId === null || requestParameters.accrualId === undefined) {
            throw new runtime.RequiredError(
                'accrualId',
                'Required parameter requestParameters.accrualId was null or undefined when calling getAccrual.',
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
                path: `/api/ilp/wallet/accrual/{accrual_id}`.replace(
                    `{${'accrual_id'}}`,
                    encodeURIComponent(String(requestParameters.accrualId)),
                ),
                method: 'GET',
                headers: headerParameters,
                query: queryParameters,
            },
            initOverrides,
        );

        return new runtime.JSONApiResponse(response, (jsonValue) => AccrualResponseFromJSON(jsonValue));
    }

    /**
     * get accrual record by its identifier
     */
    async getAccrual(
        requestParameters: GetAccrualRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction,
    ): Promise<AccrualResponse> {
        const response = await this.getAccrualRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * get the write-off record identified by writeoff_id and created by currently logged user
     */
    async getOwnWriteOffRaw(
        requestParameters: GetOwnWriteOffRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction,
    ): Promise<runtime.ApiResponse<WriteOffResponse>> {
        if (requestParameters.writeoffId === null || requestParameters.writeoffId === undefined) {
            throw new runtime.RequiredError(
                'writeoffId',
                'Required parameter requestParameters.writeoffId was null or undefined when calling getOwnWriteOff.',
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
                path: `/api/ilp/wallet/write-off/{writeoff_id}`.replace(
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
     * get the write-off record identified by writeoff_id and created by currently logged user
     */
    async getOwnWriteOff(
        requestParameters: GetOwnWriteOffRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction,
    ): Promise<WriteOffResponse> {
        const response = await this.getOwnWriteOffRaw(requestParameters, initOverrides);
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
     * write off funds of currently logged in user for the selected item
     */
    async writeOffRaw(
        requestParameters: WriteOffOperationRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction,
    ): Promise<runtime.ApiResponse<WriteOffResponse>> {
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
                path: `/api/ilp/wallet/write-off`,
                method: 'POST',
                headers: headerParameters,
                query: queryParameters,
                body: WriteOffRequestToJSON(requestParameters.writeOffRequest),
            },
            initOverrides,
        );

        return new runtime.JSONApiResponse(response, (jsonValue) => WriteOffResponseFromJSON(jsonValue));
    }

    /**
     * write off funds of currently logged in user for the selected item
     */
    async writeOff(
        requestParameters: WriteOffOperationRequest = {},
        initOverrides?: RequestInit | runtime.InitOverrideFunction,
    ): Promise<WriteOffResponse> {
        const response = await this.writeOffRaw(requestParameters, initOverrides);
        return await response.value();
    }
}
