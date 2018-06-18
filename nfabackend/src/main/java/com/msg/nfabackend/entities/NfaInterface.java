package com.msg.nfabackend.entities;

public interface NfaInterface {

	//TODO comment
	
	public Long getId();

	public String getType();

	public String getRechtlicheVerbindlichkeit(); 

	public String getFormulierung();
	
	public String getReferenz();
	
	public String getReferenzierteProjekte(); 

	public String getKritikalität();

	public String getDokument();

	public String getWert();

	public Long getNfaNumber(); 
	
}
