package com.wavelabs.sb.documents;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import com.wavelabs.sb.enums.UserType;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Document("disputes-categories")
public class DisputeCategory extends BaseDocument{

    private String id;
    private String disputeCategoryName;
        
    @Field("disputeResolver")    
    private UserType disputeResolver;
  
}
