package com.wavelabs.sb.documents.ChildDocument;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class Address {
  private String location;
    private String city;
    private String state;
    private String country;
    private String pinCode;
}
