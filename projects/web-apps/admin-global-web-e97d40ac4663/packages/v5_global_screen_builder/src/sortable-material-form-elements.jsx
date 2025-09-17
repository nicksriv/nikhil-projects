import PlaceHolder from './form-place-holder';
import SortableElement from './sortable-element';
import Elements from './meterial-form-elements';
import { Two_Column_Row, Three_Column_Row, Four_Column_Row } from './multi-column';

const { Email, Single_Choice, Page_Break, Text, Number, Phone, Input_Table, Section_Header, Attachment, Signature, Dropdown,Mapping_Dropdown, Header, Short_Text, Photo, Video, Photo_PrePost, Long_Text, Check_List, Date_Picker, Configurable_List, Button_Radios, Location_Coordinates, Tab_Break ,Button, Tiles, Barcode_Scanner, Time} = Elements;

const FormElements = {};
FormElements.Text = SortableElement(Text);
FormElements.Phone = SortableElement(Phone);
FormElements.Email = SortableElement(Email);
FormElements.Photo = SortableElement(Photo);
FormElements.Video = SortableElement(Video);
FormElements.Number = SortableElement(Number);
FormElements.Header = SortableElement(Header);
FormElements.Dropdown = SortableElement(Dropdown);
// FormElements.Mapping_Dropdown = SortableElement(Mapping_Dropdown);
FormElements.Mapping_Dropdown = SortableElement(Dropdown);
FormElements.Check_List = SortableElement(Check_List);
FormElements.Long_Text = SortableElement(Long_Text);
FormElements.Signature = SortableElement(Signature);
FormElements.Short_Text = SortableElement(Short_Text);
FormElements.Page_Break = SortableElement(Page_Break);
FormElements.Input_Table = SortableElement(Input_Table);
FormElements.Photo_PrePost = SortableElement(Photo_PrePost);
FormElements.Single_Choice = SortableElement(Single_Choice);
FormElements.Section_Header = SortableElement(Section_Header);
FormElements.Two_Column_Row = SortableElement(Two_Column_Row);
FormElements.Four_Column_Row = SortableElement(Four_Column_Row);
FormElements.Three_Column_Row = SortableElement(Three_Column_Row);
FormElements.Date_Picker = SortableElement(Date_Picker);
FormElements.Configurable_List = SortableElement(Configurable_List);
FormElements.Button_Radios = SortableElement(Button_Radios);
FormElements.Location_Coordinates = SortableElement(Location_Coordinates);
FormElements.Tab_Break = SortableElement(Tab_Break);
FormElements.Button = SortableElement(Button);
FormElements.Tiles = SortableElement(Tiles);
FormElements.Barcode_Scanner = SortableElement(Barcode_Scanner);
FormElements.Time = SortableElement(Time);
FormElements.Attachment = SortableElement(Attachment)

export default FormElements;