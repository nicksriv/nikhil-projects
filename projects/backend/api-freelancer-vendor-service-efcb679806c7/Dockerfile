FROM openjdk:11
# Install the AWS CLI
RUN apt-get update && apt-get install -y awscli
#MAINTAINER Bharath Kumar
ADD target/fv-0.0.1-SNAPSHOT.jar fv-0.0.1-SNAPSHOT.jar
#ENTRYPOINT ["java","-jar","test.jar"]
#WORKDIR /app
#COPY target/fv-0.0.1-SNAPSHOT.jar .
CMD ["java", "-jar", "fv-0.0.1-SNAPSHOT.jar"]
#ENTRYPOINT ["java", "-jar", "fv-0.0.1-SNAPSHOT.jar"]
