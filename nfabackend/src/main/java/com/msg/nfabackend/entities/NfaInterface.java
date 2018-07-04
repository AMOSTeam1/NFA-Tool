package com.msg.nfabackend.entities;

import java.util.List;

public interface NfaInterface {

	//TODO comment
	
	public Long getId();

	public String getType();

	public String getLegalLiability(); 

	public String getFormulation();
	
	public String getReference();
	
	public String getReferencedProjects(); 

	public String getCriticality();

	public String getDocument();

	public List<String> getValues();

	public Long getNfaNumber(); 
	
}
