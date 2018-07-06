package entities;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;

import com.msg.nfabackend.entities.Metric;

class MetricTest  extends JPAHibernateTest {

	   /*static EntityManagerFactory emf;
	   static EntityManager em;
	   static EntityTransaction tx;*/

	
	@Test
    public void testGetObjectById_success() {

        Metric metric = em.find(Metric.class,(long) 1);
        assertNotNull(metric);
    }

  

}
