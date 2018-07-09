package com.msg.nfabackend.entities;

import java.util.List;

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
import com.msg.nfabackend.entities.NfaCatalog.ValueConverter;

@Entity
@Table(name ="custom_nfa")
//@JsonIgnoreProperties(ignoreUnknown=true)
@JsonIgnoreProperties({"customId", "originalId"})
public class CustomNFA implements NfaInterface {
		
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column (name ="custom_id")
	private Long customId;

	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name = "nfa_id")
	private NfaCatalog originalEntry;
	
	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name = "project_id")
	private Project project;

	@Column (name ="value")
	@Convert(converter = ValueConverter.class)
	private List<String> values;

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
		return customId;
	}

	public String getType() {
		return originalEntry.getType();
	}

	public String getLegalLiability() {
		return originalEntry.getLegalLiability();
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

	public List<String> getValues() {
		return values;
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

	public Project getProject() {
		return project;
	}

	public void setProject(Project project2) {
		this.project = project2;		
	}

}
