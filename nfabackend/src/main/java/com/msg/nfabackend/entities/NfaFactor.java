package com.msg.nfabackend.entities;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.OneToMany;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;

@Entity
@Table(name ="nfa_factor")
public class NfaFactor {
	public NfaFactor() {}
	 
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column (name ="factor_id")
	private Long nfa_id;
	
	@Column (name ="factor")
	private String factor;
	
	@OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinTable(name = "FACTOR_CRITERIA", joinColumns = @JoinColumn(name = "FACTOR_ID"), inverseJoinColumns = @JoinColumn(name = "CRITERIA_ID"))
	private List<NfaCriteria> criteriaList = new ArrayList<NfaCriteria>();
	
	public List<NfaCriteria> getCriteriaList() {
		return criteriaList;
	}

	public void setCriteriaList(List<NfaCriteria> criteriaList) {
		this.criteriaList = criteriaList;
	}

	public Long getNfa_id() {
		return nfa_id;
	}

	public void setNfa_id(Long nfa_id) {
		this.nfa_id = nfa_id;
	}

	public String getFactor() {
		return factor;
	}

	public void setFactor(String factor) {
		this.factor = factor;
	}

}