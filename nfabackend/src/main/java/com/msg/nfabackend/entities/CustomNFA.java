package com.msg.nfabackend.entities;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.msg.nfabackend.entities.NfaCatalog.BlueprintConverter;
import com.msg.nfabackend.entities.NfaCatalog.NfaCatalogBlueprint;

@Entity
@Table(name ="nfa_custom")
public class CustomNFA implements NfaInterface {
		
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column (name ="nfa_custom_id")
	private Long nfaCustomId;

	@ManyToOne(cascade = CascadeType.ALL)
	private NfaCatalog originalEntry;
	
	@Column (name ="value")
	private String value;

	@Column (name ="formulation")
	private String formulation;
	
	@Column (name ="reference")
	private String reference;
	
	@Column (name ="criticality")
	private String criticality;
	
	@Column (name ="document")
	private String document;
	
	@Column (name ="blueprint")
	@Convert(converter = BlueprintConverter.class)
	private NfaCatalogBlueprint blueprint;

	public Long getId() {
		return nfaCustomId;
	}

	public String getType() {
		return originalEntry.getType();
	}

	public String getRechtlicheVerbindlichkeit() {
		return originalEntry.getRechtlicheVerbindlichkeit();
	}

	public String getFormulation() {
		return formulation;
	}
	
	public String getReference() {
		return reference;
	}

	public String getReferencedProjects() {
		return originalEntry.getReferencedProjects();
	}

	public String getCriticality() {
		return criticality;
	}

	public String getDocument() {
		return document;
	}

	public String getValue() {
		return value;
	}

	public Long getNfaNumber() {
		return originalEntry.getNfaNumber();
	}
	
	public NfaCatalogBlueprint getBlueprint() {
		return blueprint;
	}

}
