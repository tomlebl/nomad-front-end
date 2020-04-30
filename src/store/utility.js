export const drawerDataHandler = (tableDataSource, keysArr, element) => {
  const tableData = []
  let highlight = false

  tableDataSource.forEach((row, index) => {
    const entries = []
    const rowElement = element === 'drawer' ? row : row.td
    rowElement.forEach((col, i) => {
      entries.push([keysArr[i], col.text])
    })

    // Adding property into the row object that will be used to highlight rows with the same ExpNo
    const prevRowObj = [...tableData][index - 1]

    if (prevRowObj) {
    }
    const rowObj = Object.fromEntries(entries)

    if (prevRowObj) {
      if (prevRowObj.Name !== rowObj.Name) {
        highlight = !highlight
      }
    }
    // Extracting username from dataset name
    const username = rowObj.Name.split('-')[3]

    // Adding new properties to row object and pushing it to table data array
    if (rowObj.Status !== 'Available') {
      tableData.push(
        Object.assign(rowObj, { key: index.toString(), Username: username, highlight: highlight })
      )
    }
  })
  return tableData
}
