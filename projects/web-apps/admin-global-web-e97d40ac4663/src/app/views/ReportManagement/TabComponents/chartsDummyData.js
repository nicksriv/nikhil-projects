const chartsDummyData = {}

chartsDummyData.filterDetails = {
    "chartName": "",
    "xAxis": "",
    "reportingManager": "",
    "role": "",
    "gender": "",
    "status": "",
    "contactNumber": "",
    "mappedStore": "",
    "ageFrom": 0,
    "ageTo": 0,
    "from": null,
    "to": null
  }

  chartsDummyData.userTableHeaders  = [
    {
      "key": "chartName",
      "name": "Chart Name",
      "hasSorting": true
    },
    {
      "key": "chartType",
      "name": "Chart Type",
      "hasSorting": true
    },
    {
      "key": "xAxis",
      "name": "X Axis",
      "hasSorting": true
    },
    {
      "key": "yAxis",
      "name": "Y Axis",
      "hasSorting": true
    },
    {
      "key": "actionHeader",
      "icon": "more_vert"
    }
  ]

  chartsDummyData.indexOfFirstData = 0
  chartsDummyData.indexOfLastData = 0
  chartsDummyData.pageNumber = 0
  chartsDummyData.pageSize = 10
  chartsDummyData.tableData = [
    {
      "chartName": "Test001",
      "xAxis": "Years of expectations",
      "reportingManager": "Vinay  G",
      "gender": "MALE",
      "city": "Tirupathi",
      "status": "ACTIVE",
      "contactNumber": "9887777888",
      "userId": "62cd1385769e195ef3b67895",
      "age": 1,
      "mappedStores": [
        "ST001",
        "ST002",
        "ST003"
      ],
      "roles": [
        {
          "id": "62cbe330769e195ef3b67880",
          "name": "Admin"
        },
        {
          "id": "62cbe3b6769e195ef3b67882",
          "name": "Demo role"
        },
        {
          "id": "62cd0c76769e195ef3b6788f",
          "name": "Sales Manager"
        },
        {
          "id": "62cd0c82769e195ef3b67890",
          "name": "Sales Executive"
        },
        {
          "id": "62cd12e7769e195ef3b67893",
          "name": "Site Manager"
        }
      ]
    },
    {
      "chartName": "Test002",
      "xAxis": "Email",
      "reportingManager": "Vinay  G",
      "gender": "FEMALE",
      "city": "Tirupati",
      "status": "ACTIVE",
      "contactNumber": "8878777788",
      "userId": "62cd13f6769e195ef3b67898",
      "age": 1,
      "mappedStores": [
        "ST001",
        "ST002",
        "ST003",
        "ST004"
      ],
      "roles": [
        {
          "id": "62cbe330769e195ef3b67880",
          "name": "Admin"
        },
        {
          "id": "62cbe3b6769e195ef3b67882",
          "name": "Demo role"
        },
        {
          "id": "62cd0c76769e195ef3b6788f",
          "name": "Sales Manager"
        },
        {
          "id": "62cd0c82769e195ef3b67890",
          "name": "Sales Executive"
        },
        {
          "id": "62cd12e7769e195ef3b67893",
          "name": "Site Manager"
        }
      ]
    },
   
  ]
  chartsDummyData.totalItems =5

  

  export default chartsDummyData