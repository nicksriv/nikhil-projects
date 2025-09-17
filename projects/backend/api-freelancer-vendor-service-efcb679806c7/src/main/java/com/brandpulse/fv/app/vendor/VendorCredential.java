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
@Document("vendor-credential")
public class VendorCredential extends BaseDocument{

    @Id
    private String id;
    private String vendorId;
    private String userName;
    private String password;

}
