import React from 'react';
import View from '../../component/common/View';
import Text from '../../component/common/Text';
import {StyleSheet} from 'react-native';
import Card from '../common/Card';
import {R} from '../../res';
import Image from '../common/Image';
import Seperator from '../../component/common/Separator';
import Star from 'react-native-vector-icons/AntDesign';
import ModuleCard from './ModuleCard';

const MyWorkDetail = ({
  jobDetails,
  myWorkDescription,
  isLoading,
  handleStartWork,
  modulesData,
  handlePress,
  userType
}) => {
  const {deliverables = [], jobShortDescription,jobRefNo} = jobDetails;
  const {
    jobTitle,
    amountStatus,
    amountPaid,
    totalEarned,
    totalHoursWorked,
    jobRatingDescription,
    jobRating,
    jobStatusRemark,
    jobStatus,
    payerRemark,
    notes,
    jobUserRemark,
  } = myWorkDescription;
  const jobStatusText = {
    NEW: {
      label: 'New',
      color: R.colors.success.light,
    },
    CLOSED: {
      label: 'Closed',
      color: R.colors.success.main,
    },
    INPROGRESS: {
      label: 'In Progress',
      color: R.colors.primary.main,
    },
    APPROVED: {
      label: 'Approved',
      color: R.colors.success.main,
    },
    INREVIEW: {
      label: 'Under Review',
      color: R.colors.warning.light,
    },
    REJECTED: {
      label: 'Rejected',
      color: R.colors.warning.light,
    },
  };

  return (
    <View paddingHorizontal={R.units.scale(6)}>
      <Card style={styles.cardStyle}>
        <View
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          padding={R.units.scale(2)}>
          <Text color="secondary" font="semibold">
            #{jobRefNo}
          </Text>
          <Text
            style={{
              backgroundColor: jobStatusText[jobStatus]
                ? jobStatusText[jobStatus].color
                : 'grey',
              color: R.colors.success.contrastText,
              paddingVertical: R.units.scale(2),
              paddingHorizontal: R.units.scale(10),
              borderRadius: R.units.scale(20),
              fontSize: R.units.scale(10),
              textTransform: 'capitalize',
              textAlign: 'center',
              // lineHeight: R.units.scale(16),
            }}>
            {jobStatus ? jobStatusText[jobStatus].label : jobStatus}
          </Text>
        </View>
        <Seperator size={8} />

        <View>
          <Text style={styles.header}>{jobTitle}</Text>
          <Text style={styles.descriptionText}>{jobShortDescription}</Text>
        </View>
        <Seperator />
        <View>
          <Text style={styles.header}>Deliverable</Text>
          {deliverables.map((r, index) => {
            return (
              <View key={index} style={styles.listView}>
                <Image
                  width={6}
                  source={R.images.jobCard.bullet()}
                  height={12}
                />
                <Text style={styles.listText}>{r}</Text>
              </View>
            );
          })}
        </View>
      </Card>
      <Seperator size={12} />
      {userType === 'freelancer' ? (
        <Card style={styles.cardStyle}>
          <Text style={styles.header}>Billing</Text>
          {jobStatus === 'CLOSED' ? (
            <View flexDirection="row" alignItems="center">
              <Text style={styles.subHeader}>Payment Status:</Text>
              <Text style={styles.subHeaderValue}>{amountStatus}</Text>
            </View>
          ) : null}
          <View flexDirection="row" alignItems="center">
            <Text style={styles.subHeader}>Total Paid:</Text>
            <Text style={styles.subHeaderValue}>{amountPaid}</Text>
          </View>
          <View flexDirection="row" alignItems="center">
            <Text style={styles.subHeader}>Total Money Earned:</Text>
            <Text style={styles.subHeaderValue}>{totalEarned}</Text>
          </View>
          <View flexDirection="row" alignItems="center">
            <Text style={styles.subHeader}>Total Hours Worked:</Text>
            <Text style={styles.subHeaderValue}>{totalHoursWorked}</Text>
          </View>
          {jobStatus === 'CLOSED' ? (
            <View flexDirection="row" alignItems="center">
              <Text style={styles.subHeader}>Payer Remark:</Text>
              <Text style={styles.subHeaderValue}>{payerRemark}</Text>
            </View>
          ) : null}
        </Card>
      ) : null}

      <Seperator size={12} />
      <Card style={styles.cardStyle}>
        <Text style={styles.header}>Work Instructions</Text>
        <Text style={styles.descriptionText}>{notes}</Text>
        <Seperator />
        <Text style={styles.header}>User Remark</Text>
        <Text style={styles.descriptionText}>{jobUserRemark}</Text>
        <Seperator />
        <Text style={styles.header}>Status Remark</Text>
        <Text style={styles.descriptionText}>{jobStatusRemark}</Text>
      </Card>
      <Seperator size={12} />
      {jobStatus === 'CLOSED' ? (
        <>
          <Card style={styles.cardStyle}>
            <Text style={styles.header}>Rating</Text>
            <View flexDirection="row" alignItems="center">
              <Star name="star" size={20} color="#ffc107" />
              <Text style={styles.ratingValue}>{jobRating}</Text>
            </View>
            <Text style={styles.header}>Rating Description</Text>
            <Text style={styles.descriptionText}>{jobRatingDescription}</Text>
          </Card>
          <Seperator size={12} />
        </>
      ) : null}

      <Card style={styles.cardStyle}>
        <Text style={styles.header}>My Modules</Text>
        <Card
          style={[
            styles.cardStyle,
            {
              flexDirection: 'row',
              justifyContent: 'space-between',
              elevation: 0,
              flexWrap: 'wrap',
            },
          ]}>
          {modulesData.length
            ? modulesData.map((item, index) => {
                return (
                  <ModuleCard
                    moduleData={item}
                    key={`modules${index}`}
                    handlePress={() => handlePress({value: item})}
                  />
                );
              })
            : null}
        </Card>
      </Card>
      <Seperator size={12} />
    </View>
  );
};

const styles = StyleSheet.create({
  cardStyle: {
    backgroundColor: R.colors.white,
    elevation: 2,
    borderRadius: R.units.scale(4),
    padding: R.units.scale(8),
  },
  descriptionText: {
    color: R.colors.text.secondary,
    fontSize: R.units.scale(12),
    lineHeight: R.units.scale(14),
    textAlign: 'justify',
  },
  header: {
    fontSize: R.units.scale(14),
    fontWeight: '600',
    lineHeight: R.units.scale(16),
    marginVertical: R.units.scale(4),
  },
  listView: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginHorizontal: R.units.scale(15),
  },
  listText: {
    color: R.colors.text.secondary,
    fontSize: R.units.scale(12),
    lineHeight: R.units.scale(14),
    paddingHorizontal: R.units.scale(15),
    marginBottom: R.units.scale(9),
  },
  jobStatusText: {
    backgroundColor: R.colors.background.chip,
    paddingVertical: R.units.scale(2),
    paddingHorizontal: R.units.scale(8),
    borderRadius: R.units.scale(4),
    fontWeight: '500',
    textAlign: 'center',
    fontSize: R.units.scale(10),
  },
  subHeader: {
    fontSize: R.units.scale(12),
    fontWeight: '600',
    lineHeight: R.units.scale(14),
    marginVertical: R.units.scale(2),
  },
  subHeaderValue: {
    fontSize: R.units.scale(12),
    lineHeight: R.units.scale(14),
    color: R.colors.secondary,
    paddingHorizontal: R.units.scale(4),
  },
  ratingValue: {
    paddingHorizontal: R.units.scale(6),
    fontSize: R.units.scale(14),
  },
});

export default MyWorkDetail;
