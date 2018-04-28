package com.msg.nfabackend.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.Column;

@Entity
@Table(name ="new_nfa")
public class Nfa {
 public Nfa() {}
	 
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column (name ="nfa_id")
	private Long nfa_id;
	
	@Column (name ="factor")
	private String factor;
	
	@Column (name ="criteria")
	private String criteria;
	
	@Column (name ="metric")
	private String metric;
	
	@Column (name ="nfa_type")
	private String nfa_type;

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

	public String getCriteria() {
		return criteria;
	}

	public void setCriteria(String criteria) {
		this.criteria = criteria;
	}

	public String getMetric() {
		return metric;
	}

	public void setMetric(String metric) {
		this.metric = metric;
	}

	public String getNfa_type() {
		return nfa_type;
	}

	public void setNfa_type(String nfa_type) {
		this.nfa_type = nfa_type;
	}
	
	
	
}
