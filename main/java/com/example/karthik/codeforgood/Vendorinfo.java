package com.example.karthik.codeforgood;

public class Vendorinfo {
    private String name;
    private String phno;
    private String service;
    private String dig4;

    public Vendorinfo(String string, String string1, String string2, String string4) {
        name=string;
        phno=string1;
        service=string2;
        dig4=string4;
    }

    public String getName() {
        return name;
    }
    public String getPhno() {
        return phno;
    }
    public String getDig4() {
        return dig4;
    }

    public String getService() {
        return service;
    }
    public void setDig4(String dig4) {
        this.dig4 = dig4;
    }

    public void setName(String name) {
        this.name = name;
    }
    public void setPhno(String phno) {
        this.phno = phno;
    }
    public void setService(String service) {
        this.service = service;
    }

}
