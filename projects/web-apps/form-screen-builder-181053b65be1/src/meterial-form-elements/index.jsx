import React from 'react';
import Email from './email';
import Phone from './phone';
import Number from './number';
import Header from './header';
import Photo from './take-photo';
import Video from './take-video';
import Dropdown from './dropdown';
import Mapping_Dropdown from './mapping_dropdown'
import Signature from './signature';
import Long_Text from './long-text';
import Short_Text from './shortText';
import Input_Table from './tableComponent';
import Single_Choice from './single-choice';
import Photo_PrePost from './photo-prepost';
import CheckList from './checklist';
import DatePicker from './datepicker';
import Attachment from './attachment';
import { makeStyles } from '@material-ui/core/styles';
import ComponentHeader from '../form-elements/component-header';
import { TextField, Card, CardContent, Typography } from '@material-ui/core';
import Configurable_List from './configurable-list';
import Button_Radios from './button_radios';
import Location_Coordinates from './location_coordinates';
import TabsComponent from './tabs';
import Buttonn from "./Button";
import Tiles from './tiles';
import Barcode_Scanner from './barcode-scanner';
import Time from './time';
import ComponentLabel from './material-element-label';

const useStyles = bg => makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: bg,
        height: 50,
        padding: '0px'
    },
    cardcontent: {
        padding: '11px',
        align: "center"
    },
    typography: {
        flexGrow: 1,
        textAlign: "center",
        color: "#F6F6F6",
        fontSize: 18,
        fontWeight:100
    }
}));

class Text extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputText: ""
        }
    }

    textChange = event => {
        let value = event.target.value;

        if(this.props.data.isCharLimit)
            if(value.length > this.props.data.charLimit)
                return;

        this.setState({inputText: value});            
    }

    render() {
        const propsData = this.props.data;
        let fieldVariant = "";
        if(this.props.globalStyles){
            fieldVariant = (!this.props.globalStyles.formDefault && propsData.hasOwnProperty("fieldVariant")) ? propsData.fieldVariant : this.props.globalStyles.globalFieldVariant;
        }else{
            if(propsData.fieldVariant) fieldVariant = propsData.fieldVariant;
        }
        const CHARACTER_LIMIT = (propsData.isCharLimit && propsData.charLimit > 0) ? propsData.charLimit : 0;

        let inputProps = {};
        if(CHARACTER_LIMIT){ 
            inputProps = {
                maxlength: CHARACTER_LIMIT
            }
        }
        return (
            <div className="SortableItem rfb-item">
                <ComponentHeader {...this.props} />
                <div className="form-group">
                    <TextField    
                        fullWidth 
                        size="small" 
                        id={this.props.id}
                        variant={fieldVariant} 
                        label={propsData.mask ? "#######" : propsData.label} 
                        required={propsData.required}
                        name={this.props.data.fieldName} 
                        inputProps={inputProps}
                        value={this.state.inputText}
                        helperText={(CHARACTER_LIMIT > 0) ? "Character limit is "+CHARACTER_LIMIT : ""}
                        onChange={this.textChange.bind(this)}
                    />
                </div>
            </div>
        );
    }
}

const Section_Header = (props) =>  {
    let sectionBg = props.data.customOptions.sectionHeaderBGColor;
    const classes = useStyles(sectionBg)();
    
    // if (props.read_only) {
    //     props.disabled = 'disabled';
    // }
    let inputWidth = "100%";
    if (props.data.inputFieldSize == 'large') {
        inputWidth = "100%";
    } else if (props.data.inputFieldSize == 'medium') {
        inputWidth = "50%";
    } else if (props.data.inputFieldSize == 'small') {
        inputWidth = "25%";
    }

    return (
        <div className="SortableItem rfb-item">
            <ComponentHeader {...props} />
            <div className="form-group" style={{width: inputWidth}}>
            <ComponentLabel {...props} />
                <Card className={classes.root}>
                    <CardContent className={classes.cardcontent}>
                        <Typography className={classes.typography} variant="h5" component="h2">
                            <b>{props.data.label}</b>
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

const Page_Break = (props) => {
    return (
        <div className="SortableItem rfb-item">
            <ComponentHeader {...props} />
            <div className="preview-page-break">Page Break</div>
        </div>
    );

}

const FormElements = {};

FormElements.Text =  Text;
FormElements.Email = Email;
FormElements.Phone = Phone;
FormElements.Photo = Photo;
FormElements.Video = Video;
FormElements.Header = Header;
FormElements.Number = Number;
FormElements.Dropdown = Dropdown;
FormElements.Mapping_Dropdown = Mapping_Dropdown;
FormElements.Signature = Signature;
FormElements.Long_Text = Long_Text;
FormElements.Check_List = CheckList;
FormElements.Short_Text = Short_Text;
FormElements.Page_Break = Page_Break;
FormElements.Input_Table = Input_Table;
FormElements.Single_Choice = Single_Choice;
FormElements.Photo_PrePost = Photo_PrePost;
FormElements.Section_Header = Section_Header;
FormElements.Date_Picker = DatePicker;
FormElements.Configurable_List = Configurable_List;
FormElements.Button_Radios = Button_Radios;
FormElements.Location_Coordinates = Location_Coordinates;
FormElements.Tab_Break = TabsComponent;
FormElements.Button = Buttonn;
FormElements.Tiles = Tiles;
FormElements.Barcode_Scanner = Barcode_Scanner;
FormElements.Time = Time;
FormElements.Attachment = Attachment;

export default FormElements;