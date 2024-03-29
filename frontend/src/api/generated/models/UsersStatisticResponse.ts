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
    BalanceStatisticResponseInnerDataInnerFromJSON,
    BalanceStatisticResponseInnerDataInnerFromJSONTyped,
    BalanceStatisticResponseInnerDataInnerToJSON,
} from './BalanceStatisticResponseInnerDataInner';
import { exists, mapValues } from '../runtime';

import type { BalanceStatisticResponseInnerDataInner } from './BalanceStatisticResponseInnerDataInner';

/**
 *
 * @export
 * @interface UsersStatisticResponse
 */
export interface UsersStatisticResponse {
    /**
     * Пользователи
     * @type {string}
     * @memberof UsersStatisticResponse
     */
    label: string;
    /**
     *
     * @type {Array<BalanceStatisticResponseInnerDataInner>}
     * @memberof UsersStatisticResponse
     */
    data: Array<BalanceStatisticResponseInnerDataInner>;
}

/**
 * Check if a given object implements the UsersStatisticResponse interface.
 */
export function instanceOfUsersStatisticResponse(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && 'label' in value;
    isInstance = isInstance && 'data' in value;

    return isInstance;
}

export function UsersStatisticResponseFromJSON(json: any): UsersStatisticResponse {
    return UsersStatisticResponseFromJSONTyped(json, false);
}

export function UsersStatisticResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): UsersStatisticResponse {
    if (json === undefined || json === null) {
        return json;
    }
    return {
        label: json['label'],
        data: (json['data'] as Array<any>).map(BalanceStatisticResponseInnerDataInnerFromJSON),
    };
}

export function UsersStatisticResponseToJSON(value?: UsersStatisticResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        label: value.label,
        data: (value.data as Array<any>).map(BalanceStatisticResponseInnerDataInnerToJSON),
    };
}
