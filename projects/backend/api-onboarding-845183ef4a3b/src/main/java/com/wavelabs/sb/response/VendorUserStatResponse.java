package com.wavelabs.sb.response;

import lombok.NoArgsConstructor;

//@Getter
// @setter
@NoArgsConstructor
public class VendorUserStatResponse {

    Integer totalActiveUser;
    Integer totalUser;
    Integer totalInactiveUser;

    public Integer getTotalActiveUser() {
        return totalActiveUser;
    }

    public void setTotalActiveUser(Integer totalActiveUser) {
        this.totalActiveUser = totalActiveUser;
    }

    public Integer getTotalUser() {
        return totalUser;
    }

    public void setTotalUser(Integer totalUser) {
        this.totalUser = totalUser;
    }

    public Integer getTotalInactiveUser() {
        return totalInactiveUser;
    }

    public void setTotalInactiveUser(Integer totalInactiveUser) {
        this.totalInactiveUser = totalInactiveUser;
    }

    public VendorUserStatResponse(Integer totalActiveUser, Integer totalUser, Integer totalInactiveUser) {
        this.totalActiveUser = totalActiveUser;
        this.totalUser = totalUser;
        this.totalInactiveUser = totalInactiveUser;
    }

    @Override
    public String toString() {
        return "VendorUserStats [totalActiveUser=" + totalActiveUser + ", totalUser=" + totalUser
                + ", totalInactiveUser=" + totalInactiveUser + "]";
    }

}
