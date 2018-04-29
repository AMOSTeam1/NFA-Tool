package com.msg.nfabackend.services;

import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;

import com.msg.nfabackend.entities.Nfa;
import com.msg.nfabackend.entities.Project;


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
	
	public Project createProject(Project project) {
		try {
			tx.begin();
			em.persist(project);
			tx.commit();
		}
		catch(Exception e) {
			LOG.log(Level.SEVERE, "Projekt-Anlegen gescheitert...", e);
			tx.rollback();
		}finally {
			em.close();
			emf.close();
		}
		return project;
	}
	
	public Nfa addNfa (Nfa nfa) {
		try {
			tx.begin();
			em.persist(nfa);
			tx.commit();
		}catch(Exception e){
			tx.rollback();
		}finally {
			em.close();
			emf.close();
		}
		return nfa;
	}
}
