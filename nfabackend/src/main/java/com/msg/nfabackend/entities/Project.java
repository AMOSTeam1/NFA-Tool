package com.msg.nfabackend.entities;

import java.util.HashSet;
import java.util.List;
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
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;


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
//	@GeneratedValue(strategy=GenerationType.IDENTITY) //TODO without Testdata, this is sufficient
	@GeneratedValue(
			strategy = GenerationType.SEQUENCE,
			generator = "project-id-generator"
		)
    @SequenceGenerator(
    		allocationSize = 1,
    		name = "project-id-generator", 
    		sequenceName ="project_sequence"
	)
	@Column(name="ID")
	private Long id;
	
	@OneToMany(mappedBy = "project", cascade = CascadeType.ALL)
	private List<CustomNFA> customNfaList;
	
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
	private Set<Type> projectTypes = new HashSet<Type>();
	
	@Column(name="DEVELOPMENT_PROCESS")
	private String developmentProcess;
	
	@Column(name="PROJECT_PHASE")
	private String projectPhase;
	
	@Column(name="PROJECT_STATUS")
	private String projectStatus;
	
	@ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinTable(name = "project_stakeholder", joinColumns = @JoinColumn(name = "PROJECT_ID"), inverseJoinColumns = @JoinColumn(name = "stakeholder_id"))
	private Set<Stakeholder> projectStakeholders = new HashSet<Stakeholder>();
	
	@ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinTable(name = "project_nfa", joinColumns = @JoinColumn(name = "PROJECT_ID"), inverseJoinColumns = @JoinColumn(name = "nfa_id"))
	private Set<NfaCatalog> projectNfas = new HashSet<NfaCatalog>();

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


	public Set<Type> getProjectTypes() {
		return projectTypes;
	}

	public void setProjectTypes(Set<Type> projectTypes) {
		this.projectTypes = projectTypes;
	}

	public Set<Stakeholder> getProjectStakeholders() {
		return projectStakeholders;
	}

	public void setProjectStakeholders(Set<Stakeholder> projectStakeholders) {
		this.projectStakeholders = projectStakeholders;
	}

	public Set<NfaCatalog> getProjectNfas() {
		return projectNfas;
	}

	public void setProjectNfas(Set<NfaCatalog> projectNfas) {
		this.projectNfas = projectNfas;
	}

}
