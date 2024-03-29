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

import {
    OperationResponseFromJSON,
    OperationResponseFromJSONTyped,
    OperationResponseToJSON,
} from './OperationResponse';
import { exists, mapValues } from '../runtime';

import type { OperationResponse } from './OperationResponse';

/**
 *
 * @export
 * @interface PaginatedOperationResponse
 */
export interface PaginatedOperationResponse {
    /**
     * total page count
     * @type {number}
     * @memberof PaginatedOperationResponse
     */
    total: number;
    /**
     * current page
     * @type {number}
     * @memberof PaginatedOperationResponse
     */
    page: number;
    /**
     *
     * @type {number}
     * @memberof PaginatedOperationResponse
     */
    pageSize: number;
    /**
     *
     * @type {boolean}
     * @memberof PaginatedOperationResponse
     */
    hasNext: boolean;
    /**
     *
     * @type {boolean}
     * @memberof PaginatedOperationResponse
     */
    hasPrev: boolean;
    /**
     *
     * @type {Array<OperationResponse>}
     * @memberof PaginatedOperationResponse
     */
    results: Array<OperationResponse>;
}

/**
 * Check if a given object implements the PaginatedOperationResponse interface.
 */
export function instanceOfPaginatedOperationResponse(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && 'total' in value;
    isInstance = isInstance && 'page' in value;
    isInstance = isInstance && 'pageSize' in value;
    isInstance = isInstance && 'hasNext' in value;
    isInstance = isInstance && 'hasPrev' in value;
    isInstance = isInstance && 'results' in value;

    return isInstance;
}

export function PaginatedOperationResponseFromJSON(json: any): PaginatedOperationResponse {
    return PaginatedOperationResponseFromJSONTyped(json, false);
}

export function PaginatedOperationResponseFromJSONTyped(
    json: any,
    ignoreDiscriminator: boolean,
): PaginatedOperationResponse {
    if (json === undefined || json === null) {
        return json;
    }
    return {
        total: json['total'],
        page: json['page'],
        pageSize: json['pageSize'],
        hasNext: json['hasNext'],
        hasPrev: json['hasPrev'],
        results: (json['results'] as Array<any>).map(OperationResponseFromJSON),
    };
}

export function PaginatedOperationResponseToJSON(value?: PaginatedOperationResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        total: value.total,
        page: value.page,
        pageSize: value.pageSize,
        hasNext: value.hasNext,
        hasPrev: value.hasPrev,
        results: (value.results as Array<any>).map(OperationResponseToJSON),
    };
}
