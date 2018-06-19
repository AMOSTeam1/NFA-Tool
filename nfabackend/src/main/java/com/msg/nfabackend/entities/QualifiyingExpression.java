package com.msg.nfabackend.entities;


import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name="QUALIFIYING_EXPRESSION")
public class QualifiyingExpression {

	public QualifiyingExpression() {}
	 
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="ID")
	private Long id;
	
	@Column (name ="DE")
	private String de;
	
	@Column (name ="EN")
	private String en;
	
	@OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@Column (name ="ABUNDANT")
	private QualifiyingExpression abundant;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	/**
	 * @return the de
	 */
	public String getDe() {
		return de;
	}

	/**
	 * @param de the de to set
	 */
	public void setDe(String de) {
		this.de = de;
	}

	/**
	 * @return the en
	 */
	public String getEn() {
		return en;
	}

	/**
	 * @param en the en to set
	 */
	public void setEn(String en) {
		this.en = en;
	}

	/**
	 * @return the abundant
	 */
	public QualifiyingExpression getAbundant() {
		return abundant;
	}

	/**
	 * @param abundant the abundant to set
	 */
	public void setAbundant(QualifiyingExpression abundant) {
		this.abundant = abundant;
	}
	
}
