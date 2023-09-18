export function formatRequestDataForCourseAndIntern(requestData: any[]) {
    const values = requestData.map(data => {
        const rowValues = Object.keys(data).map(key => {
            const value = data[key];
            return value !== '' ? `'${value}'` : 'NULL';
        }).join(',');
        return `(${rowValues})`;
    }).join(',');

    return values;
}