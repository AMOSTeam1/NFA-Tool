package com.msg.nfabackend.entities;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name="METRIC")
public class Metric {

	public Metric() {}
	 
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="ID")
	private Long id;
	
	@Column (name ="METRIC_NUMBER")
	private Long metricNumber;
	
	@Column (name ="BEZEICHNUNG")
	private String bezeichnung;
	
	@Column (name ="ERKLAERUNG_MESSGROESSE")
	private String erklaerungMessgroesse;
	
	@Column (name ="FORMEL")
	private String formel;
	
	@Column (name ="INTERPRETATION")
	private String interpretation;
	
	@OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinTable(name = "METRIC_NFA", joinColumns = @JoinColumn(name = "METRIC_ID"), inverseJoinColumns = @JoinColumn(name = "NFA_ID"))
	//@OrderBy("NFA_NUMBER ASC")
	private Set<NfaCatalog> nfaList = new HashSet<NfaCatalog>();

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getMetricNumber() {
		return metricNumber;
	}

	public void setMetricNumber(Long metricNumber) {
		this.metricNumber = metricNumber;
	}

	public String getBezeichnung() {
		return bezeichnung;
	}

	public void setBezeichnung(String bezeichnung) {
		this.bezeichnung = bezeichnung;
	}

	public String getFormel() {
		return formel;
	}

	public void setFormel(String formel) {
		this.formel = formel;
	}

	public String getInterpretation() {
		return interpretation;
	}

	public void setInterpretation(String interpretation) {
		this.interpretation = interpretation;
	}

	public Set<NfaCatalog> getNfaList() {
		return nfaList;
	}

	public void setNfaList(Set<NfaCatalog> nfaList) {
		this.nfaList = nfaList;
	}

	public String getErklaerungMessgroesse() {
		return erklaerungMessgroesse;
	}

	public void setErklaerungMessgroesse(String erklaerungMessgroesse) {
		this.erklaerungMessgroesse = erklaerungMessgroesse;
	}
	
	
	
	
	
	
	
}
