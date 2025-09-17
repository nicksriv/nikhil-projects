import React from "react";
import Text from "../../component/common/Text";
// import { Table, Row, Rows } from "react-native-table-component";
import { StyleSheet } from "react-native";
import View from "../../component/common/View";
import Image from "../../component/common/Image";
import { R } from "../../res";
import InformativeImage from "../../component/common/InformativeImage";
import { navigationHelper } from "../../helper/navigation";
import { ScreenConstants } from "../../navigator/ScreenConstants";
import Add from "react-native-vector-icons/Ionicons";
import Edit from "react-native-vector-icons/EvilIcons";
import Table from "@app/component/common/Table";

class ModuleDetailContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tableHead: ["Head 1", "Head 2", "Head 3", "Head 4"],
      tableData: [
        ["1", "2", "3", "4"],
        ["a", "b", "c", "d"],
        ["1", "2", "456\n789/1212", null],
        ["a", "b", "d", "e"],
        ["a", "b", "d", "-"],
      ],
      // tableHead: [],
      // tableData: [],
      masterHeader:[],
      filterHeader:[],
      filterMasterHeader:[],
      rowList:[],
      visible:false
    };
  }
  handleAddEdit = ({ action, actionData }) => {
    console.warn(action, "action");
    if (action === "addData") {
      navigationHelper.navigate({
        name: ScreenConstants.ADD_MODULE,
      });
    }
    if (action === "editData") {
      navigationHelper.navigate({
        name: ScreenConstants.EDIT_MODULE,
        params: actionData,
      });
    }
  };

   closeMenu = () => {this.setState({visible:false})}
    openMenu = () => {this.setState({visible:true})}

    filter = (item) => {
    if (item.id !== "All") {
      if (tempArray.length == 0) {
        formattedfilterrColumns = [];
        masterHeader.forEach((a) => {
          a.active = false;
        });
      }

      let mapped = tempArray.map((ele) => ele.id);
      let found = mapped.includes(item.id);
      if (!found) {
        tempArray.push(item);
      }

      props.list &&
        props.list?.columns &&
        props.list?.columns.map((c, i) => {
          if (c.hint == item.id) {
            let cobj = {
              id: c.hint,
              componentId: c.componentId,
              label: c.hint,
              active: false,
              format: (value) =>
                `${
                  value && value.length > 13
                    ? capitalizeFirstLetter(value)?.trim().slice(0, 13) + " ..."
                    : capitalizeFirstLetter(value)?.trim()
                }`,
            };
            formattedfilterrColumns.push(cobj);
          }
        });

      masterHeader.forEach((a) => {
        if (item.id == a.id) {
          if (a.active == true) {
            tempArray.splice(
              tempArray.findIndex((a) => a.id === item.id),
              1
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
      const uniqElements = arr2.flat().filter((el) => uniqIds.delete(el.id));

      uniqElements.forEach((a) => {
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

  render() {
    const { tableData, tableHead } = this.state;
    return (
      <>
        {tableHead.length && tableData.length ? (
          // <View style={styles.container} horizontal>
          //   <Table borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
          //     <Row
          //       data={tableHead}
          //       style={styles.head}
          //       textStyle={styles.text}
          //     />
          //     <Rows
          //       data={tableData}
          //       textStyle={styles.text}
          //       onPress={() => this.handleAddEdit({ action: "editData" })}
          //     />
          //   </Table>
          // </View>
          <Table
              masterHeader={masterHeader}
              filterHeader={
                filterMasterHeader.length > 0
                  ? filterMasterHeader
                  : filterHeader
              }
              rowList={rowList}
              visible={visible}
              filter={(item) => filter(item)}
              closeMenu={() => closeMenu()}
              openMenu={() => openMenu()}
              navigation={props.navigation}
              rowData={props.row}
              moduleId={moduleId}
              subModuleId={subModuleId}
              tableSpinner={tableSpinner}
              themeData={props}
              filtersList={props.list.filters}
              selectMenuItem={selectMenuItem}
            />
        ) : (
          <InformativeImage
            text={"No Module data found"}
            source={R.images.informative.noData()}
          />
        )}
        <Add
          name="add-circle-outline"
          size={35}
          style={{
            position: "absolute",
            bottom: 20,
            color: R.colors.chipBorder,
            right: 10,
          }}
          onPress={() => {
            this.handleAddEdit({ action: "addData" });
          }}
        />
        {/* <Edit
          name="pencil"
          size={35}
          style={{
            position: "absolute",
            bottom: 70,
            color: R.colors.chipBorder,
            right: 10,
          }}
          onPress={() => {}}
        /> */}
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: "#fff",
    flexWrap: "nowrap",
  },
  head: { height: 40, backgroundColor: "#f1f8ff" },
  text: { margin: 6 },
});

export default ModuleDetailContainer;
