package com.msg.nfabackend.services;

import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;
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


public class QueryService {
	
	private static final Logger LOG = Logger.getLogger(QueryService.class.getName());
	
	EntityManagerFactory emf = Persistence.createEntityManagerFactory("msg-nfa");
	EntityManager em = emf.createEntityManager();
	EntityTransaction tx =  em.getTransaction();
	
	public List<Project> getAllProject() {
		List<Project> listProject = null;
		try {
			tx.begin();
			listProject = em.createQuery("from Project",Project.class).getResultList();
			tx.commit();
			}catch(Exception e){
				tx.rollback();
			}finally {
				em.close();
				emf.close();
			}
		return listProject;
    }

	public List<Project> findProject( String status,String lookupCustName) {
		List<Project> listProject = null;
		try {
			tx.begin();
			CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();
			CriteriaQuery<Project> criteria = criteriaBuilder.createQuery(Project.class);
			Root<Project> root = criteria.from(Project.class);
			Predicate statusQry= criteriaBuilder.like(root.<String>get("projectStatus"),status);
			Predicate lookupQry = criteriaBuilder.like(root.<String>get("customerName"), "%"+lookupCustName+"%");
			criteria.select(root);
			if (!lookupCustName.isEmpty() && status.equalsIgnoreCase("All")) {
			   
			    criteria.where(lookupQry);
			}
			else if  (!lookupCustName.isEmpty()&& !status.equalsIgnoreCase("All")) {
				
				 Predicate qry = criteriaBuilder.and(lookupQry, statusQry);
				 criteria.where(qry);
			}
			else if (lookupCustName.isEmpty()&& !status.equalsIgnoreCase("All")){
				 criteria.where(statusQry);
			}
			listProject = em.createQuery(criteria).getResultList();
			tx.commit();
		}catch(Exception e){
			tx.rollback();
		}finally {
			em.close();
			emf.close();
		}
		return listProject;
	}

	/**
	 * Create new project
	 * @param project
	 * @return Project
	 */
	public Project createProject(Project project) {
		try {
			tx.begin();
			em.merge(project);
			tx.commit();
		}
		catch(Exception e) {
			LOG.log(Level.SEVERE, "Creating project failed...", e);
			tx.rollback();
		}finally {
			em.close();
			emf.close();
		}
		return project;
	}
	
	public NfaCatalog createNfa (Long metricId, NfaCatalog nfaCatalog) {
		try {
			tx.begin();
			Metric metric = em.find(Metric.class, metricId);
			nfaCatalog.setNfaNumber((long) metric.getNfaList().size());
			
			nfaCatalog.getBlueprint().getDe().updateErklaerung();			
			nfaCatalog.getBlueprint().getEn().updateErklaerung();			
			
			em.persist(nfaCatalog);
			
			metric.getNfaList().add(nfaCatalog);
			
			tx.commit();
		}catch(Exception e){
			LOG.log(Level.SEVERE, "Creating nfa-catalog failed...", e);
			tx.rollback();
		}finally {
			em.close();
			emf.close();
		}
		return nfaCatalog;
	}

	public CustomNFA createCustomNfa (CustomNFA customNfa) {
		System.out.println("HaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaallllloHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaallllloHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaallllloHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaallllloHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaallllloHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaallllloHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaallllloHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaallllloHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaallllloHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaallllloHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaalllllo");
		try {
			tx.begin();
			System.out.println(customNfa);
			em.persist(customNfa);
			tx.commit();
		}catch(Exception e){
			LOG.log(Level.SEVERE, "Creating customNfa failed...", e);
			tx.rollback();
		}finally {
			em.close();
			emf.close();
		}
		return customNfa;
	}
	
	public void removeProject(Long id) {
		
		try {
			tx.begin();
			Project project = em.find(Project.class, id);
			project.getProjectTypes().clear();
			project.getProjectNfas().clear();
			project.getProjectStakeholders().clear();
			em.remove(project);
			tx.commit();
			}catch(Exception e){
				tx.rollback();
			}finally {
				em.close();
				emf.close();
			}
		
	}

	/**
	 * Updates a project by finding it by id first
	 * @param id
	 */
	public void updateProject(Project editedProject) {
		//TODO move logic to Project.java
		//TODO extract to ProjectQueryService.java
		try {
			tx.begin();

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
			project.setProjectNfas(editedProject.getProjectNfas());
			em.merge(editedProject);
			tx.commit();
		}catch(Exception e){
			LOG.log(Level.SEVERE, "Searching project failed...", e);
			tx.rollback();
		}finally {
			em.close();
			emf.close();
		}
	}

	public List<Type> getAllType() {
		List<Type> listType = null;
		try {
			tx.begin();
			listType = em.createQuery("from Type",Type.class).getResultList();
			tx.commit();
			}catch(Exception e){
				tx.rollback();
			}finally {
				em.close();
				emf.close();
			}
		return listType;
    }
	
	public List<NfaCatalog> getAllNfa() {
		List<NfaCatalog> listType = null;
		try {
			tx.begin();
			listType = em.createQuery("from nfaCatalog",NfaCatalog.class).getResultList();
			tx.commit();
			}catch(Exception e){
				tx.rollback();
			}finally {
				em.close();
				emf.close();
			}
		return listType;
    }
	
	public List<NfaFactor> getAllFactors() {
		List<NfaFactor> listType = null;
		try {
			tx.begin();
			listType = em.createQuery("from NfaFactor",NfaFactor.class).getResultList();
			tx.commit();
			}catch(Exception e){
				tx.rollback();
			}finally {
				em.close();
				emf.close();
			}
		return listType;
    }
	
	public List<NfaCriteria> getAllNfaCriterias() {
		List<NfaCriteria> listNfaCriteria = null;
		try {
			tx.begin();
			listNfaCriteria = em.createQuery("from NfaCriteria",NfaCriteria.class).getResultList();
			tx.commit();
			}catch(Exception e){
				tx.rollback();
			}finally {
				em.close();
				emf.close();
			}
		return listNfaCriteria;
    }

	public List<NfaCriteria> getAllCriteriasForFactor(NfaFactor factor) {
		// TODO Auto-generated method stub
		
		throw new NotYetImplementedException();
//		return null;
	}
	
	public List<Project> getProjectsByStatus(String status) {
		List<Project> listProject = null;
		try {
			tx.begin();
			CriteriaBuilder criteriaBuilder = em.getCriteriaBuilder();

			CriteriaQuery<Project> criteria = criteriaBuilder.createQuery(Project.class);
			Root<Project> fromProject = criteria.from(Project.class);
			criteria.where(criteriaBuilder.like(fromProject.<String>get("projectStatus"), status));
			listProject = em.createQuery(criteria).getResultList();
			tx.commit();
		}catch(Exception e){
			tx.rollback();
		}finally {
			em.close();
			emf.close();
		}
		return listProject;
	}
	
	public List<Stakeholder> getAllStakeholder() {
		List<Stakeholder> listStakeholder = null;
		try {
			tx.begin();
			listStakeholder = em.createQuery("from Stakeholder",Stakeholder.class).getResultList();
			tx.commit();
			}catch(Exception e){
				tx.rollback();
			}finally {
				em.close();
				emf.close();
			}
		return listStakeholder;
    }


}
