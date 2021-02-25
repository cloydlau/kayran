export default (promise: Promise<any>) => promise
.then(res => [res, null])
.catch(err => [null, err])
