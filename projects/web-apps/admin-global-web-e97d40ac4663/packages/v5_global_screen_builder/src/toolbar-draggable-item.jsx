/**
  * <ToolbarItem />
  */

import React from 'react';
import { DragSource } from 'react-dnd';
import ItemTypes from './ItemTypes';
import ID from './UUID';
import InboxIcon from "@material-ui/icons/Inbox";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { EmailRoundedIcon } from '@material-ui/icons';
import LooksTwoIcon from '@material-ui/icons/LooksTwo';
import ShortTextIcon from '@material-ui/icons/ShortText';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';
import PhoneIcon from '@material-ui/icons/Phone';
import EventIcon from '@material-ui/icons/Event';
import TitleIcon from '@material-ui/icons/Title';

const cardSource = {
  beginDrag(props) {
    return {
      id: ID.uuid(),
      index: -1,
      data: props.data,
      onCreate: props.onCreate,
    };
  },
};

class ToolbarItem extends React.Component {

  render() {
    const { connectDragSource, data, onClick, isBootstrapElements } = this.props;
    const iconStyle = {
      fontSize: '15px',
      margin: '0 15px 0 10px'
    }
    if (!connectDragSource) return null;
    return (
      connectDragSource(
        <li onClick={onClick}>

          {(() => {
            switch (data.key) {
              case "Short_Text":
                return <ShortTextIcon
                  style={iconStyle}></ShortTextIcon>
              case "Long_Text":
                return <TextFieldsIcon
                  style={iconStyle}></TextFieldsIcon>
              // case "Number":
              //   return <LooksTwoIcon
              //     style={iconStyle}></LooksTwoIcon>
              case "Dropdown":
                return <ArrowDropDownCircleIcon
                  style={iconStyle}></ArrowDropDownCircleIcon>
              case "Phone":
                return <PhoneIcon
                  style={iconStyle}></PhoneIcon>
              case "Date_Picker":
                return <EventIcon
                  style={iconStyle}></EventIcon>
              case "Time":
                return <EventIcon
                  style={iconStyle}></EventIcon>
              case "Section_Header":
                return <TitleIcon
                  style={iconStyle}></TitleIcon>
              case "Button_Radios":
                return <img style={iconStyle} src="/assets/images/icons/Icon_ButtonRadio.svg" alt="Button_Radios"/>
              case "Button":
                return <img style={iconStyle} src="/assets/images/icons/Icon_Button.svg" alt="Button"/>
              case "Check_List":
                return <img style={iconStyle} src="/assets/images/icons/Icon_Checklist.svg" alt="Check_List"/>
              case "Configurable_List":
                return <img style={iconStyle} src="/assets/images/icons/Icon_InputTable.svg" alt="Input_Table"/>
              case "Number":
                return <img style={iconStyle} src="/assets/images/icons/Icon_Numbers.svg" alt="Number"/>
              case "Tiles":
                return <img style={iconStyle} src="/assets/images/icons/Icon_Tiles.svg" alt="Tiles"/>
              case "Attachment":
                return <img style={iconStyle} src="/assets/images/icons/attachment_black_24dp.svg" alt="attachment"/>
              default:
                return <i className={data.icon}></i>
            }
          })()}

          {/* {data.key == "Number" ? <LooksTwoIcon style={{ fontSize: '20px', marginLeft: '9px', marginRight: '10px' }}></LooksTwoIcon> : <i className={data.icon}></i>} */}

          {/* {data.key.split("_").join(" ")} */}
          {data.type}
        </li>,
      )
    );
  }
}

export default DragSource(ItemTypes.CARD, cardSource, connect => ({
  connectDragSource: connect.dragSource(),
}))(ToolbarItem);
