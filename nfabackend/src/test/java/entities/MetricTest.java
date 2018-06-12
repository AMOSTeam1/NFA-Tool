package entities;

import static org.junit.jupiter.api.Assertions.*;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.sql.Connection;
import java.sql.SQLException;

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
