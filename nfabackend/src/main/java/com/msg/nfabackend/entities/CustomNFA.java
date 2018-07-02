package com.msg.nfabackend.entities;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.msg.nfabackend.entities.NfaCatalog.BlueprintConverter;
import com.msg.nfabackend.entities.NfaCatalog.NfaCatalogBlueprint;

@Entity
@Table(name ="custom_nfa")
//@JsonIgnoreProperties(ignoreUnknown=true)
@JsonIgnoreProperties({"nfaCustomId", "nfaOriginalId"})
public class CustomNFA implements NfaInterface {
		
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	
	@Column (name ="custom_id")
	private Long nfaCustomId;
	//public nfaCustomId: number,
	
	//public nfaOriginalgId: number,
	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name = "nfa_id")
	private NfaCatalog originalEntry;
//	private Long nfaOriginalId;

	//public value: string,
	@Column (name ="value")
	private String value;

	//public formulation: string,
	@Column (name ="formulation")
	private String formulation;

	//public reference: string,
	@Column (name ="reference")
	private String reference;

	//public criticality: string,
	@Column (name ="criticality")
	private String criticality;

	//	public document: string
	@Column (name ="document")
	private String document;

	//public blueprint: NfaCatalogBlueprintModel,
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

	public NfaCatalog getOriginalNfa() {
		return originalEntry;
	}
	
	public void setOriginalNfa(NfaCatalog originalNfa) {
		originalEntry = originalNfa;
	}

}
