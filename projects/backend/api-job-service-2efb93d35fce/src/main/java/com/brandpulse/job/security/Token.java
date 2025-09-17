package com.brandpulse.job.security;

import com.brandpulse.job.common.enums.UserType;
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
    private String userId;
    private String userType;
    private String typeOfUser;
    private String userRef;
    private String firstName;
    private String lastName;
    
    
    public String getFirstName() {
        if(this.firstName == null){
            return "";
        }
        
        return this.firstName;
    }
    
    
    public String getLastName() {
        if(this.lastName == null){
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
