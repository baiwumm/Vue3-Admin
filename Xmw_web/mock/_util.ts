// Interface data format used to return a unified format

export function resultSuccess<T = Recordable>(response: T, { resMsg = 'ok' } = {}) {
    return {
        resCode: 200,
        response,
        resMsg,
        type: 'success',
    };
}

export function resultPageSuccess<T = any>(
    page: number,
    pageSize: number,
    list: T[],
    { resMsg = 'ok' } = {}
) {
    const pageData = pagination(page, pageSize, list);

    return {
        ...resultSuccess({
            items: pageData,
            total: list.length,
        }),
        resMsg,
    };
}

export function resultError(resMsg = 'Request failed', { resCode = -1, response = null } = {}) {
    return {
        resCode,
        response,
        resMsg,
        type: 'error',
    };
}

export function pagination<T = any>(pageNo: number, pageSize: number, array: T[]): T[] {
    const offset = (pageNo - 1) * Number(pageSize);
    const ret =
        offset + Number(pageSize) >= array.length
            ? array.slice(offset, array.length)
            : array.slice(offset, offset + Number(pageSize));
    return ret;
}

export interface requestParams {
    method: string;
    body: any;
    headers?: { authorization?: string };
    query: any;
}

/**
 * @description 本函数用于从request数据中获取token，请根据项目的实际情况修改
 *
 */
export function getRequestToken({ headers }: requestParams): string | undefined {
    return headers?.authorization;
}
