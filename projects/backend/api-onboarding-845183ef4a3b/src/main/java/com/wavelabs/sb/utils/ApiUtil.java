package com.wavelabs.sb.utils;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

import org.springframework.core.io.InputStreamResource;
import org.springframework.stereotype.Component;

import com.wavelabs.sb.exceptions.ClientOnboardingServiceException;

@Component
public class ApiUtil {

    // compress the image bytes before storing it in the database
    public static byte[] compressBytes(final byte[] data) {
	final Deflater deflater = new Deflater();
	deflater.setInput(data);
	deflater.finish();
	ByteArrayOutputStream outputStream = null;
	try {
	    if (data.length > 0) {
		outputStream = new ByteArrayOutputStream(data.length);
	    }
	    final byte[] buffer = new byte[1024];
	    while (!deflater.finished()) {
		final int count = deflater.deflate(buffer);
		outputStream.write(buffer, 0, count);
	    }
	    outputStream.close();
	} catch (final IOException e) {
	    throw new ClientOnboardingServiceException("Failed uploading Client Logo");
	}
	return outputStream.toByteArray();
    }

    // uncompress the image bytes before returning it to the UI
    public static InputStreamResource decompressBytesToInputStream(final byte[] data) {
	final Inflater inflater = new Inflater();
	inflater.setInput(data);
	final ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
	final byte[] buffer = new byte[1024];
	try {
	    while (!inflater.finished()) {
		final int count = inflater.inflate(buffer);
		outputStream.write(buffer, 0, count);
	    }
	    outputStream.close();
	} catch (IOException | DataFormatException e) {
	    throw new ClientOnboardingServiceException("Failed downloading Client Logo");
	}
	return new InputStreamResource(new ByteArrayInputStream(outputStream.toByteArray()));
    }

}
