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
import javax.persistence.OrderBy;
import javax.persistence.Table;
import javax.xml.bind.annotation.*;
import javax.xml.bind.JAXBElement;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name ="nfa_factor")
@XmlType(propOrder = { "factor", "nfa_id" ,"id", "bezeichnung","criteriaList"})
public class NfaFactor {
	public NfaFactor() {
		
	}
	 
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column (name ="factor_id")
	protected Long nfa_id;
	
	@Column (name ="factor")
	protected String factor;
	
	public String getFactor() {
		return factor;
	}
	public void setFactor(String factor) {
		this.factor = factor;
	}


	@OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinTable(name = "FACTOR_CRITERIA", joinColumns = @JoinColumn(name = "FACTOR_ID"), inverseJoinColumns = @JoinColumn(name = "CRITERIA_ID"))
	@OrderBy("criteria_num ASC")
	private Set<NfaCriteria> criteriaList = new HashSet<NfaCriteria>();
	


	public Set<NfaCriteria> getCriteriaList() {
		return criteriaList;
	}

	public void setCriteriaList(Set<NfaCriteria> criteriaList) {
		this.criteriaList = criteriaList;
	}

	public Long getNfa_id() {
		return nfa_id;
	}
	public void setNfa_id(Long nfa_id) {
		this.nfa_id = nfa_id;
	}
	@XmlElement
	public void setId(Long nfa_id) {
		this.nfa_id = nfa_id;
	}
	
	public Long getId() {
		return nfa_id;
	}
	
    @XmlElement (name = "bezeichnung")
	public void setBezeichnung(String factor) {
		this.factor = factor;
	}
    
	public String getBezeichnung() {
		return factor;
	}

}