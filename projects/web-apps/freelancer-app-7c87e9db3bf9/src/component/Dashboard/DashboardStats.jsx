import React from "react";

import View from "@app/component/common/View";
import Text from "@app/component/common/Text";
import Image from "@app/component/common/Image";

import { R } from "@app/res";

const DashboardStatsCard = ({ icon, label, value, cardStyle = {} }) => {
  return (
    <View
      style={{
        backgroundColor: R.colors.white,
        borderRadius: R.units.scale(3),
        elevation: 2,
        width: R.units.windowWidth(0.5) - R.units.scale(16),
        paddingVertical: R.units.scale(12),
        paddingHorizontal: R.units.scale(8),
        height: R.units.scale(80),
        ...cardStyle,
      }}
    >
      <View flexDirection="row" justifyContent="space-between" alignItems='center' >
        <Image source={icon} width={20} height={20} />
        <Text variant="title2" font="semibold">{value}</Text>
      </View>
      <Text>{label}</Text>
    </View>
  )
}

const DashboardStats = ({ dashboardStats,userType }) => {
  const isVendor = userType === 'vendor-user' ? true : false 
  return (
    <View flexDirection="row" flexWrap="wrap" justifyContent="space-between">
      <DashboardStatsCard
        icon={R.images.dashboardIcons.time()}
        label="Total hours worked"
        value={dashboardStats.totalHoursWorked}
        cardStyle={{marginBottom: R.units.scale(8)}}
      />
      {isVendor ? null : (
        <DashboardStatsCard
          icon={R.images.dashboardIcons.rupee()}
          label="Total money earned"
          value={dashboardStats.totalMoneyEarned}
          cardStyle={{marginBottom: R.units.scale(8)}}
        />
      )}
      <DashboardStatsCard
        icon={R.images.dashboardIcons.project()}
        label="Total projects worked"
        value={dashboardStats.totalProjectWorked}
      />
      {isVendor ? null : (
        <DashboardStatsCard
          icon={R.images.dashboardIcons.job()}
          label="Last project earning"
          value={dashboardStats.lastProjectEarning}
        />
      )}
    </View>
  );
}

export default DashboardStats;
