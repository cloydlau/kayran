export default (promise: Promise<any>): Promise<any[]> => promise
.then(res => [res])
.catch(err => [undefined, err])
