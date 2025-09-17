package com.wavelabs.sb.response;

import com.wavelabs.sb.documents.childDocuments.Address;
import com.wavelabs.sb.documents.childDocuments.AssociatedSkill;
import java.util.ArrayList;
import java.util.List;
import com.wavelabs.sb.enums.Gender;
import com.wavelabs.sb.enums.Status;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class FreelancerDetailResponse {

    private String profileImage;
    private String firstName;
    private String lastName;
    private String mobile;
    private String email;
    private Gender gender;
    private String panNumber;
    private String AdhaarNumber;
    private Address address;
    private Status status;
    private List<AssociatedSkill> skills;
    private String education;
    private float experienceInYear;
    private String resumeUrl;
    private List<SkillCategoryDto> skillCategory = new ArrayList<>();
    private BankDetailDto bankDetail;
    private List<WorkDetailDto> workDetails = new ArrayList<>();

    public List<AssociatedSkill> getSkills() {

        if (skills == null) {
            return new ArrayList<>();
        }

        return skills;
    }

}
