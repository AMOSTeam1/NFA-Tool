package entities;

import static org.junit.jupiter.api.Assertions.*;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;

import org.h2.tools.RunScript;
import org.hibernate.Session;
import org.hibernate.jdbc.Work;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.msg.nfabackend.entities.Project;
import com.msg.nfabackend.services.QueryService;

class ProjectTest  extends JPAHibernateTest {

	@Test
    public void testGetObjectById_success() {
		//Database has (initially) at least 4 Objects 

		Project project = em.find(Project.class,(long) 1);
        assertNotNull(project);

        Project project1 = em.find(Project.class,(long) 4);
        assertNotNull(project1);
    }

	@Test 
	 public void testGetObjectById_failure() {

		Project project = em.find(Project.class,(long) Long.MAX_VALUE);
        assertNull(project);
        
        Project project1 = em.find(Project.class,(long) -1);
        assertNull(project1);
        
    }


	/*
	 * 	//TODO figure out how to access QueryService
	@Test
	public void testFindProject_success() {
		QueryService qs = new QueryService();
		List<Project> foundProjects = qs.findProject("On Process", "ArbeitAgentur");
		assertNotNull(foundProjects);		
	}
	*/

}
