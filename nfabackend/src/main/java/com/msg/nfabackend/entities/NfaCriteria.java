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
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name ="nfa_criteria")
public class NfaCriteria {
	public NfaCriteria() {}
	 
	@Id
	/*@SequenceGenerator(name="criteria-seq-gen",sequenceName="CRITERIA_ID_SEQ" , initialValue = 1, allocationSize=1)
	@GeneratedValue(strategy=GenerationType.IDENTITY, generator="criteria-seq-gen")*/
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="criteria_id")
	private Long id;
	
	@Column (name ="criteria_num")
	private Long criteriaNumber;
	
	@Column (name ="criteria")
	private String criteria;
	
	@OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinTable(name = "CRITERIA_METRIC", joinColumns = @JoinColumn(name = "CRITERIA_ID"), inverseJoinColumns = @JoinColumn(name = "METRIC_ID"))
	@OrderBy("METRIC_NUMBER ASC")
	private Set<Metric> metricList = new HashSet<Metric>();

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getCriteriaNumber() {
		return criteriaNumber;
	}

	public void setCriteriaNumber(Long criteriaNumber) {
		this.criteriaNumber = criteriaNumber;
	}

	public String getCriteria() {
		return criteria;
	}

	public void setCriteria(String criteria) {
		this.criteria = criteria;
	}

	public Set<Metric> getMetricList() {
		return metricList;
	}

	public void setMetricList(Set<Metric> metricList) {
		this.metricList = metricList;
	}
	
	
		
	
	
	

}