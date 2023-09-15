export function formatRequestData(requestData: any[]) {
    const outputArray = requestData.map(data => Object.values(data))

    const values: string = outputArray.map(row => `(${row.map(value => `'${value}'`).join(',')})`).join(',');
    return values;
}