/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.brandpulse.fv.api.dto;

import com.brandpulse.fv.common.childDocument.AssociatedSkill;
import java.util.ArrayList;
import java.util.List;
import javax.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 *
 * @author ts
 */
@Getter
@Setter
@NoArgsConstructor
public class SkillRequestDto {

    @NotBlank
    List<String> skillToRemove = new ArrayList<>();
    
    @NotBlank
    List<AssociatedSkill> skillToAdd = new ArrayList<>();

    public List<String> getSkillToRemove() {

        if (skillToRemove == null) {
            return new ArrayList<>();
        }

        return skillToRemove;
    }

    public List<AssociatedSkill> getSkillToAdd() {

        if (skillToAdd == null) {
            return new ArrayList<>();
        }

        return skillToAdd;
    }
}
