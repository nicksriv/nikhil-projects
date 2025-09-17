package com.wavelabs.sb.documents;

import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document("quality-assurance-credentials")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class QualityAssuranceCredentials extends ModifierDocument {
  
  private String id;
	private String qualityAssuranceId;
	private String qualityAssuranceName;
	private String password;
  public boolean isPresent() {
    return false;
  }
}
