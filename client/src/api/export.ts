
export function exportToJsonFile(fileName:string,jsonData: Record<string, any>) {
    const dataStr = JSON.stringify(jsonData);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', fileName);
    linkElement.click();
}
