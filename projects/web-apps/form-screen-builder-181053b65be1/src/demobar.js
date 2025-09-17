import React from 'react';
import store from './stores/store';
import MaterialFormGenerator from './materialForm';
import EditForm from './edit-form';

const answers = {};

const formQuestions = '{"_id":"60fe6ab8c297dd28a70af183","_partition":"company=60db729dea1719b9bf0a8e68_site=60db73234682654794007d41_node=60db744c4682654794007d42_docType=formbuilderquestions","changelog":[],"companyIdList":["60db729dea1719b9bf0a8e68"],"createdBy":"sridharlatlong","createdDate":1627286200387,"description":"","docId":"formbuilderquestions=60fe6ab8c297dd28a70af183","docType":"formbuilderquestions","formName":"Mobile single","formVersion":"1627284571927","isTemplate":null,"list":[{"checkboxArray":[],"checkListOptions":[],"customOptions":{"cameraFacingOptions":null,"countryCode":null,"defaultOptions":null,"distanceToBuildingRadius":null,"editorMode":null,"editorModeOptions":null,"emptyOptionText":null,"fileNamingConvention":null,"helpText":null,"imageFile":null,"is360Avail":null,"is360PhotoUpload":null,"isBarcodeAvail":null,"isCommentPopAvail":null,"isCommentsAvail":null,"isDistToBuilding":null,"isEditPhoto":null,"isLimitEntry":null,"isMasked":null,"isNotApplicable":null,"isNumberLimit":null,"isOtherOption":null,"isPhotoAvail":null,"isPhotoUpload":null,"isPostAvail":null,"isPostPhotoUpload":null,"isPreAvail":null,"isPrePhotoUpload":null,"isRadioGroup":null,"isShowHelp":null,"isSpreadToColumn":null,"isTargetAzimuthAngle":null,"isVideoUpload":null,"limitType":null,"limitTypeOptions":null,"maskedValue":null,"max":null,"min":null,"optionsText":null,"otherOptionText":null,"required":false,"sampleS3Uri":null,"sectionHeaderBGColor":"#202020","showEmptyTextOption":null,"showLine":null,"tapedrop":null,"validation":null,"validationOptions":null,"validationType":null},"dirty":null,"dropDownOptions":[],"element":"Section_Header","elementId":null,"fieldName":"section_header_B4A3D940-9EE8-49FE-A981-A4482431E876","fieldVariant":"outlined","globalStyles":{"formDefault":false,"globalFieldVariant":null},"headerList":[],"id":"C62675DD-889E-4153-B89C-0A776907AF1D","label":"Section Header","name":null,"pageId":"1","rows":[],"sectionId":"1","sequence":0,"singleChoiceOptions":[],"style":null,"text":null,"title":null,"type":null},{"checkboxArray":[],"checkListOptions":[],"customOptions":{"cameraFacingOptions":null,"countryCode":null,"defaultOptions":null,"distanceToBuildingRadius":null,"editorMode":null,"editorModeOptions":null,"emptyOptionText":null,"fileNamingConvention":null,"helpText":null,"imageFile":null,"is360Avail":null,"is360PhotoUpload":null,"isBarcodeAvail":null,"isCommentPopAvail":null,"isCommentsAvail":null,"isDistToBuilding":null,"isEditPhoto":null,"isLimitEntry":null,"isMasked":false,"isNotApplicable":null,"isNumberLimit":null,"isOtherOption":null,"isPhotoAvail":null,"isPhotoUpload":null,"isPostAvail":null,"isPostPhotoUpload":null,"isPreAvail":null,"isPrePhotoUpload":null,"isRadioGroup":null,"isShowHelp":null,"isSpreadToColumn":null,"isTargetAzimuthAngle":null,"isVideoUpload":null,"limitType":null,"limitTypeOptions":null,"maskedValue":"","max":null,"min":null,"optionsText":null,"otherOptionText":null,"required":false,"sampleS3Uri":null,"sectionHeaderBGColor":null,"showEmptyTextOption":null,"showLine":null,"tapedrop":null,"validation":"None","validationOptions":null,"validationType":null},"dirty":null,"dropDownOptions":[],"element":"Short_Text","elementId":null,"fieldName":"shortText_0BC098DC-BBC6-4109-AEFE-BDE372D128A3","fieldVariant":"outlined","globalStyles":{"formDefault":false,"globalFieldVariant":null},"headerList":[],"id":"A68F11CC-3B0E-48C5-A8A2-6C3F9792F7D2","label":"Short Text","name":null,"pageId":"1","rows":[],"sectionId":"1","sequence":1,"singleChoiceOptions":[],"style":null,"text":null,"title":null,"type":null},{"checkboxArray":[],"checkListOptions":[],"customOptions":{"cameraFacingOptions":"front","countryCode":null,"defaultOptions":null,"distanceToBuildingRadius":"","editorMode":null,"editorModeOptions":null,"emptyOptionText":null,"fileNamingConvention":null,"helpText":"","imageFile":null,"is360Avail":null,"is360PhotoUpload":null,"isBarcodeAvail":null,"isCommentPopAvail":null,"isCommentsAvail":false,"isDistToBuilding":false,"isEditPhoto":false,"isLimitEntry":null,"isMasked":null,"isNotApplicable":null,"isNumberLimit":null,"isOtherOption":null,"isPhotoAvail":true,"isPhotoUpload":false,"isPostAvail":null,"isPostPhotoUpload":null,"isPreAvail":null,"isPrePhotoUpload":null,"isRadioGroup":false,"isShowHelp":false,"isSpreadToColumn":null,"isTargetAzimuthAngle":false,"isVideoUpload":null,"limitType":null,"limitTypeOptions":null,"maskedValue":null,"max":null,"min":null,"optionsText":null,"otherOptionText":null,"required":false,"sampleS3Uri":"","sectionHeaderBGColor":null,"showEmptyTextOption":null,"showLine":null,"tapedrop":false,"validation":null,"validationOptions":null,"validationType":null},"dirty":null,"dropDownOptions":[],"element":"Photo","elementId":null,"fieldName":"photo8C534EC2-B06D-416B-BB93-7E5FE9B9DF03","fieldVariant":"outlined","globalStyles":{"formDefault":false,"globalFieldVariant":null},"headerList":[],"id":"DD6EDEC1-5BC3-4836-8758-4BED0BD33A8E","label":"Photo","name":null,"pageId":"1","rows":[],"sectionId":"1","sequence":2,"singleChoiceOptions":[{"key":"radiobuttons_option_49B256B0-FE39-4E0C-BFF6-BB9D943375DF","label":"Option 1","value":"option_1"},{"key":"radiobuttons_option_85D83210-9EED-4485-A6F3-64E07F4B0CE6","label":"Option 2","value":"option_2"}],"style":null,"text":null,"title":null,"type":null}],"nodeIdList":["60db744c4682654794007d42"],"siteIdList":["60db73234682654794007d41"],"styles":null,"tags":null,"typeOfForm":"single","typename":"FormBuilderQuestionsDoc","updatedBy":"sridharlatlong","updatedDate":1627286200387}';

