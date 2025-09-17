/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.brandpulse.fv.app.vendor;

import com.brandpulse.fv.common.childDocument.BaseDocument;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 *
 * @author ts
 */
@Getter
@Setter
@NoArgsConstructor
@Document("vendor-Bank-detail")
public class VendorBankDetail extends BaseDocument{
    
    @Id
    private String id;
    private String vendorId;
    private String bankName;
    private String accountHolderName;
    private String accountNumber;
    private String ifscCode;
    private String branch;
    
    
    
    // no use of status for now as in future if we have multiple then will keep status
    
    
    
}
