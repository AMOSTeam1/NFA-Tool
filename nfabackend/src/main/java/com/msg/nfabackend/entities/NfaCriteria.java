package com.msg.nfabackend.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name ="nfa_criteria")
public class NfaCriteria {
	public NfaCriteria() {}
	 
	@Id
	@SequenceGenerator(name="criteria-seq-gen",sequenceName="CRITERIA_ID_SEQ" , initialValue = 1, allocationSize=1)
	@GeneratedValue(strategy=GenerationType.IDENTITY, generator="criteria-seq-gen")
	@Column(name="criteria_id")
	private Long id;
	
	@Column (name ="criteria_num")
	private Long criteriaNumber;
	
	@Column (name ="criteria")
	private String criteria;
		
	public Long getCriteriaId() {
		return id;
	}

	public void setCriteriaId(Long critId) {
		this.id = critId;
	}

	public String getCriteria() {
		return criteria;
	}

	public void setCriteria(String someCriteria) {
		this.criteria = someCriteria;
	}

}