FROM openjdk:11
# Install the AWS CLI
RUN apt-get update && apt-get install -y awscli
#MAINTAINER Bharath Kumar
ADD target/job-management-0.0.1-SNAPSHOT.jar job-management-0.0.1-SNAPSHOT.jar
#ENTRYPOINT ["java","-jar","test.jar"]
#WORKDIR /app
#COPY target/job-0.0.1-SNAPSHOT.jar .
CMD ["java", "-jar", "job-management-0.0.1-SNAPSHOT.jar"]
#ENTRYPOINT ["java", "-jar", "job-management-0.0.1-SNAPSHOT.jar"]