const formAnswers = '{"_id":"61011d04331a9c36df9f44a2","_partition":"company=60db729dea1719b9bf0a8e68_site=60db73234682654794007d41_node=60db744c4682654794007d42_docType=formbuilderanswers","answerSetId":"61011d04331a9c36df9f44a2","answerTimestamp":"1627462919285","appVersion":"1.0-ECSite oDas(1)","attributes":null,"companyId":"60db729dea1719b9bf0a8e68","companyIdList":["60db729dea1719b9bf0a8e68"],"createdBy":"sridharlatlong","createdDate":1627462919285,"description":null,"deviceId":"F4B92DA7-30FA-415E-B050-672B1B7526E0","deviceType":"iOS","docId":"formbuilderanswers=61011d04331a9c36df9f44a2","docType":"formbuilderanswers","formId":"60fe6ab8c297dd28a70af183","lat":37.785834,"lng":-122.406417,"location":{"coordinates":[],"type":null},"nodeId":"60db744c4682654794007d42","nodeIdList":["60db744c4682654794007d42"],"reportName":"","siteId":"60db73234682654794007d41","siteIdList":["60db73234682654794007d41"],"tags":null,"typename":"FormBuilderAnswersDoc","updatedBy":"sridharlatlong","updatedDate":1627462919285,"userId":"sridharlatlong"}';

