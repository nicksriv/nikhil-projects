"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireDefault(require("react"));

var _core = require("@material-ui/core");

var _Menu = _interopRequireDefault(require("@material-ui/icons/Menu"));

var _styles = require("@material-ui/styles");

var _InfoOutlined = _interopRequireDefault(require("@material-ui/icons/InfoOutlined"));

var _store = _interopRequireDefault(require("./stores/store"));

var _materialForm = _interopRequireDefault(require("./materialForm"));

var _editForm = _interopRequireDefault(require("./edit-form"));

var _v5FormBuilderPreviewPopup = _interopRequireDefault(require("./v5-form-builder-preview-popup"));

var _v5FormBuilderSlaveScreen = _interopRequireDefault(require("./v5-form-builder-slave-screen"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var answers = {};
var formQuestions = '{"_id":"60fe6ab8c297dd28a70af183","_partition":"company=60db729dea1719b9bf0a8e68_site=60db73234682654794007d41_node=60db744c4682654794007d42_docType=formbuilderquestions","changelog":[],"companyIdList":["60db729dea1719b9bf0a8e68"],"createdBy":"sridharlatlong","createdDate":1627286200387,"description":"","docId":"formbuilderquestions=60fe6ab8c297dd28a70af183","docType":"formbuilderquestions","formName":"Mobile single","formVersion":"1627284571927","isTemplate":null,"list":[{"checkboxArray":[],"checkListOptions":[],"customOptions":{"cameraFacingOptions":null,"countryCode":null,"defaultOptions":null,"distanceToBuildingRadius":null,"editorMode":null,"editorModeOptions":null,"emptyOptionText":null,"fileNamingConvention":null,"helpText":null,"imageFile":null,"is360Avail":null,"is360PhotoUpload":null,"isBarcodeAvail":null,"isCommentPopAvail":null,"isCommentsAvail":null,"isDistToBuilding":null,"isEditPhoto":null,"isLimitEntry":null,"isMasked":null,"isNotApplicable":null,"isNumberLimit":null,"isOtherOption":null,"isPhotoAvail":null,"isPhotoUpload":null,"isPostAvail":null,"isPostPhotoUpload":null,"isPreAvail":null,"isPrePhotoUpload":null,"isRadioGroup":null,"isShowHelp":null,"isSpreadToColumn":null,"isTargetAzimuthAngle":null,"isVideoUpload":null,"limitType":null,"limitTypeOptions":null,"maskedValue":null,"max":null,"min":null,"optionsText":null,"otherOptionText":null,"required":false,"sampleS3Uri":null,"sectionHeaderBGColor":"#202020","showEmptyTextOption":null,"showLine":null,"tapedrop":null,"validation":null,"validationOptions":null,"validationType":null},"dirty":null,"dropDownOptions":[],"element":"Section_Header","elementId":null,"fieldName":"section_header_B4A3D940-9EE8-49FE-A981-A4482431E876","fieldVariant":"outlined","globalStyles":{"formDefault":false,"globalFieldVariant":null},"headerList":[],"id":"C62675DD-889E-4153-B89C-0A776907AF1D","label":"Section Header","name":null,"pageId":"1","rows":[],"sectionId":"1","sequence":0,"singleChoiceOptions":[],"style":null,"text":null,"title":null,"type":null},{"checkboxArray":[],"checkListOptions":[],"customOptions":{"cameraFacingOptions":null,"countryCode":null,"defaultOptions":null,"distanceToBuildingRadius":null,"editorMode":null,"editorModeOptions":null,"emptyOptionText":null,"fileNamingConvention":null,"helpText":null,"imageFile":null,"is360Avail":null,"is360PhotoUpload":null,"isBarcodeAvail":null,"isCommentPopAvail":null,"isCommentsAvail":null,"isDistToBuilding":null,"isEditPhoto":null,"isLimitEntry":null,"isMasked":false,"isNotApplicable":null,"isNumberLimit":null,"isOtherOption":null,"isPhotoAvail":null,"isPhotoUpload":null,"isPostAvail":null,"isPostPhotoUpload":null,"isPreAvail":null,"isPrePhotoUpload":null,"isRadioGroup":null,"isShowHelp":null,"isSpreadToColumn":null,"isTargetAzimuthAngle":null,"isVideoUpload":null,"limitType":null,"limitTypeOptions":null,"maskedValue":"","max":null,"min":null,"optionsText":null,"otherOptionText":null,"required":false,"sampleS3Uri":null,"sectionHeaderBGColor":null,"showEmptyTextOption":null,"showLine":null,"tapedrop":null,"validation":"None","validationOptions":null,"validationType":null},"dirty":null,"dropDownOptions":[],"element":"Short_Text","elementId":null,"fieldName":"shortText_0BC098DC-BBC6-4109-AEFE-BDE372D128A3","fieldVariant":"outlined","globalStyles":{"formDefault":false,"globalFieldVariant":null},"headerList":[],"id":"A68F11CC-3B0E-48C5-A8A2-6C3F9792F7D2","label":"Short Text","name":null,"pageId":"1","rows":[],"sectionId":"1","sequence":1,"singleChoiceOptions":[],"style":null,"text":null,"title":null,"type":null},{"checkboxArray":[],"checkListOptions":[],"customOptions":{"cameraFacingOptions":"front","countryCode":null,"defaultOptions":null,"distanceToBuildingRadius":"","editorMode":null,"editorModeOptions":null,"emptyOptionText":null,"fileNamingConvention":null,"helpText":"","imageFile":null,"is360Avail":null,"is360PhotoUpload":null,"isBarcodeAvail":null,"isCommentPopAvail":null,"isCommentsAvail":false,"isDistToBuilding":false,"isEditPhoto":false,"isLimitEntry":null,"isMasked":null,"isNotApplicable":null,"isNumberLimit":null,"isOtherOption":null,"isPhotoAvail":true,"isPhotoUpload":false,"isPostAvail":null,"isPostPhotoUpload":null,"isPreAvail":null,"isPrePhotoUpload":null,"isRadioGroup":false,"isShowHelp":false,"isSpreadToColumn":null,"isTargetAzimuthAngle":false,"isVideoUpload":null,"limitType":null,"limitTypeOptions":null,"maskedValue":null,"max":null,"min":null,"optionsText":null,"otherOptionText":null,"required":false,"sampleS3Uri":"","sectionHeaderBGColor":null,"showEmptyTextOption":null,"showLine":null,"tapedrop":false,"validation":null,"validationOptions":null,"validationType":null},"dirty":null,"dropDownOptions":[],"element":"Photo","elementId":null,"fieldName":"photo8C534EC2-B06D-416B-BB93-7E5FE9B9DF03","fieldVariant":"outlined","globalStyles":{"formDefault":false,"globalFieldVariant":null},"headerList":[],"id":"DD6EDEC1-5BC3-4836-8758-4BED0BD33A8E","label":"Photo","name":null,"pageId":"1","rows":[],"sectionId":"1","sequence":2,"singleChoiceOptions":[{"key":"radiobuttons_option_49B256B0-FE39-4E0C-BFF6-BB9D943375DF","label":"Option 1","value":"option_1"},{"key":"radiobuttons_option_85D83210-9EED-4485-A6F3-64E07F4B0CE6","label":"Option 2","value":"option_2"}],"style":null,"text":null,"title":null,"type":null}],"nodeIdList":["60db744c4682654794007d42"],"siteIdList":["60db73234682654794007d41"],"styles":null,"tags":null,"typeOfForm":"single","typename":"FormBuilderQuestionsDoc","updatedBy":"sridharlatlong","updatedDate":1627286200387}';
var formAnswers = '{"_id":"61011d04331a9c36df9f44a2","_partition":"company=60db729dea1719b9bf0a8e68_site=60db73234682654794007d41_node=60db744c4682654794007d42_docType=formbuilderanswers","answerSetId":"61011d04331a9c36df9f44a2","answerTimestamp":"1627462919285","appVersion":"1.0-ECSite oDas(1)","attributes":null,"companyId":"60db729dea1719b9bf0a8e68","companyIdList":["60db729dea1719b9bf0a8e68"],"createdBy":"sridharlatlong","createdDate":1627462919285,"description":null,"deviceId":"F4B92DA7-30FA-415E-B050-672B1B7526E0","deviceType":"iOS","docId":"formbuilderanswers=61011d04331a9c36df9f44a2","docType":"formbuilderanswers","formId":"60fe6ab8c297dd28a70af183","lat":37.785834,"lng":-122.406417,"location":{"coordinates":[],"type":null},"nodeId":"60db744c4682654794007d42","nodeIdList":["60db744c4682654794007d42"],"reportName":"","siteId":"60db73234682654794007d41","siteIdList":["60db73234682654794007d41"],"tags":null,"typename":"FormBuilderAnswersDoc","updatedBy":"sridharlatlong","updatedDate":1627462919285,"userId":"sridharlatlong"}';
var fieldResult = '[{"_id":"61022af0e0023024b3b3c50e","_partition":"company=60db729dea1719b9bf0a8e68_site=60db73234682654794007d41_node=60db744c4682654794007d42_docType=fieldresult","answerSetId":"61022af0e0023024b3b3c50c","answerTimestamp":"1627532016327","appVersion":"1.0-ECSite oDas(1)","attributes":null,"channels":null,"checkboxValues":null,"comments":null,"companyId":"60db729dea1719b9bf0a8e68","companyIdList":["60db729dea1719b9bf0a8e68"],"completePercent":null,"createdBy":"sridharlatlong","createdDate":1627532016328,"deviceId":"F4B92DA7-30FA-415E-B050-672B1B7526E0","deviceType":"iOS","docId":"fieldresult=61022af0e0023024b3b3c50e","docType":"fieldresult","field_name":null,"formId":"60fe6ab8c297dd28a70af183","id":null,"javaClass":null,"key":null,"label":null,"labelName":null,"lat":37.785834,"lng":-122.406417,"location":{"coordinates":[],"type":null},"mediaCount":null,"nodeId":"60db744c4682654794007d42","nodeIdList":["60db744c4682654794007d42"],"nodeIdNum":null,"notApplicable":null,"notRequired":null,"notes":null,"optional":null,"parentDocId":null,"questionId":"A68F11CC-3B0E-48C5-A8A2-6C3F9792F7D2","siteId":"60db73234682654794007d41","siteIdList":["60db73234682654794007d41"],"siteIdNum":null,"status":null,"tags":null,"typename":"FieldResultDoc","updatedBy":"sridharlatlong","updatedDate":1627532016328,"userId":"sridharlatlong","value":"5 Images"},{"_id":"61022af0e0023024b3b3c50f","_partition":"company=60db729dea1719b9bf0a8e68_site=60db73234682654794007d41_node=60db744c4682654794007d42_docType=fieldresult","answerSetId":"61022af0e0023024b3b3c50c","answerTimestamp":"1627532016327","appVersion":"1.0-ECSite oDas(1)","attributes":null,"channels":null,"checkboxValues":null,"comments":null,"companyId":"60db729dea1719b9bf0a8e68","companyIdList":["60db729dea1719b9bf0a8e68"],"completePercent":null,"createdBy":"sridharlatlong","createdDate":1627532016328,"deviceId":"F4B92DA7-30FA-415E-B050-672B1B7526E0","deviceType":"iOS","docId":"fieldresult=61022af0e0023024b3b3c50f","docType":"fieldresult","field_name":null,"formId":"60fe6ab8c297dd28a70af183","id":null,"javaClass":null,"key":null,"label":null,"labelName":null,"lat":37.785834,"lng":-122.406417,"location":{"coordinates":[],"type":null},"mediaCount":null,"nodeId":"60db744c4682654794007d42","nodeIdList":["60db744c4682654794007d42"],"nodeIdNum":null,"notApplicable":null,"notRequired":null,"notes":null,"optional":null,"parentDocId":null,"questionId":"DD6EDEC1-5BC3-4836-8758-4BED0BD33A8E","siteId":"60db73234682654794007d41","siteIdList":["60db73234682654794007d41"],"siteIdNum":null,"status":null,"tags":null,"typename":"FieldResultDoc","updatedBy":"sridharlatlong","updatedDate":1627532016328,"userId":"sridharlatlong","value":null},{"_id":"61022af0e0023024b3b3c50d","_partition":"company=60db729dea1719b9bf0a8e68_site=60db73234682654794007d41_node=60db744c4682654794007d42_docType=fieldresult","answerSetId":"61022af0e0023024b3b3c50c","answerTimestamp":"1627532016327","appVersion":"1.0-ECSite oDas(1)","attributes":null,"channels":null,"checkboxValues":null,"comments":null,"companyId":"60db729dea1719b9bf0a8e68","companyIdList":["60db729dea1719b9bf0a8e68"],"completePercent":null,"createdBy":"sridharlatlong","createdDate":1627532016328,"deviceId":"F4B92DA7-30FA-415E-B050-672B1B7526E0","deviceType":"iOS","docId":"fieldresult=61022af0e0023024b3b3c50d","docType":"fieldresult","field_name":null,"formId":"60fe6ab8c297dd28a70af183","id":null,"javaClass":null,"key":null,"label":null,"labelName":null,"lat":37.785834,"lng":-122.406417,"location":{"coordinates":[],"type":null},"mediaCount":null,"nodeId":"60db744c4682654794007d42","nodeIdList":["60db744c4682654794007d42"],"nodeIdNum":null,"notApplicable":null,"notRequired":null,"notes":null,"optional":null,"parentDocId":null,"questionId":"C62675DD-889E-4153-B89C-0A776907AF1D","siteId":"60db73234682654794007d41","siteIdList":["60db73234682654794007d41"],"siteIdNum":null,"status":null,"tags":null,"typename":"FieldResultDoc","updatedBy":"sridharlatlong","updatedDate":1627532016328,"userId":"sridharlatlong","value":null}]';
var fieldMedia = '[{"_id":"61022b25e0023024b3b3c517","_partition":"company=60db729dea1719b9bf0a8e68_site=60db73234682654794007d41_node=60db744c4682654794007d42_docType=fieldmedia","act_dist_to_bldg_ft":null,"act_dist_to_bldg_inch":null,"actualAzimuthAngle":null,"actualValue":null,"androidId":null,"angleMeasureName":null,"angleUnit":null,"answerSetId":"61022af0e0023024b3b3c50c","answerTimestamp":null,"appVersion":"1.0","approvalComments":null,"approvalStatus":null,"approvalUser":null,"attributes":null,"changelog":[],"channels":null,"cm":null,"comments":null,"companyId":null,"companyIdList":["60db729dea1719b9bf0a8e68"],"createdBy":"sridharlatlong","createdDate":1627532034498,"deviceId":"F4B92DA7-30FA-415E-B050-672B1B7526E0","deviceId_old":null,"deviceType":"iOS","deviceType_old":null,"dist_to_bldg":null,"dist_to_bldg_avail":null,"docId":"fieldmedia=61022b25e0023024b3b3c517","docType":"fieldmedia","expectedValue":null,"feet":null,"field_name":"TESTNODE01_photo_1_20210729_94354.jpg","formId":"60fe6ab8c297dd28a70af183","inches":null,"iosId":"F4B92DA7-30FA-415E-B050-672B1B7526E0","isAnnotated":false,"isDeleted":false,"javaClass":null,"key":null,"label":null,"labelName":null,"lat":37,"lng":-122,"location":{"coordinates":[],"type":null},"mediaDocType":null,"meter":null,"mime":null,"n_a":null,"name":null,"nodeId":null,"nodeIdList":["60db744c4682654794007d42"],"nodeIdNum":null,"optional":null,"orientation_ph":null,"originalFieldMediaId":null,"parentFieldMediaId":null,"photoEdit":null,"photoType":"photo","questionId":"DD6EDEC1-5BC3-4836-8758-4BED0BD33A8E","s3uri":"https://ecsitedev.s3.us-west-2.amazonaws.com/bom/TESTNODE01_photo_1_20210729_94354.jpg","siteId":null,"siteIdList":["60db73234682654794007d41"],"siteIdNum":null,"tag":null,"tags":{"tag10":"","tag10Label":"","tag1":"60db729dea1719b9bf0a8e68","tag1Label":"","tag2":"60db73234682654794007d41","tag2Label":"","tag3":"60db744c4682654794007d42","tag3Label":"","tag4":null,"tag4Label":"","tag5":"Photo","tag5Label":"","tag6":"","tag6Label":"","tag7":"","tag7Label":"","tag8":"","tag8Label":"","tag9":"","tag9Label":""},"targetAzimuthAngle":null,"testMeasurement":null,"testMeasurementAlternate":null,"testMeasurementUnit":null,"testMeasurementUnitAlternate":null,"typename":null,"updatedBy":"sridharlatlong","updatedDate":1627532034498,"uri":"60db729dea1719b9bf0a8e68/60db73234682654794007d41/60db744c4682654794007d42/media/TESTNODE01_photo_1_20210729_94354.jpg","userId":null,"validationIsAccepted":null},{"_id":"61022b25e0023024b3b3c517","_partition":"company=60db729dea1719b9bf0a8e68_site=60db73234682654794007d41_node=60db744c4682654794007d42_docType=fieldmedia","act_dist_to_bldg_ft":null,"act_dist_to_bldg_inch":null,"actualAzimuthAngle":null,"actualValue":null,"androidId":null,"angleMeasureName":null,"angleUnit":null,"answerSetId":"61022af0e0023024b3b3c50c","answerTimestamp":null,"appVersion":"1.0","approvalComments":null,"approvalStatus":null,"approvalUser":null,"attributes":null,"changelog":[],"channels":null,"cm":null,"comments":null,"companyId":null,"companyIdList":["60db729dea1719b9bf0a8e68"],"createdBy":"sridharlatlong","createdDate":1627532034498,"deviceId":"F4B92DA7-30FA-415E-B050-672B1B7526E0","deviceId_old":null,"deviceType":"iOS","deviceType_old":null,"dist_to_bldg":null,"dist_to_bldg_avail":null,"docId":"fieldmedia=61022b25e0023024b3b3c517","docType":"fieldmedia","expectedValue":null,"feet":null,"field_name":"TESTNODE01_photo_1_20210729_94354.jpg","formId":"60fe6ab8c297dd28a70af183","inches":null,"iosId":"F4B92DA7-30FA-415E-B050-672B1B7526E0","isAnnotated":false,"isDeleted":false,"javaClass":null,"key":null,"label":null,"labelName":null,"lat":37,"lng":-122,"location":{"coordinates":[],"type":null},"mediaDocType":null,"meter":null,"mime":null,"n_a":null,"name":null,"nodeId":null,"nodeIdList":["60db744c4682654794007d42"],"nodeIdNum":null,"optional":null,"orientation_ph":null,"originalFieldMediaId":null,"parentFieldMediaId":null,"photoEdit":null,"photoType":"photo","questionId":"A68F11CC-3B0E-48C5-A8A2-6C3F9792F7D2","s3uri":"https://ecsitedev.s3.us-west-2.amazonaws.com/bom/TESTNODE01_photo_1_20210729_94354.jpg","siteId":null,"siteIdList":["60db73234682654794007d41"],"siteIdNum":null,"tag":null,"tags":{"tag10":"","tag10Label":"","tag1":"60db729dea1719b9bf0a8e68","tag1Label":"","tag2":"60db73234682654794007d41","tag2Label":"","tag3":"60db744c4682654794007d42","tag3Label":"","tag4":null,"tag4Label":"","tag5":"Photo","tag5Label":"","tag6":"","tag6Label":"","tag7":"","tag7Label":"","tag8":"","tag8Label":"","tag9":"","tag9Label":""},"targetAzimuthAngle":null,"testMeasurement":null,"testMeasurementAlternate":null,"testMeasurementUnit":null,"testMeasurementUnitAlternate":null,"typename":null,"updatedBy":"sridharlatlong","updatedDate":1627532034498,"uri":"60db729dea1719b9bf0a8e68/60db73234682654794007d41/60db744c4682654794007d42/media/TESTNODE01_photo_1_20210729_94354.jpg","userId":null,"validationIsAccepted":null},{"_id":"61022b25e0023024b3b3c518","_partition":"company=60db729dea1719b9bf0a8e68_site=60db73234682654794007d41_node=60db744c4682654794007d42_docType=fieldmedia","act_dist_to_bldg_ft":null,"act_dist_to_bldg_inch":null,"actualAzimuthAngle":null,"actualValue":null,"androidId":null,"angleMeasureName":null,"angleUnit":null,"answerSetId":"61022af0e0023024b3b3c50c","answerTimestamp":null,"appVersion":"1.0","approvalComments":null,"approvalStatus":null,"approvalUser":null,"attributes":null,"changelog":[],"channels":null,"cm":null,"comments":null,"companyId":null,"companyIdList":["60db729dea1719b9bf0a8e68"],"createdBy":"sridharlatlong","createdDate":1627532037362,"deviceId":"F4B92DA7-30FA-415E-B050-672B1B7526E0","deviceId_old":null,"deviceType":"iOS","deviceType_old":null,"dist_to_bldg":null,"dist_to_bldg_avail":null,"docId":"fieldmedia=61022b25e0023024b3b3c518","docType":"fieldmedia","expectedValue":null,"feet":null,"field_name":"TESTNODE01_photo_1_20210729_94357.jpg","formId":"60fe6ab8c297dd28a70af183","inches":null,"iosId":"F4B92DA7-30FA-415E-B050-672B1B7526E0","isAnnotated":false,"isDeleted":false,"javaClass":null,"key":null,"label":null,"labelName":null,"lat":37,"lng":-122,"location":{"coordinates":[],"type":null},"mediaDocType":null,"meter":null,"mime":null,"n_a":null,"name":null,"nodeId":null,"nodeIdList":["60db744c4682654794007d42"],"nodeIdNum":null,"optional":null,"orientation_ph":null,"originalFieldMediaId":null,"parentFieldMediaId":null,"photoEdit":null,"photoType":"photo","questionId":"DD6EDEC1-5BC3-4836-8758-4BED0BD33A8E","s3uri":"https://ecsitedev.s3.us-west-2.amazonaws.com/bom/TESTNODE01_photo_1_20210729_94357.jpg","siteId":null,"siteIdList":["60db73234682654794007d41"],"siteIdNum":null,"tag":null,"tags":{"tag10":"","tag10Label":"","tag1":"60db729dea1719b9bf0a8e68","tag1Label":"","tag2":"60db73234682654794007d41","tag2Label":"","tag3":"60db744c4682654794007d42","tag3Label":"","tag4":null,"tag4Label":"","tag5":"Photo","tag5Label":"","tag6":"","tag6Label":"","tag7":"","tag7Label":"","tag8":"","tag8Label":"","tag9":"","tag9Label":""},"targetAzimuthAngle":null,"testMeasurement":null,"testMeasurementAlternate":null,"testMeasurementUnit":null,"testMeasurementUnitAlternate":null,"typename":null,"updatedBy":"sridharlatlong","updatedDate":1627532037362,"uri":"60db729dea1719b9bf0a8e68/60db73234682654794007d41/60db744c4682654794007d42/media/TESTNODE01_photo_1_20210729_94357.jpg","userId":null,"validationIsAccepted":null},{"_id":"61022b25e0023024b3b3c519","_partition":"company=60db729dea1719b9bf0a8e68_site=60db73234682654794007d41_node=60db744c4682654794007d42_docType=fieldmedia","act_dist_to_bldg_ft":null,"act_dist_to_bldg_inch":null,"actualAzimuthAngle":null,"actualValue":null,"androidId":null,"angleMeasureName":null,"angleUnit":null,"answerSetId":"61022af0e0023024b3b3c50c","answerTimestamp":null,"appVersion":"1.0","approvalComments":null,"approvalStatus":null,"approvalUser":null,"attributes":null,"changelog":[],"channels":null,"cm":null,"comments":null,"companyId":null,"companyIdList":["60db729dea1719b9bf0a8e68"],"createdBy":"sridharlatlong","createdDate":1627532052484,"deviceId":"F4B92DA7-30FA-415E-B050-672B1B7526E0","deviceId_old":null,"deviceType":"iOS","deviceType_old":null,"dist_to_bldg":null,"dist_to_bldg_avail":null,"docId":"fieldmedia=61022b25e0023024b3b3c519","docType":"fieldmedia","expectedValue":null,"feet":null,"field_name":"TESTNODE01_photo_1_20210729_94412.jpg","formId":"60fe6ab8c297dd28a70af183","inches":null,"iosId":"F4B92DA7-30FA-415E-B050-672B1B7526E0","isAnnotated":false,"isDeleted":false,"javaClass":null,"key":null,"label":null,"labelName":null,"lat":37,"lng":-122,"location":{"coordinates":[],"type":null},"mediaDocType":null,"meter":null,"mime":null,"n_a":null,"name":null,"nodeId":null,"nodeIdList":["60db744c4682654794007d42"],"nodeIdNum":null,"optional":null,"orientation_ph":null,"originalFieldMediaId":null,"parentFieldMediaId":null,"photoEdit":null,"photoType":"photo","questionId":"DD6EDEC1-5BC3-4836-8758-4BED0BD33A8E","s3uri":"https://ecsitedev.s3.us-west-2.amazonaws.com/bom/TESTNODE01_photo_1_20210729_94412.jpg","siteId":null,"siteIdList":["60db73234682654794007d41"],"siteIdNum":null,"tag":null,"tags":{"tag10":"","tag10Label":"","tag1":"60db729dea1719b9bf0a8e68","tag1Label":"","tag2":"60db73234682654794007d41","tag2Label":"","tag3":"60db744c4682654794007d42","tag3Label":"","tag4":null,"tag4Label":"","tag5":"Photo","tag5Label":"","tag6":"","tag6Label":"","tag7":"","tag7Label":"","tag8":"","tag8Label":"","tag9":"","tag9Label":""},"targetAzimuthAngle":null,"testMeasurement":null,"testMeasurementAlternate":null,"testMeasurementUnit":null,"testMeasurementUnitAlternate":null,"typename":null,"updatedBy":"sridharlatlong","updatedDate":1627532052484,"uri":"60db729dea1719b9bf0a8e68/60db73234682654794007d41/60db744c4682654794007d42/media/TESTNODE01_photo_1_20210729_94412.jpg","userId":null,"validationIsAccepted":null},{"_id":"61022b25e0023024b3b3c515","_partition":"company=60db729dea1719b9bf0a8e68_site=60db73234682654794007d41_node=60db744c4682654794007d42_docType=fieldmedia","act_dist_to_bldg_ft":null,"act_dist_to_bldg_inch":null,"actualAzimuthAngle":null,"actualValue":null,"androidId":null,"angleMeasureName":null,"angleUnit":null,"answerSetId":"61022af0e0023024b3b3c50c","answerTimestamp":null,"appVersion":"1.0","approvalComments":null,"approvalStatus":null,"approvalUser":null,"attributes":null,"changelog":[],"channels":null,"cm":null,"comments":null,"companyId":null,"companyIdList":["60db729dea1719b9bf0a8e68"],"createdBy":"sridharlatlong","createdDate":1627532027159,"deviceId":"F4B92DA7-30FA-415E-B050-672B1B7526E0","deviceId_old":null,"deviceType":"iOS","deviceType_old":null,"dist_to_bldg":null,"dist_to_bldg_avail":null,"docId":"fieldmedia=61022b25e0023024b3b3c515","docType":"fieldmedia","expectedValue":null,"feet":null,"field_name":"TESTNODE01_photo_1_20210729_94346.jpg","formId":"60fe6ab8c297dd28a70af183","inches":null,"iosId":"F4B92DA7-30FA-415E-B050-672B1B7526E0","isAnnotated":false,"isDeleted":false,"javaClass":null,"key":null,"label":null,"labelName":null,"lat":37,"lng":-122,"location":{"coordinates":[],"type":null},"mediaDocType":null,"meter":null,"mime":null,"n_a":null,"name":null,"nodeId":null,"nodeIdList":["60db744c4682654794007d42"],"nodeIdNum":null,"optional":null,"orientation_ph":null,"originalFieldMediaId":null,"parentFieldMediaId":null,"photoEdit":null,"photoType":"photo","questionId":"DD6EDEC1-5BC3-4836-8758-4BED0BD33A8E","s3uri":"https://ecsitedev.s3.us-west-2.amazonaws.com/bom/TESTNODE01_photo_1_20210729_94346.jpg","siteId":null,"siteIdList":["60db73234682654794007d41"],"siteIdNum":null,"tag":null,"tags":{"tag10":"","tag10Label":"","tag1":"60db729dea1719b9bf0a8e68","tag1Label":"","tag2":"60db73234682654794007d41","tag2Label":"","tag3":"60db744c4682654794007d42","tag3Label":"","tag4":null,"tag4Label":"","tag5":"Photo","tag5Label":"","tag6":"","tag6Label":"","tag7":"","tag7Label":"","tag8":"","tag8Label":"","tag9":"","tag9Label":""},"targetAzimuthAngle":null,"testMeasurement":null,"testMeasurementAlternate":null,"testMeasurementUnit":null,"testMeasurementUnitAlternate":null,"typename":null,"updatedBy":"sridharlatlong","updatedDate":1627532027159,"uri":"60db729dea1719b9bf0a8e68/60db73234682654794007d41/60db744c4682654794007d42/media/TESTNODE01_photo_1_20210729_94346.jpg","userId":null,"validationIsAccepted":null},{"_id":"61022b25e0023024b3b3c516","_partition":"company=60db729dea1719b9bf0a8e68_site=60db73234682654794007d41_node=60db744c4682654794007d42_docType=fieldmedia","act_dist_to_bldg_ft":null,"act_dist_to_bldg_inch":null,"actualAzimuthAngle":null,"actualValue":null,"androidId":null,"angleMeasureName":null,"angleUnit":null,"answerSetId":"61022af0e0023024b3b3c50c","answerTimestamp":null,"appVersion":"1.0","approvalComments":null,"approvalStatus":null,"approvalUser":null,"attributes":null,"changelog":[],"channels":null,"cm":null,"comments":null,"companyId":null,"companyIdList":["60db729dea1719b9bf0a8e68"],"createdBy":"sridharlatlong","createdDate":1627532031461,"deviceId":"F4B92DA7-30FA-415E-B050-672B1B7526E0","deviceId_old":null,"deviceType":"iOS","deviceType_old":null,"dist_to_bldg":null,"dist_to_bldg_avail":null,"docId":"fieldmedia=61022b25e0023024b3b3c516","docType":"fieldmedia","expectedValue":null,"feet":null,"field_name":"TESTNODE01_photo_1_20210729_94351.jpg","formId":"60fe6ab8c297dd28a70af183","inches":null,"iosId":"F4B92DA7-30FA-415E-B050-672B1B7526E0","isAnnotated":false,"isDeleted":false,"javaClass":null,"key":null,"label":null,"labelName":null,"lat":37,"lng":-122,"location":{"coordinates":[],"type":null},"mediaDocType":null,"meter":null,"mime":null,"n_a":null,"name":null,"nodeId":null,"nodeIdList":["60db744c4682654794007d42"],"nodeIdNum":null,"optional":null,"orientation_ph":null,"originalFieldMediaId":null,"parentFieldMediaId":null,"photoEdit":null,"photoType":"photo","questionId":"DD6EDEC1-5BC3-4836-8758-4BED0BD33A8E","s3uri":"https://ecsitedev.s3.us-west-2.amazonaws.com/bom/TESTNODE01_photo_1_20210729_94351.jpg","siteId":null,"siteIdList":["60db73234682654794007d41"],"siteIdNum":null,"tag":null,"tags":{"tag10":"","tag10Label":"","tag1":"60db729dea1719b9bf0a8e68","tag1Label":"","tag2":"60db73234682654794007d41","tag2Label":"","tag3":"60db744c4682654794007d42","tag3Label":"","tag4":null,"tag4Label":"","tag5":"Photo","tag5Label":"","tag6":"","tag6Label":"","tag7":"","tag7Label":"","tag8":"","tag8Label":"","tag9":"","tag9Label":""},"targetAzimuthAngle":null,"testMeasurement":null,"testMeasurementAlternate":null,"testMeasurementUnit":null,"testMeasurementUnitAlternate":null,"typename":null,"updatedBy":"sridharlatlong","updatedDate":1627532031461,"uri":"60db729dea1719b9bf0a8e68/60db73234682654794007d41/60db744c4682654794007d42/media/TESTNODE01_photo_1_20210729_94351.jpg","userId":null,"validationIsAccepted":null}]';

var V5FormBuilderDemoBar = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(V5FormBuilderDemoBar, _React$Component);

  var _super = _createSuper(V5FormBuilderDemoBar);

  function V5FormBuilderDemoBar(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, V5FormBuilderDemoBar);
    _this = _super.call(this, props);
    _this.state = {
      data: [],
      previewVisible: false,
      shortPreviewVisible: false,
      roPreviewVisible: false,
      generatedJSON: null
    };

    var update = _this._onChange.bind((0, _assertThisInitialized2["default"])(_this));

    _this._onSubmit = _this._onSubmit.bind((0, _assertThisInitialized2["default"])(_this));

    _store["default"].subscribe(function (state) {
      return update(state.data);
    });

    return _this;
  }

  (0, _createClass2["default"])(V5FormBuilderDemoBar, [{
    key: "showPreview",
    value: function showPreview(e) {
      e.preventDefault();
      this.setState({
        previewVisible: true
      });
    }
  }, {
    key: "saveFeatureTemplate",
    value: function saveFeatureTemplate(e) {
      e.preventDefault();
      var jsonData = this.state.data.map(function (_ref) {
        var globalStyles = _ref.globalStyles,
            remainingAttrs = (0, _objectWithoutProperties2["default"])(_ref, ["globalStyles"]);
        return remainingAttrs;
      });
      this.props.saveFeatureTemplate(e, jsonData);
    }
  }, {
    key: "discardChanges",
    value: function discardChanges(e) {
      e.preventDefault();

      _store["default"].dispatch('deleteAll');

      this.props.discardHandler(e);
    }
  }, {
    key: "saveScreen",
    value: function saveScreen(e) {
      e.preventDefault(); //store.dispatch('save', { data: this.state.data });

      var jsonData = this.state.data.map(function (_ref2) {
        var globalStyles = _ref2.globalStyles,
            remainingAttrs = (0, _objectWithoutProperties2["default"])(_ref2, ["globalStyles"]);
        return remainingAttrs;
      });

      _store["default"].dispatch('deleteAll');

      this.props.saveFormData(e, jsonData);
    }
  }, {
    key: "publishScreen",
    value: function publishScreen(e) {
      e.preventDefault();
      var jsonData = this.state.data.map(function (_ref3) {
        var globalStyles = _ref3.globalStyles,
            remainingAttrs = (0, _objectWithoutProperties2["default"])(_ref3, ["globalStyles"]);
        return remainingAttrs;
      });

      _store["default"].dispatch('deleteAll');

      this.props.publishFormData(e, jsonData);
    }
  }, {
    key: "showShortPreview",
    value: function showShortPreview() {
      this.setState({
        shortPreviewVisible: true
      });
    }
  }, {
    key: "showRoPreview",
    value: function showRoPreview() {
      this.setState({
        roPreviewVisible: true
      });
    }
  }, {
    key: "closePreview",
    value: function closePreview() {
      this.setState({
        previewVisible: false,
        shortPreviewVisible: false,
        roPreviewVisible: false
      });
    }
  }, {
    key: "_onChange",
    value: function _onChange(data) {
      // console.log("on change");
      this.setState({
        data: data,
        generatedJSON: null
      });
    } // eslint-disable-next-line no-unused-vars

  }, {
    key: "_onSubmit",
    value: function _onSubmit(data) {//console.log("on submit");
    }
  }, {
    key: "getGeneratedJSON",
    value: function getGeneratedJSON(JSON) {
      this.setState({
        generatedJSON: JSON
      });
    }
  }, {
    key: "collectFormData",
    value: function collectFormData(fieldResults, fieldMedia) {//console.log(fieldResults, fieldMedia);
    }
  }, {
    key: "imageUploadCallback",
    value: function imageUploadCallback(prop) {
      return this.imageUploadS3uri(prop.imageSrc);
    }
  }, {
    key: "imageUploadS3uri",
    value: function imageUploadS3uri(prop) {
      var promise = new Promise(function (resolve, reject) {
        window.setTimeout(function () {
          resolve(prop);
        }, 5000);
      });
      return promise;
    }
  }, {
    key: "getAllPhotosToPreview",
    value: function getAllPhotosToPreview(type, photosList, index) {// console.log("Photos to preview")
      // console.log(type); //string - "PHOTOS", "360DEGREE"
      // console.log(photosList[index]);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var modalClass = 'modal';

      if (this.state.previewVisible) {
        modalClass += ' show d-block';
      }

      var shortModalClass = 'modal short-modal';

      if (this.state.shortPreviewVisible) {
        shortModalClass += ' show d-block';
      }

      var roModalClass = 'modal ro-modal';

      if (this.state.roPreviewVisible) {
        roModalClass += ' show d-block';
      }

      var editJson = JSON.parse(formQuestions);
      var InfoIconTooltip = (0, _styles.styled)(function (_ref4) {
        var className = _ref4.className,
            props = (0, _objectWithoutProperties2["default"])(_ref4, ["className"]);
        return /*#__PURE__*/_react["default"].createElement(_core.Tooltip, (0, _extends2["default"])({}, props, {
          classes: {
            popper: className
          }
        }));
      })(function (_ref5) {
        var theme = _ref5.theme;
        return (0, _defineProperty2["default"])({}, "& .MuiTooltip-tooltip", {
          maxWidth: 200,
          fontSize: '0.75rem',
          textAlign: 'right'
        });
      });
      var tooltipText = "Status changes to Draft if user clicks on \"SAVE SCREEN\" button but didn't publish the module.";
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
        className: "react-form-builder clearfix",
        style: {
          bottom: 0,
          display: "flex",
          zIndex: 600,
          position: "sticky",
          alignItems: "center",
          marginBottom: "-1rem",
          marginTop: "0.2rem",
          width: "100%"
        }
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "react-form-builder-preview",
        style: {
          minHeight: '0px',
          marginTop: '4px',
          padding: "15px 10px"
        }
      }, this.state.data.length > 0 && /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        container: true,
        direction: "row",
        justify: "flex-end"
      }, /*#__PURE__*/_react["default"].createElement(_core.Grid, {
        item: true // style={{
        //     marginTop: '-10px',
        //     marginBottom: '-5px',
        // }}
        ,
        style: {
          position: 'absolute',
          top: '2px'
        }
      }, /*#__PURE__*/_react["default"].createElement(InfoIconTooltip, {
        title: tooltipText,
        placement: "top-end" //fontSize="small"
        ,
        style: {
          marginRight: '16px',
          color: '#a9a9a9',
          height: '18px'
        }
      }, /*#__PURE__*/_react["default"].createElement(_InfoOutlined["default"], null)))), /*#__PURE__*/_react["default"].createElement(_core.Button, {
        variant: "outlined",
        className: "".concat(this.state.data.length > 0 ? 'color-primary border-primary' : '#00000061'),
        style: {
          maxWidth: '91px',
          maxHeight: '35px',
          minWidth: '91px',
          minHeight: '35px',
          //color: `${this.state.data.length > 0 ? '#2A4FBC' : '#00000061'}`,
          marginRight: '10px' //fontWeight: 'bold'

        },
        onClick: function onClick(e) {
          return _this2.showPreview(e);
        },
        disabled: this.state.data.length > 0 ? false : true
      }, "PREVIEW"), /*#__PURE__*/_react["default"].createElement(_core.Button, {
        variant: "outlined",
        className: "".concat(this.state.data.length > 0 ? 'color-primary border-primary' : '#00000061'),
        style: {
          // maxWidth: '91px',
          maxHeight: '35px',
          // minWidth: '91px',
          minHeight: '35px',
          //color: `${this.state.data.length > 0 ? '#2A4FBC' : '#00000061'}`,
          marginRight: '10px' //fontWeight: 'bold'

        },
        onClick: function onClick(e) {
          return _this2.saveFeatureTemplate(e);
        },
        disabled: this.state.data.length > 0 ? false : true
      }, "SAVE FEATURE TEMPLATE"), this.props.showMasterScreen ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_core.Button, {
        variant: "contained",
        className: "float-right bg-primary",
        style: {
          // maxWidth: '91px',
          maxHeight: '35px',
          minWidth: '91px',
          minHeight: '35px',
          marginRight: '10px' //color: 'white'

        },
        onClick: function onClick(e) {
          return _this2.publishScreen(e);
        }
      }, 'PUBLISH')) : /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, this.state.data.length > 0 && this.props.screenName ? /*#__PURE__*/_react["default"].createElement(_core.Button, {
        variant: "contained",
        className: "float-right bg-primary",
        style: {
          // maxWidth: '91px',
          maxHeight: '35px',
          minWidth: '91px',
          minHeight: '35px',
          marginRight: '10px' //color: 'white'

        },
        onClick: function onClick(e) {
          return _this2.saveScreen(e);
        }
      }, 'SAVE SCREEN') : /*#__PURE__*/_react["default"].createElement(_core.Button, {
        variant: "contained",
        className: "float-right",
        style: {
          // maxWidth: '91px',
          maxHeight: '35px',
          minWidth: '91px',
          minHeight: '35px',
          //color: '#00000061',
          marginRight: '10px' //fontWeight: 'bold'

        },
        disabled: true
      }, "SAVE SCREEN")), /*#__PURE__*/_react["default"].createElement(_core.Button, {
        variant: "outlined",
        className: "float-right color-primary border-primary",
        style: {
          maxWidth: '91px',
          maxHeight: '35px',
          minWidth: '91px',
          minHeight: '35px',
          //color: '#2A4FBC',
          marginRight: '10px' //fontWeight: 'bold',
          //border:"1px solid #51BFB6"

        },
        onClick: function onClick(e) {
          return _this2.discardChanges(e);
        }
      }, "DISCARD"))), /*#__PURE__*/_react["default"].createElement("div", {
        className: "clearfix",
        style: {
          margin: '10px',
          width: '70%'
        }
      }, /*#__PURE__*/_react["default"].createElement(_v5FormBuilderPreviewPopup["default"], {
        open: this.state.previewVisible,
        handlePopUpClose: this.closePreview.bind(this),
        download_path: "" // back_action="/"
        // back_name="Back"
        ,
        answer_data: answers,
        action_name: "Save",
        form_action: "/api/form",
        form_method: "POST",
        hide_actions: false,
        skip_validations: false,
        onSubmit: this._onSubmit,
        isFormReadOnly: false,
        isBootstrapItems: false,
        imageUploadCallback: this.imageUploadCallback.bind(this) // variables={this.props.variables}
        ,
        data: this.state.data,
        fieldResult: JSON.parse(fieldResult),
        fieldMedia: JSON.parse(fieldMedia),
        generateBtnLabel: "Generate JSON and Save Form",
        collectFormData: this.collectFormData,
        getGeneratedJSON: this.getGeneratedJSON.bind(this),
        photoPreview: this.getAllPhotosToPreview.bind(this),
        closePreview: this.closePreview.bind(this),
        clientLogo: this.props.clientLogo,
        screenName: this.props.screenName,
        clientLogoForHeader: this.props.clientLogoForHeader
      }), this.state.shortPreviewVisible && /*#__PURE__*/_react["default"].createElement("div", {
        className: shortModalClass
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "modal-dialog modal-lg"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "modal-content border border-light p-3 mb-4"
      }, /*#__PURE__*/_react["default"].createElement(_materialForm["default"], {
        download_path: "",
        back_action: "",
        answer_data: answers,
        form_action: "/",
        form_method: "POST",
        data: this.state.data,
        display_short: true,
        variables: this.props.variables,
        hide_actions: false
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: "modal-footer",
        style: {
          borderTop: '1px solid #c8c8c8',
          textAlign: 'center'
        }
      }, /*#__PURE__*/_react["default"].createElement("button", {
        type: "button",
        className: "btn btn-default",
        "data-dismiss": "modal",
        onClick: this.closePreview.bind(this)
      }, "Close")))))));
    }
  }]);
  return V5FormBuilderDemoBar;
}(_react["default"].Component);

exports["default"] = V5FormBuilderDemoBar;