package com.example.karthik.codeforgood;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import com.google.firebase.auth.FirebaseAuth;

public class insideVendor extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        String sphno;
        setContentView(R.layout.activity_inside_vendor);
        Button orr=(Button)findViewById(R.id.orr);
        Button pd=(Button)findViewById(R.id.pd);
        Button lgb=(Button)findViewById(R.id.lgb);
        lgb.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                FirebaseAuth.getInstance().signOut();
                finish();
            }
        });
        Intent li=getIntent();
        Toast.makeText(insideVendor.this,li.getStringExtra("PHNO"),Toast.LENGTH_LONG).show();
        sphno=li.getStringExtra("PHNO");
        orr.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {


            }
        });
        pd.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

            }
        });

    }
}
