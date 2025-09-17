package com.wavelabs.sb.request;

public class ThemeRequest {

    private String clientId;

    private String primaryColor;

    private String menuColor;

    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
    }

    private String font;

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

}
