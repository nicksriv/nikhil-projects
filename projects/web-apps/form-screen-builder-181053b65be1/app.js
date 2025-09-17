import React from 'react';
import ReactDOM from 'react-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {
  Grid, TextField, Button
} from '@material-ui/core';
import DemoBar from './demobar';
import FormBuilder, { Registry } from './src/index';
import * as variables from './variables';
import V5FormBuilder from './src/v5-form-builder-wrapper';
import V5FormBuilderDemoBar from './src/v5-form-builder-demobar';
import V5FormBuilderToolbar from './src/v5-form-builder-toolbar';
import V5FormBuilderFeatureTemplate from './src/v5-form-builder-feature-templates';
import V5FormBuilderMasterScreens from './src/v5-form-builder-master-screens';
import withScrolling from 'react-dnd-scrolling';
// Add our stylesheets for the demo.
require('./scss/application.scss');

const url = '/api/formdata';
const saveUrl = '/api/formdata';

var items = [
  'Photo', 'Short_Text', 'Email', 'Number', 'Phone','Attachment', 'Single_Choice', 'Dropdown', 'Check_List', 'Date_Picker', 'Header', 'Long_Text', 'Signature', 'Section_Header', 'Location_Coordinates', 'Tab_Break', 'Configurable_List', 'Button_Radios', 'Input_Table', 'Photo_PREPOST', 'Page_Break', 'Two_Column_Row', 'Three_Column_Row', 'Four_Column_Row'
];

const toolboxOrigin = "right"; // left | right
const toolbarProps = {
  items: [
    'Short_Text',
    'Long_Text',
    'Button',
    'Number',
    'Dropdown',
    'Mapping_Dropdown',
    'Single_Choice',
    'Button_Radios',
    'Location_Coordinates',
    'Photo',
    'Video',
    'Check_List',
    'Email',
    'Phone',
    'Date_Picker',
    'Configurable_List',
    'Barcode_Scanner',
    'Section_Header',
    'Signature',
    'Tiles',
    'Time',
    'Attachment',
    // 'Header',
    // 'Tab_Break',
    // 'Input_Table',
    // 'Photo_PREPOST',
    // 'Page_Break',
    // 'Two_Column_Row',
    // 'Three_Column_Row',
    // 'Four_Column_Row'
  ]
};
const dummyComponent = (props) => {
  return (
    <div></div>
  )
}
const df = () => {
  //console.log('method called');
}

const ScrollingComponent = withScrolling('div');