const fieldResult = '[{"_id":"61022af0e0023024b3b3c50e","_partition":"company=60db729dea1719b9bf0a8e68_site=60db73234682654794007d41_node=60db744c4682654794007d42_docType=fieldresult","answerSetId":"61022af0e0023024b3b3c50c","answerTimestamp":"1627532016327","appVersion":"1.0-ECSite oDas(1)","attributes":null,"channels":null,"checkboxValues":null,"comments":null,"companyId":"60db729dea1719b9bf0a8e68","companyIdList":["60db729dea1719b9bf0a8e68"],"completePercent":null,"createdBy":"sridharlatlong","createdDate":1627532016328,"deviceId":"F4B92DA7-30FA-415E-B050-672B1B7526E0","deviceType":"iOS","docId":"fieldresult=61022af0e0023024b3b3c50e","docType":"fieldresult","field_name":null,"formId":"60fe6ab8c297dd28a70af183","id":null,"javaClass":null,"key":null,"label":null,"labelName":null,"lat":37.785834,"lng":-122.406417,"location":{"coordinates":[],"type":null},"mediaCount":null,"nodeId":"60db744c4682654794007d42","nodeIdList":["60db744c4682654794007d42"],"nodeIdNum":null,"notApplicable":null,"notRequired":null,"notes":null,"optional":null,"parentDocId":null,"questionId":"A68F11CC-3B0E-48C5-A8A2-6C3F9792F7D2","siteId":"60db73234682654794007d41","siteIdList":["60db73234682654794007d41"],"siteIdNum":null,"status":null,"tags":null,"typename":"FieldResultDoc","updatedBy":"sridharlatlong","updatedDate":1627532016328,"userId":"sridharlatlong","value":"5 Images"},{"_id":"61022af0e0023024b3b3c50f","_partition":"company=60db729dea1719b9bf0a8e68_site=60db73234682654794007d41_node=60db744c4682654794007d42_docType=fieldresult","answerSetId":"61022af0e0023024b3b3c50c","answerTimestamp":"1627532016327","appVersion":"1.0-ECSite oDas(1)","attributes":null,"channels":null,"checkboxValues":null,"comments":null,"companyId":"60db729dea1719b9bf0a8e68","companyIdList":["60db729dea1719b9bf0a8e68"],"completePercent":null,"createdBy":"sridharlatlong","createdDate":1627532016328,"deviceId":"F4B92DA7-30FA-415E-B050-672B1B7526E0","deviceType":"iOS","docId":"fieldresult=61022af0e0023024b3b3c50f","docType":"fieldresult","field_name":null,"formId":"60fe6ab8c297dd28a70af183","id":null,"javaClass":null,"key":null,"label":null,"labelName":null,"lat":37.785834,"lng":-122.406417,"location":{"coordinates":[],"type":null},"mediaCount":null,"nodeId":"60db744c4682654794007d42","nodeIdList":["60db744c4682654794007d42"],"nodeIdNum":null,"notApplicable":null,"notRequired":null,"notes":null,"optional":null,"parentDocId":null,"questionId":"DD6EDEC1-5BC3-4836-8758-4BED0BD33A8E","siteId":"60db73234682654794007d41","siteIdList":["60db73234682654794007d41"],"siteIdNum":null,"status":null,"tags":null,"typename":"FieldResultDoc","updatedBy":"sridharlatlong","updatedDate":1627532016328,"userId":"sridharlatlong","value":null},{"_id":"61022af0e0023024b3b3c50d","_partition":"company=60db729dea1719b9bf0a8e68_site=60db73234682654794007d41_node=60db744c4682654794007d42_docType=fieldresult","answerSetId":"61022af0e0023024b3b3c50c","answerTimestamp":"1627532016327","appVersion":"1.0-ECSite oDas(1)","attributes":null,"channels":null,"checkboxValues":null,"comments":null,"companyId":"60db729dea1719b9bf0a8e68","companyIdList":["60db729dea1719b9bf0a8e68"],"completePercent":null,"createdBy":"sridharlatlong","createdDate":1627532016328,"deviceId":"F4B92DA7-30FA-415E-B050-672B1B7526E0","deviceType":"iOS","docId":"fieldresult=61022af0e0023024b3b3c50d","docType":"fieldresult","field_name":null,"formId":"60fe6ab8c297dd28a70af183","id":null,"javaClass":null,"key":null,"label":null,"labelName":null,"lat":37.785834,"lng":-122.406417,"location":{"coordinates":[],"type":null},"mediaCount":null,"nodeId":"60db744c4682654794007d42","nodeIdList":["60db744c4682654794007d42"],"nodeIdNum":null,"notApplicable":null,"notRequired":null,"notes":null,"optional":null,"parentDocId":null,"questionId":"C62675DD-889E-4153-B89C-0A776907AF1D","siteId":"60db73234682654794007d41","siteIdList":["60db73234682654794007d41"],"siteIdNum":null,"status":null,"tags":null,"typename":"FieldResultDoc","updatedBy":"sridharlatlong","updatedDate":1627532016328,"userId":"sridharlatlong","value":null}]';

