package entities;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;

import org.junit.jupiter.api.Test;

import com.msg.nfabackend.entities.Project;

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
