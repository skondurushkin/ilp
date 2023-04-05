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

import type { PageRequest, PaginatedWriteOffResponse, UpdateWriteOffRequest, WriteOffResponse } from '../models';
import {
    PageRequestFromJSON,
    PageRequestToJSON,
    PaginatedWriteOffResponseFromJSON,
    PaginatedWriteOffResponseToJSON,
    UpdateWriteOffRequestFromJSON,
    UpdateWriteOffRequestToJSON,
    WriteOffResponseFromJSON,
    WriteOffResponseToJSON,
} from '../models';

export interface BrowseWriteOffsAsAdminRequest {
    pageRequest?: PageRequest;
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
