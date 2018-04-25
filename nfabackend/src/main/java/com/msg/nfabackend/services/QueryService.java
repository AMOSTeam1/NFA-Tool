package com.msg.nfabackend.services;

import java.util.List;


import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;

import com.msg.nfabackend.entities.Project;


public class QueryService {
	
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
}
