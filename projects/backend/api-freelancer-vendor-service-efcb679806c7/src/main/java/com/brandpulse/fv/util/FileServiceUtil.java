/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.brandpulse.fv.util;

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

    private AmazonS3Client amazonS3Client;

    @Value("${amazon.aws.accesskey}")
    private String amazonAWSAccessKey;

    @Value("${amazon.aws.secretkey}")
    private String amazonAWSSecretKey;

    @Value("${amazon.aws.bucketName}")
    private String amazonAWSBucketName;

    @Value("${amazon.aws.bucket.path.freelancer.image}")
    String amazonFreelancerImagePath;

    @Value("${amazon.aws.bucket.path.vendor.logo}")
    String amazonVendorImagePath;

    @Value("${amazon.aws.bucket.path.vendorUser.image}")
    String amazonVendorUserImagePath;

    @Value("${amazon.aws.bucket.path.freelancer.resume}")
    String amazonFreelancerResumePath;

    @Value("${amazon.aws.bucket.path.vendor.portfolio}")
    String amazonVendorPortfolioPath;

    @Value("${app.environment}")
    private String environment;

    @PostConstruct
    private void initializeAmazon() {
        AWSCredentials credentials = new BasicAWSCredentials(amazonAWSAccessKey, amazonAWSSecretKey);
        this.amazonS3Client = new AmazonS3Client(credentials);
    }

    private File convertMultiPartToFile(MultipartFile file) throws IOException {
        File convFile = new File(file.getOriginalFilename());
        FileOutputStream fos = new FileOutputStream(convFile);
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

    public String uploadFreelancerProfileImage(MultipartFile multipartFile, String freelancerRefNo) throws IOException {
        String[] fileText = multipartFile.getOriginalFilename().split("\\.");
        String extension = fileText[fileText.length - 1];
        String fileName = freelancerRefNo + "." + extension;
        return uploadFile(multipartFile, amazonFreelancerImagePath, fileName);
    }

    public String uploadFreelancerResume(MultipartFile multipartFile, String freelancerRefNo) throws IOException {
        String[] fileText = multipartFile.getOriginalFilename().split("\\.");
        String extension = fileText[fileText.length - 1];
        String fileName = freelancerRefNo + "." + extension;
        return uploadFile(multipartFile, amazonFreelancerResumePath, fileName);
    }

    public String uploadVendorPortfolio(MultipartFile multipartFile, String vendorRefNo) throws IOException {
        String[] fileText = multipartFile.getOriginalFilename().split("\\.");
        String extension = fileText[fileText.length - 1];
        String fileName = vendorRefNo + "." + extension;
        return uploadFile(multipartFile, amazonVendorPortfolioPath, fileName);
    }

    public String uploadVendorCompanyLogo(MultipartFile multipartFile, String vendorRefNo) throws IOException {
        String[] fileText = multipartFile.getOriginalFilename().split("\\.");
        String extension = fileText[fileText.length - 1];
        String fileName = vendorRefNo + "." + extension;
        return uploadFile(multipartFile, amazonVendorImagePath, fileName);
    }

    public String uploadVendorUserProfileImage(MultipartFile multipartFile, String userRef, String vendorUserId) throws IOException {
        String[] fileText = multipartFile.getOriginalFilename().split("\\.");
        String extension = fileText[fileText.length - 1];
        String fileName = vendorUserId + "." + extension;
        return uploadFile(multipartFile, amazonVendorUserImagePath, fileName);
    }
}
