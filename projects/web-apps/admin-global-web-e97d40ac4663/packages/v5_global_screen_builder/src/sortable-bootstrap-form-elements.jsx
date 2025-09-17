import SortableElement from './sortable-element';
import PlaceHolder from './form-place-holder';
import BaseFormElements from './form-elements';
import { Two_Column_Row, Three_Column_Row, Four_Column_Row } from './multi-column';
import CustomElement from './form-elements/custom-element';


const {
  Name, Phone,
  Header, Paragraph, Label, LineBreak, TextInput, NumberInput, TextArea, Dropdown, Checkboxes,
  DatePicker, RadioButtons, Image, Rating, Tags, Signature, HyperLink, Download, Camera, Range,
} = BaseFormElements;

const FormElements = {};
FormElements.Name = SortableElement(Name);
FormElements.Phone = SortableElement(Phone);

FormElements.Header = SortableElement(Header);
FormElements.Paragraph = SortableElement(Paragraph);
FormElements.Label = SortableElement(Label);
FormElements.LineBreak = SortableElement(LineBreak);
FormElements.TextInput = SortableElement(TextInput);
FormElements.NumberInput = SortableElement(NumberInput);
FormElements.TextArea = SortableElement(TextArea);
FormElements.Mapping_Dropdown = SortableElement(Dropdown);
FormElements.Dropdown = SortableElement(Dropdown);
FormElements.Signature = SortableElement(Signature);
FormElements.Checkboxes = SortableElement(Checkboxes);
FormElements.DatePicker = SortableElement(DatePicker);
FormElements.RadioButtons = SortableElement(RadioButtons);
FormElements.Image = SortableElement(Image);
FormElements.Rating = SortableElement(Rating);
FormElements.Tags = SortableElement(Tags);
FormElements.HyperLink = SortableElement(HyperLink);
FormElements.Download = SortableElement(Download);
FormElements.Camera = SortableElement(Camera);
FormElements.Range = SortableElement(Range);
FormElements.PlaceHolder = SortableElement(PlaceHolder);
FormElements.Two_Column_Row = SortableElement(Two_Column_Row);
FormElements.Three_Column_Row = SortableElement(Three_Column_Row);
FormElements.Four_Column_Row = SortableElement(Four_Column_Row);
FormElements.CustomElement = SortableElement(CustomElement);

export default FormElements;