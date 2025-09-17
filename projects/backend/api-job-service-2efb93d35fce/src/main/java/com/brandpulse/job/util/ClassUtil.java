/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.brandpulse.job.util;

import java.util.List;
import java.util.stream.Collectors;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;

/**
 *
 * @author TS
 */
public class ClassUtil {

    private ClassUtil() {
    }
    
    
    
    public static <T> T convert(Object data,  Class<T> classToConvert){
        ModelMapper mm = new ModelMapper();
        mm.getConfiguration().setDeepCopyEnabled(false);
        mm.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        return mm.map(data, classToConvert);
    }
    
    public static <S, T> List<T> convertList(List<S> dl, Class<T> classToConvert){
        return dl.stream().map(r -> ClassUtil.convert(r, classToConvert)).collect(Collectors.toList());
    }

    
}
