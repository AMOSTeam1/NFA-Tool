package com.msg.nfabackend.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.CascadeType;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.JoinColumn;
import java.util.ArrayList;
import java.util.List;


/**
 * Entity-Mapping for the table 'NFA_PROJECT'.
 * 
 * @author <a href="mailto:alla.bors@fau.de">Alla Bors</a>
 */
@Entity
@Table(name="NFA_PROJECT")
public class Project {
	
	public Project() {}
	
	@Id
	@SequenceGenerator(name="seq-gen",sequenceName="NFA_PROJECT_ID_SEQ" , initialValue = 1, allocationSize=1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="seq-gen")
	@Column(name="ID")
	private Long id;
	
	@Column(name="NFA_PROJECT_NUMBER")
	private String nfaProjectNumber;
	
	@Column(name="CUSTOMER_NAME")
	private String customerName;
	
	@Column(name="CONTACT_PERS_CUSTOMER")
	private String contactPersCustomer;
	
	@Column(name="CONTACT_PERS_MSG")
	private String contactPersMsg;
	
	@Column(name="BRANCH")
	private String branch;
	
	@ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinTable(name = "PROJECT_TYPE", joinColumns = @JoinColumn(name = "PROJECT_ID"), inverseJoinColumns = @JoinColumn(name = "TYPE_ID"))
	private List<Type> projectTypes = new ArrayList<Type>();
	
	@Column(name="DEVELOPMENT_PROCESS")
	private String developmentProcess;
	
	@Column(name="PROJECT_PHASE")
	private String projectPhase;
	
	@Column(name="PROJECT_STATUS")
	private String projectStatus;

	/**
	 * @return the id
	 */
	public Long getId() {
		return id;
	}

	/**
	 * @param id the id to set
	 */
	public void setId(Long id) {
		this.id = id;
	}


	/**
	 * @return the nfaProjectNumber
	 */
	public String getNfaProjectNumber() {
		return nfaProjectNumber;
	}

	/**
	 * @param nfaProjectNumber the nfaProjectNumber to set
	 */
	public void setNfaProjectNumber(String nfaProjectNumber) {
		this.nfaProjectNumber = nfaProjectNumber;
	}

	/**
	 * @return the customerName
	 */
	public String getCustomerName() {
		return customerName;
	}

	/**
	 * @param customerName the customerName to set
	 */
	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}

	/**
	 * @return the contactPersCustomer
	 */
	public String getContactPersCustomer() {
		return contactPersCustomer;
	}

	/**
	 * @param contactPersCustomer the contactPersCustomer to set
	 */
	public void setContactPersCustomer(String contactPersCustomer) {
		this.contactPersCustomer = contactPersCustomer;
	}

	/**
	 * @return the contactPersMsg
	 */
	public String getContactPersMsg() {
		return contactPersMsg;
	}

	/**
	 * @param contactPersMsg the contactPersMsg to set
	 */
	public void setContactPersMsg(String contactPersMsg) {
		this.contactPersMsg = contactPersMsg;
	}

	/**
	 * @return the branch
	 */
	public String getBranch() {
		return branch;
	}

	/**
	 * @param branch the branch to set
	 */
	public void setBranch(String branch) {
		this.branch = branch;
	}


	/**
	 * @return the developmentProcess
	 */
	public String getDevelopmentProcess() {
		return developmentProcess;
	}

	/**
	 * @param developmentProcess the developmentProcess to set
	 */
	public void setDevelopmentProcess(String developmentProcess) {
		this.developmentProcess = developmentProcess;
	}

	/**
	 * @return the projectPhase
	 */
	public String getProjectPhase() {
		return projectPhase;
	}

	/**
	 * @param projectPhase the projectPhase to set
	 */
	public void setProjectPhase(String projectPhase) {
		this.projectPhase = projectPhase;
	}

	/**
	 * @return the projectStatus
	 */
	public String getProjectStatus() {
		return projectStatus;
	}

	/**
	 * @param projectStatus the projectStatus to set
	 */
	public void setProjectStatus(String projectStatus) {
		this.projectStatus = projectStatus;
	}

	public List<Type> getProjectTypes() {
		return projectTypes;
	}

	public void setProjectTypes(List<Type> projectTypes) {
		this.projectTypes = projectTypes;
	}
	
	



}
