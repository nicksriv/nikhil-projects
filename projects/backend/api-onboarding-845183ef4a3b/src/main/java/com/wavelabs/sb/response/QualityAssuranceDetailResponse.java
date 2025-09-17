package com.wavelabs.sb.response;

import java.util.ArrayList;
import java.util.List;

import com.wavelabs.sb.enums.QualityControllerStatus;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class QualityAssuranceDetailResponse {

  private String firstName;
	private String middleName;
	private String lastName;
	private String email;
	private String mobile;
	private QualityControllerStatus qualityControllerStatus;
	private List<ClientDetails> clients = new ArrayList<>();
}
