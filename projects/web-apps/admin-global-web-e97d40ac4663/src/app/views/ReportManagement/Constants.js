export const sourceFeilds = [
    {
        label: 'Report Name:',
        render: (data) => {
            return `${data.reportName}` || 'NA'
        },
    },
    {
        label: 'Parent Module Name:',
        render: (data) => {
            return data?.parentModuleName
        },
    },
    {
        label: 'Roles:',
        render: (data) => `${data.roles}` || 'NA',
    },
    {
        label: 'Status:',
        render: (data) => data.status || 'NA',
    },
    {
        label: 'Sub Module Name:',
        render: (data) => data.subModuleNames || 'NA',
    },
    {
        label: 'Filters:',
        render: (data) => data.filters || 'NA',
    },
]

export const reportTableHeaderFeilds = [
    {
        label: 'Report table headers:',
        render: (data) => data.selectedTableHeaders || 'NA',
    },
]

export const customColumnDataParser = (
    customColumnData,
    moduleColumns,
    activeCustomColumn,
    editCustomColumn
) => {
    const firstReference = moduleColumns.find(
        (item) => item.columnName === customColumnData.firstReference
    )

    const secondReference = moduleColumns.find(
        (item) => item.columnName === customColumnData.secondReference
    )

    const firstColumn = moduleColumns.find(
        (item) => item.columnName === customColumnData.firstColumn
    )

    const secondColumn = moduleColumns.find(
        (item) => item.columnName === customColumnData.secondColumn
    )

    const resObj = {
        customColumns: [
            {
                name: customColumnData?.columnName,
                operation: customColumnData?.operation,
                first: {
                    reference: firstReference?.columnId,
                    column: firstColumn?.columnId,
                    subModule: firstColumn?.subModuleId,
                },
                second: {
                    reference: secondReference?.columnId,
                    column: secondColumn?.columnId,
                    subModule: secondColumn?.subModuleId,
                },
            },
        ],
    }

    if (editCustomColumn) {
        resObj.customColumns[0]['id'] = activeCustomColumn?.columnId
    }

    return resObj
}

export const apiMessages = {
    customColumnCreated: 'Report custom column has been added successfully',
}

export const reportConfigParser = (
    reportData,
    roles,
    selectedRoles,
    selectedSubmodules,
    filterData,
    statusData,
    moduleData
) => {
    const selectedRolesIds = roles
        .filter((role) => selectedRoles.includes(role.name))
        .map((role) => role.id)

    const selectedSubmodulesIds = moduleData?.subModules
        ?.filter((submodule) => selectedSubmodules.includes(submodule.name))
        .map((submodule) => submodule.id)

    const payload = {
        parentModuleId: reportData?.parentModuleId,
        roleIds: selectedRolesIds,
        submoduleIds: selectedSubmodulesIds,
        filter: filterData,
        status: statusData,
    }

    return payload
}

export const saveTableHeaders = (selectedSavedColumns, allColumns) => {
    let result = []

    const payload = {}

    if (selectedSavedColumns.length) {
        result = allColumns.filter((item) =>
            selectedSavedColumns.includes(item.name)
        )
        payload['selectedColumns'] = result
    }

    return payload
}

const createResult = (input1, input2) => {
    return input2.map((item) => {
        const resultItem = {}

        input1.forEach((column) => {
            const columnId = column.id
            const columnName = column.name
            if (columnId in item) {
                // Use the columnName as the key in the resultItem
                // Convert values to strings using JSON.stringify
                if (typeof item[columnId] !== 'string') {
                    resultItem[columnName] = JSON.stringify(item[columnId])
                    return
                }
                resultItem[columnName] = item[columnId]
            }
        })

        return resultItem
    })
}

export const parseReportTableData = (allColumns, res) => {
    let result = []

    if (!allColumns.length && !res?.content.length) {
        return result
    }

    const data = res?.content
    result = createResult(allColumns, data)

    return result
}

const createKeyArray = (input1) => {
    return input1.map((column) => ({
        key: column.name,
        name: column.name,
    }))
}

export const parseTableHeaders = (allColumns) => {
    let result = []

    if (!allColumns.length) {
        return []
    }

    result = createKeyArray(allColumns)

    return result
}
