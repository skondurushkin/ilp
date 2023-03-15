type HTTPMethod = 'GET' | 'POST' | 'DELETE';

export async function doGet(path: string) {
    return await doReq('GET', path);
}

async function doReq(method: HTTPMethod, path: string) {
    const res = await fetch(path, { method });
    if (res.status >= 400) {
        return Promise.reject(res);
    }
    return res;
}
