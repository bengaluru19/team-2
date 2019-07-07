package com.example.karthik.codeforgood;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class MainVendorActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main_vendor);
        Button log=(Button)findViewById(R.id.Log);
        Button sig=(Button)findViewById(R.id.Sig);
        log.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                startActivity(new Intent(MainVendorActivity.this,loginActivity.class));
            }
        });
        sig.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent i=new Intent(MainVendorActivity.this,vendorsignup.class);
                startActivity(i);
            }
        });
    }
}