const fieldMedia = '[{"_id":"61022b25e0023024b3b3c517","_partition":"company=60db729dea1719b9bf0a8e68_site=60db73234682654794007d41_node=60db744c4682654794007d42_docType=fieldmedia","act_dist_to_bldg_ft":null,"act_dist_to_bldg_inch":null,"actualAzimuthAngle":null,"actualValue":null,"androidId":null,"angleMeasureName":null,"angleUnit":null,"answerSetId":"61022af0e0023024b3b3c50c","answerTimestamp":null,"appVersion":"1.0","approvalComments":null,"approvalStatus":null,"approvalUser":null,"attributes":null,"changelog":[],"channels":null,"cm":null,"comments":null,"companyId":null,"companyIdList":["60db729dea1719b9bf0a8e68"],"createdBy":"sridharlatlong","createdDate":1627532034498,"deviceId":"F4B92DA7-30FA-415E-B050-672B1B7526E0","deviceId_old":null,"deviceType":"iOS","deviceType_old":null,"dist_to_bldg":null,"dist_to_bldg_avail":null,"docId":"fieldmedia=61022b25e0023024b3b3c517","docType":"fieldmedia","expectedValue":null,"feet":null,"field_name":"TESTNODE01_photo_1_20210729_94354.jpg","formId":"60fe6ab8c297dd28a70af183","inches":null,"iosId":"F4B92DA7-30FA-415E-B050-672B1B7526E0","isAnnotated":false,"isDeleted":false,"javaClass":null,"key":null,"label":null,"labelName":null,"lat":37,"lng":-122,"location":{"coordinates":[],"type":null},"mediaDocType":null,"meter":null,"mime":null,"n_a":null,"name":null,"nodeId":null,"nodeIdList":["60db744c4682654794007d42"],"nodeIdNum":null,"optional":null,"orientation_ph":null,"originalFieldMediaId":null,"parentFieldMediaId":null,"photoEdit":null,"photoType":"photo","questionId":"DD6EDEC1-5BC3-4836-8758-4BED0BD33A8E","s3uri":"https://ecsitedev.s3.us-west-2.amazonaws.com/bom/TESTNODE01_photo_1_20210729_94354.jpg","siteId":null,"siteIdList":["60db73234682654794007d41"],"siteIdNum":null,"tag":null,"tags":{"tag10":"","tag10Label":"","tag1":"60db729dea1719b9bf0a8e68","tag1Label":"","tag2":"60db73234682654794007d41","tag2Label":"","tag3":"60db744c4682654794007d42","tag3Label":"","tag4":null,"tag4Label":"","tag5":"Photo","tag5Label":"","tag6":"","tag6Label":"","tag7":"","tag7Label":"","tag8":"","tag8Label":"","tag9":"","tag9Label":""},"targetAzimuthAngle":null,"testMeasurement":null,"testMeasurementAlternate":null,"testMeasurementUnit":null,"testMeasurementUnitAlternate":null,"typename":null,"updatedBy":"sridharlatlong","updatedDate":1627532034498,"uri":"60db729dea1719b9bf0a8e68/60db73234682654794007d41/60db744c4682654794007d42/media/TESTNODE01_photo_1_20210729_94354.jpg","userId":null,"validationIsAccepted":null},{"_id":"61022b25e0023024b3b3c517","_partition":"company=60db729dea1719b9bf0a8e68_site=60db73234682654794007d41_node=60db744c4682654794007d42_docType=fieldmedia","act_dist_to_bldg_ft":null,"act_dist_to_bldg_inch":null,"actualAzimuthAngle":null,"actualValue":null,"androidId":null,"angleMeasureName":null,"angleUnit":null,"answerSetId":"61022af0e0023024b3b3c50c","answerTimestamp":null,"appVersion":"1.0","approvalComments":null,"approvalStatus":null,"approvalUser":null,"attributes":null,"changelog":[],"channels":null,"cm":null,"comments":null,"companyId":null,"companyIdList":["60db729dea1719b9bf0a8e68"],"createdBy":"sridharlatlong","createdDate":1627532034498,"deviceId":"F4B92DA7-30FA-415E-B050-672B1B7526E0","deviceId_old":null,"deviceType":"iOS","deviceType_old":null,"dist_to_bldg":null,"dist_to_bldg_avail":null,"docId":"fieldmedia=61022b25e0023024b3b3c517","docType":"fieldmedia","expectedValue":null,"feet":null,"field_name":"TESTNODE01_photo_1_20210729_94354.jpg","formId":"60fe6ab8c297dd28a70af183","inches":null,"iosId":"F4B92DA7-30FA-415E-B050-672B1B7526E0","isAnnotated":false,"isDeleted":false,"javaClass":null,"key":null,"label":null,"labelName":null,"lat":37,"lng":-122,"location":{"coordinates":[],"type":null},"mediaDocType":null,"meter":null,"mime":null,"n_a":null,"name":null,"nodeId":null,"nodeIdList":["60db744c4682654794007d42"],"nodeIdNum":null,"optional":null,"orientation_ph":null,"originalFieldMediaId":null,"parentFieldMediaId":null,"photoEdit":null,"photoType":"photo","questionId":"A68F11CC-3B0E-48C5-A8A2-6C3F9792F7D2","s3uri":"https://ecsitedev.s3.us-west-2.amazonaws.com/bom/TESTNODE01_photo_1_20210729_94354.jpg","siteId":null,"siteIdList":["60db73234682654794007d41"],"siteIdNum":null,"tag":null,"tags":{"tag10":"","tag10Label":"","tag1":"60db729dea1719b9bf0a8e68","tag1Label":"","tag2":"60db73234682654794007d41","tag2Label":"","tag3":"60db744c4682654794007d42","tag3Label":"","tag4":null,"tag4Label":"","tag5":"Photo","tag5Label":"","tag6":"","tag6Label":"","tag7":"","tag7Label":"","tag8":"","tag8Label":"","tag9":"","tag9Label":""},"targetAzimuthAngle":null,"testMeasurement":null,"testMeasurementAlternate":null,"testMeasurementUnit":null,"testMeasurementUnitAlternate":null,"typename":null,"updatedBy":"sridharlatlong","updatedDate":1627532034498,"uri":"60db729dea1719b9bf0a8e68/60db73234682654794007d41/60db744c4682654794007d42/media/TESTNODE01_photo_1_20210729_94354.jpg","userId":null,"validationIsAccepted":null},{"_id":"61022b25e0023024b3b3c518","_partition":"company=60db729dea1719b9bf0a8e68_site=60db73234682654794007d41_node=60db744c4682654794007d42_docType=fieldmedia","act_dist_to_bldg_ft":null,"act_dist_to_bldg_inch":null,"actualAzimuthAngle":null,"actualValue":null,"androidId":null,"angleMeasureName":null,"angleUnit":null,"answerSetId":"61022af0e0023024b3b3c50c","answerTimestamp":null,"appVersion":"1.0","approvalComments":null,"approvalStatus":null,"approvalUser":null,"attributes":null,"changelog":[],"channels":null,"cm":null,"comments":null,"companyId":null,"companyIdList":["60db729dea1719b9bf0a8e68"],"createdBy":"sridharlatlong","createdDate":1627532037362,"deviceId":"F4B92DA7-30FA-415E-B050-672B1B7526E0","deviceId_old":null,"deviceType":"iOS","deviceType_old":null,"dist_to_bldg":null,"dist_to_bldg_avail":null,"docId":"fieldmedia=61022b25e0023024b3b3c518","docType":"fieldmedia","expectedValue":null,"feet":null,"field_name":"TESTNODE01_photo_1_20210729_94357.jpg","formId":"60fe6ab8c297dd28a70af183","inches":null,"iosId":"F4B92DA7-30FA-415E-B050-672B1B7526E0","isAnnotated":false,"isDeleted":false,"javaClass":null,"key":null,"label":null,"labelName":null,"lat":37,"lng":-122,"location":{"coordinates":[],"type":null},"mediaDocType":null,"meter":null,"mime":null,"n_a":null,"name":null,"nodeId":null,"nodeIdList":["60db744c4682654794007d42"],"nodeIdNum":null,"optional":null,"orientation_ph":null,"originalFieldMediaId":null,"parentFieldMediaId":null,"photoEdit":null,"photoType":"photo","questionId":"DD6EDEC1-5BC3-4836-8758-4BED0BD33A8E","s3uri":"https://ecsitedev.s3.us-west-2.amazonaws.com/bom/TESTNODE01_photo_1_20210729_94357.jpg","siteId":null,"siteIdList":["60db73234682654794007d41"],"siteIdNum":null,"tag":null,"tags":{"tag10":"","tag10Label":"","tag1":"60db729dea1719b9bf0a8e68","tag1Label":"","tag2":"60db73234682654794007d41","tag2Label":"","tag3":"60db744c4682654794007d42","tag3Label":"","tag4":null,"tag4Label":"","tag5":"Photo","tag5Label":"","tag6":"","tag6Label":"","tag7":"","tag7Label":"","tag8":"","tag8Label":"","tag9":"","tag9Label":""},"targetAzimuthAngle":null,"testMeasurement":null,"testMeasurementAlternate":null,"testMeasurementUnit":null,"testMeasurementUnitAlternate":null,"typename":null,"updatedBy":"sridharlatlong","updatedDate":1627532037362,"uri":"60db729dea1719b9bf0a8e68/60db73234682654794007d41/60db744c4682654794007d42/media/TESTNODE01_photo_1_20210729_94357.jpg","userId":null,"validationIsAccepted":null},{"_id":"61022b25e0023024b3b3c519","_partition":"company=60db729dea1719b9bf0a8e68_site=60db73234682654794007d41_node=60db744c4682654794007d42_docType=fieldmedia","act_dist_to_bldg_ft":null,"act_dist_to_bldg_inch":null,"actualAzimuthAngle":null,"actualValue":null,"androidId":null,"angleMeasureName":null,"angleUnit":null,"answerSetId":"61022af0e0023024b3b3c50c","answerTimestamp":null,"appVersion":"1.0","approvalComments":null,"approvalStatus":null,"approvalUser":null,"attributes":null,"changelog":[],"channels":null,"cm":null,"comments":null,"companyId":null,"companyIdList":["60db729dea1719b9bf0a8e68"],"createdBy":"sridharlatlong","createdDate":1627532052484,"deviceId":"F4B92DA7-30FA-415E-B050-672B1B7526E0","deviceId_old":null,"deviceType":"iOS","deviceType_old":null,"dist_to_bldg":null,"dist_to_bldg_avail":null,"docId":"fieldmedia=61022b25e0023024b3b3c519","docType":"fieldmedia","expectedValue":null,"feet":null,"field_name":"TESTNODE01_photo_1_20210729_94412.jpg","formId":"60fe6ab8c297dd28a70af183","inches":null,"iosId":"F4B92DA7-30FA-415E-B050-672B1B7526E0","isAnnotated":false,"isDeleted":false,"javaClass":null,"key":null,"label":null,"labelName":null,"lat":37,"lng":-122,"location":{"coordinates":[],"type":null},"mediaDocType":null,"meter":null,"mime":null,"n_a":null,"name":null,"nodeId":null,"nodeIdList":["60db744c4682654794007d42"],"nodeIdNum":null,"optional":null,"orientation_ph":null,"originalFieldMediaId":null,"parentFieldMediaId":null,"photoEdit":null,"photoType":"photo","questionId":"DD6EDEC1-5BC3-4836-8758-4BED0BD33A8E","s3uri":"https://ecsitedev.s3.us-west-2.amazonaws.com/bom/TESTNODE01_photo_1_20210729_94412.jpg","siteId":null,"siteIdList":["60db73234682654794007d41"],"siteIdNum":null,"tag":null,"tags":{"tag10":"","tag10Label":"","tag1":"60db729dea1719b9bf0a8e68","tag1Label":"","tag2":"60db73234682654794007d41","tag2Label":"","tag3":"60db744c4682654794007d42","tag3Label":"","tag4":null,"tag4Label":"","tag5":"Photo","tag5Label":"","tag6":"","tag6Label":"","tag7":"","tag7Label":"","tag8":"","tag8Label":"","tag9":"","tag9Label":""},"targetAzimuthAngle":null,"testMeasurement":null,"testMeasurementAlternate":null,"testMeasurementUnit":null,"testMeasurementUnitAlternate":null,"typename":null,"updatedBy":"sridharlatlong","updatedDate":1627532052484,"uri":"60db729dea1719b9bf0a8e68/60db73234682654794007d41/60db744c4682654794007d42/media/TESTNODE01_photo_1_20210729_94412.jpg","userId":null,"validationIsAccepted":null},{"_id":"61022b25e0023024b3b3c515","_partition":"company=60db729dea1719b9bf0a8e68_site=60db73234682654794007d41_node=60db744c4682654794007d42_docType=fieldmedia","act_dist_to_bldg_ft":null,"act_dist_to_bldg_inch":null,"actualAzimuthAngle":null,"actualValue":null,"androidId":null,"angleMeasureName":null,"angleUnit":null,"answerSetId":"61022af0e0023024b3b3c50c","answerTimestamp":null,"appVersion":"1.0","approvalComments":null,"approvalStatus":null,"approvalUser":null,"attributes":null,"changelog":[],"channels":null,"cm":null,"comments":null,"companyId":null,"companyIdList":["60db729dea1719b9bf0a8e68"],"createdBy":"sridharlatlong","createdDate":1627532027159,"deviceId":"F4B92DA7-30FA-415E-B050-672B1B7526E0","deviceId_old":null,"deviceType":"iOS","deviceType_old":null,"dist_to_bldg":null,"dist_to_bldg_avail":null,"docId":"fieldmedia=61022b25e0023024b3b3c515","docType":"fieldmedia","expectedValue":null,"feet":null,"field_name":"TESTNODE01_photo_1_20210729_94346.jpg","formId":"60fe6ab8c297dd28a70af183","inches":null,"iosId":"F4B92DA7-30FA-415E-B050-672B1B7526E0","isAnnotated":false,"isDeleted":false,"javaClass":null,"key":null,"label":null,"labelName":null,"lat":37,"lng":-122,"location":{"coordinates":[],"type":null},"mediaDocType":null,"meter":null,"mime":null,"n_a":null,"name":null,"nodeId":null,"nodeIdList":["60db744c4682654794007d42"],"nodeIdNum":null,"optional":null,"orientation_ph":null,"originalFieldMediaId":null,"parentFieldMediaId":null,"photoEdit":null,"photoType":"photo","questionId":"DD6EDEC1-5BC3-4836-8758-4BED0BD33A8E","s3uri":"https://ecsitedev.s3.us-west-2.amazonaws.com/bom/TESTNODE01_photo_1_20210729_94346.jpg","siteId":null,"siteIdList":["60db73234682654794007d41"],"siteIdNum":null,"tag":null,"tags":{"tag10":"","tag10Label":"","tag1":"60db729dea1719b9bf0a8e68","tag1Label":"","tag2":"60db73234682654794007d41","tag2Label":"","tag3":"60db744c4682654794007d42","tag3Label":"","tag4":null,"tag4Label":"","tag5":"Photo","tag5Label":"","tag6":"","tag6Label":"","tag7":"","tag7Label":"","tag8":"","tag8Label":"","tag9":"","tag9Label":""},"targetAzimuthAngle":null,"testMeasurement":null,"testMeasurementAlternate":null,"testMeasurementUnit":null,"testMeasurementUnitAlternate":null,"typename":null,"updatedBy":"sridharlatlong","updatedDate":1627532027159,"uri":"60db729dea1719b9bf0a8e68/60db73234682654794007d41/60db744c4682654794007d42/media/TESTNODE01_photo_1_20210729_94346.jpg","userId":null,"validationIsAccepted":null},{"_id":"61022b25e0023024b3b3c516","_partition":"company=60db729dea1719b9bf0a8e68_site=60db73234682654794007d41_node=60db744c4682654794007d42_docType=fieldmedia","act_dist_to_bldg_ft":null,"act_dist_to_bldg_inch":null,"actualAzimuthAngle":null,"actualValue":null,"androidId":null,"angleMeasureName":null,"angleUnit":null,"answerSetId":"61022af0e0023024b3b3c50c","answerTimestamp":null,"appVersion":"1.0","approvalComments":null,"approvalStatus":null,"approvalUser":null,"attributes":null,"changelog":[],"channels":null,"cm":null,"comments":null,"companyId":null,"companyIdList":["60db729dea1719b9bf0a8e68"],"createdBy":"sridharlatlong","createdDate":1627532031461,"deviceId":"F4B92DA7-30FA-415E-B050-672B1B7526E0","deviceId_old":null,"deviceType":"iOS","deviceType_old":null,"dist_to_bldg":null,"dist_to_bldg_avail":null,"docId":"fieldmedia=61022b25e0023024b3b3c516","docType":"fieldmedia","expectedValue":null,"feet":null,"field_name":"TESTNODE01_photo_1_20210729_94351.jpg","formId":"60fe6ab8c297dd28a70af183","inches":null,"iosId":"F4B92DA7-30FA-415E-B050-672B1B7526E0","isAnnotated":false,"isDeleted":false,"javaClass":null,"key":null,"label":null,"labelName":null,"lat":37,"lng":-122,"location":{"coordinates":[],"type":null},"mediaDocType":null,"meter":null,"mime":null,"n_a":null,"name":null,"nodeId":null,"nodeIdList":["60db744c4682654794007d42"],"nodeIdNum":null,"optional":null,"orientation_ph":null,"originalFieldMediaId":null,"parentFieldMediaId":null,"photoEdit":null,"photoType":"photo","questionId":"DD6EDEC1-5BC3-4836-8758-4BED0BD33A8E","s3uri":"https://ecsitedev.s3.us-west-2.amazonaws.com/bom/TESTNODE01_photo_1_20210729_94351.jpg","siteId":null,"siteIdList":["60db73234682654794007d41"],"siteIdNum":null,"tag":null,"tags":{"tag10":"","tag10Label":"","tag1":"60db729dea1719b9bf0a8e68","tag1Label":"","tag2":"60db73234682654794007d41","tag2Label":"","tag3":"60db744c4682654794007d42","tag3Label":"","tag4":null,"tag4Label":"","tag5":"Photo","tag5Label":"","tag6":"","tag6Label":"","tag7":"","tag7Label":"","tag8":"","tag8Label":"","tag9":"","tag9Label":""},"targetAzimuthAngle":null,"testMeasurement":null,"testMeasurementAlternate":null,"testMeasurementUnit":null,"testMeasurementUnitAlternate":null,"typename":null,"updatedBy":"sridharlatlong","updatedDate":1627532031461,"uri":"60db729dea1719b9bf0a8e68/60db73234682654794007d41/60db744c4682654794007d42/media/TESTNODE01_photo_1_20210729_94351.jpg","userId":null,"validationIsAccepted":null}]';

