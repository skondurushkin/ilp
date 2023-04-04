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
 * @interface CreateNewWriteOffRequest
 */
export interface CreateNewWriteOffRequest {
    /**
     * generic identifier
     * @type {number}
     * @memberof CreateNewWriteOffRequest
     */
    articleId: number;
}

/**
 * Check if a given object implements the CreateNewWriteOffRequest interface.
 */
export function instanceOfCreateNewWriteOffRequest(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && 'articleId' in value;

    return isInstance;
}

export function CreateNewWriteOffRequestFromJSON(json: any): CreateNewWriteOffRequest {
    return CreateNewWriteOffRequestFromJSONTyped(json, false);
}

export function CreateNewWriteOffRequestFromJSONTyped(
    json: any,
    ignoreDiscriminator: boolean,
): CreateNewWriteOffRequest {
    if (json === undefined || json === null) {
        return json;
    }
    return {
        articleId: json['articleId'],
    };
}

export function CreateNewWriteOffRequestToJSON(value?: CreateNewWriteOffRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        articleId: value.articleId,
    };
}