ReactDOM.render(
  <Grid container direction="row" className='pb-4 w-full'>
      <Grid container spacing={3}>
        <Grid item lg={8} md={6} xs={12}>
          <DndProvider backend={HTML5Backend}>
            <ScrollingComponent className="App">
              <V5FormBuilder
                  url={'http://localhost:1337/api/v1/screen/formdata'}
                  pageMode={"editmasterscreen"}
                  screenTitle={"some name"}
                  formBuilderHeaderComponent={dummyComponent} />
            </ScrollingComponent>
          </DndProvider>
          <DndProvider backend={HTML5Backend}>
            <div>
              <V5FormBuilderDemoBar saveFormData={df} />
            </div>
          </DndProvider>
          <DndProvider backend={HTML5Backend}>
            <div>
              <V5FormBuilderMasterScreens masterScreensWorkflowData={[
                {
                  displayIndex: 1,
                  screenTitle: 'Master screen_01',
                  tableHeaders: [
                    {
                      key: 'date',
                      name: 'Date'
                    },
                    {
                      key: 'checkIn',
                      name: 'CheckIn'
                    },
                    {
                      key: 'checkOut',
                      name: 'Checkout'
                    },
                    {
                      key: 'duration',
                      name: 'Duration'
                    },
                    {
                      key: 'actionHeader',
                      icon: 'more_vert'
                    }
                  ],
                  tableData: [
                    {
                      date: '14-Dec',
                      checkIn: '9:10am',
                      checkOut: '5:10pm',
                      duration: '8hr'
                    },
                    {
                      date: '14-Dec',
                      checkIn: '9:10am',
                      checkOut: '5:10pm',
                      duration: '8hr'
                    },
                    {
                      date: '14-Dec',
                      checkIn: '9:10am',
                      checkOut: '5:10pm',
                      duration: '8hr'
                    }, {
                      date: '14-Dec',
                      checkIn: '9:10am',
                      checkOut: '5:10pm',
                      duration: '8hr'
                    },
                    {
                      date: '14-Dec',
                      checkIn: '9:10am',
                      checkOut: '5:10pm',
                      duration: '8hr'
                    },
                    {
                      date: '14-Dec',
                      checkIn: '9:10am',
                      checkOut: '5:10pm',
                      duration: '8hr'
                    }, {
                      date: '14-Dec',
                      checkIn: '9:10am',
                      checkOut: '5:10pm',
                      duration: '8hr'
                    },
                    {
                      date: '14-Dec',
                      checkIn: '9:10am',
                      checkOut: '5:10pm',
                      duration: '8hr'
                    },
                    {
                      date: '14-Dec',
                      checkIn: '9:10am',
                      checkOut: '5:10pm',
                      duration: '8hr'
                    }, {
                      date: '14-Dec',
                      checkIn: '9:10am',
                      checkOut: '5:10pm',
                      duration: '8hr'
                    },
                    {
                      date: '14-Dec',
                      checkIn: '9:10am',
                      checkOut: '5:10pm',
                      duration: '8hr'
                    },
                    {
                      date: '14-Dec',
                      checkIn: '9:10am',
                      checkOut: '5:10pm',
                      duration: '8hr'
                    }, {
                      date: '14-Dec',
                      checkIn: '9:10am',
                      checkOut: '5:10pm',
                      duration: '8hr'
                    },
                    {
                      date: '14-Dec',
                      checkIn: '9:10am',
                      checkOut: '5:10pm',
                      duration: '8hr'
                    },
                    {
                      date: '14-Dec',
                      checkIn: '9:10am',
                      checkOut: '5:10pm',
                      duration: '8hr'
                    }
                  ],
                  isListingPage: true,
                  isConsolidatedScreen: true
                },
                {
                  displayIndex: 2,
                  screenId: '61c46c32b51db92665de3fd2',
                  screenTitle: 'Master screen_02',
                  screenData: [
                    {
                      id: '07AB7E2C-25DE-43F2-8C3D-80BF17024131',
                      element: 'Short_Text',
                      fieldVariant: 'outlined',
                      inputFieldSize: 'large',
                      textAlignment: 'left',
                      customOptions: {
                        required: false,
                        isMasked: false,
                        maskedValue: '',
                        validation: 'None'
                      },
                      fieldName: 'shortText_742AF110-21D0-4A0F-BF84-6AE996489266',
                      label: 'Short Text Field'
                    },
                    {
                      id: 'F23D63C4-05C7-4707-932B-32AF71085C17',
                      element: 'Button',
                      type: 'Button',
                      fieldVariant: 'outlined',
                      inputFieldSize: 'large',
                      textAlignment: 'left',
                      buttonType: 'primary',
                      customOptions: {
                        required: true,
                        checked: true,
                        dataTable: false,
                        filtered: false,
                        componentType: 'Button'
                      },
                      fieldName: 'buttonF23D63C4-05C7-4707-932B-32AF71085C17',
                      label: 'REJECT'
                    },
                    {
                      id: '9A9585C6-8B44-4095-A3BE-9AA6B9CB455A',
                      element: 'Button',
                      type: 'Button',
                      fieldVariant: 'outlined',
                      inputFieldSize: 'large',
                      textAlignment: 'left',
                      buttonType: 'primary',
                      customOptions: {
                        required: true,
                        checked: true,
                        dataTable: false,
                        filtered: false,
                        componentType: 'Button'
                      },
                      fieldName: 'button935BD805-FAA4-4EEC-B508-CE2899616C60',
                      label: 'APPROVE'
                    },
                  ],
                  isListingPage: false,
                  isConsolidatedScreen: true,
                  nextScreenId: '61c46c32b51db92665de3fd2'
                },
                {
                  displayIndex: 3,
                  screenId: '61c46c32b51db92665de3fd2',
                  screenTitle: 'Master screen_03',
                  screenData: [
                    {
                      id: '07AB7E2C-25DE-43F2-8C3D-80BF17024131',
                      element: 'Short_Text',
                      fieldVariant: 'outlined',
                      inputFieldSize: 'large',
                      textAlignment: 'left',
                      customOptions: {
                        required: false,
                        isMasked: false,
                        maskedValue: '',
                        validation: 'None'
                      },
                      fieldName: 'shortText_742AF110-21D0-4A0F-BF84-6AE996489266',
                      label: 'Short Text Field'
                    }
                  ],
                  isListingPage: false,
                  isConsolidatedScreen: true,
                  nextScreenId: '61c46c32b51db92665de3fd2'
                },
                {
                  displayIndex: 4,
                  screenId: '61c46c32b51db92665de3fd2',
                  screenTitle: 'Master screen_04',
                  screenData: [
                    {
                      id: '07AB7E2C-25DE-43F2-8C3D-80BF17024131',
                      element: 'Short_Text',
                      fieldVariant: 'outlined',
                      inputFieldSize: 'large',
                      textAlignment: 'left',
                      customOptions: {
                        required: false,
                        isMasked: false,
                        maskedValue: '',
                        validation: 'None'
                      },
                      fieldName: 'shortText_742AF110-21D0-4A0F-BF84-6AE996489266',
                      label: 'Short Text Field'
                    }
                  ],
                  isListingPage: false,
                  isConsolidatedScreen: true,
                  nextScreenId: '61c46c32b51db92665de3fd2'
                }
              ]} />
            </div>
          </DndProvider>
        </Grid>
        <DndProvider backend={HTML5Backend}>
          <Grid item lg={4} md={6} xs={12}>
            <V5FormBuilderToolbar toolbarProps={toolbarProps} />
            <V5FormBuilderFeatureTemplate featureTemplates={[
              {
                id: '8bff45d6-7d0f-46f0-847a-6612e7892488',
                name: 'Photo12',
                form: [
                  {
                    id: 'B5EB3E0A-B044-4190-8250-46DCFF3C431E',
                    element: 'Tiles',
                    fieldVariant: 'outlined',
                    inputFieldSize: 'large',
                    textAlignment: 'left',
                    customOptions: {
                      required: false,
                      tileProperties: [
                        {
                          ID: 'Tile ID- COMPONENT001',
                          key: 'Tile ID- COMPONENT001',
                          title: '',
                          textRule: '',
                          shortTextValue: '',
                          numberTextValue: 0,
                          text: '',
                          rule: '',
                          tilesType: '',
                          component: '',
                          componentOnScreenSource: '',
                          componentOnScreenMethod: '',
                          componentOnScreenTarget: '',
                          tilesColor: '',
                          tilesRandomColor: '',
                          action: []
                        }
                      ],
                      columns: 1,
                      spacing: 1,
                      charecterLimit: 20
                    },
                    fieldName: 'tiles_E0A6DEA9-C6E3-43E2-A91B-F681573A333C',
                    label: 'Tiles'
                  },
                  {
                    id: '35FFECBC-873D-480C-BBC8-FB37A51AFC11',
                    element: 'Configurable_List',
                    fieldVariant: 'outlined',
                    inputFieldSize: 'large',
                    textAlignment: 'left',
                    customOptions: {
                      required: false,
                      optionsText: 'Header Item 1 : text: Enter text',
                      minimalRows: '1',
                      maximalRows: '0',
                      labelAdd: 'Add Row',
                      labelRemove: 'Remove',
                      headerActionLabel: 'Actions'
                    },
                    fieldName: 'configurable_list30801850-45E7-4220-B88E-9B82EE1F0C1F',
                    label: 'Input Table'
                  },
                  {
                    id: '886832FD-5669-4769-A817-1DE623CDD559',
                    element: 'Button',
                    fieldVariant: 'outlined',
                    inputFieldSize: 'large',
                    textAlignment: 'left',
                    customOptions: {
                      required: false
                    },
                    fieldName: 'buttonFCD572C4-9EBE-4A38-A2F9-6B96A8EC883E',
                    label: 'Button'
                  },
                  {
                    id: 'B7562C4D-AA31-493D-8385-FB3BE83073A4',
                    element: 'Photo',
                    fieldVariant: 'outlined',
                    inputFieldSize: 'large',
                    textAlignment: 'left',
                    customOptions: {
                      required: false,
                      cameraFacingOptions: 'front',
                      isPhotoAvail: true,
                      isPhotoUpload: true,
                      tapedrop: false,
                      isDistToBuilding: false,
                      distanceToBuildingRadius: '',
                      isTargetAzimuthAngle: false,
                      isEditPhoto: false,
                      isShowHelp: false,
                      isCommentsAvail: false,
                      isRadioGroup: false,
                      helpText: '',
                      sampleS3Uri: ''
                    },
                    fieldName: 'photoFE5669C9-7BE1-4F23-A9D7-B78EFBE9E435',
                    label: 'Photo',
                    singleChoiceOptions: [
                      {
                        value: 'option_1',
                        label: 'Option 1',
                        key: 'radiobuttons_option_2D74AAF7-A628-41D7-AB33-CD4E6A1F6A8A'
                      },
                      {
                        value: 'option_2',
                        label: 'Option 2',
                        key: 'radiobuttons_option_068D56D2-2FDA-4F85-8C8D-4B2EE5F68947'
                      }
                    ]
                  },
                  {
                    id: 'C2C02148-9D53-49C1-9B2F-AE7FDE13B62A',
                    element: 'Short_Text',
                    fieldVariant: 'outlined',
                    inputFieldSize: 'large',
                    textAlignment: 'left',
                    customOptions: {
                      required: false,
                      isMasked: false,
                      maskedValue: '',
                      validation: 'None'
                    },
                    fieldName: 'shortText_D24D3E91-00FB-43EB-8ACF-9071C6CE58EE',
                    label: 'Short Text Field',
                    displayOrder: 1
                  },
                  {
                    id: '74BADC52-CAC4-4CEA-B678-51AE45EEC000',
                    element: 'Number',
                    fieldVariant: 'outlined',
                    inputFieldSize: 'large',
                    textAlignment: 'left',
                    customOptions: {
                      required: false,
                      min: 0,
                      max: 1
                    },
                    fieldName: 'number_input_4A5332F0-46A4-49D9-8959-7B43D79961AD',
                    label: 'Numbers',
                    displayOrder: 2
                  }
                ]
              },
              {
                id: '284c51f3-b618-480f-9395-5e4bad205ec2',
                name: 'Contact Details',
                form: [
                  {
                    id: '431089F8-7795-4E8F-9116-CF4CE001B90C',
                    element: 'Short_Text',
                    fieldVariant: 'outlined',
                    inputFieldSize: 'large',
                    textAlignment: 'left',
                    customOptions: {
                      required: true,
                      isMasked: false,
                      maskedValue: '',
                      validation: 'None'
                    },
                    fieldName: 'shortText_75C6D0EC-97FE-4090-A108-7742B3765A73',
                    label: 'EMP ID',
                    dirty: false,
                    displayOrder: 3
                  },
                  {
                    id: 'BD575B80-DC57-4D11-8C4B-F49E8E2C7F7D',
                    element: 'Number',
                    fieldVariant: 'outlined',
                    inputFieldSize: 'large',
                    textAlignment: 'left',
                    customOptions: {
                      required: false,
                      min: 0,
                      max: 1
                    },
                    fieldName: 'number_input_17DF80F9-8FEE-4387-BE3A-69D984AA191A',
                    label: 'Numbers',
                    displayOrder: 4
                  },
                  {
                    id: 'D02D3918-AFD1-4694-BCE8-AA46AD3E2C9C',
                    element: 'Single_Choice',
                    fieldVariant: 'outlined',
                    inputFieldSize: 'large',
                    textAlignment: 'left',
                    customOptions: {
                      required: true,
                      isOtherOption: false,
                      isSpreadToColumn: false,
                      columns: 0
                    },
                    fieldName: 'singlechoice_F4BFBECB-B0F4-4AB7-8345-C993ABC7563F',
                    label: 'My Choice',
                    singleChoiceOptions: [
                      {
                        value: 'option_1',
                        label: 'Option 1',
                        key: 'radiobuttons_option_2169571A-EA35-4747-BB0D-C29A84B3D8A0'
                      },
                      {
                        value: 'option_2',
                        label: 'Option 2',
                        key: 'radiobuttons_option_BD7E5C45-7B77-4356-8313-D9A09AD2A041'
                      },
                      {
                        value: 'option_3',
                        label: 'Option 3',
                        key: 'radiobuttons_option_5C7D60E5-A501-4082-A1DF-EA1517BCF855'
                      }
                    ],
                    dirty: false,
                    displayOrder: 5
                  },
                  {
                    id: '1F3E1C3A-E131-45FF-8740-AEDDA9986988',
                    element: 'Email',
                    fieldVariant: 'outlined',
                    inputFieldSize: 'large',
                    textAlignment: 'left',
                    customOptions: {
                      required: false
                    },
                    fieldName: 'email_input_A7235CF1-9B4D-4C31-B954-F107E86B582B',
                    label: 'Email',
                    displayOrder: 6
                  },
                  {
                    id: '431089F8-7795-4E8F-9116-CF4CE001B90C',
                    element: 'Short_Text',
                    fieldVariant: 'outlined',
                    inputFieldSize: 'large',
                    textAlignment: 'left',
                    customOptions: {
                      required: true,
                      isMasked: false,
                      maskedValue: '',
                      validation: 'None'
                    },
                    fieldName: 'shortText_75C6D0EC-97FE-4090-A108-7742B3765A73',
                    label: 'EMP ID',
                    dirty: false,
                    displayOrder: 7
                  },
                ]
              }
            ]} />
          </Grid>
        </DndProvider>
      </Grid>
  </Grid>,
  document.getElementById('form-builder'),
);

// ReactDOM.render(
//   <V5FormBuilderDemoBar
//   />,
//   document.getElementById('demo-bar'),
// );
