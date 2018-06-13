export const promisifyListCall = (aomFunc) => {
    return (query) => {
        return new Promise((resolve, reject) => {
            aomFunc(query, {
                onOk: (result) => resolve(result),
                onError: (err) => reject(err)
            })
        })
    }
}