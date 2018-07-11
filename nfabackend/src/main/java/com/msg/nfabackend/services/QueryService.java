package com.msg.nfabackend.services;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.hibernate.cfg.NotYetImplementedException;

import com.msg.nfabackend.entities.CustomNFA;
import com.msg.nfabackend.entities.Metric;
import com.msg.nfabackend.entities.NfaCatalog;
import com.msg.nfabackend.entities.NfaCriteria;
import com.msg.nfabackend.entities.NfaFactor;
import com.msg.nfabackend.entities.Project;
import com.msg.nfabackend.entities.Stakeholder;
import com.msg.nfabackend.entities.Type;
import com.msg.nfabackend.entities.User;

@Stateless
public class QueryService {

	@PersistenceContext(unitName = "msg-nfa")
	private EntityManager em;

	public List<Project> getAllProject() {
		return em.createQuery("from Project", Project.class).getResultList();
	}

	public Project getProject(Long projectId) {
		return em.createQuery("from Project WHERE id IS " + projectId, Project.class).getSingleResult();
	}

	public List<Project> findProject(String status, String lookupCustName) {
		CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();
		CriteriaQuery<Project> criteria = criteriaBuilder.createQuery(Project.class);
		Root<Project> root = criteria.from(Project.class);
		Predicate statusQry = criteriaBuilder.like(root.<String>get("projectStatus"), status);
		Predicate lookupQry = criteriaBuilder.like(root.<String>get("customerName"), "%" + lookupCustName + "%");
		criteria.select(root);
		if (!lookupCustName.isEmpty() && status.equalsIgnoreCase("All")) {

			criteria.where(lookupQry);
		} else if (!lookupCustName.isEmpty() && !status.equalsIgnoreCase("All")) {

			Predicate qry = criteriaBuilder.and(lookupQry, statusQry);
			criteria.where(qry);
		} else if (lookupCustName.isEmpty() && !status.equalsIgnoreCase("All")) {
			criteria.where(statusQry);
		}
		return em.createQuery(criteria).getResultList();
	}

	/**
	 * Create new project
	 * 
	 * @param project
	 * @return Project
	 */
	public Project createProject(Project project) {
		em.merge(project);
		return project;
	}

	public NfaCatalog createNfa(Long metricId, NfaCatalog nfaCatalog) {
		Metric metric = em.find(Metric.class, metricId);
		nfaCatalog.setNfaNumber((long) metric.getNfaList().size());

        nfaCatalog.getBlueprint().createDescription(nfaCatalog.getValues());

		em.persist(nfaCatalog);

		metric.getNfaList().add(nfaCatalog);

		return nfaCatalog;
	}

	public CustomNFA createCustomNfa (CustomNFA customNfa, long projectId, long originalId) {
		System.out.println("TEST: " + customNfa.getBlueprint().getDe().getErklaerung());

		NfaCatalog originalNfa = em.find(NfaCatalog.class, originalId);
		Project project = em.find(Project.class, projectId);

		customNfa.setOriginalNfa(originalNfa);
		customNfa.setProject(project);

		em.merge(customNfa);

		return customNfa;
	}

	public void removeProject(Long id) {
		Project project = em.find(Project.class, id);
		project.getProjectTypes().clear();
		project.getProjectNfas().clear();
		project.getProjectStakeholders().clear();
		em.remove(project);
	}

	/**
	 * Updates a project by finding it by id first
	 * 
	 * @param id
	 */
	public void updateProject(Project editedProject) {
		// TODO move logic to Project.java
		// TODO extract to ProjectQueryService.java

		Project project = em.find(Project.class, editedProject.getId());

		project.setCustomerName(editedProject.getCustomerName());
		project.setBranch(editedProject.getBranch());
		project.setContactPersCustomer(editedProject.getContactPersCustomer());
		project.setContactPersMsg(editedProject.getContactPersMsg());
		project.setDevelopmentProcess(editedProject.getDevelopmentProcess());
		project.setProjectPhase(editedProject.getProjectPhase());
		project.setProjectStatus(editedProject.getProjectStatus());
		project.setProjectTypes(editedProject.getProjectTypes());
		project.setProjectStakeholders(editedProject.getProjectStakeholders());

		Set<NfaCatalog> originalNfas = new HashSet<NfaCatalog>();
		for(NfaCatalog nfa : editedProject.getProjectNfas()) {
			NfaCatalog equivalent = em.find(NfaCatalog.class,  nfa.getId());
			if(equivalent != null) {
				originalNfas.add(equivalent);
			}
		}
		project.setProjectNfas(originalNfas);
		em.merge(project);

	}

	public List<Type> getAllType() {
		return em.createQuery("from Type", Type.class).getResultList();
	}

	public List<NfaCatalog> getAllNfa() {
		return em.createQuery("from NfaCatalog", NfaCatalog.class).getResultList();
	}

	public List<NfaFactor> getAllFactors() {
		return em.createQuery("from NfaFactor", NfaFactor.class).getResultList();
	}

	public List<NfaCriteria> getAllNfaCriterias() {
		return em.createQuery("from NfaCriteria", NfaCriteria.class).getResultList();
	}

	public List<NfaCriteria> getAllCriteriasForFactor(NfaFactor factor) {
		// TODO Auto-generated method stub

		throw new NotYetImplementedException();
		// return null;
	}

	public List<Project> getProjectsByStatus(String status) {

		CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();

		CriteriaQuery<Project> criteria = criteriaBuilder.createQuery(Project.class);
		Root<Project> fromProject = criteria.from(Project.class);
		criteria.where(criteriaBuilder.like(fromProject.<String>get("projectStatus"), status));
		return em.createQuery(criteria).getResultList();
	}


/**
 * get the project by its id
 * @param id
 * @return
 */
	public Project getProjectByID(Long id) {

		return em.find(Project.class, id);
	}
/**
 * get nfafactor by its id
 * @param id
 * @return
 */

	public NfaFactor getFactorById(Long id) {
			return  em.find(NfaFactor.class,id);
    }


	public List<Stakeholder> getAllStakeholder() {
		return em.createQuery("from Stakeholder", Stakeholder.class).getResultList();
	}

	public List<User> getAllUser() {
		return em.createQuery("from User", User.class).getResultList();
	}

	public NfaCatalog getNfa(int nfa_id) {
		return em.createQuery("FROM NfaCatalog WHERE nfa_id IS " + nfa_id, NfaCatalog.class).getSingleResult();
	}

	public List<CustomNFA> getCustomNfa(int project_id) {
		return em.createQuery("FROM CustomNFA WHERE project_id IS " + project_id + " ORDER BY custom_id DESC", CustomNFA.class).getResultList();
	}


}
