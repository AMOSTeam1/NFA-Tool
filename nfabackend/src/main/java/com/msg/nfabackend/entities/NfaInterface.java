package com.msg.nfabackend.entities;

public interface NfaInterface {

	//TODO comment
	
	public Long getId();

	public String getType();

	public String getRechtlicheVerbindlichkeit(); 

	public String getFormulation();
	
	public String getReference();
	
	public String getReferencedProjects(); 

	public String getCriticality();

	public String getDocument();

	public String getValue();

	public Long getNfaNumber(); 
	
}
