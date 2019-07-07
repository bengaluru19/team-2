package com.example.karthik.codeforgood;
import android.content.Intent;
import android.graphics.Bitmap;
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
public class loginActivity extends AppCompatActivity {
    FirebaseAuth firebaseAuth;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        firebaseAuth = FirebaseAuth.getInstance();
        Button b=(Button)findViewById(R.id.vlogin);
        b.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                final EditText em=(EditText)findViewById(R.id.emlogin);
                final EditText u=(EditText)findViewById(R.id.phnologin);
                final EditText p=(EditText)findViewById(R.id.dig4login);
                if((!u.getText().toString().equals(""))&&(!p.getText().toString().equals(""))){
                    firebaseAuth.signInWithEmailAndPassword(em.getText().toString(),p.getText().toString()).addOnCompleteListener(loginActivity.this, new OnCompleteListener< AuthResult >() {
                        @Override
                        public void onComplete(@NonNull Task task) {
                            if (!task.isSuccessful()) {
                                Toast.makeText(loginActivity.this, "Not successfull", Toast.LENGTH_SHORT).show();
                            } else {
                                String us=u.getText().toString();
                                String ps=p.getText().toString();
                                Intent i=new Intent(loginActivity.this, insideVendor.class);
                                i.putExtra("PHNO",us);
                                i.putExtra("DIG",ps);
                                startActivity(i);
                            }
                        }
                    });
                }
                else{
                    Toast.makeText(loginActivity.this,"Fields cannot be empty",Toast.LENGTH_LONG).show();
                }

            }
        });
    }
}
