package com.wavelabs.sb.documents;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@NoArgsConstructor
@Document("vendor-credential")
public class VendorCredential extends BaseDocument{

    @Id
    private String id;
    private String vendorId;
    private String userName;
    private String password;

}
    

