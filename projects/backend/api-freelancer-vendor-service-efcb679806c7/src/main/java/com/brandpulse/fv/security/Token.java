package com.brandpulse.fv.security;

import com.brandpulse.fv.common.enums.UserType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class Token {

    //userId
    private String sub;
    private String logId; //login id
    private String userId; // vendor & freelancer id when they login and in case of vu it will also be filled 
    private String userSubId; //vendor-user id when vu login
    private String userType;
    private String userRef;
    private String firstName;
    private String lastName;

    public String getFirstName() {
        if (this.firstName == null) {
            return "";
        }

        return this.firstName;
    }

    public String getLastName() {
        if (this.lastName == null) {
            return "";
        }

        return this.lastName;
    }

    public UserType getUserTypeEnum() {
        UserType ute;
        ute = UserType.valueOf(userType);
        return ute;
    }
}
