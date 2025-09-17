/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.brandpulse.job.util;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.PutObjectRequest;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import javax.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author Suhail Tamboli
 */
@Component
public class FileServiceUtil {

    FileOutputStream fos;
    File convFile;

    private AmazonS3Client amazonS3Client;

    @Value("${amazon.aws.accesskey}")
    private String amazonAWSAccessKey;

    @Value("${amazon.aws.secretkey}")
    private String amazonAWSSecretKey;

    @Value("${amazon.aws.bucketName}")
    private String amazonAWSBucketName;

    @Value("${app.environment}")
    private String environment;

    @PostConstruct
    private void initializeAmazon() {
        AWSCredentials credentials = new BasicAWSCredentials(amazonAWSAccessKey, amazonAWSSecretKey);
        this.amazonS3Client = new AmazonS3Client(credentials);
    }

    private File convertMultiPartToFile(MultipartFile file) throws IOException {
        convFile = new File(file.getOriginalFilename());
        fos = new FileOutputStream(convFile);
        fos.write(file.getBytes());
        fos.close();
        return convFile;
    }

    private void uploadFileTos3bucket(String fullFileName, File file) {
        amazonS3Client.putObject(new PutObjectRequest(amazonAWSBucketName, fullFileName, file));
    }

    public String uploadFile(MultipartFile multipartFile, String path, String fileName) throws IOException {

        String fileUrl = "";
        try {
            File file = convertMultiPartToFile(multipartFile);
            fileUrl = (environment + "/" + path + "/" + fileName).replace("//", "/");
            uploadFileTos3bucket(fileUrl, file);
            file.delete();
        } catch (FileNotFoundException e) {
            throw new FileNotFoundException(e.getMessage());
        }
        return fileUrl;
    }

}
