package com.example.karthik.codeforgood;

import android.content.Intent;
import android.os.AsyncTask;
import android.support.annotation.NonNull;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;

import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;

public class vendorsignup extends AppCompatActivity {
    FirebaseAuth firebaseAuth;
    DatabaseReference vendordata;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_vendorsignup);
        firebaseAuth = FirebaseAuth.getInstance();
        vendordata=FirebaseDatabase.getInstance().getReference("vendors");
        final EditText nm = (EditText) findViewById(R.id.Vendorname);
        final EditText em = (EditText) findViewById(R.id.email);
        final EditText ph = (EditText) findViewById(R.id.phno);
        final EditText ser = (EditText) findViewById(R.id.Service);
        final EditText dg = (EditText) findViewById(R.id.dig4);
        Button bv=(Button)findViewById(R.id.signvendor);
        bv.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if((!nm.getText().toString().equals(""))&&(!ph.getText().toString().equals(""))){
                    firebaseAuth.createUserWithEmailAndPassword(em.getText().toString(),dg.getText().toString()).addOnCompleteListener(vendorsignup.this, new OnCompleteListener<AuthResult>() {
                        @Override
                        public void onComplete(@NonNull Task<AuthResult> task) {
                            if(task.isSuccessful()){
                                //display some message here
                                Vendorinfo s=new Vendorinfo(nm.getText().toString(),ph.getText().toString(),ser.getText().toString(),dg.getText().toString());
                                vendordata.child(firebaseAuth.getCurrentUser().getUid()).setValue(s);
                                Toast.makeText(vendorsignup.this,"Successfully registered",Toast.LENGTH_LONG).show();
                                finish();
                            }else{
                                //display some message here
                                Toast.makeText(vendorsignup.this,"Registration Error",Toast.LENGTH_LONG).show();
                            }
                        }
                    });}
                else{
                    Toast.makeText(vendorsignup.this,"Fields cannot be empty",Toast.LENGTH_LONG).show();
                }

            }
        });
    }

}