export default class Demobar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      previewVisible: false,
      shortPreviewVisible: false,
      roPreviewVisible: false,
      generatedJSON: null
    };

    const update = this._onChange.bind(this);
    this._onSubmit = this._onSubmit.bind(this);

    store.subscribe(state => update(state.data));
  }

  showPreview(e) {
    e.preventDefault();
    this.setState({
      previewVisible: true,
    });
  }

  showShortPreview() {
    this.setState({
      shortPreviewVisible: true,
    });
  }

  showRoPreview() {
    this.setState({
      roPreviewVisible: true,
    });
  }

  closePreview() {
    this.setState({
      previewVisible: false,
      shortPreviewVisible: false,
      roPreviewVisible: false,
    });
  }

  _onChange(data) {
    // console.log("on change");
    this.setState({
      data,
      generatedJSON: null
    });
  }

  // eslint-disable-next-line no-unused-vars
  _onSubmit(data) {
    console.log("on submit");
  }

  getGeneratedJSON(JSON) {
    console.log(JSON);
    this.setState({
      generatedJSON: JSON
    })
  }
  collectFormData(fieldResults, fieldMedia) {
    console.log(fieldResults, fieldMedia);
  }
  imageUploadCallback(prop) {
    return this.imageUploadS3uri(prop.imageSrc);
  }

  imageUploadS3uri(prop) {
    var promise = new Promise(function (resolve, reject) {
      window.setTimeout(function () {
        resolve(prop);
      }, 5000);
    });
    return promise;
  }

  getAllPhotosToPreview(type, photosList, index) {
    console.log("Photos to preview")
    console.log(type); //string - "PHOTOS", "360DEGREE"
    console.log(photosList[index]);
  }

  render() {
    let modalClass = 'modal';
    if (this.state.previewVisible) {
      modalClass += ' show d-block';
    }

    let shortModalClass = 'modal short-modal';
    if (this.state.shortPreviewVisible) {
      shortModalClass += ' show d-block';
    }

    let roModalClass = 'modal ro-modal';
    if (this.state.roPreviewVisible) {
      roModalClass += ' show d-block';
    }

    const editJson = JSON.parse(formQuestions);

    return (
      <div className="clearfix" style={{ margin: '10px', width: '70%' }}>
        {
          (this.state.data.length > 0) &&
          <button className="btn btn-primary float-right" style={{ marginRight: '10px' }} onClick={(e) => this.showPreview(e)}>Preview Form</button>
        }
        {(this.state.generatedJSON != null) && <button className="btn btn-primary float-right" style={{ marginRight: '10px' }} onClick={() => this.showPreview()}>Save Form</button>}
        {/* <EditForm editJSON={(typeof(editJson) == "string") ? JSON.parse(editJson) : editJson} /> */}

        {this.state.previewVisible &&
          <div className={modalClass} role="dialog">
            {/* <div className="modal-dialog modal-lg" role="document" style={{display: "flex", justifyContent: 'center', maxWidth: '90%'}}> */}
            <div className="modal-dialog modal-lg" role="document" style={{ display: "flex", justifyContent: 'center' }}>
              <div className="modal-content">
                <MaterialFormGenerator
                  download_path=""
                  // back_action="/"
                  // back_name="Back"
                  answer_data={answers}
                  action_name="Save"
                  form_action="/api/form"
                  form_method="POST"
                  hide_actions={false}
                  skip_validations={false}
                  onSubmit={this._onSubmit}
                  isFormReadOnly={false}
                  isBootstrapItems={false}
                  imageUploadCallback={this.imageUploadCallback.bind(this)}
                  // variables={this.props.variables}
                  data={this.state.data}
                  fieldResult={JSON.parse(fieldResult)}
                  fieldMedia={JSON.parse(fieldMedia)}
                  generateBtnLabel="Generate JSON and Save Form"
                  collectFormData={this.collectFormData}
                  getGeneratedJSON={this.getGeneratedJSON.bind(this)}
                  photoPreview={this.getAllPhotosToPreview.bind(this)}
                  closePreview={this.closePreview.bind(this)} />

                <div className="modal-footer">
                  <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.closePreview.bind(this)}>Close</button>
                </div>
              </div>
            </div>
          </div>
        }

        {this.state.shortPreviewVisible &&
          <div className={shortModalClass}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content border border-light p-3 mb-4">
                <MaterialFormGenerator
                  download_path=""
                  back_action=""
                  answer_data={answers}
                  form_action="/"
                  form_method="POST"
                  data={this.state.data}
                  display_short={true}
                  variables={this.props.variables}
                  hide_actions={false} />

                <div className="modal-footer" style={{ borderTop: '1px solid #c8c8c8', textAlign: 'center' }}>
                  <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.closePreview.bind(this)}>Close</button>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}
