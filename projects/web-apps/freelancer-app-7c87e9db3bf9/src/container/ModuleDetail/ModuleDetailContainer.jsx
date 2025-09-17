import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  BackHandler,
  Image,
  Dimensions,
} from 'react-native';
import Table from '@app/FormElements/components/Table';
import {capitalizeFirstLetter} from '@app/FormElements/utils/Utils';
import {colors, primaryColor} from '@app/FormElements/themes/color'; // Dynamic Themes
import {ActivityIndicator} from 'react-native-paper';
import {dynamicModuleAxios} from '@app/helper/axios';
import {fontsRegular} from '@app/FormElements/assets/fonts/fonts';
import {ScreenConstants} from '@app/navigator/ScreenConstants';
import {useIsFocused} from '@react-navigation/native';
import moduleDetailParser from './ModuleDetailParser';
import { urlHelper } from '@app/helper/url';

var mySubModule = '';
var myModule = '';

var tempArray = [];
var formattedfilterrColumns = [];

function ModuleDetailContainer(props) {
  const isFocused = useIsFocused();

  const [screenName, setScreenName] = useState();
  const [spinner, setSpinner] = useState(false);
  const [masterHeader, setMasterHeader] = useState([]);
  const [filterHeader, setFilterHeader] = useState([]);
  const [rowList, setRowList] = useState([]);
  const [formatRowList, setFormattedRowList] = useState([]);
  const [list, setList] = useState([]);
  const [filterMasterHeader, setFilterMasterHeader] = useState([]);
  const [visible, setVisible] = React.useState(false);
  const [moduleId, setModuleId] = useState('');
  const [subModuleId, setSubModuleId] = useState('');
  const [rowCalled, setRowCalled] = useState(false);
  const [selectMenuItem, setSelectMenuItem] = useState({});
  const [moduleData, setModuleData] = useState();
  const [subModuleData, setSuModuleData] = useState();
  const [showFilters,setShowFilters] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      if (isFocused) {
        const data = props;
        mySubModule = data.route?.params?.mySubModule;
        myModule = data.route?.params?.myModule;
  
        if(props.route?.params?.reload){
          await getNewRowList()
        }

        await getRowList(myModule.id,mySubModule.id,mySubModule,props.activeJobId)
        await getHeaderList(myModule.id, mySubModule.id, mySubModule);  
        setItems(myModule, mySubModule);
        if (!rowCalled) {
          setRowCalled(true);
        }
      }
      return () => {
        setRowCalled(false);
      };
    }
  
    loadData();
  }, [isFocused]);
  

  useEffect(() => {
    const backAction = () => {
      props.navigation.navigate(ScreenConstants.SUB_MODULE_LIST);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const getHeaderList = async (id, id2, selectMenuItem) => {
      const url = urlHelper.getHeaderLIst(id, id2,selectMenuItem?.mappedBy)
        try {
          const res = await dynamicModuleAxios.get(url);
          if (res) {
            setList(res);
          }
        } catch (error) {
          console.log("error",error)
        }
  };


  const setItems = (module, subModule) => {
    setModuleId(module.id);
    setSubModuleId(subModule.id);
    setModuleData(module);
    setSuModuleData(subModule);
    global.currentWorkflowId = subModule.workFlowId;
    setSelectMenuItem(subModule);
  };

  const getScreenNames = async () => {
    const url = urlHelper.getScreenNames(myModule.id,mySubModule.id)
    try {
      const res = await dynamicModuleAxios.get(url);
      if (res.message == undefined) {
        setScreenName(res.firstScreenName);
        global.screenNameHeader = res.firstScreenName;
        global.screenIds = res.workFlows;
      }
    } catch (error) {
      setScreenName("")
      console.log('error', error);
    } 
  };

  const openMenu = () => {
    setVisible(true);
  };

  const getNewRowList = async (data) => {
    const url = urlHelper.getNewRowList(myModule.id,mySubModule.id)
    setSpinner(true);
    try {
      const res = await dynamicModuleAxios.get(url);
      const columns = res.columns;
      let formattedColumns = [];
      res &&
        columns &&
        columns.map((c, i) => {
          const cobj = moduleDetailParser.formattedColumn(c);
          formattedColumns.push(cobj);
        });

      const formattedRows = [];
      data &&
        data?.records &&
        data?.records.map((r, i) => {
          const robj = moduleDetailParser.formattedRow(columns, r);
          formattedRows.push(robj);
        });

      if (formattedRows && formattedRows.length > 0) {
        setMasterHeader(formattedColumns);
        setFilterHeader(formattedColumns);
      } else {
        setMasterHeader([]);
        setFilterHeader([]);
      }
      setFormattedRowList(formattedRows);
     await getScreenNames();
    } catch (error) {
      console.log('error', error);
    } finally {
      setSpinner(false);
    }
  };

  const closeMenu = () => setVisible(false);

  const filter = item => {
    if (item.id !== 'All') {
      if (tempArray.length == 0) {
        formattedfilterrColumns = [];
        masterHeader.forEach(a => {
          a.active = false;
        });
      }

      let mapped = tempArray.map(ele => ele.id);
      let found = mapped.includes(item.id);
      if (!found) {
        tempArray.push(item);
      }

      list &&
        list?.columns &&
        list?.columns.map((c, i) => {
          if (c.hint == item.id) {
            let cobj = {
              id: c.hint,
              componentId: c.componentId,
              label: c.hint,
              active: false,
              format: value =>
                `${
                  value && value.length > 13
                    ? capitalizeFirstLetter(value)?.trim().slice(0, 13) + ' ...'
                    : capitalizeFirstLetter(value)?.trim()
                }`,
            };
            formattedfilterrColumns.push(cobj);
          }
        });

      masterHeader.forEach(a => {
        if (item.id == a.id) {
          if (a.active == true) {
            tempArray.splice(
              tempArray.findIndex(a => a.id === item.id),
              1,
            );
            a.active = false;
          } else {
            a.active = true;
          }
        }
      });

      setFilterMasterHeader(tempArray);

      setMasterHeader(masterHeader);
    } else {
      tempArray = [];
      let arr2 = [formattedfilterrColumns, ...filterHeader];
      // Gather Unique Element Id's based on which you want to filter the elements.
      const uniqIds = arr2
        .flat()
        .reduce((ids, el) => ids.add(el.id), new Set());
      // Filter out uniq elements.
      const uniqElements = arr2.flat().filter(el => uniqIds.delete(el.id));

      uniqElements.forEach(a => {
        if (a.active == true) {
          a.active = true;
        } else {
          a.active = true;
        }
      });

      setMasterHeader(uniqElements);
      setFilterMasterHeader(uniqElements);
      setFilterHeader(uniqElements);
    }
    closeMenu();
  };

  const getRowList = async (
    id,
    id2,
    selectMenuItem,
    jobId,
    rowDetailsComponent,
    rowDetailsDate,
    static_rowDetailsComponent,
    static_rowDetailsDate
  ) => {
    var fromDateGet;
    var toDateGet;
  
    var teamModouleEmpID;
    var teamModouleEmpName;
    var teamModouleEmpRoleID;
  
    var teamModouleFromDate;
    var teamModouletoDate;
  
    var [key1, value1] = [];
  
    if (rowDetailsDate != undefined) {
      for (var [key1, value1] of Object.entries(rowDetailsDate)) {
        if (key1 == "from") {
          fromDateGet = value1;
        } else {
          toDateGet = value1;
        }
      }
    }
  
    //********************* Differenciate the Component
  
    var arrayObj = [];
    var [key, value] = [];
    newfilterdownload = [];
  
    if (rowDetailsComponent != undefined) {
      for (var [key, value] of Object.entries(rowDetailsComponent)) {
        var obj = {
          componentId: key,
          componentValue: value,
        };
        arrayObj.push(obj);
        newfilterdownload.push(obj);
      }
    }
  
    const url = urlHelper.getRowList(id,id2,selectMenuItem?.mappedBy)
  
    const payload = {
      employeeId: teamModouleEmpID,
      name: teamModouleEmpName,
      roleId: teamModouleEmpRoleID,
      elements: 0,
      page: 0,
      size: 20,
      filters: arrayObj,
      from: fromDateGet ? fromDateGet : teamModouleFromDate,
      to: toDateGet ? toDateGet : teamModouletoDate,
      jobId,
    };
  
    setSpinner(true)
    try {
      const res = await dynamicModuleAxios.post(url, payload);
      if (res) {
        setRowList(res);
        getNewRowList(res)
      }
    } catch (error) {
        console.log("error",error)
    }
  
  
  };  


 const handleFilterToggle = (value) => {
    setShowFilters(value)
  }

  return spinner ? (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.transparentColor,
      }}>
      <ActivityIndicator
        size={25}
        animating={true}
        color={colors.staticPrimaryColor}
      />

      <Text style={{fontSize: 20, color: colors.staticTextColor}}>Loading</Text>
    </View>
  ) : (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.transparentColor}}>
      {props?.localBackground ? (
        <Image
          source={{
            uri: props?.localBackground,
          }}
          style={{
            opacity: props?.auth?.opacity ? props?.auth?.opacity : 1,
            position: 'absolute',
            width: Dimensions.get('screen').width,
            height: Dimensions.get('screen').height,
          }}
        />
      ) : null}

      <View style={{flex: 1}}>
        {!selectMenuItem.mappedBy ? (
          <>
            <Table
              mySubModule={mySubModule}
              myModule={myModule}
              tableSpinner={spinner}
              masterHeader={masterHeader}
              filterHeader={
                filterMasterHeader.length > 0
                  ? filterMasterHeader
                  : filterHeader
              }
              rowList={formatRowList}
              visible={visible}
              filter={item => filter(item)}
              closeMenu={() => closeMenu()}
              openMenu={() => openMenu()}
              navigation={props.navigation}
              rowData={rowList}
              moduleId={moduleId}
              subModuleId={subModuleId}
              rowCalled={spinner}
              themeData={props}
              filtersList={list.filters}
              selectMenuItem={selectMenuItem}
              activeJobId={props.activeJobId}
              getRowList={getRowList}
              showFilters={showFilters}
              handleFilterToggle={handleFilterToggle}
            />

            <View
              style={{
                position: 'absolute',
                height: 50,
                bottom: 20,
                width: '100%',
              }}>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate(ScreenConstants.SCREEN_BUILDER, {
                    fromRowData: false,
                    subModuleId: subModuleId,
                    moduleData,
                    subModuleData,
                  });
                  props.actions.setRowDetails({});
                }}
                style={{
                  height: 60,
                  width: '90%',
                  backgroundColor: primaryColor(props),
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '500',
                    fontFamily: fontsRegular(props),
                    color: '#fff',
                  }}>
                  {screenName}
                </Text>
              </TouchableOpacity>
            </View>
          </>
        ) : null}

        {/* Table and Team module and Reports module end*/}
      </View>
    </SafeAreaView>
  );
}

export default ModuleDetailContainer;
