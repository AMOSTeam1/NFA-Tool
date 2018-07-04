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

@Entity
@Table(name ="nfa_factor")
public class NfaFactor {
	public NfaFactor() {}
	 
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column (name ="factor_id")
	private Long factorNumber;
	
	@Column (name ="factor")
	private String factor;
	
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

	public Long getFactorNumber() {
		return factorNumber;
	}

	public void setFactorNumber(Long factorNumber) {
		this.factorNumber = factorNumber;
	}

	public String getFactor() {
		return factor;
	}

	public void setFactor(String factor) {
		this.factor = factor;
	}

}