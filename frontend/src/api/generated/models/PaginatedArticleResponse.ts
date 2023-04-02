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

import { ArticleResponseFromJSON, ArticleResponseFromJSONTyped, ArticleResponseToJSON } from './ArticleResponse';
import { exists, mapValues } from '../runtime';

import type { ArticleResponse } from './ArticleResponse';

/**
 *
 * @export
 * @interface PaginatedArticleResponse
 */
export interface PaginatedArticleResponse {
    /**
     * total page count
     * @type {number}
     * @memberof PaginatedArticleResponse
     */
    total: number;
    /**
     * current page
     * @type {number}
     * @memberof PaginatedArticleResponse
     */
    page: number;
    /**
     *
     * @type {number}
     * @memberof PaginatedArticleResponse
     */
    pageSize: number;
    /**
     *
     * @type {boolean}
     * @memberof PaginatedArticleResponse
     */
    hasNext: boolean;
    /**
     *
     * @type {boolean}
     * @memberof PaginatedArticleResponse
     */
    hasPrev: boolean;
    /**
     *
     * @type {Array<ArticleResponse>}
     * @memberof PaginatedArticleResponse
     */
    results: Array<ArticleResponse>;
}

/**
 * Check if a given object implements the PaginatedArticleResponse interface.
 */
export function instanceOfPaginatedArticleResponse(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && 'total' in value;
    isInstance = isInstance && 'page' in value;
    isInstance = isInstance && 'pageSize' in value;
    isInstance = isInstance && 'hasNext' in value;
    isInstance = isInstance && 'hasPrev' in value;
    isInstance = isInstance && 'results' in value;

    return isInstance;
}

export function PaginatedArticleResponseFromJSON(json: any): PaginatedArticleResponse {
    return PaginatedArticleResponseFromJSONTyped(json, false);
}

export function PaginatedArticleResponseFromJSONTyped(
    json: any,
    ignoreDiscriminator: boolean,
): PaginatedArticleResponse {
    if (json === undefined || json === null) {
        return json;
    }
    return {
        total: json['total'],
        page: json['page'],
        pageSize: json['pageSize'],
        hasNext: json['hasNext'],
        hasPrev: json['hasPrev'],
        results: (json['results'] as Array<any>).map(ArticleResponseFromJSON),
    };
}

export function PaginatedArticleResponseToJSON(value?: PaginatedArticleResponse | null): any {
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
        results: (value.results as Array<any>).map(ArticleResponseToJSON),
    };
}
