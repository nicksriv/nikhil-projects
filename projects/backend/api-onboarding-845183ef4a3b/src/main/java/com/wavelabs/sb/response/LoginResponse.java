package com.wavelabs.sb.response;

public class LoginResponse extends BaseResponse {

    private String token;
    private boolean workFlowEnabled;
    private boolean themeEnabled;
    private String primaryColor;
    private String menuColor;
    private String font;
    private String profileId;
    private String logoId;
    private String backgroundImageId;
    private double opacity;
    private String googleMapAuthKey;
    private String firebaseAuthKey;

    public String getPrimaryColor() {
	return primaryColor;
    }

    public void setPrimaryColor(String primaryColor) {
	this.primaryColor = primaryColor;
    }

    public String getMenuColor() {
	return menuColor;
    }

    public void setMenuColor(String menuColor) {
	this.menuColor = menuColor;
    }

    public String getFont() {
	return font;
    }

    public void setFont(String font) {
	this.font = font;
    }

    public boolean isWorkFlowEnabled() {
	return workFlowEnabled;
    }

    public void setWorkFlowEnabled(boolean workFlowEnabled) {
	this.workFlowEnabled = workFlowEnabled;
    }

    public String getToken() {
	return token;
    }

    public void setToken(String token) {
	this.token = token;
    }

    public boolean isThemeEnabled() {
	return themeEnabled;
    }

    public void setThemeEnabled(boolean themeEnabled) {
	this.themeEnabled = themeEnabled;
    }

    public String getProfileId() {
	return profileId;
    }

    public void setProfileId(String profileId) {
	this.profileId = profileId;
    }

    public String getLogoId() {
	return logoId;
    }

    public void setLogoId(String logoId) {
	this.logoId = logoId;
    }

    public String getBackgroundImageId() {
	return backgroundImageId;
    }

    public void setBackgroundImageId(String backgroundImageId) {
	this.backgroundImageId = backgroundImageId;
    }

    public double getOpacity() {
	return opacity;
    }

    public void setOpacity(double opacity) {
	this.opacity = opacity;
    }

    public String getGoogleMapAuthKey() {
	return googleMapAuthKey;
    }

    public void setGoogleMapAuthKey(String googleMapAuthKey) {
	this.googleMapAuthKey = googleMapAuthKey;
    }

    public String getFirebaseAuthKey() {
	return firebaseAuthKey;
    }

    public void setFirebaseAuthKey(String firebaseAuthKey) {
	this.firebaseAuthKey = firebaseAuthKey;
    }

}
