package com.msg.nfabackend.entities;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;

public class Metric {

	public Metric() {}
	 
	/*@Id
	@SequenceGenerator(name="criteria-seq-gen",sequenceName="CRITERIA_ID_SEQ" , initialValue = 1, allocationSize=1)
	@GeneratedValue(strategy=GenerationType.IDENTITY, generator="criteria-seq-gen")*/
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="ID")
	private Long id;
	
	@Column (name ="METRIC_NUMBER")
	private Long metricNumber;
	
	@Column (name ="BEZEICHNUNG")
	private String bezeichnung;
	
	@Column (name ="FORMEL")
	private String formel;

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
	
	
	
}
