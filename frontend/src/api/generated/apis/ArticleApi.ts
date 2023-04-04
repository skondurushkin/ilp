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
    ArticleDeleteRequest,
    ArticleRequest,
    ArticleResponse,
    ArticleUpdateRequest,
    ErrorMessage,
    PageRequest,
    PaginatedArticleResponse,
} from '../models';
import {
    ArticleDeleteRequestFromJSON,
    ArticleDeleteRequestToJSON,
    ArticleRequestFromJSON,
    ArticleRequestToJSON,
    ArticleResponseFromJSON,
    ArticleResponseToJSON,
    ArticleUpdateRequestFromJSON,
    ArticleUpdateRequestToJSON,
    ErrorMessageFromJSON,
    ErrorMessageToJSON,
    PageRequestFromJSON,
    PageRequestToJSON,
    PaginatedArticleResponseFromJSON,
    PaginatedArticleResponseToJSON,
} from '../models';

export interface BrowseArticlesRequest {
    pageRequest: PageRequest;
}

export interface CreateArticleRequest {
    articleRequest: ArticleRequest;
}

export interface DeleteArticleRequest {
    articleDeleteRequest: ArticleDeleteRequest;
}

export interface GetArticleByIdRequest {
    articleId: number;
}

export interface SearchArticlesRequest {
    searchKey: string;
}

export interface UpdateArticleRequest {
    articleUpdateRequest: ArticleUpdateRequest;
}

/**
 *
 */
export class ArticleApi extends runtime.BaseAPI {
    /**
     * paginated articles view
     */
    async browseArticlesRaw(
        requestParameters: BrowseArticlesRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction,
    ): Promise<runtime.ApiResponse<PaginatedArticleResponse>> {
        if (requestParameters.pageRequest === null || requestParameters.pageRequest === undefined) {
            throw new runtime.RequiredError(
                'pageRequest',
                'Required parameter requestParameters.pageRequest was null or undefined when calling browseArticles.',
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
                path: `/api/ilp/articles`,
                method: 'POST',
                headers: headerParameters,
                query: queryParameters,
                body: PageRequestToJSON(requestParameters.pageRequest),
            },
            initOverrides,
        );

        return new runtime.JSONApiResponse(response, (jsonValue) => PaginatedArticleResponseFromJSON(jsonValue));
    }

    /**
     * paginated articles view
     */
    async browseArticles(
        requestParameters: BrowseArticlesRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction,
    ): Promise<PaginatedArticleResponse> {
        const response = await this.browseArticlesRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * create new article record
     */
    async createArticleRaw(
        requestParameters: CreateArticleRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction,
    ): Promise<runtime.ApiResponse<ArticleResponse>> {
        if (requestParameters.articleRequest === null || requestParameters.articleRequest === undefined) {
            throw new runtime.RequiredError(
                'articleRequest',
                'Required parameter requestParameters.articleRequest was null or undefined when calling createArticle.',
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
                path: `/api/ilp/article`,
                method: 'POST',
                headers: headerParameters,
                query: queryParameters,
                body: ArticleRequestToJSON(requestParameters.articleRequest),
            },
            initOverrides,
        );

        return new runtime.JSONApiResponse(response, (jsonValue) => ArticleResponseFromJSON(jsonValue));
    }

    /**
     * create new article record
     */
    async createArticle(
        requestParameters: CreateArticleRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction,
    ): Promise<ArticleResponse> {
        const response = await this.createArticleRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * delete article record
     */
    async deleteArticleRaw(
        requestParameters: DeleteArticleRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction,
    ): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.articleDeleteRequest === null || requestParameters.articleDeleteRequest === undefined) {
            throw new runtime.RequiredError(
                'articleDeleteRequest',
                'Required parameter requestParameters.articleDeleteRequest was null or undefined when calling deleteArticle.',
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
                path: `/api/ilp/article`,
                method: 'DELETE',
                headers: headerParameters,
                query: queryParameters,
                body: ArticleDeleteRequestToJSON(requestParameters.articleDeleteRequest),
            },
            initOverrides,
        );

        return new runtime.VoidApiResponse(response);
    }

    /**
     * delete article record
     */
    async deleteArticle(
        requestParameters: DeleteArticleRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction,
    ): Promise<void> {
        await this.deleteArticleRaw(requestParameters, initOverrides);
    }

    /**
     * get article by identifier
     */
    async getArticleByIdRaw(
        requestParameters: GetArticleByIdRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction,
    ): Promise<runtime.ApiResponse<ArticleResponse>> {
        if (requestParameters.articleId === null || requestParameters.articleId === undefined) {
            throw new runtime.RequiredError(
                'articleId',
                'Required parameter requestParameters.articleId was null or undefined when calling getArticleById.',
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
                path: `/api/ilp/article/{article_id}`.replace(
                    `{${'article_id'}}`,
                    encodeURIComponent(String(requestParameters.articleId)),
                ),
                method: 'GET',
                headers: headerParameters,
                query: queryParameters,
            },
            initOverrides,
        );

        return new runtime.JSONApiResponse(response, (jsonValue) => ArticleResponseFromJSON(jsonValue));
    }

    /**
     * get article by identifier
     */
    async getArticleById(
        requestParameters: GetArticleByIdRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction,
    ): Promise<ArticleResponse> {
        const response = await this.getArticleByIdRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * search for articles
     */
    async searchArticlesRaw(
        requestParameters: SearchArticlesRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction,
    ): Promise<runtime.ApiResponse<Array<ArticleResponse>>> {
        if (requestParameters.searchKey === null || requestParameters.searchKey === undefined) {
            throw new runtime.RequiredError(
                'searchKey',
                'Required parameter requestParameters.searchKey was null or undefined when calling searchArticles.',
            );
        }

        const queryParameters: any = {};

        if (requestParameters.searchKey !== undefined) {
            queryParameters['search_key'] = requestParameters.searchKey;
        }

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
                path: `/api/ilp/article/search`,
                method: 'GET',
                headers: headerParameters,
                query: queryParameters,
            },
            initOverrides,
        );

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(ArticleResponseFromJSON));
    }

    /**
     * search for articles
     */
    async searchArticles(
        requestParameters: SearchArticlesRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction,
    ): Promise<Array<ArticleResponse>> {
        const response = await this.searchArticlesRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * update article record
     */
    async updateArticleRaw(
        requestParameters: UpdateArticleRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction,
    ): Promise<runtime.ApiResponse<ArticleResponse>> {
        if (requestParameters.articleUpdateRequest === null || requestParameters.articleUpdateRequest === undefined) {
            throw new runtime.RequiredError(
                'articleUpdateRequest',
                'Required parameter requestParameters.articleUpdateRequest was null or undefined when calling updateArticle.',
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
                path: `/api/ilp/article`,
                method: 'PUT',
                headers: headerParameters,
                query: queryParameters,
                body: ArticleUpdateRequestToJSON(requestParameters.articleUpdateRequest),
            },
            initOverrides,
        );

        return new runtime.JSONApiResponse(response, (jsonValue) => ArticleResponseFromJSON(jsonValue));
    }

    /**
     * update article record
     */
    async updateArticle(
        requestParameters: UpdateArticleRequest,
        initOverrides?: RequestInit | runtime.InitOverrideFunction,
    ): Promise<ArticleResponse> {
        const response = await this.updateArticleRaw(requestParameters, initOverrides);
        return await response.value();
    }
}
