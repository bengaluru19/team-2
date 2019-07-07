package com.example.karthik.codeforgood;

public class SupportData {
    public String getDatabaseName() {
        return "cfg";
    }
    public String getApiKey() {
        return "1xJQePOFkVOOP8ukMJ6HEyeTGe1Y8DVY";
    }
    public String getBaseUrl()
    {
        return "https://api.mlab.com/api/1/databases/"+getDatabaseName()+"/collections/";
    }
    public String apiKeyUrl()
    {
        return "?apiKey="+getApiKey();
    }
    public String collectionName()
    {
        return "vendors";
    }
//    public String buildContactsSaveURL()
//    {
//        return getBaseUrl()+collectionName()+apiKeyUrl();
//    }
    public String buildContactsFetchURL()
    {
        return getBaseUrl()+collectionName()+apiKeyUrl();
    }
//    public String createContact(Vendorinfo v) {
//        return String.format("{\"name\": \"%s\", "+ "\"last_name\": \"%s\", " + "\"phone\": \"%s\"}", contact.getFirst_name(), contact.getLast_name(), contact.getPhone_nubmer());
//    }
}