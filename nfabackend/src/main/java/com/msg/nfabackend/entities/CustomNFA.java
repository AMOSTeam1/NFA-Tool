package com.msg.nfabackend.entities;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name ="nfa_custom")
public class CustomNFA implements NfaInterface{
		
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column (name ="nfa_custom_id")
	private Long nfaCustomId;

	@ManyToOne(cascade = CascadeType.ALL)
	private NfaCatalog originalEntry;

	@Column (name ="nfa_number")
	private Long nfaNumber;
	
	@Column (name ="nfa_type")
	private String type;
	
	@Column (name ="wert")
	private String wert;

	@Column (name ="rechtliche_verbindlichkeit")
	private String rechtlicheVerbindlichkeit;
	
	@Column (name ="formulierung")
	private String formulierung;
	
	@Column (name ="referenz")
	private String referenz;
	
	@Column (name ="referenzierte_projekte")
	private String referenzierteProjekte;
	
	@Column (name ="kritikalitaet")
	private String kritikalität;
	
	@Column (name ="dokument")
	private String dokument;


	public Long getId() {
		return nfaCustomId;
	}

	public String getType() {
		return type;
	}

	public String getRechtlicheVerbindlichkeit() {
		return rechtlicheVerbindlichkeit;
	}

	public String getFormulierung() {
		return formulierung;
	}
	
	public String getReferenz() {
		return referenz;
	}

	public String getReferenzierteProjekte() {
		return referenzierteProjekte;
	}

	public String getKritikalität() {
		return kritikalität;
	}

	public String getDokument() {
		return dokument;
	}

	public String getWert() {
		return wert;
	}

	public Long getNfaNumber() {
		return nfaNumber;
	}

}
