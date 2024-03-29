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

import { exists, mapValues } from '../runtime';
/**
 *
 * @export
 * @interface ArticleDeleteRequest
 */
export interface ArticleDeleteRequest {
    /**
     * generic identifier
     * @type {number}
     * @memberof ArticleDeleteRequest
     */
    id?: number;
}

/**
 * Check if a given object implements the ArticleDeleteRequest interface.
 */
export function instanceOfArticleDeleteRequest(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function ArticleDeleteRequestFromJSON(json: any): ArticleDeleteRequest {
    return ArticleDeleteRequestFromJSONTyped(json, false);
}

export function ArticleDeleteRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): ArticleDeleteRequest {
    if (json === undefined || json === null) {
        return json;
    }
    return {
        id: !exists(json, 'id') ? undefined : json['id'],
    };
}

export function ArticleDeleteRequestToJSON(value?: ArticleDeleteRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        id: value.id,
    };
}
