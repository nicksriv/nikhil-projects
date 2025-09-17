/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.brandpulse.fv.util;

import com.brandpulse.fv.exception.ServiceException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import java.io.StringReader;
import java.io.StringWriter;

import java.util.List;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.w3c.dom.Document;
import org.xml.sax.InputSource;

/**
 * @author TS
 */
public class XmlUtil {

    private XmlUtil() {
    }

    static TransformerFactory tf;
    static DocumentBuilder builderOne;
    static DocumentBuilder builderTwo;

    public static String toString(Object obj) {
        try {
            XmlMapper mapper = new XmlMapper();
            mapper.disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);
            return mapper.writeValueAsString(obj);
        } catch (Exception e) {
            throw new ServiceException(e.toString());
        }
    }

    public static Object toObject(String xml, Class obj) {
        try {
            XmlMapper mapper = new XmlMapper();
            try {
                return mapper.readValue(xml, obj);
            } catch (Exception ex) {
                return mapper.readValue(xml, mapper.getTypeFactory().constructCollectionType(List.class, obj));
            }
        } catch (Exception e) {
            throw new ServiceException(e.toString());
        }
    }

    public static Document stringToXml(String xmlString) {
        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
        Document document;
        try {
            builderOne = factory.newDocumentBuilder();
            document = builderOne.parse(new InputSource(
                    new StringReader(xmlString)));
            return document;
        } catch (Exception e) {
            throw new ServiceException(e.toString());
        }
    }

    public static Document convertToXMLDocument(String xmlString) {

        Document doc;
        //Parser that produces DOM object trees from XML content
        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();

        //API to obtain DOM Document instance
        try {
            //Create DocumentBuilder with default configuration
            builderTwo = factory.newDocumentBuilder();

            //Parse the content to Document object
            doc = builderTwo.parse(new InputSource(new StringReader(xmlString)));
            return doc;
        } catch (Exception e) {
            throw new ServiceException(e.toString());
        }
    }

    public static String convertToString(Document doc) {

        try {
            DOMSource domSource = new DOMSource(doc);
            StringWriter writer = new StringWriter();
            StreamResult result = new StreamResult(writer);
            tf = TransformerFactory.newInstance();
            Transformer transformer = tf.newTransformer();
            transformer.transform(domSource, result);
            return writer.toString();
        } catch (Exception e) {
            throw new ServiceException(e.toString());
        }
    }
}
