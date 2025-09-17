package com.brandpulse.fv.util;

import com.brandpulse.fv.exception.ServiceException;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import java.io.IOException;
import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

public class JsonUtil {

    private JsonUtil() {
    }

    public static String toString(Object obj) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            mapper.registerModule(new JavaTimeModule());
            SimpleModule simpleModule = new SimpleModule();
            simpleModule.addSerializer(OffsetDateTime.class, new JsonSerializer<OffsetDateTime>() {
                @Override
                public void serialize(OffsetDateTime offsetDateTime, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException, JsonProcessingException {
                    jsonGenerator.writeString(DateTimeFormatter.ISO_OFFSET_DATE_TIME.format(offsetDateTime));
                }
            });
            mapper.registerModule(simpleModule);

            return mapper.writeValueAsString(obj);
        } catch (JsonProcessingException e) {
            throw new ServiceException(e.toString());
        }
    }

    public static Object toObject(String json, Class obj) {
        try {
            ObjectMapper mapper = new ObjectMapper().configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            try {
                return mapper.readValue(json, obj);
            } catch (Exception ex) {
                return mapper.readValue(json, mapper.getTypeFactory().constructCollectionType(List.class, obj));
            }
        } catch (Exception e) {

            throw new ServiceException(e.toString());
        }
    }
}
