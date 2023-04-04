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
 * @interface ArticleResponse
 */
export interface ArticleResponse {
    /**
     * generic identifier
     * @type {number}
     * @memberof ArticleResponse
     */
    id: number;
    /**
     *
     * @type {string}
     * @memberof ArticleResponse
     */
    code: string;
    /**
     *
     * @type {string}
     * @memberof ArticleResponse
     */
    name: string;
    /**
     *
     * @type {string}
     * @memberof ArticleResponse
     */
    description?: string | null;
    /**
     *
     * @type {number}
     * @memberof ArticleResponse
     */
    price: number;
    /**
     *
     * @type {boolean}
     * @memberof ArticleResponse
     */
    available: boolean;
    /**
     *
     * @type {string}
     * @memberof ArticleResponse
     */
    imageLink?: string;
    /**
     *
     * @type {object}
     * @memberof ArticleResponse
     */
    extension?: object | null;
}

/**
 * Check if a given object implements the ArticleResponse interface.
 */
export function instanceOfArticleResponse(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && 'id' in value;
    isInstance = isInstance && 'code' in value;
    isInstance = isInstance && 'name' in value;
    isInstance = isInstance && 'price' in value;
    isInstance = isInstance && 'available' in value;

    return isInstance;
}

export function ArticleResponseFromJSON(json: any): ArticleResponse {
    return ArticleResponseFromJSONTyped(json, false);
}

export function ArticleResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ArticleResponse {
    if (json === undefined || json === null) {
        return json;
    }
    return {
        id: json['id'],
        code: json['code'],
        name: json['name'],
        description: !exists(json, 'description') ? undefined : json['description'],
        price: json['price'],
        available: json['available'],
        imageLink: !exists(json, 'imageLink') ? undefined : json['imageLink'],
        extension: !exists(json, 'extension') ? undefined : json['extension'],
    };
}

export function ArticleResponseToJSON(value?: ArticleResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        id: value.id,
        code: value.code,
        name: value.name,
        description: value.description,
        price: value.price,
        available: value.available,
        imageLink: value.imageLink,
        extension: value.extension,
    };
}
