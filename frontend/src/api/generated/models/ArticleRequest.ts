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
 * @interface ArticleRequest
 */
export interface ArticleRequest {
    /**
     *
     * @type {string}
     * @memberof ArticleRequest
     */
    code: string;
    /**
     *
     * @type {string}
     * @memberof ArticleRequest
     */
    name: string;
    /**
     *
     * @type {string}
     * @memberof ArticleRequest
     */
    description?: string | null;
    /**
     *
     * @type {number}
     * @memberof ArticleRequest
     */
    price: number;
    /**
     *
     * @type {boolean}
     * @memberof ArticleRequest
     */
    available: boolean;
    /**
     *
     * @type {string}
     * @memberof ArticleRequest
     */
    imageLink?: string;
}

/**
 * Check if a given object implements the ArticleRequest interface.
 */
export function instanceOfArticleRequest(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && 'code' in value;
    isInstance = isInstance && 'name' in value;
    isInstance = isInstance && 'price' in value;
    isInstance = isInstance && 'available' in value;

    return isInstance;
}

export function ArticleRequestFromJSON(json: any): ArticleRequest {
    return ArticleRequestFromJSONTyped(json, false);
}

export function ArticleRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): ArticleRequest {
    if (json === undefined || json === null) {
        return json;
    }
    return {
        code: json['code'],
        name: json['name'],
        description: !exists(json, 'description') ? undefined : json['description'],
        price: json['price'],
        available: json['available'],
        imageLink: !exists(json, 'imageLink') ? undefined : json['imageLink'],
    };
}

export function ArticleRequestToJSON(value?: ArticleRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        code: value.code,
        name: value.name,
        description: value.description,
        price: value.price,
        available: value.available,
        imageLink: value.imageLink,
    };
}
